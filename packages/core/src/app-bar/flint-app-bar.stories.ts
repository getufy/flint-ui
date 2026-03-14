import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-app-bar';
import '../button/flint-button';

const meta: Meta = {
    title: 'Navigation/App Bar',
    component: 'flint-app-bar',
    parameters: {
        docs: {
            description: {
                component: `
flint-app-bar: The top App bar provides content and actions related to the current screen.

- **Tag**: \`<flint-app-bar>\`
- **Class**: \`FlintAppBar\`

#### Properties

| Property | Attribute | Type | Default |
|---|---|---|---|
| \`title\` | \`title\` | \`string\` | \`''\` |
| \`position\` | \`position\` | \`'static' \\| 'fixed' \\| 'absolute' \\| 'sticky'\` | \`'static'\` |
| \`variant\` | \`variant\` | \`'regular' \\| 'outlined'\` | \`'regular'\` |

#### Slots

| Name | Description |
|---|---|
| \`navigation\` |  |
| \`title\` |  |
| \`actions\` |  |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-app-bar-height\` | — |
| \`--flint-app-bar-bg\` | — |
| \`--flint-app-bar-color\` | — |
| \`--flint-app-bar-shadow\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-shadow-md\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-text-color\` | — |
| \`--flint-border-color\` | — |
| \`--flint-font-family\` | — |
                `,
            },
        },
    },
    argTypes: {
        title: { control: 'text' },
        position: {
            control: 'select',
            options: ['static', 'fixed', 'absolute', 'sticky'],
        },
        variant: {
            control: 'select',
            options: ['regular', 'outlined'],
        },
    },
    args: {
        title: 'News Feed',
        position: 'static',
        variant: 'regular',
    },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
    render: (args) => html`
    <flint-app-bar .title=${args.title} .position=${args.position} .variant=${args.variant}>
      <flint-button slot="navigation" variant="secondary" style="--flint-secondary-color: transparent; color: white;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </flint-button>
      
      <div slot="actions" style="display: flex; gap: 8px;">
        <flint-button variant="secondary" style="--flint-secondary-color: transparent; color: white;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </flint-button>
        <flint-button variant="secondary" style="--flint-secondary-color: transparent; color: white;">Login</flint-button>
      </div>
    </flint-app-bar>
  `,
};

export const Outlined: Story = {
    args: {
        title: 'Brand Title',
        variant: 'outlined',
    },
    render: (args) => html`
    <flint-app-bar .title=${args.title} .position=${args.position} .variant=${args.variant}>
      <flint-button slot="navigation" variant="secondary" style="--flint-secondary-color: transparent;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </flint-button>
    </flint-app-bar>
  `,
};

export const WithTitleSlot: Story = {
    render: () => html`
    <flint-app-bar variant="outlined">
      <flint-button slot="navigation" variant="secondary" style="--flint-secondary-color: transparent;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </flint-button>
      <div slot="title" style="display: flex; align-items: center; gap: 8px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b82f6">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
        <span style="font-weight: 700; font-size: 1.1rem;">Brand</span>
        <span style="font-size: 0.75rem; color: #6b7280; font-weight: 400;">v2.0</span>
      </div>
    </flint-app-bar>
  `,
};

export const Sticky: Story = {
    args: { title: 'Sticky App Bar', position: 'sticky' },
    render: (args) => html`
    <div style="height: 300px; overflow-y: auto; border: 1px solid #ccc; position: relative;">
      <flint-app-bar .title=${args.title} .position=${args.position} .variant=${args.variant}>
        <flint-button slot="navigation" variant="secondary" style="--flint-secondary-color: transparent; color: white;">Menu</flint-button>
      </flint-app-bar>
      <div style="padding: 16px; height: 1000px; background: linear-gradient(white, #f0f0f0);">
        <p>Scroll down to see the app bar stay at the top...</p>
        ${Array.from({ length: 20 }).map(() => html`<p>Some content line...</p>`)}
      </div>
    </div>
  `,
};

export const TitleOnly: Story = {
    args: { title: 'Simple Title' },
    render: (args) => html`
    <flint-app-bar .title=${args.title} .variant=${args.variant}></flint-app-bar>
  `,
};

export const WithMultipleActions: Story = {
    args: { title: 'Dashboard' },
    render: (args) => html`
    <flint-app-bar .title=${args.title} .variant=${args.variant}>
      <flint-button slot="navigation" variant="secondary" style="--flint-secondary-color: transparent; color: white;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </flint-button>
      <div slot="actions" style="display: flex; gap: 8px;">
        <flint-button variant="secondary" size="small" style="--flint-secondary-color: transparent; color: white;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </flint-button>
        <flint-button variant="secondary" size="small" style="--flint-secondary-color: transparent; color: white;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </flint-button>
        <flint-button variant="secondary" size="small" style="--flint-secondary-color: transparent; color: white;">Profile</flint-button>
      </div>
    </flint-app-bar>
  `,
};
