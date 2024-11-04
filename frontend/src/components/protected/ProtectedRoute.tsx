import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: ReactElement;
  isAllowed: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({
  element,
  isAllowed,
  redirectTo = "/sign-in",
}: ProtectedRouteProps) => {
  return isAllowed ? element : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
