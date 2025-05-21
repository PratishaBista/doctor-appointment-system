import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import notificationModel from "../models/notificationModel.js";
import labReportModel from "../models/labReportModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Availability changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
    });
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

  const resetLink = `${process.env.STAFF_URL}/reset-password?token=${resetToken}`; // URL to your frontend reset password page

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
    const doctor = await doctorModel.findOne({ email });
    console.log("Doctor found:", doctor);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    const resetToken = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
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
    const doctor = await doctorModel.findById(decoded.id);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password in the database
    doctor.password = hashedPassword;
    await doctor.save();

    res.json({
      success: true,
      message: "Password has been updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid or expired reset token" });
  }
};

// API to get doctor appointments for doctor
const appointmentsDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const appointments = await appointmentModel.find({ doctorId });
    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to mark the appointment as completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.doctorId === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      const doctor = await doctorModel.findById(doctorId).select("name");

      await notificationModel.create({
        userId: appointmentData.userId,
        userType: "patient",
        title: "Appointment Completed",
        message: `Your appointment with ${doctor.name} has been marked as completed`,
        relatedEntity: "appointment",
        relatedEntityId: appointmentId,
        actionUrl: `/appointments/${appointmentId}`,
      });

      return res.json({
        success: true,
        message: "Appointment marked as completed",
      });
    } else {
      return res.json({
        success: false,
        message: "You are not authorized to complete this appointment",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to cancel the appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { doctorId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.doctorId === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,
        message: "Appointment cancelled successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "You are not authorized to cancel this appointment",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const appointments = await appointmentModel.find({
      doctorId,
    });
    let earnings = 0;
    appointments.map((appointment) => {
      if (appointment.isCompleted) {
        earnings += appointment.fees;
      }
    });

    let patients = [];
    appointments.map((appointment) => {
      if (!patients.includes(appointment.userId)) {
        patients.push(appointment.userId);
      }
    });

    const dashboardData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.slice(-5).reverse(), // get last 5 appointments
    };

    res.json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get doctor profile data for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctorData = await doctorModel.findById(doctorId).select("-password");
    res.json({ success: true, doctorData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { doctorId, fees, address, available } = req.body;

    await doctorModel.findByIdAndUpdate(doctorId, {
      fees,
      address,
      available,
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const requestLabTest = async (req, res) => {
  try {
    const { appointmentId, tests } = req.body;

    // Validate input
    if (!tests || !Array.isArray(tests) || tests.length === 0) {
      return res.json({
        success: false,
        message: "At least one test must be specified",
      });
    }

    // Update appointment with test requests
    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        $push: {
          labTests: {
            $each: tests.map((test) => ({
              testType: test.testType,
              testCode: test.testCode || "",
              doctorNotes: test.notes || "",
              status: "requested",
            })),
          },
        },
        labTestRequired: true,
      },
      { new: true }
    );

    //notify patient
    await notificationModel.create({
      userId: updatedAppointment.userId,
      userType: "patient",
      title: "Lab Test Requested",
      message: `Your doctor has requested ${tests.length} lab test(s)`,
      relatedEntity: "appointment",
      relatedEntityId: appointmentId,
      actionUrl: `/appointments/${appointmentId}`,
    });

    res.json({
      success: true,
      message: "Lab tests requested successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// delete a lab test request
const deleteRequestedLabTest = async (req, res) => {
  try {
    const { appointmentId, testId } = req.body;

    // Validate input
    if (!appointmentId || !testId) {
      return res.json({
        success: false,
        message: "Appointment ID and Test ID are required",
      });
    }

    // Find the appointment and requested test
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Find the test to delete (must be in 'requested' status)
    const testToDelete = appointment.labTests.find(
      (test) => test._id.toString() === testId && test.status === "requested"
    );

    if (!testToDelete) {
      return res.json({
        success: false,
        message:
          "Test not found or already processed (cannot delete completed tests)",
      });
    }

    // Remove the test from the array
    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        $pull: { labTests: { _id: testId, status: "requested" } },
        // Only set labTestRequired to false if no more tests exist
        ...(appointment.labTests.length <= 1 && { labTestRequired: false }),
      },
      { new: true }
    );

    // Notify patient about cancellation
    await notificationModel.create({
      userId: updatedAppointment.userId,
      userType: "patient",
      title: "Lab Test Cancelled",
      message: `A lab test request (${testToDelete.testType}) has been cancelled`,
      relatedEntity: "appointment",
      relatedEntityId: appointmentId,
      actionUrl: `/appointments/${appointmentId}`,
    });

    res.json({
      success: true,
      message: "Lab test request deleted successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getPendingTestsForDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;

    const appointments = await appointmentModel
      .find({
        doctorId,
        "labTests.status": { $in: ["requested", "sample_collected"] },
      })
      .select("labTests userData slotDate")
      .populate("userData", "name");

    res.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pending tests",
    });
  }
};

const getPendingLabTests = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    const pendingTests = appointment.labTests.filter(
      (test) => test.status !== "completed"
    );

    res.json({
      success: true,
      tests: pendingTests,
      appointmentId: appointment._id,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateTestStatus = async (req, res) => {
  try {
    const { appointmentId, testIndex, status } = req.body;

    const updateKey = `labTests.${testIndex}.status`;

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { $set: { [updateKey]: status } },
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
// Get patient's lab reports
const getPatientLabReports = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { doctorId } = req.body;

    const reports = await labReportModel
      .find({
        patientId,
        doctorId,
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, reports });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addDoctorNotes = async (req, res) => {
  try {
    const { appointmentId, notes } = req.body;

    // Validate inputs
    if (!appointmentId || !notes) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID and notes are required",
      });
    }

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { doctorNotes: notes },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Notes added successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error adding doctor notes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add notes",
      error: error.message,
    });
  }
};

const markFollowUp = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const doctorId = req.body.doctorId;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      doctorId: doctorId,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or not authorized",
      });
    }

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { followUpRequired: !appointment.followUpRequired },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Follow-up status updated successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    console.error("Error marking follow-up:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update follow-up status",
      error: error.message,
    });
  }
};

