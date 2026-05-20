import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import ContactButtonIcon from "../common/buttons/ContactButtonIcon";
import { getImageUrl } from "../../utils/imageUrl";

const PgCard = ({ pg }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  const imageUrl = getImageUrl(pg?.mainImage);

  const availableRooms =
    pg?.rooms?.filter((room) => room.available && room.price) || [];

  const lowestRent =
    availableRooms.length > 0
      ? Math.min(...availableRooms.map((room) => Number(room.price)))
      : null;

  return (
    <div
      className={`
        overflow-hidden
        rounded-2xl
        transition-all
        group relative duration-300 hover:-translate-y-1
        ${
          darkMode
            ? "bg-[#1a1625] border border-[#2a2438] shadow-lg shadow-black/30 hover:shadow-black/60"
            : "bg-white border border-gray-200 shadow-md hover:shadow-xl"
        }
      `}
    >
      {/* IMAGE SECTION */}
      <div
        className="
          overflow-hidden
          relative
        "
      >
        <img
          src={imageUrl}
          alt={pg?.name || "PG Image"}
          loading="lazy"
          className="
            object-cover
            w-full h-48
            transition-transform
            duration-500 group-hover:scale-110
            sm:h-52
            md:h-56
          "
        />

        {/* OVERLAY */}
        <div
          className="
            bg-linear-to-t from-black/60 via-black/10 to-transparent
            absolute inset-0
          "
        />

        {/* RENT BADGE */}
        <div
          className="
            px-3 py-1.5
            text-[11px] font-semibold text-white
            bg-blue-600
            rounded-full
            shadow-md
            absolute top-3 left-3 backdrop-blur-sm
            sm:text-xs
          "
        >
          {lowestRent ? (
            <>₹{lowestRent.toLocaleString("en-IN")}/month</>
          ) : (
            <>No Rooms</>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          p-4
          sm:p-5
        "
      >
        {/* NAME */}
        <h2
          className={`
            text-lg font-bold
            line-clamp-1
            sm:text-xl
            ${darkMode ? "text-white" : "text-gray-900"}
          `}
        >
          {pg?.name || "Unnamed PG"}
        </h2>

        {/* LOCATION */}
        <p
          className={`
            flex
            mt-2
            text-sm
            items-center gap-1 line-clamp-1
            ${darkMode ? "text-gray-400" : "text-gray-600"}
          `}
        >
          📍 {pg?.location || "Location not available"}
        </p>

        {/* AVAILABLE ROOM COUNT */}
        <p
          className={`
            mt-3
            text-sm font-medium
            ${darkMode ? "text-green-400" : "text-green-600"}
          `}
        >
          {availableRooms.length} Room Types Available
        </p>

        {/* FOOTER */}
        <div
          className="
            flex
            mt-5
            items-center justify-between
          "
        >
          {/* DETAILS BUTTON */}
          <button
            onClick={() => {
              if (isLoggedIn) {
                navigate(`/pg/${pg?._id}`);
              } else {
                navigate("/login");
              }
            }}
            className={`
              inline-flex
              px-4 py-2.5
              text-sm font-medium
              rounded-full
              transition-all
              items-center justify-center duration-300 hover:scale-105 active:scale-95
              sm:px-5
              ${
                darkMode
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}
          >
            View Details →
          </button>
        </div>

        {/* FLOAT BUTTONS */}
        <div
          className="
            z-10 flex flex-col
            absolute right-4 bottom-4 gap-2
          "
        >
          <ContactButtonIcon type="call" phone={pg?.phone} />

          <ContactButtonIcon type="whatsapp" phone={pg?.phone} />
        </div>
      </div>
    </div>
  );
};

export default PgCard;
