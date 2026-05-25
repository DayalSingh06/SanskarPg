import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import ContactButtonIcon from "../../../components/common/buttons/ContactButtonIcon";
import { getImageUrl } from "../../../utils/imageUrl";

const PgCard = ({ pg }) => {
  const { darkMode } = useTheme();

  const [livePg, setLivePg] = useState(pg);

  console.log(getImageUrl(livePg?.mainImage));

  // AUTO UPDATE
  useEffect(() => {
    setLivePg(pg);
  }, [pg]);

  // LOWEST RENT
  const prices =
    livePg?.rooms
      ?.map((room) => Number(room.price))
      ?.filter((price) => !isNaN(price) && price > 0) || [];

  const lowestRent = prices.length > 0 ? Math.min(...prices) : 0;

  return (
    <div
      className={`group overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
        darkMode
          ? `border border-white/5 bg-[#151122] shadow-[0_10px_35px_rgba(0,0,0,0.45)]`
          : `border border-gray-200 bg-white shadow-lg`
      } `}
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={getImageUrl(livePg?.mainImage)}
          alt={livePg?.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        {/* RENT */}
        <div className="absolute top-4 left-4 rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white">
          ₹{lowestRent.toLocaleString("en-IN")} / month
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* NAME */}
        <h2
          className={`line-clamp-1 text-[21px] font-bold ${darkMode ? "text-white" : "text-gray-900"} `}
        >
          {livePg?.name}
        </h2>

        {/* LOCATION */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            livePg?.location,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 line-clamp-2 flex gap-2 text-[15px] leading-7 transition-all duration-300 hover:text-blue-500 ${
            darkMode
              ? "text-gray-400 hover:text-blue-400"
              : "text-gray-600 hover:text-blue-600"
          } `}
        >
          <span>📍</span>

          {livePg?.location}
        </a>

        {/* FOOTER */}
        <div className="mt-6 flex items-end justify-between">
          <div className="flex flex-col gap-3">
            {/* VIEW DETAILS */}
            <Link
              to={`/pg/${livePg?._id}`}
              className="rounded-full bg-linear-to-r from-blue-500 to-blue-600 px-6 py-3 text-center text-white transition hover:scale-105"
            >
              View Details →
            </Link>

            {/* UPDATE BUTTON */}
            <Link
              to={`/update/${livePg?._id}`}
              className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 ${
                darkMode
                  ? `bg-linear-to-r from-yellow-500 to-orange-500 text-white shadow-yellow-500/20`
                  : `bg-linear-to-r from-yellow-500 to-orange-500 text-white`
              } `}
            >
              Update PG
            </Link>
          </div>

          {/* CONTACT BUTTONS */}
          <div className="flex flex-col gap-3">
            <ContactButtonIcon type="call" phone={livePg?.phone} />

            <ContactButtonIcon type="whatsapp" phone={livePg?.phone} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgCard;
