import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';
import './flint-rating';
import '../button/flint-button';
import type { FlintRating } from './flint-rating';

const meta: Meta = {
    title: 'Inputs/Rating',
    component: 'flint-rating',
    argTypes: {
        value:        { control: { type: 'number', min: 0, max: 10, step: 0.5 } },
        max:          { control: { type: 'number', min: 1, max: 10 } },
        defaultValue: { control: { type: 'number', min: 0, max: 10, step: 0.5 } },
        precision:    { control: 'select', options: [1, 0.5] },
        size:         { control: 'select', options: ['sm', 'md', 'lg'] },
        readonly:     { control: 'boolean' },
        disabled:     { control: 'boolean' },
        clearable:    { control: 'boolean' },
        name:         { control: 'text' },
        label:        { control: 'text' },
    },
    args: {
        value: 2,
        max: 5,
        defaultValue: 0,
        precision: 1,
        size: 'md',
        readonly: false,
        disabled: false,
        clearable: false,
        name: '',
        label: 'Rating',
    },
};

export default meta;

type Story = StoryObj;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
    render: (args: Record<string, unknown>) => html`
        <flint-rating
            .value=${args['value'] as number}
            .max=${args['max'] as number}
            .precision=${args['precision'] as 1 | 0.5}
            .size=${args['size'] as string}
            .label=${args['label'] as string}
            .name=${args['name'] as string}
            ?readonly=${args['readonly']}
            ?disabled=${args['disabled']}
            ?clearable=${args['clearable']}
            @flint-rating-change=${(e: CustomEvent) => console.log('flint-rating-change:', e.detail.value)}
        ></flint-rating>
    `,
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 20px; font-family: var(--flint-font-family);">
            <div style="display: flex; align-items: center; gap: 16px;">
                <span style="width: 32px; font-size: 12px; color: #6b7280;">sm</span>
                <flint-rating size="sm" .value=${3}></flint-rating>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <span style="width: 32px; font-size: 12px; color: #6b7280;">md</span>
                <flint-rating size="md" .value=${3}></flint-rating>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <span style="width: 32px; font-size: 12px; color: #6b7280;">lg</span>
                <flint-rating size="lg" .value=${3}></flint-rating>
            </div>
        </div>
    `,
};

// ─── ReadOnly ────────────────────────────────────────────────────────────────

export const ReadOnly: Story = {
    args: {
        value: 4,
        readonly: true,
    },
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--flint-font-family);">
            <div>
                <p style="font-size: 13px; color: #6b7280; margin: 0 0 8px;">Disabled (has value)</p>
                <flint-rating disabled .value=${3}></flint-rating>
            </div>
            <div>
                <p style="font-size: 13px; color: #6b7280; margin: 0 0 8px;">Disabled (no value)</p>
                <flint-rating disabled .value=${0}></flint-rating>
            </div>
        </div>
    `,
};

// ─── Clearable ───────────────────────────────────────────────────────────────

export const Clearable: Story = {
    render: () => html`
        <div style="font-family: var(--flint-font-family);">
            <p style="font-size: 13px; color: #6b7280; margin: 0 0 12px;">Click a selected star again to clear the rating.</p>
            <flint-rating .value=${3} clearable size="lg"
                @flint-rating-change=${(e: CustomEvent) => console.log('value:', e.detail.value)}
            ></flint-rating>
        </div>
    `,
};

// ─── HalfStar ────────────────────────────────────────────────────────────────

export const HalfStar: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--flint-font-family);">
            <div>
                <p style="font-size: 13px; color: #6b7280; margin: 0 0 8px;">precision=0.5, readonly display values</p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(v => html`
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span style="width: 28px; font-size: 13px; text-align: right;">${v}</span>
                            <flint-rating .value=${v} .precision=${0.5 as const} readonly size="sm"></flint-rating>
                        </div>
                    `)}
                </div>
            </div>
            <div>
                <p style="font-size: 13px; color: #6b7280; margin: 0 0 8px;">precision=0.5, interactive (hover left/right half)</p>
                <flint-rating .value=${2.5} .precision=${0.5 as const} size="lg"
                    @flint-rating-change=${(e: CustomEvent) => console.log('value:', e.detail.value)}
                ></flint-rating>
            </div>
        </div>
    `,
};

// ─── LargeMax ────────────────────────────────────────────────────────────────

export const LargeMax: Story = {
    args: {
        value: 7,
        max: 10,
    },
};

// ─── CustomColors ────────────────────────────────────────────────────────────

export const CustomColors: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--flint-font-family);">
            <div>
                <p style="font-size: 13px; color: #6b7280; margin: 0 0 8px;">Red / Love</p>
                <flint-rating .value=${3} style="--flint-rating-color: #ef4444;" size="lg"></flint-rating>
            </div>
            <div>
                <p style="font-size: 13px; color: #6b7280; margin: 0 0 8px;">Green / Success</p>
                <flint-rating .value=${5} style="--flint-rating-color: #22c55e;" size="lg"></flint-rating>
            </div>
            <div>
                <p style="font-size: 13px; color: #6b7280; margin: 0 0 8px;">Purple</p>
                <flint-rating .value=${4} style="--flint-rating-color: #a855f7;" size="lg"></flint-rating>
            </div>
        </div>
    `,
};

// ─── Controlled ──────────────────────────────────────────────────────────────

export const Controlled: Story = {
    render: () => {
        const ratingRef = createRef<FlintRating>();
        const labelRef = createRef<HTMLSpanElement>();

        const onReset = () => {
            if (ratingRef.value) {
                ratingRef.value.value = 0;
            }
            if (labelRef.value) labelRef.value.textContent = '0';
        };

        return html`
            <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--flint-font-family);">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <flint-rating
                        ${ref(ratingRef)}
                        .value=${3}
                        size="lg"
                        @flint-rating-change=${(e: CustomEvent) => {
                            if (labelRef.value) labelRef.value.textContent = String(e.detail.value);
                        }}
                    ></flint-rating>
                    <span style="font-size: 14px; color: #374151;">Value: <strong><span ${ref(labelRef)}>3</span></strong></span>
                </div>
                <flint-button variant="secondary" size="small" @click=${onReset}>Reset</flint-button>
            </div>
        `;
    },
};

// ─── Uncontrolled ────────────────────────────────────────────────────────────

export const Uncontrolled: Story = {
    render: () => html`
        <div style="font-family: var(--flint-font-family);">
            <p style="font-size: 13px; color: #6b7280; margin: 0 0 12px;">
                Uses <code>defaultValue</code> — no external state management needed.
            </p>
            <flint-rating .defaultValue=${2} size="lg"
                @flint-rating-change=${(e: CustomEvent) => console.log('value:', e.detail.value)}
            ></flint-rating>
        </div>
    `,
};

// ─── FormIntegration ─────────────────────────────────────────────────────────

export const FormIntegration: Story = {
    render: () => {
        const onSubmit = (e: SubmitEvent) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const data = new FormData(form);
            alert(`Submitted rating: ${data.get('product-rating') ?? '(none)'}`);
        };

        return html`
            <form @submit=${onSubmit} style="display: flex; flex-direction: column; gap: 16px; max-width: 300px; font-family: var(--flint-font-family);">
                <label style="font-weight: 600; font-size: 14px;">Rate this product</label>
                <flint-rating name="product-rating" .value=${0} size="lg"></flint-rating>
                <flint-button type="submit" variant="primary" size="medium">Submit Review</flint-button>
            </form>
        `;
    },
};

// ─── ReviewExample ───────────────────────────────────────────────────────────

export const ReviewExample: Story = {
    render: () => html`
        <div style="max-width: 400px; padding: 24px; background: var(--flint-surface-background); border-radius: 12px; box-shadow: var(--flint-shadow-md); font-family: var(--flint-font-family);">
            <h3 style="margin-top: 0; margin-bottom: 8px;">Customer Reviews</h3>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
                <flint-rating .value=${4} readonly size="sm"></flint-rating>
                <span style="font-weight: 600;">4.0 out of 5</span>
            </div>
            <p style="color: var(--flint-text-color-muted); font-size: 14px; margin-bottom: 24px;">1,234 global ratings</p>

            <hr style="border: 0; border-top: 1px solid var(--flint-border-color); margin-bottom: 24px;" />

            <h4 style="margin-bottom: 12px;">Review this product</h4>
            <p style="font-size: 14px; margin-bottom: 16px;">Share your thoughts with other customers</p>
            <flint-rating .value=${0} size="md" clearable style="margin-bottom: 16px;"
                @flint-rating-change=${(e: CustomEvent) => console.log('Rating:', e.detail.value)}
            ></flint-rating>
            <flint-button variant="secondary" size="medium" full-width>Write a customer review</flint-button>
        </div>
    `,
};
