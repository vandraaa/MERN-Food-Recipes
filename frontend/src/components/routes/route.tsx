import { jwtDecode } from "jwt-decode";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { getToken } from "../../pages/Auth/lib/service";
import ProtectedRoute from "../protected/ProtectedRoute";

const HomePage = lazy(() => import("../../pages/Home/Home"));
const SignIn = lazy(() => import("../../pages/Auth/Sign-in"));
const SignUp = lazy(() => import("../../pages/Auth/Sign-up"));
const PageNotFound = lazy(() => import("../../pages/Error/404"));
const ProfilePage = lazy(() => import("../../pages/Profile/Profile"));

const isLoggedIn = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const isTokenExpired = new Date((decoded.exp ?? 0) * 1000) < new Date();
    return !isTokenExpired;
  } catch {
    return false;
  }
};

const routes: RouteObject[] = [
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
        isAllowed={!isLoggedIn()}
        redirectTo="/profile"
      />
    ),
  },
  {
    path: "/sign-up",
    element: (
      <ProtectedRoute
        element={<SignUp />}
        isAllowed={!isLoggedIn()}
        redirectTo="/profile"
      />
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute
        element={<ProfilePage />}
        isAllowed={isLoggedIn()}
        redirectTo="/sign-in"
      />
    ),
  },
];

export default routes;
