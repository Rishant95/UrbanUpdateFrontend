import { Link } from "react-router-dom";
import "../Css Files/LeaderSpeak.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch"; // Assuming you have a custom hook for fetching data

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

  const leaderSpeakData = data.data[0];

  // API base URL

  // Handle image URL similar to the CoverStory component
  const imageUrl = getImageUrl(leaderSpeakData);

  // Function to truncate text
  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.substring(0, limit) + "..."; // Add ellipsis if truncated
    }
    return text || ""; // Return empty string if text is null or undefined
  };

  // Ensure `Content` exists and is an array before calling `.map()`
  const description = leaderSpeakData.Content ? (
    leaderSpeakData.Content.slice(0, 1).map((paragraph, index) => {
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
            to={`/detail/news-articles/${leaderSpeakData.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="LeaderSpeak-image-container"
              style={{ cursor: "pointer" }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={leaderSpeakData.Title}
                  className="LeaderSpeak-image"
                />
              )}
              <div className="LeaderSpeak-text-overlay">
                <h2>{leaderSpeakData.Title}</h2>
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
