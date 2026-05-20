import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useTheme } from "../../context/ThemeContext";

const ReviewList = () => {
  const { darkMode } = useTheme();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("/api/review/verified");

        setReviews(res.data.reviews);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div
      className={`
        overflow-hidden
        w-full h-125
        rounded-2xl border
        shadow-xl transition-all
        duration-300
        sm:h-135 sm:rounded-3xl
        ${
          darkMode
            ? "bg-[#1b1830] border-[#2d2a45]"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* Header */}
      <div
        className={`
          z-10
          px-4 py-4
          border-b
          sticky top-0 backdrop-blur-md
          sm:px-6
          ${
            darkMode
              ? "bg-[#211d38]/95 border-[#2d2a45]"
              : "bg-gray-50/95 border-gray-200"
          }
        `}
      >
        <h2
          className={`
            text-xl font-bold
            sm:text-2xl
            ${darkMode ? "text-white" : "text-gray-900"}
          `}
        >
          Reviews ⭐
        </h2>
      </div>

      {/* Reviews */}
      <div
        className="
          overflow-y-auto
          h-105
          px-3 py-4 space-y-4
          hide-scrollbar
          sm:h-115 sm:px-5 sm:py-5 sm:space-y-5
        "
      >
        {loading ? (
          <div
            className="
              flex
              h-full
              items-center justify-center
            "
          >
            <p
              className={`
                text-lg
                ${darkMode ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Loading Reviews...
            </p>
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((item) => (
            <div
              key={item._id}
              className={`
                p-4
                rounded-2xl border
                transition-all
                duration-300 hover:scale-[1.01]
                sm:p-5
                ${
                  darkMode
                    ? "bg-[#26223d] border-[#35314f] hover:bg-[#2d2947]"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }
              `}
            >
              {/* User Info */}
              <div
                className="
                  flex flex-wrap
                  mb-3
                  items-center gap-3
                "
              >
                <div
                  className="
                    flex
                    w-11 h-11
                    text-white font-bold text-base
                    bg-linear-to-r from-blue-500 to-purple-500
                    rounded-full
                    items-center justify-center shrink-0
                    sm:w-12 sm:h-12 sm:text-lg
                  "
                >
                  {item.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3
                    className={`
                      font-semibold text-base
                      sm:text-lg
                      ${darkMode ? "text-white" : "text-gray-900"}
                    `}
                  >
                    {item.name}
                  </h3>
                </div>

                {/* Rating */}
                <div
                  className="
                    flex flex-wrap
                    items-center gap-0.5
                    sm:gap-1
                  "
                >
                  {[...Array(item.rating)].map((_, index) => (
                    <span
                      key={index}
                      className="
                        text-yellow-400 text-lg
                      "
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              {/* Review */}
              <p
                className={`
                  leading-relaxed text-sm
                  wrap-break-word
                  sm:text-[15px]
                  ${darkMode ? "text-gray-300" : "text-gray-700"}
                `}
              >
                {item.review}
              </p>
            </div>
          ))
        ) : (
          <div
            className="
              flex
              h-full
              items-center justify-center
            "
          >
            <p
              className={`
                text-lg
                ${darkMode ? "text-gray-400" : "text-gray-500"}
              `}
            >
              No Reviews Yet 😄
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
