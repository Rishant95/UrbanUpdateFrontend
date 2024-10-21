import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import "../PagesCss/DetailPage.css";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";

export default function DetailPage() {
  const { collection, id } = useParams();
  const { loading, error, data } = useFetch(
    `http://localhost:1337/api/${collection}/${id}`
  );

  const [relatedArticles, setRelatedArticles] = useState([]);
  const sampleImage = "https://via.placeholder.com/800"; // Sample image URL

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/${collection}`);
        const result = await response.json();
        setRelatedArticles(result.data);
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

  if (!data || !data.data) {
    return <p>No data available</p>;
  }

  const { Title, Description, createdAt, ImageUrl } = data.data;

  return (
    <div>
      <MinimizedHeader />
      <div className="detail-page">
        <h1 className="detail-title">{Title}</h1>
        <p className="detail-date">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <img
          src={ImageUrl || sampleImage}
          alt={Title}
          className="detail-image"
        />

        <div className="detail-description">
          {Description.map((para, index) => (
            <p key={index}>{para.children[0].text}</p>
          ))}
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
          <hr></hr>
          <ul>
            {relatedArticles.map((article) => (
              <li key={article.id}>
                <Link to={`../detail/${collection}/${article.id}`}>
                  {article.Title}
                </Link>
              </li>
            ))}
          </ul>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}
