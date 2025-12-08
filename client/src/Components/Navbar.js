import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Image/logo.png";
import "../App.css";

export default function Navbar({ showBack = false }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

//menue for search
  const options = [
    { name: "Home", path: "/" },
    { name: "Favorites", path: "/favorites" },
    { name: "About Developers", path: "/about-developers" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Help", path: "/help" },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length === 0) {
      setSearchResults([]);
    } else {
      const results = options.filter((option) =>
        option.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleSelect = (path) => {
    navigate(path);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <nav className="home-navbar">
      {/* Back button */}
      {showBack && (
        <button onClick={() => navigate(-1)} className="back-arrow-btn">
          ←
        </button>
      )}

      {/* Logo */}
      <img src={logo} alt="logo" className="navbar-logo" />

      {/* Search box */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchResults.length > 0 && (
          <ul className="search-dropdown">
            {searchResults.map((item, index) => (
              <li key={index} onClick={() => handleSelect(item.path)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/about-developers">About Developers</Link>
        </li>

        {/* Dropdown */}
        <li className="navbar-dropdown">
          <Link
            to="#"
            className="navbar-link dropdown-btn"
            onClick={(e) => {
              e.preventDefault();
              setDropdownOpen(!dropdownOpen);
            }}
          >
            More ▼
          </Link>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
