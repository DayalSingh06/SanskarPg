import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getImageUrl } from "../utils/imageUrl";
import { useTheme } from "../context/ThemeContext";

import ContactButtonIcon from "../components/common/buttons/ContactButtonIcon";
import PgGallery from "../components/pg/PgGallery";

import { getSinglePg } from "../services/pgService";

const facilities = [
  { icon: "🍽️", title: "Best Quality Food" },
  { icon: "📶", title: "High-speed WiFi" },
  { icon: "🧹", title: "Regular Housekeeping" },
  { icon: "🚗", title: "Parking Area" },
  { icon: "🧺", title: "Laundry Service (Paid)" },
  { icon: "🚌", title: "Easy Transport Access" },
];

const PgDetail = () => {
  const { darkMode } = useTheme();

  const navigate = useNavigate();

  const { id } = useParams();

  const [pg, setPg] = useState(null);

  const [loading, setLoading] = useState(true);

  // FETCH SINGLE PG

  useEffect(() => {
    const fetchPg = async () => {
      try {
        const res = await getSinglePg(id);

        setPg(res.pg);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPg();
  }, [id]);

  // LOADING

  if (loading) {
    return (
      <div
        className="
          flex
          h-screen
          text-2xl font-bold
          items-center justify-center
        "
      >
        Loading...
      </div>
    );
  }

  // =========================
  // NO PG
  // =========================

  if (!pg) {
    return (
      <div
        className="
          flex
          h-screen
          text-2xl font-bold text-red-500
          items-center justify-center
        "
      >
        PG Not Found
      </div>
    );
  }

  // =========================
  // MAIN IMAGE
  // =========================

  const imageUrl = getImageUrl(pg.mainImage);

  return (
    <div
      className={`
        w-full
        min-h-screen
        px-3 py-4
        sm:px-5 sm:py-6
        lg:px-8
        max-w-7xl
        mx-auto
      `}
    >
      {/* FLOAT BUTTONS */}

      <div
        className="
          flex flex-col
          fixed
          right-3 bottom-4
          sm:right-5 sm:bottom-5
          z-50
          gap-3
        "
      >
        <ContactButtonIcon type="call" phone={pg?.phone} />

        <ContactButtonIcon type="whatsapp" phone={pg?.phone} />
      </div>

      {/* MAIN IMAGE */}

      <div
        className="
          overflow-hidden
          relative
          rounded-2xl
          sm:rounded-3xl
          shadow-lg
        "
      >
        {/* BACK BUTTON */}

        <button
          onClick={() => navigate(-1)}
          className="
            absolute
            top-3 left-3
            sm:top-4 sm:left-4
            z-20
            p-2 sm:p-3
            rounded-full
            backdrop-blur-md
            bg-black/40
            text-white
            transition-all duration-300
            hover:bg-black/60 hover:scale-110
          "
        >
          <ArrowLeft size={22} />
        </button>

        <img
          src={imageUrl}
          alt={pg?.name}
          className="
            object-cover
            w-full
            h-56
            sm:h-80
            md:h-112.5
            lg:h-137.5
          "
        />
      </div>

      {/* DETAILS */}

      <div className="mt-6">
        <div
          className="
            flex flex-col
            gap-4
            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          {/* LEFT */}

          <div className="flex-1">
            <h1
              className={`
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                leading-tight
                ${darkMode ? "text-white" : "text-gray-900"}
              `}
            >
              {pg?.name}
            </h1>

            {/* LOCATION */}

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                pg?.location,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex
                mt-3
                text-sm
                sm:text-base
                lg:text-lg
                transition-all
                items-center gap-2
                hover:text-blue-500
                wrap-break-word
                ${
                  darkMode
                    ? "text-gray-300 hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }
              `}
            >
              📍 {pg?.location}
            </a>
          </div>
        </div>
      </div>

      {/* FEATURES */}

      <div className="mt-10 sm:mt-14">
        <h2
          className={`
            text-2xl
            sm:text-3xl
            font-bold
            ${darkMode ? "text-white" : "text-black"}
          `}
        >
          What We Offer
        </h2>

        <div
          className="
            grid
            mt-6
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {facilities.map((item, i) => (
            <div
              key={i}
              className={`
                flex
                p-4 sm:p-5
                rounded-2xl
                transition-all
                items-center gap-4
                duration-300
                hover:-translate-y-1
                ${
                  darkMode
                    ? `
                      bg-[#151122]
                      border border-white/5
                    `
                    : `
                      bg-white
                      border border-gray-200
                      shadow-sm
                    `
                }
              `}
            >
              <div className="text-3xl">{item.icon}</div>

              <p
                className={`
                  text-sm
                  sm:text-base
                  font-medium
                  ${darkMode ? "text-gray-200" : "text-gray-700"}
                `}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ROOMS */}

      <div className="mt-10 sm:mt-14">
        <h2
          className={`
            text-2xl
            sm:text-3xl
            font-bold
            ${darkMode ? "text-white" : "text-black"}
          `}
        >
          Room Availability
        </h2>

        <div
          className="
            grid
            mt-6
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {pg?.rooms?.map((room, i) => (
            <div
              key={i}
              className={`
                p-5
                rounded-2xl
                transition-all
                duration-300
                hover:scale-[1.02]
                ${
                  room.available
                    ? `
                      bg-green-500/10
                      border border-green-500/20
                    `
                    : `
                      bg-red-500/10
                      border border-red-500/20
                    `
                }
              `}
            >
              <h3
                className={`
                  text-xl
                  font-bold
                  ${room.available ? "text-green-500" : "text-red-500"}
                `}
              >
                {room.type}
              </h3>

              <p
                className={`
                  mt-2
                  text-sm
                  ${darkMode ? "text-gray-300" : "text-gray-700"}
                `}
              >
                {room.available ? "Available" : "Not Available"}
              </p>

              {room.available && (
                <p
                  className="
                    mt-4
                    text-2xl
                    font-bold
                    text-blue-500
                  "
                >
                  ₹{room.price} / month
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MAP */}

      {pg?.map && (
        <div className="mt-10 sm:mt-14">
          <h2
            className={`
              text-2xl
              sm:text-3xl
              font-bold
              ${darkMode ? "text-white" : "text-black"}
            `}
          >
            Location
          </h2>

          <div className="mt-5 overflow-hidden rounded-2xl shadow-md">
            <iframe
              title="PG Location"
              src={pg?.map}
              loading="lazy"
              allowFullScreen
              className="
                w-full
                h-64
                sm:h-80
                lg:h-112.5
                border-0
              "
            />
          </div>
        </div>
      )}

      {/* GALLERY */}

      {pg?.gallery?.length > 0 && (
        <div className="mt-10 sm:mt-14">
          <PgGallery sections={pg.gallery} />
        </div>
      )}
    </div>
  );
};

export default PgDetail;
