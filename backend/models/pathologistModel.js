import mongoose from "mongoose";

const pathologistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  labName: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: { type: String },
  },
  phone: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Pathologist =
  mongoose.models.Pathologist ||
  mongoose.model("Pathologist", pathologistSchema);

export default Pathologist;
