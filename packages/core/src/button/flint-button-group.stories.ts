import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-button-group';
import './flint-button';

const meta: Meta = {
    title: 'Inputs/Button Group',
    component: 'flint-button-group',
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
        <flint-button-group>
            <flint-button variant=${args.variant} size=${args.size} ?disabled=${args.disabled}>One</flint-button>
            <flint-button variant=${args.variant} size=${args.size} ?disabled=${args.disabled}>Two</flint-button>
            <flint-button variant=${args.variant} size=${args.size} ?disabled=${args.disabled}>Three</flint-button>
        </flint-button-group>
    `
};

export const AllVariants: Story = {
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
                <h4 style="font-family: var(--flint-font-family); margin-bottom: 8px;">Secondary</h4>
                <flint-button-group>
                    <flint-button variant="secondary" size=${args.size}>One</flint-button>
                    <flint-button variant="secondary" size=${args.size}>Two</flint-button>
                    <flint-button variant="secondary" size=${args.size}>Three</flint-button>
                </flint-button-group>
            </div>

            <div>
                <h4 style="font-family: var(--flint-font-family); margin-bottom: 8px;">Primary</h4>
                <flint-button-group>
                    <flint-button variant="primary" size=${args.size}>One</flint-button>
                    <flint-button variant="primary" size=${args.size}>Two</flint-button>
                    <flint-button variant="primary" size=${args.size}>Three</flint-button>
                </flint-button-group>
            </div>

            <div>
                <h4 style="font-family: var(--flint-font-family); margin-bottom: 8px;">Small</h4>
                <flint-button-group>
                    <flint-button variant="secondary" size="small">Left</flint-button>
                    <flint-button variant="secondary" size="small">Center</flint-button>
                    <flint-button variant="secondary" size="small">Right</flint-button>
                </flint-button-group>
            </div>
        </div>
    `
};

export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">
            <div>
                <h4 style="font-family: var(--flint-font-family); margin-bottom: 8px;">Small</h4>
                <flint-button-group>
                    <flint-button variant="secondary" size="small">One</flint-button>
                    <flint-button variant="secondary" size="small">Two</flint-button>
                    <flint-button variant="secondary" size="small">Three</flint-button>
                </flint-button-group>
            </div>
            <div>
                <h4 style="font-family: var(--flint-font-family); margin-bottom: 8px;">Medium</h4>
                <flint-button-group>
                    <flint-button variant="secondary" size="medium">One</flint-button>
                    <flint-button variant="secondary" size="medium">Two</flint-button>
                    <flint-button variant="secondary" size="medium">Three</flint-button>
                </flint-button-group>
            </div>
            <div>
                <h4 style="font-family: var(--flint-font-family); margin-bottom: 8px;">Large</h4>
                <flint-button-group>
                    <flint-button variant="secondary" size="large">One</flint-button>
                    <flint-button variant="secondary" size="large">Two</flint-button>
                    <flint-button variant="secondary" size="large">Three</flint-button>
                </flint-button-group>
            </div>
        </div>
    `
};

export const Disabled: Story = {
    render: () => html`
        <flint-button-group>
            <flint-button variant="secondary" disabled>One</flint-button>
            <flint-button variant="secondary" disabled>Two</flint-button>
            <flint-button variant="secondary" disabled>Three</flint-button>
        </flint-button-group>
    `
};

export const Destructive: Story = {
    render: () => html`
        <flint-button-group>
            <flint-button variant="destructive">Cancel</flint-button>
            <flint-button variant="destructive">Delete</flint-button>
            <flint-button variant="destructive">Remove</flint-button>
        </flint-button-group>
    `
};

export const TwoButtons: Story = {
    render: () => html`
        <flint-button-group>
            <flint-button variant="secondary">Yes</flint-button>
            <flint-button variant="secondary">No</flint-button>
        </flint-button-group>
    `
};
