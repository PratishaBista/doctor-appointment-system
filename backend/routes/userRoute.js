import express from "express";

import {
  registerUser,
  forgotPassword,
  resetPassword,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  getUserLabReports,
  getUserNotifications,
  markNotificationAsRead,
  addUserNotes,
  getUserLabTests,
  getDoctorNotes,
  getAppointmentDetails,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/lab-reports", authUser, getUserLabReports);
userRouter.get("/notifications", authUser, getUserNotifications);
userRouter.post("/add-notes", authUser, addUserNotes);
userRouter.post("/mark-notification-read", authUser, markNotificationAsRead);
userRouter.get("/lab-tests", authUser, getUserLabTests);
userRouter.get("/doctor-notes/:appointmentId", authUser, getDoctorNotes);
userRouter.get("/appointments/:appointmentId", authUser, getAppointmentDetails);

export default userRouter;
