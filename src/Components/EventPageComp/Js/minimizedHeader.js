import { FaBars, FaBell, FaSign } from "react-icons/fa";
import "../Css/minimizedHeader.css";
import { useNavigate } from "react-router-dom";

export default function MinimizedHeader() {
  const navigate = useNavigate();

  return (
    <div className="min-header-container">
      <div className="min-header-menu">
        <FaBars className="min-hamburger-icon" />

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

        <div className="min-header-buttons">
          <button className="min-subscribe-btn">
            <h5>Subscribe</h5>
            <FaBell className="min-icon-bell" />
          </button>
          <button
            className="min-signin-btn"
            onClick={() => navigate("/signin")}
          >
            <h5>Sign in</h5>
            <FaSign className="min-icon-signin" />
          </button>
        </div>
      </div>
    </div>
  );
}
