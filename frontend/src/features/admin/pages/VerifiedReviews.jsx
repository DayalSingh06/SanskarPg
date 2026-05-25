import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import ReviewTable from "../components/ReviewTable";

const VerifiedReviews = () => {
  const [reviews, setReviews] = useState([]);

  // FETCH VERIFIED REVIEWS
  const fetchReviews = async () => {
    try {
      const res = await axios.get("/api/review/verified");

      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // MOVE TO NOT VERIFIED
  const unverifyReview = async (id) => {
    try {
      await axios.put(`/api/review/unverify/${id}`);

      // REFRESH LIST
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            No Verified Reviews
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
            No verified reviews are available right now. Once reviews are
            verified, they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {reviews.map((review) => (
            <ReviewTable
              key={review._id}
              review={review}
              showUnverify={true}
              onUnverify={unverifyReview}
              showActions={true}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default VerifiedReviews;
