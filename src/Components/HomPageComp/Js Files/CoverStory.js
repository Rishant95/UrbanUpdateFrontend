import "../Css Files/CoverStory.css";
import useFetch from "../../../Hooks/useFetch"; // Assuming you have a custom hook for fetching data
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function CoverStory() {
  const { loading, error, data } = useFetch("Cover Story");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  // Fetching the first cover story only
  const coverStory = data.data[0];

  // API base URL
  const API_BASE_URL = "http://93.127.185.210:1337";

  // Extract description paragraphs safely
  const description =
    coverStory.Description?.map((desc, index) => (
      <p key={index}>{desc.children[0]?.text || ""}</p>
    )) || [];

  // Image URL logic
  const imageUrl = coverStory.ThumbailUrl
    ? `${API_BASE_URL}${coverStory.ThumbailUrl}`
    : coverStory.Image?.[0]?.formats?.large?.url
    ? `${API_BASE_URL}${coverStory.Image[0].formats.large.url}`
    : coverStory.Image?.[0]?.url
    ? `${API_BASE_URL}${coverStory.Image[0].url}`
    : "https://yourapi.com/path-to-placeholder-image.jpg"; // Fallback image URL

  return (
    <div className="Cover-Story-Heading">
      <h1>Cover Story</h1>
      <hr className="Styled-hr" />

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
                to={`/detail/cover-news/${coverStory.id}`} // Link to the cover story detail page
                className="Cover-Story-link"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h2>{coverStory.Title}</h2>
              </Link>
              {description}
            </div>
          </div>
        </div>

        {/* Additional Cover Stories */}
        <div className="Cover-Story-additional-content">
          {data.data.slice(1, 3).map((story) => (
            <div key={story.id} className="Cover-Story-additional-items">
              <Link
                to={`/detail/cover-news/${story.id}`} // Link to the additional story detail page
                className="Cover-Story-link"
              >
                <p className="Cover-Story-date">
                  {new Date(story.updatedAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="Side-cover-story-title">{story.Title}</h2>
                {story.Description?.map((desc, index) => (
                  <p className="Side-cover-story-text" key={index}>
                    {desc.children[0]?.text || ""}
                  </p>
                ))}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
