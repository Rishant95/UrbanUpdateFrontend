import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../Css Files/EditorialUrban.css";
import useFetch from "../../../Hooks/useFetch";

function EditorialUrban() {
  const { loading, error, data } = useFetch("Editorial");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const Editorial = data.data[0]; // Access the first item in the array

  // Handle image URL
  const API_BASE_URL = "http://93.127.185.210:1337";
  const editorialImageUrl = Editorial?.Image?.[0]?.formats?.large?.url
    ? `${API_BASE_URL}${Editorial.Image[0].formats.large.url}`
    : Editorial?.Image?.[0]?.url
    ? `${API_BASE_URL}${Editorial.Image[0].url}`
    : "https://yourapi.com/path-to-placeholder-image.jpg"; // Fallback image

  return (
    <div className="Editorial-Heading">
      <div className="Editorial-Container">
        <div className="Editorial-item">
          <h1>Editorials</h1>
          <hr className="Styled-hr" />
          <div className="Editorial-image-container">
            {editorialImageUrl && (
              <img
                src={editorialImageUrl}
                alt={Editorial?.attributes?.Title || "Editorial Image"}
                className="Editorial-image"
              />
            )}
            <div className="Editorial-overlay">
              <p className="Editorial-date">
                {new Date(Editorial?.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h2 className="Urban-title-left">
                {Editorial?.Title || "Untitled Editorial"}
              </h2>
              {/* Render description excluding the first one */}
              {Editorial?.Content?.[0] && (
                <p className="Urban-text-left">
                  {truncateText(
                    Editorial.Content[0].children[0].text || "",
                    200
                  )}
                </p>
              )}
            </div>
          </div>
          {Editorial?.Content?.slice(1).map((desc, index) => (
            <p className="Urban-text-left" key={index}>
              {truncateText(desc.children[0].text || "", 200)}
            </p>
          ))}
        </div>
        <div className="Urban-content">
          <h1>Urban Agenda</h1>
          <hr className="Styled-hr" />
          <Urban />
        </div>
      </div>
    </div>
  );
}
const truncateText = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "..."; // Add ellipsis if truncated
  }
  return text;
};

function Urban() {
  // Helper function to truncate text
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const { loading, error, data } = useFetch("Urban Agenda");

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
    <div className="Urban-Additional-Articles">
      {data.data.slice(0, 2).map((article) => (
        <Link
          key={article.id}
          to={`/detail/articles/${article.id}`} // Link to the article detail page
          style={{ textDecoration: "none", color: "inherit" }} // Remove underline and maintain text color
        >
          <div className="Article">
            <div className="Urban-Content">
              <p className="Urban-date">
                {new Date(article?.updatedAt).toLocaleDateString("en-US", {
                  month: "long", // Full month name
                  year: "numeric", // Year
                })}
              </p>
              <h2 className="Urban-title">
                {article?.Title || "Untitled Article"}
              </h2>
              {/* Conditionally render description */}
              {article?.Content?.slice(0, 1).map((desc, index) => (
                <p className="Urban-text" key={index}>
                  {truncateText(desc?.children?.[0]?.text || "", 200)}{" "}
                </p>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EditorialUrban;
