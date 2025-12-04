const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

router.post("/apply", async (req, res) => {
  try {
    const app = await Application.create(req.body); 
    res.json(app);
  } catch {
    res.status(400).json("Already Applied to this course");
  }
});

router.get("/:studentId", async (req, res) => {
  const apps = await Application.find({ student: req.params.studentId }).populate("course");
  res.json(apps);
});

module.exports = router;
