import express from "express";
import {
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  forgotPassword,
  resetPassword,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor); // API for doctor login
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor); // API to get doctor appointments for doctor
doctorRouter.post("/appointment-complete", authDoctor, appointmentComplete); // API to mark appointment as complete
doctorRouter.post("/appointment-cancel", authDoctor, appointmentCancel); // API to cancel appointment for doctor panel
doctorRouter.get("/dashboard", authDoctor, doctorDashboard); // API to get dashboard data for doctor
doctorRouter.get("/profile", authDoctor, doctorProfile); // API to get doctor profile
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile); // API to update doctor profile
doctorRouter.post("/forgot-password", forgotPassword);
doctorRouter.post("/reset-password", resetPassword);

export default doctorRouter;
