import Users from "../../models/user.model.js";
import Otp from "../../models/otp.model.js";
import { OTP_PURPOSE } from "../../constants/otpPurpose.js";

export const verifyRegisterOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ message: "UserId and OTP are required" });
    }

    const record = await Otp.findOne({
      userId,
      otp: otp.toString(),
      purpose: OTP_PURPOSE.REGISTER,
    });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });

    if (record.expiresAt < Date.now()) {
      await Otp.deleteOne({ _id: record._id });
      return res.status(400).json({ message: "OTP expired" });
    }

    await Users.findByIdAndUpdate(userId, { isVerified: true });
    await Otp.deleteMany({ userId, purpose: OTP_PURPOSE.REGISTER });

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("VERIFY REGISTER OTP ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
