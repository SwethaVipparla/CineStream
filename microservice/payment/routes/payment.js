var express = require("express");
var router = express.Router();

const Payment = require("../models/payment");

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    let wallet = await Payment.findPaymentByEmail(email);
    res.json(wallet)
  }
  catch (err) {
    console.log(err)
  }
})

router.post("/register", async (req, res) => {
  const newPayment = new Payment({
    email: req.body.email,
    wallet: req.body.wallet,
  });
  console.log(newPayment)
  try {
    if (!newPayment.email) {
      return res.status(404).json({
        error: "Email is required!",
      });
    }
    if (!newPayment.wallet) {
      return res.status(404).json({
        error: "Wallet is required!",
      });
    }

    const savedPayment = await newPayment.save();
    return res.status(200).json(savedPayment);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/edit", async (req, res) => {
    const email = req.body.email;
    const amount = req.body.wallet;

  console.log(email, amount)

  try {
    await Payment.findOneAndUpdate({ email }, { wallet: amount });

    return res.status(200).json({
      message: "Payment successful",
    });
  }
  catch (err) {
    console.log(err)
  }
})

router.post("/pay", async (req, res) => {
  const email = req.body.email;
  const amount = req.body.amount;

  console.log(email, amount)

  if (!email || !amount) {
    return res.status(400).json({
      error: "Email and amount are required",
    });
  }

  try {
    const wallet = await Payment.findPaymentByEmail(email);

    if (!wallet) {
      return res.status(404).json({
        error: "Wallet not found",
      });
    }

    let walletValue = parseInt(wallet);
    let amountValue = parseInt(amount);

    if (walletValue < amountValue) {
      return res.status(400).json({
        error: "Not enough money",
      });

    } else {
      walletValue = walletValue - amountValue;

      await Payment.findOneAndUpdate({ email }, { wallet: walletValue });

      return res.status(200).json({
        message: "Payment successful",
      });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.delete("/:email", async (req, res) => {
  // Get the user id from the request parameters
  const email = req.params.email;
  try {
    // Find and delete the user by id
    let user = await Payment.findOneAndDelete({ email: email });
    // Send a success message or the deleted user as a response
    res.json({ message: "Payment deleted successfully", user: user });
  } catch (err) {
    // Handle any errors
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;

