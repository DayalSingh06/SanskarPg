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
        className={`fixed top-0 left-0 z-50 flex h-14 w-full items-center justify-between border-b px-3 backdrop-blur-md transition-all duration-300 select-none sm:h-16 sm:px-4 md:px-5 lg:px-6 ${
          darkMode
            ? "border-gray-900 bg-[#0f0c1c]/95 text-white"
            : "border-gray-200 bg-white/95 text-[#0f0c1c]"
        } `}
      >
        {/* Left */}
        <div className="flex items-center gap-3 sm:gap-5 lg:gap-6">
          <Logo redirectPath="/" />

          <div className="ml-8 hidden items-center gap-6 text-base lg:flex xl:ml-14 xl:gap-10 xl:text-lg">
            {/* Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `group font-poppins relative font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-500"
                    : darkMode
                      ? "text-white"
                      : "text-[#0f0c1c]"
                } hover:text-blue-400`
              }
            >
              Home
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>

            {/* Facilities */}
            <NavLink
              to="/facilities"
              className={({ isActive }) =>
                `group font-poppins relative font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-500"
                    : darkMode
                      ? "text-white"
                      : "text-[#0f0c1c]"
                } hover:text-blue-400`
              }
            >
              Facilities
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>

            {/*  Rules & Regulations */}
            <NavLink
              to="/rules"
              className={({ isActive }) =>
                `group font-poppins relative font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-500"
                    : darkMode
                      ? "text-white"
                      : "text-[#0f0c1c]"
                } hover:text-blue-400`
              }
            >
              Rules & Regulations
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>

            {/* Menu */}
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `group font-poppins relative font-medium transition-all duration-300 ${
                  isActive
                    ? "text-blue-500"
                    : darkMode
                      ? "text-white"
                      : "text-[#0f0c1c]"
                } hover:text-blue-400`
              }
            >
              Menu
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode */}
          <button
            onClick={toggleTheme}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 sm:h-10 sm:w-10 ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"} `}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Buttons */}
          {user ? (
            /* Logout Button */
            <button
              onClick={handleLogout}
              className="font-poppins hidden h-9 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-red-700 active:scale-95 sm:h-10 lg:flex"
            >
              Logout
            </button>
          ) : (
            <>
              {/* Login */}
              <button
                onClick={() => navigate("/login")}
                className={`font-poppins flex h-9 items-center justify-center rounded-lg px-3 text-xs font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:h-10 sm:rounded-xl sm:px-4 sm:text-sm ${
                  darkMode
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-200 text-[#0f0c1c] hover:bg-gray-300"
                } `}
              >
                Login
              </button>

              {/* Signup */}
              <button
                onClick={() => navigate("/register")}
                className="font-poppins flex h-9 items-center justify-center rounded-lg bg-indigo-600 px-3 text-xs font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-700 active:scale-95 sm:h-10 sm:rounded-xl sm:px-5 sm:text-sm"
              >
                Sign Up
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            ref={menuButtonRef}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 sm:h-10 sm:w-10 lg:hidden ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"} `}
          >
            <MobileMenu />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          ref={menuRef}
          className={`fixed top-14 left-0 z-40 w-full shadow-lg backdrop-blur-md transition-all duration-300 sm:top-16 lg:hidden ${
            darkMode
              ? "bg-[#0f0c1c]/95 text-white"
              : "border-b border-gray-200 bg-white/95 text-gray-900"
          } `}
        >
          <div className="flex flex-col items-center gap-6 px-5 py-6 text-base sm:text-lg">
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
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
            </NavLink>

            {/* Buttons */}
            <div className="flex w-full max-w-xs flex-col gap-3">
              {/* Logout Button Only */}
              {user && (
                <div className="flex w-full max-w-xs">
                  <button
                    onClick={handleLogout}
                    className="h-10 w-full rounded-md bg-red-600 text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-14 sm:h-16"></div>
    </>
  );
};

export default PublicNavbar;
