import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserRoleGuard from "./UserRoleGuard";

function AdminProfile() {
  return (
    <UserRoleGuard role="ADMIN">
      <div className="page profile-page">
        <section className="hero">
          <h1>Admin Profile</h1>
          <p>Review users and authors from one place.</p>
        </section>

        <div className="profile-nav">
          <NavLink to="users-list">UsersList</NavLink>
          <NavLink to="authors-list">AuthorsList</NavLink>
        </div>

        <div className="profile-content">
          <Outlet />
        </div>
      </div>
    </UserRoleGuard>
  );
}

export default AdminProfile;
