import { Link } from "react-router-dom";
import Logo from "../common/logos/Logo";
import { useTheme } from "../../context/ThemeContext";
import ContactButton from "../common/buttons/ContactButton";

const PublicFooter = () => {
  const { darkMode } = useTheme();

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/facilities", label: "Facilities" },
    { path: "/rules", label: "Rules & Regulations" },
  ];

  return (
    <footer
      className={`w-full border-t transition-all duration-300 ${
        darkMode
          ? "border-gray-800 bg-[#0f0c1c] text-gray-300"
          : "border-gray-300 bg-gray-100 text-gray-700"
      } `}
    >
      {/* MAIN FOOTER */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 text-center sm:px-8 md:grid-cols-2 md:text-left lg:grid-cols-3">
        {/* ABOUT */}
        <div className="flex flex-col items-center md:items-start">
          <Logo redirectPath="/" />

          <p className="mt-5 max-w-xs text-sm leading-7 sm:text-[15px]">
            Providing affordable, safe & comfortable PG accommodation in Jaipur
            for students and working professionals ✨
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-6 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:flex-row">
            <div className="w-full sm:w-auto">
              <ContactButton type="call" phone="916350028407" />
            </div>

            <div className="w-full sm:w-auto">
              <ContactButton type="whatsapp" phone="916350028407" />
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
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

                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-5 text-xl font-semibold">Contact</h3>

          <ul className="space-y-4 text-sm sm:text-[15px]">
            <li>
              <a
                href="mailto:sanskarboyspg@gmail.com"
                className="break-all transition hover:text-blue-500"
              >
                sanskarboyspg@gmail.com
              </a>
            </li>

            <li>
              <a
                href="tel:+916350028407"
                className="transition hover:text-blue-500"
              >
                +91 63500 28407
              </a>
            </li>

            <li>📍 Jaipur, Rajasthan</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        className={`border-t px-4 py-5 text-center text-xs sm:text-sm ${
          darkMode
            ? "border-gray-800 text-gray-500"
            : "border-gray-300 text-gray-500"
        } `}
      >
        © {new Date().getFullYear()} Sanskar Boy's PG. All rights reserved.
      </div>
    </footer>
  );
};

export default PublicFooter;
