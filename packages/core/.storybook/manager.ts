import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const flintTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'Flint UI',
  brandUrl: 'https://getufy.github.io/flint-ui/',
  brandTarget: '_blank',

  // Colors (from --flint-primary-color: blue-600)
  colorPrimary: '#2563eb',
  colorSecondary: '#2563eb',

  // UI
  appBg: '#fafafa',
  appContentBg: '#ffffff',
  appBorderColor: '#e4e4e7',
  appBorderRadius: 6,

  // Typography
  fontBase: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',

  // Text
  textColor: '#0f172a',
  textMutedColor: '#71717a',

  // Toolbar
  barTextColor: '#71717a',
  barSelectedColor: '#2563eb',
  barHoverColor: '#2563eb',
  barBg: '#ffffff',

  // Form
  inputBg: '#ffffff',
  inputBorder: '#d4d4d8',
  inputTextColor: '#0f172a',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme: flintTheme,
});
