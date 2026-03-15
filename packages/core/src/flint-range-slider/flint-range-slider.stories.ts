import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-range-slider.js';
import '../stack/flint-stack';

const meta: Meta = {
    title: 'Inputs/Range Slider',
    component: 'flint-range-slider',
    parameters: {
        docs: {
            description: {
                component: `
A range slider that lets users select a start and end value within a range.

- **Tag**: \`<flint-range-slider>\`
- **Class**: \`FlintRangeSlider\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`min\` | \`min\` | \`number\` | \`0\` | Minimum bound (default: 0). |
| \`max\` | \`max\` | \`number\` | \`100\` | Maximum bound (default: 100). |
| \`step\` | \`step\` | \`number\` | \`1\` | Step increment (default: 1). |
| \`size\` | \`size\` | \`'sm'\\|'md'\\|'lg'\` | \`'md'\` | Visual size of track and thumbs (default: 'md'). |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables both thumbs. |
| \`label\` | \`label\` | \`string\` | \`''\` | Label text shown above the track. |
| \`showValue\` | \`show-value\` | \`boolean\` | \`false\` | Show the current [start, end] values. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-range-slider-change\` | \`{ value: [number, number] }\` | When either thumb moves. detail: { value: [number, number] } |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-range-slider-track-height\` | — |
| \`--flint-range-slider-thumb-size\` | — |
| \`--flint-range-slider-track-color\` | — |
| \`--flint-range-slider-fill-color\` | — |
| \`--flint-range-slider-thumb-color\` | — |
| \`--flint-range-slider-thumb-border\` | — |
| \`--flint-font-family\` | — |
| \`--flint-text-color\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-shadow-sm\` | — |
| \`--flint-shadow-md\` | — |
                `,
            },
        },
    },
    argTypes: {
        value: {
            control: 'object',
            description: 'Current [start, end] values',
        },
        min: {
            control: 'number',
            description: 'Minimum bound',
        },
        max: {
            control: 'number',
            description: 'Maximum bound',
        },
        step: {
            control: 'number',
            description: 'Step increment',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Visual size of the track and thumbs',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables both thumbs',
        },
        label: {
            control: 'text',
            description: 'Label text shown above the track',
        },
        showValue: {
            control: 'boolean',
            description: 'Show the current [start, end] values',
        },
    },
    args: {
        value: [25, 75],
        min: 0,
        max: 100,
        step: 1,
        size: 'md',
        disabled: false,
        label: '',
        showValue: false,
    },
};

export default meta;
type Story = StoryObj;

// ─── Shared render helper ─────────────────────────────────────────────────────

function renderSlider(args: Record<string, unknown>) {
    const min = args['min'] as number;
    const max = args['max'] as number;
    const clamp = (v: number) => Math.max(min, Math.min(max, v));
    const value: [number, number] = [
        clamp((args['value'] as [number, number])[0]),
        clamp((args['value'] as [number, number])[1]),
    ];

    return html`
        <flint-range-slider
            .value=${value}
            .min=${min}
            .max=${max}
            .step=${args['step'] as number}
            .size=${args['size'] as string}
            .disabled=${args['disabled'] as boolean}
            .label=${args['label'] as string}
            .showValue=${args['showValue'] as boolean}
            @flint-range-slider-change=${(e: CustomEvent) => console.log('flint-range-slider-change:', e.detail.value)}
        ></flint-range-slider>
    `;
}

// ─── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
    name: 'Basic range slider',
    render: (args) => renderSlider(args),
};

// ─── With label and value ─────────────────────────────────────────────────────

export const WithLabelAndValue: Story = {
    name: 'With label and value display',
    args: {
        value: [20, 60],
        label: 'Price range',
        showValue: true,
    },
    render: (args) => html`
        <p style="font-size:14px;color:#555;margin-bottom:16px;">
            Use the <code>label</code> and <code>showValue</code> controls to customise.
        </p>
        ${renderSlider(args)}
    `,
};

// ─── Step ─────────────────────────────────────────────────────────────────────

export const WithStep: Story = {
    name: 'Custom step',
    args: {
        value: [20, 80],
        step: 10,
        label: 'Budget (×$10)',
        showValue: true,
    },
    render: (args) => html`
        <p style="font-size:14px;color:#555;margin-bottom:16px;">
            Adjust <code>step</code> in the controls to snap thumbs to fixed increments.
        </p>
        ${renderSlider(args)}
    `,
};

// ─── Custom min/max ───────────────────────────────────────────────────────────

