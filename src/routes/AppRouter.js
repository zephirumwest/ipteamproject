// src/routes/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import WeatherInfo from '../pages/WeatherInfo';
import Shelters from '../pages/Shelters';
import Hospitals from '../pages/Hospitals';
import Quiz from '../pages/Quiz';
import Survey from '../pages/Survey';
import Locations from '../pages/Locations';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/weather" element={<WeatherInfo />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </Router>
  );
}
