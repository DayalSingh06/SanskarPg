import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import { RefreshIcon, EditIcon } from "../icons/SvgIcons";

const WelcomeBanner = () => {
  const { darkMode } = useTheme();

  const user = JSON.parse(localStorage.getItem("user"));

  const firstName = user?.name?.split(" ")[0] || "";

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
      className={`
        overflow-hidden
        w-full min-h-35
        px-3 py-4
        rounded-2xl
        select-none transition-all
        relative duration-300
        sm:px-5
        md:px-7 md:py-5
        ${darkMode ? "bg-[#202c4a]" : "bg-white border border-gray-200 shadow-sm"}
      `}
    >
      <img
        src="/assets/banner/shape-04.png"
        alt=""
        className="
          w-4
          opacity-80 pointer-events-none
          absolute top-0 left-[25%]
          sm:w-5
          md:w-6
        "
      />

      <img
        src="/assets/banner/shape-01.png"
        alt=""
        className="
          w-14
          opacity-70 pointer-events-none
          absolute bottom-0 right-60
          sm:w-16
          md:w-20
        "
      />

      <img
        src="/assets/banner/shape-02.png"
        alt=""
        className="
          w-7
          opacity-70 pointer-events-none
          absolute top-2 right-25
          sm:w-8
          md:w-10
        "
      />

      <img
        src="/assets/banner/shape-03.png"
        alt=""
        className="
          w-14
          opacity-70 pointer-events-none
          absolute bottom-0 right-0
          sm:w-16
          md:w-20
        "
      />

      <div
        className="
          z-10 flex flex-col
          relative gap-5
          md:flex-row md:items-center md:justify-between
        "
      >
        {/* Left */}
        <div>
          <h1
            className={`
              flex flex-wrap
              text-xl font-bold leading-snug
              items-center gap-2
              sm:text-2xl
              md:text-3xl
              ${darkMode ? "text-white" : "text-gray-900"}
            `}
          >
            Welcome Back, Mr. {firstName}
            <span
              className={`
                p-2
                rounded-lg
                cursor-pointer transition-all
                duration-300
                ${
                  darkMode
                    ? "bg-[#39435e] hover:bg-[#3d5de0]"
                    : "bg-gray-200 hover:bg-blue-500 hover:text-white"
                }
              `}
            >
              <EditIcon />
            </span>
          </h1>

          <p
            className={`
              mt-2
              text-sm
              sm:text-base
              ${darkMode ? "text-gray-200" : "text-gray-600"}
            `}
          >
            {getGreeting()}
          </p>
        </div>

        {/* Right */}
        {lastSeen && (
          <div
            className={`
              flex
              text-xs font-medium
              items-center gap-2
              sm:text-sm
              ${darkMode ? "text-gray-200" : "text-gray-600"}
            `}
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
