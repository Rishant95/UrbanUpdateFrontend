import { useFetch } from "../../../Hooks/useFetch";
import LoadingPrompt from "../../loadingComp";
import "../Css/eDialogues.css";
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

export default function Edialogues() {
  // Fetch data from the new endpoint
  const { loading, error, data } = useFetch("E Dialogues", 1, 3);

  if (loading) {
    return <LoadingPrompt />;
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
      <h1
        className="upcoming-events-heading Section-Headings"
        style={{ padding: "0% 17%" }}
      >
        E-DIALOGUES
      </h1>
      <div className="edialogues-container">
        {/* Left side: Text content */}
        <div className="edialogues-left">
          {data.data.map((item) => (
            <Link
              to={`/detail/E Dialogues/${item.id}`}
              key={item.id}
              className="event-dialogue-link"
            >
              <div>
                <h3 className="event-dialogue-item Section-Titles">
                  {item.Title}
                </h3>
                {item.Description.map((desc, index) => (
                  <p
                    key={index}
                    className="event-dialogue-item-para Section-Text"
                  >
                    {truncateText(desc.children[0].text, 100)}{" "}
                    {/* Limit to 100 characters */}
                  </p>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Right side: Image */}
        <div className="edialogues-right">
          <img
            src="https://admin.manofox.online/uploads/thumbnail_cb21d5acbe6826763ab6b97a09f17102_31b0e55257.jpeg"
            alt="Right side illustration"
            className="event-dialogue-image"
          />
        </div>
      </div>
    </div>
  );
}
