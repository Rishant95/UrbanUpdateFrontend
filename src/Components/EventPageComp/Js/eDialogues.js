import { useFetch } from "../../../Hooks/useFetch";
import "../Css/eDialogues.css";

import React from "react";

export default function Edialogues() {
  // Fetch data from the new endpoint
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/e-dialogues"
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

  // Helper function to truncate text
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <div>
      <h1 className="upcoming-events-heading" style={{ paddingLeft: "5%" }}>
        E-DIALOGUES
      </h1>
      <div className="edialogues-container">
        {/* Left side: Text content */}
        <div className="edialogues-left">
          {data.data.map((item) => (
            <div key={item.id}>
              <h3 className="event-dialogue-item">{item.attributes.Title}</h3>
              {item.attributes.Description.map((desc, index) => (
                <p key={index} className="event-dialogue-item-para">
                  {truncateText(desc.children[0].text, 100)}{" "}
                  {/* Limit to 100 characters */}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Right side: Image */}
        <div className="edialogues-right">
          <img
            src="http://localhost:1337/uploads/Image_1bbc0ce759.png"
            alt="Right side illustration"
            className="event-dialogue-image"
          />
        </div>
      </div>
    </div>
  );
}
