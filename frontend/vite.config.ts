import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";

const env = config();
const BASE_URL = env.parsed?.BASE_URL;
const CDN_URL = env.parsed?.CDN_URL;

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	assetsInclude: "**/*.md",
	server: {
		proxy: {
			"/api": {
				target: BASE_URL,
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: (path) => path.replace(/^\/api/, "/api"),
			},
			"/html": {
				target: BASE_URL,
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: (path) => path.replace(/^\/html/, "/html"),
			},
			"/bucket/api": {
				target: BASE_URL,
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: (path) => path.replace(/^\/bucket\/api/, "/bucket/api"),
			},
			"/cdn": {
				target: CDN_URL,
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: (path) => path.replace(/^\/cdn/, "/cdn/"),
			},
		},
		watch: {
			usePolling: true,
		},
		host: "0.0.0.0",
		strictPort: true,
		port: 3800,
	},
});
