import "../Css Files/CoverStory.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CoverStory() {
  const currentCategory = "Cover Story";
  const { loading, error, data } = useFetch(currentCategory, 1, 3);
  const [mainDescription, setmainDescription] = useState("");
  const [truncatedAdditionalStories, setTruncatedAdditionalStories] = useState(
    []
  );

  useEffect(() => {
    if (data && data.data) {
      // Fetching the first cover story only

      // Function to truncate text based on screen size
      const truncateDescription = (description, maxWords) => {
        const words = description.split(" ");
        setmainDescription(description);
        return words.length > maxWords
          ? words.slice(0, maxWords).join(" ") + "..."
          : description;
      };

      // Truncate additional stories descriptions
      const additionalTruncated = data.data.slice(1, 3).map((story) => {
        const additionalDescription =
          story.Description?.map((desc) => desc.children[0]?.text || "").join(
            " "
          ) || "";

        const maxWordsAdditional = window.innerWidth < 768 ? 5 : 100; // 30 words for mobile, 20 for desktop
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

  // Image URL logic
  const coverStory = data.data[0];
  const imageUrl = getImageUrl(coverStory);

  return (
    <div className={"Cover-Story-Heading Section-Headings"}>
      <Link
        to={`/category/${currentCategory}`}
        className="Cover-Story-title-link"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {" "}
        <h1>Cover Story</h1>
      </Link>

      <hr className="Section-Styled-hr" />

      <div className="Cover-Story-Container">
        {/* Main Cover Story */}
        <div className="Cover-Story-item">
          <div className="Cover-Story-image-container">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={coverStory.Title}
                className="Cover-Story-image"
              />
            )}
            <div className="Cover-Story-text-overlay">
              <Link
                to={`/detail/Cover Story/${coverStory.id}`}
                className="Cover-Story-link"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                {new Date(coverStory.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
                <h2 className="Cover-Story-Title-Overlay">
                  {coverStory.Title}
                </h2>
                <hr style={{ width: "30%", border: "1px solid red" }}></hr>
              </Link>
              <p
                style={{ fontWeight: "300", fontSize: "14px" }}
                className="Cover-Story-para-overlay"
              >
                {mainDescription}
              </p>
              {/* Display truncated main description */}
            </div>
          </div>
        </div>

        {/* Additional Cover Stories */}
        <div className="Cover-Story-additional-content">
          {truncatedAdditionalStories.map((story) => (
            <div key={story.id} className="Cover-Story-additional-items">
              <Link
                to={`/detail/Cover Story/${story.id}`}
                className="Cover-Story-link"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p className="Cover-Story-date Section-Dates">
                  {new Date(story.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className={"Section-Titles Side-cover-story-title"}>
                  {story.Title}
                </h2>
                <h3 className="Side-cover-story-author">
                  {" "}
                  By {story?.author?.Name}
                </h3>
                <p className={"Section-Text Side-cover-story-text"}>
                  {story.truncatedDescription}
                </p>{" "}
                {/* Display truncated description for additional stories */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
