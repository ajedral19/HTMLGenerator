import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";
import { resolve } from "path";

const env = config();
const BASE_URL = env.parsed?.BASE_URL || "http://localhost:9100";
const CDN_URL = env.parsed?.CDN_URL || "d1la2pn5b8fvsr.cloudfront.net";
// const BASE_URL = "http://localhost:9100";
// const CDN_URL = "d1la2pn5b8fvsr.cloudfront.net";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	assetsInclude: "**/*.md",
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				// documentation: resolve(__dirname, "src/Pages/Documentation.tsx"),
				// templates: resolve(__dirname, "src/Pages/Templates.tsx"),
				// fiddle: resolve(__dirname, "src/Pages/Fiddle.tsx"),
			},
		},
	},
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
