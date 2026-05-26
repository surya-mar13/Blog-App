import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin-api/users`, { withCredentials: true });
      setUsers(res.data?.payload || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleStatus = async (userId, isActive) => {
    const url = isActive
      ? `${API_BASE_URL}/admin-api/blockUsers`
      : `${API_BASE_URL}/admin-api/unblockUsers`;

    try {
      await axios.put(url, { userId }, { withCredentials: true });
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user status");
    }
  };

  if (loading) return <section className="auth-card">Loading users...</section>;

  return (
    <section className="auth-card wide-card">
      <h2>UsersList</h2>
      {error ? <p className="error">{error}</p> : null}
      <div className="table-list">
        {users.map((user) => (
          <div key={user._id} className="table-row">
            <div>
              <strong>{user.firstName} {user.lastName}</strong>
              <p className="file-help">{user.email}</p>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => toggleStatus(user._id, user.isActive)}
            >
              {user.isActive ? "Block" : "Unblock"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UsersList;
