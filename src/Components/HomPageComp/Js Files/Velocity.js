import { Link } from "react-router-dom";
import "../Css Files/Velocity.css";
import { getImageUrl, useFetch } from "../../../Hooks/useFetch";
import { useEffect, useRef } from "react";

export default function VelocityPage() {
  const { loading, error, data } = useFetch("Velocity");
  const sliderRef = useRef(null);

  // Automatic scrolling logic with seamless looping
  const autoScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    const maxScrollLeft = scrollWidth - clientWidth;

    // Scroll to the right
    slider.scrollBy({ left: 1, behavior: "smooth" });

    // If at the end, reset to the start
    if (scrollLeft >= maxScrollLeft) {
      slider.scrollLeft = 0;
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(autoScroll, 1); // Adjust speed here
    return () => clearInterval(scrollInterval); // Cleanup on unmount
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  // Duplicate the data for seamless looping
  const velocityItems = [...data.data, ...data.data];

  return (
    <div>
      <div className="Velocity-Heading">
        <h1>Velocity</h1>
        <hr className="Styled-hr" />
        <div className="Velocity-Container" ref={sliderRef}>
          {velocityItems.map((velocity, index) => {
            const imageUrl = getImageUrl(velocity);
            return (
              <Link
                key={`${velocity.id}-${index}`}
                to={`/detail/Velocity/${velocity.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="Velocity-item">
                  <div className="Velocity-image-container">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={velocity.Title}
                        className="Velocity-image"
                        onError={(e) => {
                          e.target.src =
                            "https://yourapi.com/path-to-placeholder-image.jpg";
                        }}
                      />
                    )}
                    <div className="Velocity-text-overlay">
                      <p className="Velocity-date">{velocity.CityName}</p>
                      <h2 className="Velocity-text">{velocity.Title}</h2>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
