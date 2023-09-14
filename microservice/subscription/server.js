const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 9003;
const DB_NAME = "SUBSCRIPTION"
const multer = require('multer');
const upload = multer();

// routes
var SubscriptionRouter = require("./routes/subscription");

// var UploadFolder = require("./uploads");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.any());

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/subscription", SubscriptionRouter);
// app.use("/upload", UploadFolder);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
