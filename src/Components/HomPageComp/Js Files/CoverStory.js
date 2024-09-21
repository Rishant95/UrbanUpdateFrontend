import "../Css Files/CoverStory.css";
import useFetch from "../../../Hooks/useFetch"; // Assuming you have a custom hook for fetching data
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function CoverStory() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/cover-news"
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

  // Fetching the first cover story only
  const coverStory = data.data[0]; // Access the first item in the array

  // Extract description paragraphs
  const description = coverStory.attributes.Description.map((desc, index) => (
    <p key={index}>{desc.children[0].text}</p>
  ));

  return (
    <div className="Cover-Story-Heading">
      <h1>Cover Story</h1>
      <hr className="Styled-hr" />

      <div className="Cover-Story-Container">
        <div className="Cover-Story-item">
          <div className="Cover-Story-image-container">
            {coverStory.attributes.ImageUrl && (
              <img
                src={coverStory.attributes.ImageUrl}
                alt={coverStory.attributes.Title}
                className="Cover-Story-image"
              />
            )}
            <div className="Cover-Story-text-overlay">
              <Link
                to={`/detail/cover-news/${coverStory.id}`} // Link to the cover story detail page
                style={{ textDecoration: "none", color: "inherit" }} // Optional styling to remove underline
              >
                <h2>{coverStory.attributes.Title}</h2>
              </Link>
              {description}
            </div>
          </div>
        </div>
        <div className="Cover-Story-additional-content">
          {data.data.slice(1, 3).map(
            (
              story // Start from index 1 to skip the first cover story
            ) => (
              <div key={story.id} className="Cover-Story-additional-items">
                <Link
                  to={`/detail/cover-news/${story.id}`} // Link to the additional story detail page
                  style={{ textDecoration: "none", color: "inherit" }} // Optional styling to remove underline
                >
                  <p className="Cover-Story-date">
                    {new Date(story.attributes.updatedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long", // Full month name
                        year: "numeric", // Year
                      }
                    )}
                  </p>
                  <h2 className="Side-cover-story-title">
                    {story.attributes.Title}
                  </h2>
                  {story.attributes.Description.map((desc, index) => (
                    <p className="Side-cover-story-text" key={index}>
                      {desc.children[0].text}
                    </p>
                  ))}
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
