import React from "react";
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
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./siteheader.css";
import { FaX } from "react-icons/fa6";

export default function Siteheader() {
  const navigate = useNavigate();
  return (
    <div className="main-header">
      <div className="header-icon-row-main">
        <div className="header-icon-row">
          <div className="row-item">
            <FaSun className="icon"></FaSun>
            <h5 className="item-text">15 New York</h5>
          </div>
          <div className="row-item">
            <FaClock className="icon"></FaClock>
            <h5 className="item-text">Wednesday,10 Janruary 2021 </h5>
          </div>
        </div>
        <div className="social-media-row">
          <FaFacebook className="icon"></FaFacebook>
          <FaX className="icon"></FaX>
          <FaInstagram className="icon"></FaInstagram>
          <FaYoutube className="icon"></FaYoutube>
          <div className="header-buttons">
            <button className="subscribe-header-button">
              <h5>Subscribe</h5>
              <FaBell className="notification-icon" />
            </button>
            <button
              className="signin-header-button"
              onClick={() => navigate("/signin")}
            >
              <h5>Sign in</h5>
              <FaSign className="notification-icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="title-image-container">
        <div className="title-container">
          <img
            className="title-logo"
            src="http://localhost:1337/uploads/Urban_Update_logo_2d6e938ca6.jpg"
            alt="Logo"
          />
        </div>
        <div className="image-container">
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://ibc.manofox.com/wp-content/uploads/2024/08/37919faf1ac5c065af92c04f5b305bdc.jpg"
              alt="Example"
              className="image"
            />
            <div className="dark-overlay"></div>
            <div className="text-overlay">
              They're Back! Kennedy Darling <br /> Name To Return To{" "}
            </div>
          </a>
        </div>
      </div>

      <hr style={{ color: "black" }}></hr>
      <div className="tabs-row">
        <FaHome style={{ fontSize: "20px" }}></FaHome>
        <a href="#tab1" className="tab-link">
          Home
        </a>
        <a href="#tab2" className="tab-link">
          News
        </a>
        <a href="#tab3" className="tab-link">
          Local Government
        </a>
        <a href="#tab4" className="tab-link">
          Environment
        </a>
        <a href="#tab5" className="tab-link">
          Columns
        </a>
        <a href="/events" className="tab-link">
          Events
        </a>
        <a href="#tab5" className="tab-link">
          Publication
        </a>
        <a href="#tab5" className="tab-link">
          More
        </a>
        <FaSearch style={{ fontSize: "20px" }}></FaSearch>
      </div>
      <hr style={{ marginTop: "10px" }}></hr>
    </div>
  );
}
