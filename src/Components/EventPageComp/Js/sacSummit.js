import React, { useEffect, useRef } from "react";
import useFetch from "../../../Hooks/useFetch";
import { FaArrowRight } from "react-icons/fa";
import "../Css/sacSummit.css"; // Make sure your CSS is defined

export default function SacSummit() {
  // Fetch data from the provided endpoint
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/sac-summits"
  );
  const scrollerRef = useRef(null); // Ref to the scroller div

  // Auto-scroll and infinite loop logic
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let scrollAmount = 0;
    const scrollStep = 1; // Adjust this value for faster or slower scrolling
    const scrollInterval = 30; // Interval for each scroll step (in ms)

    const autoScroll = () => {
      if (scrollAmount >= scroller.scrollWidth - scroller.clientWidth) {
        scrollAmount = 0; // Reset scroll to the beginning for endless scroll
      }
      scrollAmount += scrollStep;
      scroller.scrollLeft = scrollAmount;
    };

    const interval = setInterval(autoScroll, scrollInterval);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div style={{ padding: "0 5%" }}>
      <h1 className="upcoming-events-heading">SAC-SUMMIT</h1>
      <div className="sac-summit-container">
        {/* Manual and auto horizontal scrolling */}
        <div className="sac-summit-scroller" ref={scrollerRef}>
          {data.data.map((item) => (
            <img
              key={item.id}
              src={item.attributes.ThumbnailUrl}
              alt={`Sac Summit ${item.id}`}
              className="sac-summit-image"
            />
          ))}
        </div>
      </div>
      <div className="More-Container" style={{ marginTop: "20px" }}>
        <a href="/">More From SAC Summit</a>
        <FaArrowRight />
      </div>
      <hr />
    </div>
  );
}
