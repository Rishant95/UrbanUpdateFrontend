import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSun,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaBell,
  FaSign,
  FaHome,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./siteheader.css";

export default function Siteheader() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState("Fetching...");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Fetch location, date, and time
  useEffect(() => {
    // Fetch location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
          );
          const city =
            response.data.results[0]?.components?.city ||
            response.data.results[0]?.components?.town ||
            response.data.results[0]?.components?.village ||
            "Unknown";
          setLocation(city);
        } catch (error) {
          console.error("Error fetching location:", error);
          setLocation("Location unavailable");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation("Location unavailable");
      }
    );

    // Fetch date and time
    const interval = setInterval(() => {
      const now = new Date();
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <header className="main-header">
      <div className="header-top">
        {/* Header Info Row */}
        <div className="header-info">
          <FaSun className="icon" />
          <span>India</span>
          <FaClock className="icon" />
          <span>{date}</span>
        </div>

        {/* Social Media and Auth Buttons */}
        <div className="header-social">
          <FaFacebook className="icon" />
          <FaInstagram className="icon" />
          <FaYoutube className="icon" />
          <button className="subscribe-btn">
            Subscribe <FaBell />
          </button>
          <button className="signin-btn" onClick={() => navigate("/signin")}>
            Sign in <FaSign />
          </button>
        </div>
      </div>

      {/* Logo and Navigation Container */}
      <div className="nav-container">
        <div className="header-main">
          {/* Logo on Left */}
          <div className="logo-container">
            <img className="logo" src="UrbanUpdatelogo.jpg" alt="Logo" />
          </div>
          <div className="Banner-Container">
            <img
              className="banner"
              src="https://admin.manofox.online/uploads/thumbnail_37919faf1ac5c065af92c04f5b305bdc_a564ba121f.jpg?updatedAt=2024-11-01T13%3A22%3A24.484Z"
              alt="banner"
            />
            <p className="Moto-Overlay">
              They’re back! Kennedy Darling named to return to
            </p>
          </div>
        </div>

        <div className="Style-hr" style={{ marginBottom: "5px" }}></div>

        {/* Navigation */}
        <nav className="nav-right">
          <div className="desktop-nav">
            <FaHome className="search-icon" />
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#news" className="nav-link">
              News
            </a>
            <a href="#local-gov" className="nav-link">
              Local Government
            </a>
            <a href="#environment" className="nav-link">
              Environment
            </a>
            <a href="#columns" className="nav-link">
              Columns
            </a>
            <a href="/events" className="nav-link">
              Events
            </a>
            <a href="#publication" className="nav-link">
              Publication
            </a>
            <a href="#more" className="nav-link">
              More
            </a>
            <FaSearch className="search-icon" style={{ marginLeft: "20px" }} />
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="mobile-nav">
              <a href="#home" className="nav-link">
                Home
              </a>
              <a href="#news" className="nav-link">
                News
              </a>
              <a href="#local-gov" className="nav-link">
                Local Government
              </a>
              <a href="#environment" className="nav-link">
                Environment
              </a>
              <a href="#columns" className="nav-link">
                Columns
              </a>
              <a href="/events" className="nav-link">
                Events
              </a>
              <a href="#publication" className="nav-link">
                Publication
              </a>
              <a href="#more" className="nav-link">
                More
              </a>
            </div>
          )}
        </nav>
        <hr className="Style-hr" style={{ marginTop: "5px" }}></hr>
      </div>
    </header>
  );
}