// Get doctor notifications
const getDoctorNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel
      .find({
        userId: req.doctor._id,
        userType: "doctor",
      })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ success: true, notifications });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
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

const getAppointmentDetails = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
    const patient = await patientModel.findById(appointment.userId);

    res.json({
      success: true,
      appointment,
      patient,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updatePrescription = async (req, res) => {
  try {
    const { appointmentId, prescription } = req.body;
    const { doctorId } = req.body;

    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      doctorId,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or not authorized",
      });
    }

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { prescription },
      { new: true }
    );

    // await notificationModel.create({
    //   userId: appointment.userId,
    //   userType: "patient",
    //   title: "New Prescription",
    //   message: "Your doctor has updated your prescription",
    //   relatedEntity: "appointment",
    //   relatedEntityId: appointmentId,
    // });

    res.json({
      success: true,
      message: "Prescription updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating prescription:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update prescription",
    });
  }
};

const addDoctorComment = async (req, res) => {
  try {
    const { appointmentId, comment } = req.body;
    const { doctorId } = req.body;

    if (!appointmentId || !comment) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID and comment are required",
      });
    }

    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      doctorId,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or not authorized",
      });
    }

    if (appointment.doctorComment) {
      return res.status(400).json({
        success: false,
        message: "You have already posted a comment for this appointment",
      });
    }

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        doctorComment: comment,
        doctorCommentAt: new Date(),
      },
      { new: true }
    );

    // await notificationModel.create({
    //   userId: appointment.userId,
    //   userType: "patient",
    //   title: "Doctor's Comment",
    //   message: "Your doctor has added a comment to your appointment",
    //   relatedEntity: "appointment",
    //   relatedEntityId: appointmentId,
    // });

    res.json({
      success: true,
      message: "Comment added successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error adding doctor comment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add comment",
      error: error.message,
    });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  resetPassword,
  sendResetEmail,
  forgotPassword,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
  requestLabTest,
  getAppointmentDetails,
  getPatientLabReports,
  addDoctorNotes,
  markFollowUp,
  getDoctorNotifications,
  markNotificationAsRead,
  updateTestStatus,
  getPendingLabTests,
  getPendingTestsForDoctor,
  updatePrescription,
  addDoctorComment,
  deleteRequestedLabTest,
};
