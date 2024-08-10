import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude:"**/*.md",
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 3800
  }
})
