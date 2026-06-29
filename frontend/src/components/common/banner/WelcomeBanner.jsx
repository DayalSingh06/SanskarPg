import React, { useMemo } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { RefreshIcon } from "../icons/SvgIcons";

const WelcomeBanner = ({ onEdit }) => {
  const { darkMode } = useTheme();

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  }, []);

  const firstName = user?.name?.trim()?.split(" ")[0] || "User";

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Have a Good Morning";
    if (hour < 17) return "Have a Good Afternoon";
    if (hour < 21) return "Have a Good Evening";
    return "Have a Good Night";
  };

  const lastSeen = user?.lastLogin
    ? new Date(user.lastLogin).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div
      className={`relative min-h-25 w-full overflow-hidden rounded-2xl px-3 py-4 transition-all duration-300 select-none sm:px-5 md:px-7 md:py-5 ${
        darkMode ? "bg-[#202c4a]" : "border border-gray-200 bg-white shadow-sm"
      }`}
    >
      <img
        src="/assets/banner/shape-04.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-[25%] w-4 opacity-80 sm:w-5 md:w-6"
      />
      <img
        src="/assets/banner/shape-01.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-60 bottom-0 w-14 opacity-70 sm:w-16 md:w-20"
      />
      <img
        src="/assets/banner/shape-02.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-2 right-25 w-7 opacity-70 sm:w-8 md:w-10"
      />
      <img
        src="/assets/banner/shape-03.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 w-14 opacity-70 sm:w-16 md:w-20"
      />

      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1
            className={`flex flex-wrap items-center gap-2 text-xl leading-snug font-bold sm:text-2xl md:text-3xl ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome Back, {firstName}
          </h1>

          <p
            className={`mt-2 text-sm sm:text-base ${darkMode ? "text-gray-200" : "text-gray-600"}`}
          >
            {getGreeting()}
          </p>
        </div>

        {lastSeen && (
          <div
            className={`flex items-center gap-2 text-xs font-medium sm:text-sm ${darkMode ? "text-gray-200" : "text-gray-600"}`}
          >
            <RefreshIcon />
            Last Seen on {lastSeen}
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeBanner;
