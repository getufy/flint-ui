/**
 * CDN build configuration for jsDelivr / unpkg distribution.
 *
 * Produces two self-contained bundles (Lit is inlined, no externals):
 *
 *   dist/cdn/flint-ui.es.js    — ES module for <script type="module">
 *   dist/cdn/flint-ui.iife.js  — IIFE for classic <script> (exposes window.FlintUI)
 *
 * Usage via CDN:
 *
 *   <!-- ESM (recommended) -->
 *   <script type="module">
 *     import { FlintButton } from 'https://cdn.jsdelivr.net/npm/@getufy/flint-ui/dist/cdn/flint-ui.es.js';
 *   </script>
 *
 *   <!-- IIFE (classic) -->
 *   <script src="https://cdn.jsdelivr.net/npm/@getufy/flint-ui/dist/cdn/flint-ui.iife.js"></script>
 *   <script>
 *     const { FlintButton } = window.FlintUI;
 *   </script>
 *
 *   <!-- Or simply drop in components (they self-register): -->
 *   <script src="https://unpkg.com/@getufy/flint-ui/dist/cdn/flint-ui.iife.js"></script>
 *   <flint-button variant="filled">Click me</flint-button>
 *
 * Build:  npm run build:cdn
 */
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'es2022',
        outDir: 'dist/cdn',
        emptyOutDir: true,
        sourcemap: true,
        minify: 'esbuild',
        lib: {
            entry: 'src/index.ts',
            name: 'FlintUI',
            formats: ['es', 'iife'],
            fileName: (format) => `flint-ui.${format}.js`,
        },
        // No externals — bundle everything including Lit for CDN use
        rolldownOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
    },
});
