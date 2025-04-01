const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const siteRoutes = require("./routes/site"); // ✅ Import only once
const uploadRoutes = require("./routes/upload");
require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());

// CORS Setup
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// API Routes
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/site", siteRoutes);
app.use("/api/site/",siteRoutes)  // ✅ Use only once
// app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



























































// Generated Token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UzYmE4N2I2YjNlMzQ2ZjZjN2Q4OTkiLCJpc0FkbWluIjpmYWxzZSwia
// WF0IjoxNzQyOTg3NjA0LCJleHAiOjE3NDI5OTEyMDR9.1z5VLmaz4ck1W3U0zZAOQuj71cw4tYvABNK3zA2eCYw"


