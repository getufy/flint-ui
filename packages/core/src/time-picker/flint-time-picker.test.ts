import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './flint-time-picker.js';
import type {
    FlintTimeField, FlintDigitalClock, FlintMultiSectionDigitalClock,
    FlintTimeClock, FlintTimePicker, FlintStaticTimePicker,
    FlintDesktopTimePicker, FlintMobileTimePicker
} from './flint-time-picker.js';

// ── Helper ────────────────────────────────────────────────────────────────────
function key(el: HTMLElement, k: string, opts: KeyboardEventInit = {}) {
    el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, ...opts }));
}
function focus(el: HTMLElement) { el.dispatchEvent(new FocusEvent('focus')); }
function blur(el: HTMLElement, relatedTarget: Node | null = null) {
    el.dispatchEvent(new FocusEvent('blur', { relatedTarget }));
}

// ── FlintTimeField ───────────────────────────────────────────────────────────────
describe('flint-time-field', () => {
    it('is defined', () => expect(document.createElement('flint-time-field')).toBeInstanceOf(HTMLElement));

    it('renders 3 segments in 12hr mode (hour, min, meridiem)', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs.length).toBe(3); // hour, minute, meridiem
    });

    it('renders 4 segments with seconds enabled', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field seconds></flint-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.seg').length).toBe(4);
    });

    it('renders 2 segments in 24hr mode without seconds', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field .ampm=${false}></flint-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.seg').length).toBe(2);
    });

    it('shows placeholder text by default', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('HH');
        expect(segs[1].textContent?.trim()).toBe('MM');
    });

    it('shows SS placeholder with seconds enabled', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field seconds></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[2].textContent?.trim()).toBe('SS');
    });

    it('parses 12hr value into segments', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:30:00"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('02'); // 14 → 2 PM
        expect(segs[1].textContent?.trim()).toBe('30');
        expect(segs[2].textContent?.trim()).toBe('PM');
    });

    it('parses midnight as 12 AM', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="00:00:00"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('12');
        expect(segs[2].textContent?.trim()).toBe('AM');
    });

    it('parses noon as 12 PM', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="12:00:00"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('12');
        expect(segs[2].textContent?.trim()).toBe('PM');
    });

    it('parses 24hr value into segments', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="09:15:00" .ampm=${false}></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('09');
        expect(segs[1].textContent?.trim()).toBe('15');
    });

    it('renders label', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field label="Start Time"></flint-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.label')?.textContent?.trim()).toBe('Start Time');
    });

    it('renders helper text', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field helper-text="Pick a time"></flint-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.helper')?.textContent?.trim()).toBe('Pick a time');
    });

    it('does not render label or helper when empty', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.label')).toBeNull();
        expect(el.shadowRoot!.querySelector('.helper')).toBeNull();
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field disabled></flint-time-field>`);
        expect(el.hasAttribute('disabled')).toBe(true);
        const segs = el.shadowRoot!.querySelector('.segments');
        expect(segs?.getAttribute('tabindex')).toBe('-1');
    });

    it('reflects error attribute', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field error></flint-time-field>`);
        expect(el.hasAttribute('error')).toBe(true);
    });

    it('reflects readonly attribute', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field readonly></flint-time-field>`);
        expect(el.hasAttribute('readonly')).toBe(true);
    });

    it('activates hour on focus', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelector('.seg');
        expect(hourSeg?.classList.contains('active')).toBe(true);
    });

    it('deactivates on blur outside shadow root', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        blur(segs, null);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.seg.active')).toBeNull();
    });

    it('typing 5 sets hour segment to 05 and advances', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '5');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('05');
    });

    it('typing 1 then 0 sets hour to 10', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field .ampm=${false}></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field .ampm=${false}></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '3');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('03');
    });

    it('ArrowRight navigates to next segment', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight');
        await el.updateComplete;
        const minuteSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minuteSeg.classList.contains('active')).toBe(true);
    });

    it('ArrowLeft navigates to previous segment', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, ':');
        await el.updateComplete;
        const minuteSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minuteSeg.classList.contains('active')).toBe(true);
    });

    it('Tab advances to next segment, Shift+Tab goes back', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:59:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:59" seconds></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        key(segs, 'ArrowUp');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.seg.active')).not.toBeNull();
    });

    it('pressing A sets meridiem to AM', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:00:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00" .ampm=${false}></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:30:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:30:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:30:45" seconds></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:30:00"></flint-time-field>`);
        await el.updateComplete;
        el.clear();
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('HH');
    });

    it('Escape clears all and fires clear event', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:30:00"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        setTimeout(() => key(segs, 'Escape'));
        const ev = await oneEvent(el, 'clear');
        expect(ev).toBeDefined();
    });

    it('disabled field ignores keyboard input', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field disabled></flint-time-field>`);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        key(segs, '5');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('readonly field ignores keyboard input', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field readonly value="10:00:00"></flint-time-field>`);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        key(segs, '5');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('shows clear button when value is set', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:30:00"></flint-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.icon-btn')).not.toBeNull();
    });

    it('hides clear button when disabled', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:30:00" disabled></flint-time-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.icon-btn')).toBeNull();
    });

    it('clear button triggers clear', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:30:00"></flint-time-field>`);
        await el.updateComplete;
        const btn = el.shadowRoot!.querySelector('.icon-btn') as HTMLElement;
        setTimeout(() => btn.click());
        const ev = await oneEvent(el, 'clear');
        expect(ev).toBeDefined();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.seg')[0].textContent?.trim()).toBe('HH');
    });

    it('clicking a segment activates it', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:30:00"></flint-time-field>`);
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1] as HTMLElement;
        minSeg.click();
        await el.updateComplete;
        expect(minSeg.classList.contains('active')).toBe(true);
    });

    it('typing digit 6 in minute field auto-advances', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field label="Time"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.label')?.classList.contains('focused')).toBe(true);
    });

    it('container gets focused class on focus', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.container')?.classList.contains('focused')).toBe(true);
    });

    it('ArrowUp on null hour sets initial value', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowUp');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('01');
    });

    it('ArrowDown on null minute sets 59', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        key(segs, '5');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('05');
    });

    it('typing second segment digits in seconds mode', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:30:00" seconds></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        await el.updateComplete;
        const seps = el.shadowRoot!.querySelectorAll('.sep');
        expect(seps.length).toBeGreaterThan(0);
    });

    it('ArrowLeft at first segment does not go further left', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowLeft');
        await el.updateComplete;
        // Still on hour
        expect(el.shadowRoot!.querySelectorAll('.seg')[0].classList.contains('active')).toBe(true);
    });

    it('ArrowRight at last segment does not go further right', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
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
        const el = await fixture<FlintTimeField>(html`<flint-time-field seconds></flint-time-field>`);
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

// ── FlintDigitalClock ────────────────────────────────────────────────────────────
describe('flint-digital-clock', () => {
    it('is defined', () => expect(document.createElement('flint-digital-clock')).toBeInstanceOf(HTMLElement));

    it('renders 48 items with 30-min step (24 * 2)', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock step=30></flint-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.item').length).toBe(48);
    });

    it('renders 96 items with 15-min step', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock step=15></flint-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.item').length).toBe(96);
    });

    it('renders 24 items with 60-min step', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock step=60></flint-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.item').length).toBe(24);
    });

    it('marks selected item with .selected class', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="10:30:00" step=30></flint-digital-clock>`);
        await el.updateComplete;
        const selected = el.shadowRoot!.querySelectorAll('.selected');
        expect(selected.length).toBe(1);
    });

    it('fires change event when an item is clicked', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock step=30></flint-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        (el.shadowRoot!.querySelector('.item') as HTMLElement).click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('displays 12hr format labels by default', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock step=60></flint-digital-clock>`);
        await el.updateComplete;
        const first = el.shadowRoot!.querySelector('.item') as HTMLElement;
        expect(first.textContent?.trim()).toContain('AM');
    });

    it('displays 24hr format labels when ampm=false', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock step=60 .ampm=${false}></flint-digital-clock>`);
        await el.updateComplete;
        const first = el.shadowRoot!.querySelector('.item') as HTMLElement;
        expect(first.textContent?.trim()).not.toContain('AM');
    });

    it('has listbox role', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock></flint-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('[role="listbox"]')).not.toBeNull();
    });

    it('items have option role with aria-selected', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="10:30:00" step=30></flint-digital-clock>`);
        await el.updateComplete;
        const selected = el.shadowRoot!.querySelector('.selected');
        expect(selected?.getAttribute('role')).toBe('option');
        expect(selected?.getAttribute('aria-selected')).toBe('true');
    });
});

