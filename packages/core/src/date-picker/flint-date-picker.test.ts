import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './flint-date-picker.js';
import type { FlintDatePicker, FlintDatePickerCalendar } from './flint-date-picker.js';

// ═══════════════════════════════════════════════════════════════════════
// flint-date-picker-calendar
// ═══════════════════════════════════════════════════════════════════════
describe('flint-date-picker-calendar', () => {

    it('is defined', () => {
        expect(document.createElement('flint-date-picker-calendar')).toBeInstanceOf(HTMLElement);
    });

    it('renders a 7-column day grid', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`<flint-date-picker-calendar></flint-date-picker-calendar>`);
        await el.updateComplete;
        const cells = el.shadowRoot!.querySelectorAll('.day-cell');
        expect(cells.length).toBe(42); // 6 rows × 7 cols
    });

    it('renders 7 day-of-week headers', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`<flint-date-picker-calendar></flint-date-picker-calendar>`);
        await el.updateComplete;
        const headers = el.shadowRoot!.querySelectorAll('.dow-cell');
        expect(headers.length).toBe(7);
    });

    it('marks the selected date with .selected class', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-06-15"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        const selected = el.shadowRoot!.querySelectorAll('.selected');
        expect(selected.length).toBe(1);
        expect((selected[0] as HTMLElement).textContent?.trim()).toBe('15');
    });

    it('fires flint-date-picker-select when a day cell is clicked', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-06-01"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        // Click the first current-month day
        const currentMonthDays = el.shadowRoot!.querySelectorAll('.day-cell:not(.other-month)');
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-select', spy);
        (currentMonthDays[0] as HTMLElement).click();
        expect(spy).toHaveBeenCalledOnce();
    });

    it('flint-date-picker-select event detail contains ISO value', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-06-01"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        setTimeout(() => currentDays[0].click());
        const event = await oneEvent(el, 'flint-date-picker-select') as CustomEvent;
        expect(event.detail.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('disabled day cells cannot be clicked', async () => {
        const today = new Date();
        const nextYear = today.getFullYear() + 1;
        // Set min to far future — all current month days become disabled
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2020-01-01" min="${nextYear}-01-01"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-select', spy);
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        currentDays[0].click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('navigates to previous month on prev button click', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-06-01"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        const prevBtn = el.shadowRoot!.querySelector('.nav-btn') as HTMLButtonElement;
        prevBtn.click();
        await el.updateComplete;
        const header = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        expect(header.textContent?.trim()).toContain('May');
    });

    it('navigates to next month on next button click', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-06-01"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        const buttons = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.nav-btn');
        buttons[1].click(); // second nav btn = next
        await el.updateComplete;
        const header = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        expect(header.textContent?.trim()).toContain('July');
    });

    it('switches to month view when header label is clicked', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`<flint-date-picker-calendar></flint-date-picker-calendar>`);
        await el.updateComplete;
        const headerLabel = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        headerLabel.click();
        await el.updateComplete;
        const monthBtns = el.shadowRoot!.querySelectorAll('.month-btn');
        expect(monthBtns.length).toBe(12);
    });

    it('navigateTo() syncs the view to the given date', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`<flint-date-picker-calendar></flint-date-picker-calendar>`);
        el.navigateTo('2030-11-01');
        await el.updateComplete;
        const header = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        expect(header.textContent?.trim()).toContain('November');
        expect(header.textContent?.trim()).toContain('2030');
    });
});

