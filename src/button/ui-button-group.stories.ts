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
