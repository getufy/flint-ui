import { Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';
import './ui-time-picker.js';
import '../paper/ui-paper';
import '../stack/ui-stack.js';

const meta: Meta = {
  title: 'Date & Time/Time Picker',
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

/* eslint-disable @typescript-eslint/no-explicit-any */
const clockHandler = (e: CustomEvent) => { (e.target as any).value = e.detail.value; };
/* eslint-enable @typescript-eslint/no-explicit-any */

// ── Playground (default) ─────────────────────────────────────────────────────
export const Default: Story = {
  render: (args) => pad(html`
    <ui-time-picker
      .variant=${args.variant} .value=${args.value ?? ''} .label=${args.label}
      ?ampm=${args.ampm} ?seconds=${args.seconds} ?disabled=${args.disabled} ?error=${args.error}
      @change=${(e: CustomEvent) => console.log('change →', e.detail.value)}
    ></ui-time-picker>
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
      <ui-desktop-time-picker label="Appointment Time" value="14:30:00"
        @change=${(e: CustomEvent) => console.log(e.detail.value)}
      ></ui-desktop-time-picker>
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
      <ui-mobile-time-picker label="Meeting Time" value="09:00:00"
        @change=${(e: CustomEvent) => console.log(e.detail.value)}
      ></ui-mobile-time-picker>
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
      <ui-static-time-picker value="10:45:00"></ui-static-time-picker>
    </div>
  `,
};

// ── Digital Clock ────────────────────────────────────────────────────────────
export const DigitalClock: Story = {
  name: 'Digital Clock (List)',
  render: () => html`
    <ui-stack direction="row" gap="32px" alignItems="flex-start" style="padding:32px;font-family:Inter,sans-serif;flex-wrap:wrap;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">30 min steps (default)</p>
        <ui-paper elevation="0" variant="outlined" style="width: 180px; overflow: hidden;">
          <ui-digital-clock value="10:30:00" step=30></ui-digital-clock>
        </ui-paper>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">15 min steps</p>
        <ui-paper elevation="0" variant="outlined" style="width: 180px; overflow: hidden;">
          <ui-digital-clock value="10:30:00" step=15></ui-digital-clock>
        </ui-paper>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">24-hour format</p>
        <ui-paper elevation="0" variant="outlined" style="width: 180px; overflow: hidden;">
          <ui-digital-clock value="14:00:00" step=60 .ampm=${false}></ui-digital-clock>
        </ui-paper>
      </div>
    </ui-stack>
  `,
};

// ── Multi-Section Digital Clock ──────────────────────────────────────────────
export const MultiSectionDigitalClock: Story = {
  name: 'Multi-Section Digital Clock',
  render: () => html`
    <ui-stack direction="row" gap="40px" alignItems="flex-start" style="padding:32px;font-family:Inter,sans-serif;flex-wrap:wrap;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">AM/PM (default)</p>
        <ui-paper elevation="0" variant="outlined" style="overflow: hidden;">
          <ui-multi-section-digital-clock value="02:45:00"></ui-multi-section-digital-clock>
        </ui-paper>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">24-hour + seconds</p>
        <ui-paper elevation="0" variant="outlined" style="overflow: hidden;">
          <ui-multi-section-digital-clock value="14:30:45" .ampm=${false} seconds></ui-multi-section-digital-clock>
        </ui-paper>
      </div>
    </ui-stack>
  `,
};

// ── Analog Clock ─────────────────────────────────────────────────────────────
export const TimeClock: Story = {
  name: 'Time Clock (Analog)',
  render: () => html`
    <ui-stack direction="row" gap="48px" alignItems="flex-start" style="padding:32px;font-family:Inter,sans-serif;flex-wrap:wrap;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">12-hour (AM/PM)</p>
        <ui-time-clock value="10:30:00" view="hours" @change=${clockHandler}></ui-time-clock>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">24-hour (dual ring)</p>
        <ui-time-clock value="14:00:00" .ampm=${false} view="hours" @change=${clockHandler}></ui-time-clock>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">24-hour midnight</p>
        <ui-time-clock value="00:00:00" .ampm=${false} view="hours" @change=${clockHandler}></ui-time-clock>
      </div>
    </ui-stack>
  `,
};

// ── Time Clock Minutes View ──────────────────────────────────────────────────
export const TimeClockMinutes: Story = {
  name: 'Time Clock (Minutes View)',
  render: () => html`
    <ui-stack direction="row" gap="48px" alignItems="flex-start" style="padding:32px;font-family:Inter,sans-serif;flex-wrap:wrap;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Minutes view</p>
        <ui-time-clock value="10:15:00" view="minutes" @change=${clockHandler}></ui-time-clock>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Seconds view</p>
        <ui-time-clock value="10:30:45" view="seconds" seconds @change=${clockHandler}></ui-time-clock>
      </div>
    </ui-stack>
  `,
};

// ── Time Field ───────────────────────────────────────────────────────────────
export const TimeField: Story = {
  name: 'Time Field (Keyboard)',
  render: () => html`
    <div style="padding:48px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#6b7280;margin:0 0 20px;">
        Keyboard-only input. Type digits, use arrow keys to increment, Tab to advance segments.
        Type <kbd style="background:var(--ui-muted-background, #f1f5f9);border:1px solid #cbd5e1;border-radius:4px;padding:1px 6px;font-size:.8rem;">A</kbd>/<kbd style="background:var(--ui-muted-background, #f1f5f9);border:1px solid #cbd5e1;border-radius:4px;padding:1px 6px;font-size:.8rem;">P</kbd> to toggle AM/PM.
      </p>
      <ui-stack direction="row" gap="24px" style="flex-wrap:wrap;">
        <ui-time-field label="Start Time" value="09:30:00"></ui-time-field>
        <ui-time-field label="End Time (24h)" value="14:00:00" .ampm=${false}></ui-time-field>
        <ui-time-field label="With Seconds" value="10:30:45" seconds></ui-time-field>
      </ui-stack>
    </div>
  `,
};

// ── Disabled & Error States ──────────────────────────────────────────────────
export const DisabledAndError: Story = {
  name: 'Disabled & Error States',
  render: () => html`
    <ui-stack direction="row" gap="32px" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Disabled</p>
        <ui-time-picker variant="desktop" label="Disabled" value="09:00:00" disabled></ui-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Error</p>
        <ui-time-picker variant="desktop" label="Invalid Time" value="25:00:00" error helper-text="Please enter a valid time"></ui-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Disabled Field</p>
        <ui-time-field label="Disabled" value="14:00:00" disabled></ui-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Error Field</p>
        <ui-time-field label="Error" value="14:00:00" error helper-text="Time conflict"></ui-time-field>
      </div>
    </ui-stack>
  `,
};

// ── With Seconds ─────────────────────────────────────────────────────────────
export const WithSeconds: Story = {
  name: 'With Seconds',
  render: () => html`
    <ui-stack direction="row" gap="40px" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Desktop + Seconds</p>
        <ui-time-picker variant="desktop" label="Precise Time" value="14:30:45" seconds></ui-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Static + Seconds (24h)</p>
        <ui-time-picker variant="static" value="08:15:30" seconds .ampm=${false}></ui-time-picker>
      </div>
    </ui-stack>
  `,
};

// ── 24-Hour Format ───────────────────────────────────────────────────────────
export const TwentyFourHour: Story = {
  name: '24-Hour Format',
  render: () => html`
    <ui-stack direction="row" gap="40px" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Desktop 24h</p>
        <ui-desktop-time-picker label="Time (24h)" value="14:30:00" .ampm=${false}></ui-desktop-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Clock 24h (inner: 13-23, 00)</p>
        <ui-time-clock value="00:00:00" .ampm=${false} view="hours" @change=${clockHandler}></ui-time-clock>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Clock 24h (outer: 1-12)</p>
        <ui-time-clock value="03:00:00" .ampm=${false} view="hours" @change=${clockHandler}></ui-time-clock>
      </div>
    </ui-stack>
  `,
};

// ── All Variants ─────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 24px;font-size:1rem;font-weight:700;color:#111827;">Time Picker Variants</h3>
      <ui-stack direction="row" gap="40px" alignItems="flex-start" style="flex-wrap:wrap;padding-bottom:320px;">
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
      </ui-stack>
    </div>
  `,
};

// ── All Clock Views ──────────────────────────────────────────────────────────
export const AllClockViews: Story = {
  name: 'All Clock Views',
  render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 24px;font-size:1rem;font-weight:700;">Analog Clock Views</h3>
      <ui-stack direction="row" gap="48px" alignItems="flex-start" style="flex-wrap:wrap;">
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Hours (12h)</p>
          <ui-time-clock value="10:30:00" view="hours" @change=${clockHandler}></ui-time-clock>
        </div>
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Hours (24h)</p>
          <ui-time-clock value="14:00:00" .ampm=${false} view="hours" @change=${clockHandler}></ui-time-clock>
        </div>
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Minutes</p>
          <ui-time-clock value="10:15:00" view="minutes" @change=${clockHandler}></ui-time-clock>
        </div>
        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Seconds</p>
          <ui-time-clock value="10:30:45" view="seconds" seconds @change=${clockHandler}></ui-time-clock>
        </div>
      </ui-stack>
    </div>
  `,
};

// ── Readonly ──────────────────────────────────────────────────────────────────
export const Readonly: Story = {
  name: 'Readonly States',
  render: () => html`
    <ui-stack direction="row" gap="32px" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Readonly Field</p>
        <ui-time-field label="Read Only" value="14:30:00" readonly></ui-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Readonly Desktop Picker</p>
        <ui-desktop-time-picker label="Read Only" value="09:00:00" readonly></ui-desktop-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Readonly with Helper</p>
        <ui-time-field label="Schedule" value="08:15:00" readonly helper-text="This time cannot be changed"></ui-time-field>
      </div>
    </ui-stack>
  `,
};

// ── Controlled ───────────────────────────────────────────────────────────────
export const Controlled: Story = {
  name: 'Controlled (External State)',
  render: () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const onChangeDesktop = (e: CustomEvent) => {
      const picker = (e.currentTarget as any).querySelector('ui-desktop-time-picker');
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
      <ui-stack direction="row" gap="48px" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
        <div @change=${onChangeDesktop}>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Desktop – Controlled</p>
          <ui-desktop-time-picker label="Controlled Time" value="09:30:00"></ui-desktop-time-picker>
          <p style="margin:10px 0 0;font-size:.8rem;color:#374151;">
            Selected: <code class="val-display" style="background:var(--ui-muted-background, #f1f5f9);padding:2px 6px;border-radius:4px;">09:30:00</code>
          </p>
        </div>
        <div @change=${onChangeStatic}>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Static – Controlled</p>
          <ui-static-time-picker value="12:00:00"></ui-static-time-picker>
          <p style="margin:10px 0 0;font-size:.8rem;color:#374151;">
            Selected: <code class="val-static" style="background:var(--ui-muted-background, #f1f5f9);padding:2px 6px;border-radius:4px;">12:00:00</code>
          </p>
        </div>
      </ui-stack>
    `;
  },
};

// ── Custom Sizing ─────────────────────────────────────────────────────────────
export const CustomSizing: Story = {
  name: 'Custom Sizing (CSS Tokens)',
  render: () => html`
    <ui-stack direction="row" gap="32px" alignItems="flex-start" style="padding:48px;font-family:Inter,sans-serif;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Default size (44px)</p>
        <ui-time-field label="Default" value="09:30:00"></ui-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Compact (36px via CSS token)</p>
        <ui-time-field label="Compact" value="09:30:00"
          style="--ui-time-field-height:36px;--ui-time-field-min-width:140px;">
        </ui-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Large (52px via CSS token)</p>
        <ui-time-field label="Large" value="14:00:00"
          style="--ui-time-field-height:52px;--ui-time-field-min-width:190px;">
        </ui-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;margin:0 0 10px;">Compact Desktop Picker</p>
        <ui-desktop-time-picker label="Compact Picker" value="10:00:00"
          style="--ui-time-field-height:36px;">
        </ui-desktop-time-picker>
      </div>
    </ui-stack>
  `,
};

// ── Dark Mode ─────────────────────────────────────────────────────────────────
export const DarkMode: Story = {
  name: 'Dark Mode',
  render: () => html`
    <ui-stack class="ui-theme-dark" direction="row" gap="40px" alignItems="flex-start" style="padding:48px;background:var(--ui-surface-background, #0f172a);border-radius:16px;flex-wrap:wrap;padding-bottom:320px;">
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin:0 0 10px;">Time Field</p>
        <ui-time-field label="Dark Field" value="14:30:00"></ui-time-field>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin:0 0 10px;">Desktop Picker</p>
        <ui-desktop-time-picker label="Dark Picker" value="09:00:00"></ui-desktop-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin:0 0 10px;">Static Picker</p>
        <ui-static-time-picker value="10:45:00"></ui-static-time-picker>
      </div>
      <div>
        <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;margin:0 0 10px;">Analog Clock</p>
        <ui-time-clock value="14:30:00" view="hours" @change=${clockHandler}></ui-time-clock>
      </div>
    </ui-stack>
  `,
};
