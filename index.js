const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const siteRoutes = require("./routes/site"); // ✅ Import only once
require("dotenv").config();
connectDB();

const app = express();
app.use(express.json()); // ✅ JSON parsing enable
app.use(express.urlencoded({ extended: true })); // ✅ Form data parsing enable


// CORS Setup
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// API Routes
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/site/",siteRoutes)  // ✅ Use only once

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// const uploadRoutes = require("./routes/upload");
// const Site = require("./models/Site");