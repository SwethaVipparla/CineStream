import React, { useState, useEffect } from "react";
import "./css/register.css"; // import CSS file
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email !== "null") {
        navigate('/')
    }
  }, []);

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setContact("");
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      name,
      email,
      password,
      contact
    };

    axios
      .post("http://localhost:9002/user/register", user)
      .then((response) => {
          axios
            .post("http://localhost:9004/payment/register", {email: email, wallet: "0"})
            .then((response) => {
              console.log(response.data);

              navigate("/login");
            })
            .catch((err) => {
              alert("Registration failed! Please try again");
            });

        navigate("/login");
      })
      .catch((err) => {
        alert("Registration failed! Please try again");
      });

    resetInputs();
  };

  return (
    <div className="registration-page">
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
