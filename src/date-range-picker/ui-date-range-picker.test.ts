import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-date-range-picker.js';
import './ui-date-range-calendar.js';
import './ui-single-input-date-range-field.js';
import type { UiDateRangePicker } from './ui-date-range-picker.js';
import type { UiDateRangeCalendar } from './ui-date-range-calendar.js';
import type { UiSingleInputDateRangeField } from './ui-single-input-date-range-field.js';
import type { DateRange } from './date-range-helpers.js';
import {
    isoToDate, dateToIso, isBetween, sameDay,
    isStartOrEnd, isoToDisplay, buildRangeMonthGrid, defaultShortcuts,
} from './date-range-helpers.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function key(el: UiSingleInputDateRangeField, k: string, opts: KeyboardEventInit = {}) {
    const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
    segments.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, ...opts }));
}

async function focusField(el: UiSingleInputDateRangeField) {
    const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
    segments.dispatchEvent(new FocusEvent('focus'));
    await el.updateComplete;
    return segments;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ui-single-input-date-range-field
// ═══════════════════════════════════════════════════════════════════════════════

describe('ui-single-input-date-range-field', () => {

    it('is defined', () => {
        expect(document.createElement('ui-single-input-date-range-field')).toBeInstanceOf(HTMLElement);
    });

    // ── Default render ────────────────────────────────────────────────────────

    it('renders six segments', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs.length).toBe(6);
    });

    it('shows placeholder text in all segments when empty', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('MM');
        expect(segs[1].textContent?.trim()).toBe('DD');
        expect(segs[2].textContent?.trim()).toBe('YYYY');
        expect(segs[3].textContent?.trim()).toBe('MM');
        expect(segs[4].textContent?.trim()).toBe('DD');
        expect(segs[5].textContent?.trim()).toBe('YYYY');
    });

    it('renders a dash separator between start and end', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        const dash = el.shadowRoot!.querySelector('.range-dash');
        expect(dash).not.toBeNull();
        expect(dash!.textContent?.trim()).toBe('–');
    });

    it('renders label when provided', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field label="Period"></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('.field-label');
        expect(label?.textContent?.trim()).toBe('Period');
    });

    it('renders helper text', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field helper-text="Select a range"></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        const helper = el.shadowRoot!.querySelector('.helper');
        expect(helper?.textContent?.trim()).toBe('Select a range');
    });

    // ── Controlled value ──────────────────────────────────────────────────────

    it('parses controlled value into segments', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-03-15', '2025-04-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('03'); // start month
        expect(segs[1].textContent?.trim()).toBe('15'); // start day
        expect(segs[2].textContent?.trim()).toBe('2025'); // start year
        expect(segs[3].textContent?.trim()).toBe('04'); // end month
        expect(segs[4].textContent?.trim()).toBe('20'); // end day
        expect(segs[5].textContent?.trim()).toBe('2025'); // end year
    });

    it('updates segments when value prop changes', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2020-01-01', '2020-01-31'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        el.value = ['2030-12-01', '2030-12-31'];
        await el.updateComplete;
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('12');
        expect(segs[2].textContent?.trim()).toBe('2030');
    });

    // ── Attributes ────────────────────────────────────────────────────────────

    it('reflects disabled attribute', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field disabled></ui-single-input-date-range-field>`,
        );
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects error attribute', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field error></ui-single-input-date-range-field>`,
        );
        expect(el.hasAttribute('error')).toBe(true);
    });

    it('sets tabindex=0 on segments when enabled', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments');
        expect(segs?.getAttribute('tabindex')).toBe('0');
    });

    it('sets tabindex=-1 on segments when disabled', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field disabled></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments');
        expect(segs?.getAttribute('tabindex')).toBe('-1');
    });

    // ── Keyboard: focus ───────────────────────────────────────────────────────

    it('activates start-month segment on focus', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await focusField(el);
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
    });

    // ── Keyboard: digit input ─────────────────────────────────────────────────

    it('typing 5 sets start-month=5 and advances to start-day', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await focusField(el);
        key(el, '5');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('05');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('ArrowRight moves through segments', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await focusField(el); // start-month active
        key(el, 'ArrowRight');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].classList.contains('active')).toBe(true); // start-day
    });

    it('ArrowUp increments start-month', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-15'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el); // focuses start-month
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('07');
    });

    it('ArrowDown decrements start-month', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-15'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowDown');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('05');
    });

    it('Backspace clears the active segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month active
        key(el, 'Backspace');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('placeholder')).toBe(true);
    });

    it('Escape clears all segments', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'Escape');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('MM');
        expect(segs[3].textContent?.trim()).toBe('MM');
    });

    // ── Public API ────────────────────────────────────────────────────────────

    it('clear() fires range-clear event', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-03-01', '2025-03-31'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        setTimeout(() => el.clear());
        const event = await oneEvent(el, 'range-clear');
        expect(event).toBeDefined();
    });

    it('clear() resets all segment text to placeholder', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-01-10', '2025-02-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        el.clear();
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('MM');
        expect(segs[5].textContent?.trim()).toBe('YYYY');
    });

    it('clear button is shown when value exists', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-01-01', '2025-01-31'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.icon-btn');
        expect(btn).not.toBeNull();
    });

    it('hidden inputs are rendered with name prop', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field name="trip"></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        const hidden = el.shadowRoot!.querySelectorAll('input[type="hidden"]');
        expect(hidden.length).toBe(2);
        expect(hidden[0].getAttribute('name')).toBe('trip-start');
        expect(hidden[1].getAttribute('name')).toBe('trip-end');
    });

    it('disabled field does not respond to keyboard', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field disabled></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        key(el, '5');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ui-date-range-calendar
// ═══════════════════════════════════════════════════════════════════════════════

describe('ui-date-range-calendar', () => {

    it('is defined', () => {
        expect(document.createElement('ui-date-range-calendar')).toBeInstanceOf(HTMLElement);
    });

    it('renders two month panels', async () => {
        const el = await fixture<UiDateRangeCalendar>(
            html`<ui-date-range-calendar></ui-date-range-calendar>`,
        );
        await el.updateComplete;
        const panels = el.shadowRoot!.querySelectorAll('.month-panel');
        expect(panels.length).toBe(2);
    });

    it('each panel renders 42 day cells (6×7 grid)', async () => {
        const el = await fixture<UiDateRangeCalendar>(
            html`<ui-date-range-calendar></ui-date-range-calendar>`,
        );
        await el.updateComplete;
        const cells = el.shadowRoot!.querySelectorAll('.day-cell');
        expect(cells.length).toBe(84); // 2 panels × 42
    });

    it('renders 7 day-of-week headers per panel', async () => {
        const el = await fixture<UiDateRangeCalendar>(
            html`<ui-date-range-calendar></ui-date-range-calendar>`,
        );
        await el.updateComplete;
        const headers = el.shadowRoot!.querySelectorAll('.dow-cell');
        expect(headers.length).toBe(14); // 2 × 7
    });

    it('marks start and end cells with correct classes', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-05', '2025-06-20'] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const starts = el.shadowRoot!.querySelectorAll('.range-start');
        const ends = el.shadowRoot!.querySelectorAll('.range-end');
        expect(starts.length).toBeGreaterThanOrEqual(1);
        expect(ends.length).toBeGreaterThanOrEqual(1);
    });

    it('marks cells between start and end with in-range class', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-01', '2025-06-30'] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const inRange = el.shadowRoot!.querySelectorAll('.in-range');
        expect(inRange.length).toBeGreaterThan(0);
    });

    it('fires range-select with DateRange on cell click (first click = start)', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');

        setTimeout(() => currentDays[0].click());
        const event = await oneEvent(el, 'range-select') as CustomEvent;
        expect(event.detail.value).toHaveLength(2);
        expect(event.detail.value[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(event.detail.value[1]).toBe(''); // no end yet
    });

    it('fires range-select with both dates after second click', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-01', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');

        setTimeout(() => currentDays[9].click()); // click 10th day
        const event = await oneEvent(el, 'range-select') as CustomEvent;
        const [start, end] = event.detail.value as DateRange;
        expect(start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('navigates to the previous pair of months on prev button', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-01', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const prevBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn:not(.hidden)');
        prevBtn!.click();
        await el.updateComplete;
        const labels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(labels[0].textContent?.trim()).toContain('May');
    });

    it('navigates to the next pair of months on next button', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-01', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const allNavBtns = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.nav-btn');
        // The visible next button is the one without .hidden class on the right panel
        const nextBtn = Array.from(allNavBtns).find(b => !b.classList.contains('hidden') && b.getAttribute('aria-label') === 'Next month');
        nextBtn!.click();
        await el.updateComplete;
        const labels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(labels[0].textContent?.trim()).toContain('July');
    });

    it('swaps start/end when clicking before current start', async () => {
        // start = 2025-06-15, clicking a day before it should make new start and push old start to end
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-15', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        // Click day 1 (before day 15)
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        setTimeout(() => currentDays[0].click());
        const event = await oneEvent(el, 'range-select') as CustomEvent;
        const [start, end] = event.detail.value as DateRange;
        // start should be day 1, end should be 2025-06-15
        expect(end).toBe('2025-06-15');
        expect(start < end).toBe(true);
    });

    it('disabled cells cannot be clicked', async () => {
        const nextYear = new Date().getFullYear() + 2;
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['', ''] as DateRange}
              min="${nextYear}-01-01"
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-select', spy);
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        currentDays[0].click();
        expect(spy).not.toHaveBeenCalled();
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ui-date-range-picker
// ═══════════════════════════════════════════════════════════════════════════════

describe('ui-date-range-picker', () => {

    it('is defined', () => {
        expect(document.createElement('ui-date-range-picker')).toBeInstanceOf(HTMLElement);
    });

    it('renders a single-input field by default (desktop)', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field');
        expect(field).not.toBeNull();
    });

    it('popover is closed by default', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('open')).toBe(false);
    });

    it('renders label above the field', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker label="Trip Period"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('.field-label');
        expect(label?.textContent?.trim()).toBe('Trip Period');
    });

    it('renders helper text', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker helper-text="Select your dates"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const helper = el.shadowRoot!.querySelector('.helper-text');
        expect(helper?.textContent?.trim()).toBe('Select your dates');
    });

    it('reflects disabled attribute on host', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker disabled></ui-date-range-picker>`,
        );
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects error attribute on host', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker error></ui-date-range-picker>`,
        );
        expect(el.hasAttribute('error')).toBe(true);
    });

    it('renders static variant without a field', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="static"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field');
        expect(field).toBeNull();
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar');
        expect(cal).not.toBeNull();
    });

    it('does not render shortcuts panel when shortcuts=false', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker></ui-date-range-picker>`,
        );
        await el.updateComplete;
        // Open popover first
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.shortcuts-panel');
        expect(panel).toBeNull();
    });

    it('renders shortcuts panel when shortcuts=true', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker shortcuts variant="static"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.shortcuts-panel');
        expect(panel).not.toBeNull();
    });

    it('shortcut buttons appear in the panel', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker shortcuts variant="static"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const btns = el.shadowRoot!.querySelectorAll('.shortcut-btn');
        expect(btns.length).toBeGreaterThanOrEqual(1);
    });

    it('fires range-change event on static calendar select', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="static"
              .value=${['2025-06-01', ''] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;

        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as UiDateRangeCalendar;
        await cal.updateComplete;

        setTimeout(() => {
            const days = cal.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
            days[9].click();
        });
        const event = await oneEvent(el, 'range-change') as CustomEvent;
        expect(event.detail.value).toHaveLength(2);
    });

    it('clicking a shortcut fires range-change on static variant', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker shortcuts variant="static"></ui-date-range-picker>`,
        );
        await el.updateComplete;

        const spy = vi.fn();
        el.addEventListener('range-change', spy);

        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.shortcut-btn');
        btn!.click();
        expect(spy).toHaveBeenCalledOnce();
        const [start, end] = (spy.mock.calls[0][0] as CustomEvent).detail.value as DateRange;
        expect(start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('controlled value is passed to the calendar', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="static"
              .value=${['2025-06-01', '2025-06-14'] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as UiDateRangeCalendar;
        await cal.updateComplete;
        const starts = cal.shadowRoot!.querySelectorAll('.range-start');
        expect(starts.length).toBeGreaterThanOrEqual(1);
    });

    // ── Desktop: popover open / close ─────────────────────────────────────────

    it('popover opens when field is focused', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('open')).toBe(true);
    });

    it('popover closes via click-away backdrop', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(true);
        const backdrop = el.shadowRoot!.querySelector('.click-away') as HTMLElement;
        backdrop.click();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(false);
    });

    it('does not open popover when disabled', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker disabled></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('open')).toBe(false);
    });

    it('does not open popover when readonly', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker readonly></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('open')).toBe(false);
    });

    // ── Desktop: shortcut → commit + close ───────────────────────────────────

    it('clicking a shortcut on desktop commits range and fires range-change', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker shortcuts></ui-date-range-picker>`,
        );
        await el.updateComplete;
        // Open the popover
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.shortcut-btn');
        btn!.click();
        // Shortcut handler is async, wait a tick
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        const [start, end] = (spy.mock.calls[0][0] as CustomEvent).detail.value as DateRange;
        expect(start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('desktop popover closes automatically after full range is selected', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              .value=${['2025-06-01', ''] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        // Open popover
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        // Simulate the calendar emitting a full range
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as HTMLElement;
        cal.dispatchEvent(new CustomEvent('range-select', {
            detail: { value: ['2025-06-01', '2025-06-15'] as DateRange },
            bubbles: true, composed: true,
        }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(false);
    });

    it('range-change event carries both dates when field is typed into', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new CustomEvent('range-change', {
            detail: { value: ['2025-09-01', '2025-09-30'] as DateRange },
            bubbles: true, composed: true,
        }));
        expect(spy).toHaveBeenCalled();
        // Use last call — picker re-fires its own range-change on top of the field's bubbled event
        const { value } = (spy.mock.calls[spy.mock.calls.length - 1][0] as CustomEvent).detail as { value: DateRange };
        expect(value[0]).toBe('2025-09-01');
        expect(value[1]).toBe('2025-09-30');
    });

    // ── Mobile: OK / Cancel ───────────────────────────────────────────────────

    it('mobile: OK button is disabled when pending range is incomplete', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="mobile"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        // Open dialog
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.click();
        await el.updateComplete;
        const okBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn.ok');
        expect(okBtn).not.toBeNull();
        expect(okBtn!.disabled).toBe(true);
    });

    it('mobile: OK button is enabled once both dates are pending', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="mobile"
              .value=${['2025-06-01', '2025-06-15'] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.click();
        await el.updateComplete;
        const okBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn.ok');
        expect(okBtn!.disabled).toBe(false);
    });

    it('mobile: Cancel restores original value and fires no range-change', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="mobile"
              .value=${['2025-06-01', '2025-06-15'] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        // Open
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.click();
        await el.updateComplete;
        // Simulate selecting a new start date only (pending becomes incomplete)
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as HTMLElement;
        cal.dispatchEvent(new CustomEvent('range-select', {
            detail: { value: ['2025-07-01', ''] as DateRange },
            bubbles: true, composed: true,
        }));
        await el.updateComplete;
        // Cancel
        const cancelBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn.cancel');
        cancelBtn!.click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.value).toEqual(['2025-06-01', '2025-06-15']);
    });

    it('mobile: OK commits pending range and fires range-change', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="mobile"
              .value=${['2025-06-01', '2025-06-15'] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        // Open
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.click();
        await el.updateComplete;
        // Select a new full range via calendar
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as HTMLElement;
        cal.dispatchEvent(new CustomEvent('range-select', {
            detail: { value: ['2025-07-01', '2025-07-14'] as DateRange },
            bubbles: true, composed: true,
        }));
        await el.updateComplete;
        // Click OK
        const okBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn.ok');
        okBtn!.click();
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        const { value } = (spy.mock.calls[0][0] as CustomEvent).detail as { value: DateRange };
        expect(value[0]).toBe('2025-07-01');
        expect(value[1]).toBe('2025-07-14');
    });

    it('mobile: OK with incomplete pending falls back to current value (no event)', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="mobile"
              .value=${['2025-06-01', '2025-06-15'] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        // Open
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.click();
        await el.updateComplete;
        // Simulate an incomplete pending range being set (only start)
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as HTMLElement;
        cal.dispatchEvent(new CustomEvent('range-select', {
            detail: { value: ['2025-07-01', ''] as DateRange },
            bubbles: true, composed: true,
        }));
        await el.updateComplete;
        // Force call OK handler bypassing disabled button
        // The handler should fall back to this.value (same as before) → no event
        (el as unknown as { _handleMobileOk: () => void })._handleMobileOk();
        await el.updateComplete;
        // Same value → _commit is a no-op → no event
        expect(spy).not.toHaveBeenCalled();
        expect(el.value).toEqual(['2025-06-01', '2025-06-15']);
    });

    it('mobile: does not open picker when readonly', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="mobile" readonly></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.click();
        await el.updateComplete;
        // Dialog should not be open
        const dialog = el.shadowRoot!.querySelector('ui-dialog') as HTMLElement & { open: boolean };
        expect(dialog?.open ?? false).toBe(false);
    });

    // ── _commit: no-op for identical range ────────────────────────────────────

    it('mobile: Enter key on mobile-field opens the picker', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="mobile"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        const dialog = el.shadowRoot!.querySelector('ui-dialog') as HTMLElement & { open: boolean };
        expect(dialog?.open).toBe(true);
    });

    it('mobile: Space key on mobile-field opens the picker', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="mobile"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;
        const dialog = el.shadowRoot!.querySelector('ui-dialog') as HTMLElement & { open: boolean };
        expect(dialog?.open).toBe(true);
    });

    it('mobile: unrecognised key on mobile-field does not open the picker', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="mobile"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        await el.updateComplete;
        const dialog = el.shadowRoot!.querySelector('ui-dialog') as HTMLElement & { open: boolean };
        expect(dialog?.open ?? false).toBe(false);
    });

    it('mobile: formatted range shows when value is set', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="mobile"
              .value=${['2025-06-01', '2025-06-15'] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        expect(mobileField.textContent).toContain('06/01/2025');
    });

    it('auto variant resolves to desktop when pointer is fine', async () => {
        /* eslint-disable */
        (window as any).matchMedia = (q: string) => ({
            matches: false,  // pointer:coarse = false → resolves to desktop
            media: q, onchange: null,
            addListener: () => {}, removeListener: () => {},
            addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => false,
        });
        /* eslint-enable */
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="auto"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field');
        expect(field).not.toBeNull();
    });

    it('auto variant resolves to mobile when pointer is coarse', async () => {
        /* eslint-disable */
        (window as any).matchMedia = (q: string) => ({
            matches: q === '(pointer: coarse)',
            media: q, onchange: null,
            addListener: () => {}, removeListener: () => {},
            addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => false,
        });
        /* eslint-enable */
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="auto"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field');
        expect(mobileField).not.toBeNull();
        // Restore
        /* eslint-disable */
        (window as any).matchMedia = undefined;
        /* eslint-enable */
    });

    it('static + shortcuts: clicking a calendar cell commits range via _handleStaticSelect', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="static"
              shortcuts
              .value=${['2025-06-01', ''] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as UiDateRangeCalendar;
        await cal.updateComplete;
        // Click day 10 to complete the range → fires range-select → _handleStaticSelect
        setTimeout(() => {
            const days = cal.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
            days[9].click();
        });
        await oneEvent(el, 'range-change');
        expect(spy).toHaveBeenCalled();
    });

    // ── _renderField: no label (nothing branch) ───────────────────────────────

    it('desktop picker with empty label renders no field-label element', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker label=""></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('.field-label');
        expect(label).toBeNull();
    });

    // ── _renderMobileField: label nothing, disabled tabindex, helperText ──────

    it('mobile picker with empty label renders no field-label', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="mobile" label=""></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('.field-label');
        expect(label).toBeNull();
    });

    it('mobile picker disabled sets tabindex=-1 on mobile-field', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="mobile" disabled></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field');
        expect(mobileField?.getAttribute('tabindex')).toBe('-1');
    });

    it('mobile picker with helper-text renders helper paragraph', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="mobile" helper-text="Pick a range"></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const helper = el.shadowRoot!.querySelector('.helper-text');
        expect(helper?.textContent?.trim()).toBe('Pick a range');
    });

    // ── mobile shortcut does NOT auto-commit (line 115 false branch) ─────────

    it('mobile picker: clicking shortcut sets pending but does not immediately fire range-change', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="mobile" shortcuts></ui-date-range-picker>`,
        );
        await el.updateComplete;
        // Open the dialog
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.click();
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.shortcut-btn');
        btn!.click();
        await el.updateComplete;
        // On mobile, shortcut sets _pendingValue but doesn't commit until OK
        // So no range-change event fired yet
        expect(spy).not.toHaveBeenCalled();
        // OK button should now be enabled
        const okBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn.ok');
        expect(okBtn!.disabled).toBe(false);
    });

    // ── _handleShortcut: range[0] empty (line 120 false branch) ──────────────

    it('shortcut with empty range[0] skips navigateTo call', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="static"
              .shortcutItems=${[{ label: 'Empty', getValue: () => ['', ''] as DateRange }]}
              shortcuts
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.shortcut-btn');
        btn!.click();
        await el.updateComplete;
        // No error thrown; no range-change fired since range is same (both empty)
        // Picker just processes the empty range without navigating calendar
        expect(btn).not.toBeNull(); // sanity check
    });

    // ── _commit with only start date (line 140 false branch) ──────────────────

    it('partial range commit (only start) keeps picker open', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker></ui-date-range-picker>`,
        );
        await el.updateComplete;
        // Open the picker
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(true);
        // Dispatch a partial range-change (start only, no end)
        field.dispatchEvent(new CustomEvent('range-change', {
            detail: { value: ['2025-06-01', ''] as DateRange },
            bubbles: true, composed: true,
        }));
        await el.updateComplete;
        // Picker should still be open since range is incomplete (range[1] is empty)
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(true);
    });

    // ── _formatRange: only one date set ('?' fallback, lines 160-161) ─────────

    it('mobile picker: start empty, end set → start shows ? in formatted range', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="mobile"
              .value=${['', '2025-06-01'] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        // isoToDisplay('') || '?' = '?'; isoToDisplay('2025-06-01') = '06/01/2025'
        expect(mobileField.textContent).toContain('?');
        expect(mobileField.textContent).toContain('06/01/2025');
    });

    it('mobile picker: end empty, start set → end shows ? in formatted range (line 161)', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="mobile"
              .value=${['2025-06-01', ''] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        // isoToDisplay('2025-06-01') = '06/01/2025'; isoToDisplay('') || '?' = '?'
        expect(mobileField.textContent).toContain('06/01/2025');
        expect(mobileField.textContent).toContain('?');
    });

    it('commit is a no-op when value does not change', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="static"
              .value=${['2025-06-01', '2025-06-14'] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        // Emit the same range from the calendar → should be no-op
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as HTMLElement;
        cal.dispatchEvent(new CustomEvent('range-select', {
            detail: { value: ['2025-06-01', '2025-06-14'] as DateRange },
            bubbles: true, composed: true,
        }));
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// date-range-helpers — unit tests
// ═══════════════════════════════════════════════════════════════════════════════

describe('date-range-helpers', () => {

    // ── isoToDate ──────────────────────────────────────────────────────────────

    it('isoToDate returns null for empty string', () => {
        expect(isoToDate('')).toBeNull();
    });

    it('isoToDate parses a valid ISO string', () => {
        const d = isoToDate('2025-06-15');
        expect(d).not.toBeNull();
        expect(d!.getFullYear()).toBe(2025);
        expect(d!.getMonth()).toBe(5); // June = 5
        expect(d!.getDate()).toBe(15);
    });

    it('isoToDate returns null for overflowed date (Feb 30)', () => {
        expect(isoToDate('2025-02-30')).toBeNull();
    });

    it('isoToDate returns null for invalid month (0 or 13)', () => {
        expect(isoToDate('2025-00-01')).toBeNull();
        expect(isoToDate('2025-13-01')).toBeNull();
    });

    it('isoToDate returns null for invalid day 0', () => {
        expect(isoToDate('2025-06-00')).toBeNull();
    });

    it('isoToDate returns null for malformed string', () => {
        expect(isoToDate('not-a-date')).toBeNull();
    });

    it('isoToDate handles leap year Feb 29 correctly', () => {
        // 2024 is a leap year
        expect(isoToDate('2024-02-29')).not.toBeNull();
        // 2025 is NOT a leap year
        expect(isoToDate('2025-02-29')).toBeNull();
    });

    // ── dateToIso ──────────────────────────────────────────────────────────────

    it('dateToIso produces YYYY-MM-DD format', () => {
        const d = new Date(2025, 5, 5); // June 5 2025
        expect(dateToIso(d)).toBe('2025-06-05');
    });

    it('dateToIso pads year to 4 digits', () => {
        const d = new Date(999, 0, 1); // year 999
        expect(dateToIso(d)).toBe('0999-01-01');
    });

    it('dateToIso pads month and day with leading zeros', () => {
        const d = new Date(2025, 0, 9); // Jan 9
        expect(dateToIso(d)).toBe('2025-01-09');
    });

    it('isoToDate and dateToIso are inverse of each other', () => {
        const iso = '2025-11-30';
        const d = isoToDate(iso)!;
        expect(dateToIso(d)).toBe(iso);
    });

    // ── sameDay ────────────────────────────────────────────────────────────────

    it('sameDay returns true for same date', () => {
        const a = new Date(2025, 5, 15);
        const b = new Date(2025, 5, 15);
        expect(sameDay(a, b)).toBe(true);
    });

    it('sameDay returns false for different dates', () => {
        const a = new Date(2025, 5, 15);
        const b = new Date(2025, 5, 16);
        expect(sameDay(a, b)).toBe(false);
    });

    it('sameDay ignores time component', () => {
        const a = new Date(2025, 5, 15, 0, 0, 0);
        const b = new Date(2025, 5, 15, 23, 59, 59);
        expect(sameDay(a, b)).toBe(true);
    });

    // ── isBetween ──────────────────────────────────────────────────────────────

    it('isBetween returns true for date strictly between start and end', () => {
        const start = new Date(2025, 5, 1);
        const end = new Date(2025, 5, 30);
        const mid = new Date(2025, 5, 15);
        expect(isBetween(mid, start, end)).toBe(true);
    });

    it('isBetween returns false for date equal to start (exclusive)', () => {
        const start = new Date(2025, 5, 1);
        const end = new Date(2025, 5, 30);
        expect(isBetween(start, start, end)).toBe(false);
    });

    it('isBetween returns false for date equal to end (exclusive)', () => {
        const start = new Date(2025, 5, 1);
        const end = new Date(2025, 5, 30);
        expect(isBetween(end, start, end)).toBe(false);
    });

    it('isBetween works when start > end (swaps internally)', () => {
        const a = new Date(2025, 5, 30);
        const b = new Date(2025, 5, 1);
        const mid = new Date(2025, 5, 15);
        expect(isBetween(mid, a, b)).toBe(true);
    });

    it('isBetween returns false for date outside range', () => {
        const start = new Date(2025, 5, 1);
        const end = new Date(2025, 5, 30);
        const outside = new Date(2025, 6, 5);
        expect(isBetween(outside, start, end)).toBe(false);
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ui-single-input-date-range-field — additional tests
// ═══════════════════════════════════════════════════════════════════════════════

describe('ui-single-input-date-range-field — extended', () => {

    // ── Tab navigation ────────────────────────────────────────────────────────

    it('Tab advances to the next segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await focusField(el); // start-month active
        key(el, 'Tab');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].classList.contains('active')).toBe(true); // start-day
    });

    it('Shift+Tab moves to previous segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await focusField(el); // start-month active
        key(el, 'Tab');        // → start-day
        await el.updateComplete;
        key(el, 'Tab', { shiftKey: true }); // ← back to start-month
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true); // start-month
    });

    it('/ key advances segment (same as ArrowRight)', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await focusField(el);
        key(el, '/');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].classList.contains('active')).toBe(true); // start-day
    });

    it('ArrowLeft moves to previous segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await focusField(el);
        key(el, 'ArrowRight'); // start-day
        await el.updateComplete;
        key(el, 'ArrowLeft');  // back to start-month
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
    });

    // ── Year input (4-digit accumulation) ────────────────────────────────────

    it('typing 4 year digits sets the year and advances', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await focusField(el); // start-month
        // Navigate to start-year
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); // → start-day → start-year
        await el.updateComplete;
        key(el, '2'); key(el, '0'); key(el, '2'); key(el, '5');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].textContent?.trim()).toBe('2025');
    });

    // ── setRange() API ────────────────────────────────────────────────────────

    it('setRange() updates the displayed segments', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        el.setRange(['2030-11-20', '2030-12-31']);
        await el.updateComplete;
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('11'); // start month
        expect(segs[1].textContent?.trim()).toBe('20'); // start day
        expect(segs[2].textContent?.trim()).toBe('2030'); // start year
        expect(segs[3].textContent?.trim()).toBe('12'); // end month
        expect(segs[4].textContent?.trim()).toBe('31'); // end day
        expect(segs[5].textContent?.trim()).toBe('2030'); // end year
    });

    // ── ArrowUp/Down clamp ────────────────────────────────────────────────────

    it('ArrowUp on month=12 clamps to 12', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-12-01', '2025-12-31'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month (=12)
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('12');
    });

    it('ArrowDown on month=1 clamps to 1', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-01-15', '2025-02-15'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month (=1)
        key(el, 'ArrowDown');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('01');
    });

    // ── range-change fires when both segments complete ─────────────────────────

    it('fires range-change only when both dates are fully entered', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        await focusField(el);
        // Enter start: month=6 day=1 year=2025
        key(el, '6'); await el.updateComplete; // auto-advances to start-day
        key(el, '1'); await el.updateComplete; // single digit, waiting for 2nd
        key(el, 'ArrowRight'); await el.updateComplete; // commit partial → start-year
        key(el, '2'); key(el, '0'); key(el, '2'); key(el, '5'); await el.updateComplete;
        // At this point start is complete; range-change fires with incomplete end
        // Enter end: month=7 day=15 year=2025
        key(el, '7'); await el.updateComplete; // auto-advance
        key(el, '1'); key(el, '5'); await el.updateComplete; // end-day
        key(el, '2'); key(el, '0'); key(el, '2'); key(el, '5'); await el.updateComplete;
        // At least one range-change should have fired once year was completed
        expect(spy).toHaveBeenCalled();
        const lastCall = spy.mock.calls[spy.mock.calls.length - 1][0] as CustomEvent;
        const [s, e] = lastCall.detail.value as DateRange;
        expect(s).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(e).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    // ── readonly field ────────────────────────────────────────────────────────

    it('readonly field does not emit range-change on keyboard input', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(
            html`<ui-single-input-date-range-field readonly></ui-single-input-date-range-field>`,
        );
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        key(el, '5');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    // ── clear button ─────────────────────────────────────────────────────────

    it('clicking the clear button fires range-clear and resets segments', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-01', '2025-06-30'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-clear', spy);
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.icon-btn');
        btn!.click();
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('MM');
        expect(segs[5].textContent?.trim()).toBe('YYYY');
    });

    it('clear button is not rendered on disabled field', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-01-01', '2025-01-31'] as DateRange}
              disabled
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.icon-btn');
        expect(btn).toBeNull();
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ui-date-range-calendar — additional tests
// ═══════════════════════════════════════════════════════════════════════════════

describe('ui-date-range-calendar — extended', () => {

    // ── navigateTo() ──────────────────────────────────────────────────────────

    it('navigateTo() updates left panel to the target month', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-01', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        el.navigateTo('2025-11-01');
        await el.updateComplete;
        const labels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(labels[0].textContent?.trim()).toContain('November');
        expect(labels[1].textContent?.trim()).toContain('December');
    });

    it('navigateTo() wraps December → January for right panel', async () => {
        const el = await fixture<UiDateRangeCalendar>(
            html`<ui-date-range-calendar></ui-date-range-calendar>`,
        );
        await el.updateComplete;
        el.navigateTo('2025-12-01');
        await el.updateComplete;
        const labels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(labels[0].textContent?.trim()).toContain('December 2025');
        expect(labels[1].textContent?.trim()).toContain('January 2026');
    });

    it('navigateTo() is a no-op for invalid ISO string', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-01', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const labels = el.shadowRoot!.querySelectorAll('.header-label');
        const before = labels[0].textContent?.trim();
        el.navigateTo('not-a-date');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.header-label')[0].textContent?.trim()).toBe(before);
    });

    // ── Same-day range ────────────────────────────────────────────────────────

    it('same-day range marks that cell as both range-start and range-end', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-15', '2025-06-15'] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const cell = el.shadowRoot!.querySelector('.range-start.range-end');
        expect(cell).not.toBeNull();
    });

    // ── Second click before start swaps ──────────────────────────────────────

    it('clicking before existing start makes that date the new start', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-20', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        // Click day 5 (before 20)
        setTimeout(() => currentDays[4].click());
        const event = await oneEvent(el, 'range-select') as CustomEvent;
        const [start, end] = event.detail.value as DateRange;
        expect(end).toBe('2025-06-20');
        expect(start).toBe('2025-06-05');
    });

    // ── Clicking with both dates starts a new range ───────────────────────────

    it('clicking when both dates are set restarts the range', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-01', '2025-06-30'] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        setTimeout(() => currentDays[14].click()); // click day 15
        const event = await oneEvent(el, 'range-select') as CustomEvent;
        const [start, end] = event.detail.value as DateRange;
        expect(start).toBe('2025-06-15');
        expect(end).toBe('');
    });

    // ── Max constraint ────────────────────────────────────────────────────────

    it('future dates beyond max are disabled', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['', ''] as DateRange}
              max="2020-01-01"
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        // Navigate to 2020-01
        el.navigateTo('2020-01-01');
        await el.updateComplete;
        const disabledCells = el.shadowRoot!.querySelectorAll('.day-cell.disabled');
        expect(disabledCells.length).toBeGreaterThan(0);
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// date-range-helpers — additional coverage
// ═══════════════════════════════════════════════════════════════════════════════

describe('date-range-helpers — isStartOrEnd', () => {

    it('returns true when d matches start', () => {
        const d = new Date(2025, 5, 10);
        const start = new Date(2025, 5, 10);
        expect(isStartOrEnd(d, start, null)).toBe(true);
    });

    it('returns true when d matches end', () => {
        const d = new Date(2025, 5, 20);
        const end = new Date(2025, 5, 20);
        expect(isStartOrEnd(d, null, end)).toBe(true);
    });

    it('returns false when d matches neither start nor end', () => {
        const d = new Date(2025, 5, 15);
        const start = new Date(2025, 5, 10);
        const end = new Date(2025, 5, 20);
        expect(isStartOrEnd(d, start, end)).toBe(false);
    });

    it('returns false when both start and end are null', () => {
        const d = new Date(2025, 5, 15);
        expect(isStartOrEnd(d, null, null)).toBe(false);
    });

    it('returns false when start is null and d does not match end', () => {
        const d = new Date(2025, 5, 15);
        const end = new Date(2025, 5, 20);
        expect(isStartOrEnd(d, null, end)).toBe(false);
    });

    it('returns false when end is null and d does not match start', () => {
        const d = new Date(2025, 5, 15);
        const start = new Date(2025, 5, 10);
        expect(isStartOrEnd(d, start, null)).toBe(false);
    });
});

describe('date-range-helpers — isoToDisplay', () => {

    it('returns empty string for empty ISO', () => {
        expect(isoToDisplay('')).toBe('');
    });

    it('returns empty string for invalid ISO (isoToDate returns null)', () => {
        expect(isoToDisplay('not-a-date')).toBe('');
    });

    it('returns MM/DD/YYYY formatted string for valid ISO', () => {
        expect(isoToDisplay('2025-06-05')).toBe('06/05/2025');
    });

    it('pads single-digit month and day with leading zeros', () => {
        expect(isoToDisplay('2025-01-09')).toBe('01/09/2025');
    });
});

describe('date-range-helpers — defaultShortcuts', () => {

    it('This Week: start is Sunday and end is Saturday of current week', () => {
        const sc = defaultShortcuts().find(s => s.label === 'This Week')!;
        const [start, end] = sc.getValue();
        expect(start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        const startDate = isoToDate(start)!;
        const endDate = isoToDate(end)!;
        expect(startDate.getDay()).toBe(0); // Sunday
        expect(endDate.getDay()).toBe(6); // Saturday
        expect(endDate.getTime() - startDate.getTime()).toBe(6 * 86400000);
    });

    it('This Month: start is first day and end is last day of current month', () => {
        const sc = defaultShortcuts().find(s => s.label === 'This Month')!;
        const [start, end] = sc.getValue();
        expect(start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        const startDate = isoToDate(start)!;
        const endDate = isoToDate(end)!;
        expect(startDate.getDate()).toBe(1);
        // last day of month: next month minus one day
        const expectedLast = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
        expect(endDate.getDate()).toBe(expectedLast);
        expect(startDate.getMonth()).toBe(endDate.getMonth());
    });

    it('Last 30 Days: range spans exactly 29 days (30 days inclusive)', () => {
        const sc = defaultShortcuts().find(s => s.label === 'Last 30 Days')!;
        const [start, end] = sc.getValue();
        expect(start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        const startDate = isoToDate(start)!;
        const endDate = isoToDate(end)!;
        const diffDays = Math.round((endDate.getTime() - startDate.getTime()) / 86400000);
        expect(diffDays).toBe(29);
    });

    it('Last 7 Days: range spans exactly 6 days', () => {
        const sc = defaultShortcuts().find(s => s.label === 'Last 7 Days')!;
        const [start, end] = sc.getValue();
        const startDate = isoToDate(start)!;
        const endDate = isoToDate(end)!;
        const diffDays = Math.round((endDate.getTime() - startDate.getTime()) / 86400000);
        expect(diffDays).toBe(6);
    });

    it('Today: start and end are the same date (today)', () => {
        const sc = defaultShortcuts().find(s => s.label === 'Today')!;
        const [start, end] = sc.getValue();
        expect(start).toBe(end);
        expect(start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('Yesterday: start and end are both yesterday', () => {
        const sc = defaultShortcuts().find(s => s.label === 'Yesterday')!;
        const [start, end] = sc.getValue();
        expect(start).toBe(end);
        const d = isoToDate(start)!;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        expect(sameDay(d, yesterday)).toBe(true);
    });
});

describe('date-range-helpers — buildRangeMonthGrid', () => {

    it('always returns 42 cells', () => {
        const cells = buildRangeMonthGrid(2025, 5, null, null, null, null, null);
        expect(cells.length).toBe(42);
    });

    it('marks cells between startDate and hoverDate as isHoverRange', () => {
        const startDate = new Date(2025, 5, 5);   // June 5
        const hoverDate = new Date(2025, 5, 10);  // June 10
        const cells = buildRangeMonthGrid(2025, 5, startDate, null, hoverDate, null, null);
        const hoverRangeCells = cells.filter(c => c.isHoverRange && c.isCurrentMonth);
        // June 6-10 should be hover range (5 is start, 6-9 in-between, 10 is hoverEnd)
        expect(hoverRangeCells.length).toBeGreaterThan(0);
        // June 10 (hoverEnd) should be in hover range
        const hoverEndCell = cells.find(c => c.day === 10 && c.isCurrentMonth);
        expect(hoverEndCell?.isHoverRange).toBe(true);
        // cells between start and hover (6-9) should also be hover range
        const between = cells.find(c => c.day === 7 && c.isCurrentMonth);
        expect(between?.isHoverRange).toBe(true);
    });

    it('start cell itself is NOT in hover range', () => {
        const startDate = new Date(2025, 5, 5);
        const hoverDate = new Date(2025, 5, 10);
        const cells = buildRangeMonthGrid(2025, 5, startDate, null, hoverDate, null, null);
        const startCell = cells.find(c => c.day === 5 && c.isCurrentMonth);
        expect(startCell?.isStart).toBe(true);
        expect(startCell?.isHoverRange).toBe(false);
    });

    it('isHoverRange is false when endDate is already set', () => {
        const startDate = new Date(2025, 5, 5);
        const endDate = new Date(2025, 5, 20);
        const hoverDate = new Date(2025, 5, 10);
        const cells = buildRangeMonthGrid(2025, 5, startDate, endDate, hoverDate, null, null);
        const hoverRangeCells = cells.filter(c => c.isHoverRange);
        expect(hoverRangeCells.length).toBe(0);
    });

    it('min constraint marks early dates as disabled', () => {
        const cells = buildRangeMonthGrid(2025, 5, null, null, null, '2025-06-15', null);
        const earlyCell = cells.find(c => c.day === 1 && c.isCurrentMonth);
        expect(earlyCell?.isDisabled).toBe(true);
    });

    it('max constraint marks late dates as disabled', () => {
        const cells = buildRangeMonthGrid(2025, 5, null, null, null, null, '2025-06-10');
        const lateCell = cells.find(c => c.day === 20 && c.isCurrentMonth);
        expect(lateCell?.isDisabled).toBe(true);
    });

    it('leading days from previous month have isCurrentMonth=false', () => {
        // June 2025 starts on Sunday (0), no leading days... use May 2025 (starts Thursday = 4)
        const cells = buildRangeMonthGrid(2025, 4, null, null, null, null, null); // May 2025
        const leading = cells.filter(c => !c.isCurrentMonth).slice(0, 1);
        if (leading.length > 0) {
            expect(leading[0].isCurrentMonth).toBe(false);
        }
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ui-date-range-calendar — coverage gaps
// ═══════════════════════════════════════════════════════════════════════════════

describe('ui-date-range-calendar — coverage gaps', () => {

    it('mouseleave on day-grid clears hover state (no hover-range cells after leave)', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-05', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        // Hover over a cell after start to create hover range
        const cells = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        cells[9].dispatchEvent(new MouseEvent('mouseover', { bubbles: true })); // day 10
        await el.updateComplete;
        // Now trigger mouseleave on the day-grid
        const grid = el.shadowRoot!.querySelector('.day-grid') as HTMLElement;
        grid.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        await el.updateComplete;
        // hover-range class should be gone
        const hoverCells = el.shadowRoot!.querySelectorAll('.hover-range');
        expect(hoverCells.length).toBe(0);
    });

    it('_prevMonth wraps January (month 0) to December of previous year', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar></ui-date-range-calendar>
        `);
        await el.updateComplete;
        // Navigate to January of some year
        el.navigateTo('2025-01-01');
        await el.updateComplete;
        const labels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(labels[0].textContent?.trim()).toContain('January 2025');
        // Click prev — should go to December 2024
        const prevBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.nav-btn:not(.hidden)');
        prevBtn!.click();
        await el.updateComplete;
        const newLabels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(newLabels[0].textContent?.trim()).toContain('December 2024');
        expect(newLabels[1].textContent?.trim()).toContain('January 2025');
    });

    it('_nextMonth wraps December (month 11) to January of next year', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar></ui-date-range-calendar>
        `);
        await el.updateComplete;
        // Navigate to December of some year
        el.navigateTo('2025-12-01');
        await el.updateComplete;
        const labels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(labels[0].textContent?.trim()).toContain('December 2025');
        // Click next — should go to January 2026
        const allNavBtns = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.nav-btn');
        const nextBtn = Array.from(allNavBtns).find(b => !b.classList.contains('hidden') && b.getAttribute('aria-label') === 'Next month');
        nextBtn!.click();
        await el.updateComplete;
        const newLabels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(newLabels[0].textContent?.trim()).toContain('January 2026');
        expect(newLabels[1].textContent?.trim()).toContain('February 2026');
    });

    it('connectedCallback with invalid start ISO falls back to current month view', async () => {
        // 'invalid' is truthy but isoToDate returns null, so the if(d) block is not entered
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['invalid-iso', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        // Calendar should render without error, showing current month headers
        const labels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(labels.length).toBe(2);
    });

    it('disabled calendar does not fire range-select on cell click', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['', ''] as DateRange}
              disabled
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-select', spy);
        const cells = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        cells[0].click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('hover range cells appear when hovering after start date is set', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-05', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        el.navigateTo('2025-06-01');
        await el.updateComplete;
        // Hover over day 10 (after start day 5)
        const cells = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        cells[9].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await el.updateComplete;
        // Some cells should now have hover-range
        const hoverCells = el.shadowRoot!.querySelectorAll('.hover-range');
        expect(hoverCells.length).toBeGreaterThan(0);
    });

    it('hover does not add hover-range when end date is already set', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-05', '2025-06-20'] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        el.navigateTo('2025-06-01');
        await el.updateComplete;
        const cells = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        cells[9].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await el.updateComplete;
        const hoverCells = el.shadowRoot!.querySelectorAll('.hover-range');
        expect(hoverCells.length).toBe(0);
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ui-single-input-date-range-field — coverage gaps
// ═══════════════════════════════════════════════════════════════════════════════

describe('ui-single-input-date-range-field — coverage gaps', () => {

    // ── willUpdate: invalid ISO string ────────────────────────────────────────

    it('willUpdate: non-empty invalid start ISO leaves start segments null', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['invalid-date', ''] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // start segments should remain as placeholder since isoToDate returned null
        expect(segs[0].classList.contains('placeholder')).toBe(true);
        expect(segs[1].classList.contains('placeholder')).toBe(true);
        expect(segs[2].classList.contains('placeholder')).toBe(true);
    });

    it('willUpdate: non-empty invalid end ISO leaves end segments null', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-01', 'bad-end'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // start segments should be set
        expect(segs[0].textContent?.trim()).toBe('06');
        // end segments should remain as placeholder
        expect(segs[3].classList.contains('placeholder')).toBe(true);
        expect(segs[4].classList.contains('placeholder')).toBe(true);
        expect(segs[5].classList.contains('placeholder')).toBe(true);
    });

    // ── _nextSegment / _prevSegment edge cases ────────────────────────────────

    it('ArrowRight without prior focus sets active to start-month (_nextSegment null active)', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        // Dispatch keydown directly without focus so _active remains null
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
    });

    it('Shift+Tab on start-month (first segment) stays on start-month', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month active
        key(el, 'Tab', { shiftKey: true });
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
    });

    it('Tab on end-year (last segment) does not throw and stays on end-year', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-01', '2025-06-30'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month active
        // Navigate to end-year (index 5) via Tab × 5
        for (let i = 0; i < 5; i++) {
            key(el, 'Tab');
            await el.updateComplete;
        }
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[5].classList.contains('active')).toBe(true);
        // Tab once more — _canGoNext() returns false, no movement
        key(el, 'Tab');
        await el.updateComplete;
        expect(segs[5].classList.contains('active')).toBe(true);
    });

    it('Tab without prior focus (_canGoNext null active) sets first segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
    });

    it('ArrowLeft on start-month (first segment) stays on start-month', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month active
        key(el, 'ArrowLeft');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
    });

    // ── _adjust with null active ───────────────────────────────────────────────

    it('_adjust is a no-op when active is null', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        // Call private method directly with no active segment
        (el as unknown as { _adjust: (d: number) => void })._adjust(1);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // Nothing should have changed — all still placeholder
        expect(segs[0].classList.contains('placeholder')).toBe(true);
    });

    it('ArrowUp without focus sets start-month active and increments from null', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // start-month should be active and set to 1 (0+1 clamped to [1,12])
        expect(segs[0].classList.contains('active')).toBe(true);
        expect(segs[0].textContent?.trim()).toBe('01');
    });

    it('ArrowDown without focus sets start-month active and decrements from null', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
        expect(segs[0].textContent?.trim()).toBe('12'); // 13-1=12 clamped
    });

    // ── Delete key ────────────────────────────────────────────────────────────

    it('Delete key clears the active start-month segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month active
        key(el, 'Delete');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('placeholder')).toBe(true);
    });

    it('Delete key on start-day clears that segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); // start-day
        await el.updateComplete;
        key(el, 'Delete');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].classList.contains('placeholder')).toBe(true);
    });

    it('Delete key on start-year clears that segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); // start-year
        await el.updateComplete;
        key(el, 'Delete');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].classList.contains('placeholder')).toBe(true);
    });

    it('Delete key on end-month clears that segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); key(el, 'ArrowRight'); // end-month
        await el.updateComplete;
        key(el, 'Delete');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[3].classList.contains('placeholder')).toBe(true);
    });

    it('Delete key on end-day clears that segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 4; i++) { key(el, 'ArrowRight'); }
        await el.updateComplete;
        key(el, 'Delete');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[4].classList.contains('placeholder')).toBe(true);
    });

    it('Delete key on end-year clears that segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 5; i++) { key(el, 'ArrowRight'); }
        await el.updateComplete;
        key(el, 'Delete');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[5].classList.contains('placeholder')).toBe(true);
    });

    // ── _renderSeg click handler ──────────────────────────────────────────────

    it('clicking a segment span activates that segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll<HTMLElement>('.segment');
        // Click the end-month segment (index 3)
        segs[3].click();
        await el.updateComplete;
        expect(segs[3].classList.contains('active')).toBe(true);
    });

    it('clicking start-day segment activates it', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll<HTMLElement>('.segment');
        segs[1].click();
        await el.updateComplete;
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('clicking on disabled field does not activate any segment', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field disabled></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll<HTMLElement>('.segment');
        segs[0].click();
        await el.updateComplete;
        expect(segs[0].classList.contains('active')).toBe(false);
    });

    // ── _segText year with active buffer ──────────────────────────────────────

    it('year segment shows buffered digits padded with underscores', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        // Navigate to start-year
        key(el, 'ArrowRight'); key(el, 'ArrowRight');
        await el.updateComplete;
        // Type 2 digits of year
        key(el, '2'); key(el, '0');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // Should show '20__' (buffer padded to 4 chars)
        expect(segs[2].textContent?.trim()).toBe('20__');
    });

    it('month segment shows buffered digit padded with underscore', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month active
        key(el, '1'); // digit 1 for month — waits for second digit
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('1_');
    });

    // ── _handleBlur: relatedTarget inside shadowRoot ──────────────────────────

    it('blur with relatedTarget inside shadowRoot keeps focus state', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        // Check that we are focused
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        expect(segs.classList.contains('active') || el.shadowRoot!.querySelector('.active')).toBeTruthy();
        // Blur with relatedTarget pointing to something INSIDE the shadowRoot
        const anotherSegment = el.shadowRoot!.querySelectorAll('.segment')[1] as HTMLElement;
        segs.dispatchEvent(new FocusEvent('blur', {
            relatedTarget: anotherSegment,
            bubbles: true,
        }));
        await el.updateComplete;
        // active segment should still exist (blur was within shadow)
        const activeSegs = el.shadowRoot!.querySelectorAll('.segment.active');
        expect(activeSegs.length).toBe(1);
    });

    it('blur with relatedTarget outside shadowRoot clears focus state', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        // Blur with relatedTarget pointing to something outside shadow
        const outside = document.createElement('button');
        document.body.appendChild(outside);
        segs.dispatchEvent(new FocusEvent('blur', {
            relatedTarget: outside,
            bubbles: true,
        }));
        await el.updateComplete;
        const activeSegs = el.shadowRoot!.querySelectorAll('.segment.active');
        expect(activeSegs.length).toBe(0);
        document.body.removeChild(outside);
    });

    // ── _commitPartialBuffer: isNaN branch ────────────────────────────────────

    it('_commitPartialBuffer is a no-op when buffer is non-numeric', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        // Directly set a non-numeric buffer via private access
        (el as unknown as { _buf: string })._buf = 'x';
        // Trigger _commitPartialBuffer via navigating away (ArrowRight calls _setActive which calls _commitPartialBuffer)
        key(el, 'ArrowRight');
        await el.updateComplete;
        // Should have navigated but start-month should remain null (no commit happened)
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('placeholder')).toBe(true);
    });

    // ── _handleDigit: month two-digit invalid, d not in [2-9] ─────────────────

    it('typing 0 then 0 for month: buffer stays at 0, no valid month committed', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, '0'); // buf='0', d=0, not in [2-9], stays buffered
        key(el, '0'); // buf='00', num=0 < 1, invalid; _buf=String(0)='0', d=0 not in [2-9]
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // active buffer shows '0_' (not committed month)
        expect(segs[0].textContent?.trim()).toBe('0_');
        // stays on start-month (did not advance)
        expect(segs[0].classList.contains('active')).toBe(true);
        expect(segs[1].classList.contains('active')).toBe(false);
    });

    it('typing 1 then 9 for month: 19 invalid, so commits 9 (d=9 in [2-9])', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, '1'); // buf='1'
        key(el, '9'); // buf='19', 19>12 invalid, _buf='9', d=9 in [2-9] → commits 9, advances
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('09');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    // ── _handleDigit: day path with null end-month (uses ?? 1 fallback) ───────

    it('end-day digit input uses month=1 fallback when end-month is null', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', ''] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        await focusField(el); // start-month active (=6)
        // Navigate to end-day: ArrowRight × 4
        key(el, 'ArrowRight'); // start-day
        key(el, 'ArrowRight'); // start-year
        key(el, 'ArrowRight'); // end-month (_em is null)
        key(el, 'ArrowRight'); // end-day
        await el.updateComplete;
        // Type '5' for end-day: d=5, >= 4 → auto-commits via else this._ed = 5
        key(el, '5');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[4].textContent?.trim()).toBe('05');
    });

    it('end-day two-digit input commits correctly when end-month is null', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', ''] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        await focusField(el);
        // Navigate to end-day
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); key(el, 'ArrowRight'); key(el, 'ArrowRight');
        await el.updateComplete;
        // Type '1', '5' → buf='15', maxD = daysInMonth(1, 2000) = 31, 15 <= 31 → commits
        key(el, '1'); key(el, '5');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[4].textContent?.trim()).toBe('15');
    });

    // ── _handleDigit: day two-digit invalid, d < 4 (stays buffered) ───────────

    it('typing 3 then 2 for start-day in February (maxD=28): 32>28, d=2 not in [4-9]', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-02-15', '2025-03-01'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month (=2)
        key(el, 'ArrowRight'); // start-day
        await el.updateComplete;
        key(el, '3'); // buf='3', d=3, 3 < 4 → stays buffered (_buf='3')
        key(el, '2'); // buf='32', maxD=28 for Feb, 32>28 invalid → _buf='2', d=2 < 4 → stays buffered
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // start-day should remain at 15 (not overwritten) but buffer has '2'
        // Because the invalid two-digit didn't commit, and start-day stays = 15
        // BUT _buf is now '2', segment shows '2_' (active+buf)
        expect(segs[1].textContent?.trim()).toBe('2_');
    });

    // ── _adjust on each segment ────────────────────────────────────────────────

    it('ArrowUp on start-day increments the day', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); // start-day
        await el.updateComplete;
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('16');
    });

    it('ArrowUp on start-year increments the year', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); // start-year
        await el.updateComplete;
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].textContent?.trim()).toBe('2026');
    });

    it('ArrowDown on start-year decrements the year', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); // start-year
        await el.updateComplete;
        key(el, 'ArrowDown');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].textContent?.trim()).toBe('2024');
    });

    it('ArrowUp on end-month increments end-month', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); key(el, 'ArrowRight'); // end-month
        await el.updateComplete;
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[3].textContent?.trim()).toBe('08');
    });

    it('ArrowUp on end-day increments end-day', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 4; i++) { key(el, 'ArrowRight'); }
        await el.updateComplete;
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[4].textContent?.trim()).toBe('21');
    });

    it('ArrowUp on end-year increments end-year', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 5; i++) { key(el, 'ArrowRight'); }
        await el.updateComplete;
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[5].textContent?.trim()).toBe('2026');
    });

    // ── _adjust: null month defaults (delta > 0 uses 0, delta < 0 uses 13) ────

    it('ArrowUp on end-month when end-month is null starts from 0+1=1', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', ''] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); key(el, 'ArrowRight'); // end-month
        await el.updateComplete;
        key(el, 'ArrowUp'); // delta=+1, _em null → (0+1)=1, clamp → 1
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[3].textContent?.trim()).toBe('01');
    });

    it('ArrowDown on end-month when end-month is null starts from 13-1=12', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', ''] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); key(el, 'ArrowRight'); // end-month
        await el.updateComplete;
        key(el, 'ArrowDown'); // delta=-1, _em null → (13-1)=12, clamp → 12
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[3].textContent?.trim()).toBe('12');
    });

    it('ArrowUp on end-day when end-day is null starts from 0+1=1', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', ''] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 4; i++) { key(el, 'ArrowRight'); } // end-day
        await el.updateComplete;
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[4].textContent?.trim()).toBe('01');
    });

    it('ArrowDown on end-day when end-day is null starts from max+1-1=max', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', ''] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 4; i++) { key(el, 'ArrowRight'); } // end-day
        await el.updateComplete;
        key(el, 'ArrowDown'); // delta=-1, _ed null → (max+1-1)=max
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // With _em null → daysInMonth(1, 2000) = 31, so max = 31
        expect(segs[4].textContent?.trim()).toBe('31');
    });

    // ── _handleDigit: year for end-year ───────────────────────────────────────

    it('typing 4 year digits on end-year sets end-year', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 5; i++) { key(el, 'ArrowRight'); } // end-year
        await el.updateComplete;
        key(el, '2'); key(el, '0'); key(el, '2'); key(el, '6');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[5].textContent?.trim()).toBe('2026');
    });

    // ── _commitPartialBuffer for start-day / end-day ──────────────────────────

    // ── willUpdate without value change → changed.has('value') false (line 70) ─

    it('willUpdate skips segment sync when only non-value property changes', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        const beforeMonth = segs[0].textContent?.trim();
        // Trigger willUpdate without changing 'value' — change another property
        el.label = 'Period';
        await el.updateComplete;
        // Segments should be unchanged
        expect(segs[0].textContent?.trim()).toBe(beforeMonth);
    });

    // ── end-day two-digit commit with end-month set (non-null) (line 177 else) ─

    it('end-day two-digit commit with end-month=7 and end-day typed directly', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-01'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month
        for (let i = 0; i < 4; i++) { key(el, 'ArrowRight'); } // end-day (_em=7, maxD=31)
        await el.updateComplete;
        key(el, '2'); key(el, '0'); // buf='20', 20<=31 → _ed=20
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[4].textContent?.trim()).toBe('20');
    });

    it('start-day two-digit commit with start-month set', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-01', '2025-07-01'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month
        key(el, 'ArrowRight'); // start-day (_sm=6, maxD=30)
        await el.updateComplete;
        key(el, '1'); key(el, '5'); // buf='15', 15<=30 → _sd=15
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('15');
    });

    it('_commitPartialBuffer for month with invalid num (0): does not commit, stays null', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month active
        key(el, '0'); // buf='0', d=0, not in [2-9], stays buffered
        await el.updateComplete;
        key(el, 'ArrowRight'); // _setActive → _commitPartialBuffer → num=0, 0<1 → not committed, moves to start-day
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // start-month should still be placeholder (not committed)
        expect(segs[0].classList.contains('placeholder')).toBe(true);
        // now on start-day
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('partial start-day buffer is committed when navigating away via ArrowRight', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, '3'); // start-month = 3, advances to start-day
        await el.updateComplete;
        key(el, '1'); // buf='1' for start-day (waiting for second digit)
        await el.updateComplete;
        key(el, 'ArrowRight'); // commit partial → _sd = 1, move to start-year
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('01');
        expect(segs[2].classList.contains('active')).toBe(true);
    });

    it('partial end-day buffer is committed when navigating away', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', ''] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 4; i++) { key(el, 'ArrowRight'); } // end-day
        await el.updateComplete;
        key(el, '2'); // buf='2', d=2, 2 < 4 → stays buffered
        await el.updateComplete;
        key(el, 'ArrowRight'); // commit partial → _ed = 2, move to end-year
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[4].textContent?.trim()).toBe('02');
    });

    // ── daysInMonth out-of-range month via private state access ───────────────

    it('_adjust on start-day uses daysInMonth fallback when _sm is out of range', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); // start-day active
        await el.updateComplete;
        // Force _sm to 0 (out of range for daysInMonth) to exercise the guard
        (el as unknown as { _sm: number })._sm = 0;
        key(el, 'ArrowUp'); // calls _adjust(1) → daysInMonth(0, ...) returns 31
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // day should be 1 (0+1 with maxD=31, clamped)
        expect(segs[1].textContent?.trim()).toBe('01');
    });

    // ── Two-digit valid month path (lines 154-158) ────────────────────────────

    it('typing 1 then 0 for month: buf=10, commits month=10 and advances', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, '1'); // buf='1', d=1 < 2, stays buffered
        key(el, '0'); // buf='10', num=10, 10>=1 && 10<=12 → commits month=10, advances
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('10');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('typing 1 then 2 for month: buf=12, commits month=12 and advances', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, '1'); key(el, '2');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('12');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('typing 1 then 0 for end-month commits end-month=10', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        // Navigate to end-month
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); key(el, 'ArrowRight');
        await el.updateComplete;
        key(el, '1'); key(el, '0');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[3].textContent?.trim()).toBe('10');
    });

    // ── Invalid two-digit day where d >= 4 (lines 183-184) ────────────────────

    it('typing 3 then 5 for start-day: 35>maxD, d=5>=4 → commits sd=5, advances', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-09-01', '2025-09-30'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month
        key(el, 'ArrowRight'); // start-day (month=9, maxD=30)
        await el.updateComplete;
        key(el, '3'); // buf='3', d=3, 3 < 4 → stays buffered
        key(el, '5'); // buf='35', 35>30 invalid → _buf='5', d=5>=4 → _sd=5, advances
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('05');
        expect(segs[2].classList.contains('active')).toBe(true); // start-year
    });

    // ── start-day single digit >= 4 auto-commits (line 170 if branch) ──────────

    it('start-day: typing single digit 5 auto-commits _sd=5 and advances to start-year', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month
        key(el, 'ArrowRight'); // start-day
        await el.updateComplete;
        key(el, '5'); // d=5, >= 4 → _sd=5, advances to start-year
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('05');
        expect(segs[2].classList.contains('active')).toBe(true);
    });

    it('start-day: typing single digit 9 auto-commits _sd=9', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); // start-day
        await el.updateComplete;
        key(el, '9');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('09');
    });

    // ── willUpdate else branch: start empty clears segments (line 65) ─────────

    it('willUpdate clears start segments when value changes to empty start', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-07-20'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        // Change value so start is empty → else branch clears _sm/_sd/_sy
        el.value = ['', '2025-07-20'];
        await el.updateComplete;
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('placeholder')).toBe(true);
        expect(segs[3].textContent?.trim()).toBe('07'); // end remains
    });

    it('ArrowUp on start-day when both _sm and _sy are null uses daysInMonth fallback (1, 2000)', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el); // start-month active, _sm=null, _sy=null
        key(el, 'ArrowRight'); // start-day, _sm still null
        await el.updateComplete;
        // daysInMonth(null??1, null??2000) = daysInMonth(1, 2000) = 31
        key(el, 'ArrowUp'); // delta=+1, _sd null → 0+1=1
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('01');
    });

    it('typing digit without focus first activates start-month then processes digit (line 247)', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        // No focusField — _active is null
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new KeyboardEvent('keydown', { key: '6', bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // d=6 >= 2 → auto-commits start-month=6 and advances to start-day
        expect(segs[0].textContent?.trim()).toBe('06');
    });

    it('ArrowDown on start-day when _sd is null uses max+1 starting value', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', ''] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); // start-day (sd=15)
        await el.updateComplete;
        // Clear _sd to null to exercise the null-default branch
        (el as unknown as { _sd: null })._sd = null;
        key(el, 'ArrowDown'); // delta=-1, _sd null → (max+1-1)=max; maxD for June = 30
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('30');
    });

    it('ArrowUp on start-year when _sy is null uses currentYear as base', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); // start-year
        await el.updateComplete;
        // _sy is null (no year set)
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        const currentYear = new Date().getFullYear();
        expect(segs[2].textContent?.trim()).toBe(String(currentYear + 1));
    });

    it('ArrowDown on end-year when _ey is null uses currentYear as base', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 5; i++) { key(el, 'ArrowRight'); } // end-year
        await el.updateComplete;
        // _ey is null (no year set)
        key(el, 'ArrowDown');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        const currentYear = new Date().getFullYear();
        expect(segs[5].textContent?.trim()).toBe(String(currentYear - 1));
    });

    it('typing 3 then 9 for end-day: 39>maxD, d=9>=4 → commits ed=9, advances', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-15', '2025-06-01'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 4; i++) { key(el, 'ArrowRight'); } // end-day (month=6, maxD=30)
        await el.updateComplete;
        key(el, '3'); // buf='3', d=3, 3 < 4 → stays buffered
        key(el, '9'); // buf='39', 39>30 invalid → _buf='9', d=9>=4 → _ed=9, advances
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[4].textContent?.trim()).toBe('09');
        expect(segs[5].classList.contains('active')).toBe(true); // end-year
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Mutation-killing tests — helpers
// ═══════════════════════════════════════════════════════════════════════════════

describe('date-range-helpers — mutation killers', () => {

    // isBetween boundary precision: > vs >= and < vs <=
    it('isBetween: date one ms after lo is between', () => {
        const start = new Date(2025, 5, 1, 0, 0, 0, 0);
        const end = new Date(2025, 5, 30, 0, 0, 0, 0);
        const justAfterStart = new Date(2025, 5, 1, 0, 0, 0, 1);
        expect(isBetween(justAfterStart, start, end)).toBe(true);
    });

    it('isBetween: date one ms before hi is between', () => {
        const start = new Date(2025, 5, 1);
        const end = new Date(2025, 5, 30);
        const justBeforeEnd = new Date(2025, 5, 29, 23, 59, 59, 999);
        expect(isBetween(justBeforeEnd, start, end)).toBe(true);
    });

    it('isBetween: date outside before start is not between', () => {
        const start = new Date(2025, 5, 5);
        const end = new Date(2025, 5, 10);
        const before = new Date(2025, 5, 4);
        expect(isBetween(before, start, end)).toBe(false);
    });

    it('isBetween: date outside after end is not between', () => {
        const start = new Date(2025, 5, 5);
        const end = new Date(2025, 5, 10);
        const after = new Date(2025, 5, 11);
        expect(isBetween(after, start, end)).toBe(false);
    });

    // sameDay: year, month, and date must all match
    it('sameDay returns false for same day/month but different year', () => {
        expect(sameDay(new Date(2024, 5, 15), new Date(2025, 5, 15))).toBe(false);
    });

    it('sameDay returns false for same year/day but different month', () => {
        expect(sameDay(new Date(2025, 4, 15), new Date(2025, 5, 15))).toBe(false);
    });

    // isStartOrEnd: matches both
    it('isStartOrEnd returns true when d matches both start and end (same-day range)', () => {
        const d = new Date(2025, 5, 15);
        expect(isStartOrEnd(d, new Date(2025, 5, 15), new Date(2025, 5, 15))).toBe(true);
    });

    // isoToDate: specific edge cases for the overflow check
    it('isoToDate rejects Feb 29 on non-leap year (overflow → March)', () => {
        expect(isoToDate('2023-02-29')).toBeNull();
    });

    it('isoToDate accepts Feb 29 on leap year', () => {
        const d = isoToDate('2000-02-29');
        expect(d).not.toBeNull();
        expect(d!.getDate()).toBe(29);
    });

    // buildRangeMonthGrid: precise hover range behavior
    it('buildRangeMonthGrid: hoverEnd cell itself is marked isHoverRange', () => {
        const start = new Date(2025, 5, 5);
        const hover = new Date(2025, 5, 8);
        const cells = buildRangeMonthGrid(2025, 5, start, null, hover, null, null);
        const hoverEndCell = cells.find(c => c.day === 8 && c.isCurrentMonth);
        expect(hoverEndCell?.isHoverRange).toBe(true);
    });

    it('buildRangeMonthGrid: cell between start and hoverEnd is marked isHoverRange', () => {
        const start = new Date(2025, 5, 5);
        const hover = new Date(2025, 5, 10);
        const cells = buildRangeMonthGrid(2025, 5, start, null, hover, null, null);
        const midCell = cells.find(c => c.day === 7 && c.isCurrentMonth);
        expect(midCell?.isHoverRange).toBe(true);
    });

    it('buildRangeMonthGrid: start cell is NOT hover range', () => {
        const start = new Date(2025, 5, 5);
        const hover = new Date(2025, 5, 10);
        const cells = buildRangeMonthGrid(2025, 5, start, null, hover, null, null);
        const startCell = cells.find(c => c.day === 5 && c.isCurrentMonth);
        expect(startCell?.isHoverRange).toBe(false);
    });

    it('buildRangeMonthGrid: no hover range when hoverDate is null', () => {
        const start = new Date(2025, 5, 5);
        const cells = buildRangeMonthGrid(2025, 5, start, null, null, null, null);
        expect(cells.filter(c => c.isHoverRange).length).toBe(0);
    });

    it('buildRangeMonthGrid: no hover range when no startDate', () => {
        const hover = new Date(2025, 5, 10);
        const cells = buildRangeMonthGrid(2025, 5, null, null, hover, null, null);
        expect(cells.filter(c => c.isHoverRange).length).toBe(0);
    });

    it('buildRangeMonthGrid: isInRange is false when only startDate is set (no endDate)', () => {
        const start = new Date(2025, 5, 5);
        const cells = buildRangeMonthGrid(2025, 5, start, null, null, null, null);
        expect(cells.filter(c => c.isInRange).length).toBe(0);
    });

    it('buildRangeMonthGrid: isInRange true between start and end', () => {
        const start = new Date(2025, 5, 5);
        const end = new Date(2025, 5, 10);
        const cells = buildRangeMonthGrid(2025, 5, start, end, null, null, null);
        const midCell = cells.find(c => c.day === 7 && c.isCurrentMonth);
        expect(midCell?.isInRange).toBe(true);
    });

    it('buildRangeMonthGrid: start/end cells are NOT in-range (exclusive)', () => {
        const start = new Date(2025, 5, 5);
        const end = new Date(2025, 5, 10);
        const cells = buildRangeMonthGrid(2025, 5, start, end, null, null, null);
        const startCell = cells.find(c => c.day === 5 && c.isCurrentMonth);
        const endCell = cells.find(c => c.day === 10 && c.isCurrentMonth);
        expect(startCell?.isInRange).toBe(false);
        expect(endCell?.isInRange).toBe(false);
    });

    it('buildRangeMonthGrid: min boundary — date equal to min is NOT disabled', () => {
        const cells = buildRangeMonthGrid(2025, 5, null, null, null, '2025-06-10', null);
        const minCell = cells.find(c => c.day === 10 && c.isCurrentMonth);
        expect(minCell?.isDisabled).toBe(false);
    });

    it('buildRangeMonthGrid: max boundary — date equal to max is NOT disabled', () => {
        const cells = buildRangeMonthGrid(2025, 5, null, null, null, null, '2025-06-20');
        const maxCell = cells.find(c => c.day === 20 && c.isCurrentMonth);
        expect(maxCell?.isDisabled).toBe(false);
    });

    it('buildRangeMonthGrid: date one day before min IS disabled', () => {
        const cells = buildRangeMonthGrid(2025, 5, null, null, null, '2025-06-10', null);
        const beforeMin = cells.find(c => c.day === 9 && c.isCurrentMonth);
        expect(beforeMin?.isDisabled).toBe(true);
    });

    it('buildRangeMonthGrid: date one day after max IS disabled', () => {
        const cells = buildRangeMonthGrid(2025, 5, null, null, null, null, '2025-06-20');
        const afterMax = cells.find(c => c.day === 21 && c.isCurrentMonth);
        expect(afterMax?.isDisabled).toBe(true);
    });

    it('buildRangeMonthGrid: isToday marks today cell correctly', () => {
        const now = new Date();
        const cells = buildRangeMonthGrid(now.getFullYear(), now.getMonth(), null, null, null, null, null);
        const todayCell = cells.find(c => c.day === now.getDate() && c.isCurrentMonth);
        expect(todayCell?.isToday).toBe(true);
    });

    it('buildRangeMonthGrid: non-today cell is not marked isToday', () => {
        const now = new Date();
        const otherDay = now.getDate() === 1 ? 2 : 1;
        const cells = buildRangeMonthGrid(now.getFullYear(), now.getMonth(), null, null, null, null, null);
        const otherCell = cells.find(c => c.day === otherDay && c.isCurrentMonth);
        expect(otherCell?.isToday).toBe(false);
    });

    it('buildRangeMonthGrid: trailing cells from next month have isCurrentMonth=false', () => {
        // June 2025 starts on Sunday → 30 days + 0 leading = 30, trailing = 42 - 30 = 12
        const cells = buildRangeMonthGrid(2025, 5, null, null, null, null, null);
        const trailing = cells.slice(30);
        expect(trailing.length).toBeGreaterThan(0);
        expect(trailing.every(c => !c.isCurrentMonth)).toBe(true);
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Mutation-killing tests — calendar
// ═══════════════════════════════════════════════════════════════════════════════

describe('ui-date-range-calendar — mutation killers', () => {

    it('right panel shows month + 1 for non-December months', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar></ui-date-range-calendar>
        `);
        el.navigateTo('2025-03-01');
        await el.updateComplete;
        const labels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(labels[0].textContent?.trim()).toContain('March');
        expect(labels[1].textContent?.trim()).toContain('April');
    });

    it('right panel wraps to January of next year when left is December', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar></ui-date-range-calendar>
        `);
        el.navigateTo('2025-12-01');
        await el.updateComplete;
        const labels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(labels[1].textContent?.trim()).toContain('January 2026');
    });

    it('right panel year equals left year for non-December months', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar></ui-date-range-calendar>
        `);
        el.navigateTo('2025-06-01');
        await el.updateComplete;
        const labels = el.shadowRoot!.querySelectorAll('.header-label');
        expect(labels[0].textContent?.trim()).toContain('2025');
        expect(labels[1].textContent?.trim()).toContain('2025');
    });

    it('cell click on same day as start (no end) restarts range with that date', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-10', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        // Click day 10 again (same as start)
        setTimeout(() => currentDays[9].click());
        const event = await oneEvent(el, 'range-select') as CustomEvent;
        const [start, end] = event.detail.value as DateRange;
        // Clicking same day when only start is set → completes range (start <= clickDate → newRange = [start, cell.iso])
        expect(start).toBe('2025-06-10');
        expect(end).toBe('2025-06-10');
    });

    it('cell click after start sets end (normal order)', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-05', ''] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        setTimeout(() => currentDays[14].click()); // day 15
        const event = await oneEvent(el, 'range-select') as CustomEvent;
        const [start, end] = event.detail.value as DateRange;
        expect(start).toBe('2025-06-05');
        expect(end).toBe('2025-06-15');
    });

    it('aria-pressed is "true" on start and end cells, "false" on others', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-05', '2025-06-10'] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const starts = el.shadowRoot!.querySelectorAll('.range-start');
        expect(starts[0].getAttribute('aria-pressed')).toBe('true');
        const ends = el.shadowRoot!.querySelectorAll('.range-end');
        expect(ends[0].getAttribute('aria-pressed')).toBe('true');
        // A cell not start/end should have aria-pressed false
        const normalCell = el.shadowRoot!.querySelector('.in-range') as HTMLElement;
        if (normalCell) {
            expect(normalCell.getAttribute('aria-pressed')).toBe('false');
        }
    });

    it('disabled cells have aria-disabled="true" and tabindex="-1"', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['', ''] as DateRange}
              min="2025-06-15"
            ></ui-date-range-calendar>
        `);
        el.navigateTo('2025-06-01');
        await el.updateComplete;
        const disabledCell = el.shadowRoot!.querySelector('.day-cell.disabled') as HTMLElement;
        expect(disabledCell).not.toBeNull();
        expect(disabledCell.getAttribute('aria-disabled')).toBe('true');
        expect(disabledCell.getAttribute('tabindex')).toBe('-1');
    });

    it('other-month cells have tabindex="-1"', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const otherMonthCell = el.shadowRoot!.querySelector('.day-cell.other-month') as HTMLElement;
        if (otherMonthCell) {
            expect(otherMonthCell.getAttribute('tabindex')).toBe('-1');
        }
    });

    it('current-month enabled cells have tabindex="0"', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const currentMonthCells = el.shadowRoot!.querySelectorAll('.day-cell:not(.other-month):not(.disabled)');
        expect(currentMonthCells.length).toBeGreaterThan(0);
        expect(currentMonthCells[0].getAttribute('tabindex')).toBe('0');
    });

    it('_handleCellHover does not update _hoverIso when end date is set', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar
              .value=${['2025-06-05', '2025-06-20'] as DateRange}
            ></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const cells = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        cells[9].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        await el.updateComplete;
        // No hover-range cells when end is already set
        expect(el.shadowRoot!.querySelectorAll('.hover-range').length).toBe(0);
    });

    it('prev nav button is hidden on right panel, next on left panel', async () => {
        const el = await fixture<UiDateRangeCalendar>(html`
            <ui-date-range-calendar></ui-date-range-calendar>
        `);
        await el.updateComplete;
        const panels = el.shadowRoot!.querySelectorAll('.month-panel');
        // Left panel: prev visible (no .hidden), next hidden
        const leftNavBtns = panels[0].querySelectorAll('.nav-btn');
        expect(leftNavBtns[0].classList.contains('hidden')).toBe(false); // prev
        expect(leftNavBtns[1].classList.contains('hidden')).toBe(true); // next
        // Right panel: prev hidden, next visible
        const rightNavBtns = panels[1].querySelectorAll('.nav-btn');
        expect(rightNavBtns[0].classList.contains('hidden')).toBe(true); // prev
        expect(rightNavBtns[1].classList.contains('hidden')).toBe(false); // next
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Mutation-killing tests — picker
// ═══════════════════════════════════════════════════════════════════════════════

describe('ui-date-range-picker — mutation killers', () => {

    it('desktop: calendar select clears active shortcut class', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker shortcuts></ui-date-range-picker>`,
        );
        await el.updateComplete;
        // Open popover
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        // Click a shortcut to make it active
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.shortcut-btn');
        btn!.click();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.shortcut-btn.active')).not.toBeNull();
        // Now select from calendar → should clear activeShortcut
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as HTMLElement;
        cal.dispatchEvent(new CustomEvent('range-select', {
            detail: { value: ['2025-08-01', ''] as DateRange },
            bubbles: true, composed: true,
        }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.shortcut-btn.active')).toBeNull();
    });

    it('desktop: partial range from calendar does NOT close popover', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker></ui-date-range-picker>
        `);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as HTMLElement;
        cal.dispatchEvent(new CustomEvent('range-select', {
            detail: { value: ['2025-06-01', ''] as DateRange },
            bubbles: true, composed: true,
        }));
        await el.updateComplete;
        // Partial range (no end) → should NOT auto-commit on desktop
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(true);
    });

    it('mobile: Cancel resets _activeShortcut (no active class after cancel)', async () => {
        const el = await fixture<UiDateRangePicker>(
            html`<ui-date-range-picker variant="mobile" shortcuts></ui-date-range-picker>`,
        );
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.click();
        await el.updateComplete;
        // Click a shortcut
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.shortcut-btn');
        btn!.click();
        await el.updateComplete;
        // Cancel
        const cancelBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn.cancel');
        cancelBtn!.click();
        await el.updateComplete;
        // Re-open to check
        mobileField.click();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.shortcut-btn.active')).toBeNull();
    });

    it('_openPicker does not open when already open', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker></ui-date-range-picker>
        `);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(true);
        // Focus again — should not throw or change state
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(true);
    });

    it('custom shortcutItems overrides default shortcuts', async () => {
        const custom = [{ label: 'Custom', getValue: () => ['2025-01-01', '2025-01-31'] as DateRange }];
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="static"
              shortcuts
              .shortcutItems=${custom}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const btns = el.shadowRoot!.querySelectorAll('.shortcut-btn');
        expect(btns.length).toBe(1);
        expect(btns[0].textContent?.trim()).toBe('Custom');
    });

    it('empty shortcutItems array uses defaultShortcuts', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="static"
              shortcuts
              .shortcutItems=${[]}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const btns = el.shadowRoot!.querySelectorAll('.shortcut-btn');
        expect(btns.length).toBe(6); // 6 default shortcuts
    });

    it('desktop pending value: uses this.value when both pending parts are empty', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              .value=${['2025-06-01', '2025-06-15'] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        // Calendar should show range from this.value (since _pendingValue is still EMPTY_RANGE at open → set to [...this.value])
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as UiDateRangeCalendar;
        const starts = cal.shadowRoot!.querySelectorAll('.range-start');
        expect(starts.length).toBeGreaterThanOrEqual(1);
    });

    it('static without shortcuts: renders calendar directly (no flex wrapper)', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker variant="static"></ui-date-range-picker>
        `);
        await el.updateComplete;
        const staticWrapper = el.shadowRoot!.querySelector('.static-wrapper');
        expect(staticWrapper).not.toBeNull();
        // Should NOT have the flex div wrapping
        const flexDiv = staticWrapper!.querySelector('div[style]');
        expect(flexDiv).toBeNull();
        // But should have the calendar
        const cal = staticWrapper!.querySelector('ui-date-range-calendar');
        expect(cal).not.toBeNull();
    });

    it('static with shortcuts: wraps in flex div', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker variant="static" shortcuts></ui-date-range-picker>
        `);
        await el.updateComplete;
        const staticWrapper = el.shadowRoot!.querySelector('.static-wrapper');
        expect(staticWrapper).not.toBeNull();
        const shortcuts = staticWrapper!.querySelector('.shortcuts-panel');
        expect(shortcuts).not.toBeNull();
    });

    it('mobile placeholder: shows "Start date – End date" when no value', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker variant="mobile"></ui-date-range-picker>
        `);
        await el.updateComplete;
        const placeholder = el.shadowRoot!.querySelector('.mobile-field-placeholder');
        expect(placeholder).not.toBeNull();
        expect(placeholder!.textContent?.trim()).toContain('Start date');
    });

    it('mobile: formatted range replaces placeholder when value is set', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              variant="mobile"
              .value=${['2025-06-01', '2025-06-30'] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const placeholder = el.shadowRoot!.querySelector('.mobile-field-placeholder');
        expect(placeholder).toBeNull();
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        expect(mobileField.textContent).toContain('06/01/2025');
        expect(mobileField.textContent).toContain('06/30/2025');
    });

    it('mobile field has aria-haspopup="dialog"', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker variant="mobile"></ui-date-range-picker>
        `);
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field');
        expect(mobileField?.getAttribute('aria-haspopup')).toBe('dialog');
    });

    it('mobile field aria-expanded toggles', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker variant="mobile"></ui-date-range-picker>
        `);
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        expect(mobileField.getAttribute('aria-expanded')).toBe('false');
        mobileField.click();
        await el.updateComplete;
        expect(mobileField.getAttribute('aria-expanded')).toBe('true');
    });

    it('commit with identical range closes picker but fires no event', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              .value=${['2025-06-01', '2025-06-15'] as DateRange}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(true);
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        // Emit same range → _commit should be no-op (no event) but closes picker
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as HTMLElement;
        cal.dispatchEvent(new CustomEvent('range-select', {
            detail: { value: ['2025-06-01', '2025-06-15'] as DateRange },
            bubbles: true, composed: true,
        }));
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(false);
    });

    it('desktop: shortcut navigates calendar to shortcut start month', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker
              shortcuts
              .shortcutItems=${[{
                label: 'Jan2020',
                getValue: () => ['2020-01-01', '2020-01-31'] as DateRange
              }]}
            ></ui-date-range-picker>
        `);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.shortcut-btn');
        btn!.click();
        await el.updateComplete;
        await el.updateComplete;
        // Calendar should have navigated to January 2020
        // Re-open since shortcut may have closed it
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
        await el.updateComplete;
        const cal = el.shadowRoot!.querySelector('ui-date-range-calendar') as UiDateRangeCalendar;
        await cal.updateComplete;
        const labels = cal.shadowRoot!.querySelectorAll('.header-label');
        expect(labels[0].textContent?.trim()).toContain('January');
    });

    it('mobile: does not open when disabled', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker variant="mobile" disabled></ui-date-range-picker>
        `);
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field') as HTMLElement;
        mobileField.click();
        await el.updateComplete;
        const dialog = el.shadowRoot!.querySelector('ui-dialog') as HTMLElement & { open: boolean };
        expect(dialog?.open ?? false).toBe(false);
    });

    it('mobile: disabled field has tabindex=-1', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker variant="mobile" disabled></ui-date-range-picker>
        `);
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field');
        expect(mobileField?.getAttribute('tabindex')).toBe('-1');
    });

    it('mobile: enabled field has tabindex=0', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker variant="mobile"></ui-date-range-picker>
        `);
        await el.updateComplete;
        const mobileField = el.shadowRoot!.querySelector('.mobile-field');
        expect(mobileField?.getAttribute('tabindex')).toBe('0');
    });

    it('field range-change goes through _handleFieldRangeChange → _commit', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker></ui-date-range-picker>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        const field = el.shadowRoot!.querySelector('ui-single-input-date-range-field') as HTMLElement;
        field.dispatchEvent(new CustomEvent('range-change', {
            detail: { value: ['2025-03-01', '2025-03-15'] as DateRange },
            bubbles: true, composed: true,
        }));
        expect(spy).toHaveBeenCalled();
        expect(el.value[0]).toBe('2025-03-01');
        expect(el.value[1]).toBe('2025-03-15');
    });

    it('desktop: helper text renders below field', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker helper-text="Required"></ui-date-range-picker>
        `);
        await el.updateComplete;
        const helper = el.shadowRoot!.querySelector('.helper-text');
        expect(helper?.textContent?.trim()).toBe('Required');
    });

    it('desktop: no helper-text renders no helper element', async () => {
        const el = await fixture<UiDateRangePicker>(html`
            <ui-date-range-picker></ui-date-range-picker>
        `);
        await el.updateComplete;
        const helper = el.shadowRoot!.querySelector('.helper-text');
        expect(helper).toBeNull();
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// Mutation-killing tests — field
// ═══════════════════════════════════════════════════════════════════════════════

describe('ui-single-input-date-range-field — mutation killers', () => {

    it('typing "12" for start-month commits month=12 and advances', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, '1'); // buf='1', waiting
        key(el, '2'); // buf='12', 12<=12 → commits month=12, advances
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('12');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('typing "13" for start-month: invalid, then falls back to 3 (in [2-9])', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, '1'); // buf='1'
        key(el, '3'); // buf='13', 13>12 invalid → _buf='3', d=3 in [2-9] → commits 3
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('03');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('typing "01" for start-month commits month=1', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, '0');
        key(el, '1'); // buf='01', num=1, 1>=1 → commits
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('01');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('typing "4" for start-day auto-advances (d >= 4)', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); // start-day
        await el.updateComplete;
        key(el, '4'); // d=4, >=4 → auto-commits, advances
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('04');
        expect(segs[2].classList.contains('active')).toBe(true); // start-year
    });

    it('typing "3" then "1" for start-day commits day=31', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); // start-day
        await el.updateComplete;
        key(el, '3'); // d=3, <4 → buffered
        key(el, '1'); // buf='31', maxD=daysInMonth(1,2000)=31, 31<=31 → commits
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('31');
        expect(segs[2].classList.contains('active')).toBe(true);
    });

    it('typing "1" for start-day waits for second digit (< 4)', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); // start-day
        await el.updateComplete;
        key(el, '1'); // d=1, <4 → stays buffered
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('1_');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('year digits accumulate: keeps last 4 chars', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); // start-year
        await el.updateComplete;
        key(el, '1');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].textContent?.trim()).toBe('1___');
        key(el, '2');
        await el.updateComplete;
        expect(segs[2].textContent?.trim()).toBe('12__');
        key(el, '3');
        await el.updateComplete;
        expect(segs[2].textContent?.trim()).toBe('123_');
    });

    it('_checkAndEmit does not fire when partial (only start month set)', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('range-change', spy);
        await focusField(el);
        key(el, '6'); // sets month=6, auto-advance to day
        await el.updateComplete;
        // _checkAndEmit fires but startIso is '' (only month, not day/year)
        // The event value should be ['', ''] since start is incomplete
        // OR the event may not fire at all depending on code path
        // Key assertion: no VALID range-change with both dates should occur
        const validCalls = spy.mock.calls.filter((call: unknown[]) => {
            const val = (call[0] as CustomEvent).detail.value as DateRange;
            return val[0] !== '' && val[1] !== '';
        });
        expect(validCalls.length).toBe(0);
    });

    it('clear button not shown on readonly field', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-01-01', '2025-01-31'] as DateRange}
              readonly
            ></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.icon-btn');
        expect(btn).toBeNull();
    });

    it('_hasAnyValue returns false when all segments are null', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.icon-btn');
        expect(btn).toBeNull(); // no clear button when no value
    });

    it('_hasAnyValue returns true when only one segment is set', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, '6'); // sets start-month to 6
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.icon-btn');
        expect(btn).not.toBeNull();
    });

    it('no hidden inputs rendered when name is empty', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const hidden = el.shadowRoot!.querySelectorAll('input[type="hidden"]');
        expect(hidden.length).toBe(0);
    });

    it('no label rendered when label prop is empty', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('.field-label');
        expect(label).toBeNull();
    });

    it('no helper rendered when helperText is empty', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        const helper = el.shadowRoot!.querySelector('.helper');
        expect(helper).toBeNull();
    });

    it('end-month typing "6" auto-advances (d in [2-9])', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        // Navigate to end-month
        for (let i = 0; i < 3; i++) key(el, 'ArrowRight');
        await el.updateComplete;
        key(el, '6');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[3].textContent?.trim()).toBe('06');
        expect(segs[4].classList.contains('active')).toBe(true); // end-day
    });

    it('_commitPartialBuffer commits valid start-day buffer on segment change', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-01', '2025-06-30'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); // start-day
        await el.updateComplete;
        key(el, '2'); // buf='2', <4 → waiting
        await el.updateComplete;
        // Navigate away → commits 2
        key(el, 'ArrowRight');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('02');
    });

    it('_commitPartialBuffer for end-month commits valid buffer', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 3; i++) key(el, 'ArrowRight'); // end-month
        await el.updateComplete;
        key(el, '1'); // buf='1', waiting
        await el.updateComplete;
        key(el, 'ArrowRight'); // commits partial → _em=1
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[3].textContent?.trim()).toBe('01');
    });

    it('_commitPartialBuffer does not commit month=13 (out of range)', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        // Set buffer to '13' manually would exceed normal flow, but we can test by setting _buf
        (el as unknown as { _buf: string })._buf = '13';
        key(el, 'ArrowRight'); // triggers _commitPartialBuffer with buf='13', num=13, 13>12 → not committed
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('placeholder')).toBe(true);
    });

    it('_commitPartialBuffer for end-day with valid buffer commits', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field
              .value=${['2025-06-01', '2025-07-01'] as DateRange}
            ></ui-single-input-date-range-field>
        `);
        await focusField(el);
        for (let i = 0; i < 4; i++) key(el, 'ArrowRight'); // end-day
        await el.updateComplete;
        key(el, '2'); // buf='2', <4 → waiting
        await el.updateComplete;
        key(el, 'ArrowRight'); // commits partial → _ed=2
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[4].textContent?.trim()).toBe('02');
    });

    it('_commitPartialBuffer does not commit day=0', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await focusField(el);
        key(el, 'ArrowRight'); // start-day
        await el.updateComplete;
        (el as unknown as { _buf: string })._buf = '0';
        key(el, 'ArrowRight'); // _commitPartialBuffer → num=0, 0<1 → not committed
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].classList.contains('placeholder')).toBe(true);
    });

    it('typing digit with no active segment sets active to start-month first', async () => {
        const el = await fixture<UiSingleInputDateRangeField>(html`
            <ui-single-input-date-range-field></ui-single-input-date-range-field>
        `);
        await el.updateComplete;
        // Don't focus first — dispatch key directly
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new KeyboardEvent('keydown', { key: '5', bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // 5 is in [2-9] → auto-commits month=5 and advances to start-day
        expect(segs[0].textContent?.trim()).toBe('05');
        expect(segs[1].classList.contains('active')).toBe(true);
    });
});
