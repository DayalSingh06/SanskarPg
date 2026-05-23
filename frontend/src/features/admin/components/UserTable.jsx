import React from "react";
import { Check, X } from "lucide-react";
import ContactButtonIcon from "../../../components/common/buttons/ContactButtonIcon";
import { useTheme } from "../../../context/ThemeContext";

const UserTable = ({ title, users, type, approveUser, rejectUser }) => {
  const { darkMode } = useTheme();

  // STATE + DATE COLORS
  const getThemeColors = () => {
    // PENDING
    if (type === "pending") {
      return darkMode
        ? {
            state: "bg-orange-900/30 text-orange-300 border border-orange-700",
            date: "text-orange-300",
          }
        : {
            state: "bg-orange-100 text-orange-700 border border-orange-200",
            date: "text-orange-600",
          };
    }

    // REGISTERED
    if (type === "registered") {
      return darkMode
        ? {
            state: "bg-green-900/30 text-green-300 border border-green-700",
            date: "text-green-300",
          }
        : {
            state: "bg-green-100 text-green-700 border border-green-200",
            date: "text-green-600",
          };
    }

    // REJECTED
    return darkMode
      ? {
          state: "bg-red-900/30 text-red-300 border border-red-700",
          date: "text-red-300",
        }
      : {
          state: "bg-red-100 text-red-700 border border-red-200",
          date: "text-red-600",
        };
  };

  const colors = getThemeColors();

  return (
    <div
      className={`
        p-5 mb-8
        rounded-2xl
        shadow-lg transition-all
        duration-300
        ${
          darkMode
            ? "bg-gray-900 border border-gray-800"
            : "bg-white border border-gray-200"
        }
      `}
    >
      {/* Heading */}
      <h2
        className={`
          mb-5
          text-2xl font-bold text-center
          ${darkMode ? "text-white" : "text-gray-800"}
        `}
      >
        {title}
      </h2>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-t-xl">
        <table className="w-full border-collapse">
          {/* TABLE HEAD */}
          <thead>
            <tr
              className={`
          text-sm
          ${darkMode ? "bg-gray-800 text-gray-200" : "bg-sky-100 text-sky-800"}
        `}
            >
              <th className="p-3 text-center">#</th>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Email</th>
              <th className="p-3 text-center">Mobile</th>
              <th className="p-3 text-center">State</th>
              <th className="p-3 text-center">Time / Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user, index) => {
              const rowBg =
                index % 2 === 0
                  ? darkMode
                    ? "bg-gray-900"
                    : "bg-slate-50"
                  : darkMode
                    ? "bg-gray-800/70"
                    : "bg-sky-50/60";

              return (
                <tr
                  key={user._id}
                  className={`
              border-b transition-all duration-200
              ${
                darkMode
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-200 hover:bg-sky-100/70"
              }
              ${rowBg}
            `}
                >
                  <td className="p-3 text-center">{index + 1}</td>

                  <td className="p-3 text-center font-medium">{user.name}</td>

                  <td className="p-3 text-center">{user.email}</td>

                  <td className="p-3 text-center">{user.mobile}</td>

                  <td className="p-3 text-center">
                    <span
                      className={`
                  inline-block px-3 py-1 text-xs
                  rounded-full capitalize ${colors.state}
                `}
                    >
                      {user.state}
                    </span>
                  </td>

                  <td className={`p-3 text-center text-sm ${colors.date}`}>
                    {type === "pending" &&
                      new Date(user.createdAt).toLocaleString()}

                    {type === "registered" &&
                      user.registeredAt &&
                      new Date(user.registeredAt).toLocaleString()}

                    {type === "rejected" &&
                      user.rejectedAt &&
                      new Date(user.rejectedAt).toLocaleString()}
                  </td>

                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <ContactButtonIcon
                        type="call"
                        phone={`91${user.mobile}`}
                      />

                      <ContactButtonIcon
                        type="whatsapp"
                        phone={`91${user.mobile}`}
                      />

                      {type === "pending" && (
                        <>
                          <button
                            onClick={() => approveUser(user._id)}
                            className="
                        p-1.5 text-white bg-green-500
                        rounded-md hover:bg-green-600
                      "
                          >
                            <Check size={15} />
                          </button>

                          <button
                            onClick={() => rejectUser(user._id)}
                            className="
                        p-1.5 text-white bg-red-500
                        rounded-md hover:bg-red-600
                      "
                          >
                            <X size={15} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="flex flex-col gap-4 md:hidden">
        {users?.map((user, index) => (
          <div
            key={user._id}
            className={`
        p-4 rounded-2xl border shadow-md
        ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-slate-50 border-gray-200"
        }
      `}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base">
                {index + 1}. {user.name}
              </h3>

              <span
                className={`
            px-2 py-1 text-[10px]
            rounded-full capitalize
            ${colors.state}
          `}
              >
                {user.state}
              </span>
            </div>

            <div className="mt-3 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>

              <p>
                <span className="font-semibold">Mobile:</span> {user.mobile}
              </p>

              <p className={colors.date}>
                {type === "pending" &&
                  new Date(user.createdAt).toLocaleString()}

                {type === "registered" &&
                  user.registeredAt &&
                  new Date(user.registeredAt).toLocaleString()}

                {type === "rejected" &&
                  user.rejectedAt &&
                  new Date(user.rejectedAt).toLocaleString()}
              </p>
            </div>

            {/* ACTIONS */}
            <div
              className="
    flex
    items-center justify-between
    mt-4
  "
            >
              {/* LEFT SIDE → CALL + WHATSAPP */}
              <div
                className="
      flex items-center gap-2
    "
              >
                <ContactButtonIcon type="call" phone={`91${user.mobile}`} />

                <ContactButtonIcon type="whatsapp" phone={`91${user.mobile}`} />
              </div>

              {/* RIGHT SIDE → ACTION BUTTONS */}
              <div
                className="
      flex items-center gap-2
    "
              >
                {/* PENDING */}
                {type === "pending" && (
                  <>
                    <button
                      onClick={() => approveUser(user._id)}
                      className="
            p-2
            text-white
            bg-green-500
            rounded-lg
            transition-all
            hover:bg-green-600
          "
                    >
                      <Check size={16} />
                    </button>

                    <button
                      onClick={() => rejectUser(user._id)}
                      className="
            p-2
            text-white
            bg-red-500
            rounded-lg
            transition-all
            hover:bg-red-600
          "
                    >
                      <X size={16} />
                    </button>
                  </>
                )}

                {/* REGISTERED */}
                {type === "registered" && (
                  <button
                    onClick={() => rejectUser(user._id)}
                    className="
          p-2
          text-white
          bg-red-500
          rounded-lg
          transition-all
          hover:bg-red-600
        "
                  >
                    <X size={16} />
                  </button>
                )}

                {/* REJECTED */}
                {type === "rejected" && (
                  <button
                    onClick={() => approveUser(user._id)}
                    className="
          p-2
          text-white
          bg-green-500
          rounded-lg
          transition-all
          hover:bg-green-600
        "
                  >
                    <Check size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
