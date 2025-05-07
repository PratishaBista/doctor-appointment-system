import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: { type: String, required: true },
    userId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true }, // user details
    doctorData: { type: Object, required: true }, // doctor details
    amount: { type: Number, required: true }, // appointment fees
    date: { type: Number, required: true }, // date when the appointment was booked
    cancelled: { type: Boolean, default: false }, // if the appointment is cancelled or not
    payment: { type: Boolean, default: false }, // if the payment is done or not
    isCompleted: { type: Boolean, default: false }, // if the appointment is completed or not
    // prescription: { type: String, default: "" }, // prescription given by the doctor
    // feedback: { type: String, default: "" }, // feedback given by the user
    // rating: { type: Number, default: 0 }, // rating given by the user
    // doctorFeedback: { type: String, default: "" }, // feedback given by the doctor
  },
);

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema); // collection name: appointments

export default appointmentModel;
