import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-time-picker.js';
import type {
    UiTimeField, UiDigitalClock, UiMultiSectionDigitalClock,
    UiTimeClock, UiTimePicker, UiStaticTimePicker
} from './ui-time-picker.js';

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

    it('shows placeholder text by default', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('HH');
        expect(segs[1].textContent?.trim()).toBe('MM');
    });

    it('parses 12hr value into segments', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field value="14:30:00"></ui-time-field>`);
        await el.updateComplete;
        const segs = el.shadowRoot!.querySelectorAll('.seg');
        expect(segs[0].textContent?.trim()).toBe('02'); // 14 → 2 PM
        expect(segs[1].textContent?.trim()).toBe('30');
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

    it('activates hour on focus', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segs.dispatchEvent(new FocusEvent('focus'));
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelector('.seg');
        expect(hourSeg?.classList.contains('active')).toBe(true);
    });

    it('typing 5 sets hour segment to 05', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field></ui-time-field>`);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segs.dispatchEvent(new FocusEvent('focus'));
        await el.updateComplete;
        segs.dispatchEvent(new KeyboardEvent('keydown', { key: '5', bubbles: true }));
        await el.updateComplete;
        const hourSeg = el.shadowRoot!.querySelectorAll('.seg')[0];
        expect(hourSeg.textContent?.trim()).toBe('05');
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
        segs.dispatchEvent(new FocusEvent('focus'));
        await el.updateComplete;
        setTimeout(() => segs.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
        const ev = await oneEvent(el, 'clear');
        expect(ev).toBeDefined();
    });

    it('disabled field ignores keyboard input', async () => {
        const el = await fixture<UiTimeField>(html`<ui-time-field disabled></ui-time-field>`);
        const spy = vi.fn();
        el.addEventListener('change', spy);
        const segs = el.shadowRoot!.querySelector('.segments') as HTMLElement;
        segs.dispatchEvent(new KeyboardEvent('keydown', { key: '5', bubbles: true }));
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
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
});

// ── UiStaticTimePicker ────────────────────────────────────────────────────────
describe('ui-static-time-picker', () => {
    it('is defined', () => expect(document.createElement('ui-static-time-picker')).toBeInstanceOf(HTMLElement));

    it('renders a multi-section-digital-clock', async () => {
        const el = await fixture<UiStaticTimePicker>(html`<ui-static-time-picker></ui-static-time-picker>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('ui-multi-section-digital-clock')).not.toBeNull();
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
});
