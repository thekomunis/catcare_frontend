import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    historyApiFallback: true,
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["cat-icon.svg", "cat-icon-192.png", "cat-icon-512.png"],
      manifest: {
        name: "CatCare",
        short_name: "CatCare",
        description: "Aplikasi diagnosis penyakit kucing",
        start_url: "/",
        display: "standalone",
        theme_color: "#3B82F6",
        background_color: "#FFFFFF",
        icons: [
          {
            src: "cat-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "cat-icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
