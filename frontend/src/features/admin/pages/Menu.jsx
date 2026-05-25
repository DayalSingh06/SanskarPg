import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { useTheme } from "../../../context/ThemeContext";

const Menu = () => {
  const { darkMode } = useTheme();

  const defaultMenu = [
    {
      day: "Sunday",
      breakfast: "",
      lunch: "",
      dinner: "",
    },
    {
      day: "Monday",
      breakfast: "",
      lunch: "",
      dinner: "",
    },
    {
      day: "Tuesday",
      breakfast: "",
      lunch: "",
      dinner: "",
    },
    {
      day: "Wednesday",
      breakfast: "",
      lunch: "",
      dinner: "",
    },
    {
      day: "Thursday",
      breakfast: "",
      lunch: "",
      dinner: "",
    },
    {
      day: "Friday",
      breakfast: "",
      lunch: "",
      dinner: "",
    },
    {
      day: "Saturday",
      breakfast: "",
      lunch: "",
      dinner: "",
    },
  ];

  const [menuData, setMenuData] = useState(defaultMenu);
  const [loading, setLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);

  // FETCH MENU
  const fetchMenu = async () => {
    try {
      const res = await axios.get("/api/admin/get/menu");

      if (res.data?.weeklyMenu?.length > 0) {
        setMenuData(res.data.weeklyMenu);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // HANDLE CHANGE
  const handleChange = (index, field, value) => {
    const updatedMenu = [...menuData];

    updatedMenu[index][field] = value;

    setMenuData(updatedMenu);
  };

  // SAVE MENU
  const handleSave = async () => {
    try {
      setLoading(true);

      await axios.put("/api/admin/update/menu", {
        weeklyMenu: menuData,
      });

      // latest updated data fetch
      await fetchMenu();

      setEditMode(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // CANCEL EDIT
  const handleCancel = async () => {
    setEditMode(false);

    // old db data restore
    fetchMenu();
  };

  return (
    <div
      className={`min-h-[calc(100vh-64px)] px-2 py-3 transition-all duration-300 ${
        darkMode
          ? "bg-linear-to-br from-[#020617] via-[#0f172a] to-[#1e293b] text-white"
          : "bg-linear-to-br from-[#e2e8f0] via-[#f8fafc] to-[#cbd5e1] text-black"
      } `}
    >
      {/* HEADER */}
      <div className="mx-auto mb-4 max-w-6xl">
        <div
          className={`rounded-3xl border p-4 shadow-2xl backdrop-blur-xl sm:p-5 ${
            darkMode
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-white/70"
          } `}
        >
          <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
            {/* TITLE */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-extrabold tracking-wide sm:text-3xl">
                🍽️ Weekly Menu
              </h1>

              <p
                className={`mt-2 text-sm ${darkMode ? "text-slate-300" : "text-slate-600"} `}
              >
                Manage hostel food schedule beautifully
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="rounded-2xl bg-linear-to-r from-yellow-400 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Update
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    {loading ? "Saving..." : " Save"}
                  </button>

                  <button
                    onClick={handleCancel}
                    className="rounded-2xl bg-linear-to-r from-red-500 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MENU CONTENT */}
      <div className="mx-auto max-w-6xl">
        <div
          className={`overflow-hidden rounded-2xl border shadow-xl ${darkMode ? "border-white/10 bg-white/5" : "border-gray-200 bg-white/80"} `}
        >
          {/* DESKTOP TABLE */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr
                  className={`text-center ${darkMode ? "bg-white/10" : "bg-slate-100"} `}
                >
                  <th className="px-3 py-3 text-sm font-bold">📅 Day</th>

                  <th className="px-3 py-3 text-sm font-bold">🍞 Breakfast</th>

                  <th className="px-3 py-3 text-sm font-bold">🍛 Lunch</th>

                  <th className="px-3 py-3 text-sm font-bold">🍽️ Dinner</th>
                </tr>
              </thead>

              <tbody>
                {menuData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-t ${
                      darkMode
                        ? "border-white/10 hover:bg-white/5"
                        : "border-gray-200 hover:bg-slate-50"
                    } `}
                  >
                    {/* DAY */}
                    <td className="px-3 py-3 text-center text-sm font-bold whitespace-nowrap">
                      {item.day}
                    </td>

                    {/* BREAKFAST */}
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        disabled={!editMode}
                        value={item.breakfast}
                        onChange={(e) =>
                          handleChange(index, "breakfast", e.target.value)
                        }
                        placeholder="Breakfast"
                        className={`w-full rounded-xl border px-3 py-2 text-sm transition-all outline-none ${
                          darkMode
                            ? "border-slate-700 bg-slate-800 text-white"
                            : "border-slate-300 bg-white text-black"
                        } ${
                          editMode
                            ? "focus:ring-2 focus:ring-blue-500"
                            : "cursor-not-allowed opacity-70"
                        } `}
                      />
                    </td>

                    {/* LUNCH */}
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        disabled={!editMode}
                        value={item.lunch}
                        onChange={(e) =>
                          handleChange(index, "lunch", e.target.value)
                        }
                        placeholder="Lunch"
                        className={`w-full rounded-xl border px-3 py-2 text-sm transition-all outline-none ${
                          darkMode
                            ? "border-slate-700 bg-slate-800 text-white"
                            : "border-slate-300 bg-white text-black"
                        } ${
                          editMode
                            ? "focus:ring-2 focus:ring-blue-500"
                            : "cursor-not-allowed opacity-70"
                        } `}
                      />
                    </td>

                    {/* DINNER */}
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        disabled={!editMode}
                        value={item.dinner}
                        onChange={(e) =>
                          handleChange(index, "dinner", e.target.value)
                        }
                        placeholder="Dinner"
                        className={`w-full rounded-xl border px-3 py-2 text-sm transition-all outline-none ${
                          darkMode
                            ? "border-slate-700 bg-slate-800 text-white"
                            : "border-slate-300 bg-white text-black"
                        } ${
                          editMode
                            ? "focus:ring-2 focus:ring-blue-500"
                            : "cursor-not-allowed opacity-70"
                        } `}
                      />
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
                  darkMode
                    ? "border-white/10 bg-white/5"
                    : "border-gray-200 bg-white"
                } `}
              >
                {/* DAY */}
                <h2 className="mb-3 text-base font-bold">📅 {item.day}</h2>

                {/* INPUTS */}
                <div className="space-y-3">
                  {/* BREAKFAST */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold">
                      🍞 Breakfast
                    </label>

                    <input
                      type="text"
                      disabled={!editMode}
                      value={item.breakfast}
                      onChange={(e) =>
                        handleChange(index, "breakfast", e.target.value)
                      }
                      placeholder="Breakfast"
                      className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        darkMode
                          ? "border-slate-700 bg-slate-800 text-white"
                          : "border-slate-300 bg-white text-black"
                      } `}
                    />
                  </div>

                  {/* LUNCH */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold">
                      🍛 Lunch
                    </label>

                    <input
                      type="text"
                      disabled={!editMode}
                      value={item.lunch}
                      onChange={(e) =>
                        handleChange(index, "lunch", e.target.value)
                      }
                      placeholder="Lunch"
                      className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        darkMode
                          ? "border-slate-700 bg-slate-800 text-white"
                          : "border-slate-300 bg-white text-black"
                      } `}
                    />
                  </div>

                  {/* DINNER */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold">
                      🍽️ Dinner
                    </label>

                    <input
                      type="text"
                      disabled={!editMode}
                      value={item.dinner}
                      onChange={(e) =>
                        handleChange(index, "dinner", e.target.value)
                      }
                      placeholder="Dinner"
                      className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${
                        darkMode
                          ? "border-slate-700 bg-slate-800 text-white"
                          : "border-slate-300 bg-white text-black"
                      } `}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
