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

    // ── isoToSegments: !match branch ─────────────────────────────────────
    it('ignores malformed ISO value (no regex match)', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="not-a-date"></ui-date-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('MM');
        expect(segs[1].textContent?.trim()).toBe('DD');
        expect(segs[2].textContent?.trim()).toBe('YYYY');
    });

    // ── daysInMonth: month < 1 branch ────────────────────────────────────
    it('day adjustment uses max=31 when month is 0 (out-of-range ISO)', async () => {
        // '2025-00-15' matches the regex but parseInt('00')=0; daysInMonth(0,...)=31
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-00-15"></ui-date-field>`);
        await el.updateComplete;
        await focus(el);
        key(el, 'ArrowRight'); // → day
        await el.updateComplete;
        key(el, 'ArrowUp'); // day 15→16 (max=31 from daysInMonth(0,...))
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('16');
    });

    // ── _setActive: disabled / readonly guards ───────────────────────────
    it('clicking segment span when disabled does not activate it', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field disabled></ui-date-field>`);
        await el.updateComplete;
        const seg = el.shadowRoot!.querySelector('.segment') as HTMLElement;
        seg.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await el.updateComplete;
        expect(seg.classList.contains('active')).toBe(false);
    });

    it('clicking segment span when readonly does not activate it', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field readonly></ui-date-field>`);
        await el.updateComplete;
        const seg = el.shadowRoot!.querySelector('.segment') as HTMLElement;
        seg.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await el.updateComplete;
        expect(seg.classList.contains('active')).toBe(false);
    });

    // ── _commitPartialBuffer: isNaN guard ────────────────────────────────
    it('non-numeric buffer is discarded on navigation (isNaN guard)', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el); // _active = 'month'
        await el.updateComplete;
        // inject a non-numeric buffer to exercise the isNaN guard
        (el as unknown as { _buf: string })._buf = 'x';
        key(el, 'ArrowRight'); // triggers _commitPartialBuffer → isNaN → return
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('MM'); // month not committed
    });

    // ── _commitPartialBuffer: day out-of-range (else path) ───────────────
    it('blur does not commit out-of-range day buffer (day=0)', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, '5'); // month=5, advance to day
        await el.updateComplete;
        // force an out-of-range value (0 is < 1)
        (el as unknown as { _buf: string })._buf = '0';
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new FocusEvent('blur', { relatedTarget: null, bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('DD'); // day not committed
    });

    // ── _commitPartialBuffer: year partial buf covers else-if-day "E" ────
    it('blur with partial year buffer discards year and covers day-else path', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); // → year
        await el.updateComplete;
        key(el, '2'); key(el, '0'); key(el, '2'); // 3 digits → buf='202'
        await el.updateComplete;
        // year segment shows partial buffer '202_'
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].textContent?.trim()).toBe('202_');
        // blur → _commitPartialBuffer: _active='year', _buf='202'
        //  → not month, not day → implicit else → nothing committed
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new FocusEvent('blur', { relatedTarget: null, bubbles: true }));
        await el.updateComplete;
        const segs2 = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs2[2].textContent?.trim()).toBe('YYYY'); // year not committed
    });

    // ── _nextSegment: !_active → activates month ─────────────────────────
    it('ArrowRight when not focused activates month (no advance on first call)', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        key(el, 'ArrowRight'); // _active=null → _nextSegment → sets month, returns
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
    });

    // ── _nextSegment: at last segment (year), no advance ─────────────────
    it('ArrowRight on year segment stays on year', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); // → year
        await el.updateComplete;
        key(el, 'ArrowRight'); // year → stays year
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].classList.contains('active')).toBe(true);
        expect(segs[1].classList.contains('active')).toBe(false);
    });

    // ── _prevSegment: !_active → returns (no-op) ─────────────────────────
    it('ArrowLeft when not focused does nothing', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        key(el, 'ArrowLeft'); // _active=null → _prevSegment → return
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(false);
    });

    // ── _prevSegment: at first segment (month), no prev ──────────────────
    it('ArrowLeft on month segment stays on month', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el); // activates month
        key(el, 'ArrowLeft'); // month → stays month (idx=0, no prev)
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
        expect(segs[1].classList.contains('active')).toBe(false);
    });

    // ── _canGoNext: !_active → returns true (via Tab) ────────────────────
    it('Tab when not focused activates month via _canGoNext', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        // Tab: _canGoNext()→!_active→true → _nextSegment→!_active→month
        key(el, 'Tab');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
    });

    // ── _canGoPrev: !_active → returns false (via Shift+Tab) ─────────────
    it('Shift+Tab when not focused does nothing via _canGoPrev', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        // _canGoPrev()→!_active→false → nothing happens
        key(el, 'Tab', { shiftKey: true });
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(false);
    });

    // ── _handleKeyDown: digit key without prior focus ────────────────────
    it('digit key without prior focus sets month first then processes digit', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        key(el, '5'); // !_active in keydown → setActive('month'), then handleDigit(5)
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('05'); // month=5 committed
    });

    // ── month invalid 2-digit combo: restart where d ≥ 2 ────────────────
    it('typing 1 then 3 produces invalid month 13 → restarts with 3 → commits month=3', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, '1'); // buf='1', ambiguous
        await el.updateComplete;
        key(el, '3'); // buf='13' → invalid → restart with d=3 → 3≥2 → month=3, advance
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('03'); // month=3 committed
        expect(segs[1].classList.contains('active')).toBe(true); // advanced to day
    });

    // ── month invalid 2-digit combo: restart where d < 2 stays in buf ────
    it('typing 0 twice produces invalid month 00 → restarts with 0 → stays in buf', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, '0'); // buf='0', d=0 < 2 → stays in buf
        await el.updateComplete;
        key(el, '0'); // buf='00' → invalid → restart with d=0 → d<2 → stays in buf
        await el.updateComplete;
        // month segment still in input mode (not placeholder, not committed)
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
        expect(segs[0].classList.contains('placeholder')).toBe(false);
        expect(segs[0].textContent?.trim()).toBe('0_'); // partial buffer displayed
    });

    // ── day 2nd-digit path: valid 2-digit ────────────────────────────────
    it('typing 1 then 5 in day commits day=15 and advances to year', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, '5'); // month=5, advance to day
        await el.updateComplete;
        key(el, '1'); // buf='1', d=1 < 4 → stays in buf
        await el.updateComplete;
        key(el, '5'); // buf='15' → valid → day=15, advance
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('15');
        expect(segs[2].classList.contains('active')).toBe(true); // advanced to year
    });

    // ── day 2nd-digit: invalid restart where d ≥ 4 ───────────────────────
    it('typing 3 then 5 in day → invalid 35 → restarts with 5 → commits day=5', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-05-01"></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); // → day
        await el.updateComplete;
        key(el, '3'); // buf='3', d=3 < 4 → stays
        await el.updateComplete;
        key(el, '5'); // buf='35' → invalid (35>31) → restart with d=5 → 5≥4 → day=5, advance
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('05');
        expect(segs[2].classList.contains('active')).toBe(true);
    });

    // ── day 2nd-digit: invalid restart where d < 4 stays in buf ──────────
    it('typing 3 then 3 in day → invalid 33 → restarts with 3 → stays in buf', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-05-01"></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); // → day
        await el.updateComplete;
        key(el, '3'); // buf='3'
        await el.updateComplete;
        key(el, '3'); // buf='33' → invalid → restart with d=3 → 3<4 → stays in buf
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        // day still active, partial buffer showing
        expect(segs[1].classList.contains('active')).toBe(true);
        expect(segs[1].textContent?.trim()).toBe('3_');
    });

    // ── _adjust: day segment ─────────────────────────────────────────────
    it('ArrowUp increments day', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); // → day
        await el.updateComplete;
        key(el, 'ArrowUp'); // day 15→16
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('16');
    });

    it('ArrowDown decrements day', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); // → day
        await el.updateComplete;
        key(el, 'ArrowDown'); // day 15→14
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('14');
    });

    // ── _adjust: null active (defensive guard) ───────────────────────────
    it('_adjust with null active does nothing', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await el.updateComplete;
        (el as unknown as { _active: null })._active = null;
        (el as unknown as { _adjust(d: number): void })._adjust(1); // !seg → return early
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('06'); // unchanged
    });

    // ── _handleKeyDown: ArrowUp/Down without prior focus ─────────────────
    it('ArrowUp without prior focus sets month=1', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        key(el, 'ArrowUp'); // !_active in keydown → setActive('month'), then adjust(1)
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('01');
    });

    it('ArrowDown without prior focus sets month=12', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        key(el, 'ArrowDown'); // !_active → setActive('month'), adjust(-1)
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('12');
    });

    // ── Backspace/Delete on day and year segments ─────────────────────────
    it('Backspace clears day segment', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); // → day
        await el.updateComplete;
        key(el, 'Backspace');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].classList.contains('placeholder')).toBe(true);
        expect(segs[1].textContent?.trim()).toBe('DD');
    });

    it('Delete clears year segment', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); // → day
        await el.updateComplete;
        key(el, 'ArrowRight'); // → year
        await el.updateComplete;
        key(el, 'Delete');
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].classList.contains('placeholder')).toBe(true);
        expect(segs[2].textContent?.trim()).toBe('YYYY');
    });

    // ── _handleFocus: else path (already active) ─────────────────────────
    it('focus event when day is already active does not reset to month', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el); // _active='month'
        key(el, 'ArrowRight'); // _active='day'
        await el.updateComplete;
        // Fire focus again — _active is not null → else path (no-op)
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new FocusEvent('focus'));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].classList.contains('active')).toBe(true); // still day
        expect(segs[0].classList.contains('active')).toBe(false);
    });

    // ── _handleBlur: else path (relatedTarget inside shadow) ─────────────
    it('blur to a node inside shadow root keeps focused state', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        await el.updateComplete;
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        const daySegment = el.shadowRoot!.querySelector('.segment.day') as HTMLElement;
        // relatedTarget is inside shadow → else path: focused state preserved
        segments.dispatchEvent(new FocusEvent('blur', { relatedTarget: daySegment, bubbles: true }));
        await el.updateComplete;
        const container = el.shadowRoot!.querySelector('.field-container');
        expect(container?.classList.contains('focused')).toBe(true);
    });

    // ── _handleContainerClick ─────────────────────────────────────────────
    it('clicking the .segments div activates month', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        // Click on .segments div (not a segment span) → bubbles to field-container
        // target.classList.contains('segments') → true → _setActive('month')
        const segmentsDiv = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segmentsDiv.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(true);
    });

    it('clicking .segments div when disabled does nothing (_handleContainerClick guard)', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field disabled></ui-date-field>`);
        await el.updateComplete;
        const segmentsDiv = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segmentsDiv.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(false);
    });

    // ── Year partial buffer display ──────────────────────────────────────
    it('shows partial year buffer while typing (e.g. 3 digits → X___ pattern)', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); // → year
        await el.updateComplete;
        key(el, '2'); key(el, '0'); key(el, '2'); // 3 digits → buf='202'
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[2].textContent?.trim()).toBe('202_');
    });

    // ── Segment span click ───────────────────────────────────────────────
    it('clicking day segment span activates day', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        const daySpan = el.shadowRoot!.querySelector('.segment.day') as HTMLElement;
        daySpan.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await el.updateComplete;
        expect(daySpan.classList.contains('active')).toBe(true);
    });

    // ── Clear button click ───────────────────────────────────────────────
    it('clicking clear button clears all segments', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field value="2025-06-15"></ui-date-field>`);
        await el.updateComplete;
        const clearBtn = el.shadowRoot!.querySelector('.icon-btn') as HTMLElement;
        clearBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('MM');
        expect(segs[1].textContent?.trim()).toBe('DD');
        expect(segs[2].textContent?.trim()).toBe('YYYY');
    });

    // ── _adjust day from null state (covers ?? branches) ─────────────────
    it('ArrowUp on empty day starts at 1', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); // → day (day is null)
        await el.updateComplete;
        key(el, 'ArrowUp'); // _day=null → cur=0 → day=clamp(1,1,max)=1
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('01');
    });

    it('ArrowDown on empty day starts at max days in month', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); // → day (day is null, month is also null → max=31)
        await el.updateComplete;
        key(el, 'ArrowDown'); // _day=null → cur=max+1=32 → day=clamp(31,1,31)=31
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('31');
    });

    // ── _adjust year from null state (covers ?? fallback) ────────────────
    it('ArrowUp on empty year starts at current year + 1', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); // → year (year is null)
        await el.updateComplete;
        key(el, 'ArrowUp'); // _year=null → cur=currentYear → year=currentYear+1
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        const expectedYear = String(new Date().getFullYear() + 1).padStart(4, '0');
        expect(segs[2].textContent?.trim()).toBe(expectedYear);
    });

    it('ArrowDown on empty year starts at current year - 1', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el);
        key(el, 'ArrowRight'); key(el, 'ArrowRight'); // → year (year is null)
        await el.updateComplete;
        key(el, 'ArrowDown'); // _year=null → cur=currentYear → year=currentYear-1
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        const expectedYear = String(new Date().getFullYear() - 1).padStart(4, '0');
        expect(segs[2].textContent?.trim()).toBe(expectedYear);
    });

    // ── _handleDigit: direct call covers the !_active guard ──────────────
    it('_handleDigit called directly with no active sets month first', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        // _active is null → _handleDigit's own guard: if (!_active) setActive('month')
        (el as unknown as { _handleDigit(d: number): void })._handleDigit(5);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('05'); // month=5 committed
    });

    // ── daysInMonth: year=0 branch (year || 2000) ────────────────────────
    it('day clamp uses year=2000 when year segment is 0 (year || 2000 branch)', async () => {
        // ISO "0000-05-15" → _year=0; daysInMonth(5, 0) triggers year||2000 branch
        const el = await fixture<UiDateField>(html`<ui-date-field value="0000-05-15"></ui-date-field>`);
        await el.updateComplete;
        await focus(el);
        key(el, 'ArrowRight'); // → day
        await el.updateComplete;
        key(el, 'ArrowUp'); // uses daysInMonth(5, 0) → 0||2000=2000 → max=31
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('16'); // 15→16
    });

    // ── _commitPartialBuffer: _month ?? 1 null-branch ────────────────────
    it('blur with null month in day segment uses month=1 default (??1)', async () => {
        // Navigate to day without entering month → _month=null
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el); // month active, _month=null
        key(el, 'ArrowRight'); // → day, _month still null
        await el.updateComplete;
        key(el, '2'); // buf='2' in day (stays, d<4)
        await el.updateComplete;
        // blur → _commitPartialBuffer: daysInMonth(null??1, null??2000)=31 → day=2
        const segments = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segments.dispatchEvent(new FocusEvent('blur', { relatedTarget: null, bubbles: true }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('02'); // committed using null??1=1 as month
    });

    // ── _handleDigit day: _month ?? 1 null-branch ────────────────────────
    it('typing digit in day with null month uses month=1 default (??1)', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el); // month active, _month=null
        key(el, 'ArrowRight'); // → day, _month still null
        await el.updateComplete;
        key(el, '7'); // d=7 >= 4 → daysInMonth(null??1, null??2000)=31 → day=7, advance
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[1].textContent?.trim()).toBe('07');
        expect(segs[2].classList.contains('active')).toBe(true);
    });

    // ── _adjust month clamp day: _year ?? 2000 null-branch ───────────────
    it('month adjustment clamps day using year=2000 default when year is null', async () => {
        // Set month and day via typing, leave year null, then decrement month
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await focus(el); // month active
        key(el, '3'); // month=3, advance to day
        await el.updateComplete;
        key(el, '7'); // day=7, advance to year
        await el.updateComplete;
        // Navigate back to month via ArrowLeft x2
        key(el, 'ArrowLeft'); // → day
        await el.updateComplete;
        key(el, 'ArrowLeft'); // → month
        await el.updateComplete;
        key(el, 'ArrowDown'); // month 3→2, clamp day: daysInMonth(2, null??2000)=29
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].textContent?.trim()).toBe('02'); // month=2 (Feb)
        expect(segs[1].textContent?.trim()).toBe('07'); // day unchanged (7 <= 29)
    });

    // ── _handleContainerClick: target is NOT .segments (else path) ───────
    it('clicking field-container directly (not .segments) does nothing', async () => {
        const el = await fixture<UiDateField>(html`<ui-date-field></ui-date-field>`);
        await el.updateComplete;
        // Dispatch click directly on .field-container (not a child)
        // e.target = field-container, target.classList ≠ 'segments'
        const container = el.shadowRoot!.querySelector('.field-container') as HTMLElement;
        container.dispatchEvent(new MouseEvent('click', { bubbles: false }));
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.segment');
        expect(segs[0].classList.contains('active')).toBe(false);
    });
});
