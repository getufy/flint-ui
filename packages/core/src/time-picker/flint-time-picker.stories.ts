import { Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';
import './flint-time-picker.js';
import '../paper/flint-paper';
import '../stack/flint-stack.js';

const meta: Meta = {
  title: 'Date & Time/Time Picker',
  component: 'flint-time-picker',
  parameters: {
      docs: {
            description: {
                component: `
#### \`<flint-time-field>\`

- **Tag**: \`<flint-time-field>\`
- **Class**: \`FlintTimeField\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Time value in HH:MM:SS format. |
| \`label\` | \`label\` | \`string\` | \`''\` | Field label text. |
| \`ampm\` | \`ampm\` | \`boolean\` | \`true\` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| \`seconds\` | \`seconds\` | \`boolean\` | \`false\` | Whether to show a seconds segment. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the field and prevents interaction. |
| \`readonly\` | \`readonly\` | \`boolean\` | \`false\` | Makes the field read-only (visible but not editable). |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Displays the field in an error state. |
| \`helperText\` | \`helper-text\` | \`string\` | \`''\` | Helper text shown below the field. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-time-picker-clear\` | — |  |
| \`change\` | \`{ value: v }\` |  |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-time-field-height\` | \`44px\` |
| \`--flint-time-field-min-width\` | \`160px\` |
| \`--flint-font-family\` | — |
| \`--flint-text-color\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-border-radius-xl\` | — |
| \`--flint-msdc-height\` | \`240px\` |
| \`--flint-surface-1\` | — |
| \`--flint-border-color\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-error-color\` | — |
| \`--flint-input-bg\` | — |
| \`--flint-border-radius-md\` | — |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-input-disabled-bg\` | — |

#### Methods

| Method | Description |
|---|---|
| \`clear()\` |  |

---

#### \`<flint-digital-clock>\`

- **Tag**: \`<flint-digital-clock>\`
- **Class**: \`FlintDigitalClock\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Time value in HH:MM:SS format. |
| \`step\` | \`step\` | \`number\` | \`30\` | Step interval in minutes between selectable times. |
| \`ampm\` | \`ampm\` | \`boolean\` | \`true\` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`change\` | \`{ value: v }\` |  |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-digital-clock-height\` | \`300px\` |

---

#### \`<flint-multi-section-digital-clock>\`

- **Tag**: \`<flint-multi-section-digital-clock>\`
- **Class**: \`FlintMultiSectionDigitalClock\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Time value in HH:MM:SS format. |
| \`ampm\` | \`ampm\` | \`boolean\` | \`true\` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| \`seconds\` | \`seconds\` | \`boolean\` | \`false\` | Whether to show a seconds column. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`change\` | \`{ value: v }\` |  |

---

#### \`<flint-time-clock>\`

- **Tag**: \`<flint-time-clock>\`
- **Class**: \`FlintTimeClock\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Time value in HH:MM:SS format. |
| \`ampm\` | \`ampm\` | \`boolean\` | \`true\` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| \`seconds\` | \`seconds\` | \`boolean\` | \`false\` | Whether to show a seconds face on the clock. |
| \`view\` | \`view\` | \`TimeView\` | \`'hours'\` | Currently active clock face view. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`change\` | \`{ value: v }\` |  |
| \`flint-time-clock-view-change\` | \`{ view: v }\` |  |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-time-clock-face-bg\` | \`var(--flint-surface-variant, #f1f5f9\` |
| \`--flint-time-clock-inner-bg\` | \`rgba(0,0,0,.04\` |
| \`--flint-time-clock-inner-border\` | \`var(--flint-border-color, #e5e7eb\` |
| \`--flint-time-clock-hand-color\` | \`var(--flint-primary-color, #3b82f6\` |
| \`--flint-time-clock-num-size\` | \`14px\` |
| \`--flint-time-clock-inner-num-size\` | \`12px\` |
| \`--flint-time-clock-ampm-radius\` | \`20px\` |

---

#### \`<flint-desktop-time-picker>\`

- **Tag**: \`<flint-desktop-time-picker>\`
- **Class**: \`FlintDesktopTimePicker\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Time value in HH:MM:SS format. |
| \`label\` | \`label\` | \`string\` | \`'Time'\` | Field label text. |
| \`ampm\` | \`ampm\` | \`boolean\` | \`true\` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| \`seconds\` | \`seconds\` | \`boolean\` | \`false\` | Whether to show a seconds segment. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the picker and prevents interaction. |
| \`readonly\` | \`readonly\` | \`boolean\` | \`false\` | Makes the field read-only (visible but not editable). |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Displays the field in an error state. |
| \`helperText\` | \`helper-text\` | \`string\` | \`''\` | Helper text shown below the field. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`change\` | \`{ value: v }\` |  |

---

#### \`<flint-mobile-time-picker>\`

- **Tag**: \`<flint-mobile-time-picker>\`
- **Class**: \`FlintMobileTimePicker\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Time value in HH:MM:SS format. |
| \`label\` | \`label\` | \`string\` | \`'Time'\` | Field label text. |
| \`ampm\` | \`ampm\` | \`boolean\` | \`true\` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| \`seconds\` | \`seconds\` | \`boolean\` | \`false\` | Whether to show a seconds segment. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the picker and prevents interaction. |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Displays the picker in an error state. |
| \`helperText\` | \`helper-text\` | \`string\` | \`''\` | Helper text shown below the field. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`change\` | — |  |

---

#### \`<flint-static-time-picker>\`

- **Tag**: \`<flint-static-time-picker>\`
- **Class**: \`FlintStaticTimePicker\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Time value in HH:MM:SS format. |
| \`ampm\` | \`ampm\` | \`boolean\` | \`true\` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| \`seconds\` | \`seconds\` | \`boolean\` | \`false\` | Whether to show a seconds section. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`change\` | — |  |

---

#### \`<flint-time-picker>\`

- **Tag**: \`<flint-time-picker>\`
- **Class**: \`FlintTimePicker\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Time value in HH:MM:SS format. |
| \`label\` | \`label\` | \`string\` | \`'Time'\` | Field label text. |
| \`variant\` | \`variant\` | \`'desktop' \\| 'mobile' \\| 'static' \\| 'auto'\` | \`'desktop'\` | Picker variant controlling the UI style. |
| \`ampm\` | \`ampm\` | \`boolean\` | \`true\` | Whether to use 12-hour (AM/PM) format instead of 24-hour. |
| \`seconds\` | \`seconds\` | \`boolean\` | \`false\` | Whether to show a seconds segment. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the picker and prevents interaction. |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Displays the picker in an error state. |
| \`helperText\` | \`helper-text\` | \`string\` | \`''\` | Helper text shown below the field. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`change\` | — |  |
                `,
            },
        },
  },
  argTypes: {
    variant: { control: 'select', options: ['desktop', 'mobile', 'static', 'auto'] },
    value: { control: 'text' },
    label: { control: 'text' },
    ampm: { control: 'boolean' },
    seconds: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: { variant: 'desktop', label: 'Time', value: '', ampm: true, seconds: false, disabled: false, error: false },
};
export default meta;
type Story = StoryObj;

const pad = (content: TemplateResult) => html`<div style="padding:48px 48px 300px;font-family:Inter,sans-serif;">${content}</div>`;

/* eslint-disable @typescript-eslint/no-explicit-any */
const clockHandler = (e: CustomEvent) => { (e.target as any).value = e.detail.value; };
/* eslint-enable @typescript-eslint/no-explicit-any */

// ── Playground (default) ─────────────────────────────────────────────────────
export const Default: Story = {
  render: (args) => pad(html`
    <flint-time-picker
      .variant=${args.variant} .value=${args.value ?? ''} .label=${args.label}
      ?ampm=${args.ampm} ?seconds=${args.seconds} ?disabled=${args.disabled} ?error=${args.error}
      @change=${(e: CustomEvent) => console.log('change →', e.detail.value)}
    ></flint-time-picker>
  `),
};

// ── Desktop ──────────────────────────────────────────────────────────────────
export const Desktop: Story = {
  name: 'Desktop Picker',
  render: () => html`
    <div style="padding:48px;font-family:Inter,sans-serif;padding-bottom:320px;">
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 18px;">
        Calendar icon opens a <strong>multi-section digital clock</strong> popover with scrollable Hr / Min / AM/PM columns.
      </p>
      <flint-desktop-time-picker label="Appointment Time" value="14:30:00"
        @change=${(e: CustomEvent) => console.log(e.detail.value)}
      ></flint-desktop-time-picker>
    </div>
  `,
};

// ── Mobile ───────────────────────────────────────────────────────────────────
export const Mobile: Story = {
  name: 'Mobile Picker (Modal)',
  render: () => html`
    <div style="padding:48px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 18px;">
        On touch devices the picker opens inside a dialog with an <strong>analog clock face</strong>.
        Tap hours → then minutes auto-advances.
      </p>
      <flint-mobile-time-picker label="Meeting Time" value="09:00:00"
        @change=${(e: CustomEvent) => console.log(e.detail.value)}
      ></flint-mobile-time-picker>
    </div>
  `,
};

// ── Static ───────────────────────────────────────────────────────────────────
export const Static: Story = {
  name: 'Static (Always Visible)',
  render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 18px;">
        Renders the multi-section digital clock inline — no field or popover.
      </p>
      <flint-static-time-picker value="10:45:00"></flint-static-time-picker>
    </div>
  `,
};

// ── Digital Clock ────────────────────────────────────────────────────────────
export const DigitalClock: Story = {
  name: 'Digital Clock (List)',
  render: () => html`
    <flint-stack direction="row" gap="32px" alignItems="flex-start" style="padding:32px;font-family:Inter,sans-serif;flex-wrap:wrap;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">30 min steps (default)</p>
        <flint-paper elevation="0" variant="outlined" style="width: 180px; overflow: hidden;">
          <flint-digital-clock value="10:30:00" step=30></flint-digital-clock>
        </flint-paper>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">15 min steps</p>
        <flint-paper elevation="0" variant="outlined" style="width: 180px; overflow: hidden;">
          <flint-digital-clock value="10:30:00" step=15></flint-digital-clock>
        </flint-paper>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">24-hour format</p>
        <flint-paper elevation="0" variant="outlined" style="width: 180px; overflow: hidden;">
          <flint-digital-clock value="14:00:00" step=60 .ampm=${false}></flint-digital-clock>
        </flint-paper>
      </div>
    </flint-stack>
  `,
};

// ── Multi-Section Digital Clock ──────────────────────────────────────────────
export const MultiSectionDigitalClock: Story = {
  name: 'Multi-Section Digital Clock',
  render: () => html`
    <flint-stack direction="row" gap="40px" alignItems="flex-start" style="padding:32px;font-family:Inter,sans-serif;flex-wrap:wrap;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">AM/PM (default)</p>
        <flint-paper elevation="0" variant="outlined" style="overflow: hidden;">
          <flint-multi-section-digital-clock value="02:45:00"></flint-multi-section-digital-clock>
        </flint-paper>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">24-hour + seconds</p>
        <flint-paper elevation="0" variant="outlined" style="overflow: hidden;">
          <flint-multi-section-digital-clock value="14:30:45" .ampm=${false} seconds></flint-multi-section-digital-clock>
        </flint-paper>
      </div>
    </flint-stack>
  `,
};

// ── Analog Clock ─────────────────────────────────────────────────────────────
export const TimeClock: Story = {
  name: 'Time Clock (Analog)',
  render: () => html`
    <flint-stack direction="row" gap="48px" alignItems="flex-start" style="padding:32px;font-family:Inter,sans-serif;flex-wrap:wrap;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">12-hour (AM/PM)</p>
        <flint-time-clock value="10:30:00" view="hours" @change=${clockHandler}></flint-time-clock>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">24-hour (dual ring)</p>
        <flint-time-clock value="14:00:00" .ampm=${false} view="hours" @change=${clockHandler}></flint-time-clock>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">24-hour midnight</p>
        <flint-time-clock value="00:00:00" .ampm=${false} view="hours" @change=${clockHandler}></flint-time-clock>
      </div>
    </flint-stack>
  `,
};

// ── Time Clock Minutes View ──────────────────────────────────────────────────
export const TimeClockMinutes: Story = {
  name: 'Time Clock (Minutes View)',
  render: () => html`
    <flint-stack direction="row" gap="48px" alignItems="flex-start" style="padding:32px;font-family:Inter,sans-serif;flex-wrap:wrap;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Minutes view</p>
        <flint-time-clock value="10:15:00" view="minutes" @change=${clockHandler}></flint-time-clock>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Seconds view</p>
        <flint-time-clock value="10:30:45" view="seconds" seconds @change=${clockHandler}></flint-time-clock>
      </div>
    </flint-stack>
  `,
};

// ── Time Field ───────────────────────────────────────────────────────────────
export const TimeField: Story = {
  name: 'Time Field (Keyboard)',
  render: () => html`
    <div style="padding:48px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 20px;">
        Keyboard-only input. Type digits, use arrow keys to increment, Tab to advance segments.
        Type <kbd style="background:var(--flint-muted-background, #f1f5f9);border:1px solid #cbd5e1;border-radius:4px;padding:1px 6px;font-size:.8rem;">A</kbd>/<kbd style="background:var(--flint-muted-background, #f1f5f9);border:1px solid #cbd5e1;border-radius:4px;padding:1px 6px;font-size:.8rem;">P</kbd> to toggle AM/PM.
      </p>
      <flint-stack direction="row" gap="24px" style="flex-wrap:wrap;">
        <flint-time-field label="Start Time" value="09:30:00"></flint-time-field>
        <flint-time-field label="End Time (24h)" value="14:00:00" .ampm=${false}></flint-time-field>
        <flint-time-field label="With Seconds" value="10:30:45" seconds></flint-time-field>
      </flint-stack>
    </div>
  `,
};

// ── Disabled & Error States ──────────────────────────────────────────────────
export const DisabledAndError: Story = {
  name: 'Disabled & Error States',
  render: () => html`
    <flint-stack direction="row" gap="32px" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Disabled</p>
        <flint-time-picker variant="desktop" label="Disabled" value="09:00:00" disabled></flint-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Error</p>
        <flint-time-picker variant="desktop" label="Invalid Time" value="25:00:00" error helper-text="Please enter a valid time"></flint-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Disabled Field</p>
        <flint-time-field label="Disabled" value="14:00:00" disabled></flint-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Error Field</p>
        <flint-time-field label="Error" value="14:00:00" error helper-text="Time conflict"></flint-time-field>
      </div>
    </flint-stack>
  `,
};

// ── With Seconds ─────────────────────────────────────────────────────────────
export const WithSeconds: Story = {
  name: 'With Seconds',
  render: () => html`
    <flint-stack direction="row" gap="40px" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Desktop + Seconds</p>
        <flint-time-picker variant="desktop" label="Precise Time" value="14:30:45" seconds></flint-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Static + Seconds (24h)</p>
        <flint-time-picker variant="static" value="08:15:30" seconds .ampm=${false}></flint-time-picker>
      </div>
    </flint-stack>
  `,
};

// ── 24-Hour Format ───────────────────────────────────────────────────────────
export const TwentyFourHour: Story = {
  name: '24-Hour Format',
  render: () => html`
    <flint-stack direction="row" gap="40px" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Desktop 24h</p>
        <flint-desktop-time-picker label="Time (24h)" value="14:30:00" .ampm=${false}></flint-desktop-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Clock 24h (inner: 13-23, 00)</p>
        <flint-time-clock value="00:00:00" .ampm=${false} view="hours" @change=${clockHandler}></flint-time-clock>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Clock 24h (outer: 1-12)</p>
        <flint-time-clock value="03:00:00" .ampm=${false} view="hours" @change=${clockHandler}></flint-time-clock>
      </div>
    </flint-stack>
  `,
};

// ── All Variants ─────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 24px;font-size:1rem;font-weight:700;color:#111827;">Time Picker Variants</h3>
      <flint-stack direction="row" gap="40px" alignItems="flex-start" style="flex-wrap:wrap;padding-bottom:320px;">
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Desktop</p>
          <flint-time-picker variant="desktop" label="Start" value="09:00:00"></flint-time-picker>
        </div>
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Mobile (Modal)</p>
          <flint-time-picker variant="mobile" label="End" value="17:30:00"></flint-time-picker>
        </div>
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Static</p>
          <flint-time-picker variant="static" value="12:00:00"></flint-time-picker>
        </div>
      </flint-stack>
    </div>
  `,
};

// ── All Clock Views ──────────────────────────────────────────────────────────
export const AllClockViews: Story = {
  name: 'All Clock Views',
  render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 24px;font-size:1rem;font-weight:700;">Analog Clock Views</h3>
      <flint-stack direction="row" gap="48px" alignItems="flex-start" style="flex-wrap:wrap;">
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Hours (12h)</p>
          <flint-time-clock value="10:30:00" view="hours" @change=${clockHandler}></flint-time-clock>
        </div>
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Hours (24h)</p>
          <flint-time-clock value="14:00:00" .ampm=${false} view="hours" @change=${clockHandler}></flint-time-clock>
        </div>
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Minutes</p>
          <flint-time-clock value="10:15:00" view="minutes" @change=${clockHandler}></flint-time-clock>
        </div>
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Seconds</p>
          <flint-time-clock value="10:30:45" view="seconds" seconds @change=${clockHandler}></flint-time-clock>
        </div>
      </flint-stack>
    </div>
  `,
};

// ── Readonly ──────────────────────────────────────────────────────────────────
export const Readonly: Story = {
  name: 'Readonly States',
  render: () => html`
    <flint-stack direction="row" gap="32px" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Readonly Field</p>
        <flint-time-field label="Read Only" value="14:30:00" readonly></flint-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Readonly Desktop Picker</p>
        <flint-desktop-time-picker label="Read Only" value="09:00:00" readonly></flint-desktop-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Readonly with Helper</p>
        <flint-time-field label="Schedule" value="08:15:00" readonly helper-text="This time cannot be changed"></flint-time-field>
      </div>
    </flint-stack>
  `,
};

// ── Controlled ───────────────────────────────────────────────────────────────
export const Controlled: Story = {
  name: 'Controlled (External State)',
  render: () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const onChangeDesktop = (e: CustomEvent) => {
      const picker = (e.currentTarget as any).querySelector('flint-desktop-time-picker');
      if (picker) picker.value = e.detail.value;
      const display = (e.currentTarget as any).querySelector('.val-display');
      if (display) display.textContent = e.detail.value;
    };
    const onChangeStatic = (e: CustomEvent) => {
      const display = (e.currentTarget as any).querySelector('.val-static');
      if (display) display.textContent = e.detail.value;
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return html`
      <flint-stack direction="row" gap="48px" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
        <div @change=${onChangeDesktop}>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Desktop – Controlled</p>
          <flint-desktop-time-picker label="Controlled Time" value="09:30:00"></flint-desktop-time-picker>
          <p style="margin:10px 0 0;font-size:.8rem;color:#374151;">
            Selected: <code class="val-display" style="background:var(--flint-muted-background, #f1f5f9);padding:2px 6px;border-radius:4px;">09:30:00</code>
          </p>
        </div>
        <div @change=${onChangeStatic}>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Static – Controlled</p>
          <flint-static-time-picker value="12:00:00"></flint-static-time-picker>
          <p style="margin:10px 0 0;font-size:.8rem;color:#374151;">
            Selected: <code class="val-static" style="background:var(--flint-muted-background, #f1f5f9);padding:2px 6px;border-radius:4px;">12:00:00</code>
          </p>
        </div>
      </flint-stack>
    `;
  },
};

// ── Custom Sizing ─────────────────────────────────────────────────────────────
export const CustomSizing: Story = {
  name: 'Custom Sizing (CSS Tokens)',
  render: () => html`
    <flint-stack direction="row" gap="32px" alignItems="flex-start" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Default size (44px)</p>
        <flint-time-field label="Default" value="09:30:00"></flint-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Compact (36px via CSS token)</p>
        <flint-time-field label="Compact" value="09:30:00"
          style="--flint-time-field-height:36px;--flint-time-field-min-width:140px;">
        </flint-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Large (52px via CSS token)</p>
        <flint-time-field label="Large" value="14:00:00"
          style="--flint-time-field-height:52px;--flint-time-field-min-width:190px;">
        </flint-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Compact Desktop Picker</p>
        <flint-desktop-time-picker label="Compact Picker" value="10:00:00"
          style="--flint-time-field-height:36px;">
        </flint-desktop-time-picker>
      </div>
    </flint-stack>
  `,
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────
export const DarkMode: Story = {
  name: 'Dark Mode',
  render: () => html`
    <flint-stack class="flint-theme-dark" direction="row" gap="40px" alignItems="flex-start" style="padding:48px;background:var(--flint-surface-background, #0f172a);border-radius:16px;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin:0 0 10px;">Time Field</p>
        <flint-time-field label="Dark Field" value="14:30:00"></flint-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin:0 0 10px;">Desktop Picker</p>
        <flint-desktop-time-picker label="Dark Picker" value="09:00:00"></flint-desktop-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin:0 0 10px;">Static Picker</p>
        <flint-static-time-picker value="10:45:00"></flint-static-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin:0 0 10px;">Analog Clock</p>
        <flint-time-clock value="14:30:00" view="hours" @change=${clockHandler}></flint-time-clock>
      </div>
    </flint-stack>
  `,
};
