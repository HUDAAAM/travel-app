import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Image/logo.png";
import "../App.css";

export default function SidebarDrawer({ setUserId }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    setUserName(name || "Guest");
    setUserEmail(email || "guest@example.com");
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    if (setUserId) setUserId(null);
    navigate("/login");
    setIsOpen(false);
  };

  const menuItems = [
    { name: "Home", path: "/home-intro" },
    { name: "Favorites", path: "/favorites" },
    { name: "About", path: "/about-developers" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Help", path: "/help" },
  ];

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button className="hamburger-btn" onClick={toggleSidebar}>☰</button>

      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <div className={`sidebar-drawer ${isOpen ? "open" : ""}`}>

        {/* Logo */}
        <div className="sidebar-logo">
          <img src={logo} alt="logo" />
        </div>

        {/* User info */}
        <div className="sidebar-user">
          <p className="user-name">{userName}</p>
          <p className="user-email">{userEmail}</p>
        </div>

        {/* 🔍 Search Box (Moved here) */}
        <div className="sidebar-search">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtered Menu */}
        <ul className="sidebar-links">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path} onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))
          ) : (
            <p className="no-results">No matching items</p>
          )}
        </ul>

        <button onClick={handleLogout} className="sidebar-logout-btn">
          Logout
        </button>

      </div>
    </>
  );
}