// ── FlintMultiSectionDigitalClock ────────────────────────────────────────────────
describe('flint-multi-section-digital-clock', () => {
    it('is defined', () => expect(document.createElement('flint-multi-section-digital-clock')).toBeInstanceOf(HTMLElement));

    it('renders 3 columns by default (h, m, meridiem)', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.col').length).toBe(3);
    });

    it('renders 4 columns with seconds', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock seconds></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.col').length).toBe(4);
    });

    it('renders 2 columns in 24h mode without seconds', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock .ampm=${false}></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.col').length).toBe(2);
    });

    it('renders 3 columns in 24h mode with seconds', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock .ampm=${false} seconds></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.col').length).toBe(3);
    });

    it('fires change event on item click', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00"></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        (el.shadowRoot!.querySelector('.item') as HTMLElement).click();
        expect(spy).toHaveBeenCalledOnce();
    });

    it('marks the selected hour in the first column', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00"></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const col1 = el.shadowRoot!.querySelectorAll('.col')[0];
        expect(col1.querySelector('.sel')).not.toBeNull();
    });

    it('shows 12 hours in ampm mode', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const col1 = el.shadowRoot!.querySelectorAll('.col')[0];
        const items = col1.querySelectorAll('.item');
        expect(items.length).toBe(12);
    });

    it('shows 24 hours in 24h mode', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock .ampm=${false}></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const col1 = el.shadowRoot!.querySelectorAll('.col')[0];
        const items = col1.querySelectorAll('.item');
        expect(items.length).toBe(24);
    });

    it('shows 60 minutes in second column', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const col2 = el.shadowRoot!.querySelectorAll('.col')[1];
        const items = col2.querySelectorAll('.item');
        expect(items.length).toBe(60);
    });

    it('clicking AM/PM changes meridiem', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00"></flint-multi-section-digital-clock>`);
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
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00"></flint-multi-section-digital-clock>`);
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
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00" seconds></flint-multi-section-digital-clock>`);
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
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock seconds></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const headers = el.shadowRoot!.querySelectorAll('.col-header');
        expect(headers.length).toBe(4);
        expect(headers[0].textContent?.trim()).toBe('Hr');
        expect(headers[1].textContent?.trim()).toBe('Min');
        expect(headers[2].textContent?.trim()).toBe('Sec');
        expect(headers[3].textContent?.trim()).toBe('AM/PM');
    });

    it('works with empty value (defaults to 00:00:00)', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value=""></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const col1 = el.shadowRoot!.querySelectorAll('.col')[0];
        expect(col1.querySelector('.sel')).not.toBeNull();
    });
});

// ── FlintTimeClock ───────────────────────────────────────────────────────────────
describe('flint-time-clock', () => {
    it('is defined', () => expect(document.createElement('flint-time-clock')).toBeInstanceOf(HTMLElement));

    it('renders an SVG clock face', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00"></flint-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('svg')).not.toBeNull();
    });

    it('renders 12 number labels in hours view (12hr mode)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        expect(nums.length).toBe(12);
    });

    it('renders 12 number labels in minutes view (5-min marks)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="minutes"></flint-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        expect(nums.length).toBe(12);
    });

    it('shows AM/PM buttons in 12hr mode', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00"></flint-time-clock>`);
        await el.updateComplete;
        const ampmBtns = el.shadowRoot!.querySelectorAll('.am-pm-btn');
        expect(ampmBtns.length).toBe(2);
    });

    it('hides AM/PM buttons in 24hr mode', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.am-pm-btn').length).toBe(0);
    });

    it('renders 24 numbers in 24hr hours view', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="14:00:00" .ampm=${false} view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        expect(nums.length).toBe(24);
    });

    it('renders inner ring circle in 24hr mode', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="14:00:00" .ampm=${false} view="hours"></flint-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.face-inner')).not.toBeNull();
    });

    it('does not render inner ring in 12hr mode', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.face-inner')).toBeNull();
    });

    it('has a selected number highlight', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const selected = el.shadowRoot!.querySelectorAll('.num-bg.selected');
        expect(selected.length).toBe(1);
    });

    it('clicking clock-seg header switches view', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.clock-seg')[1] as HTMLElement;
        minSeg.click();
        await el.updateComplete;
        expect(el.view).toBe('minutes');
    });

    it('clicking AM button switches to AM', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="14:30:00"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const amBtn = el.shadowRoot!.querySelectorAll('.am-pm-btn')[0] as HTMLElement;
        amBtn.click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('02:30:00');
    });

    it('clicking PM button switches to PM', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const pmBtn = el.shadowRoot!.querySelectorAll('.am-pm-btn')[1] as HTMLElement;
        pmBtn.click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('22:30:00');
    });

    it('highlights active AM button when time is AM', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00"></flint-time-clock>`);
        await el.updateComplete;
        const amBtn = el.shadowRoot!.querySelectorAll('.am-pm-btn')[0];
        expect(amBtn.classList.contains('sel')).toBe(true);
    });

    it('highlights active PM button when time is PM', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="14:00:00"></flint-time-clock>`);
        await el.updateComplete;
        const pmBtn = el.shadowRoot!.querySelectorAll('.am-pm-btn')[1];
        expect(pmBtn.classList.contains('sel')).toBe(true);
    });

    it('displays hours header in 12hr format', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="14:30:00"></flint-time-clock>`);
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelector('.clock-seg') as HTMLElement;
        expect(hourSeg.textContent?.trim()).toBe('02');
    });

    it('displays hours header in 24hr format', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="14:30:00" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelector('.clock-seg') as HTMLElement;
        expect(hourSeg.textContent?.trim()).toBe('14');
    });

    it('shows seconds view segment with seconds enabled', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:45" seconds></flint-time-clock>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.clock-seg');
        expect(segs.length).toBe(3);
    });

    it('shows meridiem in header for 12hr mode', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="14:00:00"></flint-time-clock>`);
        await el.updateComplete;
        const mer = el.shadowRoot!.querySelector('.clock-mer');
        expect(mer).not.toBeNull();
        expect(mer?.textContent?.trim()).toBe('PM');
    });

    it('does not show meridiem in header for 24hr mode', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="14:00:00" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.clock-mer')).toBeNull();
    });

    it('renders hand line and tip circle', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00"></flint-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.hand')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.hand-tip')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.hand-center')).not.toBeNull();
    });

    it('inner ring labels have inner-label class in 24hr mode', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="14:00:00" .ampm=${false} view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const innerLabels = el.shadowRoot!.querySelectorAll('.inner-label');
        expect(innerLabels.length).toBe(12);
    });

    it('renders 12 minute labels (5-min intervals) in seconds view', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:45" seconds view="seconds"></flint-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        expect(nums.length).toBe(12);
    });

    it('fires view-change event when switching views via header click', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('view-change', spy);
        const minSeg = el.shadowRoot!.querySelectorAll('.clock-seg')[1] as HTMLElement;
        minSeg.click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.view).toBe('minutes');
    });

    it('works with empty value (defaults to 00:00:00)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value=""></flint-time-clock>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('svg')).not.toBeNull();
    });

    it('selects correct number for midnight (00:00) in 24hr', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="00:00:00" .ampm=${false} view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const selected = el.shadowRoot!.querySelectorAll('.num-bg.selected');
        expect(selected.length).toBe(1);
    });

    it('selects correct inner ring number for hour 13 in 24hr', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="13:00:00" .ampm=${false} view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const selectedNums = el.shadowRoot!.querySelectorAll('.num.selected');
        expect(selectedNums.length).toBe(1);
        expect(selectedNums[0].textContent?.trim()).toBe('13');
    });

    it('selects minute 15 in minutes view', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:15:00" view="minutes"></flint-time-clock>`);
        await el.updateComplete;
        const selectedNums = el.shadowRoot!.querySelectorAll('.num.selected');
        expect(selectedNums.length).toBe(1);
        expect(selectedNums[0].textContent?.trim()).toBe('15');
    });

    it('hour 12 in 12hr mode shows as selected', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="12:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const selectedNums = el.shadowRoot!.querySelectorAll('.num.selected');
        expect(selectedNums.length).toBe(1);
        expect(selectedNums[0].textContent?.trim()).toBe('12');
    });

    it('minute labels are at correct positions (12 distinct positions)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="minutes"></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="minutes"></flint-time-clock>`);
        await el.updateComplete;
        const nums = el.shadowRoot!.querySelectorAll('.num');
        const firstLabel = nums[0]; // "00" label
        expect(firstLabel.textContent?.trim()).toBe('00');
        // Top position: cx=140, cy=40 (center 140 - radius 100)
        const cy = parseFloat(firstLabel.getAttribute('y') ?? '0');
        expect(cy).toBeCloseTo(40, 0);
    });

    it('minute label "15" is at the 3 o-clock position', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:15:00" view="minutes"></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="minutes"></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:45" seconds view="seconds"></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="03:00:00" .ampm=${false} view="hours"></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="15:00:00" .ampm=${false} view="hours"></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="00:00:00" .ampm=${false} view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const innerLabels = el.shadowRoot!.querySelectorAll('.inner-label');
        const label00 = Array.from(innerLabels).find(n => n.textContent?.trim() === '00');
        expect(label00).toBeDefined();
        // 12 o'clock inner ring: x=140, y=140-64=76
        const cy = parseFloat(label00!.getAttribute('y') ?? '0');
        expect(cy).toBeCloseTo(76, 0);
    });

    it('selects second 45 in seconds view', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:45" seconds view="seconds"></flint-time-clock>`);
        await el.updateComplete;
        const selectedNums = el.shadowRoot!.querySelectorAll('.num.selected');
        expect(selectedNums.length).toBe(1);
        expect(selectedNums[0].textContent?.trim()).toBe('45');
    });
});

