import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-range-slider.js';
import type { FlintRangeSlider } from './flint-range-slider.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function settle(el: FlintRangeSlider, ms = 20) {
    await el.updateComplete;
    await new Promise(r => setTimeout(r, ms));
}

function thumbStart(el: FlintRangeSlider): HTMLInputElement {
    return el.shadowRoot!.querySelector<HTMLInputElement>('input.thumb-start')!;
}

function thumbEnd(el: FlintRangeSlider): HTMLInputElement {
    return el.shadowRoot!.querySelector<HTMLInputElement>('input.thumb-end')!;
}

function trackFill(el: FlintRangeSlider): HTMLElement {
    return el.shadowRoot!.querySelector<HTMLElement>('.track-fill')!;
}

function moveThumb(input: HTMLInputElement, value: number) {
    input.value = String(value);
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
}

// ─── Basic rendering ──────────────────────────────────────────────────────────

describe('FlintRangeSlider — basic rendering', () => {
    let el: FlintRangeSlider;

    beforeEach(async () => {
        el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);
    });

    it('renders two range inputs', () => {
        const inputs = el.shadowRoot!.querySelectorAll<HTMLInputElement>('input[type="range"]');
        expect(inputs.length).toBe(2);
    });

    it('renders a .track-base and .track-fill', () => {
        expect(el.shadowRoot!.querySelector('.track-base')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.track-fill')).not.toBeNull();
    });

    it('start thumb has class thumb-start', () => {
        expect(thumbStart(el).classList.contains('thumb-start')).toBe(true);
    });

    it('end thumb has class thumb-end', () => {
        expect(thumbEnd(el).classList.contains('thumb-end')).toBe(true);
    });

    it('does not render label when label prop is empty', () => {
        expect(el.shadowRoot!.querySelector('label')).toBeNull();
    });

    it('does not render value display when showValue is false', () => {
        expect(el.shadowRoot!.querySelector('.value-display')).toBeNull();
    });
});

// ─── Props: value ─────────────────────────────────────────────────────────────

describe('FlintRangeSlider — value prop', () => {
    it('sets start thumb value from value[0]', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[20, 80] as [number, number]}></flint-range-slider>
        `);
        await settle(el);
        expect(thumbStart(el).value).toBe('20');
    });

    it('sets end thumb value from value[1]', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[20, 80] as [number, number]}></flint-range-slider>
        `);
        await settle(el);
        expect(thumbEnd(el).value).toBe('80');
    });

    it('updates both thumbs when value prop changes', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[10, 90] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        el.value = [30, 60];
        await settle(el);

        expect(thumbStart(el).value).toBe('30');
        expect(thumbEnd(el).value).toBe('60');
    });

    it('defaults to [25, 75] when no value is provided', async () => {
        const el = await fixture<FlintRangeSlider>(html`<flint-range-slider></flint-range-slider>`);
        await settle(el);
        expect(el.value).toEqual([25, 75]);
    });
});

// ─── Props: min / max / step ──────────────────────────────────────────────────

