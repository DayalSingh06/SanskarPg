import React from "react";
import { useTheme } from "../context/ThemeContext";

const Facilities = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`
        overflow-x-hidden
        min-h-screen
        px-4 py-10
        transition-all
        duration-300
        sm:px-6 sm:py-14
        lg:px-8 lg:py-16
        ${
          darkMode
            ? "bg-linear-to-br from-[#0f0c1c] via-[#1a1630] to-[#0f0c1c] text-white"
            : "bg-linear-to-br from-blue-50 via-white to-purple-50 text-gray-900"
        }
      `}
    >
      {/* HEADING */}
      <div
        className="
          max-w-3xl
          mx-auto mb-10
          text-center
          sm:mb-14
        "
      >
        <h1
          className="
            mb-4
            text-2xl font-bold leading-tight
            sm:text-4xl
            lg:text-5xl
          "
        >
          Our Facilities & Services
        </h1>
        <p
          className={`
            text-sm leading-relaxed
            sm:text-base
            ${darkMode ? "text-gray-400" : "text-gray-600"}
          `}
        >
          Hum sirf PG nahi dete, balki ek comfortable, safe aur premium living
          experience provide karte hain — jahan aap bina kisi tension ke reh
          sakte hain 😊
        </p>
      </div>

      {/* 🍽️ FOOD SECTION (MOST IMPORTANT) */}
      <div
        className="
          max-w-5xl
          mx-auto mb-16
        "
      >
        <div
          className="
            p-5
            bg-white/10
            rounded-2xl border border-white/10
            shadow-2xl
            backdrop-blur-xl
            sm:p-8 sm:rounded-3xl
          "
        >
          <h2
            className="
              mb-4
              text-xl font-bold text-yellow-400
              sm:text-2xl
            "
          >
            🍽️ Best Quality Food (Our Highlight)
          </h2>

          <p
            className="
              mb-4
              text-sm leading-relaxed
              sm:text-base
            "
          >
            Hamare PG ki sabse badi khasiyat hai hamara khana 🍛 — jo taste,
            quality aur hygiene ke mamle me dusre PG se kaafi better hai. Aap
            khud aake khana taste karke check kar sakte ho 👍
          </p>

          <p
            className="
              mb-4
              text-sm leading-relaxed
              sm:text-base
            "
          >
            Jahan baaki PG sirf week me 1 baar special khana dete hain, hum
            aapko{" "}
            <span
              className="
                font-semibold text-green-400
              "
            >
              week me 2 din (Thursday & Sunday)
            </span>{" "}
            special dinner provide karte hain 🎉
          </p>

          <div
            className="
              grid
              text-sm
              gap-4
              sm:grid-cols-2 sm:text-base sm:gap-5
            "
          >
            <div>
              <h3
                className="
                  mb-2
                  font-semibold text-blue-400
                "
              >
                🍳 Morning
              </h3>
              <p>Breakfast + Tea ☕</p>
            </div>

            <div>
              <h3
                className="
                  mb-2
                  font-semibold text-green-400
                "
              >
                🍱 Lunch
              </h3>
              <p>2 Sabji (1 sabji + 1 dal) + Rice + Chach 🥛</p>
            </div>

            <div>
              <h3
                className="
                  mb-2
                  font-semibold text-purple-400
                "
              >
                🍽️ Dinner
              </h3>
              <p>1 Sabji + Dal / Chutney + Roti</p>
            </div>

            <div>
              <h3
                className="
                  mb-2
                  font-semibold text-pink-400
                "
              >
                🎉 Special Days
              </h3>
              <p>Suji Halwa / Kheer + Paneer / Chole + Roti / Puri</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🏢 OTHER FACILITIES */}
      <div
        className="
          grid
          max-w-6xl
          mx-auto
          gap-5
          sm:gap-6
          md:grid-cols-2
          lg:gap-8
        "
      >
        {/* ROOM */}
        <div
          className="
            p-5
            bg-white/10
            rounded-2xl border border-white/10
            shadow-xl transition-all
            backdrop-blur-xl duration-300 hover:scale-[1.02]
            sm:p-6
          "
        >
          <h3
            className="
              mb-3
              text-lg font-semibold text-blue-400
              sm:text-xl
            "
          >
            🛏️ Room & Furniture
          </h3>
          <p
            className="
              text-sm leading-relaxed
              sm:text-base
            "
          >
            Single, Double aur Triple sharing rooms available hain. Har room me
            comfortable bed, study table, chair, cupboard aur fan/cooler diya
            jata hai taki aap comfortable feel karein.
          </p>
        </div>

        {/* BATHROOM */}
        <div
          className="
            p-5
            bg-white/10
            rounded-2xl border border-white/10
            shadow-xl transition-all
            backdrop-blur-xl duration-300 hover:scale-[1.02]
            sm:p-6
          "
        >
          <h3
            className="
              mb-3
              text-lg font-semibold text-cyan-400
              sm:text-xl
            "
          >
            🚿 Bathroom & Water
          </h3>
          <p
            className="
              text-sm leading-relaxed
              sm:text-base
            "
          >
            Attached ya common bathroom options available hain. 24x7 pani aur
            geyser facility ke saath clean aur maintained washrooms provide kiye
            jate hain.
          </p>
        </div>

        {/* WIFI */}
        <div
          className="
            p-5
            bg-white/10
            rounded-2xl border border-white/10
            shadow-xl transition-all
            backdrop-blur-xl duration-300 hover:scale-[1.02]
            sm:p-6
          "
        >
          <h3
            className="
              mb-3
              text-lg font-semibold text-purple-400
              sm:text-xl
            "
          >
            🌐 Internet & Electricity
          </h3>
          <p
            className="
              text-sm leading-relaxed
              sm:text-base
            "
          >
            High-speed WiFi aur 24/7 electricity available hai taki aap study,
            work aur entertainment bina interruption ke kar sakein ⚡
          </p>
        </div>

        {/* CLEANING */}
        <div
          className="
            p-5
            bg-white/10
            rounded-2xl border border-white/10
            shadow-xl transition-all
            backdrop-blur-xl duration-300 hover:scale-[1.02]
            sm:p-6
          "
        >
          <h3
            className="
              mb-3
              text-lg font-semibold text-green-400
              sm:text-xl
            "
          >
            🧹 Cleaning & Maintenance
          </h3>
          <p
            className="
              text-sm leading-relaxed
              sm:text-base
            "
          >
            Regular housekeeping, room cleaning, washroom cleaning aur garbage
            collection — hamesha clean aur hygienic environment maintain kiya
            jata hai ✨
          </p>
        </div>

        {/* LAUNDRY */}
        <div
          className="
            p-5
            bg-white/10
            rounded-2xl border border-white/10
            shadow-xl transition-all
            backdrop-blur-xl duration-300 hover:scale-[1.02]
            sm:p-6
          "
        >
          <h3
            className="
              mb-3
              text-lg font-semibold text-pink-400
              sm:text-xl
            "
          >
            👕 Laundry Service
          </h3>
          <p
            className="
              text-sm leading-relaxed
              sm:text-base
            "
          >
            Laundry service available hai (paid) — aapko kapde dhone ki tension
            lene ki zarurat nahi 👍
          </p>
        </div>

        {/* SECURITY */}
        <div
          className="
            p-5
            bg-white/10
            rounded-2xl border border-white/10
            shadow-xl transition-all
            backdrop-blur-xl duration-300 hover:scale-[1.02]
            sm:p-6
          "
        >
          <h3
            className="
              mb-3
              text-lg font-semibold text-red-400
              sm:text-xl
            "
          >
            🔐 Security
          </h3>
          <p
            className="
              text-sm leading-relaxed
              sm:text-base
            "
          >
            CCTV cameras aur safe environment — aapki safety hamari priority hai
            🛡️
          </p>
        </div>

        {/* COMMON AREA */}
        <div
          className="
            p-5
            bg-white/10
            rounded-2xl border border-white/10
            shadow-xl transition-all
            backdrop-blur-xl duration-300 hover:scale-[1.02]
            sm:p-6
          "
        >
          <h3
            className="
              mb-3
              text-lg font-semibold text-yellow-400
              sm:text-xl
            "
          >
            🛋️ Common Area
          </h3>
          <p
            className="
              text-sm leading-relaxed
              sm:text-base
            "
          >
            Dining hall, refrigerator aur basic facilities available hain jahan
            aap relax kar sakte hain aur meals enjoy kar sakte hain 😊
          </p>
        </div>

        {/* PARKING */}
        <div
          className="
            p-5
            bg-white/10
            rounded-2xl border border-white/10
            shadow-xl transition-all
            backdrop-blur-xl duration-300 hover:scale-[1.02]
            sm:p-6
          "
        >
          <h3
            className="
              mb-3
              text-lg font-semibold text-orange-400
              sm:text-xl
            "
          >
            🚗 Parking Area
          </h3>
          <p
            className="
              text-sm leading-relaxed
              sm:text-base
            "
          >
            Safe aur spacious parking available hai — bike aur car dono ke liye
            suitable 🚘
          </p>
        </div>

        {/* LOCATION */}
        <div
          className="
            p-5
            bg-white/10
            rounded-2xl border border-white/10
            shadow-xl transition-all
            backdrop-blur-xl duration-300 hover:scale-[1.02]
            sm:p-6
          "
        >
          <h3
            className="
              mb-3
              text-lg font-semibold text-indigo-400
              sm:text-xl
            "
          >
            📍 Location & Nearby
          </h3>
          <p
            className="
              text-sm leading-relaxed
              sm:text-base
            "
          >
            Hamara PG prime location par hai jahan market, D-Mart, Super Mart
            aur local shops easily available hain 🛒. Transport bhi easily mil
            jata hai, isliye aapko daily travel me koi problem nahi hogi 🚶‍♂️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
