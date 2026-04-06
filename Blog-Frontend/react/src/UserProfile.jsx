import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserRoleGuard from "./components/UserRoleGuard";

function UserProfile() {
  return (
    <UserRoleGuard role="USER">
      <div className="page profile-page">
        <section className="hero">
          <h1>User Profile</h1>
          <p>Browse articles and open complete post details.</p>
        </section>

        <div className="profile-nav">
          <NavLink to="articles">Articles</NavLink>
        </div>

        <div className="profile-content">
          <Outlet />
        </div>
      </div>
    </UserRoleGuard>
  );
}

export default UserProfile;
