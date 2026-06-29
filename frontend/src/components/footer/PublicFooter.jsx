import { Link } from "react-router-dom";
import Logo from "../common/logos/Logo";
import { useTheme } from "../../context/ThemeContext";
import ContactButton from "../common/buttons/ContactButton";

const quickLinks = [
  { path: "/", label: "Home" },
  { path: "/facilities", label: "Facilities" },
  { path: "/rules", label: "Rules & Regulations" },
];

const PHONE = "916350028407";
const EMAIL = "sanskarboyspg@gmail.com";

const PublicFooter = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`w-full border-t transition-all duration-300 select-none ${
        darkMode
          ? "border-gray-800 bg-[#0f0c1c] text-gray-300"
          : "border-gray-300 bg-gray-100 text-gray-700"
      }`}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-5 text-center sm:px-8 md:grid-cols-2 md:text-left lg:grid-cols-3">
        <div className="flex flex-col items-center md:items-start">
          <Logo redirectPath="/" />

          <p className="mt-5 max-w-xs text-sm leading-7 sm:text-[15px]">
            Providing affordable, safe and comfortable PG accommodation in
            Jaipur for students and working professionals.
          </p>

          <div className="mt-6 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:flex-row">
            <div className="w-full sm:w-auto">
              <ContactButton type="call" phone={PHONE} />
            </div>

            <div className="w-full sm:w-auto">
              <ContactButton
                type="whatsapp"
                phone={PHONE}
                message="Hi, I want to know more about Sanskar Boys PG."
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-xl font-semibold">Quick Links</h3>

          <ul className="space-y-4 text-sm sm:text-[15px]">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="group relative inline-block transition-all duration-300 hover:text-blue-500"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-xl font-semibold">Contact</h3>

          <ul className="space-y-4 text-sm sm:text-[15px]">
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="break-all transition hover:text-blue-500"
              >
                {EMAIL}
              </a>
            </li>

            <li>
              <a
                href={`tel:+${PHONE}`}
                className="transition hover:text-blue-500"
              >
                +91 63500 28407
              </a>
            </li>

            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Jaipur%2C%20Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-blue-500"
              >
                Jaipur, Rajasthan
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`border-t px-4 py-5 text-center text-xs sm:text-sm ${
          darkMode
            ? "border-gray-800 text-gray-500"
            : "border-gray-300 text-gray-500"
        }`}
      >
        © {new Date().getFullYear()} Sanskar Boys PG. All rights reserved.
      </div>
    </footer>
  );
};

export default PublicFooter;
