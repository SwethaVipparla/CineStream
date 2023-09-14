const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
    usersList: [
    {
      type: String,
    }
  ],
  moviesList: [
    {
      type: String,
    }
  ],
  cost: {
    type: Number,
  }
  

      
   
});

module.exports = Subscriptions = mongoose.model("Subscriptions", SubscriptionSchema);