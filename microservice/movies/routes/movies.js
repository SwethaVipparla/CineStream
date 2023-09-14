const express = require('express');
const router = express.Router();
const multer = require('multer');
const Movie = require('../models/movies');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require("fs");
const axios = require('axios')

// configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // set the file upload destination
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname)); // set the file name and extension
  }
});

// configure multer file type and size limits
const fileFilter = (req, file, cb) => {
  console.log(file.originalname);
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
};

// function to make thumbnails from all videos in content folder and store them

const makeThumbnail = () => {
  const ffmpeg = require('fluent-ffmpeg');
  const folders = fs.readdirSync('content');
  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    const files = fs.readdirSync(`content/${folder}`);

    for (let j = 0; j < files.length; j++) {
      const file = files[j];
      const inputFilePath = `content/${folder}/${file}`;

      ffmpeg(inputFilePath)
        .screenshots({
          count: 1,      // Number of screenshots to take
          timemarks: ['10%'], // At which point(s) in time to take the screenshot(s)
          filename: `${file}_thumbnail.jpg`, // Output file name
          folder: `content/${folder}`  // Output folder
        })
        .on('end', function () {
          console.log('Thumbnail extracted from video!');
        })
    }
  }
}

makeThumbnail();

const upload = multer({ storage, fileFilter }).single("image");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.log(err);
  }
});

router.get("/platforms", async (req, res) => {
  try {
    fs.readdir('content', { withFileTypes: true }, (err, files) => {
      if (err)
        throw err;

      // Filter out only directories
      const dirs = files.filter(file => file.isDirectory()).map(dir => dir.name);
      res.send(dirs);
    });
  }
  catch (err) {
    console.log(err);
  }
});

router.get("/movieDetails", async (req, res) => {
  const id = req.body.id;
  try {
    const movie = await Movie.findOne({ id });
    if (!movie) {
      return res.status(404).json({
        error: "Error! Could not find Movie",
      });
    } else {
      res.send(movie);
      return movie;
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/thumbnails/:service", async (req, res) => {
  const service = req.params.service;

  // get all the thumbnails from the content folder
  try {
    const files = fs.readdirSync(`content/${service}`, { withFileTypes: true });
    const thumbnails = files.filter(dirent => dirent.isFile() && dirent.name.endsWith('.jpg')).map(dirent => dirent.name);
    // read the file 
    for (let i = 0; i < thumbnails.length; i++) {
      const data = fs.readFileSync(`content/${service}/${thumbnails[i]}`);
      thumbnails[i] = data.toString('base64');
    }
    // const data = fs.readFileSync(`content/${service}/${thumbnails[0]}`);
    res.send(thumbnails);
  } catch (err) {
    console.log(err);
  }
});

router.get("/video/:service/:id/:email", async (req, res) => {
  const service = req.params.service;
  const id = req.params.id;
  const email = req.params.email;
  console.log("hey")
  let response = await axios.get(`http://localhost:9003/subscription/${email}`);

  if (response.data == "No Subscription")
    return res.status(404).send("No subscription");

    console.log(service)
  if (service !== "originals") {
    console.log("bola")

    // let response = await 
    axios.post(`http://localhost:9004/payment/pay`, { email: email, amount: "5"})
    .then(() => { })
    .catch(err => {
      // return res.status(500).send("Not enough money");
      return res.status(404).json({
        error: "Not enough money in the wallet",
      });
    })

    if (res.status != 200)
      return res.status(404).send("Not enough money in the wallet");

  }

  const videoPath = `content/${service}/${id}.mp4`;

  // Use the fs module to check if the file exists
  const fs = require("fs");
  if (fs.existsSync(videoPath)) {
    // Use the stream module to create a readable stream from the file
    const stream = require("stream");
    const videoStream = fs.createReadStream(videoPath);
    // Set the content type and length headers
    res.set("Content-Type", "video/mp4");
    res.set("Content-Length", fs.statSync(videoPath).size);
    // Pipe the stream to the response
    videoStream.pipe(res);
  } else {
    // Send a 404 error if the file is not found
    res.status(404).send("Video not found");
  }
})

module.exports = router;