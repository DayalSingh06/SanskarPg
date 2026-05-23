import { useNavigate } from "react-router-dom";
import namskar from "../../../assets/logo/namskar.jpg";
import { useTheme } from "../../../context/ThemeContext";

const Logo = ({ redirectPath = "/", showImage = true }) => {
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
        items-end gap-2 duration-300 hover:scale-[1.02] active:scale-[0.98]
        sm:gap-2.5
      `}
    >
      {/* IMAGE LOGO */}
      {showImage && (
        <img
          src={namskar}
          alt="Sanskar Logo"
          className="
            object-cover
            rounded-full
            shadow-md
            w-10 h-10
            sm:w-10 sm:h-10
            md:w-11 md:h-11
          "
        />
      )}

      {/* TEXT LOGO */}
      <span
        className="
          hidden
          sm:flex
          font-poppins leading-none
          items-end
        "
      >
        {/* Sans */}
        <span
          className="
            font-bold leading-none
            text-3xl
            md:text-4xl
            text-red-500
          "
        >
          Sans
        </span>

        {/* kar */}
        <span
          className={`
            font-semibold leading-none
            text-2xl
            md:text-3xl
            ml-0.5
            ${darkMode ? "text-white" : "text-gray-900"}
          `}
        >
          kar
        </span>
      </span>
    </div>
  );
};

export default Logo;
