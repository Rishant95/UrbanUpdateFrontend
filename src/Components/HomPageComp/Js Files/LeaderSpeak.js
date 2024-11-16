import { Link } from "react-router-dom";
import "../Css Files/LeaderSpeak.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch"; // Assuming you have a custom hook for fetching data
import { useEffect, useState } from "react";

export default function LeaderSpeak() {
  const { loading, error, data } = useFetch("LeaderSpeak");
  const { data: recentNewsData } = useFetch("Recent News"); // Fetch recent news data
  const [truncatedMainDescription, setTruncatedMainDescription] = useState("");
  const [truncatedAdditionalStories, setTruncatedAdditionalStories] = useState(
    []
  );
  const [activeTab, setActiveTab] = useState("recent"); // State to manage active tab

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

      // Determine truncation based on screen size for main leader speak description
      const maxWordsMain = window.innerWidth < 768 ? 50 : 200; // 50 words for mobile, 1000 for desktop
      const truncatedMain = truncateDescription(mainDescription, maxWordsMain);
      setTruncatedMainDescription(truncatedMain);

      // Truncate additional stories descriptions
      const additionalTruncated = data.data.slice(1, 4).map((story) => {
        const additionalDescription =
          story.Description?.map((desc) => desc.children[0]?.text || "").join(
            " "
          ) || "";

        const maxWordsAdditional = window.innerWidth < 768 ? 10 : 100; // Adjust as needed for mobile/desktop
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
    <div className="main-container">
      <div className="LeaderSpeak-Heading">
        <h1>LeaderSpeak</h1>
        <hr className="Styled-hr" />

        <div className="LeaderSpeak-Container">
          <div className="LeaderSpeak-content">
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
                    <h2 style={{ fontSize: "30px" }}>{leaderSpeak.Title}</h2>
                    <p>{truncatedMainDescription}</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="LeaderSpeak-additional-content">
              {truncatedAdditionalStories.slice(0, 3).map((story) => (
                <Link
                  key={story.id}
                  to={`/detail/LeaderSpeak/${story.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
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
      </div>
      {/* Tab System */}
      <div className="Tab-Section">
        <div className="Tab-Container">
          <button
            className={`Tab ${activeTab === "recent" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("recent");
            }}
          >
            Recent News
          </button>
          <button
            className={`Tab ${activeTab === "trending" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("trending");
            }}
          >
            Trending
          </button>
          {/* Underline that will move under active tab */}
          <div
            className="Tab-Underline"
            style={{
              backgroundColor: activeTab === "recent" ? "#ec2121" : "black",
            }}
          ></div>
        </div>

        {/* Tab Content */}
        <div className="Tab-Content">
          {activeTab === "recent" ? (
            recentNewsData && recentNewsData.data ? (
              <ul>
                {recentNewsData.data.map((news) => (
                  <li key={news.id} className="li-item">
                    <Link
                      to={`/detail/RecentNews/${news.id}`}
                      className="Tab-titles"
                    >
                      <h2 className="tab-content-title">{news.Title}</h2>
                    </Link>
                    {new Date(news.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent news available</p>
            )
          ) : (
            <p>Trending content goes here...</p>
          )}
        </div>
      </div>
    </div>
  );
}
