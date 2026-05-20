import mongoose from "mongoose";
import { OTP_PURPOSE } from "../constants/otpPurpose.js";

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: Object.values(OTP_PURPOSE),
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

otpSchema.methods.compareOtp = async function (enteredOtp) {
  return enteredOtp === this.otp;
};

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
