import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../Css Files/EditorialUrban.css";
import useFetch from "../../../Hooks/useFetch";

function EditorialUrban() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/editorials"
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

  const Editorial = data.data[0]; // Access the first item in the array

  return (
    <div className="Editorial-Heading">
      <div className="Editorial-Container">
        <div className="Editorial-item">
          <h1>Editorials</h1>
          <hr className="Styled-hr" />
          <div className="Editorial-image-container">
            {Editorial.attributes.ImageUrl && (
              <img
                src={Editorial.attributes.ImageUrl}
                alt={Editorial.attributes.Title}
                className="Editorial-image"
              />
            )}
            <div className="Editorial-overlay">
              <p className="Editorial-date">
                {new Date(Editorial.attributes.updatedAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
              <h2 className="Urban-title-left">{Editorial.attributes.Title}</h2>
              {Editorial.attributes.Description.map((desc, index) => (
                <p className="Urban-text-left" key={index}>
                  {desc.children[0].text}
                </p>
              ))}
            </div>
          </div>
          {Editorial.attributes.Description.map((desc, index) => (
            <p className="Urban-text-left" key={index}>
              {desc.children[0].text}
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

function Urban() {
  // Helper function to truncate text
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/articles"
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
                {new Date(article.attributes.updatedAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "long", // Full month name
                    year: "numeric", // Year
                  }
                )}
              </p>
              <h2 className="Urban-title">{article.attributes.Title}</h2>
              {/* Conditionally render description */}
              {article.attributes.Description.map((desc, index) => (
                <p className="Urban-text" key={index}>
                  {truncateText(desc.children[0].text, 200)}{" "}
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
