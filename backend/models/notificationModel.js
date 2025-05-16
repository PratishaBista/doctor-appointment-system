import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userType: { 
      type: String, 
      required: true, 
      enum: ['patient', 'doctor', 'admin', 'pathologist'] 
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    relatedEntity: { 
      type: String, 
      enum: ['appointment', 'labReport', 'prescription', 'comment', 'system'] 
    },
    relatedEntityId: { type: String },
    isRead: { type: Boolean, default: false },
    priority: { 
      type: String, 
      enum: ['low', 'medium', 'high'], 
      default: 'medium' 
    },
    actionUrl: { type: String }, // URL to navigate when clicked
    metadata: { type: Object } // Additional data like appointment details
  },
  { timestamps: true }
);

const notificationModel = mongoose.models.notification || 
  mongoose.model("notification", notificationSchema);

export default notificationModel;