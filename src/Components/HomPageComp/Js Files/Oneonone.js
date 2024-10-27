import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../Css Files/Oneonone.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch";

export default function Oneonone() {
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const { loading, error, data } = useFetch("OneOnOne");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const oneon = data.data[0]; // Access the first item in the array

  // Check if the description exists and handle accordingly
  const description = oneon.Description
    ? oneon.Description.map((desc) =>
        desc.children && desc.children[0] ? desc.children[0].text : ""
      ).join(" ") // Join the description paragraphs into a single string
    : "";

  // Handle Image URL (adjust based on your API response structure)

  const imageUrl = getImageUrl(oneon);

  return (
    <div className="OneonOne-Heading">
      <h1>One on One</h1>
      <hr className="Styled-hr"></hr>

      <div className="OneonOne-Container">
        {/* Image and description for the first item */}
        <div className="OneonOne-image-container">
          {imageUrl && (
            <img src={imageUrl} alt={oneon.Title} className="OneonOne-image" />
          )}
        </div>

        {/* Description for the first item */}
        <div className="OneonOne-additional-content">
          <div className="OneonOne-item">
            <Link
              to={`/detail/OneOnOne/${oneon.id}`} // Link to detail page
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="OneonOne-text">
                <h2 className="first-title">{oneon.Title}</h2>
                <h5 className="OneonOne-description">
                  {truncateText(description, 200)}
                </h5>
              </div>
            </Link>
          </div>

          {/* Remaining items as clickable links */}
          {data.data.slice(1, 3).map((oneonone) => (
            <Link
              key={oneonone.id}
              to={`/detail/OneOnOne/${oneonone.id}`} // Link to detail page
              style={{ textDecoration: "none", color: "inherit" }} // Remove underline and maintain text color
            >
              <div className="OneonOne-story">
                <p className="OneonOne-date">
                  {new Date(oneonone.updatedAt).toLocaleDateString("en-US", {
                    month: "long", // Full month name
                    year: "numeric", // Year
                  })}
                </p>
                <h2 className="OneonOne-story-title">{oneonone.Title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
