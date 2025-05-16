import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import notificationModel from "../models/notificationModel.js";
import labReportModel from "../models/labReportModel.js";
import nodemailer from "nodemailer";
import axios from "axios";
import crypto from "crypto";

//api to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters",
      });
    }

    // hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    // _id property is added by mongodb

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for user login
const loginUser = async (req, res) => {
  try {
    // check if the user exists in the database
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function to send password reset email
const sendResetEmail = (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`; // URL to your frontend reset password page

  // Email content
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset Request",
    text: `Click on the following link to reset your password: ${resetLink}`,
  };

  return transporter.sendMail(mailOptions);
};

// API to handle password reset request
// This API will send a password reset link to the user's email
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("Requested email:", email);

  try {
    const user = await userModel.findOne({ email });
    console.log("User found:", user);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    try {
      await sendResetEmail(email, resetToken);
      res.json({
        success: true,
        message: "Password reset link sent to your email",
      });
    } catch (emailError) {
      console.error("Error sending email: ", emailError);
      res.json({
        success: false,
        message: "Failed to send reset email",
      });
    }
  } catch (error) {
    console.error("Error in forgotPassword API: ", error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the token and decode the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password in the database
    user.password = hashedPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password has been updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid or expired reset token" });
  }
};

// api to get user profile details
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userDetails = await userModel.findById(userId).select("-password");
    res.json({ success: true, userDetails });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to update user profile details
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;

    const imageFile = req.file;
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Please fill all fields" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // upload image to cloudinary and get the url
      const result = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "users",
        width: 150,
        height: 150,
        crop: "fill",
      });
      const imageURL = result.secure_url;

      await userModel.findByIdAndUpdate(userId, {
        image: imageURL,
      });
    }

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, slotDate, slotTime } = req.body;
    const doctorData = await doctorModel.findById(doctorId).select("-password");

    if (!doctorData) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found with given ID",
      });
    }

    if (!doctorData.available) {
      return res.status(400).json({
        success: false,
        message: "Doctor is not available for appointments",
      });
    }
    if (!doctorData.available) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    let slots_booked = doctorData.slots_booked;
    //checking if the slot is available or not
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete doctorData.slots_booked;

    const appointmentData = {
      doctorId,
      userId,
      slotDate,
      slotTime,
      userData,
      doctorData,
      amount: doctorData.fees,
      date: Date.now(),
      payment: {
        status: "pending",
        amount: doctorData.fees,
      },
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // send notification to doctor
    await notificationModel.create({
      userId: newAppointment.doctorId,
      userType: "doctor",
      title: "New Appointment Booked",
      message: `You have a new appointment booked on ${slotDate} at ${slotTime}`,
      relatedEntity: "appointment",
      relatedEntityId: newAppointment._id,
      metadata: {
        appointmentId: newAppointment._id,
        userId,
        doctorId,
        slotDate,
        slotTime,
        userData,
        doctorData,
      },
    });

    // save new slots booked in doctor's data
    await doctorModel.findByIdAndUpdate(doctorId, {
      slots_booked,
    });

    res.json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// GET /appointments?userID=xyz
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const appointments = await appointmentModel.find({ userId });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// API to cancel the appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({
        success: false,
        message: "You are not authorized to cancel this appointment",
      });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // making the doctor slots available
    const { doctorId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(doctorId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(doctorId, {
      slots_booked,
    });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserLabReports = async (req, res) => {
  try {
    const reports = await labReportModel
      .find({
        patientId: req.body.userId,
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, reports });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user notifications
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel
      .find({
        userId: req.user._id,
        userType: "patient",
      })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, notifications });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Add user notes to appointment
const addUserNotes = async (req, res) => {
  try {
    const { appointmentId, notes } = req.body;

    // Basic validation
    if (!appointmentId || !notes) {
      return res.json({
        success: false,
        message: "Appointment ID and notes are required",
      });
    }

    // Verify the appointment belongs to the user
    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      userId: req.user._id,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or not authorized",
      });
    }

    // Update the appointment with user notes
    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { userNotes: notes },
      { new: true }
    );

    // Notify the doctor
    try {
      await notificationModel.create({
        userId: appointment.doctorId,
        userType: "doctor",
        title: "Patient Added Notes",
        message: "Your patient has added notes to their appointment.",
        relatedEntity: "appointment",
        relatedEntityId: appointmentId,
      });
    } catch (notificationError) {
      console.error("Failed to create notification:", notificationError);
    }

    res.json({
      success: true,
      message: "Notes added successfully",
      data: { appointmentId },
    });
  } catch (error) {
    console.error("Error in addUserNotes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Mark notification as read
const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;

    await notificationModel.findByIdAndUpdate(notificationId, {
      isRead: true,
    });

    res.json({ success: true, message: "Notification marked as read" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get lab tests requested by doctor for a user
const getUserLabTests = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({
        userId: req.user._id,
        "labTests.0": { $exists: true },
      })
      .select("labTests");

    res.json({
      success: true,
      labTests: appointments.flatMap((a) => a.labTests),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Get doctor's notes for an appointment
const getDoctorNotes = async (req, res) => {
  try {
    const appointment = await appointmentModel
      .findOne({
        _id: req.params.appointmentId,
        userId: req.user._id,
      })
      .select("doctorNotes");

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.json({ success: true, doctorNotes: appointment.doctorNotes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAppointmentDetails = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.body.userId;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this appointment",
      });
    }

    res.json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addPatientComment = async (req, res) => {
  try {
    const { appointmentId, comment } = req.body;
    const userId = req.body.userId;

    if (!appointmentId || !comment) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID and comment are required",
      });
    }

    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      userId,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or not authorized",
      });
    }

    if (!appointment.doctorComment) {
      return res.status(400).json({
        success: false,
        message: "You can only reply after the doctor has commented",
      });
    }

    if (appointment.patientComment) {
      return res.status(400).json({
        success: false,
        message: "You have already replied to this comment",
      });
    }

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        patientComment: comment,
        patientCommentAt: new Date(),
      },
      { new: true }
    );

    // await notificationModel.create({
    //   userId: appointment.doctorId,
    //   userType: "doctor",
    //   title: "Patient Reply",
    //   message: "Your patient has replied to your comment",
    //   relatedEntity: "appointment",
    //   relatedEntityId: appointmentId,
    // });

    res.json({
      success: true,
      message: "Reply added successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error adding patient comment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add reply",
      error: error.message,
    });
  }
};

const initiateEsewaPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.body.userId;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      userId,
      cancelled: false,
      isCompleted: false,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Valid appointment not found",
      });
    }

    if (appointment.payment.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Payment already completed",
      });
    }

    if (appointment.payment.method === "cash") {
      return res.status(400).json({
        success: false,
        message: "Appointment is set for clinic payment",
      });
    }

    const payload = {
      amount: appointment.amount.toString(),
      tax_amount: "0",
      total_amount: appointment.amount.toString(),
      transaction_uuid: appointment._id.toString(),
      product_code: "EPAYTEST",
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: `${process.env.FRONTEND_URL}/payment-success?appointmentId=${appointmentId}`,
      failure_url: `${process.env.FRONTEND_URL}/payment-failed?appointmentId=${appointmentId}`,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };

    const signatureData = `total_amount=${payload.total_amount},transaction_uuid=${payload.transaction_uuid},product_code=${payload.product_code}`;
    const hmac = crypto.createHmac(
      "sha256",
      process.env.ESEWA_SECRET || "8gBm/:&EnhH.1/q"
    );
    hmac.update(signatureData);
    payload.signature = hmac.digest("base64");

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      payment: {
        status: "completed",
        method: "esewa",
        amount: appointment.amount,
        paymentId: payload.transaction_uuid,
        gateway: "esewa",
      },
    });

    res.json({
      success: true,
      paymentUrl: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
      paymentData: payload,
    });
  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({
      success: false,
      message: "Payment initiation failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const handleEsewaSuccess = async (req, res) => {
  try {
    const { data, appointmentId } = req.query;

    if (!data || !appointmentId) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/dashboard/appointments?paymentStatus=failed`
      );
    }

    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );
    const { transaction_uuid, status, total_amount } = decodedData;

    if (status !== "COMPLETE") {
      return res.redirect(
        `${process.env.FRONTEND_URL}/dashboard/appointments?paymentStatus=failed`
      );
    }

    const updatedAppointment = await appointmentModel.findOneAndUpdate(
      {
        _id: appointmentId,
        "payment.paymentId": transaction_uuid,
        "payment.status": "pending",
      },
      {
        "payment.status": "completed",
        "payment.amount": total_amount,
        "payment.completedAt": new Date(),
      },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/dashboard/appointments?paymentStatus=failed`
      );
    }

    return res.redirect(
      `${process.env.FRONTEND_URL}/dashboard/appointments?paymentStatus=success`
    );
  } catch (error) {
    console.error("Payment success handling error:", error);
    return res.redirect(
      `${process.env.FRONTEND_URL}/dashboard/appointments?paymentStatus=failed`
    );
  }
};

const handleEsewaFailure = async (req, res) => {
  try {
    const { appointmentId } = req.query;

    if (appointmentId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        "payment.status": "failed",
      });
    }

    return res.redirect(
      `${process.env.FRONTEND_URL}/dashboard/appointments?paymentStatus=failed`
    );
  } catch (error) {
    console.error("Payment failure handling error:", error);
    return res.redirect(
      `${process.env.FRONTEND_URL}/dashboard/appointments?paymentStatus=failed`
    );
  }
};

const setCashPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.body.userId;

    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      userId,
      cancelled: false,
      isCompleted: false,
      "payment.status": { $ne: "completed" },
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Valid appointment not found",
      });
    }

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        payment: {
          status: "completed",
          method: "cash",
          amount: appointment.amount,
          gateway: null,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Cash payment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to set cash payment",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  sendResetEmail,
  forgotPassword,
  getDoctorNotes,
  getUserLabTests,
  resetPassword,
  listAppointment,
  cancelAppointment,
  getUserLabReports,
  getUserNotifications,
  markNotificationAsRead,
  addUserNotes,
  getAppointmentDetails,
  addPatientComment,
  initiateEsewaPayment,
  handleEsewaSuccess,
  handleEsewaFailure,
  setCashPayment,
};