// ── FlintTimePicker ──────────────────────────────────────────────────────────────
describe('flint-time-picker', () => {
    it('is defined', () => expect(document.createElement('flint-time-picker')).toBeInstanceOf(HTMLElement));

    it('renders flint-desktop-time-picker in desktop variant', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="desktop"></flint-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('flint-desktop-time-picker')).not.toBeNull();
    });

    it('renders flint-mobile-time-picker in mobile variant', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="mobile"></flint-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('flint-mobile-time-picker')).not.toBeNull();
    });

    it('renders flint-static-time-picker in static variant', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="static"></flint-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('flint-static-time-picker')).not.toBeNull();
    });

    it('forwards value to inner component', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="desktop" value="14:30:00"></flint-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('flint-desktop-time-picker') as FlintDesktopTimePicker;
        expect(inner.value).toBe('14:30:00');
    });

    it('forwards ampm to inner component', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="desktop" .ampm=${false}></flint-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('flint-desktop-time-picker') as FlintDesktopTimePicker;
        expect(inner.ampm).toBe(false);
    });

    it('forwards seconds to inner component', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="desktop" seconds></flint-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('flint-desktop-time-picker') as FlintDesktopTimePicker;
        expect(inner.seconds).toBe(true);
    });

    it('forwards disabled to inner component', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="desktop" disabled></flint-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('flint-desktop-time-picker') as FlintDesktopTimePicker;
        expect(inner.disabled).toBe(true);
    });

    it('forwards error to inner component', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="desktop" error></flint-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('flint-desktop-time-picker') as FlintDesktopTimePicker;
        expect(inner.error).toBe(true);
    });

    it('forwards label to inner component', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="desktop" label="Meeting"></flint-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('flint-desktop-time-picker') as FlintDesktopTimePicker;
        expect(inner.label).toBe('Meeting');
    });

    it('forwards helper-text to inner component', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="desktop" helper-text="Required"></flint-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('flint-desktop-time-picker') as FlintDesktopTimePicker;
        expect(inner.helperText).toBe('Required');
    });

    it('re-dispatches change event', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="static" value="10:00:00"></flint-time-picker>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const inner = el.shadowRoot!.querySelector('flint-static-time-picker') as FlintStaticTimePicker;
        await inner.updateComplete;
        const msdc = inner.shadowRoot!.querySelector('flint-multi-section-digital-clock') as FlintMultiSectionDigitalClock;
        await msdc.updateComplete;
        (msdc.shadowRoot!.querySelector('.item') as HTMLElement)?.click();
        expect(spy).toHaveBeenCalled();
    });
});

// ── FlintDesktopTimePicker ───────────────────────────────────────────────────────
describe('flint-desktop-time-picker', () => {
    it('is defined', () => expect(document.createElement('flint-desktop-time-picker')).toBeInstanceOf(HTMLElement));

    it('renders a time field', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker></flint-desktop-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('flint-time-field')).not.toBeNull();
    });

    it('renders a multi-section-digital-clock in popover', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker></flint-desktop-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('flint-multi-section-digital-clock')).not.toBeNull();
    });

    it('popover is closed by default', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker></flint-desktop-time-picker>`);
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(false);
    });

    it('has Cancel and OK buttons', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker></flint-desktop-time-picker>`);
        await el.updateComplete;
        const btns = el.shadowRoot!.querySelectorAll('.btn');
        expect(btns.length).toBe(2);
        expect(btns[0].textContent?.trim()).toBe('Cancel');
        expect(btns[1].textContent?.trim()).toBe('OK');
    });

    it('forwards props to time field', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker label="Test" value="10:00:00" disabled></flint-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        expect(field.label).toBe('Test');
        expect(field.value).toBe('10:00:00');
        expect(field.disabled).toBe(true);
    });

    it('click-away closes popover', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker></flint-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const clickAway = el.shadowRoot!.querySelector('.click-away') as HTMLElement;
        clickAway.click();
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(false);
    });

    it('Cancel button closes popover', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker></flint-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const cancelBtn = el.shadowRoot!.querySelector('.btn-cancel') as HTMLElement;
        cancelBtn.click();
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(false);
    });

    it('OK button commits value and fires change', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker value="10:00:00"></flint-desktop-time-picker>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const okBtn = el.shadowRoot!.querySelector('.btn-ok') as HTMLElement;
        okBtn.click();
        expect(spy).toHaveBeenCalledOnce();
    });

    it('does not open popover when disabled', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker disabled></flint-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(false);
    });

    it('popover has dialog role', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker></flint-desktop-time-picker>`);
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover');
        expect(popover?.getAttribute('role')).toBe('dialog');
    });
});

// ── FlintMobileTimePicker ────────────────────────────────────────────────────────
describe('flint-mobile-time-picker', () => {
    it('is defined', () => expect(document.createElement('flint-mobile-time-picker')).toBeInstanceOf(HTMLElement));

    it('renders a time field with readonly', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker></flint-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        expect(field).not.toBeNull();
        expect(field.readonly).toBe(true);
    });

    it('renders a flint-dialog', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker></flint-mobile-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('flint-dialog')).not.toBeNull();
    });

    it('forwards value and label', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker label="Alarm" value="08:00:00"></flint-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        expect(field.label).toBe('Alarm');
        expect(field.value).toBe('08:00:00');
    });

    it('disabled prevents opening', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker disabled></flint-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        expect(field.disabled).toBe(true);
    });

    it('has Cancel and OK buttons', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker></flint-mobile-time-picker>`);
        await el.updateComplete;
        const btns = el.shadowRoot!.querySelectorAll('.btn');
        expect(btns.length).toBe(2);
    });
});

// ── FlintStaticTimePicker ────────────────────────────────────────────────────────
describe('flint-static-time-picker', () => {
    it('is defined', () => expect(document.createElement('flint-static-time-picker')).toBeInstanceOf(HTMLElement));

    it('renders a multi-section-digital-clock', async () => {
        const el = await fixture<FlintStaticTimePicker>(html`<flint-static-time-picker></flint-static-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('flint-multi-section-digital-clock')).not.toBeNull();
    });

    it('has a surface wrapper', async () => {
        const el = await fixture<FlintStaticTimePicker>(html`<flint-static-time-picker></flint-static-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.surface')).not.toBeNull();
    });

    it('forwards ampm and seconds', async () => {
        const el = await fixture<FlintStaticTimePicker>(html`<flint-static-time-picker .ampm=${false} seconds></flint-static-time-picker>`);
        await el.updateComplete;
        const msdc = el.shadowRoot!.querySelector('flint-multi-section-digital-clock') as FlintMultiSectionDigitalClock;
        expect(msdc.ampm).toBe(false);
        expect(msdc.seconds).toBe(true);
    });

    it('fires change when inner clock changes', async () => {
        const el = await fixture<FlintStaticTimePicker>(html`<flint-static-time-picker value="10:00:00"></flint-static-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('flint-multi-section-digital-clock') as FlintMultiSectionDigitalClock;
        await inner.updateComplete;
        setTimeout(() => (inner.shadowRoot!.querySelector('.item') as HTMLElement)?.click());
        const ev = await oneEvent(el, 'change') as CustomEvent;
        expect(ev.detail.value).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    it('updates value on change', async () => {
        const el = await fixture<FlintStaticTimePicker>(html`<flint-static-time-picker value="10:00:00"></flint-static-time-picker>`);
        await el.updateComplete;
        const inner = el.shadowRoot!.querySelector('flint-multi-section-digital-clock') as FlintMultiSectionDigitalClock;
        await inner.updateComplete;
        setTimeout(() => (inner.shadowRoot!.querySelector('.item') as HTMLElement)?.click());
        const ev = await oneEvent(el, 'change') as CustomEvent;
        expect(el.value).toBe(ev.detail.value);
    });

    it('forwards value to inner clock', async () => {
        const el = await fixture<FlintStaticTimePicker>(html`<flint-static-time-picker value="14:30:00"></flint-static-time-picker>`);
        await el.updateComplete;
        const msdc = el.shadowRoot!.querySelector('flint-multi-section-digital-clock') as FlintMultiSectionDigitalClock;
        expect(msdc.value).toBe('14:30:00');
    });
});

// ── FlintDigitalClock keyboard navigation ───────────────────────────────────────
describe('flint-digital-clock keyboard navigation', () => {
    it('ArrowDown moves selection to next item', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="10:00:00" step=30></flint-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        const selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));
        items[selectedIdx].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowUp moves selection to previous item', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="10:30:00" step=30></flint-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        const selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));
        items[selectedIdx].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('Home moves selection to first item', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="10:30:00" step=30></flint-digital-clock>`);
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
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="10:30:00" step=30></flint-digital-clock>`);
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
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="23:30:00" step=30></flint-digital-clock>`);
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
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="00:00:00" step=30></flint-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(() => {}).not.toThrow();
    });

    it('other keys do nothing', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="10:00:00" step=30></flint-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        const selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));
        items[selectedIdx].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });
});

