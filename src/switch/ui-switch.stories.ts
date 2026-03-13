import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-switch';
import '../button/ui-button';
import '../box/ui-box';

const meta: Meta = {
    title: 'Inputs/Switch',
    component: 'ui-switch',
    argTypes: {
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        label: { control: 'text' },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        name: { control: 'text' },
        value: { control: 'text' },
    },
    args: {
        label: 'Enable Notifications',
        checked: false,
        disabled: false,
        required: false,
        size: 'md',
        name: 'notifications',
        value: 'on',
    },
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
    render: (args) => html`
    <ui-switch
      .label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?required=${args.required}
      size=${args.size}
      name=${args.name}
      value=${args.value}
      @ui-switch-change=${(e: CustomEvent) => console.log('ui-switch-change:', e.detail)}
    ></ui-switch>
  `,
};

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
      @ui-switch-change=${(e: CustomEvent) => console.log('Switch checked:', e.detail.checked)}
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

export const Sizes: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <ui-switch size="sm" label="Small"></ui-switch>
        <code style="font-size: 12px; color: #6b7280;">size="sm"</code>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <ui-switch size="md" label="Medium (default)"></ui-switch>
        <code style="font-size: 12px; color: #6b7280;">size="md"</code>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <ui-switch size="lg" label="Large"></ui-switch>
        <code style="font-size: 12px; color: #6b7280;">size="lg"</code>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <ui-switch size="sm" label="Small checked" checked></ui-switch>
        <ui-switch size="md" label="Medium checked" checked></ui-switch>
        <ui-switch size="lg" label="Large checked" checked></ui-switch>
      </div>
    </div>
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

export const Controlled: Story = {
    render: () => html`
    <div id="controlled-demo">
      <p style="font-family: system-ui; font-size: 14px; color: #6b7280; margin: 0 0 12px 0;">
        State is controlled externally. The switch reflects the parent value.
      </p>
      <ui-switch
        id="ctrl-switch"
        label="Dark Mode"
        @ui-switch-change=${(e: CustomEvent) => {
            const sw = document.getElementById('ctrl-switch') as HTMLElement & { checked: boolean };
            sw.checked = e.detail.checked;
            const status = document.getElementById('ctrl-status');
            if (status) status.textContent = e.detail.checked ? 'ON' : 'OFF';
        }}
      ></ui-switch>
      <p style="font-family: system-ui; margin-top: 12px;">
        Status: <strong id="ctrl-status">OFF</strong>
      </p>
    </div>
  `,
};

export const Uncontrolled: Story = {
    render: () => html`
    <div>
      <p style="font-family: system-ui; font-size: 14px; color: #6b7280; margin: 0 0 12px 0;">
        Uses <code>default-checked</code> — starts ON without controlling the prop.
      </p>
      <ui-switch label="Start enabled" default-checked></ui-switch>
    </div>
  `,
};

export const FormUsage: Story = {
    render: () => {
        const handleSubmit = (e: Event) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const data = Object.fromEntries(new FormData(form));
            const output = form.querySelector<HTMLElement>('.form-output');
            if (output) output.textContent = JSON.stringify(data, null, 2);
        };
        return html`
      <form @submit=${handleSubmit} style="font-family: system-ui; max-width: 360px;">
        <fieldset style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
          <legend style="font-weight: 600; padding: 0 8px;">Notification Preferences</legend>
          <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 8px;">
            <ui-switch name="emails" value="yes" label="Email updates" checked></ui-switch>
            <ui-switch name="push" value="yes" label="Push notifications"></ui-switch>
            <ui-switch name="sms" value="yes" label="SMS alerts (required)" required></ui-switch>
          </div>
        </fieldset>
        <ui-button type="submit" style="margin-top: 16px;">Save</ui-button>
        <ui-box as="pre" class="form-output" bgcolor="var(--ui-muted-background, #f9fafb)" p="12px" borderRadius="6px" border="1px solid #e5e7eb" style="margin-top: 12px; font-size: 12px; min-height: 40px;"></ui-box>
      </form>
    `;
    },
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
          <ui-switch aria-label="Toggle airplane mode"></ui-switch>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 600;">Bluetooth</span>
            <span style="font-size: 12px; color: var(--ui-text-color-muted);">On</span>
          </div>
          <ui-switch aria-label="Toggle bluetooth" checked></ui-switch>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 600;">VPN</span>
            <span style="font-size: 12px; color: var(--ui-text-color-muted);">Disconnected</span>
          </div>
          <ui-switch aria-label="Toggle VPN" disabled></ui-switch>
        </div>
      </div>
    </div>
  `,
};
