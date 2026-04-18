import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type");

  if (!token || Number(userType) !== 2) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;