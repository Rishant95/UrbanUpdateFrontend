import { Link } from "react-router-dom";
import "../Css Files/LeaderSpeak.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch"; // Assuming you have a custom hook for fetching data
import { useEffect, useState } from "react";

export default function LeaderSpeak() {
  const { loading, error, data } = useFetch("LeaderSpeak");
  const [truncatedMainDescription, setTruncatedMainDescription] = useState("");
  const [truncatedAdditionalStories, setTruncatedAdditionalStories] = useState(
    []
  );

  useEffect(() => {
    if (data && data.data) {
      // Fetching the first LeaderSpeak data
      const leaderSpeak = data.data[0];

      // Function to truncate text based on screen size
      const truncateDescription = (description, maxWords) => {
        const words = description.split(" ");
        return words.length > maxWords
          ? words.slice(0, maxWords).join(" ") + "..."
          : description;
      };

      // Extract main leader speak description safely
      const mainDescription =
        leaderSpeak.Description?.map(
          (desc) => desc.children[0]?.text || ""
        ).join(" ") || "";
      console.log("Main description is: ", mainDescription);

      // Determine truncation based on screen size for main leader speak description
      const maxWordsMain = window.innerWidth < 768 ? 50 : 30; // 50 words for mobile, 30 for desktop
      const truncatedMain = truncateDescription(mainDescription, maxWordsMain);
      setTruncatedMainDescription(truncatedMain);

      // Truncate additional stories descriptions
      const additionalTruncated = data.data.slice(1, 4).map((story) => {
        const additionalDescription =
          story.Description?.map((desc) => desc.children[0]?.text || "").join(
            " "
          ) || "";

        const maxWordsAdditional = window.innerWidth < 768 ? 100 : 300; // Adjust as needed for mobile/desktop
        return {
          ...story,
          truncatedDescription: truncateDescription(
            additionalDescription,
            maxWordsAdditional
          ),
        };
      });

      setTruncatedAdditionalStories(additionalTruncated);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  // Image URL logic
  const leaderSpeak = data.data[0];
  const imageUrl = getImageUrl(leaderSpeak);

  return (
    <div className="LeaderSpeak-Heading">
      <h1>LeaderSpeak</h1>
      <hr className="Styled-hr" />

      <div className="LeaderSpeak-Container">
        <div className="LeaderSpeak-item">
          <Link
            to={`/detail/LeaderSpeak/${leaderSpeak.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="LeaderSpeak-image-container"
              style={{ cursor: "pointer" }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={leaderSpeak.Title}
                  className="LeaderSpeak-image"
                />
              )}
              <div className="LeaderSpeak-text-overlay">
                <h2>{leaderSpeak.Title}</h2>
                <p>{truncatedMainDescription}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="LeaderSpeak-additional-content">
          {truncatedAdditionalStories.map((story) => (
            <Link
              key={story.id}
              to={`/detail/LeaderSpeak/${story.id}`}
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
