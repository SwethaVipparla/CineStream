import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./navbar"

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [wallet, setWallet] = useState('');
  const [subscription, setSubscription] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      name,
      email,
      contact,
      password,
      wallet
    };
    axios
      .post(`http://localhost:9002/user/edit`, user)
      .then((response) => {
        console.log(response.data);
        alert("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((err) => {
        alert("Profile update failed! Please try again");
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleDiscard = () => {
    setIsEditing(false);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:9002/user/${email}`)
      .then((response) => {
        console.log(response.data)
        setName(response.data.name);
        setEmail(response.data.email);
        setContact(response.data.contact);
        setPassword(response.data.password);
        setWallet(response.data.wallet);
        setSubscription(response.data.subscription);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email, isEditing]);

  return (
    <>
      <Navbar />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-textarea"
          label="Name"
          placeholder="Name"
          multiline
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!isEditing}
        />
        <TextField
          id="outlined-textarea"
          label="Email"
          placeholder="Email"
          multiline
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
        />
        <TextField
          id="outlined-textarea"
          label="Contact"
          placeholder="Contact"
          multiline
          variant="outlined"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          disabled={!isEditing}
        />
        <TextField
          id="outlined-textarea"
          label="Password"
          placeholder="Password"
          multiline
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!isEditing}
        />
        <TextField
          id="outlined-textarea"
          label="Wallet"
          multiline
          variant="outlined"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          disabled={!isEditing}
        />
        <TextField
          id="outlined-textarea"
          label="Subsciption"
          placeholder="Subsciption"
          multiline
          variant="outlined"
          value={subscription}
          onChange={(e) => setSubscription(e.target.value)}
          disabled={true}
        />
        {isEditing ? (
          <>
            <Button variant="contained" onClick={handleDiscard}>
              Discard
            </Button>
            <Button variant="contained" type="submit">
              Update
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </Box>
    </>
  );
};

export default UserProfile;