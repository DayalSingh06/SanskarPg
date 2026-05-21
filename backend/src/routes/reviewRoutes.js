import express from "express";
import { sendOtpEmail } from "../services/auth/email.service.js";

import {
  createReview,
  getReviewStats,
  getVerifiedReviews,
  getNotVerifiedReviews,
  verifyReview,
  unverifyReview,
  deleteReview,
} from "../controllers/reviews/review.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyToken, createReview);

router.get("/stats", getReviewStats);

router.get("/verified", getVerifiedReviews);

router.put("/unverify/:id", unverifyReview);

router.get("/not-verified", getNotVerifiedReviews);

router.put("/verify/:id", verifyReview);

router.delete("/delete/:id", deleteReview);

router.get("/test-email", async (req, res) => {
  try {
    await sendOtpEmail("dayalsingh98191@gmail.com", "123456");

    return res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
