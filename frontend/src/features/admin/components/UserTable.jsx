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

      {/* TABLE CONTAINER */}
      <div
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="
          overflow-x-auto overflow-y-auto
          max-h-130
          rounded-t-xl
          scrollbar-hide
        "
      >
        <table
          className="
            w-full
            border-collapse
          "
        >
          {/* TABLE HEAD */}
          <thead>
            <tr
              className={`
                z-10
                text-sm
                sticky top-0
                ${
                  darkMode
                    ? "bg-gray-800 text-gray-200"
                    : "bg-sky-100 text-sky-800"
                }
              `}
            >
              <th
                className="
                  p-2
                  text-center
                "
              >
                #
              </th>

              <th
                className="
                  p-2
                  text-center
                "
              >
                Name
              </th>

              <th
                className="
                  p-2
                  text-center
                "
              >
                Email
              </th>

              <th
                className="
                  p-2
                  text-center
                "
              >
                Mobile
              </th>

              <th
                className="
                  p-2
                  text-center
                "
              >
                State
              </th>

              <th
                className="
                  p-2
                  text-center
                "
              >
                Time / Date
              </th>

              <th
                className="
                  p-2
                  text-center
                "
              >
                Action
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}
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
                    border-b
                    transition-all
                    duration-200
                    ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-800"
                        : "border-gray-200 hover:bg-sky-100/70"
                    }
                    ${rowBg}
                  `}
                >
                  {/* NUMBER */}
                  <td
                    className={`
                      p-2
                      text-center font-semibold text-sm
                      ${darkMode ? "text-gray-300" : "text-gray-700"}
                    `}
                  >
                    {index + 1}
                  </td>

                  {/* NAME */}
                  <td
                    className={`
                      p-2
                      text-center text-sm font-medium
                      ${darkMode ? "text-white" : "text-gray-800"}
                    `}
                  >
                    {user.name}
                  </td>

                  {/* EMAIL */}
                  <td
                    className={`
                      p-2
                      text-center text-sm
                      ${darkMode ? "text-gray-300" : "text-gray-700"}
                    `}
                  >
                    {user.email}
                  </td>

                  {/* MOBILE */}
                  <td
                    className={`
                      p-2
                      text-center text-sm font-medium
                      ${darkMode ? "text-gray-200" : "text-gray-700"}
                    `}
                  >
                    {user.mobile}
                  </td>

                  {/* STATE */}
                  <td
                    className="
                      p-2
                      text-center
                    "
                  >
                    <span
                      className={`
                        inline-block
                        px-3 py-1
                        text-xs font-semibold
                        rounded-full
                        capitalize ${colors.state}
                      `}
                    >
                      {user.state}
                    </span>
                  </td>

                  {/* DATE */}
                  <td
                    className="
                      p-2
                      text-center
                    "
                  >
                    <span
                      className={`
                        text-sm font-semibold
                        ${colors.date}
                      `}
                    >
                      {type === "pending" &&
                        new Date(user.createdAt).toLocaleString()}

                      {type === "registered" &&
                        user.registeredAt &&
                        new Date(user.registeredAt).toLocaleString()}

                      {type === "rejected" &&
                        user.rejectedAt &&
                        new Date(user.rejectedAt).toLocaleString()}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td
                    className="
                      p-2
                    "
                  >
                    <div
                      className="
                        flex flex-wrap
                        items-center justify-center gap-2
                      "
                    >
                      {/* CALL */}
                      <ContactButtonIcon
                        type="call"
                        phone={`91${user.mobile}`}
                      />

                      {/* WHATSAPP */}
                      <ContactButtonIcon
                        type="whatsapp"
                        phone={`91${user.mobile}`}
                      />

                      {/* PENDING */}
                      {type === "pending" && (
                        <>
                          <button
                            onClick={() => approveUser(user._id)}
                            className="
                              p-1.5
                              text-white
                              bg-green-500
                              rounded-md
                              transition-all shadow-sm
                              hover:bg-green-600 duration-200
                            "
                          >
                            <Check size={15} />
                          </button>

                          <button
                            onClick={() => rejectUser(user._id)}
                            className="
                              p-1.5
                              text-white
                              bg-red-500
                              rounded-md
                              transition-all shadow-sm
                              hover:bg-red-600 duration-200
                            "
                          >
                            <X size={15} />
                          </button>
                        </>
                      )}

                      {/* registered */}
                      {type === "registered" && (
                        <button
                          onClick={() => rejectUser(user._id)}
                          className="
                            p-1.5
                            text-white
                            bg-red-500
                            rounded-md
                            transition-all shadow-sm
                            hover:bg-red-600 duration-200
                          "
                        >
                          <X size={15} />
                        </button>
                      )}

                      {/* REJECTED */}
                      {type === "rejected" && (
                        <button
                          onClick={() => approveUser(user._id)}
                          className="
                            p-1.5
                            text-white
                            bg-green-500
                            rounded-md
                            transition-all shadow-sm
                            hover:bg-green-600 duration-200
                          "
                        >
                          <Check size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* EMPTY STATE */}
            {users?.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className={`
                    py-6
                    text-center text-sm font-medium
                    ${darkMode ? "text-gray-400" : "text-gray-500"}
                  `}
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