export const CustomMinMax: Story = {
    name: 'Custom min / max',
    args: {
        value: [2000, 4500],
        min: 1000,
        max: 10000,
        step: 500,
        label: 'Salary range ($)',
        showValue: true,
    },
    render: (args) => html`
        <p style="font-size:14px;color:#555;margin-bottom:16px;">
            Adjust <code>min</code> and <code>max</code> in the controls to change the bounds.
        </p>
        ${renderSlider(args)}
    `,
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
    name: 'Sizes',
    parameters: { controls: { disable: true } },
    render: () => html`
        <p style="font-size:14px;color:#555;margin-bottom:16px;">
            The <code>size</code> prop scales the track thickness and thumb diameter.
        </p>
        <flint-stack direction="column" gap="16px" style="max-width:400px">
            <flint-range-slider
                .value=${[20, 80] as [number, number]}
                size="sm"
                label="Small"
                show-value
                @flint-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></flint-range-slider>
            <flint-range-slider
                .value=${[25, 75] as [number, number]}
                size="md"
                label="Medium (default)"
                show-value
                @flint-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></flint-range-slider>
            <flint-range-slider
                .value=${[30, 70] as [number, number]}
                size="lg"
                label="Large"
                show-value
                @flint-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></flint-range-slider>
        </flint-stack>
    `,
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
    name: 'Disabled',
    args: {
        value: [30, 70],
        label: 'Read-only range',
        showValue: true,
        disabled: true,
    },
    render: (args) => html`
        <p style="font-size:14px;color:#555;margin-bottom:16px;">
            Toggle <code>disabled</code> in the controls to enable or disable interaction.
        </p>
        ${renderSlider(args)}
    `,
};

// ─── Boundary test ────────────────────────────────────────────────────────────

export const BoundaryTest: Story = {
    name: 'Boundary test (thumbs at same position)',
    parameters: { controls: { disable: true } },
    render: () => html`
        <p style="font-size:14px;color:#555;margin-bottom:16px;">
            Both thumbs start at the same value. The last-touched thumb stays on
            top so neither gets permanently blocked.
        </p>
        <flint-range-slider
            .value=${[50, 50] as [number, number]}
            .label=${'Equal start'}
            .showValue=${true}
            @flint-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
        ></flint-range-slider>
        <flint-range-slider
            .value=${[0, 0] as [number, number]}
            .label=${'Both at min'}
            .showValue=${true}
            style="margin-top:24px;display:block"
            @flint-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
        ></flint-range-slider>
        <flint-range-slider
            .value=${[100, 100] as [number, number]}
            .label=${'Both at max'}
            .showValue=${true}
            style="margin-top:24px;display:block"
            @flint-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
        ></flint-range-slider>
    `,
};

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
    name: 'Controlled (synced display)',
    args: {
        value: [10, 90],
        label: 'Range',
        showValue: true,
    },
    render: (args) => {
        const min = args['min'] as number;
        const max = args['max'] as number;
        const clamp = (v: number) => Math.max(min, Math.min(max, v));
        const value: [number, number] = [
            clamp((args['value'] as [number, number])[0]),
            clamp((args['value'] as [number, number])[1]),
        ];

        const handleChange = (e: CustomEvent) => {
            const display = document.getElementById('range-display');
            if (display) display.textContent = `[${e.detail.value[0]}, ${e.detail.value[1]}]`;
        };

        return html`
            <p style="font-size:14px;color:#555;margin-bottom:16px;">
                Listen to the <code>flint-range-slider-change</code> event to read the current value.
                Current value: <strong id="range-display">[${value[0]}, ${value[1]}]</strong>
            </p>
            <flint-range-slider
                .value=${value}
                .min=${min}
                .max=${max}
                .step=${args['step'] as number}
                .size=${args['size'] as string}
                .disabled=${args['disabled'] as boolean}
                .label=${args['label'] as string}
                .showValue=${args['showValue'] as boolean}
                @flint-range-slider-change=${handleChange}
            ></flint-range-slider>
        `;
    },
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
    name: 'Dark mode',
    parameters: { controls: { disable: true } },
    render: () => html`
        <div class="flint-theme-dark" style="background:var(--flint-surface-background, #09090b);padding:24px;border-radius:8px">
            <flint-range-slider
                .value=${[25, 75] as [number, number]}
                label="Price range"
                show-value
                @flint-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></flint-range-slider>
            <flint-range-slider
                .value=${[30, 70] as [number, number]}
                size="lg"
                label="Large · dark"
                show-value
                style="margin-top:16px;display:block"
                @flint-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></flint-range-slider>
            <flint-range-slider
                .value=${[20, 60] as [number, number]}
                label="Disabled · dark"
                show-value
                disabled
                style="margin-top:16px;display:block"
                @flint-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></flint-range-slider>
        </div>
    `,
};

// ─── Accessibility ────────────────────────────────────────────────────────────

export const Accessibility: Story = {
    name: 'Accessibility',
    parameters: { controls: { disable: true } },
    render: () => html`
        <p style="font-size:14px;color:#555;margin-bottom:16px;">
            Each thumb exposes <code>aria-label</code>, <code>aria-valuemin</code>,
            <code>aria-valuemax</code>, and <code>aria-valuenow</code>. Screen readers
            announce the label as "<em>Price range start</em>" and "<em>Price range end</em>".
        </p>
        <flint-range-slider
            .value=${[200, 800] as [number, number]}
            .min=${0}
            .max=${1000}
            .step=${50}
            label="Price range"
            show-value
            style="max-width:400px;display:block"
            @flint-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
        ></flint-range-slider>
    `,
};
