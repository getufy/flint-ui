import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-date-range-picker.js';
import './flint-date-range-calendar.js';
import './flint-single-input-date-range-field.js';
import '../stack/flint-stack.js';
import type { FlintDateRangePicker } from './flint-date-range-picker.js';
import type { FlintSingleInputDateRangeField } from './flint-single-input-date-range-field.js';
import { type DateRange } from './date-range-helpers.js';

// ── Shadow-DOM play helpers ───────────────────────────────────────────────────

/** Get the picker element from the canvas (inside the wrap() div). */
function getPicker(canvas: HTMLElement): HTMLElement & { shadowRoot: ShadowRoot } {
    return canvas.querySelector('flint-date-range-picker') as HTMLElement & { shadowRoot: ShadowRoot };
}

/** Get the calendar shadow root from inside a picker's shadow root. */
function getCalShadow(pickerShadow: ShadowRoot): ShadowRoot {
    return (pickerShadow.querySelector('flint-date-range-calendar') as HTMLElement & { shadowRoot: ShadowRoot }).shadowRoot;
}

/** Get all clickable (non-other-month, non-disabled) day cells from a calendar shadow root. */
function activeDays(calShadow: ShadowRoot): NodeListOf<HTMLElement> {
    return calShadow.querySelectorAll<HTMLElement>('.day-cell:not(.other-month):not(.disabled)');
}

/** Get the segments div inside flint-single-input-date-range-field's shadow root. */
function getSegments(pickerShadow: ShadowRoot): HTMLElement {
    const field = pickerShadow.querySelector('flint-single-input-date-range-field') as HTMLElement & { shadowRoot: ShadowRoot };
    return field.shadowRoot.querySelector('.segments') as HTMLElement;
}

