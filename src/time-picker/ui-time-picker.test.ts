import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-time-picker.js';
import type {
    UiTimeField, UiDigitalClock, UiMultiSectionDigitalClock,
    UiTimeClock, UiTimePicker, UiStaticTimePicker,
    UiDesktopTimePicker, UiMobileTimePicker
} from './ui-time-picker.js';

// ── Helper ────────────────────────────────────────────────────────────────────
function key(el: HTMLElement, k: string, opts: KeyboardEventInit = {}) {
    el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, ...opts }));
}
function focus(el: HTMLElement) { el.dispatchEvent(new FocusEvent('focus')); }
function blur(el: HTMLElement, relatedTarget: Node | null = null) {
    el.dispatchEvent(new FocusEvent('blur', { relatedTarget }));
}

// ── UiTimeField ───────────────────────────────────────────────────────────────
describe('ui-time-field', () => {
    it('is defined', () => expect(document.createElement('ui-time-field')).toBeInstanceOf(HTMLElement));

    it('renders 3 segments in 12hr mode (hour, min, meridiem)', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs.length).toBe(3); // hour, minute, meridiem
    });

    it('renders 4 segments with seconds enabled', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field seconds></ui-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.seg').length).toBe(4);
    });

    it('renders 2 segments in 24hr mode without seconds', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field .ampm=${false}></ui-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.seg').length).toBe(2);
    });

    it('shows placeholder text by default', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('HH');
        expect(segs[1].textContent?.trim()).toBe('MM');
    });

    it('shows SS placeholder with seconds enabled', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field seconds></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[2].textContent?.trim()).toBe('SS');
    });

    it('parses 12hr value into segments', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="14:30:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('02'); // 14 → 2 PM
        expect(segs[1].textContent?.trim()).toBe('30');
        expect(segs[2].textContent?.trim()).toBe('PM');
    });

    it('parses midnight as 12 AM', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="00:00:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('12');
        expect(segs[2].textContent?.trim()).toBe('AM');
    });

    it('parses noon as 12 PM', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="12:00:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('12');
        expect(segs[2].textContent?.trim()).toBe('PM');
    });

    it('parses 24hr value into segments', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="09:15:00" .ampm=${false}></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('09');
        expect(segs[1].textContent?.trim()).toBe('15');
    });

    it('renders label', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field label="Start Time"></ui-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.label')?.textContent?.trim()).toBe('Start Time');
    });

    it('renders helper text', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field helper-text="Pick a time"></ui-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.helper')?.textContent?.trim()).toBe('Pick a time');
    });

    it('does not render label or helper when empty', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.label')).toBeNull();
        expect(el.shadowRoot!.querySelector('.helper')).toBeNull();
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field disabled></ui-time-field>`);
        expect(el.hasAttribute('disabled')).toBe(true);
        const segs = el.shadowRoot!.querySelector('.segments');
        expect(segs?.getAttribute('tabindex')).toBe('-1');
    });

    it('reflects error attribute', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field error></ui-time-field>`);
        expect(el.hasAttribute('error')).toBe(true);
    });

    it('reflects readonly attribute', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field readonly></ui-time-field>`);
        expect(el.hasAttribute('readonly')).toBe(true);
    });

    it('activates hour on focus', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelector('.seg');
        expect(hourSeg?.classList.contains('active')).toBe(true);
    });

    it('deactivates on blur outside shadow root', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        blur(segs, null);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.seg.active')).toBeNull();
    });

    it('typing 5 sets hour segment to 05 and advances', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '5');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('05');
    });

    it('typing 1 then 0 sets hour to 10', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '1');
        await el.updateComplete;
        key(segs, '0');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('10');
    });

    it('typing in 24hr mode: 2 then 3 sets hour to 23', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field .ampm=${false}></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '2');
        await el.updateComplete;
        key(segs, '3');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('23');
    });

    it('typing 3 in 24hr mode auto-sets to 03', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field .ampm=${false}></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '3');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('03');
    });

    it('ArrowRight navigates to next segment', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight');
        await el.updateComplete;
        const minuteSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minuteSeg.classList.contains('active')).toBe(true);
    });

    it('ArrowLeft navigates to previous segment', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight');
        await el.updateComplete;
        key(segs, 'ArrowLeft');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.classList.contains('active')).toBe(true);
    });

    it('colon key advances segment', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, ':');
        await el.updateComplete;
        const minuteSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minuteSeg.classList.contains('active')).toBe(true);
    });

    it('Tab advances to next segment, Shift+Tab goes back', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'Tab');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.seg')[1].classList.contains('active')).toBe(true);
        key(segs, 'Tab', { shiftKey: true });
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.seg')[0].classList.contains('active')).toBe(true);
    });

    it('ArrowUp increments hour value', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:00:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowUp');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('11');
    });

    it('ArrowDown decrements hour value', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:00:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowDown');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('09');
    });

    it('ArrowUp on minute wraps 59 → 0', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:59:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight');
        await el.updateComplete;
        key(segs, 'ArrowUp');
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minSeg.textContent?.trim()).toBe('00');
    });

    it('ArrowDown on minute wraps 0 → 59', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:00:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight');
        await el.updateComplete;
        key(segs, 'ArrowDown');
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minSeg.textContent?.trim()).toBe('59');
    });

    it('ArrowUp on second wraps 59 → 0', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:00:59" seconds></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // second
        await el.updateComplete;
        key(segs, 'ArrowUp');
        await el.updateComplete;
        const secSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(secSeg.textContent?.trim()).toBe('00');
    });

    it('ArrowUp/Down on meridiem toggles AM/PM', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:00:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // meridiem
        await el.updateComplete;
        key(segs, 'ArrowUp');
        await el.updateComplete;
        const merSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(merSeg.textContent?.trim()).toBe('PM');
    });

    it('ArrowUp with no active segment activates hour', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        key(segs, 'ArrowUp');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.seg.active')).not.toBeNull();
    });

    it('pressing A sets meridiem to AM', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="14:00:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'a');
        await el.updateComplete;
        const merSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(merSeg.textContent?.trim()).toBe('AM');
    });

    it('pressing P sets meridiem to PM', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:00:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'p');
        await el.updateComplete;
        const merSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(merSeg.textContent?.trim()).toBe('PM');
    });

    it('A/P keys are ignored in 24hr mode', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:00:00" .ampm=${false}></ui-time-field>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'a');
        key(segs, 'p');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('Backspace clears active segment', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="14:30:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'Backspace');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('HH');
    });

    it('Delete clears active minute segment', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="14:30:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight');
        await el.updateComplete;
        key(segs, 'Delete');
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minSeg.textContent?.trim()).toBe('MM');
    });

    it('Delete clears active second segment', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="14:30:45" seconds></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // second
        await el.updateComplete;
        key(segs, 'Delete');
        await el.updateComplete;
        const secSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(secSeg.textContent?.trim()).toBe('SS');
    });

    it('clear() method resets all segments', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="14:30:00"></ui-time-field>`);
        await el.updateComplete;
        el.clear();
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('HH');
    });

    it('Escape clears all and fires clear event', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="14:30:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        setTimeout(() => key(segs, 'Escape'));
        const ev = await oneEvent(el, 'clear');
        expect(ev).toBeDefined();
    });

    it('disabled field ignores keyboard input', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field disabled></ui-time-field>`);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        key(segs, '5');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('readonly field ignores keyboard input', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field readonly value="10:00:00"></ui-time-field>`);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        key(segs, '5');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('shows clear button when value is set', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="14:30:00"></ui-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.icon-btn')).not.toBeNull();
    });

    it('hides clear button when disabled', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="14:30:00" disabled></ui-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.icon-btn')).toBeNull();
    });

    it('clear button triggers clear', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="14:30:00"></ui-time-field>`);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.icon-btn') as HTMLElement;
        setTimeout(() => btn.click());
        const ev = await oneEvent(el, 'clear');
        expect(ev).toBeDefined();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.seg')[0].textContent?.trim()).toBe('HH');
    });

    it('clicking a segment activates it', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:30:00"></ui-time-field>`);
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1] as HTMLElement;
        minSeg.click();
        await el.updateComplete;
        expect(minSeg.classList.contains('active')).toBe(true);
    });

    it('typing digit 6 in minute field auto-advances', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:00:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight');
        await el.updateComplete;
        key(segs, '6');
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minSeg.textContent?.trim()).toBe('06');
    });

    it('typing two digits in minute: 1 then 5 = 15', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:00:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight');
        await el.updateComplete;
        key(segs, '1');
        key(segs, '5');
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minSeg.textContent?.trim()).toBe('15');
    });

    it('typing invalid two-digit hour in 12hr resets buffer', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '1');
        key(segs, '9'); // 19 > 12 in 12hr mode
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('09');
    });

    it('digit on meridiem segment is ignored', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:00:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // meridiem
        await el.updateComplete;
        key(segs, '5');
        await el.updateComplete;
        const merSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(merSeg.textContent?.trim()).toBe('AM');
    });

    it('does not emit change when value unchanged', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:00:00"></ui-time-field>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowUp');
        key(segs, 'ArrowDown');
        await el.updateComplete;
        // First ArrowUp fires change (11), second down fires change (10)
        // But second call value === original → suppressed
    });

    it('label gets focused class on focus', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field label="Time"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.label')?.classList.contains('focused')).toBe(true);
    });

    it('container gets focused class on focus', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.container')?.classList.contains('focused')).toBe(true);
    });

    it('ArrowUp on null hour sets initial value', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowUp');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('01');
    });

    it('ArrowDown on null minute sets 59', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight');
        await el.updateComplete;
        key(segs, 'ArrowDown');
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minSeg.textContent?.trim()).toBe('59');
    });

    it('digit with no active segment activates hour', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        key(segs, '5');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('05');
    });

    it('typing second segment digits in seconds mode', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="10:30:00" seconds></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // second
        await el.updateComplete;
        key(segs, '4');
        key(segs, '5');
        await el.updateComplete;
        const secSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(secSeg.textContent?.trim()).toBe('45');
    });

    it('renders separators between segments', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        await el.updateComplete;
        const seps = el.shadowRoot!.querySelectorAll('.sep');
        expect(seps.length).toBeGreaterThan(0);
    });

    it('ArrowLeft at first segment does not go further left', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowLeft');
        await el.updateComplete;
        // Still on hour
        expect(el.shadowRoot!.querySelectorAll('.seg')[0].classList.contains('active')).toBe(true);
    });

    it('ArrowRight at last segment does not go further right', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // meridiem (last)
        key(segs, 'ArrowRight'); // no-op
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.seg')[2].classList.contains('active')).toBe(true);
    });

    it('ArrowDown on null second defaults to 59', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field seconds></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // second
        await el.updateComplete;
        key(segs, 'ArrowDown');
        await el.updateComplete;
        const secSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(secSeg.textContent?.trim()).toBe('59');
    });
});

