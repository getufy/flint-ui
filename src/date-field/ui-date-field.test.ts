import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-date-field.js';
import type { UiDateField } from './ui-date-field.js';

// Helper: dispatch a keydown event on the segments div inside the component
function key(el: UiDateField, k: string, opts: KeyboardEventInit = {}) {
    const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
    segments.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, ...opts }));
}

// Helper: focus and get segments wrapper
async function focus(el: UiDateField) {
    const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
    segments.dispatchEvent(new FocusEvent('focus'));
    await el.updateComplete;
    return segments;
}

// ═══════════════════════════════════════════════════════════════════════
// Element definition
// ═══════════════════════════════════════════════════════════════════════
describe('ui-date-field', () => {

    it('is defined', () => {
        expect(document.createElement('ui-date-field')).toBeInstanceOf(HTMLElement);
    });

    // ── Default render ───────────────────────────────────────────────────
    it('renders three segments', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        const segments = el.shadowRoot!.querySelectorAll('.segment');
        expect(segments.length).toBe(3); // month, day, year
    });

    it('renders two "/" separators', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        const seps = el.shadowRoot!.querySelectorAll('.separator');
        expect(seps.length).toBe(2);
    });

    it('shows placeholder text when no value', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('MM');
        expect(segs[1].textContent?.trim()).toBe('DD');
        expect(segs[2].textContent?.trim()).toBe('YYYY');
    });

    it('renders label', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field label="Birthday"></ui-date-field>`);
        await el.updateComplete;
        const label = el.shadowRoot!.querySelector('.field-label');
        expect(label?.textContent?.trim()).toBe('Birthday');
    });

    it('renders helper text', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field helper-text="MM/DD/YYYY"></ui-date-field>`);
        await el.updateComplete;
        const helper = el.shadowRoot!.querySelector('.helper');
        expect(helper?.textContent?.trim()).toBe('MM/DD/YYYY');
    });

    // ── Controlled value ─────────────────────────────────────────────────
    it('parses controlled value into segments', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-07-04"></ui-date-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('07'); // month
        expect(segs[1].textContent?.trim()).toBe('04'); // day
        expect(segs[2].textContent?.trim()).toBe('2025'); // year
    });

    it('updates segments when value prop changes', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2020-01-01"></ui-date-field>`);
        await el.updateComplete;
        // Set new value and wait for the new update cycle it triggers
        el.value = '2030-12-25';
        // Await twice: first for the property change to queue an update,
        // then for that update to complete
        await el.updateComplete;
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('12');
        expect(segs[1].textContent?.trim()).toBe('25');
        expect(segs[2].textContent?.trim()).toBe('2030');
    });


    // ── Attributes reflected ─────────────────────────────────────────────
    it('reflects disabled attribute', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field disabled></ui-date-field>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects readonly attribute', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field readonly></ui-date-field>`);
        expect(el.hasAttribute('readonly')).toBe(true);
    });

    it('reflects error attribute', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field error></ui-date-field>`);
        expect(el.hasAttribute('error')).toBe(true);
    });

    // ── Focus ────────────────────────────────────────────────────────────
    it('sets tabindex=0 on segments when enabled', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        const segments = el.shadowRoot!.querySelector('.segments');
        expect(segments?.getAttribute('tabindex')).toBe('0');
    });

    it('sets tabindex=-1 on segments when disabled', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field disabled></ui-date-field>`);
        await el.updateComplete;
        const segments = el.shadowRoot!.querySelector('.segments');
        expect(segments?.getAttribute('tabindex')).toBe('-1');
    });

    // ── Keyboard: digit typing ────────────────────────────────────────────
    it('activates month segment on focus', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true); // month is active
    });

    it('typing 5 sets month=5 and advances to day', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, '5');
        await el.updateComplete;
        // month should be filled, day now active
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('05');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('typing 1 then 2 sets month=12 and advances to day', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, '1');
        await el.updateComplete;
        key(el, '2');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('12');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('typing 7 in day segment auto-advances to year', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        // Set month first (type 3 → month=3, advance to day)
        key(el, '3');
        await el.updateComplete;
        // Now in day segment — type 7
        key(el, '7');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('07');
        expect(segs[2].classList.contains('active')).toBe(true); // now on year
    });

    it('typing 4 digits sets year and fires change', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // Set month=3
        key(el, '3');
        await el.updateComplete;
        // Set day=7
        key(el, '7');
        await el.updateComplete;
        // Set year=2025
        key(el, '2'); key(el, '0'); key(el, '2'); key(el, '5');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('2025-03-07');
    });

    // ── Keyboard: navigation ─────────────────────────────────────────────
    it('ArrowRight moves from month to day', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el); // activates month
        key(el, 'ArrowRight');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('ArrowLeft moves from day back to month', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); // → day
        await el.updateComplete;
        key(el, 'ArrowLeft'); // ← month
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
    });

    // ── Keyboard: increment/decrement ────────────────────────────────────
    it('ArrowUp increments month', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await focus(el); // focuses month
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('07');
    });

    it('ArrowDown decrements month', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowDown');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('05');
    });

    // ── Keyboard: clear ──────────────────────────────────────────────────
    it('Backspace clears the active segment', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await focus(el); // month active
        key(el, 'Backspace');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('placeholder')).toBe(true);
        expect(segs[0].textContent?.trim()).toBe('MM');
    });

    it('Escape clears all segments', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await focus(el);
        key(el, 'Escape');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('MM');
        expect(segs[1].textContent?.trim()).toBe('DD');
        expect(segs[2].textContent?.trim()).toBe('YYYY');
    });

    // ── Public API ───────────────────────────────────────────────────────
    it('clear() method removes all segment values', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-03-10"></ui-date-field>`);
        await el.updateComplete;
        el.clear();
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('MM');
    });

    it('clear() fires the clear event', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-03-10"></ui-date-field>`);
        await el.updateComplete;
        setTimeout(() => el.clear());
        const event = await oneEvent(el, 'clear');
        expect(event).toBeDefined();
    });

    // ── Disabled guard ───────────────────────────────────────────────────
    it('disabled field does not fire change on keyboard input', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field disabled></ui-date-field>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        key(el, '5');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    // ── Form participation (Form-Associated Custom Elements) ──────────────
    it('is a form-associated element', () => {
        // static formAssociated = true opts the element into HTMLFormElement participation
        const cls = customElements.get('ui-date-field') as unknown as { formAssociated: boolean } | undefined;
        expect(cls?.formAssociated).toBe(true);
    });

    it('reflects name attribute to the DOM (required for form data collection)', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field name="birthday"></ui-date-field>`);
        await el.updateComplete;
        expect(el.getAttribute('name')).toBe('birthday');
    });

    it('name attribute stays in sync when the property is updated', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field name="start"></ui-date-field>`);
        await el.updateComplete;
        el.name = 'end';
        await el.updateComplete;
        expect(el.getAttribute('name')).toBe('end');
    });

    // ── Tab navigation ────────────────────────────────────────────────────
    it('Tab moves from month to day', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'Tab');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    it('Tab moves from day to year', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'Tab');
        await el.updateComplete;
        key(el, 'Tab');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].classList.contains('active')).toBe(true);
    });

    it('Shift+Tab moves from day back to month', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'Tab');
        await el.updateComplete;
        key(el, 'Tab', { shiftKey: true });
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
    });

    it('Tab on last segment does not preventDefault (allows focus out)', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        // advance to year
        key(el, 'Tab'); key(el, 'Tab');
        await el.updateComplete;
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        const evt = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        segments.dispatchEvent(evt);
        expect(evt.defaultPrevented).toBe(false);
    });

    it('Shift+Tab on first segment does not preventDefault (allows focus out)', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el); // month is active
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        const evt = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
        segments.dispatchEvent(evt);
        expect(evt.defaultPrevented).toBe(false);
    });

    // ── '/' key ───────────────────────────────────────────────────────────
    it('/ key advances from month to day', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, '/');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].classList.contains('active')).toBe(true);
    });

    // ── Delete key ────────────────────────────────────────────────────────
    it('Delete clears the active segment', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await focus(el);
        key(el, 'Delete');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('placeholder')).toBe(true);
        expect(segs[0].textContent?.trim()).toBe('MM');
    });

    // ── Readonly guard ────────────────────────────────────────────────────
    it('readonly field does not fire change on digit input', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field readonly></ui-date-field>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        key(el, '5');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('readonly field does not change value on ArrowUp', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15" readonly></ui-date-field>`);
        await el.updateComplete;
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('06'); // unchanged
    });

    // ── Blur commits partial buffer ───────────────────────────────────────
    it('blur commits single-digit month buffer', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, '1'); // ambiguous — stays in buffer
        await el.updateComplete;
        // simulate blur out of component (relatedTarget = null → leaves component)
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new FocusEvent('blur', { relatedTarget: null, bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('01');
    });

    it('blur commits single-digit day buffer', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, '3'); // month=3, advance to day
        await el.updateComplete;
        key(el, '2'); // ambiguous day (could be 20-29) — stays in buffer
        await el.updateComplete;
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new FocusEvent('blur', { relatedTarget: null, bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('02');
    });

    // ── Controlled value clearing ─────────────────────────────────────────
    it('setting value to empty string clears all segments', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await el.updateComplete;
        el.value = '';
        await el.updateComplete;
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('MM');
        expect(segs[1].textContent?.trim()).toBe('DD');
        expect(segs[2].textContent?.trim()).toBe('YYYY');
    });

    // ── Increment/decrement from null ─────────────────────────────────────
    it('ArrowUp on empty month starts at 1', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('01');
    });

    it('ArrowDown on empty month starts at 12', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowDown');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('12');
    });

    it('ArrowUp increments year', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); // → day
        key(el, 'ArrowRight'); // → year
        await el.updateComplete;
        key(el, 'ArrowUp');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].textContent?.trim()).toBe('2026');
    });

    it('ArrowDown decrements year', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); // → day
        key(el, 'ArrowRight'); // → year
        await el.updateComplete;
        key(el, 'ArrowDown');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].textContent?.trim()).toBe('2024');
    });

    // ── Day clamping on month change ──────────────────────────────────────
    it('clamps day when month is decremented to a shorter month', async () => {
        // March 31 → decrement month to Feb → day clamps to 28 (2025 is not a leap year)
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-03-31"></ui-date-field>`);
        await focus(el); // activates month
        key(el, 'ArrowDown'); // month: 3 → 2 (February)
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('02');
        expect(segs[1].textContent?.trim()).toBe('28'); // clamped from 31
    });

    it('clamps day to 29 for leap-year February', async () => {
        // March 31, 2024 (leap year) → decrement month → Feb → day=29
        const el = await fixture<UiDateField>(html`<ui-date-field value="2024-03-31"></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowDown'); // month: 3 → 2
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('29');
    });

    // ── Clear button visibility ───────────────────────────────────────────
    it('clear button is visible when a value is set', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await el.updateComplete;
        const clearBtn = el.shadowRoot!.querySelector('.icon-btn');
        expect(clearBtn).not.toBeNull();
    });

    it('clear button is hidden when no value', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        const clearBtn = el.shadowRoot!.querySelector('.icon-btn');
        expect(clearBtn).toBeNull();
    });

    it('clear button is hidden when disabled', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15" disabled></ui-date-field>`);
        await el.updateComplete;
        const clearBtn = el.shadowRoot!.querySelector('.icon-btn');
        expect(clearBtn).toBeNull();
    });

    it('clear button is hidden when readonly', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15" readonly></ui-date-field>`);
        await el.updateComplete;
        const clearBtn = el.shadowRoot!.querySelector('.icon-btn');
        expect(clearBtn).toBeNull();
    });
});
