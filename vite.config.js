import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "pwa-192.png",
        "pwa-512.png",
        "pwa-maskable.png",
      ],
      manifest: {
        name: "Casamento Josué & Gabrielly",
        short_name: "Josué & Gaby",
        description: "Convite de Casamento - Josué e Gabrielly",
        theme_color: "#fdfcf8",
        background_color: "#fdfcf8",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "pwa-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin.includes("supabase.co"),
            handler: "NetworkFirst",
            options: {
              cacheName: "supabase-data",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
        ],
      },
    }),
  ],
});
