const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, area, dorm } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Name, Email & Password required" });
    }

    // Check email exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Create user (password autohashed in model)
    const user = await User.create({
      name,
      email,
      password,
      phone,
      area,
      dorm,
    });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      msg: "Registration Success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Email" });

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    // Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      msg: "Login Success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
