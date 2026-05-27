import React from "react";
import { Check, X, Star, RotateCcw } from "lucide-react";
import ContactButtonIcon from "../../../components/common/buttons/ContactButtonIcon";
import { useTheme } from "../../../context/ThemeContext";

const ReviewTable = ({
  review,
  onVerify,
  onDelete,
  showActions = false,
  onUnverify,
  showUnverify = false,
}) => {
  const { darkMode } = useTheme();

  // EMPTY STATE
  if (!review) {
    return (
      <div
        className={`mt-5 flex flex-col items-center justify-center rounded-3xl border px-6 py-16 text-center ${
          darkMode
            ? "border-[#2a2440] bg-[#0f0c1c] text-gray-400"
            : "border-[#e4e7ec] bg-white text-gray-500"
        } `}
      >
        <div className="mb-4 text-6xl">⭐</div>

        <h2
          className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"} `}
        >
          No Reviews Yet
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6">
          No user reviews are available right now. Once users submit
          reviews, they will appear here beautifully.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`mt-5 rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        darkMode
          ? "border-[#2a2440] bg-[#0f0c1c]"
          : "border-[#e4e7ec] bg-white"
      } `}
    >
      {/* TOP */}
      <div className="flex items-start justify-between gap-4">
        {/* LEFT */}
        <div>
          <h2 className="text-2xl font-bold">{review.name}</h2>

          <p className="mt-1 text-sm text-gray-500">{review.email}</p>

          <p className="text-sm text-gray-500">+{review.mobile}</p>
        </div>

        {/* STATUS */}
        <div
          className={`rounded-full px-4 py-1 text-sm font-semibold ${
            review.isVerified
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          } `}
        >
          {review.isVerified ? "Verified" : "Not Verified"}
        </div>
      </div>

      {/* STARS */}
      <div className="mt-4 flex items-center gap-1">
        {[...Array(review.rating)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* REVIEW */}
      <div
        className={`mt-5 rounded-2xl p-4 leading-7 ${
          darkMode
            ? "bg-[#1b1630] text-gray-300"
            : "bg-[#f5f7fb] text-gray-700"
        } `}
      >
        {review.review}
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex items-center justify-between">
        {/* CONTACT */}
        <div className="flex items-center gap-3">
          <ContactButtonIcon type="call" phone={review.mobile} />

          <ContactButtonIcon type="whatsapp" phone={review.mobile} />
        </div>

        {/* ADMIN ACTIONS */}
        {showActions && (
          <div className="flex items-center gap-3">
            {/* VERIFY */}
            <button
              onClick={() => onVerify(review._id)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white transition-all hover:bg-green-600"
            >
              <Check size={20} />
            </button>

            {/* DELETE */}
            <button
              onClick={() => onDelete(review._id)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white transition-all hover:bg-red-600"
            >
              <X size={20} />
            </button>
            {showUnverify && (
              <button
                onClick={() => onUnverify(review._id)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white transition-all hover:bg-orange-600"
              >
                <RotateCcw size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewTable;
