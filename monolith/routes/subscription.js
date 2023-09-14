var express = require("express");
var router = express.Router();

const Subscription = require("../models/subscription");

router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (err) {
    console.log(err);
  }
});


router.post("/register", async (req, res) => {
  const newSubscription = new Subscription({
    name: req.body.name,
    usersList: [],
    moviesList: [],
    cost: req.body.cost,
    
     
  });

  try {
    const subscription = await Subscription.findOne({ name: req.body.name });
    if (subscription) {
      return res.status(404).json({
        error: "Name already taken!",
      });
    } else {
       
      const savedSubscription = await newSubscription.save();
      res.status(200).json(savedSubscription);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
 
router.put("/addUser", async (req, res) => {
  const name = req.body.name;
  const user = req.body.user;
  try {
    const subscription = await Subscription.findOne({ name: req.body.name });
    if (!subscription) {
      return res.status(404).json({
        error: "Error! Could not find Subscription",
      });
    }
    else {
      subscription.usersList.push(user);
      await subscription.save();
      res.send(subscription);
      return subscription;
    }
  }
  catch (err) {
    console.log(err);
  }
});

router.put("/addMovie", async (req, res) => {
  const name = req.body.name;
  const movie = req.body.movie;
  try {
    const subscription = await Subscription.findOne({ name: req.body.name });
    if (!subscription) {
      return res.status(404).json({
        error: "Error! Could not find Subscription",
      });
    }
    else {
      subscription.moviesList.push(movie);
      await subscription.save();
      res.send(subscription);
      return subscription;
    }
  }
  catch (err) {
    console.log(err);
  }
});

router.post("/checkSubscription", async (req, res) => {
  const movie = req.body.movie;
  const user = req.body.user;
  try {
    // iterate through all subscriptions
    const subscriptions = await Subscription.find();
    var subscriptionFound = false;
    subscriptions.forEach((subscription) => {
      // iterate through all movies in each subscription
      subscription.moviesList.forEach((subscriptionMovie) => {
        // if the movie is found in the subscription
        if (subscriptionMovie === movie) {
          // iterate through all users in the subscription
          subscription.usersList.forEach((subscriptionUser) => {
            // if the user is found in the subscription
            if (subscriptionUser === user) {
              // return true
              subscriptionFound = true;
              res.send("play");
              return subscriptionFound;
            }
          });
        }
        else {
          res.send(subscription);
          return subscriptionFound;
        }
      });
    });
    // if the movie is not found in any subscription
    if (!subscriptionFound) {
      res.send(subscriptionFound);
      return subscriptionFound;
    }
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = router;

