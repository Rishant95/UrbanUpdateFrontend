import "../Css Files/BookReview.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch";

export default function BookReview() {
  const { loading, error, data } = useFetch("Book Review");

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
          {/* Display both articles using the same image for the first index */}
          {data.data.map((book) => {
            const editorialImageUrl = getImageUrl(book);

            return (
              <div
                key={book.id}
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <div>
                  <div className="BookReview-image-container">
                    <img
                      src={editorialImageUrl} // Use the image URL defined above
                      alt={book.Title}
                      className="BookReview-image"
                    />
                    <div className="BookReview-text-overlay">
                      <p className="BookReview-date">
                        {new Date(book.updatedAt).toLocaleDateString("en-US", {
                          month: "long", // Full month name
                          year: "numeric", // Year
                        })}
                      </p>
                      <h2 className="BookReview-text">{book.Title}</h2>

                      {/* Render limited description */}
                      {book?.Content?.length > 0 && (
                        <p className="BookReview-description">
                          {truncateText(
                            book.Content[0]?.children[0]?.text,
                            150
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Helper function to truncate text
const truncateText = (text, limit) => {
  if (text && text.length > limit) {
    return text.substring(0, limit) + "..."; // Add ellipsis if truncated
  }
  return text || ""; // Return empty string if text is null or undefined
};
