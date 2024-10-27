import React, { useEffect, useState } from "react";
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

  // Fetch main article details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMoreDetail(id);

        if (result.error) {
          setError(result.error);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Fetch related articles using useFetch hook
  const {
    loading: relatedLoading,
    error: relatedError,
    data: relatedData,
  } = useFetch(collection);

  // Check if the data for related articles is available
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
