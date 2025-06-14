import express from "express";
import {
  addDoctor,
  allDoctors,
  loginAdmin,
  appointmentsAdmin,
  adminDashboard,
  appointmentCancel,
  addPathologist,
  getAllPathologists,
  deleteDoctor,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/delete-doctor", authAdmin, deleteDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get(
  "/appointments",
  authAdmin,
  appointmentsAdmin
); /* get all appointments for admin */
adminRouter.get(
  "/dashboard",
  authAdmin,
  adminDashboard
); /* get dashboard data for admin */

adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.post("/add-pathologist", authAdmin, addPathologist);
adminRouter.get("/pathologists", authAdmin, getAllPathologists);

export default adminRouter;
