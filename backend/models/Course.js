const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  duration: String,
  fee: String,
  image: String,
  description: String,
  code: String,
});

module.exports = mongoose.model("Course", courseSchema);
