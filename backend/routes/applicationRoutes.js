const express = require("express");
const router = express.Router();
const {
  submitApplication,
  getUserApplications,
} = require("../controllers/applicationController");

router.post("/submit", submitApplication);
router.get("/user/:userId", getUserApplications);

module.exports = router;
