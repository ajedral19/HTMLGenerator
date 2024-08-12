import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: "**/*.md",
  server: {
    proxy: {
      "/api": {
        target: "http://nodejs-api:9100",
        // target: "http://localhost:9100",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      }
    },
    watch: {
      usePolling: true
    },
    host: "0.0.0.0",
    strictPort: true,
    port: 3800
  }
})
