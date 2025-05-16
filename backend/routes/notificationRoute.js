import express from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadNotificationCount
} from "../controllers/notificationController.js";
import authUser from "../middlewares/authUser.js";
import authDoctor from "../middlewares/authDoctor.js";
import authAdmin from "../middlewares/authAdmin.js";
import authPathologist from "../middlewares/authPathologist.js";

const notificationRouter = express.Router();

// Admin-only notification creation
notificationRouter.post("/create", authAdmin, createNotification);

// User notifications
notificationRouter.get("/user", authUser, getUserNotifications);
notificationRouter.post("/user/mark-read", authUser, markAsRead);
notificationRouter.post("/user/mark-all-read", authUser, markAllAsRead);
notificationRouter.delete("/user", authUser, deleteNotification);

// Doctor notifications
notificationRouter.get("/doctor", authDoctor, getUserNotifications);
notificationRouter.post("/doctor/mark-read", authDoctor, markAsRead);
notificationRouter.post("/doctor/mark-all-read", authDoctor, markAllAsRead);
notificationRouter.delete("/doctor", authDoctor, deleteNotification);

// Pathologist notifications
notificationRouter.get("/pathologist", authPathologist, getUserNotifications);
notificationRouter.post("/pathologist/mark-read", authPathologist, markAsRead);
notificationRouter.post("/pathologist/mark-all-read", authPathologist, markAllAsRead);
notificationRouter.delete("/pathologist", authPathologist, deleteNotification);

// Common endpoints
notificationRouter.get("/unread-count", getUnreadNotificationCount);

export default notificationRouter;