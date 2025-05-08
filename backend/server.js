import cors from "cors";
import "dotenv/config";
import express from "express";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import reportRouter from "./routes/reportRoute.js";
import mongoose from "mongoose";
// import appointmentModel from "./models/appointmentModel.js";
import paymentRouter from "./routes/paymentRoute.js";

// Initialize Express
const app = express();

// Configuration
const port = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  // "http://.com"
];

// Database Connections
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/api/payment", paymentRouter);
app.use("/api/report", reportRouter);

// Environment Verification Endpoint
app.get("/api/verify-env", (req, res) => {
  res.json({
    nodeEnv: process.env.NODE_ENV,
    periPay: {
      apiKey: process.env.PERIPAY_API_KEY
        ? "****" + process.env.PERIPAY_API_KEY.slice(-4)
        : "Not set",
      apiUrl: process.env.PERIPAY_API_URL,
      returnUrl: process.env.PERIPAY_RETURN_URL,
    },
    database: {
      connected: mongoose.connection.readyState === 1,
    },
  });
});

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
