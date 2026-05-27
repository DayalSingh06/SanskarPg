import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

const TotalUsersCard = ({
  title,
  total,
  registered,
  rejected,
  percentage,
  image,
}) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`w-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        darkMode
          ? "border border-[#2a2440] bg-[#0f0c1c] text-white"
          : "border border-[#e4e7ec] bg-[#f5f7fb] text-[#0f0c1c]"
      } `}
    >
      {/* TOP */}
      <div className="flex items-start justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* IMAGE BOX */}
          <div
            className={`rounded-2xl p-3 ${darkMode ? "bg-[#1b1630]" : "bg-white shadow-sm"} `}
          >
            <img
              src={image}
              alt="icon"
              className="h-14 w-14 object-contain"
            />
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-4xl font-bold tracking-tight">
              {total}
            </h2>

            <p
              className={`mt-1 text-lg font-medium ${darkMode ? "text-gray-400" : "text-gray-500"} `}
            >
              {title}
            </p>
          </div>
        </div>

        {/* BADGE */}
        <div className="rounded-xl bg-linear-to-r from-green-500 to-emerald-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md">
          {percentage}%
        </div>
      </div>

      {/* DIVIDER */}
      <div
        className={`my-6 border-t ${darkMode ? "border-[#2a2440]" : "border-[#dfe3ea]"} `}
      ></div>

      {/* BOTTOM */}
      <div className="flex items-center justify-between">
        {/* REGISTERED */}
        <div
          onClick={() => navigate("/admin/registered-users")}
          className="cursor-pointer transition-all duration-300 hover:scale-105"
        >
          <p
            className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"} `}
          >
            Registered
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-500">
            {registered}
          </h3>
        </div>

        {/* CENTER LINE */}
        <div
          className={`h-12 w-px ${darkMode ? "bg-[#2a2440]" : "bg-[#d6dae1]"} `}
        ></div>

        {/* REJECTED */}
        <div
          onClick={() => navigate("/admin/rejected-users")}
          className="cursor-pointer transition-all duration-300 hover:scale-105"
        >
          <p
            className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"} `}
          >
            Rejected
          </p>

          <h3 className="mt-1 text-2xl font-bold text-red-500">
            {rejected}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TotalUsersCard;
