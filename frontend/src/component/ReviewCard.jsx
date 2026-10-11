import React from "react";
import { FaStar } from "react-icons/fa";

function ReviewCard({ review }) {

  return (

    <div className="border-b border-gray-600 py-5">

      <div className="flex items-center gap-2 mb-1">

        {[...Array(review.rating)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}

      </div>

      <p className="text-gray-300">{review.comment}</p>

      <p className="text-sm text-gray-400 mt-1">
        {review.userName}
      </p>

    </div>

  );

}

export default ReviewCard;