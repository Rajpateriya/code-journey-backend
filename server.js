const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.DB);

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  hackerRank: String,
  leetCode: String,
  gfg: String,
  codeChef: String,
});

const User = mongoose.model("User", userSchema);

// Sign Up route
app.post("/signup", async (req, res) => {
  const { name, username, email, hackerRank, leetCode, gfg, codeChef } =
    req.body;

  try {
    const user = new User({
      name,
      username,
      email,
      hackerRank,
      leetCode,
      gfg,
      codeChef,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    res.json({ user });
    console.log(user);
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

//user data
app.get("/profile/:username", async (req, res) => {
  try {
    const data = await User.findOne(req.params.username);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
