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
      <div className="relative h-[70vh] w-full overflow-hidden sm:h-[85vh] md:h-screen">
        {/* SLIDER */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "z-10 opacity-100" : "opacity-0"} `}
          >
            <img
              src={img}
              alt="PG Images"
              className="h-full w-full scale-100 object-cover object-center blur-[1px] sm:scale-105 sm:blur-[2px]"
            />
          </div>
        ))}

        {/* OVERLAY */}
        <div
          className={`absolute inset-0 z-20 ${darkMode ? "bg-black/65" : "bg-black/45"} `}
        />

        {/* CONTENT */}
        <div className="absolute inset-0 z-30 flex h-full w-full flex-col items-center justify-center px-5 text-center">
          <h1
            className={`max-w-3xl text-4xl leading-tight font-extrabold drop-shadow-[0_5px_20px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl ${darkMode ? "text-white" : "text-white"} `}
          >
            Best Boy's PG in Jaipur
          </h1>

          <p
            className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl ${darkMode ? "text-gray-200" : "text-gray-100"} `}
          >
            Affordable, safe & comfortable stay with premium
            facilities for students and working professionals ✨
          </p>

          <p
            className={`mt-3 text-sm font-medium sm:text-base ${darkMode ? "text-gray-300" : "text-gray-200"} `}
          >
            Booking ke liye Contact Us 📞
          </p>

          {/* BUTTONS */}
          <div className="mt-7 flex w-full max-w-xs flex-col justify-center gap-4 sm:w-auto sm:max-w-none sm:flex-row">
            {/* Call Button */}
            <div className="w-full sm:w-auto">
              <ContactButton type="call" phone="916350028407" />
            </div>

            {/* WhatsApp Button */}
            <div className="w-full sm:w-auto">
              <ContactButton type="whatsapp" phone="916350028407" />
            </div>
          </div>
        </div>
      </div>

      {/* WELCOME BANNER */}
      {user && (
        <div className="mt-6 px-2 sm:mt-10">
          <div className="mb-8 sm:mb-10">
            <WelcomeBanner />
          </div>
        </div>
      )}

      {/* WHY CHOOSE US SECTION */}
      <div
        className={`px-6 py-20 transition-all duration-300 ${
          darkMode
            ? "bg-linear-to-br from-[#0f0c1c] via-[#1a1630] to-[#0f0c1c]"
            : "bg-linear-to-br from-blue-50 via-white to-purple-50"
        } `}
      >
        <h2
          className={`mb-4 text-center text-3xl font-bold sm:text-4xl ${darkMode ? "text-white" : "text-gray-900"} `}
        >
          Why Choose Our PG?
        </h2>

        <p
          className={`mx-auto mb-12 max-w-2xl text-center text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-600"} `}
        >
          Hum aapko sirf room nahi, ek comfortable & premium living
          experience provide karte hain 🚀
        </p>

        {/* FEATURES GRID */}
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* FOOD */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-lg transition hover:scale-105">
            <h3 className="mb-2 text-lg font-semibold text-blue-400">
              🍽️ Quality Food
            </h3>
            <p
              className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} `}
            >
              Ghar jaisa swadisht aur hygienic khana 🍛. Har week 2
              din special meals jaise paneer, sweets ya special dishes
              serve ki jati hain.
            </p>
          </div>

          {/* WIFI */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-lg transition hover:scale-105">
            <h3 className="mb-2 text-lg font-semibold text-purple-400">
              📶 High-Speed WiFi
            </h3>
            <p
              className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} `}
            >
              Fast & reliable internet for study, work aur
              entertainment — bina interruption ke 🚀
            </p>
          </div>

          {/* CLEANING */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-lg transition hover:scale-105">
            <h3 className="mb-2 text-lg font-semibold text-green-400">
              🧹 Daily Cleaning
            </h3>
            <p
              className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} `}
            >
              Rozana room cleaning aur regular washroom cleaning —
              hamesha clean & fresh environment ✨
            </p>
          </div>

          {/* LAUNDRY */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-lg transition hover:scale-105">
            <h3 className="mb-2 text-lg font-semibold text-pink-400">
              👕 Laundry Service
            </h3>
            <p
              className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} `}
            >
              Convenient laundry service available (paid) — aapko
              tension lene ki zarurat nahi 👍
            </p>
          </div>

          {/* SECURITY */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-lg transition hover:scale-105">
            <h3 className="mb-2 text-lg font-semibold text-red-400">
              🔒 Full Security
            </h3>
            <p
              className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} `}
            >
              24/7 CCTV surveillance aur safe environment — aapki
              safety hamari priority hai 🛡️
            </p>
          </div>

          {/* PARKING */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-lg transition hover:scale-105">
            <h3 className="mb-2 text-lg font-semibold text-yellow-400">
              🏍️ Parking Area
            </h3>
            <p
              className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} `}
            >
              Spacious aur secure parking facility — Only for bike ke
              liye available
            </p>
          </div>
        </div>
      </div>

      {/* OUR PG SECTION (NOW CORRECT PLACE) */}
      <div
        className={`px-6 py-16 transition-colors duration-300 ${
          darkMode ? "bg-[#0f0c1c]" : "bg-gray-100"
        } `}
      >
        <h2
          className={`mb-10 text-center text-2xl font-bold sm:text-3xl ${
            darkMode ? "text-white" : "text-gray-900"
          } `}
        >
          Our PG's
        </h2>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-center text-xl font-semibold">
              Loading PGs...
            </div>
          ) : pgs.length > 0 ? (
            pgs.map((pg) => <PgCard key={pg._id} pg={pg} />)
          ) : (
            <div className="col-span-full text-center text-xl font-semibold text-red-500">
              No PG Found
            </div>
          )}
        </div>
      </div>

      {/* REVIEW SECTION */}
      <div
        className={`px-4 py-16 ${darkMode ? "bg-[#141124]" : "bg-white"} `}
      >
        <div className="mx-auto max-w-7xl">
          <h2
            className={`mb-14 text-center text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} `}
          >
            Reviews 💬
          </h2>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
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
