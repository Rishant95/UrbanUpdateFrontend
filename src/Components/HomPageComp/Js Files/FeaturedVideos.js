import "../Css Files/FeaturedVideos.css";

export default function FeaturedVideos() {
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
        <hr className="Section-Styled-hr" />
        <div className="Featured-Container">
          {youtubeLinks.slice(0, 3).map((link, index) => {
            // Extract the video ID from the YouTube link
            const videoId = link.split("v=")[1].split("&")[0];
            return (
              <div key={index} className="Featured-video-item">
                <div className="Featured-video-frame">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`Featured Video ${index + 1}`}
                    frameBorder="0"
                    width="360"
                    height="200"
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
