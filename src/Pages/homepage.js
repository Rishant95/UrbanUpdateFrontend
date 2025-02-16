import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Siteheader from "../Components/siteheader";
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
import ThumbnailSlider from "../Components/HomPageComp/Js Files/ThumbnailSlider";

export default function Homepage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating all components loading
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this timeout as needed

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div
        className="loader-container"
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <img
          style={{ width: "50%", height: "50%", objectFit: "contain" }}
          src="UrbanUpdatelogo.jpg"
          alt="Logo"
        />
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Siteheader />
      <ThumbnailSlider />
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
    </div>
  );
}
