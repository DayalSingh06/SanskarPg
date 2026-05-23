import { useEffect, useState, useRef } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { SunIcon, MoonIcon, MobileMenu } from "../common/icons/SvgIcons";
import Logo from "../common/logos/Logo";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { darkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <Logo redirectPath="/" />

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
              to="/"
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

            {/* Facilities */}
            <NavLink
              to="/facilities"
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
              Facilities
              <span
                className="
                  h-0.5 w-0
                  bg-indigo-500
                  transition-all
                  absolute left-0 -bottom-1 duration-300 group-hover:w-full
                "
              ></span>
            </NavLink>

            {/*  Rules & Regulations */}
            <NavLink
              to="/rules"
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
              Rules & Regulations
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
              to="/menu"
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
            /* Logout Button */
            <button
              onClick={handleLogout}
              className="
      hidden
      lg:flex
      h-9
      px-4
      text-sm font-medium font-poppins text-white
      bg-red-600
      rounded-xl
      shadow-md transition-all
      items-center justify-center
      hover:bg-red-700
      duration-300
      hover:scale-[1.02]
      active:scale-95
      sm:h-10
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
        flex
        h-9
        px-3
        text-xs font-medium font-poppins
        rounded-lg
        transition-all
        items-center justify-center duration-300 hover:scale-[1.02] active:scale-95
        sm:h-10 sm:px-4 sm:text-sm sm:rounded-xl
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
        flex
        h-9
        px-3
        text-xs font-medium font-poppins text-white
        bg-indigo-600
        rounded-lg
        shadow-md transition-all
        items-center justify-center hover:bg-indigo-700 duration-300 hover:scale-[1.02] active:scale-95
        sm:h-10 sm:px-5 sm:text-sm sm:rounded-xl
      "
              >
                Sign Up
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            ref={menuButtonRef}
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
          ref={menuRef}
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
              to="/"
              className={({ isActive }) =>
                `font-poppins font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-500"
                    : darkMode
                      ? "text-white"
                      : "text-gray-900"
                } hover:text-blue-400`
              }
            >
              Home
            </NavLink>

            {/* Features */}
            <NavLink
              to="/facilities"
              className={({ isActive }) =>
                `font-poppins font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-500"
                    : darkMode
                      ? "text-white"
                      : "text-gray-900"
                } hover:text-blue-400`
              }
            >
              Facilities
            </NavLink>

            {/* Services */}
            <NavLink
              to="/rules"
              className={({ isActive }) =>
                `font-poppins font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-500"
                    : darkMode
                      ? "text-white"
                      : "text-gray-900"
                } hover:text-blue-400`
              }
            >
              Rules & Regulations
            </NavLink>

            {/* Menu */}
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `font-poppins font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-500"
                    : darkMode
                      ? "text-white"
                      : "text-gray-900"
                } hover:text-blue-400`
              }
            >
              Menu
              <span
                className="
                  h-0.5 w-0
                  bg-indigo-500
                  transition-all
                  absolute left-0 -bottom-1 group-hover:w-full
                "
              ></span>
            </NavLink>

            {/* Buttons */}
            <div
              className="
                flex flex-col
                w-full max-w-xs
                gap-3
              "
            >
              {/* Logout Button Only */}
              {user && (
                <div
                  className="
      flex
      w-full max-w-xs
    "
                >
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
                </div>
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

export default PublicNavbar;
