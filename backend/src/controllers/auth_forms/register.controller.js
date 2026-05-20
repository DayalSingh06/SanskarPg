import Users from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import { createOtp } from "../../services/auth/otp.service.js";
import { sendOtpEmail } from "../../services/auth/email.service.js";
import { OTP_PURPOSE } from "../../constants/otpPurpose.js";
// import { checkBounceWithinTime } from "../../services/auth/bounce.service.js";

export const register = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        field: "general",
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await Users.findOne({ email: normalizedEmail });

    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        field: "email",
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let user;

    if (existingUser && !existingUser.isVerified) {
      existingUser.name = name;
      existingUser.mobile = mobile;
      existingUser.password = hashedPassword;
      existingUser.role = role;

      await existingUser.save();
      user = existingUser;
    } else {
      user = await Users.create({
        name,
        email: normalizedEmail,
        mobile,
        password: hashedPassword,
        role,
        isVerified: false,
      });
    }

    // OTP generate
    const otp = await createOtp(user._id, OTP_PURPOSE.REGISTER);

    // SEND EMAIL
    try {
      await sendOtpEmail(user.email, otp);

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        userId: user._id,
        showOtpModal: true,
      });

      // WAIT 30 sec & check bounce
      /* const bounceResult = await checkBounceWithinTime(30000);*/
      // const bounceResult = await checkBounceWithinTime(user.email, 30000);

      // if (bounceResult.bounce) {
      //   return res.status(400).json({
      //     success: false,
      //     field: "email",
      //     message: "Invalid email address",
      //     showOtpModal: false,
      //   });
      // }

      // // NO BOUNCE → OPEN OTP
      // return res.status(200).json({
      //   success: true,
      //   message: "OTP sent successfully",
      //   userId: user._id,
      //   showOtpModal: true,
      // });
    } catch (error) {
      console.log("EMAIL FLOW ERROR:", error);

      return res.status(400).json({
        success: false,
        field: error?.field || "email",
        message: error?.message || "Email processing failed",
        showOtpModal: false,
      });
    }
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};
