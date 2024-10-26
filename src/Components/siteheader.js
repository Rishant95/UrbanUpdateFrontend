import React, { useState } from "react";
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

  return (
    <header className="main-header">
      <div className="header-top">
        {/* Header Info Row */}
        <div className="header-info">
          <FaSun className="icon" />
          <span>15° New York</span>
          <FaClock className="icon" />
          <span>Wednesday, 10 January 2021</span>
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
      <div className="header-main">
        {/* Logo on Left */}
        <div className="logo-container">
          <img
            className="logo"
            src="https://admin.manofox.online/uploads/thumbnail_Urban_Update_logo_da45c6e125.jpg"
            alt="Logo"
          />
        </div>

        {/* Navigation on Right */}
        <nav className="nav-right">
          <div className="desktop-nav">
            <a href="#home" className="nav-link">
              <FaHome /> Home
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
            <a href="#events" className="nav-link">
              Events
            </a>
            <a href="#publication" className="nav-link">
              Publication
            </a>
            <a href="#more" className="nav-link">
              More
            </a>
            <FaSearch className="search-icon" />
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
              <a href="#events" className="nav-link">
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
      </div>
    </header>
  );
}
