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
        minify: 'terser',
        cssCodeSplit: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    pages: ['./src/pages/ComponentLibraryPage.tsx', './src/pages/BlogPage.tsx', './src/pages/ContactPage.tsx'],
                    sections: ['./src/sections/Header.tsx', './src/sections/Footer.tsx'],
                },
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: ({ name }) => {
                    if (name?.endsWith('.css')) return 'css/[name]-[hash][extname]';
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
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
