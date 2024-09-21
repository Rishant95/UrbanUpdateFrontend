import { Link } from "react-router-dom";
import "../Css Files/LeaderSpeak.css";
import useFetch from "../../../Hooks/useFetch";

export default function LeaderSpeak() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/leaderspeaks"
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

  const coverStory = data.data[0];
  const description = coverStory.attributes.Description.map((desc, index) => (
    <p key={index}>{desc.children[0].text}</p>
  ));

  return (
    <div className="LeaderSpeak-Heading">
      <h1>LeaderSpeak</h1>
      <hr className="Styled-hr" />

      <div className="LeaderSpeak-Container">
        <div className="LeaderSpeak-item">
          <Link
            to={`/detail/leaderspeaks/${coverStory.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="LeaderSpeak-image-container"
              style={{ cursor: "pointer" }}
            >
              {coverStory.attributes.ImageUrl && (
                <img
                  src={coverStory.attributes.ImageUrl}
                  alt={coverStory.attributes.Title}
                  className="LeaderSpeak-image"
                />
              )}
              <div className="LeaderSpeak-text-overlay">
                <h2>{coverStory.attributes.Title}</h2>
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
              <div
                className="additional-item-container"
                style={{
                  display: "flex",
                  flexDirection: "column", // Stack items vertically
                  justifyContent: "flex-start", // Align items to the start of the container
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                <p className="leaderSpeak-date">
                  {new Date(story.attributes.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
                <h2 className="Side-leaderSpeak-title">
                  {story.attributes.Title}
                </h2>
                <div className="item-border"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
