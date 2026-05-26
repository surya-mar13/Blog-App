import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../apiConfig";

function ArticleById() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");
  const { articleId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/common-api/article/${articleId}`, {
          withCredentials: true,
        });
        setArticle(res.data?.payload || null);
        setComments(res.data?.payload?.comments || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  const onAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      const errorMessage = "Comment cannot be empty";
      setCommentError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    if (!user?._id) {
      const errorMessage = "Please login to add comments";
      setCommentError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setSubmittingComment(true);
    setCommentError("");
    try {
      const res = await axios.post(
        `${API_BASE_URL}/user-api/comment/${articleId}`,
        {
          userId: user._id,
          comment: commentText,
        },
        { withCredentials: true }
      );
      setComments(res.data?.payload || []);
      setCommentText("");
      toast.success("Comment added");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add comment";
      setCommentError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) return <div className="page"><section className="auth-card">Loading article...</section></div>;

  return (
    <div className="page">
      <section className="auth-card wide-card">
        {error ? <p className="error">{error}</p> : null}
        {!article ? null : (
          <>
            <h2>{article.title}</h2>
            <p className="article-meta">{article.category}</p>
            <p className="file-help">
              Author: {article.author?.firstName} {article.author?.lastName}
            </p>
            <p className="article-full">{article.content}</p>

            {user?.role === "AUTHOR" && String(article.author?._id) === String(user._id) ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate(`/author-profile/edit-article/${article._id}`)}
              >
                EditArticle
              </button>
            ) : null}
          </>
        )}
      </section>

      <section className="auth-card wide-card comments-section">
        <h3>Comments ({comments.length})</h3>

        {user ? (
          <form onSubmit={onAddComment} className="comment-form">
            <div className="field">
              <label>Add your comment</label>
              <textarea
                className="text-area"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
              />
            </div>
            {commentError ? <p className="error">{commentError}</p> : null}
            <button
              type="submit"
              className="btn-primary"
              disabled={submittingComment || !commentText.trim()}
            >
              {submittingComment ? "Posting..." : "Post Comment"}
            </button>
          </form>
        ) : (
          <p className="file-help">Please <a href="/login" style={{ color: "#1f6feb", fontWeight: "600" }}>login</a> to add comments.</p>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="file-help">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((c, idx) => (
              <div key={idx} className="comment-item">
                <div className="comment-author">
                  {c.user?.profileImageUrl && (
                    <img src={c.user.profileImageUrl} alt="User" className="comment-avatar" />
                  )}
                  <strong>{c.user?.firstName} {c.user?.lastName}</strong>
                </div>
                <p className="comment-text">{c.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
export default ArticleById;
