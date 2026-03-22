import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-switch';
import '../button/flint-button';
import '../box/flint-box';

const meta: Meta = {
    title: 'Inputs/Switch',
    component: 'flint-switch',
    parameters: {
        docs: {
            description: {
                component: `
A Switch component for toggling settings.

- **Tag**: \`<flint-switch>\`
- **Class**: \`FlintSwitch\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`checked\` | \`checked\` | \`boolean\` | \`false\` | Current checked state (controlled). When set, the component reflects this state and does not manage its own state. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the switch and prevents interaction. |
| \`required\` | \`required\` | \`boolean\` | \`false\` | Marks the switch as required for form validation. |
| \`size\` | \`size\` | \`Size\` | \`'md'\` | Size of the switch control. |
| \`label\` | \`label\` | \`string\` | \`''\` | Visible label text displayed next to the switch. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name used when submitting form data. |
| \`value\` | \`value\` | \`string\` | \`'on'\` | Value submitted with form data when checked. |
| \`defaultChecked\` | \`default-checked\` | \`boolean\` | \`false\` | Initial checked state (uncontrolled). Only used on first render; ignored after mount. |
| \`ariaLabel\` | \`aria-label\` | \`string \\| null\` | \`null\` | Accessible label for screen readers when no visible label is provided. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-switch-change\` | \`&#123; checked: boolean &#125;\` | Dispatched when the switch state changes. Detail: \`&#123; checked: boolean &#125;\` |

#### Slots

| Name | Description |
|---|---|
| \`icon-on\` | Optional icon to show when the switch is ON. |
| \`icon-off\` | Optional icon to show when the switch is OFF. |
| \`(default)\` | Optional label content (used when the \`label\` prop is not set). |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The switch's base wrapper element. |
| \`control\` | The switch track element. |
| \`thumb\` | The switch thumb (knob) element. |
| \`label\` | The label text element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-switch-thumb-color\` | — |
| \`--flint-switch-width\` | — |
| \`--flint-switch-height\` | — |
| \`--flint-switch-bg\` | — |
| \`--flint-switch-bg-on\` | — |
| \`--flint-switch-thumb-offset\` | — |
| \`--flint-switch-thumb-size\` | — |
| \`--flint-switch-thumb-bg\` | — |
| \`--flint-secondary-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-font-family\` | — |
| \`--flint-shadow-sm\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-text-color\` | — |
                `,
            },
        },
    },
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
    <flint-switch
      .label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?required=${args.required}
      size=${args.size}
      name=${args.name}
      value=${args.value}
      @flint-switch-change=${(e: CustomEvent) => console.log('flint-switch-change:', e.detail)}
    ></flint-switch>
  `,
};

export const Default: Story = {
    args: {
        label: 'Enable Notifications',
        checked: false,
        disabled: false,
    },
    render: (args) => html`
    <flint-switch
      .label=${args.label}
      ?disabled=${args.disabled}
      @flint-switch-change=${(e: CustomEvent) => console.log('Switch checked:', e.detail.checked)}
    ></flint-switch>
  `,
};

Default.play = async ({ canvasElement }) => {
    const sw = canvasElement.querySelector('flint-switch') as HTMLElement & { checked: boolean };
    const wrapper = sw.shadowRoot!.querySelector('.wrapper')!;

    // Initially unchecked
    await waitFor(() => expect(sw.checked).toBe(false));

    // Click to toggle on (target inner wrapper for shadow DOM click propagation)
    await userEvent.click(wrapper);
    await waitFor(() => expect(sw.checked).toBe(true));

    // Click to toggle off
    await userEvent.click(wrapper);
    await waitFor(() => expect(sw.checked).toBe(false));
};

export const Checked: Story = {
    args: {
        label: 'Dark Mode',
        checked: true,
    },
    render: (args) => html`
    <flint-switch .label=${args.label} ?checked=${args.checked}></flint-switch>
  `,
};

export const Sizes: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <flint-switch size="sm" label="Small"></flint-switch>
        <code style="font-size: 12px; color: #4b5563;">size="sm"</code>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <flint-switch size="md" label="Medium (default)"></flint-switch>
        <code style="font-size: 12px; color: #4b5563;">size="md"</code>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <flint-switch size="lg" label="Large"></flint-switch>
        <code style="font-size: 12px; color: #4b5563;">size="lg"</code>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <flint-switch size="sm" label="Small checked" checked></flint-switch>
        <flint-switch size="md" label="Medium checked" checked></flint-switch>
        <flint-switch size="lg" label="Large checked" checked></flint-switch>
      </div>
    </div>
  `,
};

