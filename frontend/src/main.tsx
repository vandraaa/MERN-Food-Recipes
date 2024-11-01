import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/Home/Home";
import PageNotFound from "./pages/Error/404";
import SignIn from "./pages/Auth/Sign-in";
import SignUp from "./pages/Auth/Sign-up";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
