import ProtectedRoute from "../components/protected/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { useRoutes } from "react-router-dom";

import HomePage from "../pages/Home/Home";
import SignIn from "../pages/Auth/Sign-in";
import SignUp from "../pages/Auth/Sign-up";
import PageNotFound from "../pages/Error/404";
import ProfilePage from "../pages/Profile/Profile";
import DashboardPage from "../pages/Dashboard/DashboardContent/DashboardPage";
import CategoryDashboardPage from "../pages/Dashboard/CategoryContent/CategoryDashboardPage";
import ApprovedRecipeDashboardPage from "../pages/Dashboard/ApprovedRecipeContent/ApprovedRecipePage";
import PendingRecipeDashboardPage from "../pages/Dashboard/PendingRecipeContent/PendingRecipePage";
import RejectedRecipeDashboardPage from "../pages/Dashboard/RejectedRecipeContent/RejectedRecipePage";
import CreateRecipeDashboardPage from "../pages/Dashboard/CreateRecipeContent/CreateRecipePage";
import DraftRecipeDashboardPage from "../pages/Dashboard/DraftRecipeContent/DraftRecipePage";
import DetailRecipeDashboardPage from "../pages/Dashboard/DetailRecipeContent/DetailRecipeDashboardPage";
import EditRecipeDashboardPage from "../pages/Dashboard/EditRecipeContent/EditRecipePage";
import IngredientsRecipeDashboardPage from "../pages/Dashboard/IngredientsRecipeContent/IngredientsRecipePage";
import StepsRecipeDashboardPage from "../pages/Dashboard/StepsRecipeContent/StepsRecipePage";

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
    {
      path: "/dashboard/categories",
      element: (
        <ProtectedRoute
          element={<CategoryDashboardPage />}
          isAllowed={isAuthenticated && role === "admin"}
          redirectTo="/"
        />
      ),
    },
    {
      path: "/dashboard/create-recipe",
      element: (
        <ProtectedRoute
          element={<CreateRecipeDashboardPage />}
          isAllowed={isAuthenticated && role === "author"}
          redirectTo="/dashboard"
        />
      ),
    },
    {
      path: "/dashboard/recipe/ingredients/:id",
      element: (
        <ProtectedRoute
          element={<IngredientsRecipeDashboardPage />}
          isAllowed={isAuthenticated && role === "author"}
          redirectTo="/dashboard"
        />
      ),
    },
    {
      path: "/dashboard/recipe/steps/:id",
      element: (
        <ProtectedRoute
          element={<StepsRecipeDashboardPage />}
          isAllowed={isAuthenticated && role === "author"}
          redirectTo="/dashboard"
        />
      ),
    },
    {
      path: "/dashboard/recipe/edit/:id",
      element: (
        <ProtectedRoute
          element={<EditRecipeDashboardPage />}
          isAllowed={isAuthenticated && role === "author"}
          redirectTo="/dashboard"
        />
      ),
    },
    {
      path: "/dashboard/approved-recipes",
      element: (
        <ProtectedRoute
          element={<ApprovedRecipeDashboardPage />}
          isAllowed={isAuthenticated}
          redirectTo="/"
        />
      ),
    },
    {
      path: "/dashboard/pending-recipes",
      element: (
        <ProtectedRoute
          element={<PendingRecipeDashboardPage />}
          isAllowed={isAuthenticated}
          redirectTo="/"
        />
      ),
    },
    {
      path: "/dashboard/rejected-recipes",
      element: (
        <ProtectedRoute
          element={<RejectedRecipeDashboardPage />}
          isAllowed={isAuthenticated}
          redirectTo="/"
        />
      ),
    },
    {
      path: "/dashboard/draft-recipes",
      element: (
        <ProtectedRoute
          element={<DraftRecipeDashboardPage />}
          isAllowed={isAuthenticated && role === "author"}
          redirectTo="/dashboard"
        />
      ),
    },
    {
      path: "/dashboard/detail-recipe/:id",
      element: (
        <ProtectedRoute
          element={<DetailRecipeDashboardPage />}
          isAllowed={isAuthenticated}
          redirectTo="/dashboard"
        />
      ),
    },
  ];

  return useRoutes(routes);
};

export default RoutesProvider;