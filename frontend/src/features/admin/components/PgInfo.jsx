import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import ContactButtonIcon from "../../../components/common/buttons/ContactButtonIcon";
import PgGallery from "../../../components/pg/PgGallery";
import { getSinglePg } from "../../../services/pgService";
import { getImageUrl } from "../../../utils/imageUrl";

const facilities = [
  { icon: "🍽️", title: "Best Quality Food" },
  { icon: "📶", title: "High-speed WiFi" },
  { icon: "🧹", title: "Regular Housekeeping" },
  { icon: "🚗", title: "Parking Area" },
  { icon: "🧺", title: "Laundry Service (Paid)" },
  { icon: "🚌", title: "Easy Transport Access" },
];

const PgInfo = () => {
  const { darkMode } = useTheme();

  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH SINGLE PG
  useEffect(() => {
    const fetchSinglePg = async () => {
      try {
        const res = await getSinglePg(id);

        setPg(res.pg);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSinglePg();
  }, [id]);

  // LOADING
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  // NO PG
  if (!pg) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-semibold text-red-500">
        PG Not Found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* FLOAT BUTTONS */}
      <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">
        <ContactButtonIcon type="call" phone={pg?.phone} />

        <ContactButtonIcon type="whatsapp" phone={pg?.phone} />
      </div>

      {/* MAIN IMAGE */}
      <div className="overflow-hidden rounded-3xl">
        <img
          src={getImageUrl(pg?.mainImage)}
          alt={pg?.name}
          className="h-65 w-full object-cover sm:h-100 md:h-125"
        />
      </div>

      {/* DETAILS */}
      <div className="mt-6">
        <h1
          className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} `}
        >
          {pg?.name}
        </h1>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            pg?.location,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 inline-flex items-center gap-2 text-lg leading-8 transition-all duration-300 hover:text-blue-500 ${
            darkMode
              ? "text-gray-300 hover:text-blue-400"
              : "text-gray-700 hover:text-blue-600"
          } `}
        >
          <span>📍</span>

          {pg?.location}
        </a>
      </div>

      {/* FACILITIES */}
      <div className="mt-12">
        <h2
          className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"} `}
        >
          What We Offer
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {facilities.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? `border border-white/5 bg-[#151122]`
                  : `border border-gray-200 bg-white shadow-sm`
              } `}
            >
              <div className="text-3xl">{item.icon}</div>

              <p
                className={`text-base font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} `}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ROOMS */}
      <div className="mt-12">
        <h2
          className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"} `}
        >
          Room Availability
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {pg?.rooms?.map((room, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 transition-all duration-300 ${
                room.available
                  ? `border border-green-500/20 bg-green-500/10`
                  : `border border-red-500/20 bg-red-500/10`
              } `}
            >
              <h3
                className={`text-xl font-bold ${room.available ? "text-green-500" : "text-red-500"} `}
              >
                {room.type}
              </h3>

              <p
                className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} `}
              >
                {room.available ? "Available" : "Not Available"}
              </p>

              {room.available && (
                <p className="mt-4 text-2xl font-bold text-blue-500">
                  ₹{room.price} / month
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MAP */}
      {pg?.map && (
        <div className="mt-12">
          <h2
            className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"} `}
          >
            Location
          </h2>

          <iframe
            title="PG Location"
            src={pg?.map}
            loading="lazy"
            allowFullScreen
            className="mt-5 h-87.5 w-full rounded-2xl border-0"
          />
        </div>
      )}

      {/* GALLERY */}
      {pg?.gallery?.length > 0 && (
        <div className="mt-12">
          <PgGallery sections={pg.gallery} />
        </div>
      )}
    </div>
  );
};

export default PgInfo;
