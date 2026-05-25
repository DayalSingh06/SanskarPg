import callIcon from "../../../assets/icons/call.png";
import whatsappIcon from "../../../assets/icons/whatsapp.svg";

import { useTheme } from "../../../context/ThemeContext";

const ContactButton = ({ type = "call", phone = "919999999999" }) => {
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

  const text = isCall ? "Call Now" : "WhatsApp";

  const icon = isCall ? callIcon : whatsappIcon;

  return (
    <a
      href={link}
      target={!isCall ? "_blank" : undefined}
      rel={!isCall ? "noopener noreferrer" : undefined}
      aria-label={text}
      className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap text-white shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 ${bgColor} sm:px-5 sm:py-3 sm:text-base`}
    >
      <img
        src={icon}
        alt={text}
        className="h-5 w-5 object-contain sm:h-6 sm:w-6"
      />
      <span>{text}</span>
    </a>
  );
};

export default ContactButton;
