import "../Css Files/CityAndArticles.css";
import useFetch from "../../../Hooks/useFetch";

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

  const API_BASE_URL = "http://93.127.185.210:1337";
  const city = data.data[0]; // Access the first item in the array

  // Check if city.attributes exists to avoid accessing undefined properties
  const imageUrl = city?.ThumbnailUrl
    ? `${API_BASE_URL}${city.ThumbnailUrl}`
    : city?.Image?.[0]?.formats?.large?.url
    ? `${API_BASE_URL}${city.Image[0].formats.large.url}`
    : city?.Image?.[0]?.url
    ? `${API_BASE_URL}${city.Image[0].url}`
    : "https://yourapi.com/path-to-placeholder-image.jpg"; // Fallback image URL

  return (
    <div className="City-Heading">
      <div className="City-Container">
        <div className="City-item">
          <div className="Cityimage-container">
            <h1>City Images</h1>
            <hr className="Styled-hr" />
            {imageUrl && ( // Check if imageUrl is valid
              <img
                src={imageUrl} // Ensure proper URL construction
                alt={city?.Title || "City Image"} // Provide a fallback alt text
                className="Cover-Story-image"
              />
            )}
            <div className="City-text-overlay">
              <p className="City-date">
                {new Date(city.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h2>{city?.Title || "Untitled"}</h2> {/* Fallback title */}
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
  const { loading, error, data } = useFetch("Articles"); // Use correct endpoint for articles

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
    return <p>No articles available</p>;
  }

  const API_BASE_URL = "http://93.127.185.210:1337";

  return (
    <div className="Articles-Additional-Articles">
      {data.data.slice(0, 2).map((article, index) => {
        // Handling different potential image URLs for the article
        const articleImageUrl = article?.Image?.[0]?.formats?.large?.url
          ? `${API_BASE_URL}${article.Image[0].formats.large.url}` // Check large format
          : article?.Image?.[0]?.url
          ? `${API_BASE_URL}${article.Image[0].url}` // Fallback to general image URL
          : "https://yourapi.com/path-to-placeholder-image.jpg"; // Fallback image

        return (
          <div key={article.id} className="Article">
            {/* Render image for the first article */}
            {index === 0 && articleImageUrl && (
              <div className="Article-Image">
                <img
                  src={articleImageUrl} // Ensure proper URL construction
                  alt={article.Title || "Article Image"} // Fallback for alt text
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
              {/* Only render article content for non-first articles */}
              {index !== 0 && article.Content && (
                <div className="Article-text">
                  {article.Content.map((contentBlock, contentIndex) => (
                    <p key={contentIndex}>
                      {/* Map through children and render text */}
                      {contentBlock.children &&
                        contentBlock.children.map((child, childIndex) => (
                          <span key={childIndex}>{child.text}</span>
                        ))}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CityAndArticles;
