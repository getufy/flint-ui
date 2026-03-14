import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-checkbox';
import '../button/flint-button';

const meta: Meta = {
    title: 'Inputs/Checkbox',
    component: 'flint-checkbox',
    parameters: {
        docs: {
            description: {
                component: `
- **Tag**: \`<flint-checkbox>\`
- **Class**: \`FlintCheckbox\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`checked\` | \`checked\` | \`boolean\` | \`false\` | Whether the checkbox is checked. |
| \`indeterminate\` | \`indeterminate\` | \`boolean\` | \`false\` | Displays the checkbox in an indeterminate state. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the checkbox and prevents interaction. |
| \`required\` | \`required\` | \`boolean\` | \`false\` | Marks the checkbox as required for form validation. |
| \`size\` | \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'md'\` | Size of the checkbox control. |
| \`label\` | \`label\` | \`string\` | \`''\` | Visible label text displayed next to the checkbox. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name used when submitting form data. |
| \`value\` | \`value\` | \`string\` | \`'on'\` | Value submitted with form data when checked. |
| \`defaultChecked\` | \`default-checked\` | \`boolean\` | \`false\` | Initial checked state for uncontrolled usage. |
| \`ariaLabel\` | \`aria-label\` | \`string \\| null\` | \`null\` | Accessible label for screen readers when no visible label is provided. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-checkbox-change\` | \`{ checked: this.checked, value: this.value, indeterminate: false }\` |  |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-checkbox-size\` | \`18px\` |
| \`--flint-checkbox-border-radius\` | \`var(--flint-border-radius-sm\` |
| \`--flint-checkbox-gap\` | \`8px\` |
| \`--flint-checkbox-size-sm\` | \`14px\` |
| \`--flint-checkbox-size-lg\` | \`22px\` |
| \`--flint-checkbox-icon-size\` | \`12px\` |
| \`--flint-checkbox-icon-size-sm\` | \`10px\` |
| \`--flint-checkbox-icon-size-lg\` | \`16px\` |
| \`--flint-checkbox-label-font-size\` | \`14px\` |
| \`--flint-checkbox-label-font-size-sm\` | \`12px\` |
| \`--flint-checkbox-label-font-size-lg\` | \`16px\` |
| \`--flint-font-family\` | — |
| \`--flint-text-color\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-text-color-on-primary\` | — |
                `,
            },
        },
    },
    argTypes: {
        checked: { control: 'boolean' },
        indeterminate: { control: 'boolean' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        label: { control: 'text' },
        value: { control: 'text' },
        'aria-label': { control: 'text' },
    },
    args: {
        checked: false,
        indeterminate: false,
        disabled: false,
        required: false,
        size: 'md',
        label: 'Label',
        value: 'on',
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: (args: Record<string, unknown>) => html`
        <flint-checkbox
            ?checked=${args.checked}
            ?indeterminate=${args.indeterminate}
            ?disabled=${args.disabled}
            ?required=${args.required}
            size=${args.size}
            label=${args.label}
            value=${args.value}
            @flint-checkbox-change=${(e: CustomEvent) => console.log('Checked:', e.detail.checked, 'Value:', e.detail.value)}
        ></flint-checkbox>
    `
};

export const Checked: Story = {
    args: {
        checked: true,
        label: 'Checked option'
    },
    render: (args: Record<string, unknown>) => html`
         <flint-checkbox ?checked=${args.checked} label=${args.label}></flint-checkbox>
    `
};

export const Indeterminate: Story = {
    args: {
        indeterminate: true,
        label: 'Indeterminate option'
    },
    render: (args: Record<string, unknown>) => html`
         <flint-checkbox ?indeterminate=${args.indeterminate} label=${args.label}></flint-checkbox>
    `
};

export const Sizes: Story = {
    render: (args: Record<string, unknown>) => html`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <flint-checkbox size="sm" ?disabled=${args.disabled} label="Small checkbox"></flint-checkbox>
            <flint-checkbox size="md" ?disabled=${args.disabled} label="Medium checkbox (default)"></flint-checkbox>
            <flint-checkbox size="lg" ?disabled=${args.disabled} label="Large checkbox"></flint-checkbox>
            <flint-checkbox size="sm" ?disabled=${args.disabled} checked label="Small checked"></flint-checkbox>
            <flint-checkbox size="md" ?disabled=${args.disabled} checked label="Medium checked"></flint-checkbox>
            <flint-checkbox size="lg" ?disabled=${args.disabled} checked label="Large checked"></flint-checkbox>
        </div>
    `
};

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Disabled checkbox',
    },
    render: (args: Record<string, unknown>) => html`
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <flint-checkbox ?disabled=${args.disabled} label="Disabled unchecked"></flint-checkbox>
            <flint-checkbox ?disabled=${args.disabled} checked label="Disabled checked"></flint-checkbox>
            <flint-checkbox ?disabled=${args.disabled} indeterminate label="Disabled indeterminate"></flint-checkbox>
        </div>
    `
};

export const DefaultChecked: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <flint-checkbox default-checked label="Default checked (uncontrolled)"></flint-checkbox>
            <flint-checkbox label="Default unchecked (uncontrolled)"></flint-checkbox>
        </div>
    `
};

export const WithSlottedLabel: Story = {
    render: () => html`
        <flint-checkbox>
            <span>I agree to the <a href="#" style="color: var(--flint-primary-color);">Terms and Conditions</a></span>
        </flint-checkbox>
    `
};

export const FormUsage: Story = {
    render: () => html`
        <form @submit=${(e: Event) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            console.log('Form data:', Object.fromEntries(data.entries()));
        }}>
            <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
                <flint-checkbox name="newsletter" value="yes" label="Subscribe to newsletter"></flint-checkbox>
                <flint-checkbox name="terms" value="accepted" required label="Accept terms (required)"></flint-checkbox>
                <flint-button type="submit" style="margin-top: 8px;">Submit</flint-button>
            </div>
        </form>
    `
};

export const FormGroup: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background: var(--flint-surface-background); border-radius: 8px; max-width: 300px; box-shadow: var(--flint-shadow-sm);">
            <h4 style="margin: 0; font-family: var(--flint-font-family);">Notification Preferences</h4>
            <flint-checkbox checked label="Email Notifications"></flint-checkbox>
            <flint-checkbox checked label="Push Notifications"></flint-checkbox>
            <flint-checkbox label="SMS Alerts"></flint-checkbox>
        </div>
    `
};

export const DarkMode: Story = {
    render: () => html`
        <div class="flint-theme-dark" style="padding: 24px; background: var(--flint-background, #09090b); border-radius: 8px; display: flex; flex-direction: column; gap: 12px;">
            <flint-checkbox label="Unchecked dark"></flint-checkbox>
            <flint-checkbox checked label="Checked dark"></flint-checkbox>
            <flint-checkbox indeterminate label="Indeterminate dark"></flint-checkbox>
            <flint-checkbox disabled label="Disabled dark"></flint-checkbox>
            <flint-checkbox size="sm" checked label="Small checked dark"></flint-checkbox>
            <flint-checkbox size="lg" checked label="Large checked dark"></flint-checkbox>
        </div>
    `
};

export const Accessibility: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <!-- With visible label -->
            <flint-checkbox label="Visible label checkbox"></flint-checkbox>
            <!-- With aria-label (no visible label) -->
            <flint-checkbox aria-label="Accept marketing emails"></flint-checkbox>
            <!-- Required with label -->
            <flint-checkbox required label="Required field *"></flint-checkbox>
        </div>
    `
};
