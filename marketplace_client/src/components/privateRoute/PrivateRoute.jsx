import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, isAuthenticated }) => {
  const token = localStorage.getItem("token");
  if (!token && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
