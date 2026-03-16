/**
 * CDN build configuration.
 *
 * Produces IIFE bundles at:
 *   dist/flint-ui.iife.js      (unminified, for debugging)
 *   dist/flint-ui.iife.min.js  (minified, for production)
 *
 * Suitable for loading via jsDelivr, unpkg, or a plain <script> tag:
 *   <script src="https://cdn.jsdelivr.net/npm/@getufy/flint-ui/dist/flint-ui.iife.min.js"></script>
 *
 * Usage:
 *   npm run build:cdn    (from packages/core)
 */
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'es2022',
        outDir: 'dist',
        emptyOutDir: false,
        lib: {
            entry: 'src/index.ts',
            name: 'FlintUI',
            formats: ['iife'],
            fileName: () => 'flint-ui.iife.min.js',
        },
        rolldownOptions: {
            output: {
                // Inline lit into the IIFE bundle so it works standalone
            },
        },
        minify: 'esbuild',
    },
});