// ═══════════════════════════════════════════════════════════════════════
// flint-date-picker
// ═══════════════════════════════════════════════════════════════════════
describe('flint-date-picker', () => {

    it('is defined', () => {
        expect(document.createElement('flint-date-picker')).toBeInstanceOf(HTMLElement);
    });

    it('renders a text input field (desktop variant)', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input');
        expect(input).not.toBeNull();
    });

    it('displays formatted date in the input field', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker value="2025-07-04"></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input');
        expect(input?.value).toBe('07/04/2025');
    });

    it('empty value shows empty input', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input');
        expect(input?.value).toBe('');
    });

    it('renders label above the field', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker label="Departure"></flint-date-picker>`);
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('.field-label');
        expect(label?.textContent?.trim()).toBe('Departure');
    });

    it('popover is closed by default', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker></flint-date-picker>`);
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('open')).toBe(false);
    });

    it('opens popover on calendar icon click', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker></flint-date-picker>`);
        await el.updateComplete;
        const iconBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.calendar-icon-btn');
        iconBtn!.click();
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('open')).toBe(true);
    });

    it('fires change event when a day is selected (desktop)', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker value="2025-06-01"></flint-date-picker>`);
        await el.updateComplete;

        // Open the popover
        el.shadowRoot!.querySelector<HTMLButtonElement>('.calendar-icon-btn')!.click();
        await el.updateComplete;

        // Click a day in the embedded calendar
        const cal = el.shadowRoot!.querySelector('flint-date-picker-calendar') as FlintDatePickerCalendar;
        await cal.updateComplete;

        setTimeout(() => {
            const days = cal.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month):not(.disabled)');
            days[9].click(); // pick 10th of June
        });
        const event = await oneEvent(el, 'flint-date-picker-change') as CustomEvent;
        expect(event.detail.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('input is disabled when disabled prop is set', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker disabled></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input');
        expect(input?.disabled).toBe(true);
    });

    it('reflects disabled attribute on host', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker disabled></flint-date-picker>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('renders helper text', async () => {
        const el = await fixture<FlintDatePicker>(html`
            <flint-date-picker helper-text="Select any date"></flint-date-picker>
        `);
        await el.updateComplete;
        const helper = el.shadowRoot!.querySelector('.helper-text');
        expect(helper?.textContent?.trim()).toBe('Select any date');
    });

    it('has error attribute reflected on host', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker error></flint-date-picker>`);
        expect(el.hasAttribute('error')).toBe(true);
    });

    it('renders static variant without an input field', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker variant="static"></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input');
        expect(input).toBeNull();
        const cal = el.shadowRoot!.querySelector('flint-date-picker-calendar');
        expect(cal).not.toBeNull();
    });

    it('fires change on static calendar select', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker variant="static" value="2025-03-01"></flint-date-picker>`);
        await el.updateComplete;

        const cal = el.shadowRoot!.querySelector('flint-date-picker-calendar') as FlintDatePickerCalendar;
        await cal.updateComplete;

        setTimeout(() => {
            const days = cal.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month):not(.disabled)');
            days[5].click();
        });
        const event = await oneEvent(el, 'flint-date-picker-change') as CustomEvent;
        expect(event.detail.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('manual input of a valid date fires change', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        input.value = '07/04/2028';
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-change', spy);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('2028-07-04');
    });

    it('manual input before min constraint is rejected', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker min="2025-06-01"></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        input.value = '01/01/2025'; // before min
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-change', spy);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });

    it('readonly picker opens popover on input focus', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker readonly></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        input.dispatchEvent(new Event('focus', { bubbles: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('open')).toBe(true);
    });
});

// ═══════════════════════════════════════════════════════════════════════
// flint-date-picker-calendar — view transitions
// ═══════════════════════════════════════════════════════════════════════
describe('flint-date-picker-calendar view transitions', () => {

    it('selecting a month in month view returns to day view', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-06-01"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        // Open month view
        (el.shadowRoot!.querySelector('.header-label') as HTMLElement).click();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.month-btn').length).toBe(12);
        // Click January (index 0)
        (el.shadowRoot!.querySelector('.month-btn') as HTMLElement).click();
        await el.updateComplete;
        // Should be back to day view with 42 cells
        expect(el.shadowRoot!.querySelectorAll('.day-cell').length).toBe(42);
    });

    it('clicking year label in month view opens year view', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-06-01"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        // Go to month view first
        (el.shadowRoot!.querySelector('.header-label') as HTMLElement).click();
        await el.updateComplete;
        // In month view, click the year label to open year view
        (el.shadowRoot!.querySelector('.header-label') as HTMLElement).click();
        await el.updateComplete;
        const yearBtns = el.shadowRoot!.querySelectorAll('.year-btn');
        expect(yearBtns.length).toBe(201);
    });

    it('selecting a year in year view returns to month view', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-06-01"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        // Go to month view then year view
        (el.shadowRoot!.querySelector('.header-label') as HTMLElement).click();
        await el.updateComplete;
        (el.shadowRoot!.querySelector('.header-label') as HTMLElement).click();
        await el.updateComplete;
        // Click the first year button
        (el.shadowRoot!.querySelector('.year-btn') as HTMLElement).click();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.month-btn').length).toBe(12);
    });
});