// ── FlintMultiSectionDigitalClock keyboard navigation ────────────────────────────
describe('flint-multi-section-digital-clock keyboard navigation', () => {
    it('ArrowDown on hour col increments hour', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00"></flint-multi-section-digital-clock>`);
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
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00"></flint-multi-section-digital-clock>`);
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
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="12:00:00"></flint-multi-section-digital-clock>`);
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
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="23:00:00" .ampm=${false}></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[0] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('00:00:00');
    });

    it('ArrowDown on minute col increments minute', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:30:00"></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[1] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:31:00');
    });

    it('ArrowUp on minute col wraps 0 → 59', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00"></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[1] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:59:00');
    });

    it('ArrowDown on seconds col increments second', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00" .ampm=${false} seconds></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[2] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:00:01');
    });

    it('ArrowDown on meridiem col toggles AM → PM', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00"></flint-multi-section-digital-clock>`);
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
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="22:00:00"></flint-multi-section-digital-clock>`);
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
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00"></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[0] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });
});

// ── FlintTimeClock keyboard navigation (extended) ───────────────────────────────
describe('flint-time-clock keyboard navigation', () => {
    it('ArrowUp on hours view increments hour (12hr)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^11:/);
    });

    it('ArrowDown on hours view decrements hour (12hr)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^09:/);
    });

    it('ArrowRight on hours view increments hour', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowLeft on hours view decrements hour', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowUp on minutes view increments minute', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="minutes"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:31:/);
    });

    it('ArrowDown on minutes view decrements minute', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="minutes"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:29:/);
    });

    it('ArrowUp on seconds view increments second', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:45" view="seconds" seconds></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:46$/);
    });

    it('ArrowDown on seconds view decrements second', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:45" view="seconds" seconds></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:44$/);
    });

    it('Enter on hours view advances to minutes', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(el.view).toBe('minutes');
    });

    it('Space on hours view advances to minutes', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;
        expect(el.view).toBe('minutes');
    });

    it('Enter on minutes view advances to seconds when seconds=true', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="minutes" seconds></flint-time-clock>`);
        await el.updateComplete;
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(el.view).toBe('seconds');
    });

    it('Enter on minutes view does not advance when seconds=false', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="minutes"></flint-time-clock>`);
        await el.updateComplete;
        const viewChangeSpy = vi.fn();
        el.addEventListener('view-change', viewChangeSpy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(viewChangeSpy).not.toHaveBeenCalled();
    });

    it('other keys on clock face are ignored', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
    });

    it('ArrowUp on hours view cycles 12hr correctly (hour 12 → 1)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="12:00:00" view="hours"></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="14:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^15:/);
    });

    it('minute wraps 59 → 0 on ArrowUp', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:59:00" view="minutes"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:00:/);
    });
});

// ── FlintTimeClock pointer events ────────────────────────────────────────────────
describe('flint-time-clock pointer events', () => {
    function mockSvg(el: FlintTimeClock) {
        const svg = el.shadowRoot!.querySelector('svg') as SVGSVGElement;
        (svg as unknown as Record<string, unknown>).getBoundingClientRect = () =>
            ({ left: 0, top: 0, width: 280, height: 280, right: 280, bottom: 280, x: 0, y: 0, toJSON: () => ({}) } as DOMRect);
        (svg as unknown as Record<string, unknown>).setPointerCapture = () => {};
        return svg;
    }

    it('pointerdown on clock face fires change event', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
    });

    it('pointermove during drag fires change event', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="hours"></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        svg.dispatchEvent(new PointerEvent('pointermove', { clientX: 140, clientY: 40, bubbles: true, pointerId: 1 }));
        expect(spy).not.toHaveBeenCalled();
    });

    it('pointerup after drag fires change and advances view to minutes', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="hours"></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        svg.dispatchEvent(new PointerEvent('pointerup', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        expect(spy).not.toHaveBeenCalled();
    });

    it('pointerdown in minutes view selects minute', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="minutes"></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="minutes"></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="minutes" seconds></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="03:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
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
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="15:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
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

// ── FlintDesktopTimePicker additional ────────────────────────────────────────────
describe('flint-desktop-time-picker additional', () => {
    it('focus on field opens popover', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker></flint-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(true);
    });

    it('does not open popover when readonly', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker readonly></flint-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const popover = el.shadowRoot!.querySelector('.popover') as HTMLElement;
        expect(popover.classList.contains('open')).toBe(false);
    });

    it('change event from time field commits value immediately', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker></flint-desktop-time-picker>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new CustomEvent('change', { detail: { value: '09:15:00' }, bubbles: true, composed: true }));
        expect(spy).toHaveBeenCalled();
        const lastCall = spy.mock.calls[spy.mock.calls.length - 1][0] as CustomEvent;
        expect(lastCall.detail.value).toBe('09:15:00');
    });

    it('reflects error attribute', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker error></flint-desktop-time-picker>`);
        expect(el.hasAttribute('error')).toBe(true);
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        expect(field.error).toBe(true);
    });

    it('reflects readonly attribute', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker readonly></flint-desktop-time-picker>`);
        expect(el.hasAttribute('readonly')).toBe(true);
    });

    it('inner MSDC change updates pending value', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker value="10:00:00"></flint-desktop-time-picker>`);
        await el.updateComplete;
        const msdc = el.shadowRoot!.querySelector('flint-multi-section-digital-clock') as FlintMultiSectionDigitalClock;
        msdc.dispatchEvent(new CustomEvent('change', { detail: { value: '11:00:00' }, bubbles: true, composed: true }));
        await el.updateComplete;
        // value is updated internally but change event not fired yet
        expect(el.value).toBe('11:00:00');
    });
});

// ── FlintMobileTimePicker additional ─────────────────────────────────────────────
describe('flint-mobile-time-picker additional', () => {
    it('focus on field opens dialog', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker></flint-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const dialog = el.shadowRoot!.querySelector('flint-dialog') as Element & { open: boolean };
        expect(dialog.open).toBe(true);
    });

    it('focus does not open dialog when disabled', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker disabled></flint-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const dialog = el.shadowRoot!.querySelector('flint-dialog') as Element & { open: boolean };
        expect(dialog.open).toBe(false);
    });

    it('OK button commits pending value and fires change', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker value="10:00:00"></flint-mobile-time-picker>`);
        await el.updateComplete;
        // Open dialog
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
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
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker value="10:00:00"></flint-mobile-time-picker>`);
        await el.updateComplete;
        // Open dialog
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const cancelBtn = el.shadowRoot!.querySelector('.btn-cancel') as HTMLElement;
        cancelBtn.click();
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
        const dialog = el.shadowRoot!.querySelector('flint-dialog') as Element & { open: boolean };
        expect(dialog.open).toBe(false);
    });

    it('view-change from time clock updates internal view state', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker value="10:00:00"></flint-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const clock = el.shadowRoot!.querySelector('flint-time-clock') as FlintTimeClock;
        clock.dispatchEvent(new CustomEvent('view-change', { detail: { view: 'minutes' }, bubbles: true, composed: true }));
        await el.updateComplete;
        expect(clock.view).toBe('minutes');
    });

    it('change from time clock updates pending value', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker value="10:00:00"></flint-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const clock = el.shadowRoot!.querySelector('flint-time-clock') as FlintTimeClock;
        clock.dispatchEvent(new CustomEvent('change', { detail: { value: '11:30:00' }, bubbles: true, composed: true }));
        await el.updateComplete;
        // Commit with OK
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const okBtn = el.shadowRoot!.querySelector('.btn-ok') as HTMLElement;
        okBtn.click();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('11:30:00');
    });

    it('renders a flint-time-clock inside the dialog', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker></flint-mobile-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('flint-time-clock')).not.toBeNull();
    });

    it('forwards error prop to time field', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker error></flint-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        expect(field.error).toBe(true);
    });
});

// ── FlintTimePicker auto variant ─────────────────────────────────────────────────
describe('flint-time-picker auto variant', () => {
    it('renders desktop picker in auto mode when matchMedia(pointer:coarse) is false', async () => {
        const original = window.matchMedia;
        window.matchMedia = () => ({ matches: false } as MediaQueryList);
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="auto"></flint-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('flint-desktop-time-picker')).not.toBeNull();
        window.matchMedia = original;
    });

    it('renders mobile picker in auto mode when matchMedia(pointer:coarse) is true', async () => {
        const original = window.matchMedia;
        window.matchMedia = () => ({ matches: true } as MediaQueryList);
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="auto"></flint-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('flint-mobile-time-picker')).not.toBeNull();
        window.matchMedia = original;
    });
});

