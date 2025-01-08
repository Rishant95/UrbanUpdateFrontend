import { FaBars, FaBell, FaSign } from "react-icons/fa";
import "../Css/minimizedHeader.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MinimizedHeader() {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-header-container">
      <div className="min-header-menu">
        <FaBars className="min-hamburger-icon" onClick={toggleMenu} />

        <div className="min-logo-title">
          <img
            src="https://ibc.manofox.com/wp-content/uploads/2024/08/53a5706fd9e7a8e80dd938bf2c02941e.jpeg"
            alt="Header Logo"
            className="min-logo-image"
          />
          <div className="min-title">
            <h1 className="min-urban-text">Urban</h1>
            <h1 className="min-update-text">Update</h1>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <button className="subscribe-btn">
            Subscribe <FaBell />
          </button>
          <button className="signin-btn" onClick={() => navigate("/signin")}>
            Sign in <FaSign />
          </button>
        </div>
      </div>

      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <button className="close-menu-btn" onClick={toggleMenu}>
          &times;
        </button>
        <div className="side-menu-header">
          <img
            src="https://ibc.manofox.com/wp-content/uploads/2024/08/53a5706fd9e7a8e80dd938bf2c02941e.jpeg"
            alt="Side Menu Logo"
            className="side-menu-logo"
          />
          <h2 className="side-menu-title">Urban Update</h2>
        </div>
        <ul className="side-menu-items">
          <li onClick={() => navigate("/about")}>About Urban Update</li>
          <li onClick={() => navigate("/team")}>Team</li>
          <li onClick={() => navigate("/partners")}>Our Partners</li>
          <li onClick={() => navigate("/contact")}>Contact Us</li>
          <li onClick={() => navigate("/career")}>Careers</li>
          <li onClick={() => navigate("/advertise")}>Advertise with us</li>
          <li onClick={() => navigate("/partners")}>Partner with us</li>
          <li onClick={() => navigate("/privacy")}>Privacy Policy</li>
          <li onClick={() => navigate("/about")}>Cookie Policy</li>
          <li onClick={() => navigate("/termofuse")}>Term of Use</li>
          <li onClick={() => navigate("/accessibility")}>
            Accessiblity Statement
          </li>
        </ul>
      </div>
    </div>
  );
}
