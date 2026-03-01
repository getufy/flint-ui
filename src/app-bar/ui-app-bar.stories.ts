import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-app-bar';
import '../button/ui-button';

const meta: Meta = {
    title: 'Surfaces/App Bar',
    component: 'ui-app-bar',
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
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
    args: {
        title: 'News Feed',
        position: 'static',
        variant: 'regular',
    },
    render: (args) => html`
    <ui-app-bar .title="${args.title}" .position="${args.position}" .variant="${args.variant}">
      <ui-button slot="navigation" variant="secondary" style="--ui-secondary-color: transparent; color: white;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </ui-button>
      
      <div slot="actions" style="display: flex; gap: 8px;">
        <ui-button variant="secondary" style="--ui-secondary-color: transparent; color: white;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </ui-button>
        <ui-button variant="secondary" style="--ui-secondary-color: transparent; color: white;">Login</ui-button>
      </div>
    </ui-app-bar>
  `,
};

export const Outlined: Story = {
    args: {
        title: 'Brand Title',
        variant: 'outlined',
    },
    render: (args) => html`
    <ui-app-bar .title="${args.title}" .variant="${args.variant}">
      <ui-button slot="navigation" variant="secondary" style="--ui-secondary-color: transparent;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </ui-button>
    </ui-app-bar>
  `,
};

export const WithTitleSlot: Story = {
    render: () => html`
    <ui-app-bar variant="outlined">
      <ui-button slot="navigation" variant="secondary" style="--ui-secondary-color: transparent;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </ui-button>
      <div slot="title" style="display: flex; align-items: center; gap: 8px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#3b82f6">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
        <span style="font-weight: 700; font-size: 1.1rem;">Brand</span>
        <span style="font-size: 0.75rem; color: #6b7280; font-weight: 400;">v2.0</span>
      </div>
    </ui-app-bar>
  `,
};

export const Sticky: Story = {
    render: () => html`
    <div style="height: 300px; overflow-y: auto; border: 1px solid #ccc; position: relative;">
      <ui-app-bar title="Sticky App Bar" position="sticky">
        <ui-button slot="navigation" variant="secondary" style="--ui-secondary-color: transparent; color: white;">Menu</ui-button>
      </ui-app-bar>
      <div style="padding: 16px; height: 1000px; background: linear-gradient(white, #f0f0f0);">
        <p>Scroll down to see the app bar stay at the top...</p>
        ${Array.from({ length: 20 }).map(() => html`<p>Some content line...</p>`)}
      </div>
    </div>
  `,
};
