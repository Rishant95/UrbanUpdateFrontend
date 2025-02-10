import React, { useState } from "react";
import "../Css/eventHeader.css";

export default function EventHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <div>
      <div className="maintenance-banner">
    <p>⚠️ This site is under maintenance. The displayed data is for testing purposes only. ⚠️</p>
  </div>
      <div className="Event-Header">
      
        <h1 id="Event-Title">EVENTS</h1>
        <div className="header-content">
          <div className="tabs-row">
            <a href="/category/Upcoming Events" className="tab-link">
              Upcoming Events
            </a>
            <a href="/category/E Dialogues" className="tab-link">
              E-Dialogues
            </a>
            <a href="/category/Mayor's Dialogue" className="tab-link">
              Mayor's Dialogue
            </a>
            <a href="/category/Sac Summit" className="tab-link">
              SAC Summit
            </a>
            <a href="/category/Urban Dialogues" className="tab-link">
              Urban Dialogues
            </a>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`line ${isMenuOpen ? "active" : ""}`}></div>
            <div className={`line ${isMenuOpen ? "active" : ""}`}></div>
            <div className={`line ${isMenuOpen ? "active" : ""}`}></div>
          </div>
        </div>
        <hr
          style={{ marginTop: "10px", width: "100%" }}
          className="event-menu-hr"
        ></hr>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#tab1" className="mobile-tab-link">
              Upcoming Events
            </a>
            <a href="#tab2" className="mobile-tab-link">
              E-Dialogues
            </a>
            <a href="#tab3" className="mobile-tab-link">
              Mayor's Dialogue
            </a>
            <a href="#tab4" className="mobile-tab-link">
              SAC Summit
            </a>
            <a href="#tab5" className="mobile-tab-link">
              Urban Dialogues
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
