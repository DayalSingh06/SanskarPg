import express from "express";
import multer from "multer";

import { register } from "../controllers/auth_forms/register.controller.js";
import { verifyRegisterOtp } from "../controllers/auth_forms/verifyRegisterOtp.controller.js";
import { resendRegisterOtp } from "../controllers/auth_forms/resendOtp.controller.js";
import { loginUser } from "../controllers/auth_forms/login.controller.js";
import { sendForgotPasswordOtp } from "../controllers/auth_forms/sendForgotPasswordOtp.controller.js";
import { verifyForgotPasswordOtp } from "../controllers/auth_forms/verifyForgotPasswordOtp.controller.js";
import { resetPassword } from "../controllers/auth_forms/resetPassword.controller.js";

const router = express.Router(); // Express ka Router object ban raha hai, Isme hum related routes group karte hain

router.post("/register", register);
router.post("/verify-otp", verifyRegisterOtp);
router.post("/resend-otp", resendRegisterOtp);
router.post("/login", loginUser);
router.post("/forgot-password/send-otp", sendForgotPasswordOtp);
router.post("/forgot-password/verify-otp", verifyForgotPasswordOtp);
router.post("/forgot-password/reset", resetPassword);

export default router;
