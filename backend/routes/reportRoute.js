import express from "express";
import { loginReport } from "../controllers/reportController.js";
import upload from "../middlewares/multer.js";
import authReport from "../middlewares/authReport.js";

const labRouter = express.Router();

// labRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);

export default labRouter;
