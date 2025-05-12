import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import pathologistRouter from "./routes/pathologistRoute.js";
import notificationRouter from "./routes/notificationRoute.js";
import mongoose from "mongoose";

// Initialize Express
const app = express();

// Configuration
const port = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
  process.env.STAFF_URL,
  process.env.ADMIN_URL,
].filter(Boolean);

// Database Connections
connectDB();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// API Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/pathologist", pathologistRouter);
app.use("/api/notifications", notificationRouter);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME
      ? "Configured"
      : "Not Configured",
    timestamp: new Date().toISOString(),
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);

  // Handle file upload errors specifically
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      success: false,
      message: "File too large (max 10MB)",
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Start Server
app.listen(port, () => {
  console.log(`
  Server running on port ${port}
  Environment: ${process.env.NODE_ENV || "development"}
  Available Routes:
  - /api/admin
  - /api/doctor
  - /api/user
  - /api/pathologist
  - /api/notifications
  `);
});
