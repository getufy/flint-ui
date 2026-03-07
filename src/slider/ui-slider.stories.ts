import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-slider';
import type { UiSlider } from './ui-slider';

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
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
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
    size: 'md',
  },
};

export default meta;

type Story = StoryObj;

// ── Playground ─────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => html`
    <ui-slider
      .value=${args.value}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      ?show-value=${args.showValue}
      ?disabled=${args.disabled}
      ?vertical=${args.vertical}
      label=${args.label}
      size=${args.size}
      @ui-slider-change=${(e: CustomEvent) => console.log('Slider value:', e.detail.value)}
    ></ui-slider>
  `,
};

// ── Variants ───────────────────────────────────────────────────────────────

export const Discrete: Story = {
  args: { label: 'Steps', step: 10, value: 20 },
};

export const Disabled: Story = {
  args: { label: 'Brightness (Auto)', disabled: true, value: 30 },
};

export const NoLabel: Story = {
  name: 'No Label',
  args: { label: '', showValue: true, value: 65 },
};

export const CustomRange: Story = {
  name: 'Custom Range',
  args: { label: 'Temperature (°C)', min: -20, max: 50, value: 22, showValue: true },
};

// ── Sizes ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => html`
    <div style="max-width: 360px; display: flex; flex-direction: column; gap: 16px; font-family: var(--ui-font-family);">
      <ui-slider label="Small" size="sm" .value=${30} show-value></ui-slider>
      <ui-slider label="Medium" size="md" .value=${50} show-value></ui-slider>
      <ui-slider label="Large" size="lg" .value=${70} show-value></ui-slider>
    </div>
  `,
};

// ── Formatted value ────────────────────────────────────────────────────────

export const FormattedValue: Story = {
  name: 'Formatted Value',
  render: () => html`
    <div style="max-width: 360px; display: flex; flex-direction: column; gap: 24px; font-family: var(--ui-font-family);">
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; color: var(--ui-text-color-muted);">Percentage formatter</p>
        <ui-slider
          id="pct-slider"
          label="Opacity"
          .value=${75}
          show-value
        ></ui-slider>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; color: var(--ui-text-color-muted);">Currency formatter</p>
        <ui-slider
          id="usd-slider"
          label="Budget"
          min="0"
          max="1000"
          step="10"
          .value=${500}
          show-value
        ></ui-slider>
      </div>
      <script>
        /* set formatValue as a JS property after upgrade */
        customElements.whenDefined('ui-slider').then(() => {
          document.getElementById('pct-slider').formatValue = v => v + '%';
          document.getElementById('usd-slider').formatValue = v => '$' + v;
        });
      </script>
    </div>
  `,
};

// ── Controlled ─────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => html`
    <div
      style="max-width: 360px; font-family: var(--ui-font-family);"
      @ui-slider-change=${(e: CustomEvent) => {
        const host = (e.currentTarget as HTMLElement).querySelector('ui-slider') as UiSlider;
        host.value = e.detail.value;
        const output = (e.currentTarget as HTMLElement).querySelector('#ctrl-output') as HTMLElement;
        output.textContent = `Controlled value: ${e.detail.value}`;
      }}
    >
      <ui-slider label="Volume" .value=${40} show-value></ui-slider>
      <p id="ctrl-output" style="margin-top: 8px; font-size: 13px; color: var(--ui-text-color-muted);">Controlled value: 40</p>
    </div>
  `,
};

// ── Uncontrolled ───────────────────────────────────────────────────────────

export const Uncontrolled: Story = {
  render: () => html`
    <div style="max-width: 360px; font-family: var(--ui-font-family);">
      <p style="margin: 0 0 8px; font-size: 13px; color: var(--ui-text-color-muted);">
        Uses <code>default-value</code> — no external state needed.
      </p>
      <ui-slider label="Brightness" default-value="65" show-value></ui-slider>
    </div>
  `,
};

// ── Form integration ───────────────────────────────────────────────────────

export const FormIntegration: Story = {
  name: 'Form Integration',
  render: () => html`
    <form
      style="max-width: 360px; display: flex; flex-direction: column; gap: 16px; font-family: var(--ui-font-family);"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const pre = (e.target as HTMLElement).querySelector('#form-output') as HTMLElement;
        pre.textContent = JSON.stringify(Object.fromEntries(data), null, 2);
      }}
    >
      <ui-slider name="volume" label="Volume" .value=${70} show-value></ui-slider>
      <ui-slider name="balance" label="Balance" .value=${50} show-value></ui-slider>
      <button type="submit" style="padding: 8px 16px; cursor: pointer; width: fit-content;">Submit</button>
      <pre id="form-output" style="background: #f9fafb; padding: 12px; border-radius: 6px; font-size: 12px;"></pre>
    </form>
  `,
};

// ── Vertical ───────────────────────────────────────────────────────────────

export const Vertical: Story = {
  args: { label: 'Volume', value: 60, showValue: true, vertical: true },
  render: (args) => html`
    <ui-slider
      .value=${args.value}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      ?show-value=${args.showValue}
      ?disabled=${args.disabled}
      ?vertical=${args.vertical}
      label=${args.label}
      size=${args.size}
      style="--ui-slider-vertical-height: 260px;"
      @ui-slider-change=${(e: CustomEvent) => console.log('Slider value:', e.detail.value)}
    ></ui-slider>
  `,
};

export const VerticalDisabled: Story = {
  name: 'Vertical Disabled',
  args: { label: 'Locked', value: 40, showValue: true, vertical: true, disabled: true },
  render: (args) => html`
    <ui-slider
      .value=${args.value}
      ?show-value=${args.showValue}
      ?disabled=${args.disabled}
      ?vertical=${args.vertical}
      label=${args.label}
      style="--ui-slider-vertical-height: 260px;"
    ></ui-slider>
  `,
};

// ── Compositions ───────────────────────────────────────────────────────────

export const MixerPanel: Story = {
  name: 'Mixer Panel',
  render: () => html`
    <div style="
      display: inline-flex;
      gap: 8px;
      padding: 24px;
      background: var(--ui-surface-background, #fff);
      border-radius: 12px;
      box-shadow: var(--ui-shadow-md, 0 4px 12px rgba(0,0,0,0.1));
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      height: 260px;
      align-items: stretch;
    ">
      <ui-slider label="Bass"   .value=${70} show-value vertical style="--ui-slider-vertical-height: 100%;"></ui-slider>
      <ui-slider label="Mid"    .value=${50} show-value vertical style="--ui-slider-vertical-height: 100%;"></ui-slider>
      <ui-slider label="Treble" .value=${60} show-value vertical style="--ui-slider-vertical-height: 100%;"></ui-slider>
      <ui-slider label="FX"     .value=${30} show-value vertical style="--ui-slider-vertical-height: 100%;"></ui-slider>
      <ui-slider label="Master" .value=${80} show-value vertical style="--ui-slider-vertical-height: 100%;"></ui-slider>
    </div>
  `,
};

export const SettingsPanel: Story = {
  name: 'Settings Panel',
  render: () => html`
    <div style="max-width: 350px; padding: 24px; background: var(--ui-surface-background); border-radius: 12px; box-shadow: var(--ui-shadow-md); font-family: var(--ui-font-family);">
      <h3 style="margin-top: 0; margin-bottom: 24px;">Display Settings</h3>
      <ui-slider label="Brightness" .value=${70} show-value></ui-slider>
      <ui-slider label="Contrast"   .value=${50} show-value></ui-slider>
      <ui-slider label="Saturation" .value=${80} show-value></ui-slider>
      <div style="margin-top: 16px; font-size: 12px; color: var(--ui-text-color-muted);">
        Changes are applied immediately.
      </div>
    </div>
  `,
};
