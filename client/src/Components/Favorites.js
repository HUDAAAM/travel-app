import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarDrawer from "./SidebarDrawer";
import "../App.css";

export default function Favorites({ userId, setUserId }) {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites
  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/favorites/${userId}`);
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) fetchFavorites();
  }, [userId]);

  // Delete one favorite
  const handleDeleteFavorite = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/favorites/${id}`);

      // Remove from UI
      setFavorites(favorites.filter((fav) => fav._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="favorites-container-with-sidebar">
      <SidebarDrawer setUserId={setUserId} />

      <div className="favorites-content">
        <h2>My Favorites</h2>

        {/* If empty */}
        {favorites.length === 0 && <p>No favorites yet.</p>}

        {/* Cards */}
        {favorites.map((post) => (
          <div key={post._id} className="favorite-card">
            <h3>{post.placeName}</h3>
            <p>{post.location}</p>

            {post.image && (
              <img
                src={post.image}
                alt={post.placeName}
                className="favorite-image"
              />
            )}

            <button onClick={() => handleDeleteFavorite(post._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
