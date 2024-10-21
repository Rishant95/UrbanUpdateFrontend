import { Link } from "react-router-dom";
import "../Css Files/LeaderSpeak.css";
import useFetch from "../../../Hooks/useFetch"; // Assuming you have a custom hook for fetching data

export default function LeaderSpeak() {
  const { loading, error, data } = useFetch("LeaderSpeak");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const coverStory = data.data[0];

  // API base URL
  const API_BASE_URL = "http://93.127.185.210:1337";

  // Handle image URL similar to the CoverStory component
  const imageUrl = coverStory.ThumbailUrl
    ? `${API_BASE_URL}${coverStory.ThumbailUrl}`
    : coverStory.Image?.[0]?.formats?.large?.url
    ? `${API_BASE_URL}${coverStory.Image[0].formats.large.url}`
    : coverStory.Image?.[0]?.url
    ? `${API_BASE_URL}${coverStory.Image[0].url}`
    : "https://yourapi.com/path-to-placeholder-image.jpg"; // Fallback image URL

  // Function to truncate text
  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.substring(0, limit) + "..."; // Add ellipsis if truncated
    }
    return text || ""; // Return empty string if text is null or undefined
  };

  // Ensure `Content` exists and is an array before calling `.map()`
  const description = coverStory.Content ? (
    coverStory.Content.slice(0, 1).map((paragraph, index) => {
      const paragraphText =
        paragraph.children?.[0]?.text || "No description available";
      const truncatedText = truncateText(paragraphText, 200); // Truncate to 500 characters
      return <p key={index}>{truncatedText}</p>;
    })
  ) : (
    <p>No description available</p>
  );

  return (
    <div className="LeaderSpeak-Heading">
      <h1>LeaderSpeak</h1>
      <hr className="Styled-hr" />

      <div className="LeaderSpeak-Container">
        <div className="LeaderSpeak-item">
          <Link
            to={`/detail/news-articles/${coverStory.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="LeaderSpeak-image-container"
              style={{ cursor: "pointer" }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={coverStory.Title}
                  className="LeaderSpeak-image"
                />
              )}
              <div className="LeaderSpeak-text-overlay">
                <h2>{coverStory.Title}</h2>
                {description}
              </div>
            </div>
          </Link>
        </div>

        <div className="LeaderSpeak-additional-content">
          {data.data.slice(1, 4).map((story) => (
            <Link
              key={story.id}
              to={`/detail/leaderspeaks/${story.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="additional-item-container">
                <p className="leaderSpeak-date">
                  {new Date(story.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="Side-leaderSpeak-title">{story.Title}</h2>
                <div className="item-border"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
