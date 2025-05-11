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
    payment: {
      status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
      },
      amount: Number,
      paymentId: String,
      gateway: String,
      receiptUrl: String,
    }, // payment details
    isCompleted: { type: Boolean, default: false }, // if the appointment is completed or not
    followUpRequired: { type: Boolean, default: false }, // if the follow up is required or not
    labTests: [
      {
        testType: { type: String, required: true },
        testCode: { type: String },
        doctorNotes: { type: String },
        status: {
          type: String,
          enum: ["requested", "sample_collected", "in_progress", "completed"],
          default: "requested",
        },
        pathologistId: { type: String }, // who processed the test
        completedAt: { type: Date }, // when test was completed
      },
    ],
    doctorNotes: { type: String, default: "" }, // notes given by the doctor
    prescription: { type: String, default: "" }, // prescription given by the doctor
    doctorComment: {
      type: String,
      default: "",
    },
    patientComment: {
      type: String,
      default: "",
    },
    doctorCommentAt: {
      type: Date,
    },
    patientCommentAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema); // collection name: appointments

export default appointmentModel;
