import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Green API",
        short_name: "Green API",
        description: "Test task from Green API company",
        theme_color: "#ffffff",
        lang: "ru",
        start_url: "/",
        icons: [
          { purpose: "maskable", sizes: "512x512", src: "icon512_maskable.png", type: "image/png" },
          { purpose: "any", sizes: "512x512", src: "icon512_rounded.png", type: "image/png" }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@shared": path.resolve(__dirname, "src/shared")
    }
  },
  define: {
    "process.env": process.env
  },
  envPrefix: ["VITE_", "BASE_"]
});
