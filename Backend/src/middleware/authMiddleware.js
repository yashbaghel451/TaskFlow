import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      next();
    } else {
      return res.status(401).json({
        message: "Not Authorized, No Token",
      });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(401).json({
      message: "Not Authorized",
    });
  }
};

export default protect;
