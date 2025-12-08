// Models/FavoritesModel.js
import mongoose from "mongoose";

const FavoriteSchema = mongoose.Schema({
  userId: { type: String, required: true },
  placeName: { type: String, required: true },
  location: { type: String },
  image: { type: String },
});

const FavoriteModel = mongoose.model("favorites", FavoriteSchema);
export default FavoriteModel;
