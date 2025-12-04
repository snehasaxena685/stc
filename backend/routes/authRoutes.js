const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const token = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register
router.post("/register", async (req, res) => {
  try {
    const exist = await User.findOne({ email: req.body.email });
    if (exist) return res.status(400).json("Email already registered");

    const user = await User.create(req.body);
    res.json({ token: token(user._id), user });
  } catch {
    res.status(500).json("Registration failed");
  }
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("Invalid email");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json("Invalid password");

  res.json({ token: token(user._id), user });
});

module.exports = router;
