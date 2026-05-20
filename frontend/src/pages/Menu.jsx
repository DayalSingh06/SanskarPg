import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useTheme } from "../context/ThemeContext";

const WeeklyMenu = () => {
  const { darkMode } = useTheme();

  const [menuData, setMenuData] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH MENU
  const fetchMenu = async () => {
    try {
      const res = await axios.get("/api/admin/get/menu");

      if (res.data?.weeklyMenu) {
        setMenuData(res.data.weeklyMenu);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div
      className={`
        min-h-screen
        px-3 py-6
        transition-all
        duration-300
        sm:px-4 sm:py-8
        ${
          darkMode
            ? "bg-linear-to-br from-[#020617] via-[#0f172a] to-[#1e293b] text-white"
            : "bg-linear-to-br from-[#e2e8f0] via-[#f8fafc] to-[#cbd5e1] text-black"
        }
      `}
    >
      {/* HEADER */}
      <div
        className="
          max-w-7xl
          mx-auto mb-8
        "
      >
        <div
          className={`
            p-4
            rounded-3xl border
            shadow-2xl
            backdrop-blur-xl
            sm:p-6
            ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/70 border-gray-200"
            }
          `}
        >
          <div
            className="
              text-center
            "
          >
            <h1
              className="
                text-2xl font-extrabold tracking-wide
                sm:text-3xl
                md:text-4xl
              "
            >
              🍽️ Weekly Food Menu
            </h1>

            <p
              className={`
                mt-3
                text-xs
                sm:text-sm
                ${darkMode ? "text-slate-300" : "text-slate-600"}
              `}
            >
              Check your daily breakfast, lunch & dinner schedule
            </p>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="
          overflow-x-auto
          max-w-7xl
          mx-auto
        "
      >
        <div
          className={`
            overflow-hidden
            rounded-3xl border
            shadow-2xl
            backdrop-blur-xl
            ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white/70 border-gray-200"
            }
          `}
        >
          {loading ? (
            <div
              className="
                p-10
                text-center text-lg font-semibold
              "
            >
              Loading Menu...
            </div>
          ) : (
            <table
              className="
                w-full
              "
            >
              <thead>
                <tr
                  className={`
                    text-center
                    ${darkMode ? "bg-white/10" : "bg-slate-100"}
                  `}
                >
                  <th
                    className="
                      p-5
                      text-lg font-bold
                    "
                  >
                    📅 Day
                  </th>

                  <th
                    className="
                      p-5
                    "
                  >
                    <div
                      className="
                        flex flex-col
                        items-center
                      "
                    >
                      <span
                        className="
                          text-lg font-bold
                        "
                      >
                        🍞 Breakfast
                      </span>

                      <span
                        className="
                          mt-1
                          text-xs
                          opacity-70
                        "
                      >
                        7:00 AM - 9:00 AM
                      </span>
                    </div>
                  </th>

                  <th
                    className="
                      p-5
                    "
                  >
                    <div
                      className="
                        flex flex-col
                        items-center
                      "
                    >
                      <span
                        className="
                          text-lg font-bold
                        "
                      >
                        🍛 Lunch
                      </span>

                      <span
                        className="
                          mt-1
                          text-xs
                          opacity-70
                        "
                      >
                        12:00 PM - 2:00 PM
                      </span>
                    </div>
                  </th>

                  <th
                    className="
                      p-5
                    "
                  >
                    <div
                      className="
                        flex flex-col
                        items-center
                      "
                    >
                      <span
                        className="
                          text-lg font-bold
                        "
                      >
                        🍽️ Dinner
                      </span>

                      <span
                        className="
                          mt-1
                          text-xs
                          opacity-70
                        "
                      >
                        7:30 PM - 9:30 PM
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {menuData.map((item, index) => (
                  <tr
                    key={index}
                    className={`
                      border-t
                      transition-all
                      duration-300
                      ${
                        item.day === "Sunday" || item.day === "Thursday"
                          ? darkMode
                            ? "bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/30"
                            : "bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
                          : darkMode
                            ? "hover:bg-white/5 border-white/10"
                            : "hover:bg-slate-50 border-gray-200"
                      }
                    `}
                  >
                    {/* DAY */}
                    <td
                      className="
                        p-5
                        text-center font-bold text-lg
                      "
                    >
                      {item.day}
                    </td>

                    {/* BREAKFAST */}
                    <td
                      className="
                        p-5
                      "
                    >
                      <div
                        className={`
                          p-4
                          text-center font-medium
                          rounded-2xl
                          ${darkMode ? "bg-slate-800/70" : "bg-slate-100"}
                        `}
                      >
                        {item.breakfast || "Not Updated"}
                      </div>
                    </td>

                    {/* LUNCH */}
                    <td
                      className="
                        p-5
                      "
                    >
                      <div
                        className={`
                          p-4
                          text-center font-medium
                          rounded-2xl
                          ${darkMode ? "bg-slate-800/70" : "bg-slate-100"}
                        `}
                      >
                        {item.lunch || "Not Updated"}
                      </div>
                    </td>

                    {/* DINNER */}
                    <td
                      className="
                        p-5
                      "
                    >
                      <div
                        className={`
                          p-4
                          text-center font-medium
                          rounded-2xl
                          transition-all
                          ${
                            item.day === "Sunday" || item.day === "Thursday"
                              ? darkMode
                                ? "bg-yellow-500/20 border border-yellow-400 text-yellow-200"
                                : "bg-yellow-200 border border-yellow-400 text-yellow-900"
                              : darkMode
                                ? "bg-slate-800/70"
                                : "bg-slate-100"
                          }
                        `}
                      >
                        {item.dinner || "Not Updated"}

                        {(item.day === "Sunday" || item.day === "Thursday") && (
                          <p
                            className="
                              mt-2
                              text-xs font-semibold
                            "
                          >
                            ⭐ Special Dinner
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* SPECIAL NOTE */}

        <div
          className="
            max-w-7xl
            mx-auto mt-6
          "
        >
          <div
            className={`
              px-5 py-4
              text-sm font-medium
              rounded-2xl border
              shadow-lg
              ${
                darkMode
                  ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-200"
                  : "bg-yellow-100 border-yellow-300 text-yellow-900"
              }
            `}
          >
            ⭐ Note: Sunday and Thursday dinners are special meals for all
            students.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyMenu;
