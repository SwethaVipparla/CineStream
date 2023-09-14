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
  subscriptionModel: {
    type: String,
    enum: ['monthly', 'yearly'],
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});

module.exports = Subscriptions = mongoose.model("Subscriptions", SubscriptionSchema);
