import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-list';
import '../divider/ui-divider';

const meta: Meta = {
    title: 'Data Display/List',
    component: 'ui-list',
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
    render: () => html`
    <ui-list style="max-width: 360px; border: 1px solid var(--ui-border-color); border-radius: 8px;">
      <ui-list-item>
        <ui-list-item-text primary="Item 1"></ui-list-item-text>
      </ui-list-item>
      <ui-list-item>
        <ui-list-item-text primary="Item 2"></ui-list-item-text>
      </ui-list-item>
      <ui-divider></ui-divider>
      <ui-list-item>
        <ui-list-item-text primary="Item 3" secondary="Secondary text here"></ui-list-item-text>
      </ui-list-item>
    </ui-list>
  `,
};

export const Interactive: Story = {
    render: () => html`
    <ui-list style="max-width: 360px; border: 1px solid var(--ui-border-color); border-radius: 8px;">
      <ui-list-item-button>
        <ui-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
        </ui-list-item-icon>
        <ui-list-item-text primary="Home"></ui-list-item-text>
      </ui-list-item-button>
      <ui-list-item-button>
        <ui-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </ui-list-item-icon>
        <ui-list-item-text primary="Profile"></ui-list-item-text>
      </ui-list-item-button>
      <ui-list-item-button>
        <ui-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </ui-list-item-icon>
        <ui-list-item-text primary="Settings"></ui-list-item-text>
      </ui-list-item-button>
    </ui-list>
  `,
};

export const WithAvatar: Story = {
    render: () => html`
    <ui-list style="max-width: 360px; border: 1px solid var(--ui-border-color); border-radius: 8px;">
      <ui-list-subheader>Recent Chats</ui-list-subheader>
      <ui-list-item-button>
        <ui-list-item-avatar>
          <div style="width: 40px; height: 40px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">A</div>
        </ui-list-item-avatar>
        <ui-list-item-text primary="Alice Johnson" secondary="See you later!"></ui-list-item-text>
      </ui-list-item-button>
      <ui-list-item-button>
        <ui-list-item-avatar>
           <div style="width: 40px; height: 40px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">B</div>
        </ui-list-item-avatar>
        <ui-list-item-text primary="Bob Smith" secondary="The report is ready."></ui-list-item-text>
      </ui-list-item-button>
    </ui-list>
  `,
};

export const NestedWithSubheader: Story = {
    render: () => html`
    <ui-list style="max-width: 360px; border: 1px solid var(--ui-border-color); border-radius: 8px;">
      <ui-list-subheader>Navigation</ui-list-subheader>
      <ui-list-item-button>
        <ui-list-item-text primary="Overview"></ui-list-item-text>
      </ui-list-item-button>
      <ui-list-item-button>
        <ui-list-item-text primary="Analytics"></ui-list-item-text>
      </ui-list-item-button>

      <ui-list-subheader>Account Settings</ui-list-subheader>
      <ui-list-item-button>
        <ui-list-item-text primary="Profile"></ui-list-item-text>
      </ui-list-item-button>
      <ui-list-item-button>
        <ui-list-item-text primary="Security"></ui-list-item-text>
      </ui-list-item-button>
    </ui-list>
  `,
};

export const WithSelected: Story = {
    render: () => html`
    <ui-list style="max-width: 360px; border: 1px solid var(--ui-border-color); border-radius: 8px;">
      <ui-list-subheader>Navigation</ui-list-subheader>
      <ui-list-item-button selected>
        <ui-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
        </ui-list-item-icon>
        <ui-list-item-text primary="Dashboard"></ui-list-item-text>
      </ui-list-item-button>
      <ui-list-item-button>
        <ui-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </ui-list-item-icon>
        <ui-list-item-text primary="Team"></ui-list-item-text>
      </ui-list-item-button>
      <ui-list-item-button>
        <ui-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </ui-list-item-icon>
        <ui-list-item-text primary="Projects"></ui-list-item-text>
      </ui-list-item-button>
    </ui-list>
  `,
};

export const WithDisabled: Story = {
    render: () => html`
    <ui-list style="max-width: 360px; border: 1px solid var(--ui-border-color); border-radius: 8px;">
      <ui-list-item-button>
        <ui-list-item-text primary="Active item"></ui-list-item-text>
      </ui-list-item-button>
      <ui-list-item-button disabled>
        <ui-list-item-text primary="Disabled item" secondary="Cannot be clicked"></ui-list-item-text>
      </ui-list-item-button>
      <ui-list-item-button>
        <ui-list-item-text primary="Another active item"></ui-list-item-text>
      </ui-list-item-button>
    </ui-list>
  `,
};

export const Dense: Story = {
    render: () => html`
    <ui-list dense style="max-width: 360px; border: 1px solid var(--ui-border-color); border-radius: 8px;">
      <ui-list-subheader>Dense List</ui-list-subheader>
      <ui-list-item-button>
        <ui-list-item-text primary="Compact item 1"></ui-list-item-text>
      </ui-list-item-button>
      <ui-list-item-button>
        <ui-list-item-text primary="Compact item 2"></ui-list-item-text>
      </ui-list-item-button>
      <ui-list-item-button>
        <ui-list-item-text primary="Compact item 3"></ui-list-item-text>
      </ui-list-item-button>
    </ui-list>
  `,
};

export const WithTrailingActions: Story = {
    render: () => html`
    <ui-list style="max-width: 360px; border: 1px solid var(--ui-border-color); border-radius: 8px;">
      <ui-list-item-button>
        <ui-list-item-text primary="Alice Johnson" secondary="alice@example.com"></ui-list-item-text>
        <ui-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #6b7280;">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </ui-list-item-icon>
      </ui-list-item-button>
      <ui-list-item-button>
        <ui-list-item-text primary="Bob Smith" secondary="bob@example.com"></ui-list-item-text>
        <ui-list-item-icon>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #6b7280;">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </ui-list-item-icon>
      </ui-list-item-button>
    </ui-list>
  `,
};
