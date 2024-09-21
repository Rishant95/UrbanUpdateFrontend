import { FaBars, FaBell, FaSign } from "react-icons/fa";
import "../Css/eventHeader.css";
import { useNavigate } from "react-router-dom";

export default function MinimizedHeader() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="Event-Header">
        <div className="Event-Header-Menu">
          <FaBars
            style={{ fontSize: "30px", cursor: "pointer", marginLeft: "15%" }}
          />
          <div className="header-logo-title">
            <img
              src="https://ibc.manofox.com/wp-content/uploads/2024/08/53a5706fd9e7a8e80dd938bf2c02941e.jpeg"
              alt="Header Logo"
              className="header-logo"
            />
            <div className="title-container">
              <h1 className="urban-Text">Urban</h1>
              <h1 className="update-Text">Update</h1>
            </div>
          </div>
          <div className="header-buttons">
            <button className="subscribe-header-button">
              <h5>Subscribe</h5>
              <FaBell className="notification-icon"></FaBell>
            </button>
            <button
              className="signin-header-button"
              onClick={() => navigate("/signin")}
            >
              <h5>Sign in</h5>
              <FaSign className="notification-icon"></FaSign>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