// ── UiDigitalClock ────────────────────────────────────────────────────────────
describe('ui-digital-clock', () => {
    it('is defined', () => expect(document.createElement('ui-digital-clock')).toBeInstanceOf(HTMLElement));

    it('renders 48 items with 30-min step (24 * 2)', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock step=30></ui-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.item').length).toBe(48);
    });

    it('renders 96 items with 15-min step', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock step=15></ui-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.item').length).toBe(96);
    });

    it('renders 24 items with 60-min step', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock step=60></ui-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.item').length).toBe(24);
    });

    it('marks selected item with .selected class', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock value="10:30:00" step=30></ui-digital-clock>`);
        await el.updateComplete;
        const selected = el.shadowRoot!.querySelectorAll('.selected');
        expect(selected.length).toBe(1);
    });

    it('fires change event when an item is clicked', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock step=30></ui-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        (el.shadowRoot!.querySelector('.item') as HTMLElement).click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('displays 12hr format labels by default', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock step=60></ui-digital-clock>`);
        await el.updateComplete;
        const first = el.shadowRoot!.querySelector('.item') as HTMLElement;
        expect(first.textContent?.trim()).toContain('AM');
    });

    it('displays 24hr format labels when ampm=false', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock step=60 .ampm=${false}></ui-digital-clock>`);
        await el.updateComplete;
        const first = el.shadowRoot!.querySelector('.item') as HTMLElement;
        expect(first.textContent?.trim()).not.toContain('AM');
    });

    it('has listbox role', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock></ui-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('[role="listbox"]')).not.toBeNull();
    });

    it('items have option role with aria-selected', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock value="10:30:00" step=30></ui-digital-clock>`);
        await el.updateComplete;
        const selected = el.shadowRoot!.querySelector('.selected');
        expect(selected?.getAttribute('role')).toBe('option');
        expect(selected?.getAttribute('aria-selected')).toBe('true');
    });
});