describe('FlintRangeSlider — min / max / step props', () => {
    it('sets min attribute on both inputs', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[50, 150] as [number, number]} .min=${50} .max=${200}></flint-range-slider>
        `);
        await settle(el);
        expect(thumbStart(el).min).toBe('50');
        expect(thumbEnd(el).min).toBe('50');
    });

    it('sets max attribute on both inputs', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[50, 150] as [number, number]} .min=${0} .max=${200}></flint-range-slider>
        `);
        await settle(el);
        expect(thumbStart(el).max).toBe('200');
        expect(thumbEnd(el).max).toBe('200');
    });

    it('sets step attribute on both inputs', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[0, 100] as [number, number]} .step=${10}></flint-range-slider>
        `);
        await settle(el);
        expect(thumbStart(el).step).toBe('10');
        expect(thumbEnd(el).step).toBe('10');
    });

    it('defaults: min=0, max=100, step=1', async () => {
        const el = await fixture<FlintRangeSlider>(html`<flint-range-slider></flint-range-slider>`);
        await settle(el);
        expect(el.min).toBe(0);
        expect(el.max).toBe(100);
        expect(el.step).toBe(1);
    });

    it('clamps values when max is reduced below current end', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        // Reduce max below end value — should clamp end to new max
        el.max = 50;
        await settle(el);

        expect(el.value[1]).toBe(50);
        expect(el.value[0]).toBe(25);
    });

    it('clamps values when min is raised above current start', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[10, 80] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        // Raise min above start value — should clamp start to new min
        el.min = 30;
        await settle(el);

        expect(el.value[0]).toBe(30);
    });

    it('does not fire change event when values are clamped by bounds change', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 90] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        const handler = vi.fn();
        el.addEventListener('flint-range-slider-change', handler);

        el.max = 60;
        await settle(el);

        // Bounds correction is silent — no event
        expect(handler).not.toHaveBeenCalled();
        expect(el.value[1]).toBe(60);
    });
});

// ─── Props: size ──────────────────────────────────────────────────────────────

describe('FlintRangeSlider — size prop', () => {
    it('defaults to size="md"', async () => {
        const el = await fixture<FlintRangeSlider>(html`<flint-range-slider></flint-range-slider>`);
        await settle(el);
        expect(el.size).toBe('md');
        expect(el.getAttribute('size')).toBe('md');
    });

    it('reflects size="sm" to attribute', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider size="sm"></flint-range-slider>
        `);
        await settle(el);
        expect(el.size).toBe('sm');
        expect(el.hasAttribute('size')).toBe(true);
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('reflects size="lg" to attribute', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider size="lg"></flint-range-slider>
        `);
        await settle(el);
        expect(el.size).toBe('lg');
        expect(el.getAttribute('size')).toBe('lg');
    });

    it('updates size attribute when size prop changes', async () => {
        const el = await fixture<FlintRangeSlider>(html`<flint-range-slider></flint-range-slider>`);
        await settle(el);

        el.size = 'lg';
        await settle(el);

        expect(el.getAttribute('size')).toBe('lg');
    });
});

// ─── Props: label ─────────────────────────────────────────────────────────────

describe('FlintRangeSlider — label prop', () => {
    it('renders a label element when label is set', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider label="Price range"></flint-range-slider>
        `);
        await settle(el);
        const label = el.shadowRoot!.querySelector('label');
        expect(label).not.toBeNull();
        expect(label!.textContent!.trim()).toBe('Price range');
    });

    it('sets aria-label on start thumb using label', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider label="Volume"></flint-range-slider>
        `);
        await settle(el);
        expect(thumbStart(el).getAttribute('aria-label')).toBe('Volume start');
        expect(thumbEnd(el).getAttribute('aria-label')).toBe('Volume end');
    });

    it('sets generic aria-label when no label prop', async () => {
        const el = await fixture<FlintRangeSlider>(html`<flint-range-slider></flint-range-slider>`);
        await settle(el);
        expect(thumbStart(el).getAttribute('aria-label')).toBe('Range start');
        expect(thumbEnd(el).getAttribute('aria-label')).toBe('Range end');
    });
});

// ─── Props: showValue ─────────────────────────────────────────────────────────

describe('FlintRangeSlider — showValue prop', () => {
    it('renders .value-display when showValue=true via attribute', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[20, 80] as [number, number]} show-value></flint-range-slider>
        `);
        await settle(el);
        const display = el.shadowRoot!.querySelector('.value-display');
        expect(display).not.toBeNull();
        expect(display!.textContent).toContain('20');
        expect(display!.textContent).toContain('80');
    });

    it('renders .value-display when showValue=true via property', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[20, 80] as [number, number]} .showValue=${true}></flint-range-slider>
        `);
        await settle(el);
        const display = el.shadowRoot!.querySelector('.value-display');
        expect(display).not.toBeNull();
    });

    it('updates value display after thumb moves', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[20, 80] as [number, number]} .showValue=${true}></flint-range-slider>
        `);
        await settle(el);

        moveThumb(thumbStart(el), 35);
        await settle(el);

        const display = el.shadowRoot!.querySelector('.value-display');
        expect(display).not.toBeNull();
        expect(display!.textContent).toContain('35');
    });
});

// ─── Props: disabled ─────────────────────────────────────────────────────────

