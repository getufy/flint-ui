import type { Preview } from '@storybook/web-components-vite'
import '../src/theme.css'; // Import the global styles

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
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.classList.remove('light', 'dark');
        document.body.removeAttribute('data-theme');
        document.body.classList.remove('light', 'dark');
      } else {
        // Set explicit theme on <body> so .dark / [data-theme="dark"] selectors apply
        document.body.setAttribute('data-theme', theme);
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
      }

      return story();
    },
  ],
};

export default preview;
