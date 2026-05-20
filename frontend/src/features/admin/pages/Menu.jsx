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
      className={`
        min-h-screen
        px-4 py-8
        transition-all
        duration-300
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
            p-6
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
          <div
            className="
              flex flex-col
              items-center justify-between gap-5
              lg:flex-row
            "
          >
            {/* TITLE */}
            <div
              className="
                text-center
                lg:text-left
              "
            >
              <h1
                className="
                  text-4xl font-extrabold tracking-wide
                "
              >
                🍽️ Weekly Menu
              </h1>

              <p
                className={`
                  mt-2
                  text-sm
                  ${darkMode ? "text-slate-300" : "text-slate-600"}
                `}
              >
                Manage hostel food schedule beautifully
              </p>
            </div>

            {/* BUTTONS */}
            <div
              className="
                flex flex-wrap
                gap-3
              "
            >
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="
                    px-6 py-3
                    font-semibold text-white
                    bg-linear-to-r from-yellow-400 to-orange-500
                    rounded-2xl
                    transition-all shadow-lg
                    hover:scale-105 duration-300
                  "
                >
                  Update
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="
                      px-6 py-3
                      font-semibold text-white
                      bg-linear-to-r from-green-500 to-emerald-600
                      rounded-2xl
                      transition-all shadow-lg
                      hover:scale-105 duration-300
                    "
                  >
                    {loading ? "Saving..." : " Save"}
                  </button>

                  <button
                    onClick={handleCancel}
                    className="
                      px-6 py-3
                      font-semibold text-white
                      bg-linear-to-r from-red-500 to-pink-600
                      rounded-2xl
                      transition-all shadow-lg
                      hover:scale-105 duration-300
                    "
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
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
                  📅 Days
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
                      darkMode
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
                      p-4
                    "
                  >
                    <input
                      type="text"
                      disabled={!editMode}
                      value={item.breakfast}
                      onChange={(e) =>
                        handleChange(index, "breakfast", e.target.value)
                      }
                      placeholder="Breakfast Menu"
                      className={`
                        w-full
                        px-4 py-3
                        rounded-2xl border
                        transition-all
                        outline-none duration-300
                        ${
                          darkMode
                            ? "bg-slate-800/80 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-black"
                        }
                        ${
                          editMode
                            ? "focus:ring-2 focus:ring-blue-500"
                            : "opacity-70 cursor-not-allowed"
                        }
                      `}
                    />
                  </td>

                  {/* LUNCH */}
                  <td
                    className="
                      p-4
                    "
                  >
                    <input
                      type="text"
                      disabled={!editMode}
                      value={item.lunch}
                      onChange={(e) =>
                        handleChange(index, "lunch", e.target.value)
                      }
                      placeholder="Lunch Menu"
                      className={`
                        w-full
                        px-4 py-3
                        rounded-2xl border
                        transition-all
                        outline-none duration-300
                        ${
                          darkMode
                            ? "bg-slate-800/80 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-black"
                        }
                        ${
                          editMode
                            ? "focus:ring-2 focus:ring-blue-500"
                            : "opacity-70 cursor-not-allowed"
                        }
                      `}
                    />
                  </td>

                  {/* DINNER */}
                  <td
                    className="
                      p-4
                    "
                  >
                    <input
                      type="text"
                      disabled={!editMode}
                      value={item.dinner}
                      onChange={(e) =>
                        handleChange(index, "dinner", e.target.value)
                      }
                      placeholder="Dinner Menu"
                      className={`
                        w-full
                        px-4 py-3
                        rounded-2xl border
                        transition-all
                        outline-none duration-300
                        ${
                          darkMode
                            ? "bg-slate-800/80 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-black"
                        }
                        ${
                          editMode
                            ? "focus:ring-2 focus:ring-blue-500"
                            : "opacity-70 cursor-not-allowed"
                        }
                      `}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Menu;
