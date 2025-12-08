import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  title: { type: String, required: true }, 
  description: { type: String }, 
  location: { type: String, default: "" }, 
  images: { type: [String], default: [] }, 
  date: { type: Date, default: Date.now }, 
  isFavorite: { type: Boolean, default: false }, 
});

const PostModel = mongoose.model("posts", PostSchema);

export default PostModel;
