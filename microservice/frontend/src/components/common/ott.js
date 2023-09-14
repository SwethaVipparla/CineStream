import React, { useEffect, useState } from "react";
import "./css/home.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";
import { Card, CardMedia, Grid, Typography } from "@mui/material";

const OTTPage = () => {
    const [thumbnails, setThumbnails] = useState([]);

    const navigate = useNavigate();
    const { ott } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:9001/movies/thumbnails/${ott}`)
            .then(response => {
                setThumbnails(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [ott]);

    const handleClick = (index) => {
        // Set the ott and the index values to local storage
        localStorage.setItem("ott", ott);
        localStorage.setItem("index", index);

        navigate("/play")
    };

    return (
        <div className="home">
            <Navbar />
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <Typography
                        variant="h6"
                        align="center"
                        color="#f0f0f0"
                        sx={{ fontWeight: "bold", textShadow: "2px 2px 4px #000000", fontSize: "3.75rem" }}
                    >
                        {`${ott.toUpperCase()}`}
                    </Typography>

                    {localStorage.getItem("email") === null && (
                        <Link to="/login" className="button">
                            Sign in now
                        </Link>
                    )}
                </Grid>
                <Grid item container xs={12}>
                    {thumbnails.map((thumbnail, index) => (
                        <>
                            <Grid item xs={0.125}>
                            </Grid>
                            <Grid item xs={2.75} key={index}>
                                <Card sx={{}} onClick={() => handleClick(index)}>
                                    <CardMedia
                                        component="img"
                                        height="100%"
                                        image={`data:image/jpeg;base64,${thumbnail}`}
                                        alt={`Thumbnail ${index}`}
                                    />
                                </Card>
                            </Grid>
                            <Grid item xs={0.125}>
                            </Grid>
                        </>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default OTTPage;