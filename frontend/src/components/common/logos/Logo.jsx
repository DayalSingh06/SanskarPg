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
      className={`flex w-fit cursor-pointer items-end gap-2 transition-all duration-300 select-none hover:scale-[1.02] active:scale-[0.98] sm:gap-2.5`}
    >
      {/* IMAGE LOGO */}
      {showImage && (
        <img
          src={namskar}
          alt="Sanskar Logo"
          className="h-10 w-10 rounded-full object-cover shadow-md sm:h-10 sm:w-10 md:h-11 md:w-11"
        />
      )}

      {/* TEXT LOGO */}
      <span className="font-poppins hidden items-end leading-none sm:flex">
        {/* Sans */}
        <span className="text-3xl leading-none font-bold text-red-500 md:text-4xl">
          Sans
        </span>

        {/* kar */}
        <span
          className={`ml-0.5 text-2xl leading-none font-semibold md:text-3xl ${darkMode ? "text-white" : "text-gray-900"} `}
        >
          kar
        </span>
      </span>
    </div>
  );
};

export default Logo;
