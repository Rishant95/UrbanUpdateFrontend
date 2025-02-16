import React from "react";
import { Link } from "react-router-dom";
import "../Css Files/RecentNews.css";
import Slider from "react-slick";
import "../../../PagesCss/textModule.css";
import { useFetch } from "../../../Hooks/useFetch";
import { getImageUrl } from "../../../Hooks/useFetch";

export default function ThumbnailSlider() {
  const { loading, error, data } = useFetch("ThumbnailSlider", 1, 4);

  // Debugging logs
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Fetched data:", data);
  console.log("Data structure:", data?.data);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // Error handling
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Check if the data is available
  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <div className="cover-story-wrapper">
      <div className="slider-container">
        <Slider {...settings} className="slider">
          {data.data.map((article) => {
            const imageUrl = getImageUrl(article);

            return (
              <div key={article.id} className="slide-container">
                <Link
                  to={`/detail/news-articles/${article.id}`}
                  className="slide-link"
                >
                  <div className="title-overlay">
                    <h2>{article.Title}</h2>
                  </div>

                  {/* Image inside the slider */}
                  <img
                    className="slider-card-image"
                    src={imageUrl}
                    alt={article.Title}
                  />
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="image-container">
        <img
          className="magazine-image"
          src="magCover.jpg"
          alt="Magazine Cover"
        />
      </div>
    </div>
  );
}
