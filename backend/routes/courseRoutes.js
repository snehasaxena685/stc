const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Get all active courses
router.get("/", async (req, res) => {
  res.json(await Course.find({ active: true }));
});

// Add new course
router.post("/", async (req, res) => {
  try {
    res.json(await Course.create(req.body));
  } catch {
    res.status(400).json("Course creation failed");
  }
});

module.exports = router;
