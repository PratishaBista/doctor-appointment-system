import jwt from "jsonwebtoken";

// user auth middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "You are not authorized to access this route, login again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log("Error in authUser: ", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
