import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1024,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules[\\/](react|react-dom|react-router|scheduler)/,
            },
            {
              name: 'vendor-motion',
              test: /node_modules[\\/]framer-motion/,
            },
            {
              name: 'vendor-gsap',
              test: /node_modules[\\/]gsap/,
            },
            {
              name: 'vendor-lottie',
              test: /node_modules[\\/]lottie-web/,
            },
            {
              name: 'lottie-walk',
              test: /loading-walk\.json/,
            },
            {
              name: 'lottie-assets',
              test: /assets[\\/]lottie/,
            },
          ],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 5173,
  },
})