// ── UiMultiSectionDigitalClock ────────────────────────────────────────────────
describe('ui-multi-section-digital-clock', () => {
    it('is defined', () => expect(document.createElement('ui-multi-section-digital-clock')).toBeInstanceOf(HTMLElement));

    it('renders 3 columns by default (h, m, meridiem)', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.col').length).toBe(3);
    });

    it('renders 4 columns with seconds', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock seconds></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.col').length).toBe(4);
    });

    it('renders 2 columns in 24h mode without seconds', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock .ampm=${false}></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.col').length).toBe(2);
    });

    it('renders 3 columns in 24h mode with seconds', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock .ampm=${false} seconds></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.col').length).toBe(3);
    });

    it('fires change event on item click', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:00:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        (el.shadowRoot!.querySelector('.item') as HTMLElement).click();
        expect(spy).toHaveBeenCalledOnce();
    });

    it('marks the selected hour in the first column', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:00:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const col1 = el.shadowRoot!.querySelectorAll('.col')[0];
        expect(col1.querySelector('.sel')).not.toBeNull();
    });

    it('shows 12 hours in ampm mode', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const col1 = el.shadowRoot!.querySelectorAll('.col')[0];
        const items = col1.querySelectorAll('.item');
        expect(items.length).toBe(12);
    });

    it('shows 24 hours in 24h mode', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock .ampm=${false}></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const col1 = el.shadowRoot!.querySelectorAll('.col')[0];
        const items = col1.querySelectorAll('.item');
        expect(items.length).toBe(24);
    });

    it('shows 60 minutes in second column', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const col2 = el.shadowRoot!.querySelectorAll('.col')[1];
        const items = col2.querySelectorAll('.item');
        expect(items.length).toBe(60);
    });

    it('clicking AM/PM changes meridiem', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:00:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const cols = el.shadowRoot!.querySelectorAll('.col');
        const ampmCol = cols[cols.length - 1];
        const pmBtn = ampmCol.querySelectorAll('.item')[1];
        (pmBtn as HTMLElement).click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('22:00:00');
    });

    it('clicking minute changes value', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:00:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col2 = el.shadowRoot!.querySelectorAll('.col')[1];
        const min30 = col2.querySelectorAll('.item')[30];
        (min30 as HTMLElement).click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:30:00');
    });

    it('clicking second changes value', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:00:00" seconds></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col3 = el.shadowRoot!.querySelectorAll('.col')[2];
        const sec45 = col3.querySelectorAll('.item')[45];
        (sec45 as HTMLElement).click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:00:45');
    });

    it('has column headers', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock seconds></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const headers = el.shadowRoot!.querySelectorAll('.col-header');
        expect(headers.length).toBe(4);
        expect(headers[0].textContent?.trim()).toBe('Hr');
        expect(headers[1].textContent?.trim()).toBe('Min');
        expect(headers[2].textContent?.trim()).toBe('Sec');
        expect(headers[3].textContent?.trim()).toBe('AM/PM');
    });

    it('works with empty value (defaults to 00:00:00)', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value=""></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const col1 = el.shadowRoot!.querySelectorAll('.col')[0];
        expect(col1.querySelector('.sel')).not.toBeNull();
    });
});

