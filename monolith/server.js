const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 9001;
const DB_NAME = "MONOLITH"
const multer = require('multer');
const upload = multer();
const path = require("path");
// routes
var UserRouter = require("./routes/user");
var MovieRouter = require("./routes/movies");
var SubscriptionRouter = require("./routes/subscription");
// var UploadFolder = require("./uploads");

 app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.any());

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints 
app.use("/user", UserRouter);
app.use("/movies", MovieRouter);
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use("/subscription", SubscriptionRouter);
// app.use("/upload", UploadFolder);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,  "public", "index.html"), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
