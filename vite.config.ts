import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import BasicSsl from "@vitejs/plugin-basic-ssl";
export default defineConfig({
  plugins: [react(), tailwindcss(), BasicSsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    port: 5173,
    host: true,
    allowedHosts: true
  }
});
