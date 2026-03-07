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

      if (theme === 'system') {
        // Remove explicit theme overrides — let @media (prefers-color-scheme) decide
        document.documentElement.classList.remove('ui-theme-light', 'ui-theme-dark');
        document.body.classList.remove('ui-theme-light', 'ui-theme-dark');
      } else {
        // Set explicit theme on <body> so .ui-theme-dark / .ui-theme-light selectors apply
        document.body.classList.remove('ui-theme-light', 'ui-theme-dark');
        document.body.classList.add(theme === 'dark' ? 'ui-theme-dark' : 'ui-theme-light');
      }

      return story();
    },
  ],
};

export default preview;
