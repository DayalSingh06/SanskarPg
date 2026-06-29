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
  getUserReviews,
} from "../controllers/reviews/review.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/create", verifyToken, createReview);

router.get("/stats", getReviewStats);

router.get("/user", verifyToken, getUserReviews);

router.get("/verified", getVerifiedReviews);

router.put("/unverify/:id", verifyToken, isAdmin, unverifyReview);

router.get("/not-verified", verifyToken, isAdmin, getNotVerifiedReviews);

router.put("/verify/:id", verifyToken, isAdmin, verifyReview);

router.delete("/delete/:id", verifyToken, isAdmin, deleteReview);

export default router;
