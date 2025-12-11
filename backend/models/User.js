const mongoose = require("mongoose");

// Generate Unique Registration Number
const generateRegistrationNumber = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `REG-2025-${random}`;
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  address: String,
  phone: String,
  nationality: String,
  role: { type: String, default: "student" },

  registrationNumber: {
    type: String,
    unique: true,
    default: generateRegistrationNumber,
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
