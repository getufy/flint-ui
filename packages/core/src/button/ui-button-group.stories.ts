import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-button-group';
import './ui-button';

const meta: Meta = {
    title: 'Inputs/Button Group',
    component: 'ui-button-group',
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
    },
    args: {
        variant: 'secondary',
        size: 'medium',
        disabled: false,
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
        <ui-button-group>
            <ui-button variant=${args.variant} size=${args.size} ?disabled=${args.disabled}>One</ui-button>
            <ui-button variant=${args.variant} size=${args.size} ?disabled=${args.disabled}>Two</ui-button>
            <ui-button variant=${args.variant} size=${args.size} ?disabled=${args.disabled}>Three</ui-button>
        </ui-button-group>
    `
};

export const AllVariants: Story = {
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
                <h4 style="font-family: var(--ui-font-family); margin-bottom: 8px;">Secondary</h4>
                <ui-button-group>
                    <ui-button variant="secondary" size=${args.size}>One</ui-button>
                    <ui-button variant="secondary" size=${args.size}>Two</ui-button>
                    <ui-button variant="secondary" size=${args.size}>Three</ui-button>
                </ui-button-group>
            </div>

            <div>
                <h4 style="font-family: var(--ui-font-family); margin-bottom: 8px;">Primary</h4>
                <ui-button-group>
                    <ui-button variant="primary" size=${args.size}>One</ui-button>
                    <ui-button variant="primary" size=${args.size}>Two</ui-button>
                    <ui-button variant="primary" size=${args.size}>Three</ui-button>
                </ui-button-group>
            </div>

            <div>
                <h4 style="font-family: var(--ui-font-family); margin-bottom: 8px;">Small</h4>
                <ui-button-group>
                    <ui-button variant="secondary" size="small">Left</ui-button>
                    <ui-button variant="secondary" size="small">Center</ui-button>
                    <ui-button variant="secondary" size="small">Right</ui-button>
                </ui-button-group>
            </div>
        </div>
    `
};

export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">
            <div>
                <h4 style="font-family: var(--ui-font-family); margin-bottom: 8px;">Small</h4>
                <ui-button-group>
                    <ui-button variant="secondary" size="small">One</ui-button>
                    <ui-button variant="secondary" size="small">Two</ui-button>
                    <ui-button variant="secondary" size="small">Three</ui-button>
                </ui-button-group>
            </div>
            <div>
                <h4 style="font-family: var(--ui-font-family); margin-bottom: 8px;">Medium</h4>
                <ui-button-group>
                    <ui-button variant="secondary" size="medium">One</ui-button>
                    <ui-button variant="secondary" size="medium">Two</ui-button>
                    <ui-button variant="secondary" size="medium">Three</ui-button>
                </ui-button-group>
            </div>
            <div>
                <h4 style="font-family: var(--ui-font-family); margin-bottom: 8px;">Large</h4>
                <ui-button-group>
                    <ui-button variant="secondary" size="large">One</ui-button>
                    <ui-button variant="secondary" size="large">Two</ui-button>
                    <ui-button variant="secondary" size="large">Three</ui-button>
                </ui-button-group>
            </div>
        </div>
    `
};

export const Disabled: Story = {
    render: () => html`
        <ui-button-group>
            <ui-button variant="secondary" disabled>One</ui-button>
            <ui-button variant="secondary" disabled>Two</ui-button>
            <ui-button variant="secondary" disabled>Three</ui-button>
        </ui-button-group>
    `
};

export const Destructive: Story = {
    render: () => html`
        <ui-button-group>
            <ui-button variant="destructive">Cancel</ui-button>
            <ui-button variant="destructive">Delete</ui-button>
            <ui-button variant="destructive">Remove</ui-button>
        </ui-button-group>
    `
};

export const TwoButtons: Story = {
    render: () => html`
        <ui-button-group>
            <ui-button variant="secondary">Yes</ui-button>
            <ui-button variant="secondary">No</ui-button>
        </ui-button-group>
    `
};
