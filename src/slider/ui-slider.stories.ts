import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-slider';

const meta: Meta = {
    title: 'Inputs/Slider',
    component: 'ui-slider',
    argTypes: {
        value: { control: { type: 'number' } },
        min: { control: { type: 'number' } },
        max: { control: { type: 'number' } },
        step: { control: { type: 'number' } },
        showValue: { control: 'boolean' },
        disabled: { control: 'boolean' },
        label: { control: 'text' },
        vertical: { control: 'boolean' },
    },
    args: {
        value: 50,
        min: 0,
        max: 100,
        step: 1,
        showValue: true,
        disabled: false,
        label: 'Volume',
        vertical: false,
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
        <ui-slider
            .value=${args.value}
            .min=${args.min}
            .max=${args.max}
            .step=${args.step}
            ?showValue=${args.showValue}
            ?disabled=${args.disabled}
            ?vertical=${args.vertical}
            label=${args.label}
            @change=${(e: CustomEvent) => console.log('Slider value:', e.detail.value)}
        ></ui-slider>
    `
};

export const Discrete: Story = {
    args: {
        label: 'Steps',
        step: 10,
        value: 20
    }
};

export const Disabled: Story = {
    args: {
        label: 'Brightness (Auto)',
        disabled: true,
        value: 30
    }
};

export const CustomRange: Story = {
    args: {
        label: 'Temperature (°C)',
        min: -20,
        max: 50,
        value: 22,
        showValue: true
    }
};

export const Vertical: Story = {
    args: {
        label: 'Volume',
        value: 60,
        showValue: true,
        vertical: true,
    },
    render: (args) => html`
        <!-- Give the host an explicit pixel height. The slider fills it entirely. -->
        <ui-slider
            .value=${args.value}
            .min=${args.min}
            .max=${args.max}
            .step=${args.step}
            ?showValue=${args.showValue}
            ?disabled=${args.disabled}
            ?vertical=${args.vertical}
            label=${args.label}
            style="--ui-slider-vertical-height: 260px;"
            @change=${(e: CustomEvent) => console.log('Slider value:', e.detail.value)}
        ></ui-slider>
    `
};

export const VerticalDisabled: Story = {
    args: {
        label: 'Locked',
        value: 40,
        showValue: true,
        vertical: true,
        disabled: true,
    },
    render: (args) => html`
        <ui-slider
            .value=${args.value}
            ?showValue=${args.showValue}
            ?disabled=${args.disabled}
            ?vertical=${args.vertical}
            label=${args.label}
            style="--ui-slider-vertical-height: 260px;"
        ></ui-slider>
    `
};

export const MixerPanel: Story = {
    render: () => html`
        <div style="
            display: inline-flex;
            gap: 8px;
            padding: 24px;
            background: var(--ui-surface-background, #fff);
            border-radius: 12px;
            box-shadow: var(--ui-shadow-md, 0 4px 12px rgba(0,0,0,0.1));
            font-family: var(--ui-font-family, 'Inter', sans-serif);
            /* Height is explicit on the panel; sliders fill it via align-items: stretch */
            height: 260px;
            align-items: stretch;
        ">
            <!-- Height is set directly on the host via --ui-slider-vertical-height,
                 which becomes the host's own height (inline-flex).
                 No wrapper height needed — the host IS the boundary. -->
            <ui-slider label="Bass"   value="70" showValue vertical style="--ui-slider-vertical-height: 100%;"></ui-slider>
            <ui-slider label="Mid"    value="50" showValue vertical style="--ui-slider-vertical-height: 100%;"></ui-slider>
            <ui-slider label="Treble" value="60" showValue vertical style="--ui-slider-vertical-height: 100%;"></ui-slider>
            <ui-slider label="FX"     value="30" showValue vertical style="--ui-slider-vertical-height: 100%;"></ui-slider>
            <ui-slider label="Master" value="80" showValue vertical style="--ui-slider-vertical-height: 100%;"></ui-slider>
        </div>
    `
};

export const SettingsPanel: Story = {
    render: () => html`
        <div style="max-width: 350px; padding: 24px; background: var(--ui-surface-background); border-radius: 12px; box-shadow: var(--ui-shadow-md); font-family: var(--ui-font-family);">
            <h3 style="margin-top: 0; margin-bottom: 24px;">Display Settings</h3>
            
            <ui-slider label="Brightness" value="70" showValue></ui-slider>
            <ui-slider label="Contrast" value="50" showValue></ui-slider>
            <ui-slider label="Saturation" value="80" showValue></ui-slider>
            
            <div style="margin-top: 16px; font-size: 12px; color: var(--ui-text-color-muted);">
                Changes are applied immediately.
            </div>
        </div>
    `
};