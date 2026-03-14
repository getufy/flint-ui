import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-text-field';
import '../button/flint-button';

const meta: Meta = {
    title: 'Inputs/Text Field',
    component: 'flint-text-field',
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
        <flint-text-field
            .label=${args.label}
            .value=${args.value}
            .placeholder=${args.placeholder}
            .type=${args.type}
            .variant=${args.variant}
            ?disabled=${args.disabled}
            ?error=${args.error}
            .helperText=${args.helperText}
            .errorMessage=${args.errorMessage}
        ></flint-text-field>
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
            <flint-text-field label="Search">
                <span slot="leading">🔍</span>
            </flint-text-field>
            
            <flint-text-field label="Price" type="number" value="19.99">
                <span slot="leading">$</span>
                <span slot="trailing">USD</span>
            </flint-text-field>

            <flint-text-field label="Notifications" value="John Doe">
                <span slot="trailing">🔔</span>
            </flint-text-field>
        </div>
    `
};

export const FormMockup: Story = {
    render: () => html`
        <div style="max-width: 400px; padding: 2rem; background: var(--flint-surface-background); border-radius: 12px; box-shadow: var(--flint-shadow-lg); font-family: var(--flint-font-family);">
            <h2 style="margin-top: 0; margin-bottom: 1.5rem;">Create Account</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <flint-text-field label="First Name" placeholder="Jane"></flint-text-field>
                <flint-text-field label="Last Name" placeholder="Doe"></flint-text-field>
            </div>
            
            <flint-text-field label="Email" type="email" placeholder="jane@doe.com"></flint-text-field>
            
            <flint-text-field label="Password" type="password" placeholder="••••••••" helperText="Minimal 8 characters"></flint-text-field>
            
            <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
                <flint-button variant="primary" size="medium">Sign Up</flint-button>
            </div>
        </div>
    `
};
