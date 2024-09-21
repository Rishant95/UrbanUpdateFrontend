import "../Css/upcomingevent.css";

import React from "react";
import useFetch from "../../../Hooks/useFetch"; // Adjust path as needed
import { FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";

export default function UpcomingEvents() {
  // Fetch data using the useFetch hook
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/upcoming-events"
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length < 3) {
    return <p>Insufficient data available</p>;
  }

  // Extract data
  const [bigImage, smallImage1, smallImage2] = data.data;

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
        <FaArrowAltCircleRight
          style={{ fontSize: "30px", color: "#d90000" }}
        ></FaArrowAltCircleRight>
      </div>
      <div className="upcoming-events-container">
        {/* Large image on the left */}
        <div className="big-image">
          <img
            src={bigImage.attributes.thumbnailUrl}
            alt={bigImage.attributes.Title}
          />
        </div>

        {/* Small images on the right */}
        <div className="small-images">
          <div className="small-image">
            <img
              src={smallImage1.attributes.thumbnailUrl}
              alt={smallImage1.attributes.Title}
            />
          </div>
          <div className="small-image">
            <img
              src={smallImage2.attributes.thumbnailUrl}
              alt={smallImage2.attributes.Title}
            />
          </div>
        </div>
      </div>
      <div className="More-Container">
        <a href="/">More From Upcoming events</a>
        <FaArrowRight />
      </div>
      <hr style={{ marginLeft: "5%", width: "90%" }} />
    </div>
  );
}
