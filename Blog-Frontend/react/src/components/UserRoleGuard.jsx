import React from "react";
import { Navigate } from "react-router-dom";

function UserRoleGuard({ role, children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;

  return children;
}

export default UserRoleGuard;
