import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-button-group';
import './flint-button';

const meta: Meta = {
    title: 'Inputs/Button Group',
    component: 'flint-button-group',
    argTypes: {
        appearance: {
            control: 'select',
            options: ['filled', 'outlined', 'text', 'ghost'],
        },
        color: {
            control: 'select',
            options: ['primary', 'neutral', 'destructive', 'success', 'warning'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        disabled: { control: 'boolean' },
    },
    args: {
        appearance: 'outlined',
        color: 'neutral',
        size: 'medium',
        disabled: false,
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
        <flint-button-group>
            <flint-button appearance=${args.appearance} color=${args.color} size=${args.size} ?disabled=${args.disabled}>One</flint-button>
            <flint-button appearance=${args.appearance} color=${args.color} size=${args.size} ?disabled=${args.disabled}>Two</flint-button>
            <flint-button appearance=${args.appearance} color=${args.color} size=${args.size} ?disabled=${args.disabled}>Three</flint-button>
        </flint-button-group>
    `
};

export const AllVariants: Story = {
    render: (args) => html`
        <div style="display: flex; flex-direction: column; gap: 20px;">
            <div>
                <h4 style="font-family: var(--flint-font-family); margin-bottom: 8px;">Secondary</h4>
                <flint-button-group>
                    <flint-button appearance="outlined" color="neutral" size=${args.size}>One</flint-button>
                    <flint-button appearance="outlined" color="neutral" size=${args.size}>Two</flint-button>
                    <flint-button appearance="outlined" color="neutral" size=${args.size}>Three</flint-button>
                </flint-button-group>
            </div>

            <div>
                <h4 style="font-family: var(--flint-font-family); margin-bottom: 8px;">Primary</h4>
                <flint-button-group>
                    <flint-button appearance="filled" color="primary" size=${args.size}>One</flint-button>
                    <flint-button appearance="filled" color="primary" size=${args.size}>Two</flint-button>
                    <flint-button appearance="filled" color="primary" size=${args.size}>Three</flint-button>
                </flint-button-group>
            </div>

            <div>
                <h4 style="font-family: var(--flint-font-family); margin-bottom: 8px;">Small</h4>
                <flint-button-group>
                    <flint-button appearance="outlined" color="neutral" size="small">Left</flint-button>
                    <flint-button appearance="outlined" color="neutral" size="small">Center</flint-button>
                    <flint-button appearance="outlined" color="neutral" size="small">Right</flint-button>
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
                    <flint-button appearance="outlined" color="neutral" size="small">One</flint-button>
                    <flint-button appearance="outlined" color="neutral" size="small">Two</flint-button>
                    <flint-button appearance="outlined" color="neutral" size="small">Three</flint-button>
                </flint-button-group>
            </div>
            <div>
                <h4 style="font-family: var(--flint-font-family); margin-bottom: 8px;">Medium</h4>
                <flint-button-group>
                    <flint-button appearance="outlined" color="neutral" size="medium">One</flint-button>
                    <flint-button appearance="outlined" color="neutral" size="medium">Two</flint-button>
                    <flint-button appearance="outlined" color="neutral" size="medium">Three</flint-button>
                </flint-button-group>
            </div>
            <div>
                <h4 style="font-family: var(--flint-font-family); margin-bottom: 8px;">Large</h4>
                <flint-button-group>
                    <flint-button appearance="outlined" color="neutral" size="large">One</flint-button>
                    <flint-button appearance="outlined" color="neutral" size="large">Two</flint-button>
                    <flint-button appearance="outlined" color="neutral" size="large">Three</flint-button>
                </flint-button-group>
            </div>
        </div>
    `
};

export const Disabled: Story = {
    render: () => html`
        <flint-button-group>
            <flint-button appearance="outlined" color="neutral" disabled>One</flint-button>
            <flint-button appearance="outlined" color="neutral" disabled>Two</flint-button>
            <flint-button appearance="outlined" color="neutral" disabled>Three</flint-button>
        </flint-button-group>
    `
};

export const Destructive: Story = {
    render: () => html`
        <flint-button-group>
            <flint-button appearance="filled" color="destructive">Cancel</flint-button>
            <flint-button appearance="filled" color="destructive">Delete</flint-button>
            <flint-button appearance="filled" color="destructive">Remove</flint-button>
        </flint-button-group>
    `
};

export const TwoButtons: Story = {
    render: () => html`
        <flint-button-group>
            <flint-button appearance="outlined" color="neutral">Yes</flint-button>
            <flint-button appearance="outlined" color="neutral">No</flint-button>
        </flint-button-group>
    `
};
