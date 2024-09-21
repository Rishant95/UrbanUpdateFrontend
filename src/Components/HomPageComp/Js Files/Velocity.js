import { Link } from "react-router-dom";
import "../Css Files/Velocity.css";
import useFetch from "../../../Hooks/useFetch";

export default function VelocityPage() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/velocities"
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

  return (
    <div>
      <div className="Velocity-Heading">
        <h1>Velocity</h1>
        <hr className="Styled-hr" />

        <div className="Velocity-Container">
          {data.data.slice(0, 4).map((velocity) => (
            <Link
              key={velocity.id}
              to={`/detail/velocities/${velocity.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="Velocity-item">
                <div className="Velocity-image-container">
                  {velocity.attributes.ImageUrl && (
                    <img
                      src={velocity.attributes.ImageUrl}
                      alt={velocity.attributes.Title}
                      className="Velocity-image"
                    />
                  )}
                  <div className="Velocity-text-overlay">
                    <p className="Velocity-date">
                      {new Date(
                        velocity.attributes.updatedAt
                      ).toLocaleDateString("en-US", {
                        month: "long", // Full month name
                        year: "numeric", // Year
                      })}
                    </p>
                    <h2 className="Velocity-text">
                      {velocity.attributes.Title}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
