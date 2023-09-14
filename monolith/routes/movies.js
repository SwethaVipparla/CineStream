const express = require('express');
const router = express.Router();
const multer = require('multer');
const Movie = require('../models/movies');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require("fs");

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

const upload = multer({storage, fileFilter}).single("image");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
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

// Add a new movie
router.post("/addMovie", upload, async (req, res) => {
  try {
    console.log(req.file);
    const newMovie = new Movie({
      id: req.body.id,
      title: req.body.title,
      rating: req.body.rating,
      image: req.file.filename, // store the image path in the database
      description: req.body.description,
      genre: req.body.genre
    });
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;

