import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-backdrop';
import { UiBackdrop } from './ui-backdrop';
import '../button/ui-button';

const meta: Meta = {
  title: 'Feedback/Backdrop',
  component: 'ui-backdrop',
  argTypes: {
    open: { control: 'boolean' },
    invisible: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  args: {
    open: false,
    invisible: false,
  },
  render: (args) => html`
    <div style="height: 300px; display: flex; align-items: center; justify-content: center;">
      <ui-button @click="${() => {
      const bd = document.querySelector('ui-backdrop') as UiBackdrop;
      if (bd) bd.open = true;
    }}">
        Show Backdrop
      </ui-button>

      <ui-backdrop 
        .open="${args.open}" 
        .invisible="${args.invisible}"
        @close="${(e: Event) => {
      (e.target as UiBackdrop).open = false;
    }}"
      >
        <div style="padding: 24px; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <h3 style="margin: 0; font-family: sans-serif;">Focused Content</h3>
          <p style="margin: 0; color: #666;">Click outside this box to close</p>
          <ui-button variant="secondary" @click="${(e: Event) => {
      const bd = (e.target as HTMLElement).closest('ui-backdrop') as UiBackdrop;
      if (bd) bd.open = false;
    }}">
            Close Manually
          </ui-button>
        </div>
      </ui-backdrop>
    </div>
  `,
};

export const LoadingIndicator: Story = {
  args: {
    open: false,
  },
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

      <ui-backdrop id="loading-bd" .open="${args.open}">
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
        .open="${args.open}"
        .invisible="${args.invisible}"
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
