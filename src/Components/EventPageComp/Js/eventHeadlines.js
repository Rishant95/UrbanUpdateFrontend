import "../Css/eventHeadlines.css";
import React from "react";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch"; // Assuming you have a custom useFetch hook
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation

export default function EventsHeadline() {
  // Fetch data using the useFetch hook
  const { loading, error, data } = useFetch("Event Headlines");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const eventData = data.data;
  const latestEvents = eventData[0];
  const otherReviews = eventData.slice(1);

  return (
    <div className="book-reviews-container">
      {/* First review layout */}
      <div className="first-review">
        <div className="first-review-content">
          <p className="first-review-date">
            {new Date(latestEvents.updatedAt).toLocaleDateString("en-US", {
              month: "long", // Full month name
              year: "numeric", // Year
            })}
          </p>
          <h2>{latestEvents.Title}</h2>
          <p>{latestEvents.Description[0].children[0].text}</p>
          <Link
            to={`/detail/Event Headlines/${latestEvents.id}`}
            className="first-review-button"
          >
            <h5 style={{ color: "black" }}>Read Now</h5>
            <FaArrowRight className="first-review-icon" />
          </Link>
        </div>

        <div className="first-review-image">
          <Link to={`/detail/Event Headlines/${latestEvents.id}`}>
            <img src={getImageUrl(latestEvents)} alt={latestEvents.Title} />
          </Link>
        </div>
      </div>

      {/* Other reviews layout */}
      <div className="other-reviews">
        {otherReviews.map((events) => (
          <Link
            key={events.id}
            to={`/detail/Event Headlines/${events.id}`}
            className="other-review-item"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={getImageUrl(events)}
              alt={events.Title}
              className="other-review-image"
            />
            <div className="other-review-title">
              <p className="Cover-Story-date" style={{ margin: "0px" }}>
                {new Date(events.updatedAt).toLocaleDateString("en-US", {
                  month: "long", // Full month name
                  year: "numeric", // Year
                })}
              </p>
              <h3>{events.Title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
