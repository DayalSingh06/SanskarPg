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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {reviews.map((review) => (
        <ReviewTable
          key={review._id}
          review={review}
          showUnverify={true}
          onUnverify={unverifyReview}
        />
      ))}
    </div>
  );
};

export default VerifiedReviews;
