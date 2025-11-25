import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/router.jsx";
import AuthProviders from "./contexts/Providers/AuthProviders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <RouterProvider router={router}></RouterProvider>
      </AuthProviders>
    </QueryClientProvider>
  </StrictMode>
);
