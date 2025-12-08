import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Context
import { ThemeLanguageProvider } from "./ThemeLanguageContext";

// Pages & Components
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import HomeIntro from "./Components/HomeIntro";
import Questionnaire from "./Components/Questionnaire";
import RecommendationPage from "./Components/RecommendationPage";
import Favorites from "./Components/Favorites";
import AboutDevelopers from "./Components/Aboutdeve";
import Profile from "./Components/Profile";
import Settings from "./Components/settings";
import Help from "./Components/Help";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "Traveler");

  return (
    <ThemeLanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setUserId={setUserId} />} />
          <Route path="/login" element={<Login setUserId={setUserId} />} />
          <Route path="/home-intro" element={<HomeIntro userName={userName} />} />
          <Route path="/questionnaire" element={<Questionnaire userId={userId} />} />
          <Route path="/recommendation" element={<RecommendationPage userId={userId} />} />
          <Route path="/favorites" element={<Favorites userId={userId} />} />
          <Route path="/about-developers" element={<AboutDevelopers />} />
          <Route path="/profile" element={<Profile userId={userId} />} />
          <Route path="/settings" element={<Settings userId={userId} />} />
          <Route path="/help" element={<Help userId={userId} />} />
        </Routes>
      </Router>
    </ThemeLanguageProvider>
  );
}

export default App;
