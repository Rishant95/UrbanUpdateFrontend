import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getImageUrl, getMoreDetail, useFetch } from "../Hooks/useFetch";
import "../PagesCss/DetailPage.css";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";

export default function DetailPage() {
  const { collection, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sampleImage = "https://via.placeholder.com/800";

  // useRef to track if incrementViews has been called already
  const incrementedRef = useRef(false);

  const incrementViews = async (articleId) => {
    try {
      const response = await fetch(
        `https://admin.manofox.online/api/news-articles/${articleId}/increment-view`,
        {
          method: "POST", // or PUT if your API requires it
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update views");
      }

      const result = await response.json();
      return result.data.Views; // Return the updated view count from the server
    } catch (error) {
      console.error("Error incrementing views:", error);
      return null;
    }
  };

  // Fetch main article details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMoreDetail(id);

        if (result.error) {
          setError(result.error);
        } else {
          setData(result);

          // Increment views only once, based on the ref flag
          if (!incrementedRef.current) {
            incrementedRef.current = true; // Mark as incremented
          }
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // The effect depends on 'id'

  // Fetch related articles using useFetch hook
  const {
    loading: relatedLoading,
    error: relatedError,
    data: relatedData,
  } = useFetch(collection);

  const relatedArticles = relatedData?.data || [];

  if (loading || relatedLoading) {
    return <p>Loading...</p>;
  }

  if (error || relatedError) {
    return <p>Error: {error?.message || relatedError?.message}</p>;
  }

  if (!data || !data.data || !data.data[0]) {
    return <p>No data available</p>;
  }

  const { Title, Description, createdAt } = data.data[0];

  return (
    <div>
      <MinimizedHeader />
      <div className="detail-page">
        <h1 className="detail-title">{Title}</h1>
        <p className="detail-date">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <img
          src={getImageUrl(data.data[0]) || sampleImage}
          alt={Title}
          className="detail-image"
        />

        {/* Display updated view count */}
        <div className="detail-description">
          {Array.isArray(Description) ? (
            Description.map((para, index) => (
              <p key={index}>{para.children[0]?.text || ""}</p>
            ))
          ) : (
            <p>{Description}</p>
          )}
        </div>
        <div className="comment-section">
          <h2>Leave a Reply</h2>
          <form>
            <textarea placeholder="Your comment..." required></textarea>
            <button type="submit">Post Comment</button>
          </form>
        </div>
        <div className="related-articles">
          <h2>Related Articles</h2>
          <hr />
          <ul>
            {relatedArticles.slice(1).map((article) => (
              <li key={article.id}>
                <Link to={`../detail/${collection}/${article.id}`}>
                  {article.Title}
                </Link>
              </li>
            ))}
          </ul>
          <hr />
        </div>
      </div>
    </div>
  );
}
