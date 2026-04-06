import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserRoleGuard from "./UserRoleGuard";

function AuthorProfile() {
  return (
    <UserRoleGuard role="AUTHOR">
      <div className="page profile-page">
        <section className="hero">
          <h1>Author Profile</h1>
          <p>Write new articles, manage existing content, and edit published work.</p>
        </section>

        <div className="profile-nav">
          <NavLink to="write-article">WriteArticle</NavLink>
          <NavLink to="author-articles">AuthorArticles</NavLink>
        </div>

        <div className="profile-content">
          <Outlet />
        </div>
      </div>
    </UserRoleGuard>
  );
}

export default AuthorProfile;
