import { useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { SunIcon, MoonIcon, MobileMenu } from "../common/icons/SvgIcons";
import Logo from "../common/logos/Logo";

const PrivateNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { darkMode, toggleTheme } = useTheme();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setUser(null);

    navigate("/");
  };

  return (
    <>
      <nav
        className={`
          z-50 flex
          h-14 w-full
          px-3
          border-b
          select-none transition-all
          fixed top-0 left-0 items-center justify-between backdrop-blur-md duration-300
          sm:h-16 sm:px-4
          md:px-5
          lg:px-6
          ${
            darkMode
              ? "bg-[#0f0c1c]/95 text-white border-gray-900"
              : "bg-white/95 text-[#0f0c1c] border-gray-200"
          }
        `}
      >
        {/* Left */}
        <div
          className="
            flex
            items-center gap-3
            sm:gap-5
            lg:gap-6
          "
        >
          <Logo redirectPath="/admin/dashboard" />

          {/* Links */}

          <div
            className="
              hidden
              ml-8
              text-base
              items-center gap-6
              lg:flex
              xl:ml-14 xl:text-lg xl:gap-10
            "
          >
            {/* Home */}
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `relative group font-poppins font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-500"
                    : darkMode
                      ? "text-white"
                      : "text-[#0f0c1c]"
                } hover:text-blue-400`
              }
            >
              Home
              <span
                className="
                  h-0.5 w-0
                  bg-indigo-500
                  transition-all
                  absolute left-0 -bottom-1 duration-300 group-hover:w-full
                "
              ></span>
            </NavLink>

            {/* Menu */}
            <NavLink
              to="/admin/menu"
              className={({ isActive }) =>
                `relative group font-poppins font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-500"
                    : darkMode
                      ? "text-white"
                      : "text-[#0f0c1c]"
                } hover:text-blue-400`
              }
            >
              Menu
              <span
                className="
                  h-0.5 w-0
                  bg-indigo-500
                  transition-all
                  absolute left-0 -bottom-1 duration-300 group-hover:w-full
                "
              ></span>
            </NavLink>

            {/* ALL PG */}
            <NavLink
              to="/admin/allpg"
              className={({ isActive }) =>
                `relative group font-poppins font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-500"
                    : darkMode
                      ? "text-white"
                      : "text-[#0f0c1c]"
                } hover:text-blue-400`
              }
            >
              All PG
              <span
                className="
                  h-0.5 w-0
                  bg-indigo-500
                  transition-all
                  absolute left-0 -bottom-1 duration-300 group-hover:w-full
                "
              ></span>
            </NavLink>
          </div>
        </div>

        {/* Right */}
        <div
          className="
            flex
            items-center gap-2
            sm:gap-3
          "
        >
          {/* Dark Mode */}
          <button
            onClick={toggleTheme}
            className={`
              flex
              w-9 h-9
              rounded-full
              transition-all
              items-center justify-center duration-300 hover:scale-105 active:scale-95
              sm:w-10 sm:h-10
              ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"}
            `}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Buttons */}
          {user ? (
            // Logout
            <button
              onClick={handleLogout}
              className="
                hidden
                h-9
                px-4
                text-sm font-medium font-poppins text-white
                bg-red-600
                rounded-xl
                shadow-md transition-all
                items-center justify-center hover:bg-red-700 duration-300 hover:scale-[1.02] active:scale-95
                sm:flex sm:h-10 sm:px-5
              "
            >
              Logout
            </button>
          ) : (
            <>
              {/* Login */}
              <button
                onClick={() => navigate("/login")}
                className={`
                  hidden
                  h-9
                  px-4
                  text-sm font-medium font-poppins
                  rounded-xl
                  transition-all
                  items-center justify-center duration-300 hover:scale-[1.02] active:scale-95
                  sm:flex sm:h-10
                  ${
                    darkMode
                      ? "text-white bg-gray-800 hover:bg-gray-700"
                      : "text-[#0f0c1c] bg-gray-200 hover:bg-gray-300"
                  }
                `}
              >
                Login
              </button>

              {/* Signup */}
              <button
                onClick={() => navigate("/register")}
                className="
                  hidden
                  h-9
                  px-4
                  text-sm font-medium font-poppins text-white
                  bg-indigo-600
                  rounded-xl
                  shadow-md transition-all
                  items-center justify-center hover:bg-indigo-700 duration-300 hover:scale-[1.02] active:scale-95
                  sm:flex sm:h-10 sm:px-5
                "
              >
                Sign Up
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`
              flex
              w-9 h-9
              rounded-lg
              transition-all
              items-center justify-center duration-300 hover:scale-105 active:scale-95
              sm:w-10 sm:h-10
              lg:hidden
              ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"}
            `}
          >
            <MobileMenu />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className={`
            z-40
            w-full
            shadow-lg transition-all
            fixed top-14 left-0 duration-300 backdrop-blur-md
            sm:top-16
            lg:hidden
            ${
              darkMode
                ? "bg-[#0f0c1c]/95 text-white"
                : "bg-white/95 text-gray-900 border-b border-gray-200"
            }
          `}
        >
          <div
            className="
              flex flex-col
              py-6 px-5
              text-base
              items-center gap-6
              sm:text-lg
            "
          >
            {/* Home */}
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `font-poppins font-medium ${
                  isActive
                    ? "text-blue-800"
                    : darkMode
                      ? "text-white"
                      : "text-gray-900"
                } hover:text-blue-400 transition-colors duration-200`
              }
            >
              Home
            </NavLink>
            {/* Menu */}
            <NavLink
              to="/admin/menu"
              className={({ isActive }) =>
                `font-poppins font-medium ${
                  isActive
                    ? "text-blue-800"
                    : darkMode
                      ? "text-white"
                      : "text-gray-900"
                } hover:text-blue-400 transition-colors duration-200`
              }
            >
              Menu
            </NavLink>
            {/* allpg */}
            <NavLink
              to="/admin/allpg"
              className={({ isActive }) =>
                `font-poppins font-medium ${
                  isActive
                    ? "text-blue-800"
                    : darkMode
                      ? "text-white"
                      : "text-gray-900"
                } hover:text-blue-400 transition-colors duration-200`
              }
            >
              All PG
            </NavLink>

            {/* Buttons */}
            <div
              className="
                flex flex-col
                w-full max-w-xs
                mt-4
                gap-3
              "
            >
              {user ? (
                <button
                  onClick={handleLogout}
                  className="
                    w-full h-10
                    text-white
                    bg-red-600
                    rounded-md
                  "
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="
                      w-full h-10
                      bg-gray-500
                      rounded-md
                    "
                  >
                    Login
                  </button>

                  <button
                    onClick={() => navigate("/register")}
                    className="
                      w-full h-10
                      text-white
                      bg-indigo-600
                      rounded-md
                    "
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className="
          h-14
          sm:h-16
        "
      ></div>
    </>
  );
};

export default PrivateNavbar;
