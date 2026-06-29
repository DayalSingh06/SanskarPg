import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import ContactButtonIcon from "../common/buttons/ContactButtonIcon";
import { getImageUrl } from "../../utils/imageUrl";

const PgCard = ({ pg }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const imageUrl = getImageUrl(pg?.mainImage);

  const availableRooms =
    pg?.rooms?.filter((room) => {
      const price = Number(room.price);
      return room.available && Number.isFinite(price) && price > 0;
    }) || [];

  const lowestRent =
    availableRooms.length > 0
      ? Math.min(...availableRooms.map((room) => Number(room.price)))
      : null;

  const handleViewDetails = () => {
    // if (!isLoggedIn) {
    //   navigate("/login");
    //   return;
    // }

    if (pg?._id) {
      navigate(`/pg/${pg._id}`);
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
        darkMode
          ? "border border-[#2a2438] bg-[#1a1625] shadow-lg shadow-black/30 hover:shadow-black/60"
          : "border border-gray-200 bg-white shadow-md hover:shadow-xl"
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={pg?.name || "PG Image"}
          loading="lazy"
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-52 md:h-56"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute top-3 left-3 rounded-full bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-md backdrop-blur-sm sm:text-xs">
          {lowestRent
            ? `₹${lowestRent.toLocaleString("en-IN")}/month`
            : "No Rooms"}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h2
          className={`line-clamp-1 text-lg font-bold sm:text-xl ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {pg?.name || "Unnamed PG"}
        </h2>

        <p
          className={`mt-2 line-clamp-1 flex items-center gap-1 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {pg?.location || "Location not available"}
        </p>

        <p
          className={`mt-3 text-sm font-medium ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          {availableRooms.length} Room Types Available
        </p>

        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={handleViewDetails}
            disabled={!pg?._id && isLoggedIn}
            className={`inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 ${
              darkMode
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            View Details
          </button>
        </div>

        {pg?.phone && (
          <div className="absolute right-4 bottom-4 z-10 flex flex-col gap-2">
            <ContactButtonIcon type="call" phone={pg.phone} />
            <ContactButtonIcon type="whatsapp" phone={pg.phone} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PgCard;
