import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/index.css";
import App from "@/app/App.tsx";
import { ProviderQuery } from "@/app/providers/ProviderQuery";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderQuery>
      <App />
    </ProviderQuery>
  </StrictMode>
);
