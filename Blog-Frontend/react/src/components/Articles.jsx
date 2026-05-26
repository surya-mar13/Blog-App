import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user-api/articles`, { withCredentials: true });
        setArticles(res.data?.payload || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) return <section className="auth-card">Loading articles...</section>;

  return (
    <section className="auth-card wide-card">
      <h2>Articles</h2>
      {error ? <p className="error">{error}</p> : null}
      {articles.length === 0 ? (
        <p className="file-help">No articles available yet.</p>
      ) : (
        <div className="article-list">
          {articles.map((article) => (
            <article key={article._id} className="article-item">
              <h3>{article.title}</h3>
              <p className="article-meta">{article.category}</p>
              <p>{article.content.slice(0, 180)}...</p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate(`/article/${article._id}`)}
              >
                View Article
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Articles;
