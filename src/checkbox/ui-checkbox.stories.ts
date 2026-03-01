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
        label: { control: 'text' },
    },
    args: {
        checked: false,
        indeterminate: false,
        disabled: false,
        label: 'Label',
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
            label=${args.label}
            @change=${(e: CustomEvent) => console.log('Checked:', e.detail.checked)}
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

export const WithSlottedLabel: Story = {
    render: () => html`
        <ui-checkbox>
            <span>I agree to the <a href="#" style="color: var(--ui-primary-color);">Terms and Conditions</a></span>
        </ui-checkbox>
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