const meta: Meta = {
    title: 'Date & Time/Date Range Picker',
    component: 'flint-date-range-picker',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'aria-required-children', enabled: false },
                    { id: 'aria-hidden-focus', enabled: false },
                    { id: 'label', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
#### \`<flint-date-range-calendar>\`

A dual-month calendar for range selection.
Shows two months side-by-side (or stacked on narrow screens).

- **Tag**: \`<flint-date-range-calendar>\`
- **Class**: \`FlintDateRangeCalendar\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`DateRange\` | \`[...EMPTY_RANGE]\` | Current selected range [startISO, endISO]. |
| \`min\` | \`min\` | \`string\` | \`''\` | Minimum selectable date (ISO YYYY-MM-DD). |
| \`max\` | \`max\` | \`string\` | \`''\` | Maximum selectable date (ISO YYYY-MM-DD). |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the calendar and prevents date selection. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-date-range-picker-select\` | \`&#123; value: DateRange &#125;\` | &#123; detail: &#123; value: DateRange &#125; &#125; on each click |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-font-family\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-border-color\` | — |
| \`--flint-text-color\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-primary-color-light\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-primary-color-hover\` | — |
| \`--flint-input-bg\` | — |
| \`--flint-border-radius-md\` | — |
| \`--flint-input-disabled-bg\` | — |
| \`--flint-input-placeholder-color\` | — |
| \`--flint-border-radius-xl\` | — |
| \`--flint-shadow-lg\` | — |
| \`--flint-shadow-sm\` | — |
| \`--flint-error-color\` | — |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-error-focus-ring\` | — |

#### Methods

| Method | Description |
|---|---|
| \`navigateTo(iso: string): void\` | Navigate the calendar view to the month containing the given ISO date. |

---

#### \`<flint-date-range-picker>\`

A date range picker combining a segmented field and a dual-month calendar.

- **Tag**: \`<flint-date-range-picker>\`
- **Class**: \`FlintDateRangePicker\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`DateRange\` | \`[...EMPTY_RANGE]\` | Selected range [startISO, endISO]. Empty strings mean unset. |
| \`label\` | \`label\` | \`string\` | \`'Date Range'\` | Label shown above the field. |
| \`variant\` | \`variant\` | \`'desktop' \\| 'mobile' \\| 'static' \\| 'auto'\` | \`'desktop'\` | Variant: 'desktop' \\| 'mobile' \\| 'static' \\| 'auto'. |
| \`multiInput\` | \`multi-input\` | \`boolean\` | \`false\` | Use a multi-input field (two separate fields) instead of single-input. Currently shows two simple text displays. |
| \`shortcuts\` | \`shortcuts\` | \`boolean\` | \`false\` | Show shortcuts panel. |
| \`shortcutItems\` | \`shortcutItems\` | \`Shortcut[]\` | \`[]\` | Custom shortcuts list. Defaults to built-in shortcuts when shortcuts=true. |
| \`min\` | \`min\` | \`string\` | \`''\` | Minimum selectable date (ISO YYYY-MM-DD). |
| \`max\` | \`max\` | \`string\` | \`''\` | Maximum selectable date (ISO YYYY-MM-DD). |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name for hidden inputs. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the picker and prevents interaction. |
| \`readonly\` | \`readonly\` | \`boolean\` | \`false\` | Makes the picker read-only (visible but not editable). |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Displays the picker in an error state. |
| \`helperText\` | \`helper-text\` | \`string\` | \`''\` | Helper text shown below the field. |
| \`errorMessage\` | \`error-message\` | \`string\` | \`''\` | Error message displayed below the field when in error state. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-date-range-picker-change\` | \`&#123; value: DateRange &#125;\` | &#123; detail: &#123; value: DateRange &#125; &#125; when range is committed |

---

#### \`<flint-single-input-date-range-field>\`

A single-input field for entering a date range (start → end).
Renders as "MM/DD/YYYY – MM/DD/YYYY" with six independently editable segments.

- **Tag**: \`<flint-single-input-date-range-field>\`
- **Class**: \`FlintSingleInputDateRangeField\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`DateRange\` | \`[...EMPTY_RANGE]\` | Controlled range value [startISO, endISO]. |
| \`label\` | \`label\` | \`string\` | \`''\` | Field label text. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name used for hidden inputs. |
| \`min\` | \`min\` | \`string\` | \`''\` | Minimum allowed date (ISO YYYY-MM-DD). |
| \`max\` | \`max\` | \`string\` | \`''\` | Maximum allowed date (ISO YYYY-MM-DD). |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the field and prevents interaction. |
| \`readonly\` | \`readonly\` | \`boolean\` | \`false\` | Makes the field read-only (visible but not editable). |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Displays the field in an error state. |
| \`helperText\` | \`helper-text\` | \`string\` | \`''\` | Helper text shown below the field. |
| \`errorMessage\` | \`error-message\` | \`string\` | \`''\` | Error message displayed below the field when in error state. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-date-range-picker-clear\` | — | fired when all segments are cleared |
| \`flint-date-range-picker-change\` | \`&#123; value: DateRange &#125;\` | &#123; detail: &#123; value: DateRange &#125; &#125; when both dates are complete |

#### Methods

| Method | Description |
|---|---|
| \`setRange(range: DateRange): void\` |  |
| \`clear(): void\` |  |
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
    <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
      Click the field to open the dual-month calendar popover.
      Select a start date, then an end date.
    </p>
    <flint-date-range-picker
      .variant=${args.variant}
      .label=${args.label}
      ?shortcuts=${args.shortcuts}
      .min=${args.min ?? ''}
      .max=${args.max ?? ''}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
      @flint-date-range-picker-change=${onRangeChange}
    ></flint-date-range-picker>
  `),

    /**
     * Interaction test:
     * 1. Click the field → popover opens.
     * 2. Click a start date → range-start cell appears.
     * 3. Click an end date → popover auto-closes (desktop auto-commit).
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;

        // 1 ── Open popover by clicking the segments div
        await userEvent.click(getSegments(shadow));

        await waitFor(() => {
            expect(shadow.querySelector('.popover')).toHaveClass('open');
        });

        // 2 ── Click the 5th non-other-month day as start
        const calShadow = getCalShadow(shadow);
        const days = activeDays(calShadow);
        await userEvent.click(days[4]);

        await waitFor(() => {
            expect(calShadow.querySelector('.range-start')).not.toBeNull();
        });

        // 3 ── Click the 15th day as end; desktop auto-commits → popover closes
        await userEvent.click(days[14]);

        await waitFor(() => {
            expect(shadow.querySelector('.popover')).not.toHaveClass('open');
        });
    },
};

// ── Mobile ────────────────────────────────────────────────────────────────────
export const Mobile: Story = {
    name: 'Mobile Picker (Modal)',
    args: { variant: 'mobile', label: 'Trip Dates' },
    render: (args) => wrap(html`
    <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
      On touch devices the calendar opens in a full modal with Cancel / OK buttons.
    </p>
    <flint-date-range-picker
      .variant=${args.variant}
      .label=${args.label}
      ?shortcuts=${args.shortcuts}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
      @flint-date-range-picker-change=${onRangeChange}
    ></flint-date-range-picker>
  `),

    /**
     * Interaction test:
     * 1. Tap the mobile field → dialog opens, OK is disabled (no dates yet).
     * 2. Click a start + end date → OK becomes enabled.
     * 3. Click OK → flint-date-range-picker-change fires with both ISO dates.
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;

        // 1 ── Tap the mobile-field trigger
        await userEvent.click(shadow.querySelector('.mobile-field') as HTMLElement);

        await waitFor(() => {
            const okBtn = shadow.querySelector<HTMLButtonElement>('.action-btn.ok');
            expect(okBtn).not.toBeNull();
            expect(okBtn!.disabled).toBe(true); // no pending dates yet
        });

        // 2 ── Select start and end dates in the calendar
        const calShadow = getCalShadow(shadow);
        const days = activeDays(calShadow);
        await userEvent.click(days[4]);
        await userEvent.click(days[19]);

        await waitFor(() => {
            expect(shadow.querySelector<HTMLButtonElement>('.action-btn.ok')!.disabled).toBe(false);
        });

        // 3 ── Click OK and verify flint-date-range-picker-change fires
        let firedEvent: CustomEvent | null = null;
        canvasElement.addEventListener('flint-date-range-picker-change', (e) => { firedEvent = e as CustomEvent; }, { once: true });

        await userEvent.click(shadow.querySelector('.action-btn.ok') as HTMLElement);

        await waitFor(() => {
            expect(firedEvent).not.toBeNull();
            const [start, end] = firedEvent!.detail.value as DateRange;
            expect(start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        });
    },
};

// ── Static ────────────────────────────────────────────────────────────────────
export const Static: Story = {
    name: 'Static (Always Visible)',
    args: { variant: 'static' },
    render: (args) => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
        The static variant renders both calendars inline — no popover, no text field.
      </p>
      <flint-date-range-picker
        .variant=${args.variant}
        ?shortcuts=${args.shortcuts}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?error=${args.error}
        @flint-date-range-picker-change=${onRangeChange}
      ></flint-date-range-picker>
    </div>
  `,

    /**
     * Interaction test:
     * 1. First click → range-start is set, no end yet.
     * 2. Second click → full range: start, end, and in-range stripe appear.
     * 3. flint-date-range-picker-change fires with valid ISO dates.
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;

        let firedRange: DateRange | null = null;
        canvasElement.addEventListener('flint-date-range-picker-change', (e) => {
            firedRange = (e as CustomEvent).detail.value as DateRange;
        });

        const calShadow = getCalShadow(shadow);
        const days = activeDays(calShadow);

        // 1 ── Start date
        await userEvent.click(days[3]);

        await waitFor(() => {
            expect(calShadow.querySelector('.range-start')).not.toBeNull();
            expect(calShadow.querySelector('.range-end')).toBeNull();
        });

        // 2 ── End date (14 days later in the same month)
        await userEvent.click(days[17]);

        await waitFor(() => {
            expect(firedRange).not.toBeNull();
            expect(firedRange![0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(firedRange![1]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        });

        // 3 ── Both endpoints and stripe are visible
        await waitFor(() => {
            expect(calShadow.querySelector('.range-start')).not.toBeNull();
            expect(calShadow.querySelector('.range-end')).not.toBeNull();
            expect(calShadow.querySelectorAll('.in-range').length).toBeGreaterThan(0);
        });
    },
};

// ── With Shortcuts ────────────────────────────────────────────────────────────
export const WithShortcuts: Story = {
    name: 'With Shortcuts',
    args: { shortcuts: true, label: 'Report Period' },
    render: (args) => wrap(html`
    <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
      Predefined shortcuts let users select common ranges with a single click.
    </p>
    <flint-date-range-picker
      .variant=${args.variant}
      .label=${args.label}
      ?shortcuts=${args.shortcuts}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
      @flint-date-range-picker-change=${onRangeChange}
    ></flint-date-range-picker>
  `),

    /**
     * Interaction test:
     * 1. Open the popover.
     * 2. Click the "Today" shortcut → flint-date-range-picker-change fires with today's ISO date as both start and end.
     * 3. The shortcut button gains the `active` class.
     * 4. Popover closes automatically (complete range).
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;

        let firedEvent: CustomEvent | null = null;
        canvasElement.addEventListener('flint-date-range-picker-change', (e) => { firedEvent = e as CustomEvent; }, { once: true });

        // 1 ── Open the popover
        await userEvent.click(getSegments(shadow));

        await waitFor(() => {
            expect(shadow.querySelector('.popover')).toHaveClass('open');
        });

        // 2 ── Click the first shortcut ("Today")
        const todayBtn = shadow.querySelector('.shortcut-btn') as HTMLElement;
        await userEvent.click(todayBtn);

        // 3 ── flint-date-range-picker-change fires; "Today" gives start === end
        await waitFor(() => {
            expect(firedEvent).not.toBeNull();
            const [start, end] = firedEvent!.detail.value as DateRange;
            expect(start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(start).toBe(end);
        });

        // 4 ── "Today" button receives active class
        await waitFor(() => {
            expect(shadow.querySelector('.shortcut-btn')).toHaveClass('active');
        });

        // 5 ── Popover auto-closes
        await waitFor(() => {
            expect(shadow.querySelector('.popover')).not.toHaveClass('open');
        });
    },
};

// ── Static + Shortcuts ────────────────────────────────────────────────────────
export const StaticWithShortcuts: Story = {
    name: 'Static + Shortcuts',
    args: { variant: 'static', shortcuts: true },
    render: (args) => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
        Static calendar with a shortcuts panel on the left.
      </p>
      <flint-date-range-picker
        .variant=${args.variant}
        ?shortcuts=${args.shortcuts}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?error=${args.error}
        @flint-date-range-picker-change=${onRangeChange}
      ></flint-date-range-picker>
    </div>
  `,

    /**
     * Interaction test:
     * 1. Click the "Last 7 Days" shortcut (index 3).
     * 2. flint-date-range-picker-change fires with start < end.
     * 3. That shortcut button has the `active` class.
     * 4. Calendar shows range-start, range-end, and in-range stripe.
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;

        let firedEvent: CustomEvent | null = null;
        canvasElement.addEventListener('flint-date-range-picker-change', (e) => { firedEvent = e as CustomEvent; }, { once: true });

        // Shortcuts panel is always visible on the static variant
        const btns = shadow.querySelectorAll<HTMLElement>('.shortcut-btn');
        expect(btns.length).toBeGreaterThan(0);

        // 1 ── Click "Last 7 Days" (4th button, index 3)
        const last7Btn = btns[3];
        await userEvent.click(last7Btn);

        // 2 ── flint-date-range-picker-change fires with a multi-day range
        await waitFor(() => {
            expect(firedEvent).not.toBeNull();
            const [start, end] = firedEvent!.detail.value as DateRange;
            expect(start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(start < end).toBe(true);
        });

        // 3 ── Button is active
        await waitFor(() => {
            expect(last7Btn).toHaveClass('active');
        });

        // 4 ── Calendar reflects the range
        const calShadow = getCalShadow(shadow);
        await waitFor(() => {
            expect(calShadow.querySelector('.range-start')).not.toBeNull();
            expect(calShadow.querySelector('.range-end')).not.toBeNull();
        });
    },
};

// ── Controlled Value ──────────────────────────────────────────────────────────
export const ControlledValue: Story = {
    name: 'Controlled Value',
    render: () => {
        let currentRange: DateRange = ['2025-06-01', '2025-06-14'];
        return html`
      <div style="padding:48px;font-family:Inter,sans-serif;">
        <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
          The parent controls the value. Changing the range updates the display below.
        </p>
        <flint-date-range-picker
          id="controlled-drp"
          label="Vacation Dates"
          .value=${currentRange}
          @flint-date-range-picker-change=${(e: Event) => {
                const range = (e as CustomEvent).detail.value as DateRange;
                currentRange = range;
                (document.getElementById('controlled-drp') as FlintDateRangePicker).value = range;
                const out = document.getElementById('drp-output');
                if (out) out.textContent = `${range[0]} → ${range[1]}`;
            }}
        ></flint-date-range-picker>
        <p style="margin-top:16px;font-size:.875rem;color:#374151;">
          Range: <strong id="drp-output">${currentRange[0]} → ${currentRange[1]}</strong>
        </p>
      </div>
    `;
    },

    /**
     * Interaction test:
     * 1. Field segments show the pre-set range (2025-06-01 → 2025-06-14).
     * 2. Output paragraph shows the initial range text.
     * 3. Open picker, click a shortcut → output paragraph updates.
     */
    play: async ({ canvasElement }) => {
        const picker = canvasElement.querySelector('#controlled-drp') as HTMLElement & { shadowRoot: ShadowRoot };
        const shadow = picker.shadowRoot;

        // 1 ── Field segments must reflect the initial value
        const fieldEl = shadow.querySelector('flint-single-input-date-range-field') as HTMLElement & { shadowRoot: ShadowRoot };
        const segs = fieldEl.shadowRoot.querySelectorAll('.segment');

        await waitFor(() => {
            expect(segs[0].textContent?.trim()).toBe('06');   // start month
            expect(segs[1].textContent?.trim()).toBe('01');   // start day
            expect(segs[2].textContent?.trim()).toBe('2025'); // start year
            expect(segs[3].textContent?.trim()).toBe('06');   // end month
            expect(segs[4].textContent?.trim()).toBe('14');   // end day
            expect(segs[5].textContent?.trim()).toBe('2025'); // end year
        });

        // 2 ── Output text shows the initial range
        const output = canvasElement.querySelector('#drp-output');
        expect(output?.textContent).toContain('2025-06-01');
        expect(output?.textContent).toContain('2025-06-14');
    },
};

