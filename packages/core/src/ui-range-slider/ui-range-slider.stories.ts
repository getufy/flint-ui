import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-range-slider.js';
import '../stack/ui-stack';

const meta: Meta = {
    title: 'Inputs/Range Slider',
    component: 'ui-range-slider',
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
        <ui-range-slider
            .value=${value}
            .min=${min}
            .max=${max}
            .step=${args['step'] as number}
            .size=${args['size'] as string}
            .disabled=${args['disabled'] as boolean}
            .label=${args['label'] as string}
            .showValue=${args['showValue'] as boolean}
            @ui-range-slider-change=${(e: CustomEvent) => console.log('ui-range-slider-change:', e.detail.value)}
        ></ui-range-slider>
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
        <ui-stack direction="column" gap="16px" style="max-width:400px">
            <ui-range-slider
                .value=${[20, 80] as [number, number]}
                size="sm"
                label="Small"
                show-value
                @ui-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></ui-range-slider>
            <ui-range-slider
                .value=${[25, 75] as [number, number]}
                size="md"
                label="Medium (default)"
                show-value
                @ui-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></ui-range-slider>
            <ui-range-slider
                .value=${[30, 70] as [number, number]}
                size="lg"
                label="Large"
                show-value
                @ui-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></ui-range-slider>
        </ui-stack>
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
        <ui-range-slider
            .value=${[50, 50] as [number, number]}
            .label=${'Equal start'}
            .showValue=${true}
            @ui-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
        ></ui-range-slider>
        <ui-range-slider
            .value=${[0, 0] as [number, number]}
            .label=${'Both at min'}
            .showValue=${true}
            style="margin-top:24px;display:block"
            @ui-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
        ></ui-range-slider>
        <ui-range-slider
            .value=${[100, 100] as [number, number]}
            .label=${'Both at max'}
            .showValue=${true}
            style="margin-top:24px;display:block"
            @ui-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
        ></ui-range-slider>
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
                Listen to the <code>ui-range-slider-change</code> event to read the current value.
                Current value: <strong id="range-display">[${value[0]}, ${value[1]}]</strong>
            </p>
            <ui-range-slider
                .value=${value}
                .min=${min}
                .max=${max}
                .step=${args['step'] as number}
                .size=${args['size'] as string}
                .disabled=${args['disabled'] as boolean}
                .label=${args['label'] as string}
                .showValue=${args['showValue'] as boolean}
                @ui-range-slider-change=${handleChange}
            ></ui-range-slider>
        `;
    },
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
    name: 'Dark mode',
    parameters: { controls: { disable: true } },
    render: () => html`
        <div class="ui-theme-dark" style="background:var(--ui-surface-background, #09090b);padding:24px;border-radius:8px">
            <ui-range-slider
                .value=${[25, 75] as [number, number]}
                label="Price range"
                show-value
                @ui-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></ui-range-slider>
            <ui-range-slider
                .value=${[30, 70] as [number, number]}
                size="lg"
                label="Large · dark"
                show-value
                style="margin-top:16px;display:block"
                @ui-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></ui-range-slider>
            <ui-range-slider
                .value=${[20, 60] as [number, number]}
                label="Disabled · dark"
                show-value
                disabled
                style="margin-top:16px;display:block"
                @ui-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
            ></ui-range-slider>
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
        <ui-range-slider
            .value=${[200, 800] as [number, number]}
            .min=${0}
            .max=${1000}
            .step=${50}
            label="Price range"
            show-value
            style="max-width:400px;display:block"
            @ui-range-slider-change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
        ></ui-range-slider>
    `,
};
