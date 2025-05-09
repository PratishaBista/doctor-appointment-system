import jwt from "jsonwebtoken";
import pathologistModel from "../models/pathologistModel.js";

const authPathologist = async (req, res, next) => {
  try {
    const pathologist_token = req.headers['pathologist_token'] || req.headers.pathologist_token;
    
    if (!pathologist_token) {
      return res.status(401).json({
        success: false,
        message: "Pathologist authentication token required"
      });
    }

    const decoded = jwt.verify(pathologist_token, process.env.JWT_SECRET);
    
    const pathologist = await pathologistModel.findOne({
      _id: decoded.id,
      isActive: true
    });

    if (!pathologist) {
      return res.status(403).json({
        success: false,
        message: "Pathologist account not found or inactive"
      });
    }

    req.user = { id: pathologist._id };
    req.pathologist_token = pathologist_token;
    req.pathologist = pathologist;
    next();
    
  } catch (error) {
    console.error("Pathologist auth error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid pathologist token",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export default authPathologist;