/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        environment: 'jsdom',
        include: ['src/__benchmarks__/**/*.bench.ts'],
        benchmark: {
            include: ['src/__benchmarks__/**/*.bench.ts'],
        },
    },
});
