import { defineConfig } from 'vitepress';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sidebar = JSON.parse(readFileSync(resolve(__dirname, 'sidebar.json'), 'utf-8'));

export default defineConfig({
  base: '/flint-ui/',
  title: 'Flint UI 🔥',
  description: 'Documentation for Flint UI web components',
  appearance: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { property: 'og:title', content: 'Flint UI' }],
    ['meta', { property: 'og:description', content: 'A comprehensive set of accessible, customizable web components built with LitElement.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://getufy.github.io/flint-ui' }],
    ['meta', { property: 'og:site_name', content: 'Flint UI' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'Flint UI' }],
    ['meta', { name: 'twitter:description', content: 'A comprehensive set of accessible, customizable web components built with LitElement.' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/getting-started' },
      { text: 'Components', link: '/components/button' },
      { text: 'React', link: '/react' },
      { text: 'Storybook', link: 'https://getufy.github.io/flint-ui/storybook/' },
    ],
    sidebar: {
      '/components/': sidebar,
      '/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/getting-started' },
            { text: 'Theming', link: '/theming' },
            { text: 'React', link: '/react' },
            { text: 'SSR', link: '/ssr' },
            { text: 'Next.js', link: '/guides/nextjs' },
            { text: 'Framework Integration', link: '/guides/frameworks' },
            { text: 'Accessibility', link: '/accessibility' },
            { text: 'Browser Support', link: '/browser-support' },
            { text: 'FAQ', link: '/faq' },
          ],
        },
      ],
    },
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/getufy/flint-ui' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@getufy/flint-ui' },
    ],
  },
  vite: {
    resolve: {
      alias: {
        '@getufy/flint-ui': resolve(__dirname, '../../packages/core/src/index.ts'),
      },
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('flint-'),
      },
    },
  },
});
