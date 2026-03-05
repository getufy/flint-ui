import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    root: __dirname,
    esbuild: {
        jsx: 'automatic',
        jsxImportSource: 'react',
    },
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    build: {
        outDir: resolve(__dirname, '../dist-homepage'),
        emptyOutDir: true,
    },
    server: {
        port: 5174,
        open: true,
    },
    preview: {
        port: 5175,
        open: true,
    },
});
