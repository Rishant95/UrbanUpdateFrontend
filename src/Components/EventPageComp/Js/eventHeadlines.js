import "../Css/eventHeadlines.css";

import React from "react";

import useFetch from "../../../Hooks/useFetch"; // Assuming you have a custom useFetch hook
import { FaArrowRight } from "react-icons/fa";

export default function BookReview() {
  // Fetch data using the useFetch hook
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/event-headlines"
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const bookReviews = data.data;
  const firstReview = bookReviews[0];
  const otherReviews = bookReviews.slice(1);

  return (
    <div className="book-reviews-container">
      {/* First review layout */}
      <div className="first-review">
        <div className="first-review-content">
          <p className="first-review-date">
            {new Date(firstReview.attributes.updatedAt).toLocaleDateString(
              "en-US",
              {
                month: "long", // Full month name
                year: "numeric", // Year
              }
            )}
          </p>
          <h2>{firstReview.attributes.Title}</h2>
          <p>{firstReview.attributes.Description[0].children[0].text}</p>
          <button className="first-review-button">
            <h5 style={{ color: "black" }}>Read Now</h5>
            <FaArrowRight className="first-review-icon"></FaArrowRight>
          </button>
        </div>

        <div className="first-review-image">
          <img
            src={firstReview.attributes.thumbnailUrl}
            alt={firstReview.attributes.Title}
          />
        </div>
      </div>

      {/* Other reviews layout */}
      <div className="other-reviews">
        {otherReviews.map((review) => (
          <div key={review.id} className="other-review-item">
            <img
              src={review.attributes.thumbnailUrl}
              alt={review.attributes.Title}
              className="other-review-image"
            />
            <div className="other-review-title">
              <p className="other-review-date">
                {new Date(review.attributes.updatedAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "long", // Full month name
                    year: "numeric", // Year
                  }
                )}
              </p>
              <h3>{review.attributes.Title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
