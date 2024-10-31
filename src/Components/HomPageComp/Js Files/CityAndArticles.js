import { Link } from "react-router-dom";
import "../Css Files/CityAndArticles.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch";

function CityAndArticles() {
  const { loading, error, data } = useFetch("CityImages");

  // Loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Error handling
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Check if data is available
  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const city = data.data[0]; // Access the first item in the array
  const imageUrl = getImageUrl(city);

  return (
    <div className="City-Heading">
      <div className="City-Container">
        <div className="City-item">
          <div className="Cityimage-container">
            <h1>City Images</h1>
            <hr></hr>
            <div className="City-item">
              <div className="City-image-container">
                {imageUrl && (
                  <img src={imageUrl} alt={city.Title} className="City-image" />
                )}
                <div className="Cover-Story-text-overlay">
                  <Link
                    to={`/detail/Cover Story/${city.id}`}
                    className="Cover-Story-link"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <h2>{city.Title}</h2>
                  </Link>

                  {/* Display truncated main description */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Articles-content">
          <h1>Articles</h1>
          <hr className="Styled-hr" />
          <Articles />
        </div>
      </div>
    </div>
  );
}

function Articles() {
  const { loading, error, data } = useFetch("Articles");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No articles available</p>;
  }

  // Function to truncate the text to 50 words
  const truncateText = (text, wordCount) => {
    const words = text.split(" ");
    return words.length > wordCount
      ? words.slice(0, wordCount).join(" ") + "..."
      : text;
  };

  return (
    <div className="Articles-Additional-Articles">
      {data.data.map((article, index) => {
        const articleImageUrl = getImageUrl(article);
        return (
          <Link
            key={article.id}
            to={`/detail/Articles/${article.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="Article">
              {index === 0 && articleImageUrl && (
                <div className="Article-Image">
                  <img
                    src={articleImageUrl}
                    alt={article.Title || "Article Image"}
                    className="Article-Image-Img"
                  />
                </div>
              )}
              <div className="Article-Content">
                <p className="Article-date">
                  {new Date(article.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="Article-title">
                  {article.Title || "Untitled Article"}
                </h2>

                {/* Display truncated description only for the last article */}
                {index === data.data.length - 1 && article.Description && (
                  <div className="Article-text">
                    {article.Description.map((contentBlock, contentIndex) => (
                      <p key={contentIndex}>
                        {contentBlock.children &&
                          contentBlock.children.map((child, childIndex) => {
                            const fullText = child.text; // Get full text
                            const truncatedText = truncateText(fullText, 50); // Truncate to 50 words
                            return (
                              <span key={childIndex}>{truncatedText}</span>
                            );
                          })}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default CityAndArticles;
