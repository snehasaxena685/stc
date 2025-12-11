const mongoose = require("mongoose");

const generateApplicationNumber = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `APP-2025-${random}`;
};

const applicationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    courseTitle: { type: String, required: true },
    courseId: { type: String },

    fullName: { type: String, required: true },
    email: { type: String, required: true },
    degree: { type: String, required: true },

    country: { type: String, required: true },
    state: { type: String, required: true },
    organisation: { type: String, required: true },
    category: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String },

    applicationNumber: {
      type: String,
      default: generateApplicationNumber,
      unique: true, // ONLY unique index we keep
    },

    status: { type: String, default: "Pending" },

    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ❗️IMPORTANT: DISABLE AUTO INDEX
applicationSchema.set("autoIndex", false);

module.exports = mongoose.model("Application", applicationSchema);
