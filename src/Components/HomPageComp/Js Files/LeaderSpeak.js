import { Link } from "react-router-dom";
import "../Css Files/LeaderSpeak.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch";
import { useEffect, useState } from "react";
import LoadingPrompt from "../../loadingComp";

export default function LeaderSpeak() {
  const currentCategory = "LeaderSpeak"; // Define the current category
  const { loading, error, data } = useFetch(currentCategory, 1, 5);
  const { data: recentNewsData } = useFetch("Recent News");
  const [truncatedMainDescription, setTruncatedMainDescription] = useState("");
  const [truncatedAdditionalStories, setTruncatedAdditionalStories] = useState(
    []
  );
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    if (data && data.data) {
      const leaderSpeak = data.data[0];

      const truncateDescription = (description, maxWords) => {
        const words = description.split(" ");
        return words.length > maxWords
          ? words.slice(0, maxWords).join(" ") + "..."
          : description;
      };

      const mainDescription =
        leaderSpeak.Description?.map(
          (desc) => desc.children[0]?.text || ""
        ).join(" ") || "";

      const maxWordsMain = window.innerWidth < 768 ? 50 : 200;
      const truncatedMain = truncateDescription(mainDescription, maxWordsMain);
      setTruncatedMainDescription(truncatedMain);

      const additionalTruncated = data.data.slice(1, 4).map((story) => {
        const additionalDescription =
          story.Description?.map((desc) => desc.children[0]?.text || "").join(
            " "
          ) || "";

        const maxWordsAdditional = window.innerWidth < 768 ? 10 : 100;
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

  const sortByViews = (articles) => {
    return articles.sort((a, b) => b.Views - a.Views);
  };

  const sortByDate = (articles) => {
    return articles.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  const [trendingNews, setTrendingNews] = useState([]);
  const [recentNews, setRecentNews] = useState([]);

  useEffect(() => {
    if (recentNewsData && recentNewsData.data) {
      const sortedNewsByViews = sortByViews(recentNewsData.data);
      setTrendingNews(sortedNewsByViews.slice(0, 4));

      const sortedNewsByDate = sortByDate(recentNewsData.data);
      setRecentNews(sortedNewsByDate);
    }
  }, [recentNewsData]);

  if (loading) {
    return <LoadingPrompt />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const leaderSpeak = data.data[0];
  const imageUrl = getImageUrl(leaderSpeak);

  return (
    <div className="main-container">
      <div className="LeaderSpeak-Heading Section-Headings">
        {/* Make the heading clickable */}
        <Link
          to={`/category/${currentCategory}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h1>LeaderSpeak</h1>
        </Link>
        <hr className="Section-Styled-hr" />

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
                  <div className="Section-Text LeaderSpeak-text-overlay">
                    <h2 className="image-title Section-Titles">
                      {leaderSpeak.Title}
                    </h2>
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
                    <p className="leaderSpeak-date Section-Dates">
                      {new Date(story.updatedAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="Side-leaderSpeak-title Section-Titles">
                      {story.Title}
                    </h2>

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
        </div>
        <hr className="Section-Styled-hr" style={{ marginTop: "-10px" }} />
        <div className="Tab-Content">
          {activeTab === "recent" ? (
            recentNews && recentNews.length > 0 ? (
              <ul>
                {recentNewsData.data.slice(0, 5).map((news) => (
                  <li key={news.id} className="li-item">
                    <span className="leaderSpeak-date Section-Dates">
                      {new Date(news.updatedAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <Link
                      to={`/detail/RecentNews/${news.id}`}
                      className="Tab-titles Section-Titles"
                    >
                      <h2 className="tab-content-title">{news.Title}</h2>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent news available</p>
            )
          ) : trendingNews.length > 0 ? (
            <ul>
              {trendingNews.map((news) => (
                <li key={news.id} className="li-item">
                  <span className="leaderSpeak-date Section-Dates">
                    {new Date(news.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <Link
                    to={`/detail/RecentNews/${news.id}`}
                    className="Tab-titles"
                  >
                    <h2 className="tab-content-title Section-Titles">
                      {news.Title}
                    </h2>
                  </Link>
                  <p className="Section-Dates">Views: {news.Views}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No trending news available</p>
          )}
        </div>
      </div>
    </div>
  );
}
