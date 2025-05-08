import mongoose from "mongoose";


const reportSchema = new mongoose.Schema({
  
});

const reportModel = mongoose.models.report || mongoose.model("lab", reportSchema); // collection name: lab

export default reportModel;