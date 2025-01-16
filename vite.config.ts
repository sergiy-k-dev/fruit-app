import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://www.fruityvice.com",
        changeOrigin: true,
      },
    },
    host: true,
    port: 3000,
     watch: {
       usePolling: true
     }
  },
});
