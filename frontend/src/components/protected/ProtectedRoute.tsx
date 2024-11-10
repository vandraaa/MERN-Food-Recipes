import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  isAllowed: boolean;
  redirectTo: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, isAllowed, redirectTo }) => {
  return isAllowed ? element : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
