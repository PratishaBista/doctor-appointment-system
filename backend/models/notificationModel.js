import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Can be patientId, doctorId, or adminId
    userType: { type: String, required: true, enum: ['patient', 'doctor', 'admin', 'pathologist'] },
    title: { type: String, required: true },
    message: { type: String, required: true },
    relatedEntity: { type: String, enum: ['appointment', 'labReport', 'system'] },
    relatedEntityId: { type: String }, // ID of appointment, lab report, etc.
    isRead: { type: Boolean, default: false },
    isImportant: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const notificationModel = mongoose.models.notification || mongoose.model("notification", notificationSchema);

export default notificationModel;