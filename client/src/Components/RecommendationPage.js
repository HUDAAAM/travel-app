// RecommendationPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarDrawer from "./SidebarDrawer";
import "../App.css";

export default function RecommendationPage({ setUserId }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, title, description, image } = location.state || {};

  if (!title) {
    return (
      <div className="recommendation-with-sidebar">
        <SidebarDrawer setUserId={setUserId} />
        <div className="recommendation-content">
          <p>No recommendation found.</p>
        </div>
      </div>
    );
  }

  // Function to add destination to favorites and navigate
  const handleAddFavorite = async () => {
    try {
      await axios.post("http://localhost:3001/favorites", {
        userId,
        placeName: title,
        image: image || "",
      });

      alert(`${title} added to your favorites!`);

      // Navigate to Favorites page
      navigate("/favorites", { state: { userId } });
    } catch (err) {
      alert("Failed to add to favorites");
      console.error(err);
    }
  };

  return (
    <div className="recommendation-with-sidebar">
      <SidebarDrawer setUserId={setUserId} />

      <div className="recommendation-box">

        <h1 className="perfect-destination-title">
          Your Perfect Destination is...
        </h1>

        <h2 className="destination-name">{title}</h2>

        <img src={image} alt={title} className="destination-image" />

        <p className="destination-description">{description}</p>

        <button className="fav-btn" onClick={handleAddFavorite}>
          ♡ Add to my Favorites
        </button>

        <button className="try-again-btn" onClick={() => navigate("/questionnaire")}>
          Try Again
        </button>

      </div>
    </div>
  );
}
