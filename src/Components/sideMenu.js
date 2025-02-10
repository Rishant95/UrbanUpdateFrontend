import { FaBars } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SideMenu() {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const userName = localStorage.getItem("userName"); 
  const isLoggedIn = Boolean(userName);

  const handleLogout = () => {
    // Clear JWT token from localStorage
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");
    
    // Redirect to login page after logging out
    navigate("/");
  };

  return (
    <div>
      <FaBars className="min-hamburger-icon" onClick={toggleMenu} />

      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <button className="close-menu-btn" onClick={toggleMenu}>
          &times;
        </button>
        <div className="side-menu-header">
          <Link
            to={`/`}
            className="Cover-Story-link"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
            }}
          >
            <img
              src="https://ibc.manofox.com/wp-content/uploads/2024/08/53a5706fd9e7a8e80dd938bf2c02941e.jpeg"
              alt="Side Menu Logo"
              className="side-menu-logo"
            />
            <h2 className="side-menu-title">Urban Update</h2>
          </Link>
        </div>
        <ul className="side-menu-items">
          <li onClick={() => navigate("/about")}>About Urban Update</li>
          <li onClick={() => navigate("/team")}>Team</li>
          <li onClick={() => navigate("/partners")}>Our Partners</li>
          <li onClick={() => navigate("/contact-us")}>Contact Us</li>
          <li onClick={() => navigate("/career")}>Careers</li>
          <li onClick={() => navigate("/advertise")}>Advertise with us</li>
          <li onClick={() => navigate("/partners")}>Partner with us</li>
          <li onClick={() => navigate("/privacy")}>Privacy Policy</li>
          <li onClick={() => navigate("/about-urban-update")}>Cookie Policy</li>
          <li onClick={() => navigate("/termofuse")}>Term of Use</li>
          <li onClick={() => navigate("/accessibility")}>
            Accessiblity Statement
          </li>
          {isLoggedIn? <li onClick={handleLogout}>Logout</li> :<br></br>}
          
        </ul>
      </div>
    </div>
  );
}
