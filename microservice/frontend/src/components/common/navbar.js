import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [platforms, setPlatforms] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email === "null") {
        navigate('/login')
    }

    axios
      .get(`http://localhost:9001/movies/platforms`)
      .then((response) => {
        setPlatforms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#313131" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0 }}>
          <Button color="inherit" component={Link} to="/">
            CineStream
          </Button>
        </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1 }} />
        {platforms.map((platform) => (
          <Button
            color="inherit"
            component={Link}
            to={`/platform/${platform.toLowerCase()}`}
            key={platform}
            sx={{ margin: "0 0.5rem" }}
          >
            {platform}
          </Button>
        ))}
        <Button color="inherit" component={Link} to="/user">
          Profile
        </Button>
        <Button color="inherit" component={Link} to="/subscription">
          Subscriptions
        </Button>
        <Button color="inherit" onClick={() => { 
          localStorage.setItem("email", null) 
          navigate('/')
        }}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
