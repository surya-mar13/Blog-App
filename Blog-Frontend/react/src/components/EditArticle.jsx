import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserRoleGuard from "./UserRoleGuard";

function EditArticle() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { articleId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/common-api/article/${articleId}`, {
          withCredentials: true,
        });
        const article = res.data?.payload;
        setTitle(article?.title || "");
        setCategory(article?.category || "");
        setContent(article?.content || "");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  const onEditArticle = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await axios.put(
        `http://localhost:4000/author-api/article/${articleId}`,
        {
          author: user?._id,
          title,
          category,
          content,
        },
        { withCredentials: true }
      );
      setSuccess("Article updated successfully.");
      setTimeout(() => navigate(`/article/${articleId}`), 500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update article");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="page"><section className="auth-card">Loading...</section></div>;

  return (
    <UserRoleGuard role="AUTHOR">
      <div className="page">
        <section className="auth-card wide-card">
          <h2>EditArticle</h2>
          <form onSubmit={onEditArticle}>
            <div className="field">
              <label>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="field">
              <label>Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>

            <div className="field">
              <label>Content</label>
              <textarea
                className="text-area"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {error ? <p className="error">{error}</p> : null}
            {success ? <p className="success">{success}</p> : null}

            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </section>
      </div>
    </UserRoleGuard>
  );
}

export default EditArticle;
