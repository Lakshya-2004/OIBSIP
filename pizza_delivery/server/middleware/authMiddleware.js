import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (
  req,
  res,
  next
) => {
  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer "
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];

    }

    if (!token) {

      return res.status(401).json({
        success: false,
        message:
          "Access denied. No token provided.",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found.",
      });

    }

    req.user = user;

    next();

  } catch (error) {

    console.log(
      "Auth Middleware Error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Unauthorized access.",
    });

  }
};

export const authMiddleware = protect;

export const adminOnly = (
  req,
  res,
  next
) => {
  try {

    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized user.",
      });

    }

    if (req.user.role !== "admin") {

      return res.status(403).json({
        success: false,
        message:
          "Access denied. Admin only.",
      });

    }

    next();

  } catch (error) {

    console.log(
      "Admin Middleware Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error in admin middleware.",
    });

  }
};