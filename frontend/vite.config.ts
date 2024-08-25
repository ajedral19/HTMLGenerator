import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";

const env = config();
const BASE_URL = env.parsed?.BASE_URL;
console.log(BASE_URL);

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
		},
		watch: {
			usePolling: true,
		},
		host: "0.0.0.0",
		strictPort: true,
		port: 3800,
	},
});
