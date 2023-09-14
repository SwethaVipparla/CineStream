const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  
  id: { type: String, required: true},

  title: { type: String, required: true },

  rating: {
    type: Number
  },
  image: {
    type: String
  },
  description: { type: String, require: true },
  genre: { type: String, required: true }
});

module.exports = Movie = mongoose.model("Movies", MovieSchema);
