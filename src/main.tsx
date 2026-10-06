import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/index.css";
import { ProviderQuery } from "@/app/providers/ProviderQuery";
import { ProviderRouter } from "./app/providers/RouterProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderQuery>
      <ProviderRouter />
    </ProviderQuery>
  </StrictMode>
);