describe('FlintRangeSlider — disabled prop', () => {
    let el: FlintRangeSlider;

    beforeEach(async () => {
        el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]} disabled></flint-range-slider>
        `);
        await settle(el);
    });

    it('sets disabled attribute on both inputs', () => {
        expect(thumbStart(el).disabled).toBe(true);
        expect(thumbEnd(el).disabled).toBe(true);
    });

    it('reflects disabled on the host element', () => {
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('applies disabled-label class to label when disabled', async () => {
        const withLabel = await fixture<FlintRangeSlider>(html`
            <flint-range-slider label="Volume" disabled></flint-range-slider>
        `);
        await settle(withLabel);
        const label = withLabel.shadowRoot!.querySelector('label');
        expect(label!.classList.contains('disabled-label')).toBe(true);
    });

    it('label does not have disabled-label class when not disabled', async () => {
        const notDisabled = await fixture<FlintRangeSlider>(html`
            <flint-range-slider label="Volume"></flint-range-slider>
        `);
        await settle(notDisabled);
        const label = notDisabled.shadowRoot!.querySelector('label');
        expect(label!.classList.contains('disabled-label')).toBe(false);
    });
});

// ─── flint-range-slider-change event ────────────────────────────────────────────

describe('FlintRangeSlider — flint-range-slider-change event', () => {
    let el: FlintRangeSlider;

    beforeEach(async () => {
        el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);
    });

    it('fires flint-range-slider-change event when start thumb moves', () => {
        const handler = vi.fn();
        el.addEventListener('flint-range-slider-change', handler);
        moveThumb(thumbStart(el), 30);
        expect(handler).toHaveBeenCalledOnce();
    });

    it('fires flint-range-slider-change event when end thumb moves', () => {
        const handler = vi.fn();
        el.addEventListener('flint-range-slider-change', handler);
        moveThumb(thumbEnd(el), 80);
        expect(handler).toHaveBeenCalledOnce();
    });

    it('event detail contains updated [start, end] array', () => {
        const handler = vi.fn();
        el.addEventListener('flint-range-slider-change', handler);
        moveThumb(thumbStart(el), 40);
        expect(handler.mock.calls[0][0].detail.value).toEqual([40, 75]);
    });

    it('event detail reflects end thumb move', () => {
        const handler = vi.fn();
        el.addEventListener('flint-range-slider-change', handler);
        moveThumb(thumbEnd(el), 90);
        expect(handler.mock.calls[0][0].detail.value).toEqual([25, 90]);
    });

    it('event bubbles up to parent', () => {
        const handler = vi.fn();
        document.addEventListener('flint-range-slider-change', handler);
        moveThumb(thumbStart(el), 30);
        document.removeEventListener('flint-range-slider-change', handler);
        expect(handler).toHaveBeenCalledOnce();
    });

    it('updates value prop after start thumb moves', () => {
        moveThumb(thumbStart(el), 40);
        expect(el.value).toEqual([40, 75]);
    });

    it('updates value prop after end thumb moves', () => {
        moveThumb(thumbEnd(el), 85);
        expect(el.value).toEqual([25, 85]);
    });
});

// ─── Thumb crossing / swap ────────────────────────────────────────────────────

describe('FlintRangeSlider — thumb crossing swaps values', () => {
    it('dragging start past end swaps the values', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        moveThumb(thumbStart(el), 90);

        expect(el.value).toEqual([75, 90]);
    });

    it('dragging end below start swaps the values', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        moveThumb(thumbEnd(el), 10);

        expect(el.value).toEqual([10, 25]);
    });

    it('value is always [lower, higher] after a cross', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[30, 70] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        moveThumb(thumbStart(el), 80);

        expect(el.value[0]).toBeLessThanOrEqual(el.value[1]);
    });

    it('change event fires with swapped values on cross', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        const handler = vi.fn();
        el.addEventListener('flint-range-slider-change', handler);

        moveThumb(thumbEnd(el), 10);

        expect(handler.mock.calls[0][0].detail.value).toEqual([10, 25]);
    });

    it('moving start to exactly end position does not swap', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        moveThumb(thumbStart(el), 75);
        // raw === end: not strictly greater, so no swap — [75, 75] is valid
        expect(el.value[0]).toBeLessThanOrEqual(el.value[1]);
    });
});

// ─── Step snapping ────────────────────────────────────────────────────────────

describe('FlintRangeSlider — step snapping', () => {
    it('snaps start value to nearest step', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[0, 100] as [number, number]} .step=${10}></flint-range-slider>
        `);
        await settle(el);

        moveThumb(thumbStart(el), 13);
        expect(el.value[0]).toBe(10);
    });

    it('snaps end value to nearest step', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[0, 100] as [number, number]} .step=${10}></flint-range-slider>
        `);
        await settle(el);

        moveThumb(thumbEnd(el), 87);
        expect(el.value[1]).toBe(90);
    });
});

// ─── Track fill positioning ───────────────────────────────────────────────────

describe('FlintRangeSlider — track fill positioning', () => {
    it('track fill left matches start thumb percentage', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]} .min=${0} .max=${100}></flint-range-slider>
        `);
        await settle(el);
        expect(trackFill(el).style.left).toBe('25%');
    });

    it('track fill width spans from start to end', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]} .min=${0} .max=${100}></flint-range-slider>
        `);
        await settle(el);
        expect(trackFill(el).style.width).toBe('50%');
    });

    it('track fill updates after start thumb moves', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        moveThumb(thumbStart(el), 50);
        await settle(el);

        expect(trackFill(el).style.left).toBe('50%');
        expect(trackFill(el).style.width).toBe('25%');
    });

    it('track fill updates after end thumb moves', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        moveThumb(thumbEnd(el), 100);
        await settle(el);

        expect(trackFill(el).style.width).toBe('75%');
    });

    it('track fill works correctly with custom min/max', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[500, 1500] as [number, number]} .min=${0} .max=${2000}></flint-range-slider>
        `);
        await settle(el);
        expect(trackFill(el).style.left).toBe('25%');
        expect(trackFill(el).style.width).toBe('50%');
    });
});

