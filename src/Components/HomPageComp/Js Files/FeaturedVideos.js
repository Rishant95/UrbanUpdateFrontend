import "../Css Files/FeaturedVideos.css";
import { useFetch, getImageUrl } from "../../../Hooks/useFetch";

export default function FeaturedVideos() {
  const { loading, error, data } = useFetch("Featured Videos");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  // YouTube video URLs
  const youtubeLinks = [
    "https://www.youtube.com/watch?v=U21l-EFIewo&t=65s",
    "https://www.youtube.com/watch?v=vhjBje5nqJY",
    "https://www.youtube.com/watch?v=FclJdjdUuM0",
  ];

  return (
    <div>
      <div className="Featured-Heading Section-Headings">
        <h1>Featured Videos</h1>
        <hr className="Styled-hr" />
        <div className="Featured-Container">
          {youtubeLinks.slice(0, 3).map((link, index) => {
            // Extract the video ID from the YouTube link
            const videoId = link.split("v=")[1].split("&")[0];
            return (
              <div
                key={index}
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <div className="Featured-video-container">
                  <iframe
                    width="360"
                    height="215"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`Featured Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