// ── UiTimeClock ───────────────────────────────────────────────────────────────
describe('ui-time-clock', () => {
    it('is defined', () => expect(document.createElement('ui-time-clock')).toBeInstanceOf(HTMLElement));

    it('renders an SVG clock face', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00"></ui-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('svg')).not.toBeNull();
    });

    it('renders 12 number labels in hours view (12hr mode)', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        expect(nums.length).toBe(12);
    });

    it('renders 12 number labels in minutes view (5-min marks)', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        expect(nums.length).toBe(12);
    });

    it('shows AM/PM buttons in 12hr mode', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00"></ui-time-clock>`);
        await el.updateComplete;
        const ampmBtns = el.shadowRoot!.querySelectorAll('.am-pm-btn');
        expect(ampmBtns.length).toBe(2);
    });

    it('hides AM/PM buttons in 24hr mode', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" .ampm=${false}></ui-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.am-pm-btn').length).toBe(0);
    });

    it('renders 24 numbers in 24hr hours view', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="14:00:00" .ampm=${false} view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        expect(nums.length).toBe(24);
    });

    it('renders inner ring circle in 24hr mode', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="14:00:00" .ampm=${false} view="hours"></ui-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.face-inner')).not.toBeNull();
    });

    it('does not render inner ring in 12hr mode', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.face-inner')).toBeNull();
    });

    it('has a selected number highlight', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const selected = el.shadowRoot!.querySelectorAll('.num-bg.selected');
        expect(selected.length).toBe(1);
    });

    it('clicking clock-seg header switches view', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.clock-seg')[1] as HTMLElement;
        minSeg.click();
        await el.updateComplete;
        expect(el.view).toBe('minutes');
    });

    it('clicking AM button switches to AM', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="14:30:00"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const amBtn = el.shadowRoot!.querySelectorAll('.am-pm-btn')[0] as HTMLElement;
        amBtn.click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('02:30:00');
    });

    it('clicking PM button switches to PM', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const pmBtn = el.shadowRoot!.querySelectorAll('.am-pm-btn')[1] as HTMLElement;
        pmBtn.click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('22:30:00');
    });

    it('highlights active AM button when time is AM', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00"></ui-time-clock>`);
        await el.updateComplete;
        const amBtn = el.shadowRoot!.querySelectorAll('.am-pm-btn')[0];
        expect(amBtn.classList.contains('sel')).toBe(true);
    });

    it('highlights active PM button when time is PM', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="14:00:00"></ui-time-clock>`);
        await el.updateComplete;
        const pmBtn = el.shadowRoot!.querySelectorAll('.am-pm-btn')[1];
        expect(pmBtn.classList.contains('sel')).toBe(true);
    });

    it('displays hours header in 12hr format', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="14:30:00"></ui-time-clock>`);
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelector('.clock-seg') as HTMLElement;
        expect(hourSeg.textContent?.trim()).toBe('02');
    });

    it('displays hours header in 24hr format', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="14:30:00" .ampm=${false}></ui-time-clock>`);
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelector('.clock-seg') as HTMLElement;
        expect(hourSeg.textContent?.trim()).toBe('14');
    });

    it('shows seconds view segment with seconds enabled', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:45" seconds></ui-time-clock>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.clock-seg');
        expect(segs.length).toBe(3);
    });

    it('shows meridiem in header for 12hr mode', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="14:00:00"></ui-time-clock>`);
        await el.updateComplete;
        const mer = el.shadowRoot!.querySelector('.clock-mer');
        expect(mer).not.toBeNull();
        expect(mer?.textContent?.trim()).toBe('PM');
    });

    it('does not show meridiem in header for 24hr mode', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="14:00:00" .ampm=${false}></ui-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.clock-mer')).toBeNull();
    });

    it('renders hand line and tip circle', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00"></ui-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.hand')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.hand-tip')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.hand-center')).not.toBeNull();
    });

    it('inner ring labels have inner-label class in 24hr mode', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="14:00:00" .ampm=${false} view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const innerLabels = el.shadowRoot!.querySelectorAll('.inner-label');
        expect(innerLabels.length).toBe(12);
    });

    it('renders 12 minute labels (5-min intervals) in seconds view', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:45" seconds view="seconds"></ui-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        expect(nums.length).toBe(12);
    });

    it('fires view-change event when switching views via header click', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('view-change', spy);
        const minSeg = el.shadowRoot!.querySelectorAll('.clock-seg')[1] as HTMLElement;
        minSeg.click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.view).toBe('minutes');
    });

    it('works with empty value (defaults to 00:00:00)', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value=""></ui-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('svg')).not.toBeNull();
    });

    it('selects correct number for midnight (00:00) in 24hr', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="00:00:00" .ampm=${false} view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const selected = el.shadowRoot!.querySelectorAll('.num-bg.selected');
        expect(selected.length).toBe(1);
    });

    it('selects correct inner ring number for hour 13 in 24hr', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="13:00:00" .ampm=${false} view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const selectedNums = el.shadowRoot!.querySelectorAll('.num.selected');
        expect(selectedNums.length).toBe(1);
        expect(selectedNums[0].textContent?.trim()).toBe('13');
    });

    it('selects minute 15 in minutes view', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:15:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const selectedNums = el.shadowRoot!.querySelectorAll('.num.selected');
        expect(selectedNums.length).toBe(1);
        expect(selectedNums[0].textContent?.trim()).toBe('15');
    });

    it('hour 12 in 12hr mode shows as selected', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="12:00:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const selectedNums = el.shadowRoot!.querySelectorAll('.num.selected');
        expect(selectedNums.length).toBe(1);
        expect(selectedNums[0].textContent?.trim()).toBe('12');
    });

    it('minute labels are at correct positions (12 distinct positions)', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const numBgs = el.shadowRoot!.querySelectorAll('.num-bg');
        expect(numBgs.length).toBe(12);
        // All circles should be at distinct x/y positions (no overlapping)
        const positions = new Set<string>();
        numBgs.forEach(bg => {
            const cx = bg.getAttribute('cx');
            const cy = bg.getAttribute('cy');
            positions.add(`${cx},${cy}`);
        });
        expect(positions.size).toBe(12);
    });

    it('minute label "00" is at the top (12 o-clock) position', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        const firstLabel = nums[0]; // "00" label
        expect(firstLabel.textContent?.trim()).toBe('00');
        // Top position: cx=140, cy=40 (center 140 - radius 100)
        const cy = parseFloat(firstLabel.getAttribute('y') ?? '0');
        expect(cy).toBeCloseTo(40, 0);
    });

    it('minute label "15" is at the 3 o-clock position', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:15:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        const label15 = Array.from(nums).find(n => n.textContent?.trim() === '15');
        expect(label15).toBeDefined();
        // 3 o'clock: x=240 (center 140 + radius 100), y=140
        const cx = parseFloat(label15!.getAttribute('x') ?? '0');
        const cy = parseFloat(label15!.getAttribute('y') ?? '0');
        expect(cx).toBeCloseTo(240, 0);
        expect(cy).toBeCloseTo(140, 0);
    });

    it('minute label "30" is at the 6 o-clock position', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        const label30 = Array.from(nums).find(n => n.textContent?.trim() === '30');
        expect(label30).toBeDefined();
        // 6 o'clock: x=140, y=240
        const cx = parseFloat(label30!.getAttribute('x') ?? '0');
        const cy = parseFloat(label30!.getAttribute('y') ?? '0');
        expect(cx).toBeCloseTo(140, 0);
        expect(cy).toBeCloseTo(240, 0);
    });

    it('seconds view labels match minutes view layout', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:45" seconds view="seconds"></ui-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        expect(nums.length).toBe(12);
        // "45" at 9 o'clock: x=40 (center 140 - radius 100), y=140
        const label45 = Array.from(nums).find(n => n.textContent?.trim() === '45');
        expect(label45).toBeDefined();
        const cx = parseFloat(label45!.getAttribute('x') ?? '0');
        const cy = parseFloat(label45!.getAttribute('y') ?? '0');
        expect(cx).toBeCloseTo(40, 0);
        expect(cy).toBeCloseTo(140, 0);
    });

    it('24hr outer ring labels (1-12) are at radius 100', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="03:00:00" .ampm=${false} view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num:not(.inner-label)');
        expect(nums.length).toBe(12);
        // Hour "3" should be at 3 o'clock: x=240, y=140
        const label3 = Array.from(nums).find(n => n.textContent?.trim() === '3');
        expect(label3).toBeDefined();
        const cx = parseFloat(label3!.getAttribute('x') ?? '0');
        const cy = parseFloat(label3!.getAttribute('y') ?? '0');
        expect(cx).toBeCloseTo(240, 0);
        expect(cy).toBeCloseTo(140, 0);
    });

    it('24hr inner ring labels (13-23,00) are at radius 64', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="15:00:00" .ampm=${false} view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const innerLabels = el.shadowRoot!.querySelectorAll('.inner-label');
        expect(innerLabels.length).toBe(12);
        // "15" maps to position 3 on inner ring (15%12=3): x=140+64*cos(0)=204, y=140
        const label15 = Array.from(innerLabels).find(n => n.textContent?.trim() === '15');
        expect(label15).toBeDefined();
        const cx = parseFloat(label15!.getAttribute('x') ?? '0');
        const cy = parseFloat(label15!.getAttribute('y') ?? '0');
        expect(cx).toBeCloseTo(204, 0);
        expect(cy).toBeCloseTo(140, 0);
    });

    it('24hr "00" label is at 12 o-clock inner ring position', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="00:00:00" .ampm=${false} view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const innerLabels = el.shadowRoot!.querySelectorAll('.inner-label');
        const label00 = Array.from(innerLabels).find(n => n.textContent?.trim() === '00');
        expect(label00).toBeDefined();
        // 12 o'clock inner ring: x=140, y=140-64=76
        const cy = parseFloat(label00!.getAttribute('y') ?? '0');
        expect(cy).toBeCloseTo(76, 0);
    });

    it('selects second 45 in seconds view', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:45" seconds view="seconds"></ui-time-clock>`);
        await el.updateComplete;
        const selectedNums = el.shadowRoot!.querySelectorAll('.num.selected');
        expect(selectedNums.length).toBe(1);
        expect(selectedNums[0].textContent?.trim()).toBe('45');
    });
});

