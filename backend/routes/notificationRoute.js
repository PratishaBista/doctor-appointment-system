import express from "express";
import {
  createNotification,
  getUnreadNotificationCount,
} from "../controllers/notificationController.js";
import authAdmin from "../middlewares/authAdmin.js";

const notificationRouter = express.Router();

notificationRouter.post("/create", authAdmin, createNotification);
notificationRouter.get("/unread-count", getUnreadNotificationCount);

export default notificationRouter;