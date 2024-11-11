import { lazy } from "react";
import ProtectedRoute from "../protected/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import { useRoutes } from "react-router-dom";

const HomePage = lazy(() => import("../../pages/Home/Home"));
const SignIn = lazy(() => import("../../pages/Auth/Sign-in"));
const SignUp = lazy(() => import("../../pages/Auth/Sign-up"));
const PageNotFound = lazy(() => import("../../pages/Error/404"));
const ProfilePage = lazy(() => import("../../pages/Profile/Profile"));

const RoutesProvider = () => {
  const { isAuthenticated } = useAuth();

  const routes = [
    {
      path: "/",
      element: <HomePage />,
      errorElement: <PageNotFound />,
    },
    {
      path: "/sign-in",
      element: (
        <ProtectedRoute
          element={<SignIn />}
          isAllowed={!isAuthenticated}
          redirectTo="/profile"
        />
      ),
    },
    {
      path: "/sign-up",
      element: (
        <ProtectedRoute
          element={<SignUp />}
          isAllowed={!isAuthenticated}
          redirectTo="/profile"
        />
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute
          element={<ProfilePage />}
          isAllowed={isAuthenticated}
          redirectTo="/sign-in"
        />
      ),
    },
  ];

  return useRoutes(routes);
};

export default RoutesProvider;