import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/web-components-vite",
  viteFinal(config, { configType }) {
    // Disable tree-shaking so that customElements.define() calls from
    // @customElement decorators are preserved in the production build.
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    config.build.rollupOptions.treeshake = false;

    // Set base path for GitHub Pages deployment (/flint-ui/storybook/)
    // Only for production builds — not during dev/test serving, which needs root base path
    if (process.env.CI && configType === 'PRODUCTION') {
      config.base = '/flint-ui/storybook/';
    }

    return config;
  },
};
export default config;