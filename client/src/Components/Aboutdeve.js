import React, { useState } from "react";
import "../App.css";
import SidebarDrawer from "./SidebarDrawer";
import logo from "../Image/logo.png";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const AboutDevelopers = ({ setUserId }) => {
  const [feedback, setFeedback] = useState(null);

  return (
    <div className="about-container-with-sidebar">
      <SidebarDrawer setUserId={setUserId} />

      <div className="about-content">
        
        <div className="about-logo">
          <img src={logo} alt="Logo" />
        </div>

        <h1 className="about-title">About Us</h1>

        <p className="about-subtitle">
          Answer a few simple questions, and we’ll help you find the perfect face that suits you best!
        </p>

        {/* BEHIND PROJECT */}
        <section className="about-section">
          <h2>Behind the Project</h2>
          <p>
            Our platform offers a quick and fun quiz that matches you with the face that fits your personality and style.
            We aim to make the process easy, interactive, and enjoyable for everyone.
          </p>
        </section>

        {/* DEVELOPMENT TEAM */}
        <section className="about-section">
          <h2>Development Team</h2>
          <ul>
            <li><strong>Huda:</strong> Server-side Developer</li>
            <li><strong>Sandas:</strong> Front-end Developer</li>
            <li><strong>Laila:</strong> UI/UX Designer</li>
          </ul>
        </section>

        {/* CONTACT INFO */}
        <section className="about-section">
          <h2>Contact Information</h2>
          <ul>
            <li><strong>Phone:</strong> +966 500 000 000</li>
            <li><strong>Email:</strong> contact@example.com</li>
            <li><strong>Support Email:</strong> support@example.com</li>
          </ul>
        </section>

        {/* REFERENCES */}
        <section className="about-section">
          <h2>References</h2>
          <ul>
            <li>
              Website: <a href="https://reactjs.org" target="_blank" rel="noreferrer">React Official Docs</a>
            </li>
            <li>Book: "Learning React" by Alex Banks & Eve Porcello</li>
            <li>
              Website: <a href="https://firebase.google.com/docs" target="_blank" rel="noreferrer">Firebase Docs</a>
            </li>
          </ul>
        </section>

        {/*  LIKE / DISLIKE  */}
        <div className="feedback-section">
          <p>Was this page helpful?</p>

          <div className="feedback-buttons">
            <button
              className={`feedback-btn like ${feedback === "like" ? "active" : ""}`}
              onClick={() => setFeedback("like")}
            >
              <FaThumbsUp /> Yes
            </button>

            <button
              className={`feedback-btn dislike ${feedback === "dislike" ? "active" : ""}`}
              onClick={() => setFeedback("dislike")}
            >
              <FaThumbsDown /> No
            </button>
          </div>

          {feedback && <p className="thanks-msg">Thank you for your feedback!</p>}
        </div>

      </div>
    </div>
  );
};

export default AboutDevelopers;
