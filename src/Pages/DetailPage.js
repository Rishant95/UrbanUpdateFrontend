import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getImageUrl, getMoreDetail, useFetch } from "../Hooks/useFetch";
import "../PagesCss/DetailPage.css";
import MinimizedHeader from "../Components/EventPageComp/Js/minimizedHeader";
import { FaUserCircle } from "react-icons/fa";
import LoadingPrompt from "../Components/loadingComp";

export default function DetailPage() {
  const { collection, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState({});
  const [showReplyField, setShowReplyField] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const incrementedRef = useRef(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const userName = localStorage.getItem("userName");
  const isLoggedIn = Boolean(userName);

  useEffect(() => {
    let isMounted = true;

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/comments?populate[news_article]=true&filters[news_article][id][$eq]=${id}&populate[comments]=true`
        );

        if (!response.ok) throw new Error("Failed to fetch comments");

        const commentsData = await response.json();
        if (isMounted) setComments(commentsData.data || []);
      } catch (err) {
        if (isMounted) setError("Failed to load comments. Please try again.");
      }
    };

    const fetchData = async () => {
      try {
        const result = await getMoreDetail(id);
        if (isMounted) {
          if (result.error) {
            setError("Failed to load the article. Please try again.");
          } else {
            setData(result);
            if (!incrementedRef.current) incrementedRef.current = true;
          }
        }
        fetchComments();
      } catch (err) {
        if (isMounted) setError("Error fetching article details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const {
    loading: relatedLoading,
    error: relatedError,
    data: relatedData,
  } = useFetch(collection);

  if (loading || relatedLoading) return <LoadingPrompt />;
  if (error || relatedError)
    return <p>Error: {error || relatedError?.message}</p>;
  if (!data?.data?.[0]) return <p>No article found.</p>;

  const { Title, Description, createdAt } = data.data[0];

  // Function to handle posting comments or replies
  const handleReplySubmit = async (parentId) => {
    if (!isLoggedIn) return alert("You must be logged in to reply.");
    if (!replyText[parentId]?.trim()) return alert("Reply cannot be empty!");

    try {
      const response = await fetch(`${API_BASE_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            Content: replyText[parentId],
            AuthorName: userName,
            comment: parentId, // Associates reply with the parent comment or reply
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to post the reply");

      const result = await response.json();
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                comments: [...(comment.comments || []), result.data],
              }
            : {
                ...comment,
                comments: comment.comments?.map((subComment) =>
                  subComment.id === parentId
                    ? {
                        ...subComment,
                        comments: [...(subComment.comments || []), result.data],
                      }
                    : subComment
                ),
              }
        )
      );

      setReplyText({ ...replyText, [parentId]: "" });
      setShowReplyField({ ...showReplyField, [parentId]: false });
    } catch (error) {
      alert("Error posting reply. Please try again.");
    }
  };

  return (
    <div>
      <MinimizedHeader />
      <div className="detail-page">
        <h1 className="detail-title">{Title}</h1>
        <p className="detail-date">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <img
          src={getImageUrl(data.data[0]) || "https://via.placeholder.com/800"}
          alt={Title}
          className="detail-image"
        />

        <div className="detail-description">
          {Array.isArray(Description) ? (
            Description.map((para, index) => (
              <p key={index}>
                {para.children?.map((child) => child.text).join(" ")}
              </p>
            ))
          ) : (
            <p>No description available</p>
          )}
        </div>

        {/* Comment Section */}
        <div className="comment-section">
          <h2>Leave a Reply</h2>

          {!isLoggedIn ? (
            <p>Please log in to leave a comment.</p>
          ) : (
            <form
              onSubmit={(e) => handleReplySubmit(id)}
              className="comment-form"
            >
              <textarea
                placeholder="Write your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              <button type="submit" className="Post-button">
                Post Comment
              </button>
            </form>
          )}

          <h3>Comments</h3>
          {comments.length > 0 ? (
            <ul className="comment-list">
              {comments.map((comment) => (
                <li key={comment.id} className="comment-card">
                  <div className="comment-content">
                    <FaUserCircle className="user-icon" />
                    <span className="comment-author">
                      {comment.AuthorName || "Anonymous"}
                    </span>
                    <p className="comment-text">{comment.Content}</p>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <button
                        className="text-btn"
                        onClick={() =>
                          setShowReplyField({
                            ...showReplyField,
                            [comment.id]: !showReplyField[comment.id],
                          })
                        }
                      >
                        Reply
                      </button>

                      {showReplyField[comment.id] && (
                        <div className="reply-section">
                          <textarea
                            placeholder="Write a reply..."
                            value={replyText[comment.id] || ""}
                            onChange={(e) =>
                              setReplyText({
                                ...replyText,
                                [comment.id]: e.target.value,
                              })
                            }
                          ></textarea>
                          <button onClick={() => handleReplySubmit(comment.id)}>
                            Post Reply
                          </button>
                        </div>
                      )}
                      <button
                        className="text-btn"
                        onClick={() =>
                          setShowReplies({
                            ...showReplies,
                            [comment.id]: !showReplies[comment.id],
                          })
                        }
                      >
                        {showReplies[comment.id]
                          ? "Hide Replies"
                          : "Show Replies"}
                      </button>
                    </div>

                    {showReplies[comment.id] &&
                      comment.comments?.map((reply) => (
                        <div key={reply.id} className="nested-reply">
                          <FaUserCircle className="user-icon" />
                          <span className="reply-author">
                            {reply.AuthorName}:
                          </span>
                          <p>{reply.Content}</p>
                        </div>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
