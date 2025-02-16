import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MinimizedHeader from "../../EventPageComp/Js/minimizedHeader";
import "../Css Files/UUMagazine.css";
import axios from "axios";

export default function UUMagazine() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [magazines, setMagazines] = useState([]);
  const navigate = useNavigate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetchMagazines();
  }, [year, selectedMonth]);

  const fetchMagazines = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/magzines?filters[year_edtion][Year][$eq]=${year}&filters[month][$eq]=${selectedMonth}&populate=*`
      );
      setMagazines(response.data.data);
    } catch (error) {
      console.error("Error fetching magazines:", error);
    }
  };

  const handleMagazineClick = (mag) => {
    navigate(`/magazine/${year}/${mag.id}`, { state: { magazine: mag } });
  };

  return (
    <div>
      <MinimizedHeader />
      <div className="uu-magazine-container">
        <div className="uu-magazine-content">
          {/* Year Selection */}
          <label className="uu-magazine-label">Select Year:</label>
          <select
            className="uu-magazine-dropdown"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[...Array(10)].map((_, index) => (
              <option key={index} value={new Date().getFullYear() - index}>
                {new Date().getFullYear() - index}
              </option>
            ))}
          </select>

          {/* Month Tabs */}
          <div className="uu-magazine-month-tabs">
            {months.map((month) => (
              <button
                key={month}
                className={`uu-magazine-month-button ${
                  selectedMonth === month ? "active" : "inactive"
                }`}
                onClick={() => setSelectedMonth(month)}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        {/* Display Magazines */}
        <div className="uu-magazine-section">
          {magazines.length > 0 ? (
            <div className="uu-magazine-grid">
              {magazines.map((mag) => (
                <div
                  key={mag.id}
                  className="uu-magazine-card"
                  onClick={() => handleMagazineClick(mag)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/${mag.Magazine_Cover?.formats?.small?.url}`}
                    alt={mag.Title}
                    className="uu-magazine-cover"
                  />
                  <h3 className="uu-magazine-title">{mag.Title}</h3>
                  {mag.Description &&
                    mag.Description.length > 0 &&
                    mag.Description[0]?.children &&
                    mag.Description[0].children.length > 0 && (
                      <p className="uu-magazine-description">
                        {mag.Description[0].children[0]?.text || ""}
                      </p>
                    )}
                </div>
              ))}
            </div>
          ) : (
            <p className="uu-magazine-no-data">No magazines found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