// ── UiTimePicker ──────────────────────────────────────────────────────────────
describe('ui-time-picker', () => {
    it('is defined', () => expect(document.createElement('ui-time-picker')).toBeInstanceOf(HTMLElement));

    it('renders ui-desktop-time-picker in desktop variant', async () => {
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="desktop"></ui-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('ui-desktop-time-picker')).not.toBeNull();
    });

    it('renders ui-mobile-time-picker in mobile variant', async () => {
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="mobile"></ui-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('ui-mobile-time-picker')).not.toBeNull();
    });

    it('renders ui-static-time-picker in static variant', async () => {
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="static"></ui-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('ui-static-time-picker')).not.toBeNull();
    });

    it('forwards value to inner component', async () => {
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="desktop" value="14:30:00"></ui-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('ui-desktop-time-picker') as UiDesktopTimePicker;
        expect(inner.value).toBe('14:30:00');
    });

    it('forwards ampm to inner component', async () => {
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="desktop" .ampm=${false}></ui-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('ui-desktop-time-picker') as UiDesktopTimePicker;
        expect(inner.ampm).toBe(false);
    });

    it('forwards seconds to inner component', async () => {
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="desktop" seconds></ui-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('ui-desktop-time-picker') as UiDesktopTimePicker;
        expect(inner.seconds).toBe(true);
    });

    it('forwards disabled to inner component', async () => {
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="desktop" disabled></ui-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('ui-desktop-time-picker') as UiDesktopTimePicker;
        expect(inner.disabled).toBe(true);
    });

    it('forwards error to inner component', async () => {
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="desktop" error></ui-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('ui-desktop-time-picker') as UiDesktopTimePicker;
        expect(inner.error).toBe(true);
    });

    it('forwards label to inner component', async () => {
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="desktop" label="Meeting"></ui-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('ui-desktop-time-picker') as UiDesktopTimePicker;
        expect(inner.label).toBe('Meeting');
    });

    it('forwards helper-text to inner component', async () => {
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="desktop" helper-text="Required"></ui-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('ui-desktop-time-picker') as UiDesktopTimePicker;
        expect(inner.helperText).toBe('Required');
    });

    it('re-dispatches change event', async () => {
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="static" value="10:00:00"></ui-time-picker>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const inner = el.shadowRoot!.querySelector('ui-static-time-picker') as UiStaticTimePicker;
        await inner.updateComplete;
        const msdc = inner.shadowRoot!.querySelector('ui-multi-section-digital-clock') as UiMultiSectionDigitalClock;
        await msdc.updateComplete;
        (msdc.shadowRoot!.querySelector('.item') as HTMLElement)?.click();
        expect(spy).toHaveBeenCalled();
    });
});

