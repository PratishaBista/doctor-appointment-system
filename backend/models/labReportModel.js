import mongoose from "mongoose";

const labReportSchema = new mongoose.Schema(
  {
    appointmentId: { type: String, required: true },
    patientId: { type: String, required: true },
    doctorId: { type: String, required: true },
    pathologistId: { type: String, required: true },
    reportName: { type: String, required: true },
    reportFile: { type: String, required: true },
    testType: { type: String, required: true },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "completed", "reviewed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

labReportSchema.index({ patientId: 1, doctorId: 1 });
labReportSchema.index({ createdAt: -1 });

const labReportModel =
  mongoose.models.labReport || mongoose.model("labReport", labReportSchema);

export default labReportModel;
