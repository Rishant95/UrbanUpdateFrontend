import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "../PagesCss/categoryPage.css";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";
import { getImageUrl } from "../Hooks/useFetch";

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/news-articles?filters[Title][$contains]=${query}&populate[0]=Image&pagination[page]=${currentPage}&pagination[pageSize]=${articlesPerPage}`
        );
        const result = await response.json();

        if (result.data) {
          setArticles(result.data);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchArticles();
  }, [query, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <MinimizedHeader />
      <div className="CategoryPage-category">
        <h1 className="CategoryPage-Heading-category">
          Search Results for "{query}"
        </h1>
        <hr className="CategoryPage-Styled-hr-category" />

        {articles.length === 0 ? (
          <p>No results found for "{query}".</p>
        ) : (
          <div className="News-Layout-category">
            <div className="Main-Column-category">
              {articles.map((article) => {
                const shortDescription =
                  article.Description?.[0]?.children?.[0]?.text?.slice(
                    0,
                    120
                  ) || "";
                const imageUrl = getImageUrl(article);
                return (
                  <Link
                    to={`/detail/news-articles/${article.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    key={article.id}
                  >
                    <div className="Article-Card-category">
                      {imageUrl && (
                        <div className="Article-Image-Container-category">
                          <img
                            src={imageUrl}
                            alt={article.Title}
                            className="Article-Image-Category-category"
                          />
                        </div>
                      )}
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
                          href={`/detail/news-articles/${article.id}`}
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
          </div>
        )}

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={articles.length < articlesPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
