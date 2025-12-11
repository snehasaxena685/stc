const Application = require("../models/Application");

// SUBMIT APPLICATION
exports.submitApplication = async (req, res) => {
  try {
    console.log("Incoming application:", req.body);

    const requiredFields = [
      "fullName",
      "email",
      "degree",
      "country",
      "state",
      "organisation",
      "category",
      "phone",
      "courseTitle",
    ];

    for (const f of requiredFields) {
      if (!req.body[f]) {
        return res.status(400).json({ msg: `Missing field: ${f}` });
      }
    }

    const app = await Application.create(req.body);

    res.json({
      msg: "Application submitted successfully.",
      app,
    });
  } catch (err) {
    console.error("APPLICATION ERROR:", err);
    res.status(500).json({
      msg: "Error submitting application",
      error: err.message,
    });
  }
};

// GET USER APPLICATIONS
exports.getUserApplications = async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.params.userId }).sort({
      submittedAt: -1,
    });

    res.json(apps);
  } catch (err) {
    res.status(500).json({
      msg: "Error fetching applications",
      error: err.message,
    });
  }
};