// ═══════════════════════════════════════════════════════════════════════
// flint-date-picker-calendar — full coverage
// ═══════════════════════════════════════════════════════════════════════
describe('flint-date-picker-calendar — full coverage', () => {

    // isoToDate null guard (line 20): y=0 is falsy → returns null
    it('navigateTo with invalid ISO does not update the view', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-06-01"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        const before = el.shadowRoot!.querySelector('.header-label')!.textContent?.trim();
        el.navigateTo('not-a-valid-date');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.header-label')!.textContent?.trim()).toBe(before);
    });

    // connectedCallback if(d) false branch (line 132): value parses to null
    it('connectedCallback with malformed value string does not crash', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="0-0-0"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.day-cell').length).toBe(42);
    });

    // maxDate branch for leading/trailing days (line 67):
    // March 2025 starts on Saturday → 6 leading days from Feb; max="2025-02-25" makes Feb 26-28 disabled
    it('cells beyond max date are disabled (covers leading-day maxDate branch)', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-03-01" max="2025-02-25"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        const disabledCells = el.shadowRoot!.querySelectorAll('.day-cell.disabled');
        expect(disabledCells.length).toBeGreaterThan(0);
    });

    // _prevMonth when month === 0 (line 143): January → December
    it('previous month from January wraps to December and decrements year', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-01-15"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        (el.shadowRoot!.querySelector('.nav-btn') as HTMLButtonElement).click();
        await el.updateComplete;
        const header = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        expect(header.textContent).toContain('December');
        expect(header.textContent).toContain('2024');
    });

    // _nextMonth when month === 11 (line 148): December → January
    it('next month from December wraps to January and increments year', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-12-15"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        const navBtns = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.nav-btn');
        navBtns[1].click();
        await el.updateComplete;
        const header = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        expect(header.textContent).toContain('January');
        expect(header.textContent).toContain('2026');
    });

    // Enter keydown on header-label (line 174)
    it('Enter key on header-label switches to month view', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`<flint-date-picker-calendar></flint-date-picker-calendar>`);
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        label.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.month-btn').length).toBe(12);
    });

    it('non-Enter key on header-label does not switch view', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`<flint-date-picker-calendar></flint-date-picker-calendar>`);
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        label.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.day-cell').length).toBe(42);
    });

    // Month-view previous/next year buttons (lines 205, 207)
    it('previous year button in month view decrements year', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-06-01"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        (el.shadowRoot!.querySelector('.header-label') as HTMLElement).click();
        await el.updateComplete;
        (el.shadowRoot!.querySelector('.nav-btn') as HTMLButtonElement).click();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.header-label')!.textContent?.trim()).toBe('2024');
    });

    it('next year button in month view increments year', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`
            <flint-date-picker-calendar value="2025-06-01"></flint-date-picker-calendar>
        `);
        await el.updateComplete;
        (el.shadowRoot!.querySelector('.header-label') as HTMLElement).click();
        await el.updateComplete;
        const navBtns = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.nav-btn');
        navBtns[1].click();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.header-label')!.textContent?.trim()).toBe('2026');
    });

    // _selectDay: this.disabled branch (in addition to cell.isDisabled already tested)
    it('calendar disabled prop prevents flint-date-picker-select even on non-disabled cells', async () => {
        const el = await fixture<FlintDatePickerCalendar>(html`<flint-date-picker-calendar disabled></flint-date-picker-calendar>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-select', spy);
        (el.shadowRoot!.querySelector<HTMLElement>('.day-cell:not(.other-month)'))?.click();
        expect(spy).not.toHaveBeenCalled();
    });
});

// ═══════════════════════════════════════════════════════════════════════
// flint-date-picker — full coverage
// ═══════════════════════════════════════════════════════════════════════
describe('flint-date-picker — full coverage', () => {

    // label absent branch (line 372): empty label renders nothing
    it('renders no label element when label prop is empty', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker label=""></flint-date-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.field-label')).toBeNull();
    });

    // aria-label fallback (line 383): '' || 'Date' = 'Date'
    it('input aria-label falls back to "Date" when label is empty', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker label=""></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        expect(input.getAttribute('aria-label')).toBe('Date');
    });

    // _openPicker: _open already true (line 308)
    it('clicking calendar icon when already open does not close the popover', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker></flint-date-picker>`);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.calendar-icon-btn')!;
        btn.click(); await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(true);
        btn.click(); await el.updateComplete;
        // Guard returns early — popover stays open
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(true);
    });

    // _openPicker: disabled (line 308)
    it('clicking calendar icon when disabled does not open popover', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker disabled></flint-date-picker>`);
        await el.updateComplete;
        el.shadowRoot!.querySelector<HTMLButtonElement>('.calendar-icon-btn')!.click();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open') ?? false).toBe(false);
    });

    // mobile variant render (lines 326-329)
    it('mobile variant renders flint-dialog instead of .popover', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker variant="mobile"></flint-date-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('flint-dialog')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.popover')).toBeNull();
    });

    it('mobile variant: selecting a day stages value without firing change event', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker variant="mobile" value="2025-06-01"></flint-date-picker>`);
        await el.updateComplete;
        el.shadowRoot!.querySelector<HTMLButtonElement>('.calendar-icon-btn')!.click();
        await el.updateComplete;
        const cal = el.shadowRoot!.querySelector('flint-date-picker-calendar') as FlintDatePickerCalendar;
        await cal.updateComplete;
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-change', spy);
        const days = cal.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month):not(.disabled)');
        days[9].click();
        await el.updateComplete;
        // No change event until OK is clicked
        expect(spy).not.toHaveBeenCalled();
    });

    it('mobile variant: OK button commits staged value and fires change', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker variant="mobile" value="2025-06-01"></flint-date-picker>`);
        await el.updateComplete;
        el.shadowRoot!.querySelector<HTMLButtonElement>('.calendar-icon-btn')!.click();
        await el.updateComplete;
        const cal = el.shadowRoot!.querySelector('flint-date-picker-calendar') as FlintDatePickerCalendar;
        await cal.updateComplete;
        // Stage day 10 (index 9)
        const days = cal.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month):not(.disabled)');
        days[9].click();
        await el.updateComplete;
        setTimeout(() => {
            (el.shadowRoot!.querySelector('.action-btn.ok') as HTMLButtonElement).click();
        });
        const event = await oneEvent(el, 'flint-date-picker-change') as CustomEvent;
        expect(event.detail.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('mobile variant: Cancel button closes without committing', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker variant="mobile" value="2025-06-01"></flint-date-picker>`);
        await el.updateComplete;
        el.shadowRoot!.querySelector<HTMLButtonElement>('.calendar-icon-btn')!.click();
        await el.updateComplete;
        const cal = el.shadowRoot!.querySelector('flint-date-picker-calendar') as FlintDatePickerCalendar;
        await cal.updateComplete;
        // Stage a different day
        const days = cal.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month):not(.disabled)');
        days[9].click();
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-change', spy);
        (el.shadowRoot!.querySelector('.action-btn.cancel') as HTMLButtonElement).click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        expect(el.value).toBe('2025-06-01');
    });

    // _handleFieldInput: readonly guard (line 356)
    it('field input event when readonly does not fire change', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker readonly></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        input.value = '07/04/2028';
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-change', spy);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });

    // _handleFieldInput: invalid Date (line 362): 99/99/2025 matches regex but NaN
    it('invalid date value in input does not fire change', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        input.value = '99/99/2025';
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-change', spy);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });

    // _handleFieldInput: max constraint (line 363)
    it('manual input after max constraint is rejected', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker max="2025-06-30"></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        input.value = '07/01/2025'; // 2025-07-01 > max 2025-06-30
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-change', spy);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });

    // _commit: same value no-op (line 337)
    it('selecting the already-selected date closes picker without firing change', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker value="2025-06-10"></flint-date-picker>`);
        await el.updateComplete;
        el.shadowRoot!.querySelector<HTMLButtonElement>('.calendar-icon-btn')!.click();
        await el.updateComplete;
        const cal = el.shadowRoot!.querySelector('flint-date-picker-calendar') as FlintDatePickerCalendar;
        await cal.updateComplete;
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-change', spy);
        const selectedCell = cal.shadowRoot!.querySelector<HTMLElement>('.day-cell.selected');
        selectedCell?.click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        // Picker closes even on no-op
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(false);
    });

    // auto variant: pointer coarse → mobile (lines 302-303)
    it('auto variant resolves to mobile when pointer is coarse', async () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true, configurable: true,
            value: (query: string) => ({
                matches: query === '(pointer: coarse)',
                media: query, onchange: null,
                addListener: vi.fn(), removeListener: vi.fn(),
                addEventListener: vi.fn(), removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            }),
        });
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker variant="auto"></flint-date-picker>`);
        await el.updateComplete;
        const hasDialog = el.shadowRoot!.querySelector('flint-dialog') !== null;
        Object.defineProperty(window, 'matchMedia', { writable: true, configurable: true, value: undefined });
        expect(hasDialog).toBe(true);
    });

    // Line 347 ||: _pendingValue falsy → uses this.value fallback
    it('mobile OK with no staged value commits existing value (covers || right side)', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker variant="mobile" value="2025-06-15"></flint-date-picker>`);
        await el.updateComplete;
        // Open picker: _pendingValue = '2025-06-15' (truthy so far — we need it empty)
        // Manually set pendingValue to '' to test the || fallback
        (el as unknown as Record<string, unknown>)['_pendingValue'] = '';
        (el as unknown as Record<string, unknown>)['_open'] = true;
        await el.updateComplete;
        // Click OK: _commit('' || '2025-06-15') → '' is falsy, uses this.value
        // iso === this.value → no change event, just closes
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-change', spy);
        (el.shadowRoot!.querySelector('.action-btn.ok') as HTMLButtonElement).click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    // Line 360 if(m) false: input doesn't match MM/DD/YYYY regex
    it('partial input that does not match date regex does not fire change', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        input.value = '07/04'; // too short, won't match /^(\d{2})\/(\d{2})\/(\d{4})$/
        const spy = vi.fn();
        el.addEventListener('flint-date-picker-change', spy);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });

    // Line 387 focus handler false branch: focus on non-readonly input does not open picker
    it('focus on non-readonly input does not open picker', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker></flint-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        input.dispatchEvent(new Event('focus', { bubbles: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('open')).toBe(false);
    });

    // ── Hoist ───────────────────────────────────────────────────────

    it('hoist defaults to false', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker></flint-date-picker>`);
        expect(el.hoist).toBe(false);
    });

    it('adds hoisted class to popover when hoist is true', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker hoist></flint-date-picker>`);
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('hoisted')).toBe(true);
    });

    it('does not add hoisted class when hoist is false', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker></flint-date-picker>`);
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('hoisted')).toBe(false);
    });

    it('cleans up hoist on popover close', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker hoist></flint-date-picker>`);
        await el.updateComplete;
        // Open
        el.shadowRoot!.querySelector<HTMLButtonElement>('.calendar-icon-btn')!.click();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(true);
        // Close via click-away
        el.shadowRoot!.querySelector<HTMLElement>('.click-away')!.click();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.popover')?.classList.contains('open')).toBe(false);
    });

    it('hoist does not apply to static variant', async () => {
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker variant="static" hoist></flint-date-picker>`);
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        // Static variant has no popover
        expect(popover).toBeNull();
    });

    // auto variant: pointer fine → desktop
    it('auto variant resolves to desktop when pointer is fine', async () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true, configurable: true,
            value: (query: string) => ({
                matches: false, // pointer: coarse = false
                media: query, onchange: null,
                addListener: vi.fn(), removeListener: vi.fn(),
                addEventListener: vi.fn(), removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            }),
        });
        const el = await fixture<FlintDatePicker>(html`<flint-date-picker variant="auto"></flint-date-picker>`);
        await el.updateComplete;
        const hasPopover = el.shadowRoot!.querySelector('.popover') !== null;
        Object.defineProperty(window, 'matchMedia', { writable: true, configurable: true, value: undefined });
        expect(hasPopover).toBe(true);
    });
});
