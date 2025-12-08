import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./SidebarDrawer";
import "../App.css";

const topDestinations = [
  {
    name: "Bali, Indonesia",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    country: "Indonesia",
    stats: [
      { label: "Island Area", text: "5,780 km²" },
      { label: "Population", text: "4.3 Million" },
      { label: "Best Season", text: "April - October" },
    ],
  },
  {
    name: "Paris, France",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    country: "France",
    stats: [
      { label: "Population", text: "2.1 Million" },
      { label: "Famous For", text: "Eiffel Tower, Museums" },
      { label: "Best Season", text: "April - June, September - November" },
    ],
  },
];

const travelStats = [
  { label: "Global Travelers in 2024", value: "1.2 Billion" },
  { label: "Most Visited Country", value: "France" },
  { label: "Top Travel Activity", value: "Sightseeing & Tours" },
  { label: "Average Trip Duration", value: "7 Days" },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Navbar />

      <section className="hero">
        <h1 className="gradient-text">
          Discover Your Perfect Travel Destination
        </h1>
        <p className="gradient-text">
          Answer a few questions and we’ll suggest the best places for you!
        </p>
        <button onClick={() => navigate("/questionnaire")}>Start Quiz</button>
      </section>

      <section className="travel-stats-section">
        <h2>Travel Statistics</h2>
        <div className="stats-grid small-cards">
          {travelStats.map((stat, idx) => (
            <div key={idx} className="stat-card gradient-card">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="destinations-section">
        <h2>Top Travel Destinations for 2025</h2>
        <div className="destinations-grid improved">
          {topDestinations.map((dest, idx) => (
            <div key={idx} className="destination-card improved">
              <img src={dest.img} alt={dest.name} />
              <div className="destination-overlay">
                <h3>{dest.name}</h3>
                <p className="country-name">{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
