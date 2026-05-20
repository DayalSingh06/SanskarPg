import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

const TotalReviewsCard = ({
  title,
  total,
  verified,
  notVerified,
  percentage,
  image,
}) => {
  const { darkMode } = useTheme();

  const navigate = useNavigate();

  return (
    <div
      className={`
        w-full
        p-6
        rounded-3xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        
        ${
          darkMode
            ? "bg-[#0f0c1c] text-white border border-[#2a2440]"
            : "bg-[#f5f7fb] text-[#0f0c1c] border border-[#e4e7ec]"
        }
      `}
    >
      {/* TOP */}
      <div className="flex items-start justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* IMAGE */}
          <div
            className={`
              p-3
              rounded-2xl
              ${darkMode ? "bg-[#1b1630]" : "bg-white shadow-sm"}
            `}
          >
            <img
              src={image}
              alt="review"
              className="w-14 h-14 object-contain"
            />
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-4xl font-bold tracking-tight">{total}</h2>

            <p
              className={`
                mt-1
                text-lg font-medium
                ${darkMode ? "text-gray-400" : "text-gray-500"}
              `}
            >
              {title}
            </p>
          </div>
        </div>

        {/* PERCENTAGE */}
        <div
          className="
            px-4 py-1.5
            text-white text-sm font-semibold
            bg-linear-to-r from-yellow-500 to-orange-500
            rounded-xl
            shadow-md
          "
        >
          {percentage}%
        </div>
      </div>

      {/* DIVIDER */}
      <div
        className={`
          my-6 border-t
          ${darkMode ? "border-[#2a2440]" : "border-[#dfe3ea]"}
        `}
      ></div>

      {/* BOTTOM */}
      <div className="flex items-center justify-between">
        {/* VERIFIED */}
        <div
          onClick={() => navigate("/admin/verified-reviews")}
          className="
            cursor-pointer
            transition-all
            duration-300
            hover:scale-105
          "
        >
          <p
            className={`
              text-sm font-medium
              ${darkMode ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Verified
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-500">{verified}</h3>
        </div>

        {/* CENTER LINE */}
        <div
          className={`
            h-12 w-px
            ${darkMode ? "bg-[#2a2440]" : "bg-[#d6dae1]"}
          `}
        ></div>

        {/* NOT VERIFIED */}
        <div
          onClick={() => navigate("/admin/not-verified-reviews")}
          className="
            cursor-pointer
            transition-all
            duration-300
            hover:scale-105
          "
        >
          <p
            className={`
              text-sm font-medium
              ${darkMode ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Not Verified
          </p>

          <h3 className="mt-1 text-2xl font-bold text-red-500">
            {notVerified}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TotalReviewsCard;