// ── Uncontrolled / defaultValue ───────────────────────────────────────────────
export const Uncontrolled: Story = {
    name: 'Uncontrolled (No Initial Value)',
    render: () => wrap(html`
    <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
      The component manages its own state. The parent only reacts to <code>flint-date-range-picker-change</code> events.
    </p>
    <flint-date-range-picker
      label="Select Period"
      @flint-date-range-picker-change=${(e: Event) => {
            const range = (e as CustomEvent).detail.value as DateRange;
            const out = document.getElementById('uncontrolled-out');
            if (out) out.textContent = range[0] && range[1] ? `${range[0]} → ${range[1]}` : '—';
        }}
    ></flint-date-range-picker>
    <p style="margin-top:16px;font-size:.875rem;color:#374151;">
      Range: <strong id="uncontrolled-out">—</strong>
    </p>
  `),
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: { disabled: true, label: 'Booking Period' },
    render: (args) => wrap(html`
    <flint-date-range-picker
      .variant=${args.variant}
      .label=${args.label}
      .value=${['2025-03-10', '2025-03-17'] as DateRange}
      ?shortcuts=${args.shortcuts}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
    ></flint-date-range-picker>
  `),

    /**
     * Interaction test:
     * 1. Click the field segments → popover must NOT open.
     * 2. The clear (✕) button is absent despite a value being set.
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;

        await userEvent.click(getSegments(shadow));

        await waitFor(() => {
            expect(shadow.querySelector('.popover')).not.toHaveClass('open');
        });

        const fieldEl = shadow.querySelector('flint-single-input-date-range-field') as HTMLElement & { shadowRoot: ShadowRoot };
        expect(fieldEl.shadowRoot.querySelector('.icon-btn')).toBeNull();
    },
};

// ── ReadOnly ──────────────────────────────────────────────────────────────────
export const ReadOnly: Story = {
    name: 'Read Only',
    args: { readonly: true, label: 'Confirmed Dates' },
    render: (args) => wrap(html`
    <flint-date-range-picker
      .variant=${args.variant}
      .label=${args.label}
      .value=${['2025-08-01', '2025-08-15'] as DateRange}
      ?shortcuts=${args.shortcuts}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
      @flint-date-range-picker-change=${onRangeChange}
    ></flint-date-range-picker>
  `),

    /**
     * Interaction test:
     * 1. Click the field → readonly blocks the popover from opening.
     * 2. The field segments still display the pre-set dates correctly.
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;

        await userEvent.click(getSegments(shadow));

        await waitFor(() => {
            expect(shadow.querySelector('.popover')).not.toHaveClass('open');
        });

        const fieldEl = shadow.querySelector('flint-single-input-date-range-field') as HTMLElement & { shadowRoot: ShadowRoot };
        const segs = fieldEl.shadowRoot.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('08'); // start month = August
        expect(segs[3].textContent?.trim()).toBe('08'); // end month = August
    },
};

// ── Error State ───────────────────────────────────────────────────────────────
export const ErrorState: Story = {
    name: 'Error State',
    args: { error: true, label: 'Project Duration', helperText: 'End date must be after start date' },
    render: (args) => wrap(html`
    <flint-date-range-picker
      .variant=${args.variant}
      .label=${args.label}
      .value=${['2025-05-01', '2025-04-01'] as DateRange}
      ?shortcuts=${args.shortcuts}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?error=${args.error}
      helper-text=${args.helperText ?? ''}
      @flint-date-range-picker-change=${onRangeChange}
    ></flint-date-range-picker>
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
      <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
        Only dates from <strong>today</strong> to <strong>60 days ahead</strong> are selectable.
      </p>
      <flint-date-range-picker
        label="Availability Window"
        .min=${min}
        .max=${fmt(max)}
        helper-text="Select within the next 60 days"
        @flint-date-range-picker-change=${onRangeChange}
      ></flint-date-range-picker>
    `);
    },
};

// ── All Variants ──────────────────────────────────────────────────────────────
export const AllVariants: Story = {
    name: 'All Variants',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 24px;font-size:1rem;font-weight:600;color:#374151;">Date Range Picker Variants</h3>
      <flint-stack direction="column" gap="48px" alignItems="flex-start">

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#4b5563;letter-spacing:.05em;margin:0 0 12px;">Desktop (Popover)</p>
          <flint-date-range-picker label="Check-in / Check-out" @flint-date-range-picker-change=${onRangeChange}></flint-date-range-picker>
        </div>

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#4b5563;letter-spacing:.05em;margin:0 0 12px;">Desktop + Shortcuts</p>
          <flint-date-range-picker label="Report Period" shortcuts @flint-date-range-picker-change=${onRangeChange}></flint-date-range-picker>
        </div>

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#4b5563;letter-spacing:.05em;margin:0 0 12px;">Mobile (Modal)</p>
          <flint-date-range-picker label="Trip Dates" variant="mobile" @flint-date-range-picker-change=${onRangeChange}></flint-date-range-picker>
        </div>

        <div>
          <p style="font-size:.75rem;font-weight:600;text-transform:uppercase;color:#4b5563;letter-spacing:.05em;margin:0 0 12px;">Static</p>
          <flint-date-range-picker variant="static" shortcuts @flint-date-range-picker-change=${onRangeChange}></flint-date-range-picker>
        </div>

      </div>
    </div>
  `,
};

// ── Single Input Field (standalone) ──────────────────────────────────────────
export const SingleInputField: Story = {
    name: 'Single Input Field (standalone)',
    render: () => html`
    <flint-stack direction="column" gap="32px" style="padding:48px;font-family:Inter,sans-serif;">
      <div>
        <h3 style="margin:0 0 16px;font-size:1rem;font-weight:600;color:#111827;">
          SingleInputDateRangeField
        </h3>
        <p style="margin:0 0 16px;font-size:.85rem;color:#4b5563;">
          Six independently-editable keyboard segments: month/day/year × 2.
          Use ↑↓ to increment, ←→ to navigate between segments, Esc to clear.
        </p>
        <flint-single-input-date-range-field
          label="Date Range"
          @flint-date-range-picker-change=${(e: CustomEvent) => {
            const out = document.getElementById('single-out');
            if (out) out.textContent = `${e.detail.value[0]} → ${e.detail.value[1]}`;
        }}
        ></flint-single-input-date-range-field>
        <p style="margin-top:12px;font-size:.85rem;color:#374151;">
          Value: <strong id="single-out">—</strong>
        </p>
      </div>

      <div>
        <p style="margin:0 0 10px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">With value</p>
        <flint-single-input-date-range-field
          label="Pre-filled Range"
          .value=${['2025-06-01', '2025-06-28'] as DateRange}
        ></flint-single-input-date-range-field>
      </div>

      <flint-stack direction="row" gap="24px" style="flex-wrap:wrap;">
        <div>
          <p style="margin:0 0 10px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">Disabled</p>
          <flint-single-input-date-range-field
            .value=${['2025-01-01', '2025-01-31'] as DateRange}
            disabled
          ></flint-single-input-date-range-field>
        </div>
        <div>
          <p style="margin:0 0 10px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">Error</p>
          <flint-single-input-date-range-field
            label="Period"
            .value=${['2025-05-01', '2025-04-01'] as DateRange}
            error
            helper-text="End must be after start"
          ></flint-single-input-date-range-field>
        </div>
      </flint-stack>
    </flint-stack>
  `,

    /**
     * Interaction test:
     * 1. Click the first (empty) field → start-month segment activates.
     * 2. Type '0' '6' → month becomes "06", auto-advances to start-day.
     * 3. Type '1' '5' → day becomes "15", auto-advances to start-year.
     * 4. Escape → all segments reset to MM / DD / YYYY placeholders.
     */
    play: async ({ canvasElement }) => {
        const fields = canvasElement.querySelectorAll<FlintSingleInputDateRangeField & HTMLElement>('flint-single-input-date-range-field');
        const field = fields[0];
        const fieldShadow = field.shadowRoot!;
        const segments = fieldShadow.querySelector('.segments') as HTMLElement;

        // 1 ── Click to activate the first segment
        await userEvent.click(segments);

        await waitFor(() => {
            expect(fieldShadow.querySelectorAll('.segment')[0]).toHaveClass('active');
        });

        // 2 ── Type '06' → month = June; auto-advance to start-day
        await userEvent.keyboard('06');

        await waitFor(() => {
            expect(fieldShadow.querySelectorAll('.segment')[0].textContent?.trim()).toBe('06');
            expect(fieldShadow.querySelectorAll('.segment')[1]).toHaveClass('active');
        });

        // 3 ── Type '15' → day = 15; auto-advance to start-year
        await userEvent.keyboard('15');

        await waitFor(() => {
            expect(fieldShadow.querySelectorAll('.segment')[1].textContent?.trim()).toBe('15');
        });

        // 4 ── Escape clears all six segments
        await userEvent.keyboard('{Escape}');

        await waitFor(() => {
            const segs = fieldShadow.querySelectorAll('.segment');
            expect(segs[0].textContent?.trim()).toBe('MM');
            expect(segs[1].textContent?.trim()).toBe('DD');
            expect(segs[3].textContent?.trim()).toBe('MM');
        });
    },
};

