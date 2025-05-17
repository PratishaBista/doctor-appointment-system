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
  requestLabTest,
  getPatientLabReports,
  addDoctorNotes,
  markFollowUp,
  getDoctorNotifications,
  markNotificationAsRead,
  updatePrescription,
  addDoctorComment,
  deleteRequestedLabTest
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

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
doctorRouter.post("/request-lab-test", authDoctor, requestLabTest);
doctorRouter.post("/delete-lab-test", authDoctor, deleteRequestedLabTest);
doctorRouter.post("/add-notes", authDoctor, addDoctorNotes);
doctorRouter.post("/mark-followup", authDoctor, markFollowUp);
doctorRouter.get("/notifications", authDoctor, getDoctorNotifications);
doctorRouter.get("/patient-lab-reports/:patientId", authDoctor, getPatientLabReports);
doctorRouter.post("/get-appointment-details", authDoctor, async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    const patient = await userModel.findById(appointment.userId);

    res.json({
      success: true,
      appointment,
      patient,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

doctorRouter.post(
  "/mark-notification-read",
  authDoctor,
  markNotificationAsRead
);
doctorRouter.post("/update-prescription", authDoctor, updatePrescription);
doctorRouter.post("/add-comment", authDoctor, addDoctorComment);

export default doctorRouter;

