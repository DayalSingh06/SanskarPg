import React from "react";
import { useTheme } from "../context/ThemeContext";

const Facilities = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen overflow-x-hidden px-4 py-10 transition-all duration-300 select-none sm:px-6 sm:py-14 lg:px-8 lg:py-16 ${
        darkMode
          ? "bg-linear-to-br from-[#0f0c1c] via-[#1a1630] to-[#0f0c1c] text-white"
          : "bg-linear-to-br from-blue-50 via-white to-purple-50 text-gray-900"
      } `}
    >
      {/* HEADING */}
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
        <h1 className="mb-4 text-2xl leading-tight font-bold sm:text-4xl lg:text-5xl">
          Our Facilities & Services
        </h1>
        <p
          className={`text-sm leading-relaxed sm:text-base ${darkMode ? "text-gray-400" : "text-gray-600"} `}
        >
          More than just a PG, we provide a comfortable, safe, and
          premium living experience where you can enjoy peace of mind
          every day.
        </p>
      </div>

      {/* 🍽️ FOOD SECTION (MOST IMPORTANT) */}
      <div className="mx-auto mb-16 max-w-5xl">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8">
          <h2 className="mb-4 text-xl font-bold text-yellow-400 sm:text-2xl">
            🍽️ Best Quality Food
          </h2>

          <p className="mb-4 text-sm leading-relaxed sm:text-base">
            One of the biggest highlights of our PG is our food. We
            take pride in serving delicious, high-quality, and
            hygienic meals that stand out from typical PG offerings.
            You're welcome to visit and taste the food yourself before
            making a decision.
          </p>

          <p className="mb-4 text-sm leading-relaxed sm:text-base">
            While most PGs offer special meals only once a week, we
            serve a{" "}
            <span className="font-semibold text-green-400">
              special dinner twice a week (Thursday & Sunday){" "}
            </span>
            to make your dining experience even more enjoyable.
          </p>

          <div className="grid gap-4 text-sm sm:grid-cols-2 sm:gap-5 sm:text-base">
            <div>
              <h3 className="mb-2 font-semibold text-blue-400">
                🍳 Morning
              </h3>
              <p>Breakfast + Tea ☕</p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-green-400">
                🍱 Lunch
              </h3>
              <p>
                Seasonal Vegetable + Dal + Chapati + Rice + Buttermilk
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-purple-400">
                🍽️ Dinner
              </h3>
              <p>
                Freshly Prepared Vegetable Dish + (Chutney / mirchi
                taporiye) + Chapati
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-pink-400">
                🎉 Special Days
              </h3>
              <p>Suji Halwa / Kheer + Paneer / Chole + Chapati</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🏢 OTHER FACILITIES */}
      <div className="mx-auto grid max-w-6xl gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8">
        {/* ROOM */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] sm:p-6">
          <h3 className="mb-3 text-lg font-semibold text-blue-400 sm:text-xl">
            🛏️ Room & Furniture
          </h3>
          <p className="text-sm leading-relaxed sm:text-base">
            We offer Single, Double, and Triple Sharing Rooms to suit
            different preferences and budgets. Each room is furnished
            with a comfortable bed, study table, chair, cupboard, and
            fan/cooler to ensure a comfortable living experience.
          </p>
        </div>

        {/* BATHROOM */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] sm:p-6">
          <h3 className="mb-3 text-lg font-semibold text-cyan-400 sm:text-xl">
            🚿 Bathroom & Water
          </h3>
          <p className="text-sm leading-relaxed sm:text-base">
            Choose between attached or shared bathroom options. Clean
            and well-maintained washrooms are provided, along with
            24/7 water supply and geyser facilities for your
            convenience.
          </p>
        </div>

        {/* WIFI */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] sm:p-6">
          <h3 className="mb-3 text-lg font-semibold text-purple-400 sm:text-xl">
            🌐 Internet & Electricity
          </h3>
          <p className="text-sm leading-relaxed sm:text-base">
            High-speed Wi-Fi and 24/7 electricity ensure uninterrupted
            study, work, and entertainment whenever you need it.
          </p>
        </div>

        {/* CLEANING */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] sm:p-6">
          <h3 className="mb-3 text-lg font-semibold text-green-400 sm:text-xl">
            🧹 Cleaning & Maintenance
          </h3>
          <p className="text-sm leading-relaxed sm:text-base">
            Regular housekeeping, room cleaning, washroom maintenance,
            and garbage collection ensure a clean, hygienic, and
            well-maintained living environment at all times.
          </p>
        </div>

        {/* LAUNDRY */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] sm:p-6">
          <h3 className="mb-3 text-lg font-semibold text-pink-400 sm:text-xl">
            👕 Laundry Service
          </h3>
          <p className="text-sm leading-relaxed sm:text-base">
            Paid laundry service is available, so you can enjoy a
            hassle-free stay without worrying about washing clothes.
          </p>
        </div>

        {/* SECURITY */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] sm:p-6">
          <h3 className="mb-3 text-lg font-semibold text-red-400 sm:text-xl">
            🔐 Security
          </h3>
          <p className="text-sm leading-relaxed sm:text-base">
            24/7 CCTV surveillance and a secure living environment
            ensure your safety and peace of mind.
          </p>
        </div>

        {/* PARKING */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] sm:p-6">
          <h3 className="mb-3 text-lg font-semibold text-orange-400 sm:text-xl">
            🚗 Parking Area
          </h3>
          <p className="text-sm leading-relaxed sm:text-base">
            Safe and spacious parking facilities are available
            exclusively for bikes.
          </p>
        </div>

        {/* LOCATION */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] sm:p-6">
          <h3 className="mb-3 text-lg font-semibold text-indigo-400 sm:text-xl">
            📍 Location & Nearby
          </h3>
          <p className="text-sm leading-relaxed sm:text-base">
            Our PG is conveniently located in a prime area, with
            markets, D-Mart, supermarkets, and local shops just a
            short distance away. 🛒 Easy access to public
            transportation ensures a hassle-free daily commute.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
