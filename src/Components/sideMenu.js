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
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      navigate("/");
    }
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
              src="UUlogo.jpg"
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
            Accessibility Statement
          </li>
          {isLoggedIn ? <li onClick={handleLogout}>Logout</li> : <br />}
        </ul>
      </div>
    </div>
  );
}
