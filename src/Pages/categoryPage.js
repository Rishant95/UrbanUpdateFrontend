import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImageUrl, useFetch } from "../Hooks/useFetch";
import "../PagesCss/categoryPage.css";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";

export default function CategoryPage() {
  const { collection } = useParams();
  const { loading, error, data } = useFetch(collection);
  const {
    data: recentNewsData,
    loading: recentNewsLoading,
    error: recentNewsError,
  } = useFetch("Recent News"); // Fetch recent news using useFetch
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");

  useEffect(() => {
    if (data && data.data) {
      let sortedArticles = [...data.data];
      if (sortOrder === "recent") {
        sortedArticles.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
      } else if (sortOrder === "title") {
        sortedArticles.sort((a, b) => a.Title.localeCompare(b.Title));
      }
      setArticles(sortedArticles);
    }
  }, [data, sortOrder]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!articles.length) {
    return <p>No articles available for {collection}</p>;
  }

  return (
    <div>
      <MinimizedHeader />
      <div className="CategoryPage-category">
        <h1 className="CategoryPage-Heading-category">{collection}</h1>
        <hr className="CategoryPage-Styled-hr-category" />

        {/* Sorting Options */}
        <div className="Category-Sorting-category">
          <label htmlFor="sortOrder">Sort By:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="Category-Sort-Select-category"
          >
            <option value="recent">Most Recent</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>

        <div className="News-Layout-category">
          <div className="Main-Column-category">
            {articles.map((article, index) => {
              const imageUrl = getImageUrl(article);
              const shortDescription =
                article.Description?.[0]?.children?.[0]?.text?.slice(0, 120) ||
                "";

              // Randomly change the layout after every 4 articles
              const isAlternateLayout = index % 5 === 0; // Change layout every 4th article
              const isRandomMargin = index % 5 === 0; // Random margin for every 5th article

              return (
                <Link
                  to={`/detail/${collection}/${article.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    key={article.id}
                    className={`Article-Card-category Main-Article ${
                      isAlternateLayout ? "alternate-layout" : ""
                    } ${isRandomMargin ? "random-margin" : ""}`}
                  >
                    {/* Image */}
                    <div
                      className={`Article-Image-Container-category ${
                        isAlternateLayout ? "image-right" : ""
                      }`}
                    >
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={article.Title}
                          className="Article-Image-Category-category"
                          onError={(e) => {
                            e.target.src =
                              "https://yourapi.com/path-to-placeholder-image.jpg";
                          }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="Article-Content-category">
                      <h2 className="Article-Title-category">
                        {article.Title}
                      </h2>
                      <p className="Article-Date-category">
                        {new Date(article.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="Article-Description-category">
                        {shortDescription}...
                      </p>
                      <a
                        href={`/detail/${collection}/${article.id}`}
                        className="Article-Link-category"
                      >
                        Read Full Story
                      </a>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Sidebar - Recent News */}
          <div className="Sidebar-Column-category">
            <h3 className="Sidebar-Heading-category">Recent News</h3>
            <div className="Recent-News">
              {recentNewsLoading ? (
                <div className="loader-container">
                  <div className="spinner"></div>
                </div>
              ) : recentNewsError ? (
                <p>Error: {recentNewsError.message}</p>
              ) : (
                recentNewsData?.data?.slice(0, 5).map((news) => {
                  const shortDescription =
                    news.Description?.[0]?.children?.[0]?.text?.slice(0, 120) ||
                    "";

                  return (
                    <Link
                      to={`/detail/${collection}/${news.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {" "}
                      <div
                        key={news.id}
                        className="Article-Card-category Sidebar-Article"
                      >
                        {/* Content */}
                        <div className="Article-Content-category">
                          <h4 className="Article-Title-category">
                            {news.Title}
                          </h4>
                          <p className="Article-Date-category">
                            {new Date(news.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <p className="Article-Description-category">
                            {shortDescription}...
                          </p>
                          <a
                            href={`/detail/Recent News/${news.id}`}
                            className="Article-Link-category"
                          >
                            Read Full Story
                          </a>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
