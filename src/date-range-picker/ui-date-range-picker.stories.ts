import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-date-range-picker.js';
import './ui-date-range-calendar.js';
import './ui-single-input-date-range-field.js';
import type { UiDateRangePicker } from './ui-date-range-picker.js';
import { type DateRange } from './date-range-helpers.js';

const meta: Meta = {
    title: 'Date and Time/Date Range Picker',
    component: 'ui-date-range-picker',
    argTypes: {
        variant: {
            control: 'select',
            options: ['desktop', 'mobile', 'static', 'auto'],
            description: 'Which surface the calendar renders in.',
        },
        label: { control: 'text' },
        shortcuts: { control: 'boolean', description: 'Show predefined shortcut buttons.' },
        disabled: { control: 'boolean' },
        readonly: { control: 'boolean' },
        error: { control: 'boolean' },
        min: { control: 'text', description: 'Minimum selectable date (YYYY-MM-DD).' },
        max: { control: 'text', description: 'Maximum selectable date (YYYY-MM-DD).' },
        helperText: { control: 'text', name: 'helper-text' },
    },
    args: {
        variant: 'desktop',
        label: 'Date Range',
        shortcuts: false,
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
  <div style="padding:48px 48px 340px;font-family:Inter,sans-serif;">
    ${content}
  </div>
`;

function onRangeChange(e: Event) {
    const range = (e as CustomEvent).detail?.value as DateRange;
    console.log('[date-range-picker] changed →', range);
}

// ── Desktop (default) ─────────────────────────────────────────────────────────
export const Desktop: Story = {
    name: 'Desktop Picker',
    render: (args) => wrap(html`
    <p style="font-size:.85rem;color:#6b7280;margin:0 0 16px;">
      Click the field to open the dual-month calendar popover.
      Select a start date, then an end date.
    </p>
    <ui-date-range-picker
      .variant=${args.variant}
      .label=${args.label}
      ?shortcuts=${args.shortcuts}
      .min=${args.min ?? ''}
      .max=${args.max ?? ''}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
      @range-change=${onRangeChange}
    ></ui-date-range-picker>
  `),
};

// ── Mobile ────────────────────────────────────────────────────────────────────
export const Mobile: Story = {
    name: 'Mobile Picker (Modal)',
    render: () => wrap(html`
    <p style="font-size:.85rem;color:#6b7280;margin:0 0 16px;">
      On touch devices the calendar opens in a full modal with Cancel / OK buttons.
    </p>
    <ui-date-range-picker
      variant="mobile"
      label="Trip Dates"
      @range-change=${onRangeChange}
    ></ui-date-range-picker>
  `),
};

// ── Static ────────────────────────────────────────────────────────────────────
export const Static: Story = {
    name: 'Static (Always Visible)',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 16px;">
        The static variant renders both calendars inline — no popover, no text field.
      </p>
      <ui-date-range-picker
        variant="static"
        @range-change=${onRangeChange}
      ></ui-date-range-picker>
    </div>
  `,
};

// ── With Shortcuts ────────────────────────────────────────────────────────────
export const WithShortcuts: Story = {
    name: 'With Shortcuts',
    render: () => wrap(html`
    <p style="font-size:.85rem;color:#6b7280;margin:0 0 16px;">
      Predefined shortcuts let users select common ranges with a single click.
    </p>
    <ui-date-range-picker
      label="Report Period"
      shortcuts
      @range-change=${onRangeChange}
    ></ui-date-range-picker>
  `),
};

// ── Static + Shortcuts ────────────────────────────────────────────────────────
export const StaticWithShortcuts: Story = {
    name: 'Static + Shortcuts',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 16px;">
        Static calendar with a shortcuts panel on the left.
      </p>
      <ui-date-range-picker
        variant="static"
        shortcuts
        @range-change=${onRangeChange}
      ></ui-date-range-picker>
    </div>
  `,
};

// ── Controlled Value ──────────────────────────────────────────────────────────
export const ControlledValue: Story = {
    name: 'Controlled Value',
    render: () => {
        let currentRange: DateRange = ['2025-06-01', '2025-06-14'];
        return html`
      <div style="padding:48px;font-family:Inter,sans-serif;">
        <p style="font-size:.85rem;color:#6b7280;margin:0 0 16px;">
          The parent controls the value. Changing the range updates the display below.
        </p>
        <ui-date-range-picker
          id="controlled-drp"
          label="Vacation Dates"
          .value=${currentRange}
          @range-change=${(e: Event) => {
                const range = (e as CustomEvent).detail.value as DateRange;
                currentRange = range;
                (document.getElementById('controlled-drp') as UiDateRangePicker).value = range;
                const out = document.getElementById('drp-output');
                if (out) out.textContent = `${range[0]} → ${range[1]}`;
            }}
        ></ui-date-range-picker>
        <p style="margin-top:16px;font-size:.875rem;color:#374151;">
          Range: <strong id="drp-output">${currentRange[0]} → ${currentRange[1]}</strong>
        </p>
      </div>
    `;
    },
};

// ── Uncontrolled / defaultValue ───────────────────────────────────────────────
export const Uncontrolled: Story = {
    name: 'Uncontrolled (No Initial Value)',
    render: () => wrap(html`
    <p style="font-size:.85rem;color:#6b7280;margin:0 0 16px;">
      The component manages its own state. The parent only reacts to <code>range-change</code> events.
    </p>
    <ui-date-range-picker
      label="Select Period"
      @range-change=${(e: Event) => {
            const range = (e as CustomEvent).detail.value as DateRange;
            const out = document.getElementById('uncontrolled-out');
            if (out) out.textContent = range[0] && range[1] ? `${range[0]} → ${range[1]}` : '—';
        }}
    ></ui-date-range-picker>
    <p style="margin-top:16px;font-size:.875rem;color:#374151;">
      Range: <strong id="uncontrolled-out">—</strong>
    </p>
  `),
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    render: () => wrap(html`
    <ui-date-range-picker
      label="Booking Period"
      .value=${['2025-03-10', '2025-03-17'] as DateRange}
      disabled
    ></ui-date-range-picker>
  `),
};

// ── ReadOnly ──────────────────────────────────────────────────────────────────
export const ReadOnly: Story = {
    name: 'Read Only',
    render: () => wrap(html`
    <ui-date-range-picker
      label="Confirmed Dates"
      .value=${['2025-08-01', '2025-08-15'] as DateRange}
      readonly
      @range-change=${onRangeChange}
    ></ui-date-range-picker>
  `),
};

// ── Error State ───────────────────────────────────────────────────────────────
export const ErrorState: Story = {
    name: 'Error State',
    render: () => wrap(html`
    <ui-date-range-picker
      label="Project Duration"
      .value=${['2025-05-01', '2025-04-01'] as DateRange}
      error
      helper-text="End date must be after start date"
      @range-change=${onRangeChange}
    ></ui-date-range-picker>
  `),
};

// ── Min / Max Constraints ─────────────────────────────────────────────────────
export const WithMinMax: Story = {
    name: 'With Min/Max Constraints',
    render: () => {
        const today = new Date();
        const fmt = (d: Date) =>
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const min = fmt(today);
        const max = new Date(today);
        max.setDate(today.getDate() + 60);
        return wrap(html`
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 16px;">
        Only dates from <strong>today</strong> to <strong>60 days ahead</strong> are selectable.
      </p>
      <ui-date-range-picker
        label="Availability Window"
        .min=${min}
        .max=${fmt(max)}
        helper-text="Select within the next 60 days"
        @range-change=${onRangeChange}
      ></ui-date-range-picker>
    `);
    },
};

// ── All Variants ──────────────────────────────────────────────────────────────
export const AllVariants: Story = {
    name: 'All Variants',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 24px;font-size:1rem;font-weight:600;color:#374151;">Date Range Picker Variants</h3>
      <div style="display:flex;flex-direction:column;gap:48px;align-items:flex-start;">

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:.05em;margin:0 0 12px;">Desktop (Popover)</p>
          <ui-date-range-picker label="Check-in / Check-out" @range-change=${onRangeChange}></ui-date-range-picker>
        </div>

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:.05em;margin:0 0 12px;">Desktop + Shortcuts</p>
          <ui-date-range-picker label="Report Period" shortcuts @range-change=${onRangeChange}></ui-date-range-picker>
        </div>

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:.05em;margin:0 0 12px;">Mobile (Modal)</p>
          <ui-date-range-picker label="Trip Dates" variant="mobile" @range-change=${onRangeChange}></ui-date-range-picker>
        </div>

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:.05em;margin:0 0 12px;">Static</p>
          <ui-date-range-picker variant="static" shortcuts @range-change=${onRangeChange}></ui-date-range-picker>
        </div>

      </div>
    </div>
  `,
};

// ── Single Input Field (standalone) ──────────────────────────────────────────
export const SingleInputField: Story = {
    name: 'Single Input Field (standalone)',
    render: () => html`
    <div style="padding:48px;font-family:Inter,sans-serif;display:flex;flex-direction:column;gap:32px;">
      <div>
        <h3 style="margin:0 0 16px;font-size:1rem;font-weight:600;color:#111827;">
          SingleInputDateRangeField
        </h3>
        <p style="margin:0 0 16px;font-size:.85rem;color:#6b7280;">
          Six independently-editable keyboard segments: month/day/year × 2.
          Use ↑↓ to increment, ←→ to navigate between segments, Esc to clear.
        </p>
        <ui-single-input-date-range-field
          label="Date Range"
          @range-change=${(e: CustomEvent) => {
            const out = document.getElementById('single-out');
            if (out) out.textContent = `${e.detail.value[0]} → ${e.detail.value[1]}`;
        }}
        ></ui-single-input-date-range-field>
        <p style="margin-top:12px;font-size:.85rem;color:#374151;">
          Value: <strong id="single-out">—</strong>
        </p>
      </div>

      <div>
        <p style="margin:0 0 10px;font-size:.8rem;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.04em;">With value</p>
        <ui-single-input-date-range-field
          label="Pre-filled Range"
          .value=${['2025-06-01', '2025-06-28'] as DateRange}
        ></ui-single-input-date-range-field>
      </div>

      <div style="display:flex;gap:24px;flex-wrap:wrap;">
        <div>
          <p style="margin:0 0 10px;font-size:.8rem;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.04em;">Disabled</p>
          <ui-single-input-date-range-field
            .value=${['2025-01-01', '2025-01-31'] as DateRange}
            disabled
          ></ui-single-input-date-range-field>
        </div>
        <div>
          <p style="margin:0 0 10px;font-size:.8rem;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.04em;">Error</p>
          <ui-single-input-date-range-field
            label="Period"
            .value=${['2025-05-01', '2025-04-01'] as DateRange}
            error
            helper-text="End must be after start"
          ></ui-single-input-date-range-field>
        </div>
      </div>
    </div>
  `,
};

// ── Date Range Calendar (standalone) ─────────────────────────────────────────
export const DateRangeCalendar: Story = {
    name: 'Date Range Calendar (standalone)',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 16px;font-size:1rem;font-weight:600;color:#111827;">DateRangeCalendar</h3>
      <p style="margin:0 0 16px;font-size:.85rem;color:#6b7280;">
        The core dual-month calendar. First click sets the start date,
        second click sets the end date. Hover shows the range preview.
      </p>
      <ui-date-range-calendar
        id="standalone-cal"
        @range-select=${(e: CustomEvent) => {
            const range = e.detail.value as DateRange;
            const out = document.getElementById('cal-out');
            if (out) out.textContent = `${range[0] || '?'} → ${range[1] || '?'}`;
            (document.getElementById('standalone-cal') as UiDateRangePicker).value = range;
        }}
        style="border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.08),0 0 0 1px #e5e7eb;overflow:hidden;display:inline-block;"
      ></ui-date-range-calendar>
      <p style="margin-top:16px;font-size:.875rem;color:#374151;">
        Range: <strong id="cal-out">—</strong>
      </p>
    </div>
  `,
};

// ── Custom Shortcuts ──────────────────────────────────────────────────────────
export const CustomShortcuts: Story = {
    name: 'Custom Shortcuts',
    render: () => {
        const myShortcuts = [
            {
                label: 'Next 7 days',
                getValue: (): DateRange => {
                    const start = new Date();
                    const end = new Date();
                    end.setDate(start.getDate() + 6);
                    const fmt = (d: Date) =>
                        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                    return [fmt(start), fmt(end)];
                },
            },
            {
                label: 'Next 30 days',
                getValue: (): DateRange => {
                    const start = new Date();
                    const end = new Date();
                    end.setDate(start.getDate() + 29);
                    const fmt = (d: Date) =>
                        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                    return [fmt(start), fmt(end)];
                },
            },
            {
                label: 'Q1 2025',
                getValue: (): DateRange => ['2025-01-01', '2025-03-31'],
            },
            {
                label: 'Q2 2025',
                getValue: (): DateRange => ['2025-04-01', '2025-06-30'],
            },
        ];

        return wrap(html`
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 16px;">
        Custom shortcut items — override the built-in set.
      </p>
      <ui-date-range-picker
        label="Analytics Period"
        shortcuts
        .shortcutItems=${myShortcuts}
        @range-change=${onRangeChange}
      ></ui-date-range-picker>
    `);
    },
};
