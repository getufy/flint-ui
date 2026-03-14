import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-date-field.js';
import '../box/flint-box';
import '../stack/flint-stack';
import '../button/flint-button';
import type { FlintDateField } from './flint-date-field.js';

const meta: Meta = {
    title: 'Date & Time/Date Field',
    component: 'flint-date-field',
    parameters: {
        docs: {
            description: {
                component: `
— move between segments - **Backspace / Delete** — clear the current segment - **Escape / a** — clear all segments

- **Tag**: \`<flint-date-field>\`
- **Class**: \`FlintDateField\`
- **Form Associated**: Yes

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Opts the element into form participation via the Form-Associated Custom Elements API. */ static formAssociated = true; static styles = unsafeCSS(uiDateFieldStyles); // ── Props ──────────────────────────────────────────────────────────────── /** Controlled date value (ISO YYYY-MM-DD). Set to '' for uncontrolled. |
| \`label\` | \`label\` | \`string\` | \`''\` | Field label. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name. Reflected so the browser picks it up for form data collection. |
| \`min\` | \`min\` | \`string\` | \`''\` | Minimum allowed date (ISO). |
| \`max\` | \`max\` | \`string\` | \`''\` | Maximum allowed date (ISO). |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the field and prevents interaction. |
| \`readonly\` | \`readonly\` | \`boolean\` | \`false\` | Makes the field read-only (visible but not editable). |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Displays the field in an error state. |
| \`helperText\` | \`helper-text\` | \`string\` | \`''\` | Helper text shown below the field. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-date-field-change\` | — | { detail: { value: string } } ISO date when all three segments are filled |
| \`flint-date-field-clear\` | — | Fired when all segments are cleared |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-font-family\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-error-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-input-bg\` | — |
| \`--flint-border-color\` | — |
| \`--flint-border-radius-md\` | — |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-error-focus-ring\` | — |
| \`--flint-input-disabled-bg\` | — |
| \`--flint-text-color\` | — |
| \`--flint-input-placeholder-color\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-hover-color\` | — |

#### Methods

| Method | Description |
|---|---|
| \`clear()\` | Clears all three segments and fires 'flint-date-field-clear'. |
                `,
            },
        },
    },
    argTypes: {
        value: { control: 'text', description: 'Controlled date value (YYYY-MM-DD).' },
        label: { control: 'text' },
        helperText: { control: 'text', name: 'helper-text' },
        disabled: { control: 'boolean' },
        readonly: { control: 'boolean' },
        error: { control: 'boolean' },
    },
    args: {
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

const wrap = (content: unknown) => html`
  <flint-stack direction="column" gap="32px" style="padding:48px;font-family:Inter,sans-serif;">
    ${content}
  </flint-stack>
`;

// ── Basic ─────────────────────────────────────────────────────────────────────
export const Basic: Story = {
    render: (args) => wrap(html`
    <div>
      <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
        Click the field and start typing digits. The field automatically advances between
        month → day → year as you type. Use ↑↓ arrows to increment/decrement any segment.
      </p>
      <flint-date-field
        label=${args.label}
        .value=${args.value ?? ''}
        helper-text=${args.helperText ?? ''}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?error=${args.error}
        @flint-date-field-change=${(e: CustomEvent) => console.log('[date-field] change →', e.detail.value)}
      ></flint-date-field>
    </div>
  `),
};

// ── Controlled vs. Uncontrolled ───────────────────────────────────────────────
export const ControlledVsUncontrolled: Story = {
    name: 'Controlled vs. Uncontrolled',
    render: () => html`
    <div style="padding:48px;font-family:Inter,sans-serif;display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:700px;">

      <div>
        <h4 style="margin:0 0 6px;font-size:.875rem;font-weight:600;color:#374151;">Uncontrolled</h4>
        <p style="margin:0 0 16px;font-size:.8rem;color:#4b5563;">
          The field manages its own state internally. The consumer reacts to <code>change</code> events.
        </p>
        <flint-date-field label="Start Date" @flint-date-field-change=${(e: CustomEvent) => {
            const out = document.getElementById('uncontrolled-out');
            if (out) out.textContent = e.detail.value;
        }}></flint-date-field>
        <p style="margin:12px 0 0;font-size:.8rem;color:#374151;">
          Value: <strong id="uncontrolled-out" style="font-variant-numeric:tabular-nums;">—</strong>
        </p>
      </div>

      <div>
        <h4 style="margin:0 0 6px;font-size:.875rem;font-weight:600;color:#374151;">Controlled</h4>
        <p style="margin:0 0 16px;font-size:.8rem;color:#4b5563;">
          The consumer owns the value and updates it on every <code>change</code> event.
        </p>
        <flint-date-field
          id="controlled-df"
          label="End Date"
          value="2025-12-31"
          @flint-date-field-change=${(e: Event) => {
            const el = document.getElementById('controlled-df') as FlintDateField;
            el.value = (e as CustomEvent).detail.value;
            const out = document.getElementById('controlled-out');
            if (out) out.textContent = (e as CustomEvent).detail.value;
        }}
        ></flint-date-field>
        <p style="margin:12px 0 0;font-size:.8rem;color:#374151;">
          Value: <strong id="controlled-out" style="font-variant-numeric:tabular-nums;">2025-12-31</strong>
        </p>
      </div>
    </div>
  `,
};

// ── Disabled & ReadOnly ───────────────────────────────────────────────────────
export const States: Story = {
    name: 'Disabled & ReadOnly',
    args: { disabled: false, readonly: false },
    render: (args) => wrap(html`
    <flint-stack direction="row" gap="32px" style="flex-wrap:wrap;">
      <div>
        <p style="margin:0 0 10px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">Enabled</p>
        <flint-date-field label="Date" value="2025-06-15" ?disabled=${args.disabled} ?readonly=${args.readonly}></flint-date-field>
      </div>
      <div>
        <p style="margin:0 0 10px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">Disabled</p>
        <flint-date-field label="Date" value="2025-06-15" ?disabled=${args.disabled} ?readonly=${args.readonly}></flint-date-field>
      </div>
      <div>
        <p style="margin:0 0 10px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">Read-only</p>
        <flint-date-field label="Date" value="2025-06-15" ?disabled=${args.disabled} ?readonly=${args.readonly}></flint-date-field>
      </div>
    </flint-stack>
  `),
};

// ── Error state ───────────────────────────────────────────────────────────────
export const ErrorState: Story = {
    name: 'Error State',
    args: { error: true, helperText: 'This date is in the past. Please enter a future date.' },
    render: (args) => wrap(html`
    <flint-date-field
      label="Expiry Date"
      value="2023-01-01"
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
    ></flint-date-field>
  `),
};

// ── Keyboard shortcuts reference ──────────────────────────────────────────────
export const KeyboardShortcuts: Story = {
    name: 'Keyboard Reference',
    render: () => html`
    <div style="padding:32px 48px;font-family:Inter,sans-serif;max-width:640px;">
      <h3 style="margin:0 0 20px;font-size:1rem;font-weight:700;color:#111827;">Date Field — Keyboard Interaction</h3>

      <flint-date-field label="Try it here" style="display:block;margin-bottom:28px;"></flint-date-field>

      <table style="border-collapse:collapse;width:100%;font-size:.875rem;">
        <thead>
          <tr style="border-bottom:1px solid #e5e7eb;">
            <th style="text-align:left;padding:8px 12px;color:#4b5563;font-weight:600;">Key</th>
            <th style="text-align:left;padding:8px 12px;color:#4b5563;font-weight:600;">Action</th>
          </tr>
        </thead>
        <tbody>
          ${[
            ['0–9', 'Type digits — auto-advances to next segment when complete'],
            ['↑ / ↓', 'Increment / decrement the focused segment'],
            ['← / →', 'Move to previous / next segment'],
            ['Tab / Shift+Tab', 'Move between segments (Tab leaves after last segment)'],
            ['/', 'Advance to the next segment'],
            ['Backspace / Delete', 'Clear the current segment value'],
            ['Escape', 'Clear all segments'],
        ].map(([key, desc]) => html`
            <tr style="border-bottom:1px solid #f3f4f6;">
              <td style="padding:10px 12px;vertical-align:top;">
                <flint-box as="kbd" bgcolor="var(--flint-muted-background, #f1f5f9)" border="1px solid #cbd5e1" borderRadius="4px" p="2px 7px" style="font-family:monospace;font-size:.8rem;white-space:nowrap;display:inline-block;">${key}</flint-box>
              </td>
              <td style="padding:10px 12px;color:#374151;">${desc}</td>
            </tr>
          `)}
        </tbody>
      </table>
    </div>
  `,
};

// ── Consumer-driven validation ────────────────────────────────────────────────
export const ConsumerValidation: Story = {
    name: 'Consumer Validation',
    render: () => html`
    <div style="padding:48px;font-family:Inter,sans-serif;max-width:420px;">
      <h3 style="margin:0 0 6px;font-size:1rem;font-weight:700;color:#111827;">Date validation</h3>
      <p style="margin:0 0 20px;font-size:.8rem;color:#4b5563;">
        The component dispatches a <code>change</code> event with the ISO value whenever all
        three segments are filled. The consumer is responsible for validating the value and
        toggling the <code>error</code> attribute / <code>helper-text</code>.
      </p>

      <flint-date-field
        id="val-field"
        label="Appointment Date"
        helper-text="Must be a future date (after today)"
        @flint-date-field-change=${(e: CustomEvent) => {
            const field = document.getElementById('val-field') as HTMLElement & { error: boolean; helperText: string };
            const chosen = new Date(e.detail.value + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isPast = chosen < today;
            field.error = isPast;
            field.helperText = isPast
                ? `${e.detail.value} is in the past — please pick a future date`
                : `Selected: ${e.detail.value}`;
        }}
      ></flint-date-field>
    </div>
  `,
};

// ── Form usage ────────────────────────────────────────────────────────────────
export const InAForm: Story = {
    name: 'In a Form',
    render: () => html`
    <div style="padding:48px;font-family:Inter,sans-serif;max-width:480px;">
      <h3 style="margin:0 0 24px;font-size:1rem;font-weight:700;color:#111827;">Book Appointment</h3>
      <form id="booking-form" @submit=${(e: Event) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            const out = document.getElementById('form-output');
            if (out) {
                out.textContent = JSON.stringify(Object.fromEntries(data.entries()), null, 2);
                out.style.display = 'block';
            }
        }} style="">

        <flint-stack direction="row" gap="16px" style="flex-wrap:wrap;">
          <flint-date-field name="start" label="Start Date" helper-text="First day of appointment"></flint-date-field>
          <flint-date-field name="end"   label="End Date"   helper-text="Last day of appointment"></flint-date-field>
        </flint-stack>

        <flint-button type="submit" style="align-self:flex-start;font-size:.9375rem;">Book</flint-button>
      </form>
      <flint-box as="pre" id="form-output" bgcolor="var(--flint-muted-background, #f8fafc)" border="1px solid #e2e8f0" borderRadius="8px" p="16px" style="display:none;margin-top:20px;font-size:.8rem;color:#334155;"></flint-box>
    </div>
  `,
};
