var express = require("express");
var router = express.Router();

const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});


router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
    wallet: 1000
  });

  try {
    const user = await User.findOne({ email: req.body.email });
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


router.post("/profile", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "Error! Could not find user",
      });
    } else {
      res.send(user);
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
      await User.findOneAndUpdate({ email }, { name, contact, password }, null);
      return res.status(200).send("User details updated");
    }
  } catch (err) {
    console.log(err);
  }
});


router.post("/getBalance", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "Error! Could not find user",
      });
    }
    return res.status(200).json(user.wallet);
  } catch (err) {
    console.log(err);
  }
});


router.post("/addMoney", async (req, res) => {
  const email = req.body.email;
  const wallet = req.body.wallet;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "Error! Could not find user",
      });
    }
    await User.findOneAndUpdate({ email }, { wallet }, null);
    return res.status(200).send("Wallet balance updated");
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;

