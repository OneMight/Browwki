import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/index.css";
import { ProviderQuery } from "@/app/providers/ProviderQuery";
import { ProviderRouter } from "./app/providers/RouterProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderQuery>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ProviderRouter />
      </LocalizationProvider>
    </ProviderQuery>
  </StrictMode>
);
