import type { Meta, StoryObj } from '@storybook/web-components';
import '../button/flint-button';
import { html } from 'lit';
import '../box/flint-box';
import './flint-slider';
import '../button/flint-button';
import type { FlintSlider } from './flint-slider';
import '../button/flint-button';

const meta: Meta = {
  title: 'Inputs/Slider',
  component: 'flint-slider',
  parameters: {
      docs: {
            description: {
                component: `
Slider: a range input for selecting a numeric value.

- **Tag**: \`<flint-slider>\`
- **Class**: \`FlintSlider\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`number\` | \`50\` | Current slider value. |
| \`defaultValue\` | \`default-value\` | \`number \\| undefined\` | \`undefined\` | Initial value for uncontrolled usage. |
| \`min\` | \`min\` | \`number\` | \`0\` | Minimum allowed value. |
| \`max\` | \`max\` | \`number\` | \`100\` | Maximum allowed value. |
| \`step\` | \`step\` | \`number\` | \`1\` | Step increment between values. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the slider and prevents interaction. |
| \`label\` | \`label\` | \`string\` | \`''\` | Label text displayed above the slider. |
| \`showValue\` | \`show-value\` | \`boolean\` | \`false\` | Whether to display the current value. |
| \`vertical\` | \`vertical\` | \`boolean\` | \`false\` | Renders the slider vertically. |
| \`size\` | \`size\` | \`Size\` | \`'md'\` | Size variant of the slider. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name used when submitting form data. |
| \`formatValue\` | \`format-value\` | \`number\` | — | Optional formatter: \`(value: number) =&gt; string\`. JS-only prop (not an attribute). |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-slider-change\` | — | Fired when the slider value changes. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-slider-vertical-height\` | \`200px\` |
| \`--flint-font-family\` | — |
| \`--flint-text-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-shadow-sm\` | — |
| \`--flint-shadow-md\` | — |
| \`--flint-text-color-muted\` | — |
                `,
            },
        },
  },
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
    <flint-slider
      .value=${args.value}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      ?show-value=${args.showValue}
      ?disabled=${args.disabled}
      ?vertical=${args.vertical}
      label=${args.label}
      size=${args.size}
      @flint-slider-change=${(e: CustomEvent) => console.log('Slider value:', e.detail.value)}
    ></flint-slider>
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
    <div style="max-width: 360px; display: flex; flex-direction: column; gap: 16px; font-family: var(--flint-font-family);">
      <flint-slider label="Small" size="sm" .value=${30} show-value></flint-slider>
      <flint-slider label="Medium" size="md" .value=${50} show-value></flint-slider>
      <flint-slider label="Large" size="lg" .value=${70} show-value></flint-slider>
    </div>
  `,
};

// ── Formatted value ────────────────────────────────────────────────────────

export const FormattedValue: Story = {
  name: 'Formatted Value',
  render: () => html`
    <div style="max-width: 360px; display: flex; flex-direction: column; gap: 24px; font-family: var(--flint-font-family);">
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; color: var(--flint-text-color-muted);">Percentage formatter</p>
        <flint-slider
          id="pct-slider"
          label="Opacity"
          .value=${75}
          show-value
        ></flint-slider>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; color: var(--flint-text-color-muted);">Currency formatter</p>
        <flint-slider
          id="usd-slider"
          label="Budget"
          min="0"
          max="1000"
          step="10"
          .value=${500}
          show-value
        ></flint-slider>
      </div>
      <script>
        /* set formatValue as a JS property after upgrade */
        customElements.whenDefined('flint-slider').then(() => {
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
      style="max-width: 360px; font-family: var(--flint-font-family);"
      @flint-slider-change=${(e: CustomEvent) => {
        const host = (e.currentTarget as HTMLElement).querySelector('flint-slider') as FlintSlider;
        host.value = e.detail.value;
        const output = (e.currentTarget as HTMLElement).querySelector('#ctrl-output') as HTMLElement;
        output.textContent = `Controlled value: ${e.detail.value}`;
      }}
    >
      <flint-slider label="Volume" .value=${40} show-value></flint-slider>
      <p id="ctrl-output" style="margin-top: 8px; font-size: 13px; color: var(--flint-text-color-muted);">Controlled value: 40</p>
    </div>
  `,
};

// ── Uncontrolled ───────────────────────────────────────────────────────────

export const Uncontrolled: Story = {
  render: () => html`
    <div style="max-width: 360px; font-family: var(--flint-font-family);">
      <p style="margin: 0 0 8px; font-size: 13px; color: var(--flint-text-color-muted);">
        Uses <code>default-value</code> — no external state needed.
      </p>
      <flint-slider label="Brightness" default-value="65" show-value></flint-slider>
    </div>
  `,
};

// ── Form integration ───────────────────────────────────────────────────────

export const FormIntegration: Story = {
  name: 'Form Integration',
  render: () => html`
    <form
      style="max-width: 360px; display: flex; flex-direction: column; gap: 16px; font-family: var(--flint-font-family);"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const pre = (e.target as HTMLElement).querySelector('#form-output') as HTMLElement;
        pre.textContent = JSON.stringify(Object.fromEntries(data), null, 2);
      }}
    >
      <flint-slider name="volume" label="Volume" .value=${70} show-value></flint-slider>
      <flint-slider name="balance" label="Balance" .value=${50} show-value></flint-slider>
      <flint-button type="submit">Submit</flint-button>
      <flint-box as="pre" id="form-output" bgcolor="var(--flint-muted-background, #f9fafb)" p="12px" borderRadius="6px" style="font-size: 12px;"></flint-box>
    </form>
  `,
};

// ── Vertical ───────────────────────────────────────────────────────────────

export const Vertical: Story = {
  args: { label: 'Volume', value: 60, showValue: true, vertical: true },
  render: (args) => html`
    <flint-slider
      .value=${args.value}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      ?show-value=${args.showValue}
      ?disabled=${args.disabled}
      ?vertical=${args.vertical}
      label=${args.label}
      size=${args.size}
      style="--flint-slider-vertical-height: 260px;"
      @flint-slider-change=${(e: CustomEvent) => console.log('Slider value:', e.detail.value)}
    ></flint-slider>
  `,
};

export const VerticalDisabled: Story = {
  name: 'Vertical Disabled',
  args: { label: 'Locked', value: 40, showValue: true, vertical: true, disabled: true },
  render: (args) => html`
    <flint-slider
      .value=${args.value}
      ?show-value=${args.showValue}
      ?disabled=${args.disabled}
      ?vertical=${args.vertical}
      label=${args.label}
      style="--flint-slider-vertical-height: 260px;"
    ></flint-slider>
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
      background: var(--flint-surface-background, #fff);
      border-radius: 12px;
      box-shadow: var(--flint-shadow-md, 0 4px 12px rgba(0,0,0,0.1));
      font-family: var(--flint-font-family, 'Inter', sans-serif);
      height: 260px;
      align-items: stretch;
    ">
      <flint-slider label="Bass"   .value=${70} show-value vertical style="--flint-slider-vertical-height: 100%;"></flint-slider>
      <flint-slider label="Mid"    .value=${50} show-value vertical style="--flint-slider-vertical-height: 100%;"></flint-slider>
      <flint-slider label="Treble" .value=${60} show-value vertical style="--flint-slider-vertical-height: 100%;"></flint-slider>
      <flint-slider label="FX"     .value=${30} show-value vertical style="--flint-slider-vertical-height: 100%;"></flint-slider>
      <flint-slider label="Master" .value=${80} show-value vertical style="--flint-slider-vertical-height: 100%;"></flint-slider>
    </div>
  `,
};

export const SettingsPanel: Story = {
  name: 'Settings Panel',
  render: () => html`
    <div style="max-width: 350px; padding: 24px; background: var(--flint-surface-background); border-radius: 12px; box-shadow: var(--flint-shadow-md); font-family: var(--flint-font-family);">
      <h3 style="margin-top: 0; margin-bottom: 24px;">Display Settings</h3>
      <flint-slider label="Brightness" .value=${70} show-value></flint-slider>
      <flint-slider label="Contrast"   .value=${50} show-value></flint-slider>
      <flint-slider label="Saturation" .value=${80} show-value></flint-slider>
      <div style="margin-top: 16px; font-size: 12px; color: var(--flint-text-color-muted);">
        Changes are applied immediately.
      </div>
    </div>
  `,
};
