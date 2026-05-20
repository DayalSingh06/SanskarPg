import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import { useTheme } from "../../../context/ThemeContext";

const Logo = ({ redirectPath = "/", showImage = false }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      role="button"
      onClick={() => navigate(redirectPath)}
      className={`
        flex
        w-fit
        cursor-pointer select-none transition-all
        items-center gap-2 duration-300 hover:scale-[1.02] active:scale-[0.98]
        sm:gap-3
        ${darkMode ? "text-white" : "text-[#0f0c1c]"}
      `}
    >
      {/* IMAGE LOGO */}
      {showImage && (
        <img
          src={logo}
          alt="Sanskar Logo"
          className="
            object-contain
            w-8 h-8
            sm:w-10 sm:h-10
            md:w-11 md:h-11
          "
        />
      )}

      {/* TEXT LOGO */}
      <span
        className="
          flex
          font-poppins leading-none
          items-end
        "
      >
        <span
          className="
            text-blue-500 font-bold leading-none text-lg
            sm:text-2xl
            md:text-3xl
          "
        >
          SanS
        </span>

        <span
          className="
            font-bold leading-none text-lg
            sm:text-2xl
            md:text-3xl
          "
        >
          Kar
        </span>
      </span>
    </div>
  );
};

export default Logo;
