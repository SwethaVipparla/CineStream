import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/login.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email !== "null") {
        navigate('/')
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    axios
      .post("http://localhost:9002/user/login", user)
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("email");
        localStorage.setItem("email", email);
        navigate("/");
      })
      .catch((err) => {
        alert("Login failed! Please try again");
      });

    resetInputs();
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email" className="login-label">
              Email:
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="login-label">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter your password"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="login-button">
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="register-button"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;