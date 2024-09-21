import "../Css Files/FeaturedVideos.css";
import useFetch from "../../../Hooks/useFetch";

export default function FeaturedVideos() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/featured-videos"
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

  return (
    <div>
      <div className="Featured-Heading">
        <h1>Featured Videos</h1>
        <hr className="Styled-hr" />

        <div className="Featured-Container">
          {data.data.slice(0, 3).map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <div className="Featured-image-container">
                {item.attributes.imageurl && (
                  <img
                    src={item.attributes.imageurl} // Use the correct field from the API response
                    className="Featured-image"
                    alt="Featured Video"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
