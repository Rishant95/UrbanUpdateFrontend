import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Css Files/detailMagazine.css";
import axios from "axios";
import MinimizedHeader from "../../EventPageComp/Js/minimizedHeader";

export default function DetailMagazine() {
  const location = useLocation();
  const navigate = useNavigate();
  const { year, id } = useParams();
  const [otherMagazines, setOtherMagazines] = useState([]);

  const magazine = location.state?.magazine;

  useEffect(() => {
    if (magazine) {
      fetchOtherMagazines();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magazine]);

  const fetchOtherMagazines = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/magzines?filters[year_edtion][Year][$eq]=${year}&populate=*`
      );
      const filteredMagazines = response.data.data.filter(
        (mag) => mag.id !== magazine.id
      );
      setOtherMagazines(filteredMagazines);
    } catch (error) {
      console.error("Error fetching other magazines:", error);
    }
  };

  if (!magazine) {
    return <p className="error-message">No magazine data found.</p>;
  }

  return (
    <div>
      <MinimizedHeader />
      <div className="magazine-container">
        <div className="magazine-highlight">
          {/* Left Side - Magazine Cover */}
          <div className="highlight-cover">
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}/${magazine.Magazine_Cover?.url}`}
              alt={magazine.Title}
              className="highlight-image"
            />
          </div>

          {/* Right Side - Details */}
          <div className="highlight-details">
            <h1 className="highlight-title">{magazine.Title}</h1>
            <p className="highlight-description">
              {magazine.Description[0]?.children[0]?.text}
            </p>
            <button
              className="read-magazine-btn"
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_API_BASE_URL}/${magazine.PDF?.url}`,
                  "_blank"
                )
              }
            >
              Read Magazine
            </button>
          </div>
        </div>

        {/* Related Magazines */}
        {otherMagazines.length > 0 && (
          <div className="related-magazines">
            <h2 className="related-heading">More from {year}</h2>
            <div className="magazine-grid">
              {otherMagazines.map((mag) => (
                <div
                  key={mag.id}
                  className="magazine-card"
                  onClick={() =>
                    navigate(`/magazine/${year}/${mag.id}`, {
                      state: { magazine: mag },
                    })
                  }
                >
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/${mag.Magazine_Cover?.formats?.small?.url}`}
                    alt={mag.Title}
                    className="magazine-card-cover"
                  />
                  <h3 className="magazine-card-title">{mag.Title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