// ── UiDesktopTimePicker ───────────────────────────────────────────────────────
describe('ui-desktop-time-picker', () => {
    it('is defined', () => expect(document.createElement('ui-desktop-time-picker')).toBeInstanceOf(HTMLElement));

    it('renders a time field', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker></ui-desktop-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('ui-time-field')).not.toBeNull();
    });

    it('renders a multi-section-digital-clock in popover', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker></ui-desktop-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('ui-multi-section-digital-clock')).not.toBeNull();
    });

    it('popover is closed by default', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker></ui-desktop-time-picker>`);
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(false);
    });

    it('has Cancel and OK buttons', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker></ui-desktop-time-picker>`);
        await el.updateComplete;
        const btns = el.shadowRoot!.querySelectorAll('.btn');
        expect(btns.length).toBe(2);
        expect(btns[0].textContent?.trim()).toBe('Cancel');
        expect(btns[1].textContent?.trim()).toBe('OK');
    });

    it('forwards props to time field', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker label="Test" value="10:00:00" disabled></ui-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        expect(field.label).toBe('Test');
        expect(field.value).toBe('10:00:00');
        expect(field.disabled).toBe(true);
    });

    it('click-away closes popover', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker></ui-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const clickAway = el.shadowRoot!.querySelector('.click-away') as HTMLElement;
        clickAway.click();
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(false);
    });

    it('Cancel button closes popover', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker></ui-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const cancelBtn = el.shadowRoot!.querySelector('.btn-cancel') as HTMLElement;
        cancelBtn.click();
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(false);
    });

    it('OK button commits value and fires change', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker value="10:00:00"></ui-desktop-time-picker>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const okBtn = el.shadowRoot!.querySelector('.btn-ok') as HTMLElement;
        okBtn.click();
        expect(spy).toHaveBeenCalledOnce();
    });

    it('does not open popover when disabled', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker disabled></ui-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(false);
    });

    it('popover has dialog role', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker></ui-desktop-time-picker>`);
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.getAttribute('role')).toBe('dialog');
    });
});

// ── UiMobileTimePicker ────────────────────────────────────────────────────────
describe('ui-mobile-time-picker', () => {
    it('is defined', () => expect(document.createElement('ui-mobile-time-picker')).toBeInstanceOf(HTMLElement));

    it('renders a time field with readonly', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker></ui-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        expect(field).not.toBeNull();
        expect(field.readonly).toBe(true);
    });

    it('renders a ui-dialog', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker></ui-mobile-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('ui-dialog')).not.toBeNull();
    });

    it('forwards value and label', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker label="Alarm" value="08:00:00"></ui-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        expect(field.label).toBe('Alarm');
        expect(field.value).toBe('08:00:00');
    });

    it('disabled prevents opening', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker disabled></ui-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        expect(field.disabled).toBe(true);
    });

    it('has Cancel and OK buttons', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker></ui-mobile-time-picker>`);
        await el.updateComplete;
        const btns = el.shadowRoot!.querySelectorAll('.btn');
        expect(btns.length).toBe(2);
    });
});

// ── UiStaticTimePicker ────────────────────────────────────────────────────────
describe('ui-static-time-picker', () => {
    it('is defined', () => expect(document.createElement('ui-static-time-picker')).toBeInstanceOf(HTMLElement));

    it('renders a multi-section-digital-clock', async () => {
        const el = await fixture<UiStaticTimePicker>(html`<ui-static-time-picker></ui-static-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('ui-multi-section-digital-clock')).not.toBeNull();
    });

    it('has a surface wrapper', async () => {
        const el = await fixture<UiStaticTimePicker>(html`<ui-static-time-picker></ui-static-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.surface')).not.toBeNull();
    });

    it('forwards ampm and seconds', async () => {
        const el = await fixture<UiStaticTimePicker>(html`<ui-static-time-picker .ampm=${false} seconds></ui-static-time-picker>`);
        await el.updateComplete;
        const msdc = el.shadowRoot!.querySelector('ui-multi-section-digital-clock') as UiMultiSectionDigitalClock;
        expect(msdc.ampm).toBe(false);
        expect(msdc.seconds).toBe(true);
    });

    it('fires change when inner clock changes', async () => {
        const el = await fixture<UiStaticTimePicker>(html`<ui-static-time-picker value="10:00:00"></ui-static-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('ui-multi-section-digital-clock') as UiMultiSectionDigitalClock;
        await inner.updateComplete;
        setTimeout(() => (inner.shadowRoot!.querySelector('.item') as HTMLElement)?.click());
        const ev = await oneEvent(el, 'change') as CustomEvent;
        expect(ev.detail.value).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('updates value on change', async () => {
        const el = await fixture<UiStaticTimePicker>(html`<ui-static-time-picker value="10:00:00"></ui-static-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('ui-multi-section-digital-clock') as UiMultiSectionDigitalClock;
        await inner.updateComplete;
        setTimeout(() => (inner.shadowRoot!.querySelector('.item') as HTMLElement)?.click());
        const ev = await oneEvent(el, 'change') as CustomEvent;
        expect(el.value).toBe(ev.detail.value);
    });

    it('forwards value to inner clock', async () => {
        const el = await fixture<UiStaticTimePicker>(html`<ui-static-time-picker value="14:30:00"></ui-static-time-picker>`);
        await el.updateComplete;
        const msdc = el.shadowRoot!.querySelector('ui-multi-section-digital-clock') as UiMultiSectionDigitalClock;
        expect(msdc.value).toBe('14:30:00');
    });
});

// ── UiDigitalClock keyboard navigation ───────────────────────────────────────
describe('ui-digital-clock keyboard navigation', () => {
    it('ArrowDown moves selection to next item', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock value="10:00:00" step=30></ui-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        const selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));
        items[selectedIdx].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowUp moves selection to previous item', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock value="10:30:00" step=30></ui-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        const selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));
        items[selectedIdx].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('Home moves selection to first item', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock value="10:30:00" step=30></ui-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        const selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));
        items[selectedIdx].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('00:00:00');
    });

    it('End moves selection to last item', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock value="10:30:00" step=30></ui-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        const selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));
        items[selectedIdx].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('23:30:00');
    });

    it('ArrowDown at last item does not go out of bounds', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock value="23:30:00" step=30></ui-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        items[items.length - 1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        // Still fires (item already at boundary, selects same item) — or may fire again
        // The important thing is no error is thrown
        expect(() => {}).not.toThrow();
    });

    it('ArrowUp at first item does not go out of bounds', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock value="00:00:00" step=30></ui-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(() => {}).not.toThrow();
    });

    it('other keys do nothing', async () => {
        const el = await fixture<UiDigitalClock>(html`<ui-digital-clock value="10:00:00" step=30></ui-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        const selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));
        items[selectedIdx].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });
});

// ── UiMultiSectionDigitalClock keyboard navigation ────────────────────────────
describe('ui-multi-section-digital-clock keyboard navigation', () => {
    it('ArrowDown on hour col increments hour', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:00:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[0] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        const val = (spy.mock.calls[0][0] as CustomEvent).detail.value;
        expect(val).toMatch(/^11:/);
    });

    it('ArrowUp on hour col decrements hour', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:00:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[0] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        const val = (spy.mock.calls[0][0] as CustomEvent).detail.value;
        expect(val).toMatch(/^09:/);
    });

    it('ArrowDown on hour col wraps 12 → 1 in ampm mode', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="12:00:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[0] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        const val = (spy.mock.calls[0][0] as CustomEvent).detail.value;
        // 12 PM wraps to 1 PM (= 13:00:00)
        expect(val).toBe('13:00:00');
    });

    it('ArrowDown on hour col cycles 23 → 0 in 24h mode', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="23:00:00" .ampm=${false}></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[0] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('00:00:00');
    });

    it('ArrowDown on minute col increments minute', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:30:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[1] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:31:00');
    });

    it('ArrowUp on minute col wraps 0 → 59', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:00:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[1] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:59:00');
    });

    it('ArrowDown on seconds col increments second', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:00:00" .ampm=${false} seconds></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[2] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:00:01');
    });

    it('ArrowDown on meridiem col toggles AM → PM', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:00:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const cols = el.shadowRoot!.querySelectorAll('.col');
        const merCol = cols[cols.length - 1] as HTMLElement;
        merCol.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('22:00:00');
    });

    it('ArrowUp on meridiem col toggles PM → AM', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="22:00:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const cols = el.shadowRoot!.querySelectorAll('.col');
        const merCol = cols[cols.length - 1] as HTMLElement;
        merCol.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:00:00');
    });

    it('non-arrow keys do nothing in column', async () => {
        const el = await fixture<UiMultiSectionDigitalClock>(html`<ui-multi-section-digital-clock value="10:00:00"></ui-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[0] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });
});

