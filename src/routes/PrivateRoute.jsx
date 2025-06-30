import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    
  const token = localStorage.getItem("token"); // ✅ Auth check
  const user = localStorage.getItem("user_type");

  return token && user == 2 ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
