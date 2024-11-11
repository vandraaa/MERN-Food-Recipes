import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Fallback from "./components/protected/Fallback";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import RoutesProvider from "./components/routes/route";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Suspense fallback={<Fallback />}>
            <RoutesProvider />
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
