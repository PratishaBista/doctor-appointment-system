import jwt from "jsonwebtoken";

// doctor auth middleware
const authDoctor = async (req, res, next) => {
  try {
    const { doctor_token } = req.headers;
    if (!doctor_token) {
      return res.json({
        success: false,
        message: "You are not authorized to access this route, login again",
      });
    }
    const token_decode = jwt.verify(doctor_token, process.env.JWT_SECRET);

    req.body.doctorId = token_decode.id;

    next();
  } catch (error) {
    console.log("Error in authDoctor: ", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authDoctor;
