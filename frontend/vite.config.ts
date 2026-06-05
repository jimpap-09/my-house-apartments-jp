import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://nkdjf5sn-5000.euw.devtunnels.ms',
        changeOrigin: true,
      },
      '/remult': {
        target: 'https://nkdjf5sn-5000.euw.devtunnels.ms',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/remult/, ''),
      },
    },
  }})