const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, address, phone, nationality, email, password } = req.body;

    if (!name || !address || !phone || !nationality || !email || !password) {
      return res.status(400).json({ msg: "Required fields missing" });
    }

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Email already registered" });

    const user = await User.create({
      name,
      address,
      phone,
      nationality,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ msg: "Registration Success", token });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ msg: "Login Success", token });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET LOGGED-IN USER
exports.getUser = async (req, res) => {
  res.json(req.user);
};
