import { Link } from "react-router-dom";
import "../Css Files/CityAndArticles.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch";
import LoadingPrompt from "../../loadingComp";

function CityAndArticles() {
  const currentCategory = "CityImages";
  const { loading, error, data } = useFetch(currentCategory, 1, 1);

  if (loading) {
    return <LoadingPrompt />;
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
    <div className="City-Heading Section-Headings">
      <div className="City-Container">
        <div className="City-item">
          <div className="Cityimage-container">
            <Link
              to={`/category/${currentCategory}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h1>City Images</h1>
            </Link>
            <hr className="Section-Styled-hr" />
            <div className="City-item">
              <div className="City-image-container">
                {imageUrl && (
                  <img src={imageUrl} alt={city.Title} className="City-image" />
                )}
                <div className="City-text-overlay">
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
          <Link
            to={`/category/Articles`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h1>Articles</h1>
          </Link>
          <hr className="Section-Styled-hr" />
          <Articles />
        </div>
      </div>
    </div>
  );
}

function Articles() {
  const { loading, error, data } = useFetch("Articles", 1, 2);

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
                <p className="Article-date Section-Dates">
                  {new Date(article.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2
                  className="Article-title Section-Titles"
                  style={{ fontSize: "22px" }}
                >
                  {article.Title || "Untitled Article"}
                </h2>
                <h3 className="Side-cover-story-author">
                  {" "}
                  By {article.author?.Name}
                </h3>
                {/* Display truncated description only for the last article */}
                {index === data.data.length - 1 && article.Description && (
                  <div className="Article-text Section-Text">
                    {article.Description.map((contentBlock, contentIndex) => (
                      <p key={contentIndex}>
                        {contentBlock.children &&
                          contentBlock.children.map((child, childIndex) => {
                            const fullText = child.text; // Get full text
                            const truncatedText = truncateText(fullText, 50); // Truncate to 50 words
                            return (
                              <span
                                key={childIndex}
                                style={{
                                  fontWeight: "300",
                                }}
                              >
                                {truncatedText}
                              </span>
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
