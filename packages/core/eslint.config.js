import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import litPlugin from 'eslint-plugin-lit';
import wcPlugin from 'eslint-plugin-wc';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    wcPlugin.configs['flat/recommended'],
    litPlugin.configs['flat/recommended'],
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            'storybook-static/**',
            'vite.config.ts',
            '.storybook/**',
            'vitest.setup.ts',
        ],
    },
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
        }
    }
);
