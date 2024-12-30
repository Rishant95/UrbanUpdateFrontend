import { Link } from "react-router-dom";
import "../Css Files/EditorialUrban.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch";

function EditorialUrban() {
  const { loading, error, data } = useFetch("Editorial");

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const editorial = data.data[0]; // Access the first item in the array
  const editorialImageUrl = getImageUrl(editorial);

  return (
    <div className="Editorial-Heading Section-Headings">
      <div className="Editorial-Container">
        <div className="Editorial-item">
          <h1>Editorials</h1>
          <hr className="Section-Styled-hr" />
          <Link
            to={`/detail/Editorial/${editorial.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="Editorial-image-container">
              {editorialImageUrl && (
                <img
                  src={editorialImageUrl}
                  alt={editorial?.Title || "Editorial Image"}
                  className="Editorial-image"
                />
              )}
              <div className="Editorial-overlay">
                <p className="Editorial-date">
                  {new Date(editorial?.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="Urban-title-left Section-Titles">
                  {editorial?.Title || "Untitled Editorial"}
                </h2>
                {/* Show description for the editorial */}
                {editorial?.Description?.[0]?.children?.[0]?.text && (
                  <p className="Urban-text-left Section-Text">
                    {truncateText(
                      editorial.Description[0].children[0].text,
                      800
                    )}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </div>
        <div className="Urban-content">
          <h1>Urban Agenda</h1>
          <hr className="Section-Styled-hr" />
          <Urban />
        </div>
      </div>
    </div>
  );
}

const truncateText = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

function Urban() {
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
          to={`/detail/Urban Agenda/${article.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="Article">
            <div className="Urban-Content">
              <p className="Urban-date Section-Dates">
                {new Date(article?.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h2 className="Section-Titles">
                {article?.Title || "Untitled Article"}
              </h2>
              {article?.Description?.[0]?.children?.[0]?.text && (
                <p className="Urban-text">
                  {truncateText(article.Description[0].children[0].text, 800)}{" "}
                  {/* Show description for each article */}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EditorialUrban;
