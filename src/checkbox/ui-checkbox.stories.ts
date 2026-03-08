import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-checkbox';

const meta: Meta = {
    title: 'Inputs/Checkbox',
    component: 'ui-checkbox',
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
        <ui-checkbox
            ?checked=${args.checked}
            ?indeterminate=${args.indeterminate}
            ?disabled=${args.disabled}
            ?required=${args.required}
            size=${args.size}
            label=${args.label}
            value=${args.value}
            @change=${(e: CustomEvent) => console.log('Checked:', e.detail.checked, 'Value:', e.detail.value)}
        ></ui-checkbox>
    `
};

export const Checked: Story = {
    args: {
        checked: true,
        label: 'Checked option'
    },
    render: (args: Record<string, unknown>) => html`
         <ui-checkbox ?checked=${args.checked} label=${args.label}></ui-checkbox>
    `
};

export const Indeterminate: Story = {
    args: {
        indeterminate: true,
        label: 'Indeterminate option'
    },
    render: (args: Record<string, unknown>) => html`
         <ui-checkbox ?indeterminate=${args.indeterminate} label=${args.label}></ui-checkbox>
    `
};

export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <ui-checkbox size="sm" label="Small checkbox"></ui-checkbox>
            <ui-checkbox size="md" label="Medium checkbox (default)"></ui-checkbox>
            <ui-checkbox size="lg" label="Large checkbox"></ui-checkbox>
            <ui-checkbox size="sm" checked label="Small checked"></ui-checkbox>
            <ui-checkbox size="md" checked label="Medium checked"></ui-checkbox>
            <ui-checkbox size="lg" checked label="Large checked"></ui-checkbox>
        </div>
    `
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <ui-checkbox disabled label="Disabled unchecked"></ui-checkbox>
            <ui-checkbox disabled checked label="Disabled checked"></ui-checkbox>
            <ui-checkbox disabled indeterminate label="Disabled indeterminate"></ui-checkbox>
        </div>
    `
};

export const DefaultChecked: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <ui-checkbox default-checked label="Default checked (uncontrolled)"></ui-checkbox>
            <ui-checkbox label="Default unchecked (uncontrolled)"></ui-checkbox>
        </div>
    `
};

export const WithSlottedLabel: Story = {
    render: () => html`
        <ui-checkbox>
            <span>I agree to the <a href="#" style="color: var(--ui-primary-color);">Terms and Conditions</a></span>
        </ui-checkbox>
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
                <ui-checkbox name="newsletter" value="yes" label="Subscribe to newsletter"></ui-checkbox>
                <ui-checkbox name="terms" value="accepted" required label="Accept terms (required)"></ui-checkbox>
                <button type="submit" style="margin-top: 8px; padding: 8px 16px; cursor: pointer;">Submit</button>
            </div>
        </form>
    `
};

export const FormGroup: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background: var(--ui-surface-background); border-radius: 8px; max-width: 300px; box-shadow: var(--ui-shadow-sm);">
            <h4 style="margin: 0; font-family: var(--ui-font-family);">Notification Preferences</h4>
            <ui-checkbox checked label="Email Notifications"></ui-checkbox>
            <ui-checkbox checked label="Push Notifications"></ui-checkbox>
            <ui-checkbox label="SMS Alerts"></ui-checkbox>
        </div>
    `
};

export const DarkMode: Story = {
    render: () => html`
        <div class="ui-theme-dark" style="padding: 24px; background: var(--ui-background, #09090b); border-radius: 8px; display: flex; flex-direction: column; gap: 12px;">
            <ui-checkbox label="Unchecked dark"></ui-checkbox>
            <ui-checkbox checked label="Checked dark"></ui-checkbox>
            <ui-checkbox indeterminate label="Indeterminate dark"></ui-checkbox>
            <ui-checkbox disabled label="Disabled dark"></ui-checkbox>
            <ui-checkbox size="sm" checked label="Small checked dark"></ui-checkbox>
            <ui-checkbox size="lg" checked label="Large checked dark"></ui-checkbox>
        </div>
    `
};

export const Accessibility: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <!-- With visible label -->
            <ui-checkbox label="Visible label checkbox"></ui-checkbox>
            <!-- With aria-label (no visible label) -->
            <ui-checkbox aria-label="Accept marketing emails"></ui-checkbox>
            <!-- Required with label -->
            <ui-checkbox required label="Required field *"></ui-checkbox>
        </div>
    `
};
