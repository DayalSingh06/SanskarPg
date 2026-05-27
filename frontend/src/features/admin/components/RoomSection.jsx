import { BedDouble, IndianRupee } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const RoomSection = ({ data, setData }) => {
  const { darkMode } = useTheme();

  const handleChange = (index, field, value) => {
    const updatedRooms = [...data.rooms];

    updatedRooms[index][field] = value;

    setData({
      ...data,
      rooms: updatedRooms,
    });
  };

  return (
    <div className="mt-10 sm:mt-12 md:mt-16">
      {/* HEADER */}

      <div className="mt-10 sm:mt-12 md:mt-16">
        <h2
          className={`flex items-center gap-2 text-2xl font-black sm:gap-3 sm:text-3xl md:text-4xl ${darkMode ? "text-white" : "text-gray-800"} `}
        >
          Room Details
        </h2>

        <p
          className={`mt-3 text-base ${darkMode ? "text-gray-400" : "text-gray-500"} `}
        >
          Configure room pricing and availability
        </p>
      </div>

      {/* ROOM GRID */}

      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-8">
        {data.rooms.map((room, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-3xl border p-4 backdrop-blur-xl transition-all duration-500 sm:p-6 md:rounded-4xl md:p-8 md:hover:-translate-y-2 ${
              darkMode
                ? `border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]`
                : `border-white/50 bg-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.18)]`
            } `}
          >
            {/* TOP GLOW */}

            <div
              className={`absolute top-0 right-0 h-24 w-24 rounded-full blur-3xl sm:h-32 sm:w-32 md:h-40 md:w-40 ${darkMode ? "bg-indigo-500/10" : "bg-blue-200/40"} `}
            />

            {/* ROOM TITLE */}

            <div className="relative z-10 flex items-center gap-3 sm:gap-4">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl md:h-14 md:w-14 ${
                  darkMode
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "bg-blue-100 text-blue-600"
                } `}
              >
                <BedDouble
                  size={22}
                  className="sm:h-6 sm:w-6 md:h-7 md:w-7"
                />
              </div>

              <div>
                <h3
                  className={`text-lg font-black sm:text-xl md:text-2xl ${darkMode ? "text-white" : "text-gray-800"} `}
                >
                  {room.type}
                </h3>

                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} `}
                >
                  Room configuration
                </p>
              </div>
            </div>

            {/* PRICE */}

            <div className="mt-5 sm:mt-6 md:mt-8">
              <label
                className={`mb-3 block text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"} `}
              >
                Monthly Price
              </label>

              <div className="relative">
                <IndianRupee
                  size={16}
                  className={`absolute top-1/2 left-4 -translate-y-1/2 sm:h-4.5 sm:w-4.5 ${darkMode ? "text-gray-400" : "text-gray-500"} `}
                />

                <input
                  type="text"
                  placeholder="Enter room price"
                  value={room.price}
                  onChange={(e) =>
                    handleChange(index, "price", e.target.value)
                  }
                  className={`w-full rounded-2xl border py-3 pr-4 pl-10 transition-all duration-300 outline-none sm:py-4 sm:pr-5 sm:pl-12 ${
                    darkMode
                      ? `border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20`
                      : `border-gray-200 bg-white/90 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200`
                  } `}
                />
              </div>
            </div>

            {/* AVAILABLE */}

            <div
              className={`mt-5 flex items-center justify-between gap-3 p-3 sm:mt-6 sm:p-4 md:mt-8 ${darkMode ? "bg-white/5" : "bg-gray-50"} `}
            >
              <div>
                <h4
                  className={`text-sm font-bold sm:text-base ${darkMode ? "text-white" : "text-gray-800"} `}
                >
                  Availability
                </h4>

                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} `}
                >
                  Mark room availability
                </p>
              </div>

              {/* TOGGLE */}

              <button
                type="button"
                onClick={() =>
                  handleChange(index, "available", !room.available)
                }
                className={`relative h-8 w-14 rounded-full transition-all duration-300 sm:h-9 sm:w-16 ${
                  room.available
                    ? "bg-green-500"
                    : darkMode
                      ? "bg-gray-700"
                      : "bg-gray-300"
                } `}
              >
                <div
                  className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 sm:h-7 sm:w-7 ${room.available ? "translate-x-7 sm:translate-x-8" : "translate-x-1"} `}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSection;