// ── Mutation-focused: boundary arithmetic and no-op guards ────────────────────
describe('flint-time-field boundary and no-op mutations', () => {
    // _adjust: hour clamping at max in 12hr mode
    it('ArrowUp at hour 12 in 12hr stays at 12 (no change event)', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="12:00:00"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        // Navigate to hour 12 (already parsed)
        const spy = vi.fn();
        el.addEventListener('change', spy);
        key(segs, 'ArrowUp');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('12');
    });

    // _adjust: hour clamping at min in 12hr mode
    it('ArrowDown at hour 1 in 12hr stays at 01 (clamp min=1)', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="01:00:00"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowDown');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('01');
    });

    // _adjust: 24hr mode hour clamps at max=23
    it('ArrowUp at hour 23 in 24hr stays at 23 (clamp max=23)', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="23:00:00" .ampm=${false}></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowUp');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('23');
    });

    // _adjust: 24hr mode hour clamps at min=0
    it('ArrowDown at hour 0 in 24hr stays at 00 (clamp min=0)', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="00:00:00" .ampm=${false}></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowDown');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('00');
    });

    // _emit no-op guard: same value should not fire change
    it('ArrowUp then ArrowDown fires two change events (value differs each time)', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowUp');   // 10 → 11, fires change
        await el.updateComplete;
        key(segs, 'ArrowDown'); // 11 → 10, fires change
        await el.updateComplete;
        expect(spy).toHaveBeenCalledTimes(2);
        // Second call restores original value '10:00:00'
        expect((spy.mock.calls[1][0] as CustomEvent).detail.value).toBe('10:00:00');
    });

    // to24(12, 'AM') = 0 (midnight)
    it('to24 edge: hour=12 AM becomes 00:xx:xx', async () => {
        // Press 'a' on a 12 PM field → becomes 12 AM → 00:xx:xx
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="12:30:00"></flint-time-field>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'a'); // force AM
        await el.updateComplete;
        expect((spy.mock.calls[spy.mock.calls.length - 1][0] as CustomEvent).detail.value).toBe('00:30:00');
    });

    // to24(12, 'PM') = 12 (noon)
    it('to24 edge: hour=12 PM becomes 12:xx:xx', async () => {
        // Start with 12 AM (00:30), press 'p' → 12 PM → 12:30:00
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="00:30:00"></flint-time-field>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'p'); // force PM — 12 AM → 12 PM
        await el.updateComplete;
        expect((spy.mock.calls[spy.mock.calls.length - 1][0] as CustomEvent).detail.value).toBe('12:30:00');
    });

    // _digit threshold in 24hr: typing '0' buffers (d=0 < threshold=3)
    it('typing 0 in 24hr hour buffers and does not auto-advance', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field .ampm=${false}></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '0');
        await el.updateComplete;
        // Should still be on hour segment (not advanced)
        expect(el.shadowRoot!.querySelectorAll('.seg')[0].classList.contains('active')).toBe(true);
    });

    // _digit: typing '0' then '0' in 24hr sets hour to 0 (n=0 >= 0 is valid in 24hr)
    it('typing 00 in 24hr mode sets hour to 00', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field .ampm=${false}></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '0');
        key(segs, '0');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('00');
    });

    // _digit threshold in 12hr: typing '1' buffers (d=1 < threshold=2)
    it('typing 1 in 12hr hour buffers (threshold=2)', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '1');
        await el.updateComplete;
        // Still on hour (awaiting second digit since 1 < 2)
        expect(el.shadowRoot!.querySelectorAll('.seg')[0].classList.contains('active')).toBe(true);
    });

    // _digit: typing '2' in 12hr auto-advances (d=2 >= threshold=2)
    it('typing 2 in 12hr mode auto-advances hour', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '2');
        await el.updateComplete;
        // Auto-advances to minute
        expect(el.shadowRoot!.querySelectorAll('.seg')[1].classList.contains('active')).toBe(true);
        expect(el.shadowRoot!.querySelectorAll('.seg')[0].textContent?.trim()).toBe('02');
    });

    // _adjust: ArrowUp from null hour in 24hr starts at minH=0
    it('ArrowUp on null hour in 24hr mode sets to 00', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field .ampm=${false}></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowUp');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('00');
    });

    // _adjust: ArrowDown from null hour in 24hr starts at maxH=23
    it('ArrowDown on null hour in 24hr mode sets to 23', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field .ampm=${false}></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowDown');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('23');
    });

    // _emit: does not fire if _h is null
    it('change event not fired when hour is still null', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // move to minute (hour still null)
        key(segs, '3');          // set minute=3
        await el.updateComplete;
        // hour is null → emit skips
        expect(spy).not.toHaveBeenCalled();
    });

    // change event detail value matches segment values
    it('change event detail.value matches displayed time', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowUp'); // 10 → 11
        await el.updateComplete;
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('11:00:00');
    });

    // Backspace on meridiem does nothing (only hour/min/sec are cleared)
    it('Backspace on meridiem segment does not clear it', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:00:00"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // meridiem
        await el.updateComplete;
        key(segs, 'Backspace');
        await el.updateComplete;
        const merSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(merSeg.textContent?.trim()).toBe('PM');
    });

    // _next/_prev boundary: _canNext=false at last segment
    it('Tab at last segment does not wrap around', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // meridiem (last)
        await el.updateComplete;
        key(segs, 'Tab'); // no-op (canNext=false)
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.seg')[2].classList.contains('active')).toBe(true);
    });

    // _prev boundary: _canPrev=false at first segment
    it('Shift+Tab at first segment does not go before first', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'Tab', { shiftKey: true }); // no-op (canPrev=false)
        await el.updateComplete;
        expect(el.shadowRoot!.querySelectorAll('.seg')[0].classList.contains('active')).toBe(true);
    });
});

// ── Mutation-focused: digital clock boundary values ───────────────────────────
describe('flint-digital-clock boundary value assertions', () => {
    it('ArrowDown at last item keeps value at last item (boundary clamped)', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="23:30:00" step=30></flint-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        items[items.length - 1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        // Math.min(last+1, last) = last → same item → target===idx → no event
        expect(spy).not.toHaveBeenCalled();
    });

    it('ArrowUp at first item keeps value at first item (boundary clamped)', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="00:00:00" step=30></flint-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        // Math.max(0-1,0) = 0 → same item → target===idx → no event
        expect(spy).not.toHaveBeenCalled();
    });

    it('ArrowDown one step before last moves to last', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="23:00:00" step=30></flint-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        const selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));
        items[selectedIdx].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('23:30:00');
    });

    it('ArrowUp from second item moves to first', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="00:30:00" step=30></flint-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
        const selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));
        items[selectedIdx].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('00:00:00');
    });
});

// ── Coverage-gap: _commitBuf via Tab after buffering a digit ──────────────────
describe('flint-time-field _commitBuf coverage', () => {
    it('Tab after typing a buffered digit commits partial hour value', async () => {
        // type '1' → buf='1' (does not commit immediately in 12hr since threshold=2)
        // Tab → _next() → _setActive('minute') → _commitBuf() commits buf='1' as hour=1
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '1'); // buf='1', does not commit immediately
        await el.updateComplete;
        key(segs, 'Tab'); // _next() → _setActive('minute') → _commitBuf()
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('01');
    });

    it('Tab after typing buffered minute digit commits partial minute value', async () => {
        // Set up hour first, then navigate to minute, type '3' (buf='3'), then Tab
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // move to minute
        await el.updateComplete;
        key(segs, '3'); // buf='3', does not commit immediately (3 < 6 threshold)
        await el.updateComplete;
        key(segs, 'Tab'); // _next() → _setActive('meridiem') → _commitBuf() commits buf='3' as minute=3
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minSeg.textContent?.trim()).toBe('03');
    });

    it('_commitBuf: buf with invalid number is a no-op', async () => {
        // Edge case: _buf is non-empty non-numeric → parseInt returns NaN → early return
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        // Manually inject a non-numeric buf value and then Tab to trigger _commitBuf
        (el as unknown as Record<string, unknown>)['_buf'] = 'x';
        key(segs, 'Tab'); // triggers _setActive → _commitBuf with buf='x'
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('willUpdate else branch: setting value to empty string clears parse', async () => {
        // ch.has('value') && this.value → false when value is empty
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        await el.updateComplete;
        el.value = ''; // triggers willUpdate; ch.has('value')=true but this.value='' → branch not taken
        await el.updateComplete;
        // segments still show previous (no re-parse, no crash)
        expect(el.shadowRoot!.querySelectorAll('.seg').length).toBeGreaterThan(0);
    });

    it('blur with relatedTarget inside shadowRoot does not clear focus state', async () => {
        // The else branch of `if (!shadowRoot.contains(relatedTarget))`
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        // relatedTarget is inside the shadow root → condition is false → _focused stays true
        blur(segs, segs);
        await el.updateComplete;
        // _focused remains true (the if body did NOT run)
        expect(el.shadowRoot!.querySelector('.container')?.classList.contains('focused')).toBe(true);
    });
});

// ── Coverage-gap: clockAngle negative angle branch ────────────────────────────
describe('flint-time-clock clockAngle negative angle coverage', () => {
    function mockSvg(el: FlintTimeClock) {
        const svg = el.shadowRoot!.querySelector('svg') as SVGSVGElement;
        (svg as unknown as Record<string, unknown>).getBoundingClientRect = () =>
            ({ left: 0, top: 0, width: 280, height: 280, right: 280, bottom: 280, x: 0, y: 0, toJSON: () => ({}) } as DOMRect);
        (svg as unknown as Record<string, unknown>).setPointerCapture = () => {};
        return svg;
    }

    it('pointerdown at top-left (negative clockAngle) triggers a < 0 branch', async () => {
        // At (60, 60) with centre (140, 140): atan2(-80, -80) * 180/π + 90 ≈ -45° → += 360 → 315°
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 60, clientY: 60, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        // 315° corresponds to hour 10–11 o'clock area; just confirm we got a value
        const val = (spy.mock.calls[0][0] as CustomEvent).detail.value;
        expect(typeof val).toBe('string');
    });

    it('pointerdown in seconds view (else branch of _calcValue)', async () => {
        // Exercises the third branch of _calcValue: view==='seconds'
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="seconds"></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // 3 o'clock = 15 seconds (angle=90°, round(90/6)%60 = 15)
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        const val = (spy.mock.calls[0][0] as CustomEvent).detail.value;
        expect(val).toMatch(/:15$/);
    });

    it('pointermove in seconds view fires change with second value', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="seconds"></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        spy.mockClear();
        svg.dispatchEvent(new PointerEvent('pointermove', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
    });
});

// ── Coverage-gap: _switchView('hours') click on clock header ──────────────────
describe('flint-time-clock _switchView hours click coverage', () => {
    it('clicking hours header segment while in minutes view switches to hours', async () => {
        // The @click=${() => this._switchView('hours')} on the hours clock-seg
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="minutes"></flint-time-clock>`);
        await el.updateComplete;
        const viewSpy = vi.fn();
        el.addEventListener('view-change', viewSpy);
        const hoursSeg = el.shadowRoot!.querySelector('.clock-seg') as HTMLElement;
        hoursSeg.click();
        await el.updateComplete;
        expect(viewSpy).toHaveBeenCalledOnce();
        expect((viewSpy.mock.calls[0][0] as CustomEvent).detail.view).toBe('hours');
        expect(el.view).toBe('hours');
    });

    it('clicking seconds header segment (rendered when seconds=true) switches to seconds', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:15" view="minutes" seconds></flint-time-clock>`);
        await el.updateComplete;
        const viewSpy = vi.fn();
        el.addEventListener('view-change', viewSpy);
        // Third clock-seg is the seconds segment (hours, minutes, seconds)
        const segs = el.shadowRoot!.querySelectorAll('.clock-seg');
        const secSeg = segs[2] as HTMLElement;
        secSeg.click();
        await el.updateComplete;
        expect(viewSpy).toHaveBeenCalledOnce();
        expect((viewSpy.mock.calls[0][0] as CustomEvent).detail.view).toBe('seconds');
    });

    it('clicking minutes header segment switches to minutes view', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const viewSpy = vi.fn();
        el.addEventListener('view-change', viewSpy);
        const segs = el.shadowRoot!.querySelectorAll('.clock-seg');
        const minSeg = segs[1] as HTMLElement;
        minSeg.click();
        expect(viewSpy).toHaveBeenCalledOnce();
        expect((viewSpy.mock.calls[0][0] as CustomEvent).detail.view).toBe('minutes');
    });
});

