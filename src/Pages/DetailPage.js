import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getImageUrl, getMoreDetail } from "../Hooks/useFetch";
import "../PagesCss/DetailPage.css";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";

export default function DetailPage() {
  const { collection, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const sampleImage = "https://via.placeholder.com/800";

  // Fetch main article details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMoreDetail(id);
        if (result.error) {
          setError(result.error);
        } else {
          setData(result.data[0]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Fetch related articles
  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await fetch(`Recent News`);
        const result = await response.json();
        setRelatedArticles(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error("Error fetching related articles:", error);
      }
    };

    fetchRelatedArticles();
  }, [collection]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  const { Title, Description, createdAt, Image } = data;

  return (
    <div>
      <MinimizedHeader />
      <div className="detail-page">
        <h1 className="detail-title">{Title}</h1>
        <p className="detail-date">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <img
          src={getImageUrl(data) || sampleImage}
          alt={Title}
          className="detail-image"
        />

        <div className="detail-description">
          {Array.isArray(Description) ? (
            Description.map((para, index) => (
              <p key={index}>{para.children[0].text}</p>
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
            {relatedArticles.map((article) => (
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
