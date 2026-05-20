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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
  );
};

export default NotVerifiedReviews;
