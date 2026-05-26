import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const onLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/common-api/logout`, { withCredentials: true });
    } catch {
      // local cleanup is enough to logout from UI state
    }
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="brand-logo">
        {user?.profileImageUrl ? (
          <img src={user.profileImageUrl} alt="Profile" className="profile-avatar" />
        ) : (
          <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f465.png" alt="People Logo" className="logo-img" />
        )}
        <h1 className="brand">BlogApp</h1>
      </div>

      <nav className="topnav">
        <Link to="/">Home</Link>
        {!user ? <Link to="/login">Login</Link> : null}
        {!user ? <Link to="/register">Register</Link> : null}

        {user?.role === "USER" ? <Link to="/user-profile">User Profile</Link> : null}
        {user?.role === "AUTHOR" ? <Link to="/author-profile">Author Profile</Link> : null}
        {user?.role === "ADMIN" ? <Link to="/admin-profile">Admin Profile</Link> : null}

        {user ? (
          <button type="button" className="btn-link" onClick={onLogout}>
            Logout
          </button>
        ) : null}
      </nav>
    </header>
  );
}

export default Header;