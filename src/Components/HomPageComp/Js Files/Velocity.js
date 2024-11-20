import { Link } from "react-router-dom";
import "../Css Files/Velocity.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch";

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

  return (
    <div>
      <div className="Velocity-Heading">
        <h1>Velocity</h1>
        <hr className="Styled-hr" />

        <div className="Velocity-Container">
          {data.data.slice(0, 4).map((velocity) => {
            // Handle the image URL
            const imageUrl = getImageUrl(velocity);

            // Log the image URL for debugging
            console.log("Image URL:", imageUrl); // Check if the URL is valid

            return (
              <Link
                key={velocity.id}
                to={`/detail/Velocity/${velocity.id}`}
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
                      <p className="Velocity-date">{velocity.CityName}</p>
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
