import jwt from "jsonwebtoken";

// user auth middleware
const authUser = async (req, res, next) => {
  try {
    const { user_token } = req.headers;
    if (!user_token) {
      return res.json({
        success: false,
        message: "You are not authorized to access this route, login again",
      });
    }
    const token_decode = jwt.verify(user_token, process.env.JWT_SECRET);

    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log("Error in authAdmin: ", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
