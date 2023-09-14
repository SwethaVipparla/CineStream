var express = require("express");
var router = express.Router();

const axios = require('axios');
const Subscription = require("../models/subscription");

router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const subscriptions = await Subscription.find();
    for (let i in subscriptions) {
      if (subscriptions[i].usersList.includes(email)) {
        return res.json(subscriptions[i].name);
      }
    }
    res.json("No Subscription")
  }
  catch (err){
    console.log(err)
  }
});

router.post("/register", async (req, res) => {
  const newSubscription = new Subscription({
    name: req.body.name,
    usersList: req.body.usersList,
    subscriptionModel: req.body.subscriptionModel,
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
  const user = req.body.email;
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

// update subscription
router.post("/update", async (req, res) => {
  const { userEmail, subscriptionModel } = req.body;
  console.log(userEmail, subscriptionModel)
  try {
    const subscription = await Subscription.findOne({ name: subscriptionModel });
    console.log(subscription)
    const oldSubscription = await Subscription.findOne({ usersList: userEmail });

    console.log(oldSubscription)

    if (oldSubscription && oldSubscription.name == "Yearly")
      return res.status(500).send("Cannot update yearly subscriptions");

    let response = await axios.post(`http://localhost:9004/payment/pay`, { email: userEmail, amount: subscription.cost});

    console.log(response)

    if(response.status != 200)
      return res.status(500).send("Not enough money");

    if (oldSubscription && oldSubscription.name !== subscription.name) {
      if (oldSubscription.usersList) {
        oldSubscription.usersList.pull(userEmail);
        await oldSubscription.save();
      }
    }

    if (!subscription) {
      return res.status(404).json({ msg: 'Subscription not found' });
    }
    
    if (!subscription.usersList) {
      subscription.usersList = [];
    }
    if (!subscription.usersList.includes(userEmail)) {
      subscription.usersList.push(userEmail);
      await subscription.save();
    }
    
    res.json(subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;