import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../Css Files/RecentNews.css";
import "../../../PagesCss/textModule.css";
import { GetRecent, useFetch } from "../../../Hooks/useFetch";
import LoadingPrompt from "../../loadingComp";

export default function RecentNews() {
  const currentCategory = "Recent News";
  const { loading, error, data } = GetRecent(1,5);
  const scrollRef = useRef(null); // Reference for the scrollable row

  // Auto scroll function
  const autoScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;

      // Scroll by 1 pixel to the right
      scrollRef.current.scrollBy({
        left: 1,
        behavior: "smooth",
      });

      // If reached the end, reset scroll position to the beginning
      if (scrollLeft >= maxScrollLeft) {
        scrollRef.current.scrollLeft = 0; // Reset to start
      }
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(autoScroll, 30); // Adjust the speed here
    return () => clearInterval(scrollInterval); // Cleanup interval on component unmount
  }, []);

  if (loading) {
    return <LoadingPrompt />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data) {
    return <p>No data available</p>;
  }

  // Duplicate the data for seamless looping
  const newsItems = [...data.data, ...data.data]; // Duplicate the news items

  return (
    <div>
      {/* Make heading clickable */}
      <Link
        to={`/category/${currentCategory}`}
        className="Recent-news-heading-link"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h1 className={`Recent-news-heading`}>Recent News</h1>
      </Link>

      <hr className="styled-hr" />
      <div className="Recent-news-row" ref={scrollRef}>
        {newsItems.map((recentNews, index) => (
          <Link
            key={index}
            to={`/detail/Recent News/${recentNews.id}`} // Use collection and id in URL
            className={`Recent-news-item ${
              index !== newsItems.length - 1 ? "with-divider" : ""
            }`}
          >
            <div className="Recent-news-Text">
              <h2>{recentNews.Title}</h2>
            </div>
          </Link>
        ))}
      </div>
      <hr className="styled-hr" style={{ marginTop: "10px" }} />
    </div>
  );
}
