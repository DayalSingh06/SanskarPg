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
    <div
      className="
        mt-10
        sm:mt-12
        md:mt-16
      "
    >
      {/* HEADER */}

      <div
        className="
          mt-10
          sm:mt-12
          md:mt-16
        "
      >
        <h2
          className={`
            flex
            text-2xl font-black
            items-center gap-2
            sm:text-3xl sm:gap-3
            md:text-4xl
            ${darkMode ? "text-white" : "text-gray-800"}
          `}
        >
          Room Details
        </h2>

        <p
          className={`
            mt-3
            text-base
            ${darkMode ? "text-gray-400" : "text-gray-500"}
          `}
        >
          Configure room pricing and availability
        </p>
      </div>

      {/* ROOM GRID */}

      <div
        className="
          grid grid-cols-1
          gap-5
          sm:gap-6
          md:grid-cols-2 md:gap-8
        "
      >
        {data.rooms.map((room, index) => (
          <div
            key={index}
            className={`
              overflow-hidden
              p-4
              rounded-3xl border
              transition-all
              group relative backdrop-blur-xl duration-500
              sm:p-6
              md:p-8 md:rounded-4xl md:hover:-translate-y-2
              ${
                darkMode
                  ? `
                    bg-white/5
                    border-white/10
                    shadow-[0_10px_40px_rgba(0,0,0,0.4)]
                    hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]
                  `
                  : `
                    bg-white/80
                    border-white/50
                    shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_20px_60px_rgba(79,70,229,0.18)]
                  `
              }
            `}
          >
            {/* TOP GLOW */}

            <div
              className={`
                w-24 h-24
                rounded-full
                absolute top-0 right-0 blur-3xl
                sm:w-32 sm:h-32
                md:w-40 md:h-40
                ${darkMode ? "bg-indigo-500/10" : "bg-blue-200/40"}
              `}
            />

            {/* ROOM TITLE */}

            <div
              className="
                z-10 flex
                relative items-center gap-3
                sm:gap-4
              "
            >
              <div
                className={`
                  flex
                  w-11 h-11
                  rounded-xl
                  items-center justify-center
                  sm:w-12 sm:h-12 sm:rounded-2xl
                  md:w-14 md:h-14
                  ${
                    darkMode
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "bg-blue-100 text-blue-600"
                  }
                `}
              >
                <BedDouble
                  size={22}
                  className="
                    sm:w-6 sm:h-6
                    md:w-7 md:h-7
                  "
                />
              </div>

              <div>
                <h3
                  className={`
                    text-lg font-black
                    sm:text-xl
                    md:text-2xl
                    ${darkMode ? "text-white" : "text-gray-800"}
                  `}
                >
                  {room.type}
                </h3>

                <p
                  className={`
                    text-sm
                    ${darkMode ? "text-gray-400" : "text-gray-500"}
                  `}
                >
                  Room configuration
                </p>
              </div>
            </div>

            {/* PRICE */}

            <div
              className="
                mt-5
                sm:mt-6
                md:mt-8
              "
            >
              <label
                className={`
                  block
                  mb-3
                  text-sm font-semibold
                  ${darkMode ? "text-gray-300" : "text-gray-700"}
                `}
              >
                Monthly Price
              </label>

              <div
                className="
                  relative
                "
              >
                <IndianRupee
                  size={16}
                  className={`
                    absolute top-1/2 left-4 -translate-y-1/2
                    sm:w-4.5 sm:h-4.5
                    ${darkMode ? "text-gray-400" : "text-gray-500"}
                  `}
                />

                <input
                  type="text"
                  placeholder="Enter room price"
                  value={room.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                  className={`
                    w-full
                    py-3 pr-4 pl-10
                    border rounded-2xl
                    transition-all
                    outline-none duration-300
                    sm:py-4 sm:pr-5 sm:pl-12
                    ${
                      darkMode
                        ? `
                          bg-white/5
                          border-white/10
                          text-white
                          placeholder:text-gray-500
                          focus:ring-4
                          focus:ring-indigo-500/20
                          focus:border-indigo-500
                        `
                        : `
                          bg-white/90
                          border-gray-200
                          text-gray-700
                          placeholder:text-gray-400
                          focus:ring-4
                          focus:ring-blue-200
                          focus:border-blue-500
                        `
                    }
                  `}
                />
              </div>
            </div>

            {/* AVAILABLE */}

            <div
              className={`
                flex
                p-3 mt-5
                items-center justify-between gap-3
                sm:p-4 sm:mt-6
                md:mt-8
                ${darkMode ? "bg-white/5" : "bg-gray-50"}
              `}
            >
              <div>
                <h4
                  className={`
                    text-sm font-bold
                    sm:text-base
                    ${darkMode ? "text-white" : "text-gray-800"}
                  `}
                >
                  Availability
                </h4>

                <p
                  className={`
                    text-sm
                    ${darkMode ? "text-gray-400" : "text-gray-500"}
                  `}
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
                className={`
                  w-14 h-8
                  rounded-full
                  transition-all
                  relative duration-300
                  sm:w-16 sm:h-9
                  ${
                    room.available
                      ? "bg-green-500"
                      : darkMode
                        ? "bg-gray-700"
                        : "bg-gray-300"
                  }
                `}
              >
                <div
                  className={`
                    w-6 h-6
                    bg-white
                    rounded-full
                    transition-all
                    absolute top-1 duration-300
                    sm:w-7 sm:h-7
                    ${room.available ? "translate-x-7 sm:translate-x-8" : "translate-x-1"}
                  `}
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
