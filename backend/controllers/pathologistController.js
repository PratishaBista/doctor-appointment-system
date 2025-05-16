import pathologistModel from "../models/pathologistModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import labReportModel from "../models/labReportModel.js";
import notificationModel from "../models/notificationModel.js";
import doctorModel from "../models/doctorModel.js";
import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

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
      process.env.JWT_SECRET
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
      })
      .sort({ createdAt: -1 });

    const patientIds = [...new Set(appointments.map((a) => a.userId))];
    const doctorIds = [...new Set(appointments.map((a) => a.doctorId))];

    const [patients, doctors] = await Promise.all([
      userModel
        .find({ _id: { $in: patientIds } })
        .select("name email phone dob gender"),
      doctorModel.find({ _id: { $in: doctorIds } }).select("name speciality"),
    ]);

    const patientMap = patients.reduce((map, patient) => {
      map[patient._id] = patient;
      return map;
    }, {});

    const doctorMap = doctors.reduce((map, doctor) => {
      map[doctor._id] = doctor;
      return map;
    }, {});

    const formattedRequests = appointments.map((appointment) => {
      const patient = patientMap[appointment.userId] || {};
      const doctor = doctorMap[appointment.doctorId] || {};

      let age = "";
      if (patient.dob) {
        const birthDate = new Date(patient.dob);
        const diff = Date.now() - birthDate.getTime();
        const ageDate = new Date(diff);
        age = Math.abs(ageDate.getUTCFullYear() - 1970);
      }

      return {
        ...appointment.toObject(),
        userData: {
          _id: appointment.userId,
          name: patient.name || "Patient",
          email: patient.email,
          phone: patient.phone,
          gender: patient.gender,
          age: age,
          dob: patient.dob,
        },
        doctorData: {
          _id: appointment.doctorId,
          name: doctor.name || "Doctor",
          speciality: doctor.speciality,
        },
      };
    });

    res.json({
      success: true,
      data: formattedRequests,
    });
  } catch (error) {
    console.error("Error fetching pending lab requests:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending lab requests",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const uploadLabReport = async (req, res) => {
  try {
    console.log("Uploading file:", req.file);
    const { appointmentId, reportName, notes, testType } = req.body;
    const reportFile = req.file;

    if (!reportFile) {
      return res.status(400).json({
        success: false,
        message: "Report file is required",
      });
    }
    console.log("Original filename:", reportFile.originalname);
    const allowedTypes = [".pdf", ".jpg", ".jpeg", ".png"];
    const fileExt = path.extname(reportFile.originalname).toLowerCase();
    console.log("File extension:", fileExt);
    const isPDF = fileExt === ".pdf";
    console.log("Detected file extension:", fileExt);
    console.log("Is PDF?", isPDF);

    if (!allowedTypes.includes(fileExt)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only PDF, JPG, JPEG, and PNG are allowed.",
      });
    }

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const patientId = appointment.userId;
    if (!patientId || patientId.toString() === "null") {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID in appointment",
      });
    }

    let cloudinaryResult;
    try {
      cloudinaryResult = await cloudinary.uploader.upload(reportFile.path, {
        resource_type: isPDF ? "raw" : "image",
        folder: "lab_reports",
        public_id: `report_${appointmentId}_${Date.now()}`,
        overwrite: false,
      });

      if (!cloudinaryResult.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      if (isPDF) {
        cloudinaryResult.secure_url = cloudinary.url(cloudinaryResult.public_id,
          {
            resource_type: "raw",
            flags: "attachment",
            secure: true,
            type: "upload",
            sign_url: true,
          }
        );
      }
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      if (uploadError.message.includes("File size too large")) {
        throw new Error("File size exceeds 10MB limit");
      }
      throw new Error("Failed to upload file to cloud storage");
    }

    const newReport = new labReportModel({
      appointmentId,
      patientId,
      doctorId: appointment.doctorId,
      pathologistId: req.user.id,
      reportName,
      reportFile: cloudinaryResult.secure_url,
      testType: testType || "General Lab Test",
      notes,
      fileType: isPDF ? "pdf" : "image",
    });

    await newReport.save();

    // notify patient
    await notificationModel.create({
      userId: patientId,
      userType: "patient",
      title: "Lab Report Ready",
      message: `Your lab report "${reportName}" is now available.`,
      relatedEntity: "labReport",
      relatedEntityId: newReport._id,
      actionUrl: `/lab-report/${newReport._id}`,
    });

    await notificationModel.create({
      userId: doctorId,
      userType: "doctor",
      title: "Lab Report Ready",
      message: `Lab report "${reportName}" for your patient is now available.`,
      relatedEntity: "labReport",
      relatedEntityId: newReport._id,
      actionUrl: `/patients/${patientId}/lab-reports/${newReport._id}`,
    });

    if (appointment.labTests && appointment.labTests.length > 0) {
      appointment.labTests.forEach((test) => {
        if (test.status === "requested") {
          test.status = "completed";
          test.pathologistId = req.user.id;
          test.completedAt = new Date();
        }
      });
      await appointment.save();
    }

    const patient = await userModel.findById(patientId).select("email name");

    if (patient && patient.email) {
      const emailSent = await sendLabReportEmail(
        patient.email,
        patient.name,
        reportName,
        cloudinaryResult.secure_url,
        notes,
        isPDF
      );

      if (!emailSent) {
        console.warn(`Email failed to send to ${patient.email}`);
      }
    } else {
      console.warn(
        `Patient ${patientId} has no email address or doesn't exist`
      );
    }

    fs.unlinkSync(reportFile.path);

    return res.json({
      success: true,
      message: "Lab report uploaded successfully",
      data: {
        reportId: newReport._id,
        reportUrl: cloudinaryResult.secure_url,
        fileType: isPDF ? "pdf" : "image",
      },
    });
  } catch (error) {
    console.error("Error in uploadLabReport:", error);

    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error("Error deleting temp file:", cleanupError);
      }
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to upload report",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

const sendLabReportEmail = async (
  patientEmail,
  patientName,
  reportName,
  reportUrl,
  notes,
  isPDF
) => {
  if (!patientEmail) {
    console.error("No email address provided for patient");
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL,
    to: patientEmail,
    subject: `Your Lab Report: ${reportName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0288D1;">Lab Report Notification</h2>
        <p>Dear ${patientName || "Patient"},</p>
        <p>Your lab report <strong>${reportName}</strong> is now available.</p>
        
        ${
          notes
            ? `<p><strong>Notes from your pathologist:</strong><br>${notes}</p>`
            : ""
        }
        
        <p>You can access your report by clicking the link below:</p>
            <p>
          <a href="${reportUrl}" 
             style="background-color: #0288D1; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">
            ${isPDF ? "Download PDF Report" : "View Lab Report"}
          </a>
        </p>
        
        ${
          isPDF
            ? `
        <div style="background-color: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 15px;">
          <p style="margin: 0; font-size: 0.9em;">
            <strong>Note:</strong> This is a PDF file. Some email clients may not display it directly. 
            If you have trouble viewing, try right-clicking the link and selecting "Save link as..."
          </p>
        </div>
        `
            : ""
        }
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="font-size: 0.9em; color: #777;">
            This is an automated message. Please do not reply directly to this email.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${patientEmail}`);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
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
