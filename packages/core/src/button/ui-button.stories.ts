import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-button';

const meta: Meta = {
    title: 'Inputs/Button',
    component: 'ui-button',
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'destructive'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        disabled: { control: 'boolean' },
        content: { control: 'text' },
    },
    args: {
        content: 'Button Text',
        variant: 'primary',
        size: 'medium',
        disabled: false,
    },
    render: (args: Record<string, unknown>) => html`
    <ui-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
    >
      ${args.content}
    </ui-button>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const FormContext: Story = {
    render: () => html`
        <div style="max-width: 400px; padding: 20px; background: var(--ui-surface-background); border-radius: 8px; box-shadow: var(--ui-shadow-md);">
            <h3 style="margin-top: 0; margin-bottom: 20px; font-family: var(--ui-font-family);">Contact Us</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <input type="text" placeholder="Name" style="padding: 8px; border: 1px solid var(--ui-input-border-color); border-radius: 4px;" />
                <input type="email" placeholder="Email" style="padding: 8px; border: 1px solid var(--ui-input-border-color); border-radius: 4px;" />
                <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px;">
                    <ui-button variant="secondary" size="medium">Cancel</ui-button>
                    <ui-button variant="primary" size="medium">Submit</ui-button>
                </div>
            </div>
        </div>
    `
};

export const ToolbarContext: Story = {
    render: () => html`
        <div style="padding: 12px; background: var(--ui-surface-background-flat); border-radius: 8px; display: flex; gap: 8px;">
            <ui-button variant="secondary" size="small">Edit</ui-button>
            <ui-button variant="secondary" size="small">Share</ui-button>
            <div style="flex-grow: 1;"></div>
            <ui-button variant="primary" size="small">Save</ui-button>
        </div>
    `
};

export const ModalContext: Story = {
    render: () => html`
        <div style="position: relative; padding: 24px; background: var(--ui-surface-background); border-radius: 12px; box-shadow: var(--ui-shadow-lg); max-width: 450px;">
            <h2 style="margin-top: 0; margin-bottom: 12px; font-family: var(--ui-font-family); font-size: 1.25rem;">Delete Account?</h2>
            <p style="margin-top: 0; margin-bottom: 24px; color: var(--ui-text-color-muted); font-family: var(--ui-font-family); line-height: 1.5;">This action cannot be undone. All your data will be permanently removed.</p>
            <div style="display: flex; justify-content: flex-end; gap: 12px;">
                <ui-button variant="secondary" size="medium">Cancel</ui-button>
                <ui-button variant="destructive" size="medium">Delete</ui-button>
            </div>
        </div>
    `
};

export const ActionCardContext: Story = {
    render: () => html`
        <div style="padding: 24px; background: var(--ui-surface-background); border: 1px solid var(--ui-border-color); border-radius: 8px; width: 300px;">
            <div style="width: 40px; height: 40px; background: #e0e7ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: #4f46e5; font-weight: bold;">
                UI
            </div>
            <h3 style="margin: 0 0 8px 0; font-family: var(--ui-font-family);">Pro Plan</h3>
            <p style="margin: 0 0 24px 0; color: var(--ui-text-color-muted); font-size: 14px; font-family: var(--ui-font-family);">Unlock premium features and advanced analytics.</p>
            <ui-button variant="primary" size="medium" full-width>Upgrade Now</ui-button>
        </div>
    `
};

export const DisabledContext: Story = {
    render: () => html`
        <div style="display: flex; gap: 16px;">
             <ui-button variant="primary" size="medium" disabled>Primary Disabled</ui-button>
             <ui-button variant="secondary" size="medium" disabled>Secondary Disabled</ui-button>
        </div>
    `
};

export const AllVariantsAndSizes: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 24px; font-family: var(--ui-font-family);">
            ${(['primary', 'secondary', 'destructive'] as const).map(variant => html`
                <div>
                    <p style="margin: 0 0 12px 0; font-weight: 600; text-transform: capitalize;">${variant}</p>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <ui-button variant=${variant} size="small">Small</ui-button>
                        <ui-button variant=${variant} size="medium">Medium</ui-button>
                        <ui-button variant=${variant} size="large">Large</ui-button>
                        <ui-button variant=${variant} size="medium" disabled>Disabled</ui-button>
                    </div>
                </div>
            `)}
        </div>
    `
};

export const WithIcon: Story = {
    render: () => html`
        <div style="display: flex; gap: 12px; align-items: center;">
            <ui-button variant="primary" size="medium">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3.793l2.146 2.147a.5.5 0 0 1-.708.707L7.5 8.707V4.5A.5.5 0 0 1 8 4z"/>
                </svg>
                Schedule
            </ui-button>
            <ui-button variant="secondary" size="medium">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                Confirm
            </ui-button>
        </div>
    `
};
