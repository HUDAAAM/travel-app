import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SidebarDrawer from "./SidebarDrawer";
import "../App.css";

export default function Profile({ setUserId }) {
  const API_URL = "http://localhost:3001";
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("profile");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVerified, setPasswordVerified] = useState(false);

  const [locationText, setLocationText] = useState("Detecting location...");

  const fixedPhoto =
    "https://tse2.mm.bing.net/th/id/OIP.YpQ0oZGLK4k09k6sq354OwHaHx?cb=ucfimg2&ucfimg=1&w=820&h=860&rs=1&pid=ImgDetMain&o=7&rm=3";

  // ---- NEW: uploaded photo preview ----
  const [uploadedPhoto, setUploadedPhoto] = useState(fixedPhoto);
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setUploadedPhoto(url);
  };

  // -------------------- LOCATION FEATURE --------------------
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationText("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );
          const data = await res.json();

          const city = data.city || data.locality || "Unknown place";
          const country = data.countryName || "";
          setLocationText(`${city}, ${country}`);
        } catch (err) {
          setLocationText("Unable to detect location");
        }
      },
      () => setLocationText("Location permission denied")
    );
  }, []);

  // -------------------- LOAD USER --------------------
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/users/${userId}`);
        const u = res.data;
        setUser(u);
        setName(u.name);
        setEmail(u.email);
        setDob(u.dob ? new Date(u.dob).toISOString().split("T")[0] : "");
        setLastLogin(u.lastLogin || "Never");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSaveProfile = async () => {
    try {
      await axios.put(`${API_URL}/users/${userId}`, { name, email, dob });
      alert("Profile saved");
      setView("profile");
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  const handleVerifyPassword = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/users/${userId}/verify-password`,
        {
          password: currentPassword,
        }
      );
      if (res.data.valid) setPasswordVerified(true);
      else alert("Current password incorrect");
    } catch (err) {
      console.error(err);
      alert("Error verifying password");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.put(`${API_URL}/users/${userId}/password`, {
        password: newPassword,
      });
      alert("Password changed");
      setView("profile");
    } catch (err) {
      console.error(err);
      alert("Error changing password");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete account?")) return;
    try {
      await axios.delete(`${API_URL}/users/${userId}`);
      localStorage.removeItem("userId");
      setUserId(null);
    } catch (err) {
      console.error(err);
      alert("Error deleting account");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user</p>;

  return (
    <div className="profile-page">
      <SidebarDrawer setUserId={setUserId} />

      <div className="content">
        {/* LOCATION BOX */}
        <div className="location-box">
          <strong>Your Location: {locationText}</strong>
        </div>

        {/* ---- NEW: CLICKABLE PHOTO ---- */}
        <div className="content__cover">
          <div
            className="content__avatar"
            style={{ backgroundImage: `url(${uploadedPhoto})` }}
            onClick={handlePhotoClick}
          ></div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
        </div>

        {view === "profile" && (
          <div className="content__body">
            <div className="content__title">
              <h1>{name}</h1>
              <span>{email}</span>
            </div>

            <p>Birth: {dob}</p>
            <p>Last Login: {lastLogin}</p>

            <div className="content__actions">
              <button onClick={() => setView("edit")}>Edit Profile</button>
              <button onClick={() => setView("password")}>
                Change Password
              </button>
              <button onClick={handleDelete}>Delete Account</button>
            </div>
          </div>
        )}

        {view === "edit" && (
          <div className="form-container">
            <h3>Edit Profile</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <button onClick={handleSaveProfile}>Save</button>
            <button onClick={() => setView("profile")}>Cancel</button>
          </div>
        )}

        {view === "password" && (
          <div className="form-container">
            <h3>Change Password</h3>
            {!passwordVerified ? (
              <>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                />
                <button onClick={handleVerifyPassword}>Verify</button>
                <button onClick={() => setView("profile")}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <button onClick={handleChangePassword}>Save</button>
                <button onClick={() => setView("profile")}>Cancel</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
