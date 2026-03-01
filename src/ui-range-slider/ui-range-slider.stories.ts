import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-range-slider.js';

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
            .disabled=${args['disabled'] as boolean}
            .label=${args['label'] as string}
            .showValue=${args['showValue'] as boolean}
            @change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
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
    // Intentionally no args — this story is illustrative with fixed values
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
            @change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
        ></ui-range-slider>
        <ui-range-slider
            .value=${[0, 0] as [number, number]}
            .label=${'Both at min'}
            .showValue=${true}
            style="margin-top:24px;display:block"
            @change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
        ></ui-range-slider>
        <ui-range-slider
            .value=${[100, 100] as [number, number]}
            .label=${'Both at max'}
            .showValue=${true}
            style="margin-top:24px;display:block"
            @change=${(e: CustomEvent) => console.log('change:', e.detail.value)}
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
                Listen to the <code>change</code> event to read the current value.
                Current value: <strong id="range-display">[${value[0]}, ${value[1]}]</strong>
            </p>
            <ui-range-slider
                .value=${value}
                .min=${min}
                .max=${max}
                .step=${args['step'] as number}
                .disabled=${args['disabled'] as boolean}
                .label=${args['label'] as string}
                .showValue=${args['showValue'] as boolean}
                @change=${handleChange}
            ></ui-range-slider>
        `;
    },
};