import callIcon from "../../../assets/icons/call.png";
import whatsappIcon from "../../../assets/icons/whatsapp.svg";
import { useTheme } from "../../../context/ThemeContext";

const ContactButtonIcon = ({
  type = "call",
  phone = "919999999999",
  message = "",
}) => {
  const { darkMode } = useTheme();

  const isCall = type === "call";
  const cleanPhone = String(phone).replace(/\D/g, "");

  const link = isCall
    ? `tel:+${cleanPhone}`
    : `https://wa.me/${cleanPhone}${
        message ? `?text=${encodeURIComponent(message)}` : ""
      }`;

  const bgColor = isCall
    ? darkMode
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-blue-500 hover:bg-blue-600"
    : "bg-green-500 hover:bg-green-600";

  const icon = isCall ? callIcon : whatsappIcon;
  const label = isCall ? "Call now" : "Chat on WhatsApp";

  return (
    <a
      href={link}
      target={isCall ? undefined : "_blank"}
      rel={isCall ? undefined : "noopener noreferrer"}
      aria-label={label}
      title={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95 ${bgColor} sm:h-11 sm:w-11 ${
        darkMode ? "ring-1 ring-white/10" : "ring-1 ring-black/5"
      }`}
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="h-4 w-4 object-contain sm:h-5 sm:w-5"
      />
    </a>
  );
};

export default ContactButtonIcon;
