import React, { useEffect } from 'react';
import './css/play.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import Navbar from './navbar';
import { Box } from "@mui/material"; // Import box and circular progress components from material ui

const Play = () => {
  const ott = useState(localStorage.getItem("ott"))[0];
  const index = useState(localStorage.getItem("index"))[0];
  const email = useState(localStorage.getItem("email"))[0];
  const navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState();

  useEffect(() => {
    // Define the api endpoint
    axios
      .get(`http://localhost:9001/movies/video/${ott}/${index}/${email}`, { responseType: "blob" })
      .then((response) => {
        console.log(response)
        // Get the blob from the response
        const blob = response.data;

        // Create a url from the blob
        const url = URL.createObjectURL(blob);

        // Set the video url state
        setVideoUrl(url);
      })
      .catch((error) => {
        // Handle the error
        alert(error.message)
        navigate("/")
      });
  }, []); // Run the effect only when service or id changes

  return (
    <>
      <Navbar />
      <Box sx={{ width: "100%", height: "100%", position: "fixed", top: 0, left: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
          }}
        >
          {videoUrl ? (
            // If the video url is available, render a video element with the url as source
            <video 
              src={videoUrl} 
              controls 
              autoPlay
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
              }}

            />
          ) : (
            <></>
          )}
        </Box>
      </Box>

    </>
  )
}

export default Play;
