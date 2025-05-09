import mongoose from "mongoose";

const labReportSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment",
      required: true,
    },
    patientId: { type: String, required: true },
    doctorId: { type: String, required: true },
    pathologistId: { type: String, required: true },
    reportName: { type: String, required: true },
    reportFile: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    labTestId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    testType: { type: String, required: true },
    notes: { type: String, default: "" },
    isViewedByDoctor: { type: Boolean, default: false },
    isViewedByPatient: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const labReportModel =
  mongoose.models.labReport || mongoose.model("labReport", labReportSchema);

export default labReportModel;