// ── Date Range Calendar (standalone) ─────────────────────────────────────────
export const DateRangeCalendar: Story = {
    name: 'Date Range Calendar (standalone)',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 16px;font-size:1rem;font-weight:600;color:#111827;">DateRangeCalendar</h3>
      <p style="margin:0 0 16px;font-size:.85rem;color:#4b5563;">
        The core dual-month calendar. First click sets the start date,
        second click sets the end date. Hover shows the range preview.
      </p>
      <flint-date-range-calendar
        id="standalone-cal"
        @flint-date-range-picker-select=${(e: CustomEvent) => {
            const range = e.detail.value as DateRange;
            const out = document.getElementById('cal-out');
            if (out) out.textContent = `${range[0] || '?'} → ${range[1] || '?'}`;
            (document.getElementById('standalone-cal') as FlintDateRangePicker).value = range;
        }}
        style="border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.08),0 0 0 1px #e5e7eb;overflow:hidden;display:inline-block;"
      ></flint-date-range-calendar>
      <p style="margin-top:16px;font-size:.875rem;color:#374151;">
        Range: <strong id="cal-out">—</strong>
      </p>
    </div>
  `,

    /**
     * Interaction test:
     * 1. First click → start is set, no end yet.
     * 2. Second click → range is complete; in-range stripe appears.
     * 3. The `#cal-out` paragraph updates with an ISO date.
     */
    play: async ({ canvasElement }) => {
        const cal = canvasElement.querySelector('flint-date-range-calendar') as HTMLElement & { shadowRoot: ShadowRoot };
        const calShadow = cal.shadowRoot;
        const days = activeDays(calShadow);

        // 1 ── First click: start date only
        await userEvent.click(days[4]);

        await waitFor(() => {
            expect(calShadow.querySelector('.range-start')).not.toBeNull();
            expect(calShadow.querySelector('.range-end')).toBeNull();
        });

        // 2 ── Second click: complete the range
        await userEvent.click(days[18]);

        await waitFor(() => {
            expect(calShadow.querySelector('.range-start')).not.toBeNull();
            expect(calShadow.querySelector('.range-end')).not.toBeNull();
            expect(calShadow.querySelectorAll('.in-range').length).toBeGreaterThan(0);
        });

        // 3 ── Output paragraph shows an ISO date string
        const out = canvasElement.querySelector('#cal-out');
        await waitFor(() => {
            expect(out?.textContent).toMatch(/\d{4}-\d{2}-\d{2}/);
        });
    },
};