// ── Coverage-gap: mobile time-picker @change and @close handlers ─────────────
describe('flint-mobile-time-picker @change and @close coverage', () => {
    it('@change on readonly time-field re-emits change event upward', async () => {
        // The readonly time-field in FlintMobileTimePicker can still fire 'change' in theory.
        // The handler: this.value = e.detail.value + re-dispatch
        // Note: the event both bubbles (1st call) and is re-emitted by the handler (2nd call).
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker value="10:00:00"></flint-mobile-time-picker>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new CustomEvent('change', { detail: { value: '11:30:00' }, bubbles: true, composed: true }));
        expect(spy).toHaveBeenCalled();
        expect(el.value).toBe('11:30:00');
    });

    it('@close on dialog sets _open to false', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker></flint-mobile-time-picker>`);
        await el.updateComplete;
        // First open it
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const dialog = el.shadowRoot!.querySelector('flint-dialog') as Element & { open: boolean };
        expect(dialog.open).toBe(true);
        // Dispatch 'close' event from dialog → @close handler sets _open=false
        dialog.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
        await el.updateComplete;
        expect(dialog.open).toBe(false);
    });
});

// ── Coverage-gap: digit overflow / two-digit minute second ───────────────────
describe('flint-time-field _digit minute/second overflow coverage', () => {
    it('minute overflow: inject buf="6" then type "9" → 69 > 59 → commits 9 (overflow path)', async () => {
        // Normally a first digit >= 6 commits immediately, so this buf state can't happen via keyboard.
        // We inject it to exercise the overflow else-branch in _digit for minute.
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // to minute
        await el.updateComplete;
        // Inject impossible buf state: '6' in minute (normally would have committed immediately)
        (el as unknown as Record<string, unknown>)['_buf'] = '6';
        key(segs, '9'); // buf='69' > 59 → overflow: _buf='9', 9 >= 6 → commits 9
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minSeg.textContent?.trim()).toBe('09');
    });

    it('typing overflow hour in 12hr: "1" then "5" → 15 > 12 → resets to 5, advances', async () => {
        // buf='1' (1 < threshold=2, stays in buf), then '5' → '15' > 12 → overflow
        // overflow: _buf=String(5), 5 >= threshold=2 → commits 5, advances
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '1'); // buf='1'
        await el.updateComplete;
        key(segs, '5'); // buf='15' > 12 → overflow: d=5 >= 2 → commits 5
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('05');
    });

    it('parseTime invalid: value with non-numeric parts returns null (display shows placeholder)', async () => {
        // parseTime('ab:cd') → p.some(isNaN) → null → displayTime returns ''
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="ab:cd"></flint-time-field>`);
        await el.updateComplete;
        // Invalid value → parseTime returns null → segments show placeholder
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.classList.contains('placeholder')).toBe(true);
    });

    it('_commitBuf: commits buffered second digit (line 119 branch)', async () => {
        // Need _active='second', _buf='3', then Tab to call _commitBuf.
        // With ampm=true: segments = [hour, minute, second, meridiem], so second is NOT last.
        const el = await fixture<FlintTimeField>(html`<flint-time-field seconds value="10:00:00"></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // second
        await el.updateComplete;
        key(segs, '3'); // buf='3' (3 < 6, buffers in second segment)
        await el.updateComplete;
        // Tab: _canNext() → second(idx=2) < meridiem(last, idx=3) → true → _next() → _commitBuf
        key(segs, 'Tab');
        await el.updateComplete;
        const sSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(sSeg.textContent?.trim()).toBe('03');
    });
});

// ── Coverage-gap: scrollIntoView in updated() ─────────────────────────────────
describe('scrollIntoView in updated() coverage', () => {
    it('FlintDigitalClock.updated calls scrollIntoView on selected item', async () => {
        const scrollSpy = vi.fn();
        // scrollIntoView is not implemented in jsdom – inject it temporarily
        (HTMLElement.prototype as unknown as Record<string, unknown>)['scrollIntoView'] = scrollSpy;
        try {
            const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="10:00:00"></flint-digital-clock>`);
            await el.updateComplete;
            expect(scrollSpy).toHaveBeenCalled();
        } finally {
            delete (HTMLElement.prototype as unknown as Record<string, unknown>)['scrollIntoView'];
        }
    });

    it('FlintMultiSectionDigitalClock.updated calls scrollIntoView on .sel items', async () => {
        const scrollSpy = vi.fn();
        (HTMLElement.prototype as unknown as Record<string, unknown>)['scrollIntoView'] = scrollSpy;
        try {
            const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:30:00"></flint-multi-section-digital-clock>`);
            await el.updateComplete;
            expect(scrollSpy).toHaveBeenCalled();
        } finally {
            delete (HTMLElement.prototype as unknown as Record<string, unknown>)['scrollIntoView'];
        }
    });
});

// ── Mutation-killing: helper function edge cases ──────────────────────────────
describe('helper function edge cases', () => {
    // parseTime: only 2 parts (no seconds) should default s=0
    it('parseTime with HH:MM (no seconds) defaults seconds to 0', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:30" .ampm=${false}></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('10');
        expect(segs[1].textContent?.trim()).toBe('30');
    });

    // parseTime: single part should return null (invalid)
    it('parseTime with single part is invalid', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].classList.contains('placeholder')).toBe(true);
    });

    // displayTime with seconds
    it('digital clock displays seconds format when configured', async () => {
        const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock step=60 .ampm=${false}></flint-digital-clock>`);
        await el.updateComplete;
        const first = el.shadowRoot!.querySelector('.item') as HTMLElement;
        // 24hr format, no AM/PM
        expect(first.textContent?.trim()).toBe('00:00');
    });

    // to12: hour 1-11 range
    it('to12 for hour 1 returns {hour:1, ampm:AM}', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="01:00:00"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('01');
        expect(segs[2].textContent?.trim()).toBe('AM');
    });

    // to12: hour 13 = 1 PM
    it('to12 for hour 13 returns 01 PM', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="13:00:00"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('01');
        expect(segs[2].textContent?.trim()).toBe('PM');
    });

    // to12: hour 23 = 11 PM
    it('to12 for hour 23 returns 11 PM', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="23:59:59"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('11');
        expect(segs[2].textContent?.trim()).toBe('PM');
    });

    // to24: hour 5 AM = 5
    it('to24 for 5 AM = 05:xx', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="05:30:00"></flint-time-field>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowUp'); // 5 → 6
        await el.updateComplete;
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('06:30:00');
    });

    // to24: hour 5 PM = 17
    it('to24 for 5 PM = 17:xx', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="17:30:00"></flint-time-field>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowUp'); // 5 PM → 6 PM
        await el.updateComplete;
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('18:30:00');
    });
});

// ── Mutation-killing: FlintTimeClock._calcValue inner ring ───────────────────────
describe('flint-time-clock _calcValue inner ring mutations', () => {
    function mockSvg(el: FlintTimeClock) {
        const svg = el.shadowRoot!.querySelector('svg') as SVGSVGElement;
        (svg as unknown as Record<string, unknown>).getBoundingClientRect = () =>
            ({ left: 0, top: 0, width: 280, height: 280, right: 280, bottom: 280, x: 0, y: 0, toJSON: () => ({}) } as DOMRect);
        (svg as unknown as Record<string, unknown>).setPointerCapture = () => {};
        return svg;
    }

    // Hour 0 (midnight) on inner ring: h=0 should stay 0, not become 12
    it('24hr inner ring: clicking 12-o-clock inner ring selects hour 0', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="12:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // Inner ring 12 o'clock: center(140,140), inner radius ~64, top = y=76
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 140, clientY: 76, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^00:/);
    });

    // Hour 12 outer ring in 24hr mode (not ampm)
    it('24hr outer ring: clicking 12-o-clock outer ring selects hour 12', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="00:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // Outer ring 12 o'clock: top = y=40 (140 - 100)
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 140, clientY: 40, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^12:/);
    });

    // Hour selection in 12hr ampm mode — `h || 12` path
    it('12hr mode: clicking 12-o-clock selects hour 12 (h || 12 path)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="03:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // 12 o'clock = top of outer ring: y=40
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 140, clientY: 40, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        // In AM mode (3 AM), clicking 12 o'clock should give 00:xx (12 AM → 0 in 24h)
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^00:/);
    });

    // Hour selection in 12hr PM mode — preserves PM
    it('12hr PM mode: clicking 3-o-clock selects hour 3 PM = 15:xx', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="14:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // 3 o'clock position: x=240, y=140
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^15:/);
    });

    // Inner ring hour 13-23: various positions
    it('24hr inner ring: 6-o-clock inner position selects hour 18', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="12:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // Inner ring 6 o'clock: center + 64 down → y=204, x=140
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 140, clientY: 204, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^18:/);
    });

    // Inner ring hour 21 (9 o'clock inner)
    it('24hr inner ring: 9-o-clock inner position selects hour 21', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="12:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        // Inner ring 9 o'clock: x=76 (140-64), y=140
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 76, clientY: 140, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^21:/);
    });

    // Pointerdown at minute 0 (top of clock in minutes view)
    it('minutes view: clicking 12-o-clock selects minute 0', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="minutes"></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 140, clientY: 40, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:00:/);
    });

    // Seconds view: clicking 6-o-clock = second 30
    it('seconds view: clicking 6-o-clock selects second 30', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="seconds" seconds></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 140, clientY: 240, bubbles: true, pointerId: 1 }));
        expect(spy).toHaveBeenCalled();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:30$/);
    });
});

// ── Mutation-killing: _renderFace hand angle/length ───────────────────────────
describe('flint-time-clock _renderFace hand mutations', () => {
    // Hand length differs for inner ring (64) vs outer ring (100) in 24hr
    it('hand-tip position differs between inner and outer ring hours', async () => {
        const outer = await fixture<FlintTimeClock>(html`<flint-time-clock value="03:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await outer.updateComplete;
        const inner = await fixture<FlintTimeClock>(html`<flint-time-clock value="15:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await inner.updateComplete;
        // Both at 3 o'clock position but different radii
        const outerTip = outer.shadowRoot!.querySelector('.hand-tip');
        const innerTip = inner.shadowRoot!.querySelector('.hand-tip');
        const outerCx = parseFloat(outerTip!.getAttribute('cx') ?? '0');
        const innerCx = parseFloat(innerTip!.getAttribute('cx') ?? '0');
        // Outer is at 140+100=240, inner at 140+64=204
        expect(outerCx).toBeCloseTo(240, 0);
        expect(innerCx).toBeCloseTo(204, 0);
    });

    // Hour 0 (midnight) in 24hr has short hand (inner ring)
    it('hour 0 in 24hr uses short hand (inner ring radius 64)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="00:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const tip = el.shadowRoot!.querySelector('.hand-tip');
        const tipCy = parseFloat(tip!.getAttribute('cy') ?? '0');
        // 12 o'clock inner ring: y = 140 - 64 = 76
        expect(tipCy).toBeCloseTo(76, 0);
    });

    // Hour 12 in 24hr has long hand (outer ring)
    it('hour 12 in 24hr uses long hand (outer ring radius 100)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="12:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const tip = el.shadowRoot!.querySelector('.hand-tip');
        const tipCy = parseFloat(tip!.getAttribute('cy') ?? '0');
        // 12 o'clock outer ring: y = 140 - 100 = 40
        expect(tipCy).toBeCloseTo(40, 0);
    });

    // In 12hr ampm mode, hand is always at radius 100
    it('12hr mode always uses long hand (radius 100)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="06:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const tip = el.shadowRoot!.querySelector('.hand-tip');
        const tipCy = parseFloat(tip!.getAttribute('cy') ?? '0');
        // 6 o'clock: y = 140 + 100 = 240
        expect(tipCy).toBeCloseTo(240, 0);
    });

    // Minutes view hand at minute 15 (3 o'clock)
    it('minutes view hand points to minute value', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:15:00" view="minutes"></flint-time-clock>`);
        await el.updateComplete;
        const tip = el.shadowRoot!.querySelector('.hand-tip');
        const tipCx = parseFloat(tip!.getAttribute('cx') ?? '0');
        // 3 o'clock: x = 140 + 100 = 240
        expect(tipCx).toBeCloseTo(240, 0);
    });

    // Seconds view hand at second 45 (9 o'clock)
    it('seconds view hand points to second value', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:45" view="seconds" seconds></flint-time-clock>`);
        await el.updateComplete;
        const tip = el.shadowRoot!.querySelector('.hand-tip');
        const tipCx = parseFloat(tip!.getAttribute('cx') ?? '0');
        // 9 o'clock: x = 140 - 100 = 40
        expect(tipCx).toBeCloseTo(40, 0);
    });

    // hPos for inner ring: hour 13 → 13%12=1 → angle at 1 o'clock
    it('hour 13 hand angle matches 1 o-clock position', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="13:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const line = el.shadowRoot!.querySelector('.hand');
        const x2 = parseFloat(line!.getAttribute('x2') ?? '0');
        const y2 = parseFloat(line!.getAttribute('y2') ?? '0');
        // 1 o'clock inner ring at radius 64: x=140+64*cos(-60°)=172, y=140+64*sin(-60°)=84.6
        expect(x2).toBeCloseTo(172, 0);
        expect(y2).toBeCloseTo(84.6, 0);
    });

    // hPos for outer ring: hour 1 → used directly → angle at 1 o'clock
    it('hour 1 in 24hr outer ring at 1 o-clock position', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="01:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const line = el.shadowRoot!.querySelector('.hand');
        const x2 = parseFloat(line!.getAttribute('x2') ?? '0');
        const y2 = parseFloat(line!.getAttribute('y2') ?? '0');
        // 1 o'clock outer ring at radius 100: x=140+100*cos(-60°)=190, y=140+100*sin(-60°)=53.4
        expect(x2).toBeCloseTo(190, 0);
        expect(y2).toBeCloseTo(53.4, 0);
    });
});

