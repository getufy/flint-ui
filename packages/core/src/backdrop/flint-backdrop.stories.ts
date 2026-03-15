import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-backdrop';
import { FlintBackdrop } from './flint-backdrop';
import '../button/flint-button';
import '../paper/flint-paper';

const meta: Meta = {
  title: 'Feedback/Backdrop',
  component: 'flint-backdrop',
  parameters: {
      docs: {
            description: {
                component: `
A backdrop component that narrows the user's focus to a particular element.

- **Tag**: \`<flint-backdrop>\`
- **Class**: \`FlintBackdrop\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`open\` | \`open\` | \`boolean\` | \`false\` | Whether the backdrop is visible and active. |
| \`invisible\` | \`invisible\` | \`boolean\` | \`false\` | When true, the backdrop overlay is transparent. |
| \`container\` | \`container\` | \`boolean\` | \`false\` | When true, the backdrop is scoped to its parent container instead of the viewport. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-backdrop-close\` | \`&#123; open: false &#125;\` | Dispatched when the backdrop is clicked or Escape is pressed. detail: \`&#123; open: false &#125;\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Content to display in the foreground. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-backdrop-position\` | \`fixed\` |
| \`--flint-backdrop-color\` | — |
| \`--flint-backdrop-z-index\` | — |
                `,
            },
        },
  },
  argTypes: {
    open: { control: 'boolean' },
    invisible: { control: 'boolean' },
  },
  args: {
    open: false,
    invisible: false,
  },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: (args) => html`
    <div style="height: 300px; display: flex; align-items: center; justify-content: center;">
      <flint-button @click="${() => {
      const bd = document.querySelector('flint-backdrop') as FlintBackdrop;
      if (bd) bd.open = true;
    }}">
        Show Backdrop
      </flint-button>

      <flint-backdrop 
        .open=${args.open} 
        .invisible=${args.invisible}
        @flint-backdrop-close="${(e: Event) => {
      (e.target as FlintBackdrop).open = false;
    }}"
      >
        <flint-paper elevation="2" style="padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <h3 style="margin: 0; font-family: sans-serif;">Focused Content</h3>
          <p style="margin: 0; color: #666;">Click outside this box to close</p>
          <flint-button variant="secondary" @click="${(e: Event) => {
      const bd = (e.target as HTMLElement).closest('flint-backdrop') as FlintBackdrop;
      if (bd) bd.open = false;
    }}">
            Close Manually
          </flint-button>
        </flint-paper>
      </flint-backdrop>
    </div>
  `,
};

export const LoadingIndicator: Story = {
  render: (args) => html`
    <div style="height: 300px; display: flex; align-items: center; justify-content: center;">
      <flint-button @click="${() => {
      const bd = document.getElementById('loading-bd') as FlintBackdrop;
      if (bd) bd.open = true;

      // Auto-close after 3 seconds for demo
      setTimeout(() => {
        if (bd) bd.open = false;
      }, 3000);
    }}">
        Start Loading (3s)
      </flint-button>

      <flint-backdrop id="loading-bd" .open=${args.open}>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <div style="width: 48px; height: 48px; border: 4px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          <span style="color: white; font-family: sans-serif; font-weight: 500;">Please wait...</span>
        </div>
        <style>
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      </flint-backdrop>
    </div>
  `,
};

export const Invisible: Story = {
  args: {
    open: true,
    invisible: true,
  },
  render: (args) => html`
    <div style="height: 300px; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center; position: relative;">
      <p>This backdrop is invisible but still blocks interaction.</p>

      <flint-backdrop
        container
        .open=${args.open}
        .invisible=${args.invisible}
        @flint-backdrop-close="${(e: Event) => {
      alert('Captured click on invisible backdrop!');
      (e.target as FlintBackdrop).open = false;
    }}"
      >
        <flint-button variant="primary">Invisible Backdrop Active</flint-button>
      </flint-backdrop>
    </div>
  `,
};

export const ContainedBackdrop: Story = {
  render: () => html`
    <div style="height: 300px; border: 1px solid #ccc; position: relative; display: flex; align-items: center; justify-content: center;">
      <p style="font-family: sans-serif;">Backdrop is scoped to this container only.</p>
      <flint-backdrop
        container
        open
        @flint-backdrop-close="${(e: Event) => { (e.target as FlintBackdrop).open = false; }}"
      >
        <flint-paper elevation="2" style="padding: 24px;">
          <p style="margin: 0; font-family: sans-serif;">Contained content</p>
        </flint-paper>
      </flint-backdrop>
    </div>
  `,
};

export const OpenByDefault: Story = {
  args: { open: true },
  render: (args) => html`
    <div style="height: 300px; display: flex; align-items: center; justify-content: center;">
      <flint-backdrop
        .open=${args.open}
        @flint-backdrop-close="${(e: Event) => { (e.target as FlintBackdrop).open = false; }}"
      >
        <flint-paper elevation="2" style="padding: 32px; text-align: center;">
          <h3 style="margin: 0 0 8px; font-family: sans-serif;">Welcome</h3>
          <p style="margin: 0; color: #666; font-family: sans-serif;">Click outside to dismiss</p>
        </flint-paper>
      </flint-backdrop>
    </div>
  `,
};
