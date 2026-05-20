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
      className={`
        w-full
        border-t
        transition-all
        duration-300
        ${
          darkMode
            ? "bg-[#0f0c1c] text-gray-300 border-gray-800"
            : "bg-gray-100 text-gray-700 border-gray-300"
        }
      `}
    >
      <div
        className="
          grid
          max-w-7xl
          mx-auto px-4 py-10
          text-center
          gap-10
          sm:px-6 sm:text-left
          md:grid-cols-2 md:px-8 md:py-12
          lg:grid-cols-3
        "
      >
        {/* ABOUT */}
        <div>
          <Logo redirectPath="/" />
          <p
            className="
              max-w-sm
              mt-4 mx-auto
              text-sm leading-relaxed
              sm:mx-0
            "
          >
            Providing affordable, safe & comfortable PG accommodation in Jaipur.
            Perfect for students and working professionals.
          </p>

          {/* CTA BUTTONS */}
          <div
            className="
              flex flex-wrap
              mt-6
              gap-3 justify-center
              sm:justify-start
            "
          >
            {/* Call Button */}
            <ContactButton type="call" phone="916350028407" />

            {/* WhatsApp Button */}
            <ContactButton type="whatsapp" phone="916350028407" />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3
            className="
              mb-4
              text-lg font-semibold tracking-wide
            "
          >
            Quick Links
          </h3>
          <ul
            className="
              space-y-3
              text-sm
              sm:text-[15px]
            "
          >
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="
                    inline-block
                    transition-all
                    relative group duration-300 hover:text-blue-500
                  "
                >
                  {link.label}
                  <span
                    className="
                      h-0.5 w-0
                      bg-blue-500
                      transition-all
                      absolute left-0 -bottom-1 duration-300 group-hover:w-full
                    "
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3
            className="
              mb-4
              text-lg font-semibold tracking-wide
            "
          >
            Contact
          </h3>
          <ul
            className="
              space-y-3
              text-sm
              sm:text-[15px]
            "
          >
            <li>
              <a
                href="mailto:sanskarboyspg@gmail.com"
                className="
                  hover:text-blue-500 transition
                "
              >
                sanskarboyspg@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+916350028407"
                className="
                  hover:text-blue-500 transition
                "
              >
                +91 63500 28407
              </a>
            </li>
            <li> Jaipur, Rajasthan</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        className={`
          py-4 px-4
          text-center text-xs
          border-t
          sm:text-sm
          ${darkMode ? "border-gray-800 text-gray-500" : "border-gray-300 text-gray-500"}
        `}
      >
        © {new Date().getFullYear()} Sanskar Boy's PG. All rights reserved.
      </div>
    </footer>
  );
};

export default PublicFooter;
