const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load env
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// ------------------------
// ✅ FIX CORS (MUST BE ON TOP BEFORE ROUTES)
// ------------------------
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Body Parser
app.use(express.json());

// ------------------------
// ROUTES
// ------------------------
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));

app.get("/", (req, res) => {
  res.send("STC Portal Backend Running 🚀");
});

// ------------------------
// START SERVER
// ------------------------
app.listen(5000, () => console.log("Server running on PORT 5000"));
