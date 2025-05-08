import jwt from "jsonwebtoken";

// middleware to check if the user is pathologist or not
const authReport = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "You are not authorized to access this route, login again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.LAB_EMAIL + process.env.LAB_PASSWORD) {
      return res.json({
        success: false,
        message: "You are not authorized to access this route",
      });
    }
    next();
  } catch (error) {
    console.log("Error in authLab: ", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authReport;
