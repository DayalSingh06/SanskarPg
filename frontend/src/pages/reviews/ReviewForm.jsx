import { useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const ReviewForm = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const { darkMode } = useTheme();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    if (!rating) {
      return alert("Please select rating");
    }

    try {
      const res = await axios.post(
        "/api/review/create",
        { review, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);

      setReview("");
      setRating(0);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex w-full justify-center sm:justify-start">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-lg rounded-2xl border p-4 transition-all duration-300 sm:p-6 ${
          darkMode
            ? "border-[#2a2438] bg-[#1a1625] shadow-lg shadow-black/40 hover:shadow-black/60"
            : "border-gray-200 bg-white shadow-md hover:shadow-xl"
        } `}
      >
        <h2
          className={`mb-4 text-xl font-semibold sm:text-2xl ${
            darkMode ? "text-white" : "text-gray-900"
          } `}
        >
          Write a Review
        </h2>

        {/* STAR RATING */}
        <div className="mb-5 flex flex-wrap gap-1.5 sm:gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl transition-all duration-200 hover:scale-110 active:scale-95 sm:text-3xl ${
                rating >= star
                  ? "scale-110 text-yellow-400"
                  : darkMode
                    ? "text-gray-500"
                    : "text-gray-400"
              } `}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          rows="6"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className={`min-h-35 w-full resize-none rounded-xl border p-3 text-sm transition-all duration-300 outline-none sm:p-4 sm:text-base ${
            darkMode
              ? "border-gray-700 bg-[#221d32] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
              : "border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
          } `}
        />

        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.01] hover:bg-blue-700 active:scale-[0.98] sm:text-base"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
