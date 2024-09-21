import "../Css Files/BookReview.css";
import useFetch from "../../../Hooks/useFetch";

export default function BookReview() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/bookreviews"
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
      <div className="BookReview-Heading">
        <h1>Book Review</h1>
        <hr className="Styled-hr" />

        <div className="BookReview-Container">
          {data.data.slice(0, 2).map((velocity) => (
            <div
              key={velocity.id}
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {/* Title overlay on top of the image */}
              <div>
                <div className="BookReview-image-container">
                  {velocity.attributes.ImageUrl && (
                    <img
                      src={velocity.attributes.ImageUrl}
                      alt={velocity.attributes.Title}
                      className="BookReview-image"
                    />
                  )}
                  <div className="BookReview-text-overlay">
                    <p className="BookReview-date">
                      {new Date(
                        velocity.attributes.updatedAt
                      ).toLocaleDateString("en-US", {
                        month: "long", // Full month name
                        year: "numeric", // Year
                      })}
                    </p>
                    <h2 className="BookReview-text">
                      {velocity.attributes.Title}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
