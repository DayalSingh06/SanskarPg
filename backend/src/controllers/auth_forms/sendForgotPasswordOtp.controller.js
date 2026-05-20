import User from "../../models/user.model.js";
import Otp from "../../models/otp.model.js";
import { createOtp } from "../../services/auth/otp.service.js";
import { sendOtpEmail } from "../../services/auth/email.service.js";
import { OTP_PURPOSE } from "../../constants/otpPurpose.js";

export const sendForgotPasswordOtp = async (req, res) => {
  try {
    let { email } = req.body;

    email = email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "If this email is registered, OTP will be sent",
      });
    }

    const recentOtp = await Otp.findOne({
      userId: user._id,
      purpose: OTP_PURPOSE.FORGOT_PASSWORD,
    }).sort({ createdAt: -1 });

    if (recentOtp && Date.now() - recentOtp.createdAt < 30000) {
      return res.status(429).json({
        message: "Please wait before requesting another OTP",
      });
    }

    await Otp.deleteMany({
      userId: user._id,
      purpose: OTP_PURPOSE.FORGOT_PASSWORD,
    });

    const otp = await createOtp(user._id, OTP_PURPOSE.FORGOT_PASSWORD, 10);

    try {
      await sendOtpEmail(email, otp, "Reset Password OTP");

      return res.status(200).json({
        success: true,
        message: "OTP sent to email",
        userId: user._id,
      });
    } catch (emailError) {
      return res.status(400).json({
        success: false,
        field: "email",
        message: "Invalid email address",
      });
    }
  } catch (error) {
    console.error("SEND FORGOT PASSWORD OTP ERROR:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
