import React, { useState, useEffect } from "react";
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
  const [date, setDate] = useState("");

  // Fetch location, date, and time
  useEffect(() => {
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
          {/* Logo */}
          <div className="logo-container">
            <img className="logo" src="UULogoResized.jpg" alt="Logo" />
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
            <div className="nav-item">
              <a href="/" className="nav-link">
                <FaHome className="search-icon" />
              </a>
            </div>
            <div className="nav-item dropdown">
              <a href="/category/News" className="nav-link">
                News
              </a>
              <div className="dropdown-menu">
                <a href="/category/National" className="dropdown-link">
                  National
                </a>
                <a href="/category/International" className="dropdown-link">
                  International
                </a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="/category/Local Government" className="nav-link">
                Local Government
              </a>
              <div className="dropdown-menu">
                <a href="/category/Climate Change" className="dropdown-link">
                  Climate Change
                </a>
                <a href="/category/Water" className="dropdown-link">
                  Water
                </a>
                <a href="/category/ Waste Management" className="dropdown-link">
                  Waste Management
                </a>
                <a href="/category/Environment" className="dropdown-link">
                  Environment
                </a>
                <a href="/category/Mobility" className="dropdown-link">
                  Mobility
                </a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#columns" className="nav-link">
                Columns
              </a>
              <div className="dropdown-menu">
                <a href="/category/Editorial" className="dropdown-link">
                  Editorial
                </a>
                <a href="/category/LeaderSpeak" className="dropdown-link">
                  LeaderSpeak
                </a>
                <a href="/category/Urban Agenda" className="dropdown-link">
                  Urban Agenda
                </a>
                <a href="/category/Book Review" className="dropdown-link">
                  Book Review
                </a>
                <a href="/category/Velocity" className="dropdown-link">
                  Velo-City
                </a>
              </div>
            </div>

            <div className="nav-item">
              <a href="/category/OneOnOne" className="nav-link">
                One-On-One
              </a>
            </div>
            <div className="nav-item dropdown">
              <a href="events" className="nav-link">
                Events
              </a>
              <div className="dropdown-menu">
                <a href="#upcomingevents" className="dropdown-link">
                  Upcoming Events
                </a>
                <a href="#saacsummit" className="dropdown-link">
                  SAC Summit
                </a>
                <a href="#urbandialogues" className="dropdown-link">
                  Urban Dialogues
                </a>
                <a href="#e-dialogues" className="dropdown-link">
                  E-Dialogues
                </a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#publication" className="nav-link">
                Publication
              </a>
              <div className="dropdown-menu">
                <a href="#urbanupdate" className="dropdown-link">
                  Urban Update
                </a>
                <a href="#projectupdate" className="dropdown-link">
                  Project Update
                </a>
                <a href="#e-newslettter" className="dropdown-link">
                  E-Newslettter
                </a>
              </div>
            </div>
            <FaSearch className="search-icon" style={{ marginLeft: "20px" }} />
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="mobile-nav">
              <div className="nav-item">
                <a href="#home" className="nav-link">
                  Home
                </a>
              </div>
              <div className="nav-item dropdown">
                <a href="#news" className="nav-link">
                  News
                </a>
                <div className="dropdown-menu">
                  <a href="#world" className="dropdown-link">
                    World
                  </a>
                  <a href="#sports" className="dropdown-link">
                    Sports
                  </a>
                  <a href="#politics" className="dropdown-link">
                    Politics
                  </a>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#local-gov" className="nav-link">
                  Local Government
                </a>
                <div className="dropdown-menu">
                  <a href="#policies" className="dropdown-link">
                    Policies
                  </a>
                  <a href="#projects" className="dropdown-link">
                    Projects
                  </a>
                </div>
              </div>
              <div className="nav-item dropdown">
                <a href="#columns" className="nav-link">
                  Columns
                </a>
                <div className="dropdown-menu">
                  <a href="#editorial" className="dropdown-link">
                    Editorial
                  </a>
                  <a href="#opinion" className="dropdown-link">
                    Opinion
                  </a>
                </div>
              </div>
              <div className="nav-item">
                <a href="#more" className="nav-link">
                  One On One
                </a>
              </div>
              <div className="nav-item">
                <a href="/events" className="nav-link">
                  Events
                </a>
              </div>
            </div>
          )}
        </nav>
        <hr className="Style-hr" style={{ marginTop: "5px" }}></hr>
      </div>
    </header>
  );
}
