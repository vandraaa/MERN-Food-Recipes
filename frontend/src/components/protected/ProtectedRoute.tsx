import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  element: JSX.Element;
  isAllowed: boolean;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, isAllowed, redirectTo }) => {
  const { isAuthenticated } = useAuth(); 

  if (isAllowed && !isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return element;
};

export default ProtectedRoute;
