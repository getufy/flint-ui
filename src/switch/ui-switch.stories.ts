import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-switch';

const meta: Meta = {
    title: 'Inputs/Switch',
    component: 'ui-switch',
    argTypes: {
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        label: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    args: {
        label: 'Enable Notifications',
        checked: false,
        disabled: false,
    },
    render: (args) => html`
    <ui-switch 
      .label=${args.label} 
      ?checked=${args.checked} 
      ?disabled=${args.disabled}
      @change=${(e: CustomEvent) => console.log('Switch checked:', e.detail.checked)}
    ></ui-switch>
  `,
};

export const Checked: Story = {
    args: {
        label: 'Dark Mode',
        checked: true,
    },
    render: (args) => html`
    <ui-switch .label=${args.label} ?checked=${args.checked}></ui-switch>
  `,
};

export const WithIcons: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ui-switch label="Wi-Fi">
        <svg slot="icon-on" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M5 12l5 5L20 7"/>
        </svg>
        <svg slot="icon-off" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </ui-switch>

      <ui-switch label="Sound" checked>
        <svg slot="icon-on" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
        <svg slot="icon-off" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M11 5L6 9H2V15H6L11 19V5Z"></path>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      </ui-switch>
    </div>
  `,
};

export const Disabled: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ui-switch label="Disabled Unchecked" disabled></ui-switch>
      <ui-switch label="Disabled Checked" disabled checked></ui-switch>
    </div>
  `,
};

export const SettingsList: Story = {
    render: () => html`
    <div style="max-width: 400px; background: var(--ui-surface-background); padding: 16px; border-radius: 12px; border: 1px solid var(--ui-border-color);">
      <h3 style="margin: 0 0 16px 0; font-family: var(--ui-font-family);">Settings</h3>
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 600;">Airplane Mode</span>
            <span style="font-size: 12px; color: var(--ui-text-color-muted);">Disable all radios</span>
          </div>
          <ui-switch></ui-switch>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 600;">Bluetooth</span>
            <span style="font-size: 12px; color: var(--ui-text-color-muted);">On</span>
          </div>
          <ui-switch checked></ui-switch>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 600;">VPN</span>
            <span style="font-size: 12px; color: var(--ui-text-color-muted);">Disconnected</span>
          </div>
          <ui-switch disabled></ui-switch>
        </div>
      </div>
    </div>
  `,
};