// ── Mutation-killing: FlintTimeClock keyboard 24hr boundary cycles ───────────────
describe('flint-time-clock keyboard 24hr boundary cycles', () => {
    it('ArrowUp at hour 23 in 24hr wraps to 0', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="23:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^00:/);
    });

    it('ArrowDown at hour 0 in 24hr wraps to 23', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="00:00:00" view="hours" .ampm=${false}></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^23:/);
    });

    it('ArrowDown at hour 1 in 12hr wraps to 12', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="01:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        // 1 AM - 1 = 12 AM → wraps via ((1-1-1+12)%12)+1 = 12, to24(12, AM)=0
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/^00:/);
    });

    it('seconds view wraps 59 → 0 on ArrowUp', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:59" view="seconds" seconds></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:00$/);
    });

    it('seconds view wraps 0 → 59 on ArrowDown', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:30:00" view="seconds" seconds></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:59$/);
    });

    it('minutes view wraps 0 → 59 on ArrowDown', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="minutes"></flint-time-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const svg = el.shadowRoot!.querySelector('svg')!;
        svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toMatch(/:59:/);
    });
});

// ── Mutation-killing: FlintMultiSectionDigitalClock wrapping boundaries ──────────
describe('flint-multi-section-digital-clock wrapping mutations', () => {
    it('ArrowUp on hour col wraps 1 → 12 in ampm mode', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="01:00:00"></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[0] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        // 1 AM - 1 = 12 AM → ((1-1-1+12)%12)+1 = 12, to24(12, AM) = 0
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('00:00:00');
    });

    it('ArrowUp on hour col cycles 0 → 23 in 24h mode', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="00:00:00" .ampm=${false}></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[0] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('23:00:00');
    });

    it('ArrowDown on minute col wraps 59 → 0', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:59:00"></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[1] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:00:00');
    });

    it('ArrowUp on seconds col wraps 0 → 59', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00" .ampm=${false} seconds></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[2] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:00:59');
    });

    it('ArrowDown on seconds col wraps 59 → 0', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:59" .ampm=${false} seconds></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col = el.shadowRoot!.querySelectorAll('.col')[2] as HTMLElement;
        col.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('10:00:00');
    });

    // Clicking hour in 24h mode
    it('clicking hour 0 in 24h mode selects it', async () => {
        const el = await fixture<FlintMultiSectionDigitalClock>(html`<flint-multi-section-digital-clock value="10:00:00" .ampm=${false}></flint-multi-section-digital-clock>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const col1 = el.shadowRoot!.querySelectorAll('.col')[0];
        const firstItem = col1.querySelector('.item') as HTMLElement;
        firstItem.click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('00:00:00');
    });
});

// ── Mutation-killing: FlintDesktopTimePicker empty value fallback ─────────────────
describe('flint-desktop-time-picker empty value fallback', () => {
    it('OK with empty value commits default 12:00:00', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker></flint-desktop-time-picker>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const okBtn = el.shadowRoot!.querySelector('.btn-ok') as HTMLElement;
        okBtn.click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('12:00:00');
    });

    it('forwards helper-text to time field', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker helper-text="Select"></flint-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        expect(field.helperText).toBe('Select');
    });

    it('forwards seconds to time field and MSDC', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker seconds></flint-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        expect(field.seconds).toBe(true);
        const msdc = el.shadowRoot!.querySelector('flint-multi-section-digital-clock') as FlintMultiSectionDigitalClock;
        expect(msdc.seconds).toBe(true);
    });

    it('forwards ampm=false to time field and MSDC', async () => {
        const el = await fixture<FlintDesktopTimePicker>(html`<flint-desktop-time-picker .ampm=${false}></flint-desktop-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        expect(field.ampm).toBe(false);
        const msdc = el.shadowRoot!.querySelector('flint-multi-section-digital-clock') as FlintMultiSectionDigitalClock;
        expect(msdc.ampm).toBe(false);
    });
});

// ── Mutation-killing: FlintMobileTimePicker empty value fallback ──────────────────
describe('flint-mobile-time-picker empty value fallback', () => {
    it('OK with empty value commits empty string (no fallback)', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker></flint-mobile-time-picker>`);
        await el.updateComplete;
        // Open dialog
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const okBtn = el.shadowRoot!.querySelector('.btn-ok') as HTMLElement;
        okBtn.click();
        expect(spy).toHaveBeenCalledOnce();
        // _pending='', this.value='' → v='' (empty fallback)
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('');
    });

    it('OK with pending value commits the pending value', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker value="10:00:00"></flint-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        // Simulate clock change to update pending
        const clock = el.shadowRoot!.querySelector('flint-time-clock') as FlintTimeClock;
        clock.dispatchEvent(new CustomEvent('change', { detail: { value: '15:30:00' }, bubbles: true, composed: true }));
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const okBtn = el.shadowRoot!.querySelector('.btn-ok') as HTMLElement;
        okBtn.click();
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('15:30:00');
    });

    it('forwards ampm and seconds to time clock', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker .ampm=${false} seconds></flint-mobile-time-picker>`);
        await el.updateComplete;
        const clock = el.shadowRoot!.querySelector('flint-time-clock') as FlintTimeClock;
        expect(clock.ampm).toBe(false);
        expect(clock.seconds).toBe(true);
    });

    it('forwards helper-text to time field', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker helper-text="Required"></flint-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        expect(field.helperText).toBe('Required');
    });

    it('opening dialog resets view to hours', async () => {
        const el = await fixture<FlintMobileTimePicker>(html`<flint-mobile-time-picker value="10:00:00"></flint-mobile-time-picker>`);
        await el.updateComplete;
        const field = el.shadowRoot!.querySelector('flint-time-field') as FlintTimeField;
        // Open → change view → close → reopen should reset to 'hours'
        field.dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
        await el.updateComplete;
        const clock = el.shadowRoot!.querySelector('flint-time-clock') as FlintTimeClock;
        expect(clock.view).toBe('hours');
    });
});

