import { Link } from "react-router-dom";
import "../Css Files/Velocity.css";
import useFetch from "../../../Hooks/useFetch";

export default function VelocityPage() {
  const { loading, error, data } = useFetch("Velocity");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  // Base URL for images
  const API_BASE_URL = "http://93.127.185.210:1337";

  return (
    <div>
      <div className="Velocity-Heading">
        <h1>Velocity</h1>
        <hr className="Styled-hr" />

        <div className="Velocity-Container">
          {data.data.slice(0, 4).map((velocity) => {
            // Handle the image URL
            const imageUrl = velocity?.ImageUrl
              ? `${API_BASE_URL}${velocity.ImageUrl}`
              : velocity.Image?.[0]?.formats?.large?.url
              ? `${API_BASE_URL}${velocity.Image[0].formats.large.url}`
              : velocity.Image?.[0]?.url
              ? `${API_BASE_URL}${velocity.Image[0].url}`
              : "https://yourapi.com/path-to-placeholder-image.jpg"; // Fallback image URL

            // Log the image URL for debugging
            console.log("Image URL:", imageUrl); // Check if the URL is valid

            return (
              <Link
                key={velocity.id}
                to={`/detail/velocities/${velocity.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="Velocity-item">
                  <div className="Velocity-image-container">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={velocity.Title}
                        className="Velocity-image"
                        onError={(e) => {
                          // Fallback for broken images
                          e.target.src =
                            "https://yourapi.com/path-to-placeholder-image.jpg";
                        }}
                      />
                    )}
                    <div className="Velocity-text-overlay">
                      <p className="Velocity-date">
                        {new Date(velocity.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long", // Full month name
                            year: "numeric", // Year
                          }
                        )}
                      </p>
                      <h2 className="Velocity-text">{velocity.Title}</h2>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
