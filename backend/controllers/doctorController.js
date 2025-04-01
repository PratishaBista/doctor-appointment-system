import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

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

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