// ─── on-top class (thumb z-index) ─────────────────────────────────────────────

describe('FlintRangeSlider — on-top class', () => {
    it('start thumb does not have on-top class by default (end starts on top)', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);
        // _activeThumb defaults to 'end' and start !== max, so on-top should be false
        expect(thumbStart(el).classList.contains('on-top')).toBe(false);
    });

    it('start thumb gets on-top class after pointerdown on start', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        thumbStart(el).dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
        await settle(el);

        expect(thumbStart(el).classList.contains('on-top')).toBe(true);
    });

    it('end thumb pointerdown sets activeThumb to end (removes on-top from start)', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        // First make start active
        thumbStart(el).dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
        await settle(el);
        expect(thumbStart(el).classList.contains('on-top')).toBe(true);

        // Then make end active — start should lose on-top
        thumbEnd(el).dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
        await settle(el);
        expect(thumbStart(el).classList.contains('on-top')).toBe(false);
    });

    it('start thumb gets on-top class when start value equals max', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[100, 100] as [number, number]}></flint-range-slider>
        `);
        await settle(el);
        // start === max, so on-top should be true to keep it reachable
        expect(thumbStart(el).classList.contains('on-top')).toBe(true);
    });
});

// ─── Accessibility ────────────────────────────────────────────────────────────

describe('FlintRangeSlider — accessibility', () => {
    let el: FlintRangeSlider;

    beforeEach(async () => {
        el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[30, 70] as [number, number]} .min=${0} .max=${100}></flint-range-slider>
        `);
        await settle(el);
    });

    it('start thumb has aria-valuemin', () => {
        expect(thumbStart(el).getAttribute('aria-valuemin')).toBe('0');
    });

    it('start thumb has aria-valuemax', () => {
        expect(thumbStart(el).getAttribute('aria-valuemax')).toBe('100');
    });

    it('start thumb has aria-valuenow matching current start', () => {
        expect(thumbStart(el).getAttribute('aria-valuenow')).toBe('30');
    });

    it('end thumb has aria-valuenow matching current end', () => {
        expect(thumbEnd(el).getAttribute('aria-valuenow')).toBe('70');
    });

    it('aria-valuenow updates after thumb moves', async () => {
        moveThumb(thumbStart(el), 45);
        await settle(el);
        expect(thumbStart(el).getAttribute('aria-valuenow')).toBe('45');
    });
});

// ─── Edge cases ───────────────────────────────────────────────────────────────

describe('FlintRangeSlider — edge cases', () => {
    it('handles min === 0 and max === 0 without NaN', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[0, 0] as [number, number]} .min=${0} .max=${0}></flint-range-slider>
        `);
        await settle(el);
        const fill = trackFill(el);
        expect(fill.style.left).not.toContain('NaN');
        expect(fill.style.width).not.toContain('NaN');
    });

    it('clamps start value to min bound via _snap', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]} .min=${10}></flint-range-slider>
        `);
        await settle(el);
        moveThumb(thumbStart(el), 10);
        expect(el.value[0]).toBeGreaterThanOrEqual(10);
    });

    it('does not fire change when value prop is set programmatically', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        const handler = vi.fn();
        el.addEventListener('flint-range-slider-change', handler);

        el.value = [30, 70];
        await settle(el);

        expect(handler).not.toHaveBeenCalled();
    });

    it('renders correctly with value at min and max boundaries', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[0, 100] as [number, number]}></flint-range-slider>
        `);
        await settle(el);
        expect(trackFill(el).style.left).toBe('0%');
        expect(trackFill(el).style.width).toBe('100%');
    });

    it('no change event fired when min/max change but values stay in bounds', async () => {
        const el = await fixture<FlintRangeSlider>(html`
            <flint-range-slider .value=${[25, 75] as [number, number]}></flint-range-slider>
        `);
        await settle(el);

        const handler = vi.fn();
        el.addEventListener('flint-range-slider-change', handler);

        // Widen the range — values stay in bounds, no clamping needed
        el.min = 0;
        el.max = 200;
        await settle(el);

        expect(handler).not.toHaveBeenCalled();
        expect(el.value).toEqual([25, 75]);
    });
});
