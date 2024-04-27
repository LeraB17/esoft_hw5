import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "src"),
      "#assets": path.resolve(__dirname, "src/assets"),
      "#components": path.resolve(__dirname, "src/components"),
      "#pages": path.resolve(__dirname, "src/pages"),
      "#utils": path.resolve(__dirname, "src/utils"),
      "#router": path.resolve(__dirname, "src/router"),
      "#layouts": path.resolve(__dirname, "src/layouts"),
      "#store": path.resolve(__dirname, "src/store"),
    },
  },
});
