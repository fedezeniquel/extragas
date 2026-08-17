import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Extragas · Control de Stock',
        short_name: 'Extragas',
        description: 'Control de stock diario de garrafas Extragas',
        theme_color: '#0B101D',
        background_color: '#0B101D',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [],
      },
    }),
  ],
})