export const WithIcons: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <flint-switch label="Wi-Fi">
        <svg slot="icon-on" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M5 12l5 5L20 7"/>
        </svg>
        <svg slot="icon-off" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </flint-switch>

      <flint-switch label="Sound" checked>
        <svg slot="icon-on" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
        <svg slot="icon-off" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M11 5L6 9H2V15H6L11 19V5Z"></path>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      </flint-switch>
    </div>
  `,
};

export const Disabled: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <flint-switch label="Disabled Unchecked" disabled></flint-switch>
      <flint-switch label="Disabled Checked" disabled checked></flint-switch>
    </div>
  `,
};

export const Controlled: Story = {
    render: () => html`
    <div id="controlled-demo">
      <p style="font-family: system-ui; font-size: 14px; color: #4b5563; margin: 0 0 12px 0;">
        State is controlled externally. The switch reflects the parent value.
      </p>
      <flint-switch
        id="ctrl-switch"
        label="Dark Mode"
        @flint-switch-change=${(e: CustomEvent) => {
            const sw = document.getElementById('ctrl-switch') as HTMLElement & { checked: boolean };
            sw.checked = e.detail.checked;
            const status = document.getElementById('ctrl-status');
            if (status) status.textContent = e.detail.checked ? 'ON' : 'OFF';
        }}
      ></flint-switch>
      <p style="font-family: system-ui; margin-top: 12px;">
        Status: <strong id="ctrl-status">OFF</strong>
      </p>
    </div>
  `,
};

export const Uncontrolled: Story = {
    render: () => html`
    <div>
      <p style="font-family: system-ui; font-size: 14px; color: #4b5563; margin: 0 0 12px 0;">
        Uses <code>default-checked</code> — starts ON without controlling the prop.
      </p>
      <flint-switch label="Start enabled" default-checked></flint-switch>
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
            <flint-switch name="emails" value="yes" label="Email updates" checked></flint-switch>
            <flint-switch name="push" value="yes" label="Push notifications"></flint-switch>
            <flint-switch name="sms" value="yes" label="SMS alerts (required)" required></flint-switch>
          </div>
        </fieldset>
        <flint-button type="submit" style="margin-top: 16px;">Save</flint-button>
        <flint-box as="pre" class="form-output" bgcolor="var(--flint-muted-background, #f9fafb)" p="12px" borderRadius="6px" border="1px solid #e5e7eb" style="margin-top: 12px; font-size: 12px; min-height: 40px;"></flint-box>
      </form>
    `;
    },
};

export const SettingsList: Story = {
    render: () => html`
    <div style="max-width: 400px; background: var(--flint-surface-background); padding: 16px; border-radius: 12px; border: 1px solid var(--flint-border-color);">
      <h3 style="margin: 0 0 16px 0; font-family: var(--flint-font-family);">Settings</h3>
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 600;">Airplane Mode</span>
            <span style="font-size: 12px; color: var(--flint-text-color-muted);">Disable all radios</span>
          </div>
          <flint-switch aria-label="Toggle airplane mode"></flint-switch>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 600;">Bluetooth</span>
            <span style="font-size: 12px; color: var(--flint-text-color-muted);">On</span>
          </div>
          <flint-switch aria-label="Toggle bluetooth" checked></flint-switch>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 600;">VPN</span>
            <span style="font-size: 12px; color: var(--flint-text-color-muted);">Disconnected</span>
          </div>
          <flint-switch aria-label="Toggle VPN" disabled></flint-switch>
        </div>
      </div>
    </div>
  `,
};
