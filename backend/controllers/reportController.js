import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import reportModel from "../models/reportModel.js";

//API for pathologist login
const loginReport = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.LAB_EMAIL &&
      password === process.env.LAB_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, message: "Pathologist logged in", token });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginReport };
