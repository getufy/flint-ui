import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-rating';
import '../button/ui-button';

const meta: Meta = {
    title: 'Inputs/Rating',
    component: 'ui-rating',
    argTypes: {
        value: { control: { type: 'number', min: 0, max: 10 } },
        max: { control: { type: 'number', min: 1, max: 10 } },
        readonly: { control: 'boolean' },
    },
    args: {
        value: 2,
        max: 5,
        readonly: false,
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: (args: Record<string, unknown>) => html`
        <ui-rating
            .value=${args.value}
            .max=${args.max}
            ?readonly=${args.readonly}
            @change=${(e: CustomEvent) => console.log('Rating changed:', e.detail.value)}
        ></ui-rating>
    `
};

export const ReadOnly: Story = {
    args: {
        value: 4,
        readonly: true,
    },
};

export const LargeMax: Story = {
    args: {
        value: 7,
        max: 10,
    },
};

export const CustomColors: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
                <p style="font-family: var(--ui-font-family); font-size: 14px; margin-bottom: 8px;">Heart Rating (CSS override)</p>
                <ui-rating 
                    value="3" 
                    style="--ui-rating-color: #ef4444; font-size: 3rem;"
                ></ui-rating>
            </div>
            <div>
                <p style="font-family: var(--ui-font-family); font-size: 14px; margin-bottom: 8px;">Success Color</p>
                <ui-rating 
                    value="5" 
                    style="--ui-rating-color: #22c55e; font-size: 1.5rem;"
                ></ui-rating>
            </div>
        </div>
    `
};

export const ReviewExample: Story = {
    render: () => html`
        <div style="max-width: 400px; padding: 24px; background: var(--ui-surface-background); border-radius: 12px; box-shadow: var(--ui-shadow-md); font-family: var(--ui-font-family);">
            <h3 style="margin-top: 0; margin-bottom: 8px;">Customer Reviews</h3>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
                <ui-rating value="4" readonly style="font-size: 1.25rem;"></ui-rating>
                <span style="font-weight: 600;">4.0 out of 5</span>
            </div>
            <p style="color: var(--ui-text-color-muted); font-size: 14px; margin-bottom: 24px;">1,234 global ratings</p>
            
            <hr style="border: 0; border-top: 1px solid var(--ui-border-color); margin-bottom: 24px;" />
            
            <h4 style="margin-bottom: 12px;">Review this product</h4>
            <p style="font-size: 14px; margin-bottom: 16px;">Share your thoughts with other customers</p>
            <ui-rating value="0" style="font-size: 2rem; margin-bottom: 16px;"></ui-rating>
            <ui-button variant="secondary" size="medium" full-width>Write a customer review</ui-button>
        </div>
    `
};
