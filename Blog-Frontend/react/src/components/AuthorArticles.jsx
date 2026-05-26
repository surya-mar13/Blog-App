import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

function AuthorArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const loadAuthorArticles = async () => {
      if (!user?._id) {
        setError("Please login as author first.");
        setLoading(false);
        return; 
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/author-api/articles/${user._id}`);
        setArticles(res.data?.payload || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch author articles");
      } finally {
        setLoading(false);
      }
    };

    loadAuthorArticles();
  }, [user?._id]);

  if (loading) return <section className="auth-card">Loading author articles...</section>;

  return (
    <section className="auth-card wide-card">
      <h2>AuthorArticles</h2>
      {error ? <p className="error">{error}</p> : null}
      {articles.length === 0 ? (
        <p className="file-help">No articles yet. Start with WriteArticle.</p>
      ) : (
        <div className="article-list">
          {articles.map((article) => (
            <article key={article._id} className="article-item">
              <h3>{article.title}</h3>
              <p className="article-meta">{article.category}</p>
              <p>{article.content.slice(0, 180)}...</p>
              <div className="row-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate(`/article/${article._id}`)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate(`/author-profile/edit-article/${article._id}`)}
                >
                  Edit
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default AuthorArticles;
