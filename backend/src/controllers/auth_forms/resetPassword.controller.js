import mongoose from "mongoose";
import User from "../../models/user.model.js";
import Otp from "../../models/otp.model.js";
import bcrypt from "bcryptjs";

export const resetPassword = async (req, res) => {
  try {
    const { userId, password, confirmPassword } = req.body;

    if (!userId || !password || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // MongoDB ObjectId valid hai ya nahi
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    await Otp.deleteMany({
      userId,
      purpose: "FORGOT_PASSWORD",
    });

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR :", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
