import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-date-picker.js';
import '../stack/flint-stack';
import type { FlintDatePicker } from './flint-date-picker.js';

const meta: Meta = {
    title: 'Date & Time/Date Picker',
    component: 'flint-date-picker',
    parameters: {
        docs: {
            description: {
                component: `
#### \`<flint-date-picker-calendar>\`

A standalone calendar grid — the core date-selection view. Used internally by flint-date-picker, but can also be used on its own.

- **Tag**: \`<flint-date-picker-calendar>\`
- **Class**: \`FlintDatePickerCalendar\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | — | Currently selected value as ISO string (YYYY-MM-DD). |
| \`min\` | \`min\` | \`string\` | — | Minimum selectable date (ISO). |
| \`max\` | \`max\` | \`string\` | — | Maximum selectable date (ISO). |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disable all interaction. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-date-picker-select\` | — | { detail: { value: string } } ISO date YYYY-MM-DD |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-font-family\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-border-radius-xl\` | — |
| \`--flint-text-color\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-primary-color-hover\` | — |
| \`--flint-input-bg\` | — |
| \`--flint-border-color\` | — |
| \`--flint-border-radius-md\` | — |
| \`--flint-input-placeholder-color\` | — |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-input-disabled-bg\` | — |
| \`--flint-error-color\` | — |
| \`--flint-error-focus-ring\` | — |
| \`--flint-shadow-lg\` | — |
| \`--flint-shadow-sm\` | — |

#### Methods

| Method | Description |
|---|---|
| \`navigateTo(iso: string)\` | Navigate to the month/year of a given ISO date programmatically. |

---

#### \`<flint-date-picker>\`

A date picker with a text field and a calendar popover/modal. Variants: - 'desktop'  — calendar appears in a popover (default) - 'mobile'   — calendar appears in a full dialog/modal - 'static'   — calendar always visible, no field - 'auto'     — desktop on pointer:fine, mobile on pointer:coarse

- **Tag**: \`<flint-date-picker>\`
- **Class**: \`FlintDatePicker\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Selected date as ISO string (YYYY-MM-DD). |
| \`label\` | \`label\` | \`string\` | \`'Date'\` | Label shown above the field. |
| \`placeholder\` | \`placeholder\` | \`string\` | \`'MM/DD/YYYY'\` | Placeholder shown in the empty field. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name attribute. |
| \`variant\` | \`variant\` | \`'desktop' \\| 'mobile' \\| 'static' \\| 'auto'\` | \`'desktop'\` | Variant: 'desktop' \\| 'mobile' \\| 'static' \\| 'auto'. |
| \`min\` | \`min\` | \`string\` | \`''\` | Minimum selectable date (ISO). |
| \`max\` | \`max\` | \`string\` | \`''\` | Maximum selectable date (ISO). |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the picker. |
| \`readonly\` | \`readonly\` | \`boolean\` | \`false\` | Makes the field read-only (auto-opens a picker when clicked). |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Shows error styling. |
| \`helperText\` | \`helper-text\` | \`string\` | \`''\` | Helper/error text below the field. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`change\` | — | { detail: { value: string } } when the date changes |
                `,
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['desktop', 'mobile', 'static', 'auto'],
            description: 'Which surface the calendar renders in.',
        },
        value: { control: 'text', description: 'Selected date (YYYY-MM-DD).' },
        label: { control: 'text' },
        disabled: { control: 'boolean' },
        readonly: { control: 'boolean' },
        error: { control: 'boolean' },
        min: { control: 'text', description: 'Minimum selectable date (YYYY-MM-DD).' },
        max: { control: 'text', description: 'Maximum selectable date (YYYY-MM-DD).' },
        helperText: { control: 'text' },
    },
    args: {
        variant: 'desktop',
        label: 'Date',
        value: '',
        placeholder: 'MM/DD/YYYY',
        disabled: false,
        readonly: false,
        error: false,
        helperText: '',
    },
};

export default meta;
type Story = StoryObj;

// ── Wrapper helpers ───────────────────────────────────────────────────────────
const wrap = (content: unknown) => html`
  <div style="padding:48px 48px 220px;font-family:Inter,sans-serif;">
    ${content}
  </div>
`;

function onChange(e: Event) {
    const picker = e.target as FlintDatePicker;
    const val = (e as CustomEvent).detail?.value;
    console.log('[date-picker] changed →', val);
    picker.value = val;
}

// ── Desktop (default) ─────────────────────────────────────────────────────────
export const Desktop: Story = {
    name: 'Desktop Picker',
    render: (args) => wrap(html`
    <flint-date-picker
      .variant=${args.variant}
      .value=${args.value}
      .label=${args.label}
      .placeholder=${args.placeholder ?? 'MM/DD/YYYY'}
      .min=${args.min ?? ''}
      .max=${args.max ?? ''}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
      @change=${onChange}
    ></flint-date-picker>
  `),
};

// ── Mobile ────────────────────────────────────────────────────────────────────
export const Mobile: Story = {
    name: 'Mobile Picker (Modal)',
    args: { variant: 'mobile' },
    render: (args) => wrap(html`
    <p style="font-size:.85rem;color:#6b7280;margin-bottom:16px;">
      On mobile/touch devices the calendar opens in a full dialog with Cancel/OK buttons.
    </p>
    <flint-date-picker
      .variant=${args.variant}
      .label=${args.label ?? 'Birthday'}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
      @change=${onChange}
    ></flint-date-picker>
  `),
};

// ── Static ────────────────────────────────────────────────────────────────────
export const Static: Story = {
    name: 'Static (Always Visible)',
    args: { variant: 'static' },
    render: (args) => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#6b7280;margin-bottom:16px;">
        The static variant renders the calendar inline — no popover/modal, no text field.
      </p>
      <flint-date-picker .variant=${args.variant} @change=${onChange}></flint-date-picker>
    </div>
  `,
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: { disabled: true, value: '2024-03-15' },
    render: (args) => wrap(html`
    <flint-date-picker
      .label=${args.label ?? 'Start Date'}
      .value=${args.value ?? ''}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
    ></flint-date-picker>
  `),
};

// ── ReadOnly ──────────────────────────────────────────────────────────────────
export const ReadOnly: Story = {
    args: { readonly: true, value: '2024-06-21' },
    render: (args) => wrap(html`
    <p style="font-size:.85rem;color:#6b7280;margin-bottom:16px;">
      Read-only: the text field cannot be typed in, but the calendar opens on click.
    </p>
    <flint-date-picker
      .label=${args.label ?? 'Scheduled Date'}
      .value=${args.value ?? ''}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      @change=${onChange}
    ></flint-date-picker>
  `),
};

// ── With Min/Max constraints ──────────────────────────────────────────────────
export const WithMinMax: Story = {
    name: 'With Min/Max Constraints',
    render: () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayIso = `${yyyy}-${mm}-${dd}`;

        // Max = today + 30 days
        const maxDate = new Date(today);
        maxDate.setDate(maxDate.getDate() + 30);
        const maxIso = `${maxDate.getFullYear()}-${String(maxDate.getMonth() + 1).padStart(2, '0')}-${String(maxDate.getDate()).padStart(2, '0')}`;

        return wrap(html`
      <p style="font-size:.85rem;color:#6b7280;margin-bottom:16px;">
        Only dates from <strong>today</strong> to <strong>30 days ahead</strong> are selectable.
      </p>
      <flint-date-picker
        label="Appointment Date"
        .min=${todayIso}
        .max=${maxIso}
        helper-text="Select a date within the next 30 days"
        @change=${onChange}
      ></flint-date-picker>
    `);
    },
};

// ── Error state ───────────────────────────────────────────────────────────────
export const ErrorState: Story = {
    args: { error: true, value: '2024-01-01', helperText: 'End date must be after start date' },
    render: (args) => wrap(html`
    <flint-date-picker
      .label=${args.label ?? 'End Date'}
      .value=${args.value ?? ''}
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
      @change=${onChange}
    ></flint-date-picker>
  `),
};

// ── All four variants side-by-side ────────────────────────────────────────────
export const AllVariants: Story = {
    name: 'All Variants',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 24px;font-size:1rem;font-weight:600;color:#374151;">Date Picker Variants</h3>
      <flint-stack direction="row" gap="40px" alignItems="flex-start" style="flex-wrap:wrap;">

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:.05em;margin:0 0 12px;">Desktop</p>
          <flint-date-picker variant="desktop" label="Check-in" @change=${onChange}></flint-date-picker>
        </div>

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:.05em;margin:0 0 12px;">Mobile (Modal)</p>
          <flint-date-picker variant="mobile" label="Check-out" @change=${onChange}></flint-date-picker>
        </div>

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:.05em;margin:0 0 12px;">Static</p>
          <flint-date-picker variant="static" @change=${onChange}></flint-date-picker>
        </div>

      </flint-stack>
    </div>
  `,
};

// ── Controlled value ─────────────────────────────────────────────────────────
export const ControlledValue: Story = {
    name: 'Controlled Value',
    render: () => {
        let currentValue = '2025-07-04';
        return html`
      <div style="padding:48px;font-family:Inter,sans-serif;">
        <p style="font-size:.85rem;color:#6b7280;margin-bottom:16px;">
          Selecting a date updates the displayed value below.
        </p>
        <flint-date-picker
          id="controlled-dp"
          label="Independence Day"
          .value=${currentValue}
          @change=${(e: Event) => {
                const v = (e as CustomEvent).detail.value;
                currentValue = v;
                (document.getElementById('controlled-dp') as FlintDatePicker).value = v;
                const out = document.getElementById('dp-output');
                if (out) out.textContent = v;
            }}
        ></flint-date-picker>
        <p style="margin-top:16px;font-size:.875rem;color:#374151;">
          Selected: <strong id="dp-output">${currentValue}</strong>
        </p>
      </div>
    `;
    },
};
