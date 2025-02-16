import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getImageUrl, useFetch } from "../Hooks/useFetch";
import "../PagesCss/categoryPage.css";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";

export default function CategoryPage() {
  const { collection } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10; // Adjust this number based on your preference

  const { loading, error, data } = useFetch(
    collection,
    currentPage,
    articlesPerPage
  );
  const {
    data: recentNewsData,
    loading: recentNewsLoading,
    error: recentNewsError,
  } = useFetch("Recent News", 1, 5); // You can keep the recent news with a fixed page size

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      setArticles(data.data);
    }
  }, [data]);

  // Handle pagination for articles
  const handleArticleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleArticlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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
            value="recent"
            onChange={() => {}}
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

              // Random layout logic
              const randomNumber = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
              const isAlternateLayout = index % randomNumber === 0;
              const isRandomMargin = index % 5 === 0;

              return (
                <Link
                  to={`/detail/${collection}/${article.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={article.id}
                >
                  <div
                    className={`Article-Card-category ${
                      isAlternateLayout ? "alternate-layout" : ""
                    } ${isRandomMargin ? "random-margin" : ""}`}
                  >
                    {isAlternateLayout ? (
                      <div className="Alternate-Layout-Newspaper">
                        <div className="Alternate-Image-Container">
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt={article.Title}
                              className="Alternate-Image"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="Alternate-Content">
                          <h1 className="Alternate-Title">{article.Title}</h1>
                          <p className="Alternate-Date">
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
                          <p className="Alternate-Description">
                            {shortDescription}...
                          </p>
                          <a
                            href={`/detail/${collection}/${article.id}`}
                            className="Alternate-Link"
                          >
                            Read Full Story
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="Article-Image-Container-category">
                          {imageUrl && (
                            <img
                              src={imageUrl}
                              alt={article.Title}
                              className="Article-Image-Category-category"
                            />
                          )}
                        </div>
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
                    )}
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
                      key={news.id}
                    >
                      <div className="Sidebar-Article">
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

        {/* Pagination Controls for Articles */}
        <div className="pagination-controls">
          <button onClick={handleArticlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={handleArticleNextPage}
            disabled={articles.length < articlesPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
