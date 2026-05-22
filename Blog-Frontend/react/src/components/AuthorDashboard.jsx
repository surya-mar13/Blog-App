import { useEffect, useState } from "react";
import axios from "axios";

function AuthorDashboard() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [articles, setArticles] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const authorId = user?._id;

  const loadAuthorArticles = async () => {
    if (!authorId) return;
    try {
      const res = await axios.get(`https://backend-2-jc5u.onrender.com/author-api/articles/${authorId}`);
      setArticles(res.data?.payload || []);
    } catch {
      setArticles([]);
    }
  };

  useEffect(() => {
    loadAuthorArticles();
  }, []);

  const onCreateArticle = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!authorId) {
      setError("Please login as author first.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://backend-2-jc5u.onrender.com/author-api/article", {
        author: authorId,
        title,
        category,
        content,
      });
      setSuccess("Article created successfully.");
      setTitle("");
      setCategory("");
      setContent("");
      await loadAuthorArticles();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page author-page">
      <section className="hero">
        <h1>Author Dashboard</h1>
        <p>Create and manage your articles.</p>
      </section>

      <div className="author-grid">
        <section className="auth-card">
          <h2>Add Article</h2>
          <form onSubmit={onCreateArticle}>
            <div className="field">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Content</label>
              <textarea
                className="text-area"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                required
              />
            </div>

            {error ? <p className="error">{error}</p> : null}
            {success ? <p className="success">{success}</p> : null}

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Publishing..." : "Publish Article"}
            </button>
          </form>
        </section>

        <section className="auth-card">
          <h2>Your Articles</h2>
          {articles.length === 0 ? (
            <p className="file-help">No articles yet. Publish your first one.</p>
          ) : (
            <div className="article-list">
              {articles.map((article) => (
                <article key={article._id} className="article-item">
                  <h3>{article.title}</h3>
                  <p className="article-meta">{article.category}</p>
                  <p>{article.content}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AuthorDashboard;
