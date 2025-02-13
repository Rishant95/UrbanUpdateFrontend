import React, { useState, useEffect } from "react";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";
import { useNavigate } from "react-router-dom";
import "../PagesCss/profile.css";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [magazines, setMagazines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = {
      username: localStorage.getItem("userName") || "Guest",
      email: localStorage.getItem("email") || "Not provided",
      phone: localStorage.getItem("phone") || "Not provided",
    };
    setUser(storedUser);
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/magzines?sort[0]=publishedAt:desc&pagination[limit]=5&populate=*`
      );
      setMagazines(response.data.data);
    } catch (error) {
      console.error("Error fetching magazines:", error);
    }
  };

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
      <MinimizedHeader />
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-info">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Latest Magazines Section */}
      <div className="latest-magazines-section">
        <h1 className="latest-magazines-heading">Latest Magazines</h1>
        <hr className="styled-hr" />
        <div className="magazines-grid">
          {magazines.length > 0 ? (
            magazines.map((mag) => (
              <div key={mag.id} className="magazine-card">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/${mag.Magazine_Cover?.formats?.small?.url}`}
                  alt={mag.Title}
                  className="magazine-cover"
                />
                <h3 className="magazine-title">{mag.Title}</h3>
                <p className="magazine-description">
                  {mag.Description?.[0]?.children?.[0]?.text}
                </p>
              </div>
            ))
          ) : (
            <p>No magazines available.</p>
          )}
        </div>
        <hr className="styled-hr" style={{ marginTop: "10px" }} />
      </div>
    </div>
  );
}
