import React from "react";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch"; // Adjust path as needed
import { FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../Css/upcomingevent.css"; // Ensure this path is correct

export default function UpcomingEvents() {
  // Fetch data using the useFetch hook
  const { loading, error, data } = useFetch("Upcoming Events");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length < 1) {
    return <p>Insufficient data available</p>; // Check if there's at least one event
  }

  // Extracting data from the response
  const events = data.data; // Get all events
  const bigEvent = events[0]; // Get the first event for the big display
  const bigImage = getImageUrl(bigEvent); // Get the first image for the big display

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "5%",
          gap: "10px",
        }}
      >
        <span className="upcoming-events-heading-container">
          <h1 className="upcoming-events-heading">UPCOMING EVENTS </h1>
          <FaArrowAltCircleRight
            style={{ fontSize: "30px", color: "#d90000" }}
          />
        </span>
      </div>

      <div className="upcoming-events-container">
        {/* Large image on the left */}
        <Link
          to={`/detail/Upcoming Events/${bigEvent.id}`}
          className="big-image"
        >
          {bigImage && <img src={bigImage} alt={bigEvent.Title} />}
        </Link>

        {/* Small images on the right */}
        <div className="small-images">
          {events.slice(1).map(
            (
              event,
              index // Skip the first event for small images
            ) => (
              <Link
                key={event.id}
                to={`/detail/Upcoming Events/${event.id}`}
                className="small-image"
              >
                <img src={getImageUrl(event)} alt={event.Title} />
              </Link>
            )
          )}
        </div>
      </div>

      <div className="More-Container">
        <a href="/">More From Upcoming Events</a>
        <FaArrowRight />
      </div>
      <hr style={{ marginLeft: "17%", width: "65%" }} />
    </div>
  );
}
