import Users from "../../models/user.model.js";
import Otp from "../../models/otp.model.js";
import { createOtp } from "../../services/auth/otp.service.js";
import { sendOtpEmail } from "../../services/auth/email.service.js";
import { OTP_PURPOSE } from "../../constants/otpPurpose.js";

export const resendRegisterOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    await Otp.deleteMany({ userId, purpose: OTP_PURPOSE.REGISTER });

    const otp = await createOtp(userId, OTP_PURPOSE.REGISTER);

    try {
      await sendOtpEmail(user.email, otp, "Resend OTP - Verify Your Email");

      return res.status(200).json({
        success: true,
        message:
          "OTP resent successfully. If you don’t receive it within 2-3 minutes, please check your spam folder or use another email address.",
      });
    } catch (emailError) {
      return res.status(400).json({
        success: false,
        field: "email",
        message: "Invalid email address",
      });
    }
  } catch (error) {
    console.error("RESEND OTP ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
