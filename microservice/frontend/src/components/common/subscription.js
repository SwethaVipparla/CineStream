import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Card, CardContent, Typography } from "@mui/material";
import Navbar from "./navbar";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubscriptionForm = () => {
  const [subscriptionModels, setSubscriptionModels] = useState([]);
  const [subscriptionModel, setSubscriptionModel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9003/subscription")
      .then((response) => {
        setSubscriptionModels(response.data);
        console.log(subscriptionModels);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userEmail = localStorage.getItem('email');
    console.log(userEmail)
    const subscription = {
      userEmail,
      subscriptionModel,
    };
    axios
      .post("http://localhost:9003/subscription/update", subscription)
      .then((response) => {
        console.log(response.data);
        alert("Subscription updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        alert("Subscription update failed! Please try again");
      });
  };

  return (
    <>
      <Navbar />
      <Box>
        <Typography variant="h5" component="h2" sx={{ m: 2 }}>
          Subscription Models
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {subscriptionModels.map((subscription) => (
            <Card key={subscription.name} sx={{ minWidth: 275, m: 2 }}>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {subscription.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {subscription.cost}
                </Typography>
                <Button variant="contained" onClick={() => setSubscriptionModel(subscription.name)}>
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-select-subscription-model"
            select
            label="Select"
            value={subscriptionModel}
            onChange={(e) => setSubscriptionModel(e.target.value)}
            helperText="Please select your subscription model"
          >
            {subscriptionModels.map((subscription) => (
              <MenuItem key={subscription.name} value={subscription.name}>
                {subscription.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" type="submit">
            Update Subscription
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SubscriptionForm;
