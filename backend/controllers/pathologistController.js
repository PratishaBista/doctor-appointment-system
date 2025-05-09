import pathologistModel from "../models/pathologistModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import appointmentModel from "../models/appointmentModel.js";
import labReportModel from "../models/labReportModel.js";
import notificationModel from "../models/notificationModel.js";
import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";

// Generate random password
const generateRandomPassword = () => uuidv4().substring(0, 10);

// Send welcome email
const sendWelcomeEmail = async (email, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Your Pathologist Account Credentials",
    html: `
      <h2>Welcome to Our Diagnostic System</h2>
      <p>Your temporary password: <strong>${password}</strong></p>
      <p>Please change your password after first login.</p>
    `,
  });
};

// Add new pathologist (Admin only)
export const addPathologist = async (req, res) => {
  try {
    const { name, email, labName, address, phone } = req.body;

    const exists = await pathologistModel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Pathologist with this email already exists",
      });
    }

    const tempPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newPathologist = new pathologistModel({
      name,
      email,
      labName,
      address,
      phone,
      password: hashedPassword,
    });

    await newPathologist.save();
    await sendWelcomeEmail(email, tempPassword);

    res.status(201).json({
      success: true,
      message: "Pathologist added successfully",
      data: {
        id: newPathologist._id,
        email: newPathologist.email,
      },
    });
  } catch (error) {
    console.error("Error adding pathologist:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get all pathologists (Admin only)
export const getAllPathologists = async (req, res) => {
  try {
    const pathologists = await pathologistModel
      .find({})
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: pathologists.length,
      data: pathologists,
    });
  } catch (error) {
    console.error("Error fetching pathologists:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pathologists",
    });
  }
};

// Pathologist login
const loginPathologist = async (req, res) => {
  try {
    const { email, password } = req.body;
    const pathologist = await pathologistModel.findOne({ email });

    if (!pathologist) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, pathologist.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: pathologist._id, role: "pathologist" },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      success: true,
      pathologist_token: token,
      user: {
        id: pathologist._id,
        name: pathologist.name,
        email: pathologist.email,
        role: "pathologist",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const getPendingLabRequests = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({
        "labTests.status": "requested", 
        cancelled: false,
      })
      .populate("userData", "name email phone age gender")
      .lean();

    const pendingRequests = appointments.flatMap((appointment) => {
      return appointment.labTests
        .filter((test) => test.status === "requested")
        .map((test) => ({
          ...test,
          appointmentId: appointment._id,
          patient: appointment.userData,
          doctor: appointment.doctorData,
          appointmentDate: appointment.slotDate,
        }));
    });

    res.json({
      success: true,
      data: pendingRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending requests",
    });
  }
};

// Upload lab report
const uploadLabReport = async (req, res) => {
  try {
    const { appointmentId, patientId, doctorId, reportName, notes } = req.body;
    const reportFile = req.file;

    if (!reportFile) {
      return res.status(400).json({
        success: false,
        message: "Report file is required",
      });
    }

    const result = await cloudinary.uploader.upload(reportFile.path, {
      resource_type: "auto",
      folder: "lab_reports",
    });

    const newReport = new labReportModel({
      appointmentId,
      patientId,
      doctorId,
      pathologistId: req.user.id,
      reportName,
      reportFile: result.secure_url,
      notes,
    });

    await newReport.save();

    await notificationModel.create([
      {
        userId: patientId,
        userType: "patient",
        title: "Lab Report Ready",
        message: `Your lab report "${reportName}" is now available.`,
        relatedEntity: "labReport",
        relatedEntityId: newReport._id,
      },
      {
        userId: doctorId,
        userType: "doctor",
        title: "Lab Report Ready",
        message: `Lab report "${reportName}" for your patient is now available.`,
        relatedEntity: "labReport",
        relatedEntityId: newReport._id,
      },
    ]);

    res.json({
      success: true,
      message: "Lab report uploaded successfully",
      reportId: newReport._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to upload report",
    });
  }
};

// Get pathologist profile
const getPathologistProfile = async (req, res) => {
  try {
    const pathologist = await pathologistModel
      .findById(req.user.id)
      .select("-password");

    if (!pathologist) {
      return res.status(404).json({
        success: false,
        message: "Pathologist not found",
      });
    }

    res.json({
      success: true,
      data: pathologist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update pathologist profile
const updatePathologistProfile = async (req, res) => {
  try {
    const { name, labName, phone, address } = req.body;

    let addressData = address;
    if (typeof address === "string") {
      try {
        addressData = JSON.parse(address);
      } catch (e) {
        addressData = { line1: address, line2: "" };
      }
    }

    const updated = await pathologistModel
      .findByIdAndUpdate(
        req.user.id,
        {
          name,
          labName,
          phone,
          address: addressData,
        },
        { new: true }
      )
      .select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const updateTestStatus = async (req, res) => {
  try {
    const { appointmentId, testIndex, status, pathologistId } = req.body;

    const updateKey = `labTests.${testIndex}.status`;

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        $set: {
          [updateKey]: status,
          [`labTests.${testIndex}.pathologistId`]: pathologistId,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Test status updated",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginPathologist,
  getPendingLabRequests,
  uploadLabReport,
  getPathologistProfile,
  updateTestStatus,
  updatePathologistProfile,
};