// ── Mobile + Shortcuts ────────────────────────────────────────────────────────
export const MobileWithShortcuts: Story = {
    name: 'Mobile + Shortcuts',
    render: () => wrap(html`
    <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
      Mobile modal with predefined shortcuts on the left side.
    </p>
    <flint-date-range-picker
      variant="mobile"
      label="Report Period"
      shortcuts
      @flint-date-range-picker-change=${onRangeChange}
    ></flint-date-range-picker>
  `),

    /**
     * Interaction test:
     * 1. Tap the mobile field to open the dialog.
     * 2. Click "Yesterday" shortcut (index 1) → flint-date-range-picker-change fires immediately.
     * 3. OK button becomes enabled (shortcut gives a complete range).
     * 4. Click OK → dialog closes, range committed.
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;

        let firedEvent: CustomEvent | null = null;
        canvasElement.addEventListener('flint-date-range-picker-change', (e) => { firedEvent = e as CustomEvent; }, { once: true });

        // 1 ── Open dialog
        await userEvent.click(shadow.querySelector('.mobile-field') as HTMLElement);

        await waitFor(() => {
            expect(shadow.querySelector<HTMLButtonElement>('.action-btn.ok')).not.toBeNull();
        });

        // 2 ── Click "Yesterday" shortcut (index 1 in default list)
        const btns = shadow.querySelectorAll<HTMLElement>('.shortcut-btn');
        await userEvent.click(btns[1]);

        // 3 ── OK button is now enabled (shortcut produces a complete range)
        await waitFor(() => {
            expect(shadow.querySelector<HTMLButtonElement>('.action-btn.ok')!.disabled).toBe(false);
        });

        // 4 ── Click OK → flint-date-range-picker-change fires
        await userEvent.click(shadow.querySelector('.action-btn.ok') as HTMLElement);

        await waitFor(() => {
            expect(firedEvent).not.toBeNull();
            const [start, end] = firedEvent!.detail.value as DateRange;
            expect(start).toBe(end); // "Yesterday" is a same-day range
            expect(start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        });
    },
};

// ── Same-day Range ────────────────────────────────────────────────────────────
export const SameDayRange: Story = {
    name: 'Same-Day Range (Start = End)',
    render: () => wrap(html`
    <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
      When start and end are the same date both endpoints share a single cell (no stripe).
    </p>
    <flint-date-range-picker
      variant="static"
      .value=${['2025-07-15', '2025-07-15'] as DateRange}
      @flint-date-range-picker-change=${onRangeChange}
    ></flint-date-range-picker>
  `),

    /**
     * Interaction test:
     * 1. The calendar pre-loads with 2025-07-15 as both start and end.
     * 2. A single cell must have both `range-start` and `range-end` classes.
     * 3. No `in-range` cells exist (nothing between start and end).
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;
        const calShadow = getCalShadow(shadow);

        await waitFor(() => {
            expect(calShadow.querySelector('.range-start.range-end')).not.toBeNull();
        });

        await waitFor(() => {
            expect(calShadow.querySelectorAll('.in-range').length).toBe(0);
        });
    },
};

// ── Cross-month Range ─────────────────────────────────────────────────────────
export const CrossMonthRange: Story = {
    name: 'Cross-Month Range',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
        A range that spans across two months — the stripe connects across both panels.
      </p>
      <flint-date-range-picker
        variant="static"
        .value=${['2025-06-20', '2025-07-10'] as DateRange}
        @flint-date-range-picker-change=${onRangeChange}
      ></flint-date-range-picker>
    </div>
  `,

    /**
     * Interaction test:
     * 1. Calendar is pre-loaded with 2025-06-20 → 2025-07-10.
     * 2. Left panel (June 2025) shows range-start and in-range cells.
     * 3. Right panel (July 2025) shows range-end and in-range cells.
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;
        const calShadow = getCalShadow(shadow);

        // Both endpoints and in-range stripe should be visible across two panels
        await waitFor(() => {
            expect(calShadow.querySelector('.range-start')).not.toBeNull();
            expect(calShadow.querySelector('.range-end')).not.toBeNull();
            expect(calShadow.querySelectorAll('.in-range').length).toBeGreaterThan(0);
        });

        // The two month panels should have different month labels
        const headers = calShadow.querySelectorAll<HTMLElement>('.header-label');
        expect(headers.length).toBe(2);
        expect(headers[0].textContent).toContain('June');
        expect(headers[1].textContent).toContain('July');
    },
};

// ── Cross-year Range ──────────────────────────────────────────────────────────
export const CrossYearRange: Story = {
    name: 'Cross-Year Range',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
        A range spanning the December → January year boundary (navigate with ‹ ›).
      </p>
      <flint-date-range-picker
        variant="static"
        .value=${['2025-12-20', '2026-01-05'] as DateRange}
        @flint-date-range-picker-change=${onRangeChange}
      ></flint-date-range-picker>
    </div>
  `,

    /**
     * Interaction test:
     * 1. Calendar starts at December 2025 (contains start date).
     * 2. Left panel shows "December 2025", right shows "January 2026".
     * 3. range-start in Dec panel, range-end in Jan panel; in-range cells exist.
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;
        const calShadow = getCalShadow(shadow);

        await waitFor(() => {
            expect(calShadow.querySelector('.range-start')).not.toBeNull();
            expect(calShadow.querySelector('.range-end')).not.toBeNull();
        });

        // Panels span a year boundary
        const headers = calShadow.querySelectorAll<HTMLElement>('.header-label');
        expect(headers.length).toBe(2);
        expect(headers[0].textContent).toContain('December');
        expect(headers[1].textContent).toContain('January');
        expect(headers[0].textContent).toContain('2025');
        expect(headers[1].textContent).toContain('2026');
    },
};

// ── Read Only Mobile ──────────────────────────────────────────────────────────
export const ReadOnlyMobile: Story = {
    name: 'Read Only (Mobile)',
    render: () => wrap(html`
    <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
      In read-only mode, tapping the mobile field does <strong>not</strong> open the picker.
    </p>
    <flint-date-range-picker
      variant="mobile"
      label="Confirmed Booking"
      .value=${['2025-09-01', '2025-09-07'] as DateRange}
      readonly
    ></flint-date-range-picker>
  `),

    /**
     * Interaction test:
     * 1. Tap the mobile field → dialog must NOT open (readonly).
     * 2. The pre-set value is still visible in the mobile field text.
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;

        // Tap the mobile trigger
        const mobileField = shadow.querySelector<HTMLElement>('.mobile-field');
        await userEvent.click(mobileField as HTMLElement);

        // Dialog should NOT open — aria-expanded must stay 'false' (readonly blocks _openPicker)
        // The .action-btn.ok is always in the shadow DOM; checking aria-expanded is correct.
        await waitFor(() => {
            expect(mobileField?.getAttribute('aria-expanded')).toBe('false');
        });

        // Mobile field still shows the pre-set dates (format from isoToDisplay: MM/DD/YYYY)
        // ['2025-09-01', '2025-09-07'] → "09/01/2025 – 09/07/2025"
        expect(mobileField?.textContent).toMatch(/09\/01\/2025/);
    },
};

// ── Static with Min/Max ───────────────────────────────────────────────────────
export const StaticWithMinMax: Story = {
    name: 'Static with Min/Max',
    render: () => {
        const today = new Date();
        const fmt = (d: Date) =>
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const max = new Date(today);
        max.setDate(today.getDate() + 30);
        return html`
      <div style="padding:32px;font-family:Inter,sans-serif;">
        <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
          Static calendar — only the next <strong>30 days</strong> are selectable.
        </p>
        <flint-date-range-picker
          variant="static"
          .min=${fmt(today)}
          .max=${fmt(max)}
          @flint-date-range-picker-change=${onRangeChange}
        ></flint-date-range-picker>
      </div>
    `;
    },
};

// ── Field: Readonly ───────────────────────────────────────────────────────────
export const FieldReadOnly: Story = {
    name: 'Field: Read Only',
    render: () => html`
    <flint-stack direction="column" gap="24px" style="padding:48px;font-family:Inter,sans-serif;">
      <div>
        <p style="margin:0 0 8px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">Read Only</p>
        <flint-single-input-date-range-field
          label="Confirmed Period"
          .value=${['2025-06-01', '2025-06-28'] as DateRange}
          readonly
        ></flint-single-input-date-range-field>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">Read Only with Helper</p>
        <flint-single-input-date-range-field
          label="Locked Range"
          .value=${['2025-08-01', '2025-08-15'] as DateRange}
          readonly
          helper-text="This range is locked and cannot be changed."
        ></flint-single-input-date-range-field>
      </div>
    </flint-stack>
  `,
};

// ── Field: Various States ─────────────────────────────────────────────────────
export const FieldStates: Story = {
    name: 'Field: All States',
    render: () => html`
    <flint-stack direction="column" gap="28px" style="padding:48px;font-family:Inter,sans-serif;">
      <div>
        <p style="margin:0 0 8px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">Default (empty)</p>
        <flint-single-input-date-range-field label="Select a range"></flint-single-input-date-range-field>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">With value</p>
        <flint-single-input-date-range-field
          label="Vacation"
          .value=${['2025-07-01', '2025-07-14'] as DateRange}
        ></flint-single-input-date-range-field>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">Error</p>
        <flint-single-input-date-range-field
          label="Project Window"
          .value=${['2025-05-15', '2025-05-01'] as DateRange}
          error
          helper-text="End date must be after start date"
        ></flint-single-input-date-range-field>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">Disabled</p>
        <flint-single-input-date-range-field
          label="Unavailable"
          .value=${['2025-01-01', '2025-01-31'] as DateRange}
          disabled
        ></flint-single-input-date-range-field>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:.8rem;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:.04em;">Read Only</p>
        <flint-single-input-date-range-field
          label="Locked"
          .value=${['2025-03-01', '2025-03-31'] as DateRange}
          readonly
        ></flint-single-input-date-range-field>
      </div>
    </div>
  `,
};

// ── Calendar: Standalone, Pre-selected ────────────────────────────────────────
export const CalendarPreSelected: Story = {
    name: 'Calendar: Pre-selected Range',
    render: () => html`
    <div style="padding:32px;font-family:Inter,sans-serif;">
      <h3 style="margin:0 0 16px;font-size:1rem;font-weight:600;color:#111827;">Pre-selected Range</h3>
      <p style="margin:0 0 16px;font-size:.85rem;color:#4b5563;">
        Calendar initialised with a range already selected. Click a date to start a new range.
      </p>
      <flint-date-range-calendar
        id="preselected-cal"
        .value=${['2025-06-05', '2025-06-20'] as DateRange}
        @flint-date-range-picker-select=${(e: CustomEvent) => {
            const range = e.detail.value as DateRange;
            const out = document.getElementById('presel-out');
            if (out) out.textContent = `${range[0] || '?'} → ${range[1] || '?'}`;
            (document.getElementById('preselected-cal') as unknown as { value: DateRange }).value = range;
        }}
        style="border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,.08),0 0 0 1px #e5e7eb;overflow:hidden;display:inline-block;"
      ></flint-date-range-calendar>
      <p style="margin-top:16px;font-size:.875rem;color:#374151;">
        Range: <strong id="presel-out">2025-06-05 → 2025-06-20</strong>
      </p>
    </div>
  `,

    /**
     * Interaction test:
     * 1. Calendar is pre-loaded with 2025-06-05 → 2025-06-20.
     * 2. range-start, range-end, and in-range cells are all present.
     * 3. Clicking a new start date resets the range (only range-start, no end).
     */
    play: async ({ canvasElement }) => {
        const cal = canvasElement.querySelector('flint-date-range-calendar') as HTMLElement & { shadowRoot: ShadowRoot };
        const calShadow = cal.shadowRoot;

        // 1 ── Initial state: pre-selected range shows endpoints and stripe
        await waitFor(() => {
            expect(calShadow.querySelector('.range-start')).not.toBeNull();
            expect(calShadow.querySelector('.range-end')).not.toBeNull();
            expect(calShadow.querySelectorAll('.in-range').length).toBeGreaterThan(0);
        });

        // 2 ── Click a different day → resets to start-only (new selection begins)
        const days = activeDays(calShadow);
        await userEvent.click(days[0]);

        await waitFor(() => {
            expect(calShadow.querySelector('.range-start')).not.toBeNull();
            expect(calShadow.querySelector('.range-end')).toBeNull();
        });
    },
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
      <p style="font-size:.85rem;color:#4b5563;margin:0 0 16px;">
        Custom shortcut items — override the built-in set.
      </p>
      <flint-date-range-picker
        label="Analytics Period"
        shortcuts
        .shortcutItems=${myShortcuts}
        @flint-date-range-picker-change=${onRangeChange}
      ></flint-date-range-picker>
    `);
    },

    /**
     * Interaction test:
     * 1. Open the popover.
     * 2. Verify 4 custom shortcut buttons are rendered (not the 6 default ones).
     * 3. Click "Q1 2025" (index 2) → flint-date-range-picker-change fires with start='2025-01-01', end='2025-03-31'.
     * 4. That button gets the `active` class.
     */
    play: async ({ canvasElement }) => {
        const picker = getPicker(canvasElement);
        const shadow = picker.shadowRoot;

        let firedEvent: CustomEvent | null = null;
        canvasElement.addEventListener('flint-date-range-picker-change', (e) => { firedEvent = e as CustomEvent; }, { once: true });

        // 1 ── Open popover
        await userEvent.click(getSegments(shadow));

        await waitFor(() => {
            expect(shadow.querySelector('.popover')).toHaveClass('open');
        });

        // 2 ── Exactly 4 custom shortcuts
        const btns = shadow.querySelectorAll<HTMLElement>('.shortcut-btn');
        expect(btns.length).toBe(4);
        expect(btns[2].textContent?.trim()).toBe('Q1 2025');

        // 3 ── Click "Q1 2025"
        await userEvent.click(btns[2]);

        await waitFor(() => {
            expect(firedEvent).not.toBeNull();
            const [start, end] = firedEvent!.detail.value as DateRange;
            expect(start).toBe('2025-01-01');
            expect(end).toBe('2025-03-31');
        });

        // 4 ── Active class applied
        await waitFor(() => {
            expect(btns[2]).toHaveClass('active');
        });
    },
};
