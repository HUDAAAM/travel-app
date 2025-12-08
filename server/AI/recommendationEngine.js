import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function RecommendationPage() {
  const location = useLocation();
  const [recommendation, setRecommendation] = useState(null);

  // بيانات الاستبيان التي نرسلها للسيرفر
  const { environment, activities, budget, travelStyle } = location.state || {};

  useEffect(() => {
    if (environment && activities && budget && travelStyle) {
      axios
        .post("http://localhost:3001/ai-recommendation", {
          environment,
          activities,
          budget,
          travelStyle,
        })
        .then((res) => setRecommendation(res.data))
        .catch((err) => console.error(err));
    }
  }, [environment, activities, budget, travelStyle]);

  if (!recommendation) {
    return <p>Loading recommendation...</p>;
  }

  const { title, description, image } = recommendation;

  return (
    <div className="recommendation-container">
      <h1 className="recommendation-title">{title}</h1>
      <p className="recommendation-description">{description}</p>
      {image && (
        <img
          src={image}
          alt={title}
          className="recommendation-image"
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        />
      )}
    </div>
  );
}
