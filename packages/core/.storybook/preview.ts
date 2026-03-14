import type { Preview } from '@storybook/web-components-vite'
import '../src/theme.css';
import '../src/theme-dark.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo'
    }
  },

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'system', icon: 'browser', title: 'System' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      const root = document.documentElement;

      // Always clear both classes first
      root.classList.remove('flint-theme-light', 'flint-theme-dark');

      if (theme !== 'system') {
        // Explicit override — set on <html> so both the .flint-theme-dark selector
        // and the @media (prefers-color-scheme: dark) { :root:not(.flint-theme-light) }
        // fallback respond correctly.
        root.classList.add(theme === 'dark' ? 'flint-theme-dark' : 'flint-theme-light');
      }

      return story();
    },
  ],
};

export default preview;
