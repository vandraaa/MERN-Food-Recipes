import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Fallback from "./Fallback";

interface ProtectedRouteProps {
  element: JSX.Element;
  isAllowed: boolean;
  redirectTo: string;
}

const ProtectedRoute = ({ element, isAllowed, redirectTo }: ProtectedRouteProps) => {
  const { isLoading } = useAuth();

  if (isLoading) return <Fallback />; 

  return isAllowed ? element : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
