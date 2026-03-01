import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-fab';

const meta: Meta = {
    title: 'Components/FAB',
    component: 'ui-fab',
    argTypes: {
        extended: { control: 'boolean' },
        position: {
            control: { type: 'select' },
            options: ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'static'],
        },
    },
};

export default meta;

type Story = StoryObj;

export const Regular: Story = {
    args: {
        extended: false,
        position: 'static',
    },
    render: (args) => html`
    <ui-fab .extended=${args.extended} .position=${args.position}>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
    </ui-fab>
  `,
};

export const Extended: Story = {
    args: {
        extended: true,
        position: 'static',
    },
    render: (args) => html`
    <ui-fab .extended=${args.extended} .position=${args.position}>
      <svg slot="icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
      <span slot="label">Compose</span>
    </ui-fab>
  `,
};

export const Floating: Story = {
    args: {
        extended: false,
        position: 'bottom-right',
    },
    render: (args) => html`
    <div style="height: 300px; border: 1px dashed #ccc; position: relative; overflow: hidden; padding: 20px;">
      <p>The FAB is floating in the corner of its relative container (or screen).</p>
      <ui-fab .extended=${args.extended} .position=${args.position}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
      </ui-fab>
    </div>
  `,
};
