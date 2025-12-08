// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";

// Import models
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/PostModel.js";
import FavoriteModel from "./Models/FavoritesModel.js";
import HelpMessageModel from "./Models/HelpMessageModel.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI =
  "mongodb+srv://tp_user:12341234hh@travelcluster.dgnccml.mongodb.net/tp_user?appName=TravelCluster";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => res.send("Server is running!"));

// ========== USER ROUTES ==========
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    const { password: pw, ...userWithoutPassword } = newUser._doc;
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Incorrect password" });

    const { password: pw, ...userWithoutPassword } = user._doc;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========== TRAVEL POSTS ROUTES ==========
app.post("/posts", async (req, res) => {
  try {
    const { userId, title, description, location, images } = req.body;

    const newPost = new PostModel({
      userId,
      title,
      description: description || "",
      location: location || "",
      images: images || [],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========== FAVORITES ROUTES ==========
app.post("/favorites", async (req, res) => {
  try {
    const { userId, placeName, location, image } = req.body;

    const newFavorite = new FavoriteModel({
      userId,
      placeName,
      location: location || "",
      image: image || "",
    });

    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/favorites/:userId", async (req, res) => {
  try {
    const favorites = await FavoriteModel.find({ userId: req.params.userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========== HELP MESSAGE ROUTES ==========
app.post("/help-message", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "All fields are required" });

    const newMessage = new HelpMessageModel({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message stored!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/help-messages", async (req, res) => {
  try {
    const messages = await HelpMessageModel.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========== AI RECOMMENDATION (FINAL + CLEAN) ==========
app.post("/ai-recommendation", async (req, res) => {
  try {
    const { environment, budget, travelStyle, userId } = req.body;

    if (!environment || !budget || !travelStyle || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Images map
    const images = {
      "Beach & Sea":
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "Mountains & Nature":
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
      "City Life":
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
      "Desert & Warm Places":
        "https://images.unsplash.com/photo-1600497742604-6f2328e36009?auto=format&fit=crop&w=800&q=80",
    };

    const title = `Trip to ${environment}`;
    const description = `Enjoy a ${environment} trip with your ${travelStyle.toLowerCase()} companion(s) on a ${budget.toLowerCase()} budget.`;

    const image =
      images[environment] ||
      "https://via.placeholder.com/800x500?text=Travel+Image";

    // Save as a Post
    const newPost = new PostModel({
      userId,
      title,
      description,
      location: "",
      images: [image],
    });

    await newPost.save();

    // Return to client
    res.status(201).json({
      userId,
      title,
      description,
      image,
    });
  } catch (err) {
    console.error("Error in recommendation:", err);
    res.status(500).json({ error: "AI recommendation failed" });
  }
});

// ========== START SERVER ==========
const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
