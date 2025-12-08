import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Image/logo.png";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  const bubbles = Array.from({ length: 15 }).map((_, i) => (
    <span key={i} className="bubble"></span>
  ));

  return (
    <div className="home-page">
      
      <div className="bubble-container">{bubbles}</div>

      <h1 className="title">Travel & Tourism Planner</h1>

      <p className="subtitle">
        Answer a few simple questions and we will choose the best travel
        destination for you!
      </p>

      <button className="login-btn" onClick={() => navigate("/login")}>
        Login
      </button>

      <p className="register-text">
        Don’t have an account?{" "}
        <span className="register-link" onClick={() => navigate("/register")}>
          Register
        </span>
      </p>

      <div className="bottom-curve">
        <img src={logo} alt="logo" className="bottom-logo" />
      </div>
    </div>
  );
};

export default Home;
