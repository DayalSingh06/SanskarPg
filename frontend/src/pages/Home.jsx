import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";

import WelcomeBanner from "../components/common/banner/WelcomeBanner";
import ContactButton from "../components/common/buttons/ContactButton";

import PgCard from "../components/pg/PgCard";
import { getAllPgs } from "../services/pgService";

import ReviewForm from "./reviews/ReviewForm";
import ReviewList from "./reviews/ReviewList";

import img1 from "../assets/slides/img1.jpg";
import img2 from "../assets/slides/img2.jpg";
import img3 from "../assets/slides/img3.jpg";
import img4 from "../assets/slides/img4.jpg";

const images = [img1, img2, img3, img4];

const Home = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const [pgs, setPgs] = useState([]);

  const [loading, setLoading] = useState(true);

  const user = localStorage.getItem("user");

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    }
  }, []);

  useEffect(() => {
    const fetchPgs = async () => {
      try {
        const res = await getAllPgs();

        setPgs(res.pgs || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPgs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div
        className="
          overflow-hidden
          w-full h-screen
          relative
        "
      >
        {/* SLIDER */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`
              transition-opacity
              absolute inset-0 duration-1000
              ${index === current ? "opacity-100 z-10" : "opacity-0"}
            `}
          >
            <img
              src={img}
              alt="Hostel"
              className="
                object-cover
                w-full h-full
                scale-105 blur-[2px]
              "
            />
          </div>
        ))}

        {/* OVERLAY */}
        <div
          className={`
            z-20
            absolute inset-0
            ${darkMode ? "bg-black/60" : "bg-black/40"}
          `}
        />

        {/* CONTENT */}
        <div
          className="
            z-30 flex flex-col
            w-full
            px-4
            text-center
            absolute inset-0 items-center justify-center
          "
        >
          <h1
            className={`
              text-3xl font-bold
              drop-shadow-[0_5px_20px_rgba(0,0,0,0.5)]
              sm:text-5xl
              md:text-6xl
              ${darkMode ? "text-white" : "text-gray-900"}
            `}
          >
            Best Boy's PG in Jaipur
          </h1>

          <p
            className={`
              max-w-xl
              mt-4
              text-sm
              sm:text-lg
              md:text-xl
              ${darkMode ? "text-gray-200" : "text-gray-900"}
            `}
          >
            Affordable, safe & comfortable stay
          </p>

          <p
            className={`
              mt-3
              text-sm
              sm:text-base
              ${darkMode ? "text-gray-400" : "text-gray-900"}
            `}
          >
            Booking ke liye Contact Us
          </p>

          <div
            className="
              flex flex-wrap
              mt-6
              gap-4 justify-center
            "
          >
            {/* Call Button */}
            <ContactButton type="call" phone="916350028407" />

            {/* WhatsApp Button */}
            <ContactButton type="whatsapp" phone="916350028407" />
          </div>
        </div>
      </div>

      {user && (
        <div
          className="
            mt-10 px-1
          "
        >
          {/* WELCOME BANNER */}
          <div
            className="
              mb-10
            "
          >
            <WelcomeBanner />
          </div>{" "}
        </div>
      )}

      {/* WHY CHOOSE US SECTION */}
      <div
        className={`
          py-20 px-6
          transition-all
          duration-300
          ${
            darkMode
              ? "bg-linear-to-br from-[#0f0c1c] via-[#1a1630] to-[#0f0c1c]"
              : "bg-linear-to-br from-blue-50 via-white to-purple-50"
          }
        `}
      >
        <h2
          className={`
            mb-4
            text-3xl font-bold text-center
            sm:text-4xl
            ${darkMode ? "text-white" : "text-gray-900"}
          `}
        >
          Why Choose Our PG?
        </h2>

        <p
          className={`
            max-w-2xl
            mx-auto mb-12
            text-center text-sm
            sm:text-base
            ${darkMode ? "text-gray-400" : "text-gray-600"}
          `}
        >
          Hum aapko sirf room nahi, ek comfortable & premium living experience
          provide karte hain 🚀
        </p>

        {/* FEATURES GRID */}
        <div
          className="
            grid
            max-w-6xl
            mx-auto
            gap-6
            sm:grid-cols-2
            md:grid-cols-3
          "
        >
          {/* FOOD */}
          <div
            className="
              p-6
              bg-white/10
              rounded-2xl border border-white/10
              shadow-xl
              backdrop-blur-lg hover:scale-105 transition
            "
          >
            <h3
              className="
                mb-2
                text-lg font-semibold text-blue-400
              "
            >
              🍽️ Quality Food
            </h3>
            <p
              className={`
                text-sm
                ${darkMode ? "text-gray-300" : "text-gray-700"}
              `}
            >
              Ghar jaisa swadisht aur hygienic khana 🍛. Har week 2 din special
              meals jaise paneer, sweets ya special dishes serve ki jati hain.
            </p>
          </div>

          {/* WIFI */}
          <div
            className="
              p-6
              bg-white/10
              rounded-2xl border border-white/10
              shadow-xl
              backdrop-blur-lg hover:scale-105 transition
            "
          >
            <h3
              className="
                mb-2
                text-lg font-semibold text-purple-400
              "
            >
              📶 High-Speed WiFi
            </h3>
            <p
              className={`
                text-sm
                ${darkMode ? "text-gray-300" : "text-gray-700"}
              `}
            >
              Fast & reliable internet for study, work aur entertainment — bina
              interruption ke 🚀
            </p>
          </div>

          {/* CLEANING */}
          <div
            className="
              p-6
              bg-white/10
              rounded-2xl border border-white/10
              shadow-xl
              backdrop-blur-lg hover:scale-105 transition
            "
          >
            <h3
              className="
                mb-2
                text-lg font-semibold text-green-400
              "
            >
              🧹 Daily Cleaning
            </h3>
            <p
              className={`
                text-sm
                ${darkMode ? "text-gray-300" : "text-gray-700"}
              `}
            >
              Rozana room cleaning aur regular washroom cleaning — hamesha clean
              & fresh environment ✨
            </p>
          </div>

          {/* LAUNDRY */}
          <div
            className="
              p-6
              bg-white/10
              rounded-2xl border border-white/10
              shadow-xl
              backdrop-blur-lg hover:scale-105 transition
            "
          >
            <h3
              className="
                mb-2
                text-lg font-semibold text-pink-400
              "
            >
              👕 Laundry Service
            </h3>
            <p
              className={`
                text-sm
                ${darkMode ? "text-gray-300" : "text-gray-700"}
              `}
            >
              Convenient laundry service available (paid) — aapko tension lene
              ki zarurat nahi 👍
            </p>
          </div>

          {/* SECURITY */}
          <div
            className="
              p-6
              bg-white/10
              rounded-2xl border border-white/10
              shadow-xl
              backdrop-blur-lg hover:scale-105 transition
            "
          >
            <h3
              className="
                mb-2
                text-lg font-semibold text-red-400
              "
            >
              🔒 Full Security
            </h3>
            <p
              className={`
                text-sm
                ${darkMode ? "text-gray-300" : "text-gray-700"}
              `}
            >
              24/7 CCTV surveillance aur safe environment — aapki safety hamari
              priority hai 🛡️
            </p>
          </div>

          {/* PARKING */}
          <div
            className="
              p-6
              bg-white/10
              rounded-2xl border border-white/10
              shadow-xl
              backdrop-blur-lg hover:scale-105 transition
            "
          >
            <h3
              className="
                mb-2
                text-lg font-semibold text-yellow-400
              "
            >
              🚗 Parking Area
            </h3>
            <p
              className={`
                text-sm
                ${darkMode ? "text-gray-300" : "text-gray-700"}
              `}
            >
              Spacious aur secure parking facility — Only for bike ke liye
              available
            </p>
          </div>
        </div>
      </div>

      {/* OUR PG SECTION (NOW CORRECT PLACE) */}
      <div
        className={`
          py-16 px-6
          transition-colors
          duration-300
          ${darkMode ? "bg-[#0f0c1c]" : "bg-gray-100"}
        `}
      >
        <h2
          className={`
            mb-10
            text-2xl font-bold text-center
            sm:text-3xl
            ${darkMode ? "text-white" : "text-gray-900"}
          `}
        >
          Our PG's
        </h2>

        <div
          className="
            grid
            max-w-6xl
            mx-auto
            gap-6
            sm:grid-cols-2
            md:grid-cols-3
          "
        >
          {loading ? (
            <div
              className="
                text-center text-xl font-semibold
                col-span-full
              "
            >
              Loading PGs...
            </div>
          ) : pgs.length > 0 ? (
            pgs.map((pg) => <PgCard key={pg._id} pg={pg} />)
          ) : (
            <div
              className="
                text-center text-xl font-semibold text-red-500
                col-span-full
              "
            >
              No PG Found
            </div>
          )}
        </div>
      </div>

      {/* REVIEW SECTION */}
      <div
        className={`
          py-16 px-4
          ${darkMode ? "bg-[#141124]" : "bg-white"}
        `}
      >
        <div
          className="
            max-w-7xl
            mx-auto
          "
        >
          <h2
            className={`
              mb-14
              text-3xl font-bold text-center
              ${darkMode ? "text-white" : "text-gray-900"}
            `}
          >
            Reviews 💬
          </h2>

          <div
            className="
              grid grid-cols-1
              gap-10 items-start
              lg:grid-cols-2
            "
          >
            {/* LEFT SIDE */}
            <ReviewForm />

            {/* RIGHT SIDE */}
            <ReviewList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
