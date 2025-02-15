import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
    dotenv.config();


    return {
        plugins: [react(), tsconfigPaths()],
        server: {
            proxy: {
                '/api': {
                    target: "https://ifbshare-back.onrender.com",
                    changeOrigin: true,
                    secure: false,
                },
            },
            port: 3000,
        },
    };
});
