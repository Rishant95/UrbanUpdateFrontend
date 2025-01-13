import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getAuthorImageUrl,
  getImageUrl,
  getMoreDetail,
  useFetch,
} from "../Hooks/useFetch";
import "../PagesCss/DetailPage.css";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa"; // Import react-icons
import LoadingPrompt from "../Components/loadingComp";

export default function DetailPage() {
  const { collection, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]); // State for comments
  const [commentText, setCommentText] = useState(""); // State for the new comment
  const sampleImage = "https://via.placeholder.com/800";
  const authorPlaceholder = "https://via.placeholder.com/150";

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

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates if component unmounts

    const fetchComments = async (page = 1) => {
      try {
        const commentsResponse = await fetch(
          `https://admin.manofox.online/api/comments?populate[0]=news_article&filters[news_article][id][$eq]=${id}&pagination[page]=${page}`
        );

        if (!commentsResponse.ok) {
          throw new Error("Failed to fetch comments");
        }

        const commentsData = await commentsResponse.json();

        if (isMounted) {
          setComments((prevComments) => [
            ...prevComments,
            ...commentsData.data,
          ]);

          // Fetch next page if available
          if (
            commentsData.meta.pagination.page <
            commentsData.meta.pagination.pageCount
          ) {
            fetchComments(page + 1);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      }
    };

    const fetchData = async () => {
      try {
        // Fetch article details
        const result = await getMoreDetail(id);
        if (isMounted) {
          if (result.error) {
            setError(result.error);
          } else {
            setData(result);

            // Increment views only once
            if (!incrementedRef.current) {
              await incrementViews(id); // Wait for views to increment
              incrementedRef.current = true;
            }
          }
        }

        // Fetch comments
        if (isMounted) fetchComments();
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to avoid state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Fetch related articles using useFetch hook
  const {
    loading: relatedLoading,
    error: relatedError,
    data: relatedData,
  } = useFetch(collection);

  const relatedArticles = relatedData?.data || [];

  if (loading || relatedLoading) {
    return <LoadingPrompt />;
  }

  if (error || relatedError) {
    return <p>Error: {error?.message || relatedError?.message}</p>;
  }

  if (!data || !data.data || !data.data[0]) {
    return <p>No data available</p>;
  }

  const { Title, Description, createdAt } = data.data[0];

  // Check if the user is logged in
  const userName = localStorage.getItem("username"); // This assumes you store the username in localStorage after login
  const isLoggedIn = Boolean(userName);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    if (!isLoggedIn) {
      alert("You must be logged in to comment.");
      return;
    }

    if (commentText.trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }

    // Prepare the comment data
    const commentData = {
      data: {
        Comment: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: commentText, // The user's input
              },
            ],
          },
        ],
        Author: userName, // The authenticated user's name
        news_article: id, // Associate the comment with the article (ID)
      },
    };

    try {
      // Send the comment to the backend API
      const response = await fetch(
        "https://admin.manofox.online/api/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post the comment");
      }

      const result = await response.json();
      setComments([result.data, ...comments]); // Add the new comment to the top of the list
      setCommentText(""); // Clear the textarea after submission
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div>
      <MinimizedHeader />
      <div className="detail-page">
        <h1 className="detail-title Section-Titles">{Title}</h1>

        {/* Author and Share Section */}
        <div className="author-share-container">
          <div className="author-info">
            <img
              src={getAuthorImageUrl(data.data[0]) || authorPlaceholder}
              alt="Author"
              className="author-avatar"
            />
            <p className="author-name Section-Text">
              {" "}
              {data.data[0]?.author?.Name || "Unknown"}
            </p>
          </div>
          <div className="share-section">
            <span className="share-text">Share on:</span>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <p className="detail-date Section-Dates">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <img
          src={getImageUrl(data.data[0]) || sampleImage}
          alt={Title}
          className="detail-image"
        />

        <div className="detail-description Section-Text">
          {Array.isArray(Description) ? (
            Description.map((para, index) => (
              <p key={index}>{para.children[0]?.text || ""}</p>
            ))
          ) : (
            <p>{Description}</p>
          )}
        </div>
        {/* Comment Section */}
        <div className="comment-section">
          <h2>Leave a Reply</h2>
          {!isLoggedIn ? (
            <p>Please log in to leave a comment.</p>
          ) : (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                placeholder="Your comment..."
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)} // Update state as user types
              ></textarea>
              <button type="submit">Post Comment</button>
            </form>
          )}

          {/* Display Comments */}
          <h3>Comments</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src={authorPlaceholder}
                        alt="Author"
                        className="author-avatar"
                      />
                      <p>
                        <strong>{comment.Author}</strong>
                      </p>
                    </div>
                    <p className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}{" "}
                      {/* Format the date */}
                    </p>
                  </div>

                  {Array.isArray(comment.Comment) ? (
                    comment.Comment.map((para, index) => (
                      <p key={index}>{para.children[0]?.text || ""}</p>
                    ))
                  ) : (
                    <p>{comment.Comment}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

        {/* Related Articles */}
        <div className="related-articles">
          <h2>Related Articles</h2>
          <hr />
          <ul>
            {relatedArticles.slice(1).map((article) => (
              <li key={article.id}>
                <Link
                  to={`../detail/${collection}/${article.id}`}
                  className="Section-Titles"
                >
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
