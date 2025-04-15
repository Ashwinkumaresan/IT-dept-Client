import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, tokenKey }) => {
  const token = localStorage.getItem(tokenKey);

  if (!token) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
