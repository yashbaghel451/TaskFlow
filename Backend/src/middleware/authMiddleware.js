import jwt from "jsonwebtoken";
import User from "../model/User.model.js"

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decode.id).select("-password");

      if (!req.user) {
        res.status(400).json({
          message: "Invalid Token",
        })
      }
      next();
    } catch (err) {
      console.log(err);
    }
  }
  else{
    return res.json({
      message:"Not Authorized",
    })
  }
}

export default protect;