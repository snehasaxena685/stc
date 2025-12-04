const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: String,
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Course", courseSchema);
