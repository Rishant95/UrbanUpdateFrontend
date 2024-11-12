import React from "react";
import { Link } from "react-router-dom";
import Siteheader from "../Components/siteheader";
import Slider from "react-slick";
import { getImageUrl, useFetch } from "../Hooks/useFetch";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../PagesCss/hompage.css";
import RecentNews from "../Components/HomPageComp/Js Files/RecentNews";
import CoverStory from "../Components/HomPageComp/Js Files/CoverStory";
import LeaderSpeak from "../Components/HomPageComp/Js Files/LeaderSpeak";
import VelocityPage from "../Components/HomPageComp/Js Files/Velocity";
import Oneonone from "../Components/HomPageComp/Js Files/Oneonone";
import CityAndArticles from "../Components/HomPageComp/Js Files/CityAndArticles";
import EditorialUrban from "../Components/HomPageComp/Js Files/EditorialUrban";
import BookReview from "../Components/HomPageComp/Js Files/BookReview";
import Regulars from "../Components/HomPageComp/Js Files/Regulars";
import FeaturedVideos from "../Components/HomPageComp/Js Files/FeaturedVideos";

export default function Homepage() {
  const { loading, error, data } = useFetch("ThumbnailSlider");

  // Debugging logs
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Fetched data:", data);
  console.log("Data structure:", data?.data);

  // Loading state
  if (loading) {
    return <p>Loading...</p>;
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
    <div>
      <Siteheader />
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
            src="https://ibc.manofox.com/wp-content/uploads/2024/08/71f33b4d90acecdf5dad2bbdac7d609d-731x1024.jpg"
            alt="Magazine Cover"
          />
        </div>
      </div>

      {/* Render other components below the slider */}
      <>
        <RecentNews />
        <CoverStory />
        <LeaderSpeak />
        <VelocityPage />
        <Oneonone />
        <CityAndArticles />
        <EditorialUrban />
        <BookReview />
        <FeaturedVideos />
        <Regulars />
      </>
    </div>
  );
}
