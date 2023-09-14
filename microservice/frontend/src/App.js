import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';

import LoginPage from './components/common/login';
import RegistrationPage from './components/common/register';
import PlayPage from './components/common/play'; 
import OTTPage from './components/common/ott';
import UserProfile from './components/common/userProfile';
import SubscriptionForm from './components/common/subscription';

import { Navigate } from "react-router-dom";

const defaultOTT = "originals";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegistrationPage />} />
            <Route path="/" element={<Navigate to={`/platform/${defaultOTT}`} />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/platform/:ott" element={<OTTPage />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/subscription" element={<SubscriptionForm />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;