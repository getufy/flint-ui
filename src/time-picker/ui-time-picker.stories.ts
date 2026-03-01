import { Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';
import './ui-time-picker.js';

const meta: Meta = {
  title: 'Date and Time/Time Picker',
  component: 'ui-time-picker',
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

// ── Adaptive (default) ────────────────────────────────────────────────────────
export const Default: Story = {
  render: (args) => pad(html`
    <ui-time-picker
      .variant=${args.variant} .value=${args.value ?? ''} .label=${args.label}
      ?ampm=${args.ampm} ?seconds=${args.seconds} ?disabled=${args.disabled} ?error=${args.error}
      @change=${(e: CustomEvent) => console.log('change →', e.detail.value)}
    ></ui-time-picker>
  `),
};

// ── Desktop ───────────────────────────────────────────────────────────────────
export const Desktop: Story = {
  name: 'Desktop Picker',
  render: () => html`
    <div style="padding:48px;font-family:Inter,sans-serif;padding-bottom:320px;">
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 18px;">
        Calendar icon opens a <strong>multi-section digital clock</strong> popover with scrollable Hr / Min / AM/PM columns.
      </p>
      <ui-desktop-time-picker label="Appointment Time" value="14:30:00"
        @change=${(e: CustomEvent) => console.log(e.detail.value)}
      ></ui-desktop-time-picker>
    </div>
  `,
};

// ── Mobile ────────────────────────────────────────────────────────────────────
export const Mobile: Story = {
  name: 'Mobile Picker (Modal)',
  render: () => html`
    <div style="padding:48px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 18px;">
        On touch devices the picker opens inside a dialog with an <strong>analog clock face</strong>.
        Tap hours → then minutes auto-advances.
      </p>
      <ui-mobile-time-picker label="Meeting Time" value="09:00:00"
        @change=${(e: CustomEvent) => console.log(e.detail.value)}
      ></ui-mobile-time-picker>
    </div>
  `,
};

// ── Static ────────────────────────────────────────────────────────────────────
export const Static: Story = {
  name: 'Static (Always Visible)',
  render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 18px;">
        Renders the multi-section digital clock inline — no field or popover.
      </p>
      <ui-static-time-picker value="10:45:00"></ui-static-time-picker>
    </div>
  `,
};

// ── Digital Clock ─────────────────────────────────────────────────────────────
export const DigitalClock: Story = {
  name: 'Digital Clock (List)',
  render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">30 min steps (default)</p>
        <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;width:180px;">
          <ui-digital-clock value="10:30:00" step=30></ui-digital-clock>
        </div>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">15 min steps</p>
        <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;width:180px;">
          <ui-digital-clock value="10:30:00" step=15></ui-digital-clock>
        </div>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">24-hour format</p>
        <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;width:180px;">
          <ui-digital-clock value="14:00:00" step=60 .ampm=${false}></ui-digital-clock>
        </div>
      </div>
    </div>
  `,
};

// ── Multi-Section Digital Clock ───────────────────────────────────────────────
export const MultiSectionDigitalClock: Story = {
  name: 'Multi-Section Digital Clock',
  render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;display:flex;gap:40px;flex-wrap:wrap;align-items:flex-start;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">AM/PM (default)</p>
        <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <ui-multi-section-digital-clock value="02:45:00"></ui-multi-section-digital-clock>
        </div>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">24-hour + seconds</p>
        <div style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <ui-multi-section-digital-clock value="14:30:45" .ampm=${false} seconds></ui-multi-section-digital-clock>
        </div>
      </div>
    </div>
  `,
};

// ── Analog Clock ──────────────────────────────────────────────────────────────
export const TimeClock: Story = {
  name: 'Time Clock (Analog)',
  render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;display:flex;gap:48px;flex-wrap:wrap;align-items:flex-start;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">12-hour (AM/PM)</p>
        <ui-time-clock value="10:30:00" view="hours"
          @change=${(e: CustomEvent) => {
      const el = e.target as EventTarget & { value: string }; el.value = e.detail.value;
      console.log('time-clock change →', e.detail.value);
    }}
        ></ui-time-clock>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">24-hour</p>
        <ui-time-clock value="14:00:00" .ampm=${false} view="hours"
          @change=${(e: CustomEvent) => { const el = e.target as EventTarget & { value: string }; el.value = e.detail.value; }}
        ></ui-time-clock>
      </div>
    </div>
  `,
};

// ── Time Field ────────────────────────────────────────────────────────────────
export const TimeField: Story = {
  name: 'Time Field (Keyboard)',
  render: () => html`
    <div style="padding:48px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 20px;">
        Keyboard-only input. Type digits, use ↑↓ to increment, Tab to advance segments.
        Type <kbd style="background:#f1f5f9;border:1px solid #cbd5e1;border-radius:4px;padding:1px 6px;font-size:.8rem;">A</kbd>/<kbd style="background:#f1f5f9;border:1px solid #cbd5e1;border-radius:4px;padding:1px 6px;font-size:.8rem;">P</kbd> to toggle AM/PM.
      </p>
      <div style="display:flex;gap:24px;flex-wrap:wrap;">
        <ui-time-field label="Start Time" value="09:30:00"></ui-time-field>
        <ui-time-field label="End Time (24h)" value="14:00:00" .ampm=${false}></ui-time-field>
        <ui-time-field label="With Seconds" value="10:30:45" seconds></ui-time-field>
      </div>
    </div>
  `,
};

// ── All Variants ──────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 24px;font-size:1rem;font-weight:700;color:#111827;">Time Picker Variants</h3>
      <div style="display:flex;flex-wrap:wrap;gap:40px;align-items:flex-start;padding-bottom:320px;">
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Desktop</p>
          <ui-time-picker variant="desktop" label="Start" value="09:00:00"></ui-time-picker>
        </div>
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Mobile (Modal)</p>
          <ui-time-picker variant="mobile" label="End" value="17:30:00"></ui-time-picker>
        </div>
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Static</p>
          <ui-time-picker variant="static" value="12:00:00"></ui-time-picker>
        </div>
      </div>
    </div>
  `,
};
