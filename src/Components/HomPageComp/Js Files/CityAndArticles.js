import "../Css Files/CityAndArticles.css";
import useFetch from "../../../Hooks/useFetch";

function CityAndArticles() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/city-images"
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  const City = data.data[0]; // Access the first item in the array

  return (
    <div className="City-Heading">
      <div className="City-Container">
        <div className="City-item">
          <div className="Cityimage-container">
            <h1>City Images</h1>
            <hr className="Styled-hr" />
            {City.attributes.ImageUrl && (
              <img
                src={City.attributes.ImageUrl}
                alt={City.attributes.Title}
                className="Cover-Story-image"
              />
            )}
            <div className="City-text-overlay">
              <p className="City-date">
                {new Date(City.attributes.updatedAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
              <h2>{City.attributes.Title}</h2>
            </div>
          </div>
        </div>
        <div className="Articles-content">
          <h1>Articles</h1>
          <hr className="Styled-hr" />
          <Articles />
        </div>
      </div>
    </div>
  );
}

function Articles() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/articles"
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="Articles-Additional-Articles">
      {data.data.slice(0, 2).map((article, index) => (
        <div key={article.id} className="Article">
          {index === 0 && article.attributes.ImageUrl && (
            <div className="Article-Image">
              <img
                src={article.attributes.ImageUrl}
                alt={article.attributes.Title}
                className="Article-Image-Img"
              />
            </div>
          )}
          <div className="Article-Content">
            <p className="Article-date">
              {new Date(article.attributes.updatedAt).toLocaleDateString(
                "en-US",
                {
                  month: "long", // Full month name
                  year: "numeric", // Year
                }
              )}
            </p>
            <h2 className="Article-title">{article.attributes.Title}</h2>
            {/* Conditionally render description */}
            {index !== 0 &&
              article.attributes.Description.map((desc, index) => (
                <p className="Article-text" key={index}>
                  {desc.children[0].text}
                </p>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CityAndArticles;