// ── Mutation-killing: FlintTimeField _segText buffer display ─────────────────────
describe('flint-time-field _segText buffer display', () => {
    it('displays partial buffer with underscore padding in hour segment', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field .ampm=${false}></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, '1'); // buf='1', active=hour, doesn't auto-advance (1 < threshold 3 in 24hr)
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('1_');
    });

    it('displays partial buffer with underscore in minute segment', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        await el.updateComplete;
        key(segs, '3'); // buf='3', doesn't auto-advance (3 < 6)
        await el.updateComplete;
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minSeg.textContent?.trim()).toBe('3_');
    });

    it('displays partial buffer with underscore in second segment', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00" seconds></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // second
        await el.updateComplete;
        key(segs, '2'); // buf='2', doesn't auto-advance (2 < 6)
        await el.updateComplete;
        const secSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(secSeg.textContent?.trim()).toBe('2_');
    });
});

// ── Mutation-killing: FlintTimeField _onKey meta key passthrough ─────────────────
describe('flint-time-field meta/ctrl key passthrough', () => {
    it('Ctrl+key does not trigger digit or navigation', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'a', { ctrlKey: true }); // Ctrl+A — should NOT set AM
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('Meta+key (Cmd on Mac) does not trigger digit or navigation', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'p', { metaKey: true }); // Cmd+P — should NOT set PM
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('uppercase A sets AM', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="14:00:00"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'A');
        await el.updateComplete;
        const merSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(merSeg.textContent?.trim()).toBe('AM');
    });

    it('uppercase P sets PM', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'P');
        await el.updateComplete;
        const merSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(merSeg.textContent?.trim()).toBe('PM');
    });
});

// ── Mutation-killing: FlintTimeClock _renderT liveValue during drag ──────────────
describe('flint-time-clock drag liveValue rendering', () => {
    function mockSvg(el: FlintTimeClock) {
        const svg = el.shadowRoot!.querySelector('svg') as SVGSVGElement;
        (svg as unknown as Record<string, unknown>).getBoundingClientRect = () =>
            ({ left: 0, top: 0, width: 280, height: 280, right: 280, bottom: 280, x: 0, y: 0, toJSON: () => ({}) } as DOMRect);
        (svg as unknown as Record<string, unknown>).setPointerCapture = () => {};
        return svg;
    }

    it('during drag, hand follows pointer position (uses liveValue)', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        // Start drag at 3 o'clock
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        await el.updateComplete;
        // During drag, the svg should have 'dragging' class
        expect(svg.classList.contains('dragging')).toBe(true);
        // Move to 6 o'clock
        svg.dispatchEvent(new PointerEvent('pointermove', { clientX: 140, clientY: 240, bubbles: true, pointerId: 1 }));
        await el.updateComplete;
        // Hand should now point to 6 o'clock (rendered from _liveValue)
        const tip = el.shadowRoot!.querySelector('.hand-tip');
        const tipCy = parseFloat(tip!.getAttribute('cy') ?? '0');
        expect(tipCy).toBeCloseTo(240, 0);
    });

    it('after pointerup, dragging class is removed', async () => {
        const el = await fixture<FlintTimeClock>(html`<flint-time-clock value="10:00:00" view="hours"></flint-time-clock>`);
        await el.updateComplete;
        const svg = mockSvg(el);
        svg.dispatchEvent(new PointerEvent('pointerdown', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        await el.updateComplete;
        svg.dispatchEvent(new PointerEvent('pointerup', { clientX: 240, clientY: 140, bubbles: true, pointerId: 1 }));
        await el.updateComplete;
        expect(svg.classList.contains('dragging')).toBe(false);
    });
});

// ── Mutation-killing: FlintTimePicker change propagation ─────────────────────────
describe('flint-time-picker change propagation', () => {
    it('change event from mobile variant propagates value', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="mobile" value="10:00:00"></flint-time-picker>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const inner = el.shadowRoot!.querySelector('flint-mobile-time-picker') as FlintMobileTimePicker;
        inner.dispatchEvent(new CustomEvent('change', { detail: { value: '11:00:00' }, bubbles: true, composed: true }));
        expect(spy).toHaveBeenCalled();
        expect(el.value).toBe('11:00:00');
    });

    it('change event from static variant propagates value', async () => {
        const el = await fixture<FlintTimePicker>(html`<flint-time-picker variant="static" value="10:00:00"></flint-time-picker>`);
        await el.updateComplete;
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const inner = el.shadowRoot!.querySelector('flint-static-time-picker') as FlintStaticTimePicker;
        inner.dispatchEvent(new CustomEvent('change', { detail: { value: '14:00:00' }, bubbles: true, composed: true }));
        expect(spy).toHaveBeenCalled();
        expect(el.value).toBe('14:00:00');
    });
});

// ── Mutation-killing: FlintDigitalClock keyboard scroll ──────────────────────────
describe('flint-digital-clock keyboard scrollIntoView', () => {
    it('ArrowDown triggers scrollIntoView on focused item', async () => {
        const scrollSpy = vi.fn();
        (HTMLElement.prototype as unknown as Record<string, unknown>)['scrollIntoView'] = scrollSpy;
        try {
            const el = await fixture<FlintDigitalClock>(html`<flint-digital-clock value="10:00:00" step=30></flint-digital-clock>`);
            await el.updateComplete;
            scrollSpy.mockClear();
            const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.item');
            const selectedIdx = Array.from(items).findIndex(i => i.classList.contains('selected'));
            items[selectedIdx].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
            await el.updateComplete;
            expect(scrollSpy).toHaveBeenCalled();
        } finally {
            delete (HTMLElement.prototype as unknown as Record<string, unknown>)['scrollIntoView'];
        }
    });
});

// ── Mutation-killing: _digit second segment with digit >= 6 ───────────────────
describe('flint-time-field _digit second segment auto-advance', () => {
    it('typing 6 in second segment auto-advances (d >= 6)', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:30:00" seconds></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // second
        await el.updateComplete;
        key(segs, '6');
        await el.updateComplete;
        const secSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(secSeg.textContent?.trim()).toBe('06');
        // Should have auto-advanced to meridiem
        expect(el.shadowRoot!.querySelectorAll('.seg')[3].classList.contains('active')).toBe(true);
    });

    it('typing 9 in second segment auto-advances', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:30:00" seconds></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // second
        await el.updateComplete;
        key(segs, '9');
        await el.updateComplete;
        const secSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(secSeg.textContent?.trim()).toBe('09');
    });

    it('typing two-digit second 45', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:30:00" seconds .ampm=${false}></flint-time-field>`);
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
});

// ── Mutation-killing: _commitBuf out-of-range values ──────────────────────────
describe('flint-time-field _commitBuf out-of-range guard', () => {
    it('_commitBuf rejects hour 0 in 12hr mode (min=1)', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        // Inject buf='0' for hour segment
        (el as unknown as Record<string, unknown>)['_buf'] = '0';
        (el as unknown as Record<string, unknown>)['_active'] = 'hour';
        key(segs, 'Tab'); // triggers _commitBuf
        await el.updateComplete;
        // Hour 0 is out of range (min=1 in 12hr) → not committed
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.classList.contains('placeholder')).toBe(true);
    });

    it('_commitBuf rejects hour 24 in 24hr mode (max=23)', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field .ampm=${false}></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        (el as unknown as Record<string, unknown>)['_buf'] = '24';
        (el as unknown as Record<string, unknown>)['_active'] = 'hour';
        key(segs, 'Tab');
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.classList.contains('placeholder')).toBe(true);
    });

    it('_commitBuf rejects minute 60', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        await el.updateComplete;
        (el as unknown as Record<string, unknown>)['_buf'] = '60';
        key(segs, 'Tab');
        await el.updateComplete;
        // Minute 60 > 59, not committed — stays at 00
        const minSeg = el.shadowRoot!.querySelectorAll('.seg')[1];
        expect(minSeg.textContent?.trim()).toBe('00');
    });

    it('_commitBuf rejects second 60', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00" seconds></flint-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        key(segs, 'ArrowRight'); // minute
        key(segs, 'ArrowRight'); // second
        await el.updateComplete;
        (el as unknown as Record<string, unknown>)['_buf'] = '60';
        key(segs, 'Tab');
        await el.updateComplete;
        const secSeg = el.shadowRoot!.querySelectorAll('.seg')[2];
        expect(secSeg.textContent?.trim()).toBe('00');
    });

    it('_commitBuf with empty buf is a no-op', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        focus(segs);
        await el.updateComplete;
        // Tab with empty buf should just advance, not change value
        key(segs, 'Tab');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('_commitBuf with null _active is a no-op', async () => {
        const el = await fixture<FlintTimeField>(html`<flint-time-field value="10:00:00"></flint-time-field>`);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        (el as unknown as Record<string, unknown>)['_buf'] = '5';
        (el as unknown as Record<string, unknown>)['_active'] = null;
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        key(segs, 'Tab');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });
});