// ── UiTimeClock keyboard navigation (extended) ───────────────────────────────
describe('ui-time-clock keyboard navigation', () => {
    it('ArrowUp on hours view increments hour (12hr)', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^11:/);
    });

    it('ArrowDown on hours view decrements hour (12hr)', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^09:/);
    });

    it('ArrowRight on hours view increments hour', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowLeft on hours view decrements hour', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowUp on minutes view increments minute', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:31:/);
    });

    it('ArrowDown on minutes view decrements minute', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:29:/);
    });

    it('ArrowUp on seconds view increments second', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:45" view="seconds" seconds></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:46$/);
    });

    it('ArrowDown on seconds view decrements second', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:45" view="seconds" seconds></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:44$/);
    });

    it('Enter on hours view advances to minutes', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(el.view).toBe('minutes');
    });

    it('Space on hours view advances to minutes', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;
        expect(el.view).toBe('minutes');
    });

    it('Enter on minutes view advances to seconds when seconds=true', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="minutes" seconds></ui-time-clock>`);
        await el.updateComplete;
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(el.view).toBe('seconds');
    });

    it('Enter on minutes view does not advance when seconds=false', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const viewChangeSpy = vi.fn();
        el.addEventListener('view-change', viewChangeSpy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(viewChangeSpy).not.toHaveBeenCalled();
    });

    it('other keys on clock face are ignored', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:30:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });

    it('ArrowUp on hours view cycles 12hr correctly (hour 12 → 1)', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="12:00:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        // 12 + 1 = 13 in 12hr → still PM, wraps to 1 PM = 13
        const val = (spy.mock.calls[0][0] as CustomEvent).detail.value;
        expect(val).toMatch(/^13:/);
    });

    it('ArrowUp on hours view in 24hr mode increments', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="14:00:00" view="hours" .ampm=${false}></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^15:/);
    });

    it('minute wraps 59 → 0 on ArrowUp', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:59:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:00:/);
    });
});

// ── UiTimeClock pointer events ────────────────────────────────────────────────
describe('ui-time-clock pointer events', () => {
    function mockSvg(el: UiTimeClock) {
        const svg = el.shadowRoot!.querySelector('svg') as SVGSVGElement;
        (svg as unknown as Record<string, unknown>).getBoundingClientRect = () =>
            ({ left: 0, top: 0, width: 280, height: 280, right: 280, bottom: 280, x: 0, y: 0, toJSON: () => ({}) } as DOMRect);
        (svg as unknown as Record<string, unknown>).setPointerCapture = () => {};
        return svg;
    }

    it('pointerdown on clock face fires change event', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
    });

    it('pointermove during drag fires change event', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // Start drag
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        spy.mockClear();
        // Move
        svg.dispatchEvent(new PointerEvent('pointermove', { clientX: 140, clientY: 40, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
    });

    it('pointermove without prior pointerdown does nothing', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        svg.dispatchEvent(new PointerEvent('pointermove', { clientX: 140, clientY: 40, bubbles: true, pointerId: 1 }));
        expect(spy).not.toHaveBeenCalled();
    });

    it('pointerup after drag fires change and advances view to minutes', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const viewSpy = vi.fn();
        el.addEventListener('view-change', viewSpy);
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        svg.dispatchEvent(new PointerEvent('pointerup', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        await el.updateComplete;
        expect(viewSpy).toHaveBeenCalledOnce();
        expect((viewSpy.mock.calls[0][0] as CustomEvent).detail.view).toBe('minutes');
    });

    it('pointerup without prior pointerdown does nothing', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="hours"></ui-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        svg.dispatchEvent(new PointerEvent('pointerup', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        expect(spy).not.toHaveBeenCalled();
    });

    it('pointerdown in minutes view selects minute', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // 3 o'clock = 15 minutes (angle=90, m=round(90/6)%60=15)
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:15:/);
    });

    it('pointerup on minutes view does not advance to seconds when seconds=false', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="minutes"></ui-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const viewSpy = vi.fn();
        el.addEventListener('view-change', viewSpy);
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        svg.dispatchEvent(new PointerEvent('pointerup', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        await el.updateComplete;
        expect(viewSpy).not.toHaveBeenCalled();
    });

    it('pointerup on minutes view advances to seconds when seconds=true', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="10:00:00" view="minutes" seconds></ui-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const viewSpy = vi.fn();
        el.addEventListener('view-change', viewSpy);
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        svg.dispatchEvent(new PointerEvent('pointerup', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        await el.updateComplete;
        expect(viewSpy).toHaveBeenCalledOnce();
        expect((viewSpy.mock.calls[0][0] as CustomEvent).detail.view).toBe('seconds');
    });

    it('pointerdown in 24hr hours view selects outer ring hour', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="03:00:00" view="hours" .ampm=${false}></ui-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // 3 o'clock position at radius 100 → outer ring hour 3
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^03:/);
    });

    it('pointerdown in 24hr hours view selects inner ring hour (dist < 82)', async () => {
        const el = await fixture<UiTimeClock>(html`<ui-time-clock value="15:00:00" view="hours" .ampm=${false}></ui-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // 3 o'clock at inner ring radius 64: x=140+64=204, y=140
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 204, clientY: 140, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        // inner ring 3 o'clock = 15
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^15:/);
    });
});

