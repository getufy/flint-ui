import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-list';
import '../divider/flint-divider';

const meta: Meta = {
    title: 'Data Display/List',
    component: 'flint-list',
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-item>
        <flint-list-item-text primary="Item 1"></flint-list-item-text>
      </flint-list-item>
      <flint-list-item>
        <flint-list-item-text primary="Item 2"></flint-list-item-text>
      </flint-list-item>
      <flint-divider></flint-divider>
      <flint-list-item>
        <flint-list-item-text primary="Item 3" secondary="Secondary text here"></flint-list-item-text>
      </flint-list-item>
    </flint-list>
  `,
};

export const Interactive: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-item-button>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Home"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Profile"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Settings"></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const WithAvatar: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-subheader>Recent Chats</flint-list-subheader>
      <flint-list-item-button>
        <flint-list-item-avatar>
          <div style="width: 40px; height: 40px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">A</div>
        </flint-list-item-avatar>
        <flint-list-item-text primary="Alice Johnson" secondary="See you later!"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-avatar>
           <div style="width: 40px; height: 40px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">B</div>
        </flint-list-item-avatar>
        <flint-list-item-text primary="Bob Smith" secondary="The report is ready."></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const NestedWithSubheader: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-subheader>Navigation</flint-list-subheader>
      <flint-list-item-button>
        <flint-list-item-text primary="Overview"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Analytics"></flint-list-item-text>
      </flint-list-item-button>

      <flint-list-subheader>Account Settings</flint-list-subheader>
      <flint-list-item-button>
        <flint-list-item-text primary="Profile"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Security"></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const WithSelected: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-subheader>Navigation</flint-list-subheader>
      <flint-list-item-button selected>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Dashboard"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Team"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </flint-list-item-icon>
        <flint-list-item-text primary="Projects"></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const WithDisabled: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-item-button>
        <flint-list-item-text primary="Active item"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button disabled>
        <flint-list-item-text primary="Disabled item" secondary="Cannot be clicked"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Another active item"></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const Dense: Story = {
    render: () => html`
    <flint-list dense style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-subheader>Dense List</flint-list-subheader>
      <flint-list-item-button>
        <flint-list-item-text primary="Compact item 1"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Compact item 2"></flint-list-item-text>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Compact item 3"></flint-list-item-text>
      </flint-list-item-button>
    </flint-list>
  `,
};

export const WithTrailingActions: Story = {
    render: () => html`
    <flint-list style="max-width: 360px; border: 1px solid var(--flint-border-color); border-radius: 8px;">
      <flint-list-item-button>
        <flint-list-item-text primary="Alice Johnson" secondary="alice@example.com"></flint-list-item-text>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #6b7280;">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </flint-list-item-icon>
      </flint-list-item-button>
      <flint-list-item-button>
        <flint-list-item-text primary="Bob Smith" secondary="bob@example.com"></flint-list-item-text>
        <flint-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #6b7280;">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </flint-list-item-icon>
      </flint-list-item-button>
    </flint-list>
  `,
};
