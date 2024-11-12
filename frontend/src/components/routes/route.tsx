import ProtectedRoute from "../protected/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import { useRoutes } from "react-router-dom";

import HomePage from "../../pages/Home/Home";
import SignIn from "../../pages/Auth/Sign-in";
import SignUp from "../../pages/Auth/Sign-up";
import PageNotFound from "../../pages/Error/404";
import ProfilePage from "../../pages/Profile/Profile";
import DashboardPage from "../../pages/Dashboard/Dashboard";

const RoutesProvider = () => {
  const { isAuthenticated, role } = useAuth();

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
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute
          element={<DashboardPage />}
          isAllowed={isAuthenticated && (role === "author" || role === "admin")}
          redirectTo="/"
        />
      ),
    },
  ];

  return useRoutes(routes);
};

export default RoutesProvider;