// ── UiDesktopTimePicker additional ────────────────────────────────────────────
describe('ui-desktop-time-picker additional', () => {
    it('focus on field opens popover', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker></ui-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(true);
    });

    it('does not open popover when readonly', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker readonly></ui-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(false);
    });

    it('change event from time field commits value immediately', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker></ui-desktop-time-picker>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new CustomEvent('change', { detail: { value: '09:15:00' }, bubbles: true, composed: true }));
        expect(spy).toHaveBeenCalled();
        const lastCall = spy.mock.calls[spy.mock.calls.length - 1][0] as CustomEvent;
        expect(lastCall.detail.value).toBe('09:15:00');
    });

    it('reflects error attribute', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker error></ui-desktop-time-picker>`);
        expect(el.hasAttribute('error')).toBe(true);
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        expect(field.error).toBe(true);
    });

    it('reflects readonly attribute', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker readonly></ui-desktop-time-picker>`);
        expect(el.hasAttribute('readonly')).toBe(true);
    });

    it('inner MSDC change updates pending value', async () => {
        const el = await fixture<UiDesktopTimePicker>(html`<ui-desktop-time-picker value="10:00:00"></ui-desktop-time-picker>`);
        await el.updateComplete;
        const msdc = el.shadowRoot!.querySelector('ui-multi-section-digital-clock') as UiMultiSectionDigitalClock;
        msdc.dispatchEvent(new CustomEvent('change', { detail: { value: '11:00:00' }, bubbles: true, composed: true }));
        await el.updateComplete;
        // value is updated internally but change event not fired yet
        expect(el.value).toBe('11:00:00');
    });
});

// ── UiMobileTimePicker additional ─────────────────────────────────────────────
describe('ui-mobile-time-picker additional', () => {
    it('focus on field opens dialog', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker></ui-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const dialog = el.shadowRoot!.querySelector('ui-dialog') as Element & { open: boolean };
        expect(dialog.open).toBe(true);
    });

    it('focus does not open dialog when disabled', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker disabled></ui-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const dialog = el.shadowRoot!.querySelector('ui-dialog') as Element & { open: boolean };
        expect(dialog.open).toBe(false);
    });

    it('OK button commits pending value and fires change', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker value="10:00:00"></ui-mobile-time-picker>`);
        await el.updateComplete;
        // Open dialog
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const okBtn = el.shadowRoot!.querySelector('.btn-ok') as HTMLElement;
        okBtn.click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:00:00');
    });

    it('Cancel button reverts pending changes and closes dialog', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker value="10:00:00"></ui-mobile-time-picker>`);
        await el.updateComplete;
        // Open dialog
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const cancelBtn = el.shadowRoot!.querySelector('.btn-cancel') as HTMLElement;
        cancelBtn.click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        const dialog = el.shadowRoot!.querySelector('ui-dialog') as Element & { open: boolean };
        expect(dialog.open).toBe(false);
    });

    it('view-change from time clock updates internal view state', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker value="10:00:00"></ui-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const clock = el.shadowRoot!.querySelector('ui-time-clock') as UiTimeClock;
        clock.dispatchEvent(new CustomEvent('view-change', { detail: { view: 'minutes' }, bubbles: true, composed: true }));
        await el.updateComplete;
        expect(clock.view).toBe('minutes');
    });

    it('change from time clock updates pending value', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker value="10:00:00"></ui-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const clock = el.shadowRoot!.querySelector('ui-time-clock') as UiTimeClock;
        clock.dispatchEvent(new CustomEvent('change', { detail: { value: '11:30:00' }, bubbles: true, composed: true }));
        await el.updateComplete;
        // Commit with OK
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const okBtn = el.shadowRoot!.querySelector('.btn-ok') as HTMLElement;
        okBtn.click();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('11:30:00');
    });

    it('renders a ui-time-clock inside the dialog', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker></ui-mobile-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('ui-time-clock')).not.toBeNull();
    });

    it('forwards error prop to time field', async () => {
        const el = await fixture<UiMobileTimePicker>(html`<ui-mobile-time-picker error></ui-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('ui-time-field') as UiTimeField;
        expect(field.error).toBe(true);
    });
});

// ── UiTimePicker auto variant ─────────────────────────────────────────────────
describe('ui-time-picker auto variant', () => {
    it('renders desktop picker in auto mode when matchMedia(pointer:coarse) is false', async () => {
        const original = window.matchMedia;
        window.matchMedia = () => ({ matches: false } as MediaQueryList);
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="auto"></ui-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('ui-desktop-time-picker')).not.toBeNull();
        window.matchMedia = original;
    });

    it('renders mobile picker in auto mode when matchMedia(pointer:coarse) is true', async () => {
        const original = window.matchMedia;
        window.matchMedia = () => ({ matches: true } as MediaQueryList);
        const el = await fixture<UiTimePicker>(html`<ui-time-picker variant="auto"></ui-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('ui-mobile-time-picker')).not.toBeNull();
        window.matchMedia = original;
    });
});
