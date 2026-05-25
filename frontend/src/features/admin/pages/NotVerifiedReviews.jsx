import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import ReviewTable from "../components/ReviewTable";

const NotVerifiedReviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("/api/review/not-verified");

      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // VERIFY
  const verifyReview = async (id) => {
    try {
      await axios.put(`/api/review/verify/${id}`);

      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteReview = async (id) => {
    try {
      await axios.delete(`/api/review/delete/${id}`);

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
            No Reviews
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
            reviews are not available right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {reviews.map((review) => (
            <ReviewTable
              key={review._id}
              review={review}
              onVerify={verifyReview}
              onDelete={deleteReview}
              showActions={true}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default NotVerifiedReviews;
