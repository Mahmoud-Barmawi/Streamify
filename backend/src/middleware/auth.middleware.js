import jwt from "jsonwebtoken";
import User from "../models/User.js";
export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt_token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.json({ message: "Unauthorized - User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect route middleware", error);
  }
}
