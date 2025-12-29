import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    appType: "custom",
    server: {
        middlewareMode: true
    },
    build: {
        outDir: "dist/static",
        rollupOptions: {
            input: path.resolve(__dirname, "client.ts"),
            output: {
                entryFileNames: "client.js"
            }
        }
    }
});