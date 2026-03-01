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
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (story, context) => {
      // Get the selected theme from global context
      const theme = context.globals.theme || 'light';

      // Update data attribute on the document HTML or body
      document.body.setAttribute('data-theme', theme);

      return story();
    },
  ],
};

export default preview;