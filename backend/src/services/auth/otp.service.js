import Otp from "../../models/otp.model.js";
import { generateOtp } from "../../utils/generateOtp.util.js";

export const createOtp = async (userId, purpose, minutes = 5) => {
  const otp = generateOtp();

  await Otp.create({
    userId,
    otp,
    purpose,
    expiresAt: new Date(Date.now() + minutes * 60 * 1000),
  });
  return otp;
};
