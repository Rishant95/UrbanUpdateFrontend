import { Link } from "react-router-dom";
import "../Css Files/BookReview.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch";

export default function BookReview() {
  const { loading, error, data } = useFetch("Book Review");

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p className="no-data-message">No data available</p>;
  }

  return (
    <div className="book-review-section">
      <div className="BookReview-Heading Section-Headings">
        <h1>Book Review</h1>
        <hr className="Section-Styled-hr" />
      </div>

      <div className="BookReview-Container">
        {data.data.slice(0, 2).map((book) => {
          const editorialImageUrl = getImageUrl(book);

          return (
            <Link
              key={book.id}
              to={`/detail/Book Review/${book.id}`}
              className="BookReview-item"
            >
              <div className="BookReview-horizontal-card">
                <img
                  src={editorialImageUrl}
                  alt={book.Title}
                  className="BookReview-image"
                />
                <div className="BookReview-text">
                  <h2 className="Section-Titles">{book.Title}</h2>
                  <p className="Section-Dates">
                    {new Date(book.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  {book?.Content?.length > 0 && (
                    <p className="BookReview-description">
                      {truncateText(book.Content[0]?.children[0]?.text, 100)}
                    </p>
                  )}
                  <Link
                    to={`/detail/Book Review/${book.id}`}
                    className="ReadMore-btn"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Helper function to truncate text
const truncateText = (text, limit) => {
  if (text && text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text || "";
};
