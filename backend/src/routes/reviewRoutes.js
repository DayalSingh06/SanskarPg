import express from "express";

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

export default router;
