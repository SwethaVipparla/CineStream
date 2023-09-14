var express = require("express");
var router = express.Router();

const axios = require('axios')
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    let user = await User.findOne({ email: email });

    if (!user)
      throw "User doesn't exist";

    // Get subscription information
    let response = await axios.get(`http://localhost:9003/subscription/${email}`);
    user = user.toObject()
    user["subscription"] = response.data;

    // Get wallet information
    response = await axios.get(`http://localhost:9004/payment/${email}`);
    user["wallet"] = response.data;

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User doesn't exist"})
  }
});

router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
  });

  console.log(newUser)

  try {
    console.log(req.body.email)
    const user = await User.findOne({ email: req.body.email });
    // User.findOne({ email: req.body.email })
    // .then(res)
    console.log(user)
    if (user) {
      return res.status(404).json({
        error: "Email already taken!",
      });
    } else {
      if (!newUser.name) {
        return res.status(404).json({
          error: "Name is required!",
        });
      }
      if (!newUser.email) {
        return res.status(404).json({
          error: "Email is required!",
        });
      }
      if (!newUser.contact) {
        return res.status(404).json({
          error: "Contact is required!",
        });
      }

      if (!newUser.password) {
        return res.status(404).json({
          error: "Password is required!",
        });
      }
       
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({
        error: "Email or password is incorrect!",
      });
    } else {
      res.send("Success!");
      return user;
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/edit", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const contact = req.body.contact;
  const password = req.body.password;
  const wallet = req.body.wallet;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "Error! Could not find user",
      });
    } else {
      if (!name) {
        return res.status(404).json({
          error: "Name is required!",
        });
      }
      if (!contact) {
        return res.status(404).json({
          error: "Contact is required!",
        });
      }
      if (!password) {
        return res.status(404).json({
          error: "Password is required!",
        });
      }
      if (!wallet) {
        return res.status(404).json({
          error: "Wallet is required!",
        });
      }
      await User.findOneAndUpdate({ email }, { name, contact, password }, null);
      await axios.post(`http://localhost:9004/payment/edit`, { email: email, wallet: wallet});
      return res.status(200).send("User details updated");
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:email", async (req, res) => {
  // Get the user id from the request parameters
  const email = req.params.email;
  try {
    // Find and delete the user by id
    let user = await User.findOneAndDelete({ email: email });
    // Send a success message or the deleted user as a response
    res.json({ message: "User deleted successfully", user: user });
  } catch (err) {
    // Handle any errors
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;