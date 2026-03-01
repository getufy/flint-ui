import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-text-field';
import '../button/ui-button';

const meta: Meta = {
    title: 'Inputs/Text Field',
    component: 'ui-text-field',
    argTypes: {
        label: { control: 'text' },
        value: { control: 'text' },
        placeholder: { control: 'text' },
        type: { control: 'select', options: ['text', 'password', 'email', 'number', 'tel', 'url'] },
        variant: { control: 'select', options: ['outlined', 'filled'] },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
        helperText: { control: 'text' },
        errorMessage: { control: 'text' },
    },
    args: {
        label: 'Username',
        placeholder: 'Enter your username',
        variant: 'outlined',
        disabled: false,
        error: false,
    }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
        <ui-text-field
            .label=${args.label}
            .value=${args.value}
            .placeholder=${args.placeholder}
            .type=${args.type}
            .variant=${args.variant}
            ?disabled=${args.disabled}
            ?error=${args.error}
            .helperText=${args.helperText}
            .errorMessage=${args.errorMessage}
        ></ui-text-field>
    `
};

export const Filled: Story = {
    args: {
        variant: 'filled',
        label: 'Email Address',
        placeholder: 'you@example.com',
        type: 'email',
        helperText: 'We will never share your email.'
    }
};

export const Password: Story = {
    args: {
        label: 'Password',
        placeholder: '••••••••',
        type: 'password',
        helperText: 'Must be at least 8 characters.'
    }
};

export const Error: Story = {
    args: {
        label: 'Phone Number',
        value: '123-abc',
        errorMessage: 'Invalid phone number format.'
    }
};

export const Icons: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
            <ui-text-field label="Search">
                <span slot="leading">🔍</span>
            </ui-text-field>
            
            <ui-text-field label="Price" type="number" value="19.99">
                <span slot="leading">$</span>
                <span slot="trailing">USD</span>
            </ui-text-field>

            <ui-text-field label="Notifications" value="John Doe">
                <span slot="trailing">🔔</span>
            </ui-text-field>
        </div>
    `
};

export const FormMockup: Story = {
    render: () => html`
        <div style="max-width: 400px; padding: 2rem; background: var(--ui-surface-background); border-radius: 12px; box-shadow: var(--ui-shadow-lg); font-family: var(--ui-font-family);">
            <h2 style="margin-top: 0; margin-bottom: 1.5rem;">Create Account</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <ui-text-field label="First Name" placeholder="Jane"></ui-text-field>
                <ui-text-field label="Last Name" placeholder="Doe"></ui-text-field>
            </div>
            
            <ui-text-field label="Email" type="email" placeholder="jane@doe.com"></ui-text-field>
            
            <ui-text-field label="Password" type="password" placeholder="••••••••" helperText="Minimal 8 characters"></ui-text-field>
            
            <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
                <ui-button variant="primary" size="medium">Sign Up</ui-button>
            </div>
        </div>
    `
};
