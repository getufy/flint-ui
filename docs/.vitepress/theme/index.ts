import DefaultTheme from 'vitepress/theme';
import './custom.css';
import Demo from './components/Demo.vue';
import Layout from './Layout.vue';
import type { Theme } from 'vitepress';

// Import global theme tokens (CSS custom properties on :root)
import '../../../packages/core/src/theme.css';

// Kick off component registration (Demo.vue awaits this)
import './register';

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Demo', Demo);
  },
};

export default theme;
