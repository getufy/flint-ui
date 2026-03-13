import { defineConfig } from 'vitepress';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sidebar = JSON.parse(readFileSync(resolve(__dirname, 'sidebar.json'), 'utf-8'));

export default defineConfig({
  title: 'Storybook Lit',
  description: 'Documentation for Storybook Lit web components',
  base: '/docs/',
  appearance: false,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' },
    ],
    sidebar: {
      '/components/': sidebar,
    },
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nicosanma/storybook-lit' },
    ],
  },
});
