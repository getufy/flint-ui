import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-date-picker.js';
import type { UiDatePicker, UiDatePickerCalendar } from './ui-date-picker.js';

// ═══════════════════════════════════════════════════════════════════════
// ui-date-picker-calendar
// ═══════════════════════════════════════════════════════════════════════
describe('ui-date-picker-calendar', () => {

    it('is defined', () => {
        expect(document.createElement('ui-date-picker-calendar')).toBeInstanceOf(HTMLElement);
    });

    it('renders a 7-column day grid', async () => {
        const el = await fixture<UiDatePickerCalendar>(html`<ui-date-picker-calendar></ui-date-picker-calendar>`);
        await el.updateComplete;
        const cells = el.shadowRoot!.querySelectorAll('.day-cell');
        expect(cells.length).toBe(42); // 6 rows × 7 cols
    });

    it('renders 7 day-of-week headers', async () => {
        const el = await fixture<UiDatePickerCalendar>(html`<ui-date-picker-calendar></ui-date-picker-calendar>`);
        await el.updateComplete;
        const headers = el.shadowRoot!.querySelectorAll('.dow-cell');
        expect(headers.length).toBe(7);
    });

    it('marks the selected date with .selected class', async () => {
        const el = await fixture<UiDatePickerCalendar>(html`
            <ui-date-picker-calendar value="2025-06-15"></ui-date-picker-calendar>
        `);
        await el.updateComplete;
        const selected = el.shadowRoot!.querySelectorAll('.selected');
        expect(selected.length).toBe(1);
        expect((selected[0] as HTMLElement).textContent?.trim()).toBe('15');
    });

    it('fires date-select when a day cell is clicked', async () => {
        const el = await fixture<UiDatePickerCalendar>(html`
            <ui-date-picker-calendar value="2025-06-01"></ui-date-picker-calendar>
        `);
        await el.updateComplete;
        // Click the first current-month day
        const currentMonthDays = el.shadowRoot!.querySelectorAll('.day-cell:not(.other-month)');
        const spy = vi.fn();
        el.addEventListener('date-select', spy);
        (currentMonthDays[0] as HTMLElement).click();
        expect(spy).toHaveBeenCalledOnce();
    });

    it('date-select event detail contains ISO value', async () => {
        const el = await fixture<UiDatePickerCalendar>(html`
            <ui-date-picker-calendar value="2025-06-01"></ui-date-picker-calendar>
        `);
        await el.updateComplete;
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        setTimeout(() => currentDays[0].click());
        const event = await oneEvent(el, 'date-select') as CustomEvent;
        expect(event.detail.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('disabled day cells cannot be clicked', async () => {
        const today = new Date();
        const nextYear = today.getFullYear() + 1;
        // Set min to far future — all current month days become disabled
        const el = await fixture<UiDatePickerCalendar>(html`
            <ui-date-picker-calendar value="2020-01-01" min="${nextYear}-01-01"></ui-date-picker-calendar>
        `);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('date-select', spy);
        const currentDays = el.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month)');
        currentDays[0].click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('navigates to previous month on prev button click', async () => {
        const el = await fixture<UiDatePickerCalendar>(html`
            <ui-date-picker-calendar value="2025-06-01"></ui-date-picker-calendar>
        `);
        await el.updateComplete;
        const prevBtn = el.shadowRoot!.querySelector('.nav-btn') as HTMLButtonElement;
        prevBtn.click();
        await el.updateComplete;
        const header = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        expect(header.textContent?.trim()).toContain('May');
    });

    it('navigates to next month on next button click', async () => {
        const el = await fixture<UiDatePickerCalendar>(html`
            <ui-date-picker-calendar value="2025-06-01"></ui-date-picker-calendar>
        `);
        await el.updateComplete;
        const buttons = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.nav-btn');
        buttons[1].click(); // second nav btn = next
        await el.updateComplete;
        const header = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        expect(header.textContent?.trim()).toContain('July');
    });

    it('switches to month view when header label is clicked', async () => {
        const el = await fixture<UiDatePickerCalendar>(html`<ui-date-picker-calendar></ui-date-picker-calendar>`);
        await el.updateComplete;
        const headerLabel = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        headerLabel.click();
        await el.updateComplete;
        const monthBtns = el.shadowRoot!.querySelectorAll('.month-btn');
        expect(monthBtns.length).toBe(12);
    });

    it('navigateTo() syncs the view to the given date', async () => {
        const el = await fixture<UiDatePickerCalendar>(html`<ui-date-picker-calendar></ui-date-picker-calendar>`);
        el.navigateTo('2030-11-01');
        await el.updateComplete;
        const header = el.shadowRoot!.querySelector('.header-label') as HTMLElement;
        expect(header.textContent?.trim()).toContain('November');
        expect(header.textContent?.trim()).toContain('2030');
    });
});

// ═══════════════════════════════════════════════════════════════════════
// ui-date-picker
// ═══════════════════════════════════════════════════════════════════════
describe('ui-date-picker', () => {

    it('is defined', () => {
        expect(document.createElement('ui-date-picker')).toBeInstanceOf(HTMLElement);
    });

    it('renders a text input field (desktop variant)', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker></ui-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input');
        expect(input).not.toBeNull();
    });

    it('displays formatted date in the input field', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker value="2025-07-04"></ui-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input');
        expect(input?.value).toBe('07/04/2025');
    });

    it('empty value shows empty input', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker></ui-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input');
        expect(input?.value).toBe('');
    });

    it('renders label above the field', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker label="Departure"></ui-date-picker>`);
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('.field-label');
        expect(label?.textContent?.trim()).toBe('Departure');
    });

    it('popover is closed by default', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker></ui-date-picker>`);
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('open')).toBe(false);
    });

    it('opens popover on calendar icon click', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker></ui-date-picker>`);
        await el.updateComplete;
        const iconBtn = el.shadowRoot!.querySelector<HTMLButtonElement>('.calendar-icon-btn');
        iconBtn!.click();
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('open')).toBe(true);
    });

    it('fires change event when a day is selected (desktop)', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker value="2025-06-01"></ui-date-picker>`);
        await el.updateComplete;

        // Open the popover
        el.shadowRoot!.querySelector<HTMLButtonElement>('.calendar-icon-btn')!.click();
        await el.updateComplete;

        // Click a day in the embedded calendar
        const cal = el.shadowRoot!.querySelector('ui-date-picker-calendar') as UiDatePickerCalendar;
        await cal.updateComplete;

        setTimeout(() => {
            const days = cal.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month):not(.disabled)');
            days[9].click(); // pick 10th of June
        });
        const event = await oneEvent(el, 'change') as CustomEvent;
        expect(event.detail.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('input is disabled when disabled prop is set', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker disabled></ui-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input');
        expect(input?.disabled).toBe(true);
    });

    it('reflects disabled attribute on host', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker disabled></ui-date-picker>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('renders helper text', async () => {
        const el = await fixture<UiDatePicker>(html`
            <ui-date-picker helper-text="Select any date"></ui-date-picker>
        `);
        await el.updateComplete;
        const helper = el.shadowRoot!.querySelector('.helper-text');
        expect(helper?.textContent?.trim()).toBe('Select any date');
    });

    it('has error attribute reflected on host', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker error></ui-date-picker>`);
        expect(el.hasAttribute('error')).toBe(true);
    });

    it('renders static variant without an input field', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker variant="static"></ui-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input');
        expect(input).toBeNull();
        const cal = el.shadowRoot!.querySelector('ui-date-picker-calendar');
        expect(cal).not.toBeNull();
    });

    it('fires change on static calendar select', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker variant="static" value="2025-03-01"></ui-date-picker>`);
        await el.updateComplete;

        const cal = el.shadowRoot!.querySelector('ui-date-picker-calendar') as UiDatePickerCalendar;
        await cal.updateComplete;

        setTimeout(() => {
            const days = cal.shadowRoot!.querySelectorAll<HTMLElement>('.day-cell:not(.other-month):not(.disabled)');
            days[5].click();
        });
        const event = await oneEvent(el, 'change') as CustomEvent;
        expect(event.detail.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('manual input of a valid date fires change', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker></ui-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        input.value = '07/04/2028';
        const spy = vi.fn();
        el.addEventListener('change', spy);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('2028-07-04');
    });

    it('manual input before min constraint is rejected', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker min="2025-06-01"></ui-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        input.value = '01/01/2025'; // before min
        const spy = vi.fn();
        el.addEventListener('change', spy);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });

    it('readonly picker opens popover on input focus', async () => {
        const el = await fixture<UiDatePicker>(html`<ui-date-picker readonly></ui-date-picker>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
        input.dispatchEvent(new Event('focus', { bubbles: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.classList.contains('open')).toBe(true);
    });
});

// ═══════════════════════════════════════════════════════════════════════
// ui-date-picker-calendar — view transitions
// ═══════════════════════════════════════════════════════════════════════
describe('ui-date-picker-calendar view transitions', () => {

    it('selecting a month in month view returns to day view', async () => {
        const el = await fixture<UiDatePickerCalendar>(html`
            <ui-date-picker-calendar value="2025-06-01"></ui-date-picker-calendar>
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
        const el = await fixture<UiDatePickerCalendar>(html`
            <ui-date-picker-calendar value="2025-06-01"></ui-date-picker-calendar>
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
        const el = await fixture<UiDatePickerCalendar>(html`
            <ui-date-picker-calendar value="2025-06-01"></ui-date-picker-calendar>
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
