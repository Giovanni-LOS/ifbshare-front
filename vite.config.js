import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        proxy: {
            '/api': {
                target: import.meta.env.VITE_API_URL || "http://localhost:5000",
                changeOrigin: true,
                secure: false,
            },
        },
        port: 3000,
    },
});
