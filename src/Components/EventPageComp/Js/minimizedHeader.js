import { FaBell, FaSign } from "react-icons/fa";
import "../Css/minimizedHeader.css";
import { Link, useNavigate } from "react-router-dom";
import SideMenu from "../../sideMenu";

export default function MinimizedHeader() {
  const navigate = useNavigate();
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
    <div className="min-header-container">
      <div className="min-header-menu">
        <SideMenu />
        <Link
          to={`/`}
          className="Cover-Story-link"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="min-logo-title">
            <img
              src="UUUlogoSmall.jpg"
              alt="Header Logo"
              className="min-logo-image"
            />
            <div className="min-title">
              <h1 className="min-urban-text">Urban</h1>
              <h1 className="min-update-text">Update</h1>
            </div>
          </div>
        </Link>

        <div style={{ display: "flex", gap: "20px" }}>
          <button className="subscribe-btn">
            Subscribe <FaBell />
          </button>
          {isLoggedIn ? (
            <button className="signin-btn" onClick={() => navigate("/profile")}>
              Profile <FaSign />
            </button>
          ) : (
            <button className="signin-btn" onClick={() => navigate("/signin")}>
              Sign in <FaSign />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
