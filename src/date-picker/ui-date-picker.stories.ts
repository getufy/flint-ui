import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-date-picker.js';
import type { UiDatePicker } from './ui-date-picker.js';

const meta: Meta = {
    title: 'Date and Time/Date Picker',
    component: 'ui-date-picker',
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
    const picker = e.target as UiDatePicker;
    const val = (e as CustomEvent).detail?.value;
    console.log('[date-picker] changed →', val);
    picker.value = val;
}

// ── Desktop (default) ─────────────────────────────────────────────────────────
export const Desktop: Story = {
    name: 'Desktop Picker',
    render: (args) => wrap(html`
    <ui-date-picker
      .variant=${args.variant}
      .value=${args.value}
      .label=${args.label}
      .min=${args.min ?? ''}
      .max=${args.max ?? ''}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
      @change=${onChange}
    ></ui-date-picker>
  `),
};

// ── Mobile ────────────────────────────────────────────────────────────────────
export const Mobile: Story = {
    name: 'Mobile Picker (Modal)',
    render: () => wrap(html`
    <p style="font-size:.85rem;color:#6b7280;margin-bottom:16px;">
      On mobile/touch devices the calendar opens in a full dialog with Cancel/OK buttons.
    </p>
    <ui-date-picker
      variant="mobile"
      label="Birthday"
      @change=${onChange}
    ></ui-date-picker>
  `),
};

// ── Static ────────────────────────────────────────────────────────────────────
export const Static: Story = {
    name: 'Static (Always Visible)',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#6b7280;margin-bottom:16px;">
        The static variant renders the calendar inline — no popover/modal, no text field.
      </p>
      <ui-date-picker variant="static" @change=${onChange}></ui-date-picker>
    </div>
  `,
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    render: () => wrap(html`
    <ui-date-picker
      label="Start Date"
      value="2024-03-15"
      disabled
    ></ui-date-picker>
  `),
};

// ── ReadOnly ──────────────────────────────────────────────────────────────────
export const ReadOnly: Story = {
    render: () => wrap(html`
    <p style="font-size:.85rem;color:#6b7280;margin-bottom:16px;">
      Read-only: the text field cannot be typed in, but the calendar opens on click.
    </p>
    <ui-date-picker
      label="Scheduled Date"
      value="2024-06-21"
      readonly
      @change=${onChange}
    ></ui-date-picker>
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
      <ui-date-picker
        label="Appointment Date"
        .min=${todayIso}
        .max=${maxIso}
        helper-text="Select a date within the next 30 days"
        @change=${onChange}
      ></ui-date-picker>
    `);
    },
};

// ── Error state ───────────────────────────────────────────────────────────────
export const ErrorState: Story = {
    render: () => wrap(html`
    <ui-date-picker
      label="End Date"
      value="2024-01-01"
      error
      helper-text="End date must be after start date"
      @change=${onChange}
    ></ui-date-picker>
  `),
};

// ── All four variants side-by-side ────────────────────────────────────────────
export const AllVariants: Story = {
    name: 'All Variants',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 24px;font-size:1rem;font-weight:600;color:#374151;">Date Picker Variants</h3>
      <div style="display:flex;flex-wrap:wrap;gap:40px;align-items:flex-start;">

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:.05em;margin:0 0 12px;">Desktop</p>
          <ui-date-picker variant="desktop" label="Check-in" @change=${onChange}></ui-date-picker>
        </div>

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:.05em;margin:0 0 12px;">Mobile (Modal)</p>
          <ui-date-picker variant="mobile" label="Check-out" @change=${onChange}></ui-date-picker>
        </div>

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:.05em;margin:0 0 12px;">Static</p>
          <ui-date-picker variant="static" @change=${onChange}></ui-date-picker>
        </div>

      </div>
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
        <ui-date-picker
          id="controlled-dp"
          label="Independence Day"
          .value=${currentValue}
          @change=${(e: Event) => {
                const v = (e as CustomEvent).detail.value;
                currentValue = v;
                (document.getElementById('controlled-dp') as UiDatePicker).value = v;
                const out = document.getElementById('dp-output');
                if (out) out.textContent = v;
            }}
        ></ui-date-picker>
        <p style="margin-top:16px;font-size:.875rem;color:#374151;">
          Selected: <strong id="dp-output">${currentValue}</strong>
        </p>
      </div>
    `;
    },
};
