const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  wallet: {
    type: String,
    required: true
  },
});

PaymentSchema.statics.findPaymentByEmail = async function (email) {
  const payment = await this.findOne({ email });
  if (!payment) {
    return null;
  }
  return payment.wallet;
};

module.exports = Payments = mongoose.model("Payments", PaymentSchema);
