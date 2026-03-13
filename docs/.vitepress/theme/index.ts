import DefaultTheme from 'vitepress/theme';
import './custom.css';
import Demo from './components/Demo.vue';
import type { Theme } from 'vitepress';

// Import global theme tokens (CSS custom properties on :root)
import '../../../packages/core/src/theme.css';

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', Demo);

    // Register Lit components client-side only
    if (!import.meta.env.SSR) {
      import('storybook-lit');
    }
  },
};

export default theme;
