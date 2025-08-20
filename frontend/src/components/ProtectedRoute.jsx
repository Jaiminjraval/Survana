import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// This is a placeholder hook for your real authentication logic.
const useAuth = () => {
  // In a real application, you would check for a valid token in localStorage,
  // or check a global state from a Context API or Redux.
  const isAuthenticated = true; // <-- CHANGE THIS TO `false` TO TEST THE REDIRECT

  if (isAuthenticated) {
    return true;
  }
  return false;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
