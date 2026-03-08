/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'StorybookLitComponent',
            fileName: format => `storybook-lit-component.${format}.js`
        },
        rollupOptions: {
            external: [/^lit/],
            output: {
                globals: {
                    lit: 'lit',
                    'lit/decorators.js': 'litDecorators',
                    'lit/directives/class-map.js': 'litClassMap',
                },
            },
        },
    },
    test: {
        coverage: {
            provider: 'v8', // or 'istanbul'
            reporter: ['text', 'html'], // include 'html' to generate HTML report
            exclude: [
                '.storybook/**',
                '**/*.css',      // Exclude plain CSS files
                '**/*.scss',     // Exclude SCSS
                '**/*.sass',     // Exclude SASS
                '**/*.less',     // Exclude LESS
                '**/*.styl',     // Exclude Stylus
                '**/*.module.css', // Exclude CSS modules
            ],
        },
        projects: [{
            extends: true,
            plugins: [
                // The plugin will run tests for the stories defined in your Storybook config
                // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                storybookTest({
                    configDir: path.join(dirname, '.storybook')
                })],
            test: {
                name: 'storybook',
                browser: {
                    enabled: true,
                    headless: true,
                    provider: playwright({}),
                    instances: [{
                        browser: 'chromium'
                    }]
                },
                setupFiles: ['.storybook/vitest.setup.ts']
            }
        },
        {
            test: {
                name: 'components',
                environment: 'jsdom',
                include: ['src/**/*.test.ts'],
                setupFiles: ['./vitest.setup.ts']
            }
        }]
    }
});