import Review from "../../models/review.model.js";
import User from "../../models/user.model.js";

export const createReview = async (req, res) => {
  try {
    const { review, rating } = req.body;

    // ✅ Validation
    if (!review || review.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Review is required",
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Please select valid rating",
      });
    }

    // ✅ Find User
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Create Review
    const newReview = await Review.create({
      userId: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      review,
      rating,
      isVerified: false,
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getReviewStats = async (req, res) => {
  try {
    // TOTAL REVIEWS
    const totalReviews = await Review.countDocuments();

    // VERIFIED REVIEWS
    const verifiedReviews = await Review.countDocuments({
      isVerified: true,
    });

    // NOT VERIFIED REVIEWS
    const notVerifiedReviews = await Review.countDocuments({
      isVerified: false,
    });

    // VERIFIED PERCENTAGE
    const percentage =
      totalReviews > 0
        ? ((verifiedReviews / totalReviews) * 100).toFixed(1)
        : 0;

    res.status(200).json({
      success: true,

      data: {
        totalReviews,
        verifiedReviews,
        notVerifiedReviews,
        percentage,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getVerifiedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      isVerified: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getNotVerifiedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      isVerified: false,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const unverifyReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        isVerified: false,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const verifyReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        isVerified: true,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Review Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
