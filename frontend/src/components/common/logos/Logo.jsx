import { Link } from "react-router-dom";
import namskar from "../../../assets/logo/namskar.jpg";
import { useTheme } from "../../../context/ThemeContext";

const Logo = ({ redirectPath = "/", showImage = true }) => {
  const { darkMode } = useTheme();

  return (
    <Link
      to={redirectPath}
      aria-label="Go to home"
      className="flex w-fit cursor-pointer items-end gap-1 transition-all duration-300 select-none hover:scale-[1.02] active:scale-[0.98] sm:gap-2.5"
    >
      {showImage && (
        <img
          src={namskar}
          alt="Sanskar Logo"
          className="h-9 w-9 rounded-full object-cover shadow-md md:h-10 md:w-10"
        />
      )}

      <span className="font-poppins hidden items-end leading-none sm:flex">
        <span className="text-3xl leading-none font-bold text-red-500 md:text-4xl">
          Sans
        </span>

        <span
          className={`ml-0.5 text-2xl leading-none font-semibold md:text-3xl ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          kar
        </span>
      </span>
    </Link>
  );
};

export default Logo;
