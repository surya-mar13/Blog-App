import React, { useEffect, useState } from "react";
import axios from "axios";

function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAuthors = async () => {
    try {
      const res = await axios.get("https://backend-2-jc5u.onrender.com/admin-api/authors", { withCredentials: true });
      setAuthors(res.data?.payload || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch authors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const toggleStatus = async (authorId, isActive) => {
    const url = isActive
      ? "https://backend-2-jc5u.onrender.com/admin-api/blockUsers"
      : "https://backend-2-jc5u.onrender.com/admin-api/unblockUsers";

    try {
      await axios.put(url, { userId: authorId }, { withCredentials: true });
      await loadAuthors();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update author status");
    }
  };

  if (loading) return <section className="auth-card">Loading authors...</section>;

  return (
    <section className="auth-card wide-card">
      <h2>AuthorsList</h2>
      {error ? <p className="error">{error}</p> : null}
      <div className="table-list">
        {authors.map((author) => (
          <div key={author._id} className="table-row">
            <div>
              <strong>{author.firstName} {author.lastName}</strong>
              <p className="file-help">{author.email}</p>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => toggleStatus(author._id, author.isActive)}
            >
              {author.isActive ? "Block" : "Unblock"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AuthorsList;
