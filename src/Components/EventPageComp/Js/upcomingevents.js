import React from "react";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch"; // Adjust path as needed
import { FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";
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
  const event = data.data.slice(1); // Get the first event
  const bigImage = getImageUrl(data.data[0]); // Get the first image for the big display

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
        <h1 className="upcoming-events-heading">UPCOMING EVENTS</h1>
        <FaArrowAltCircleRight style={{ fontSize: "30px", color: "#d90000" }} />
      </div>

      <div className="upcoming-events-container">
        {/* Large image on the left */}
        <div className="big-image">
          {bigImage && <img src={bigImage} alt={event.Title} />}
        </div>

        {/* Small images on the right */}
        <div className="small-images">
          {event.length > 0 ? (
            event.map((image, index) => (
              <div className="small-image" key={index}>
                <img src={getImageUrl(image)} alt={event.Title} />
              </div>
            ))
          ) : (
            <p>No additional images available.</p>
          )}
        </div>
      </div>

      <div className="More-Container">
        <a href="/">More From Upcoming Events</a>
        <FaArrowRight />
      </div>
      <hr style={{ marginLeft: "5%", width: "90%" }} />
    </div>
  );
}
