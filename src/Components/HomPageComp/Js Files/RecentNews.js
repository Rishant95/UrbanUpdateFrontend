import React from "react";
import { Link } from "react-router-dom";
import "../Css Files/RecentNews.css";
import useFetch from "../../../Hooks/useFetch";

export default function RecentNews() {
  const { loading, error, data } = useFetch("Recent News");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <h1 className="Recent-news-heading">Recent News</h1>
      <hr className="styled-hr" />
      <div className="Recent-news-row">
        {data.data.map((recentNews, index) => (
          <Link
            key={recentNews.id}
            to={`/detail/recent-news/${recentNews.id}`} // Use collection and id in URL
            className={`Recent-news-item ${
              index !== data.data.length - 1 ? "with-divider" : ""
            }`}
          >
            <div className="Recent-news-Text">
              <h2>{recentNews.Title}</h2>
            </div>
          </Link>
        ))}
      </div>
      <hr className="styled-hr" style={{ marginTop: "0px" }} />
    </div>
  );
}
