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
      className={`h-125 w-full overflow-hidden rounded-2xl border shadow-xl transition-all duration-300 sm:h-135 sm:rounded-3xl ${
        darkMode
          ? "border-[#2d2a45] bg-[#1b1830]"
          : "border-gray-200 bg-white"
      } `}
    >
      {/* Header */}
      <div
        className={`sticky top-0 z-10 border-b px-4 py-4 backdrop-blur-md sm:px-6 ${
          darkMode
            ? "border-[#2d2a45] bg-[#211d38]/95"
            : "border-gray-200 bg-gray-50/95"
        } `}
      >
        <h2
          className={`text-xl font-bold sm:text-2xl ${darkMode ? "text-white" : "text-gray-900"} `}
        >
          Reviews ⭐
        </h2>
      </div>

      {/* Reviews */}
      <div className="hide-scrollbar h-105 space-y-4 overflow-y-auto px-3 py-4 sm:h-115 sm:space-y-5 sm:px-5 sm:py-5">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p
              className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-500"} `}
            >
              Loading Reviews...
            </p>
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((item) => (
            <div
              key={item._id}
              className={`rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.01] sm:p-5 ${
                darkMode
                  ? "border-[#35314f] bg-[#26223d] hover:bg-[#2d2947]"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100"
              } `}
            >
              {/* User Info */}
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
                  {item.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3
                    className={`text-base font-semibold sm:text-lg ${darkMode ? "text-white" : "text-gray-900"} `}
                  >
                    {item.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
                  {[...Array(item.rating)].map((_, index) => (
                    <span
                      key={index}
                      className="text-lg text-yellow-400"
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              {/* Review */}
              <p
                className={`text-sm leading-relaxed wrap-break-word sm:text-[15px] ${darkMode ? "text-gray-300" : "text-gray-700"} `}
              >
                {item.review}
              </p>
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <p
              className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-500"} `}
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
