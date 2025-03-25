import jwt from "jsonwebtoken";

// middleware to check if the user is admin or not
const authAdmin = async (req, res, next) => {
  try {
    const { admin_token } = req.headers;
    if (!admin_token) {
      return res.json({
        success: false,
        message: "You are not authorized to access this route, login again",
      });
    }
    const token_decode = jwt.verify(admin_token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "You are not authorized to access this route",
      });
    }
    next();
  } catch (error) {
    console.log("Error in authAdmin: ", error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export default authAdmin;
