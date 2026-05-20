import Otp from "../../models/otp.model.js";
import { OTP_PURPOSE } from "../../constants/otpPurpose.js";

export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        message: "UserId and OTP are required",
      });
    }

    const record = await Otp.findOne({
      userId,
      purpose: OTP_PURPOSE.FORGOT_PASSWORD,
    });

    if (!record) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    if (record.expiresAt < Date.now()) {
      await Otp.deleteOne({ _id: record._id });
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (record.attempts >= 5) {
      await Otp.deleteOne({ _id: record._id });
      return res.status(400).json({
        message: "Too many attempts. Request new OTP",
      });
    }

    const isValid = await record.compareOtp(otp);

    if (!isValid) {
      record.attempts += 1;
      await record.save();

      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    await Otp.deleteOne({ _id: record._id });

    return res.status(200).json({
      message: "OTP verified",
      userId: record.userId.toString(),
    });
  } catch (error) {
    console.error("VERIFY FORGOT OTP ERROR:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
