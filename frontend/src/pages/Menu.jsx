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
      className={`min-h-screen px-3 py-6 transition-all duration-300 sm:px-4 sm:py-8 ${
        darkMode
          ? "bg-linear-to-br from-[#020617] via-[#0f172a] to-[#1e293b] text-white"
          : "bg-linear-to-br from-[#e2e8f0] via-[#f8fafc] to-[#cbd5e1] text-black"
      } `}
    >
      {/* HEADER */}
      <div className="mx-auto mb-8 max-w-7xl">
        <div
          className={`rounded-3xl border p-4 shadow-2xl backdrop-blur-xl sm:p-6 ${
            darkMode
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-white/70"
          } `}
        >
          <div className="text-center">
            <h1 className="text-2xl font-extrabold tracking-wide sm:text-3xl md:text-4xl">
              🍽️ Weekly Food Menu
            </h1>

            <p
              className={`mt-3 text-xs sm:text-sm ${darkMode ? "text-slate-300" : "text-slate-600"} `}
            >
              Check your daily breakfast, lunch & dinner schedule
            </p>
          </div>
        </div>
      </div>

      {/* MENU CONTENT */}
      <div className="mx-auto max-w-6xl">
        <div
          className={`overflow-hidden rounded-2xl border shadow-xl ${darkMode ? "border-white/10 bg-white/5" : "border-gray-200 bg-white/80"} `}
        >
          {loading ? (
            <div className="py-10 text-center text-base font-semibold">
              Loading Menu...
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr
                      className={`text-center ${darkMode ? "bg-white/10" : "bg-slate-100"} `}
                    >
                      <th className="px-3 py-3 text-sm font-bold">
                        Day
                      </th>

                      <th className="px-3 py-3 text-sm font-bold">
                        Breakfast
                      </th>

                      <th className="px-3 py-3 text-sm font-bold">
                        Lunch
                      </th>

                      <th className="px-3 py-3 text-sm font-bold">
                        Dinner
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {menuData.map((item, index) => (
                      <tr
                        key={index}
                        className={`border-t text-center ${
                          item.day === "Sunday" ||
                          item.day === "Thursday"
                            ? darkMode
                              ? "border-yellow-500/20 bg-yellow-500/10"
                              : "border-yellow-200 bg-yellow-50"
                            : darkMode
                              ? "border-white/10"
                              : "border-gray-200"
                        } `}
                      >
                        <td className="px-3 py-3 text-sm font-bold">
                          {item.day}
                        </td>

                        <td className="px-3 py-3 text-sm">
                          {item.breakfast}
                        </td>

                        <td className="px-3 py-3 text-sm">
                          {item.lunch}
                        </td>

                        <td className="px-3 py-3 text-sm font-medium">
                          {item.dinner}

                          {(item.day === "Sunday" ||
                            item.day === "Thursday") && (
                            <p className="mt-1 text-[10px] font-semibold text-yellow-500">
                              ⭐ Special
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS */}
              <div className="flex flex-col gap-3 p-3 md:hidden">
                {menuData.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border p-3 ${
                      item.day === "Sunday" || item.day === "Thursday"
                        ? darkMode
                          ? "border-yellow-500/30 bg-yellow-500/10"
                          : "border-yellow-300 bg-yellow-50"
                        : darkMode
                          ? "border-white/10 bg-white/5"
                          : "border-gray-200 bg-white"
                    } `}
                  >
                    {/* DAY */}
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-base font-bold">
                        📅 {item.day}
                      </h2>

                      {(item.day === "Sunday" ||
                        item.day === "Thursday") && (
                        <span className="text-[10px] font-semibold text-yellow-500">
                          ⭐ Special
                        </span>
                      )}
                    </div>

                    {/* ITEMS */}
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-semibold">
                          Breakfast:
                        </span>{" "}
                        {item.breakfast}
                      </div>

                      <div>
                        <span className="font-semibold">Lunch:</span>{" "}
                        {item.lunch}
                      </div>

                      <div>
                        <span className="font-semibold">Dinner:</span>{" "}
                        {item.dinner}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* NOTE */}
        <div
          className={`mt-4 rounded-xl border px-4 py-3 text-xs font-medium ${
            darkMode
              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-200"
              : "border-yellow-300 bg-yellow-100 text-yellow-900"
          } `}
        >
          ⭐ Sunday & Thursday dinners are special meals.
        </div>
      </div>
    </div>
  );
};

export default WeeklyMenu;
