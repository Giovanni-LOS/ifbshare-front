import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
    dotenv.config();
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react(), tsconfigPaths()],
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_URL || "http://localhost:5000",
                    changeOrigin: true,
                    secure: false,
                },
            },
            port: 3000,
        },
    };
});
