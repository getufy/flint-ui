import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-backdrop';
import { UiBackdrop } from './ui-backdrop';
import '../button/ui-button';
import '../paper/ui-paper';

const meta: Meta = {
  title: 'Feedback/Backdrop',
  component: 'ui-backdrop',
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
      <ui-button @click="${() => {
      const bd = document.querySelector('ui-backdrop') as UiBackdrop;
      if (bd) bd.open = true;
    }}">
        Show Backdrop
      </ui-button>

      <ui-backdrop 
        .open=${args.open} 
        .invisible=${args.invisible}
        @close="${(e: Event) => {
      (e.target as UiBackdrop).open = false;
    }}"
      >
        <ui-paper elevation="2" style="padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <h3 style="margin: 0; font-family: sans-serif;">Focused Content</h3>
          <p style="margin: 0; color: #666;">Click outside this box to close</p>
          <ui-button variant="secondary" @click="${(e: Event) => {
      const bd = (e.target as HTMLElement).closest('ui-backdrop') as UiBackdrop;
      if (bd) bd.open = false;
    }}">
            Close Manually
          </ui-button>
        </ui-paper>
      </ui-backdrop>
    </div>
  `,
};

export const LoadingIndicator: Story = {
  render: (args) => html`
    <div style="height: 300px; display: flex; align-items: center; justify-content: center;">
      <ui-button @click="${() => {
      const bd = document.getElementById('loading-bd') as UiBackdrop;
      if (bd) bd.open = true;

      // Auto-close after 3 seconds for demo
      setTimeout(() => {
        if (bd) bd.open = false;
      }, 3000);
    }}">
        Start Loading (3s)
      </ui-button>

      <ui-backdrop id="loading-bd" .open=${args.open}>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <div style="width: 48px; height: 48px; border: 4px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          <span style="color: white; font-family: sans-serif; font-weight: 500;">Please wait...</span>
        </div>
        <style>
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      </ui-backdrop>
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

      <ui-backdrop
        container
        .open=${args.open}
        .invisible=${args.invisible}
        @close="${(e: Event) => {
      alert('Captured click on invisible backdrop!');
      (e.target as UiBackdrop).open = false;
    }}"
      >
        <ui-button variant="primary">Invisible Backdrop Active</ui-button>
      </ui-backdrop>
    </div>
  `,
};

export const ContainedBackdrop: Story = {
  render: () => html`
    <div style="height: 300px; border: 1px solid #ccc; position: relative; display: flex; align-items: center; justify-content: center;">
      <p style="font-family: sans-serif;">Backdrop is scoped to this container only.</p>
      <ui-backdrop
        container
        open
        @close="${(e: Event) => { (e.target as UiBackdrop).open = false; }}"
      >
        <ui-paper elevation="2" style="padding: 24px;">
          <p style="margin: 0; font-family: sans-serif;">Contained content</p>
        </ui-paper>
      </ui-backdrop>
    </div>
  `,
};

export const OpenByDefault: Story = {
  args: { open: true },
  render: (args) => html`
    <div style="height: 300px; display: flex; align-items: center; justify-content: center;">
      <ui-backdrop
        .open=${args.open}
        @close="${(e: Event) => { (e.target as UiBackdrop).open = false; }}"
      >
        <ui-paper elevation="2" style="padding: 32px; text-align: center;">
          <h3 style="margin: 0 0 8px; font-family: sans-serif;">Welcome</h3>
          <p style="margin: 0; color: #666; font-family: sans-serif;">Click outside to dismiss</p>
        </ui-paper>
      </ui-backdrop>
    </div>
  `,
};
