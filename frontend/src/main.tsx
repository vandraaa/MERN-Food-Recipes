import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./components/routes/route";
import Fallback from "./components/protected/Fallback";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);