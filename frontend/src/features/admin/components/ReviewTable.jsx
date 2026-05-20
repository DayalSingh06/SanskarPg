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

  return (
    <div
      className={`
        p-6 mt-5
        rounded-3xl border
        transition-all
        duration-300 hover:-translate-y-1 hover:shadow-2xl
        ${
          darkMode
            ? "bg-[#0f0c1c] border-[#2a2440]"
            : "bg-white border-[#e4e7ec]"
        }
      `}
    >
      {/* TOP */}
      <div
        className="
          flex
          items-start justify-between gap-4
        "
      >
        {/* LEFT */}
        <div>
          <h2
            className="
              text-2xl font-bold
            "
          >
            {review.name}
          </h2>

          <p
            className="
              mt-1
              text-sm text-gray-500
            "
          >
            {review.email}
          </p>

          <p
            className="
              text-sm text-gray-500
            "
          >
            +{review.mobile}
          </p>
        </div>

        {/* STATUS */}
        <div
          className={`
            px-4 py-1
            text-sm font-semibold
            rounded-full
            ${
              review.isVerified
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }
          `}
        >
          {review.isVerified ? "Verified" : "Not Verified"}
        </div>
      </div>

      {/* STARS */}
      <div
        className="
          flex
          mt-4
          items-center gap-1
        "
      >
        {[...Array(review.rating)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className="
              text-yellow-400
              fill-yellow-400
            "
          />
        ))}
      </div>

      {/* REVIEW */}
      <div
        className={`
          mt-5 p-4
          leading-7
          rounded-2xl
          ${
            darkMode
              ? "bg-[#1b1630] text-gray-300"
              : "bg-[#f5f7fb] text-gray-700"
          }
        `}
      >
        {review.review}
      </div>

      {/* ACTIONS */}
      <div
        className="
          flex
          mt-6
          items-center justify-between
        "
      >
        {/* CONTACT */}
        <div
          className="
            flex
            items-center gap-3
          "
        >
          <ContactButtonIcon type="call" phone={review.mobile} />

          <ContactButtonIcon type="whatsapp" phone={review.mobile} />
        </div>

        {/* ADMIN ACTIONS */}
        {showActions && (
          <div
            className="
              flex
              items-center gap-3
            "
          >
            {/* VERIFY */}
            <button
              onClick={() => onVerify(review._id)}
              className="
                flex
                w-11 h-11
                text-white
                bg-green-500
                rounded-full
                transition-all
                hover:bg-green-600 items-center justify-center
              "
            >
              <Check size={20} />
            </button>
            
            {/* DELETE */}
            <button
              onClick={() => onDelete(review._id)}
              className="
                flex
                w-11 h-11
                text-white
                bg-red-500
                rounded-full
                transition-all
                hover:bg-red-600 items-center justify-center
              "
            >
              <X size={20} />
            </button>
            {showUnverify && (
              <button
                onClick={() => onUnverify(review._id)}
                className="
                flex
                w-11 h-11
                text-white
                bg-orange-500
                rounded-full
                transition-all
                hover:bg-orange-600 items-center justify-center
              "
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
