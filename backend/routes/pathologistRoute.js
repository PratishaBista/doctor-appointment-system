import express from "express";
import {
  loginPathologist,
  uploadLabReport,
  getPathologistProfile,
  updatePathologistProfile,
  getPendingLabRequests,
} from "../controllers/pathologistController.js";
import upload from "../middlewares/multer.js";
import authPathologist from "../middlewares/authPathologist.js";

const pathologistRouter = express.Router();

// Authentication
pathologistRouter.post("/login", loginPathologist);

// Lab Reports
pathologistRouter.get('/pending-requests', authPathologist, getPendingLabRequests);
pathologistRouter.post("/upload-report", authPathologist, upload.single("reportFile"), uploadLabReport);

// Profile
pathologistRouter.get("/profile", authPathologist, getPathologistProfile);
pathologistRouter.post("/update-profile", authPathologist, updatePathologistProfile);

// Error handling middleware
pathologistRouter.use((err, req, res, next) => {
  console.error('Pathologist route error:', err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

export default pathologistRouter;