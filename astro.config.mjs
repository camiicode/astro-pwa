import { defineConfig } from 'astro/config';
import VitePWA from "@vite-pwa/astro";

export default defineConfig({
  site: 'https://tuusuario.github.io/astro-pwa/',
  base: '/astro-pwa/',
  integrations: [
    VitePWA({
      registerType: 'autoUpdate', // Se actualiza automáticamente cuando hay cambios
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst', // Prioriza la red, pero usa caché si no hay conexión
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst', // Guarda imágenes en caché para cargarlas rápido
            options: {
              cacheName: 'image-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate', // Usa caché pero actualiza en segundo plano
            options: {
              cacheName: 'assets-cache',
            },
          },
        ],
      },
      manifest: true
    }),
  ],
});
