import callIcon from "../../../assets/icons/call.png";
import whatsappIcon from "../../../assets/icons/whatsapp.svg";
import { useTheme } from "../../../context/ThemeContext";

const ContactButtonIcon = ({ type = "call", phone = "919999999999" }) => {
  const { darkMode } = useTheme();
  
  const isCall = type === "call";

  const link = isCall ? `tel:+${phone}` : `https://wa.me/${phone}`;

  const bgColor = isCall
    ? darkMode
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-blue-500 hover:bg-blue-600"
    : darkMode
      ? "bg-green-500 hover:bg-green-600"
      : "bg-green-500 hover:bg-green-600";

  const icon = isCall ? callIcon : whatsappIcon;

  return (
    <a
      href={link}
      target={!isCall ? "_blank" : undefined}
      rel={!isCall ? "noopener noreferrer" : undefined}
      aria-label={type}
      className={`
        flex
        w-10 h-10
        rounded-full
        shadow-md transition-all
        items-center justify-center hover:shadow-lg duration-300 hover:scale-110 active:scale-95 ${bgColor}
        sm:w-11 sm:h-11
        ${darkMode ? "ring-1 ring-white/10" : "ring-1 ring-black/5"}
      `}
    >
      <img
        src={icon}
        alt={type}
        className="
          object-contain
          w-4 h-4
          sm:w-5 sm:h-5
        "
      />
    </a>
  );
};

export default ContactButtonIcon;
