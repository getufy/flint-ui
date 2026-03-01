import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-date-range-picker.js';
import './ui-date-range-calendar.js';
import './ui-single-input-date-range-field.js';
import type { UiDateRangePicker } from './ui-date-range-picker.js';
import type { UiDateRangeCalendar } from './ui-date-range-calendar.js';
import type { UiSingleInputDateRangeField } from './ui-single-input-date-range-field.js';
import type { DateRange } from './date-range-helpers.js';
import { isoToDate, dateToIso, isBetween, sameDay } from './date-range-helpers.js';

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
