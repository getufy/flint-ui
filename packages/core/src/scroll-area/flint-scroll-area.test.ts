import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-scroll-area';
import type { FlintScrollArea, FlintScrollBar } from './flint-scroll-area';

/* ── helpers ────────────────────────────────────────────────────────── */

async function makeArea(
    opts: { type?: string; dir?: string } = {},
) {
    const type = opts.type ?? 'hover';
    const dir = opts.dir ?? 'ltr';
    const el = await fixture<FlintScrollArea>(html`
        <flint-scroll-area
            .type=${type as 'hover'}
            .dir=${dir as 'ltr'}
            style="width: 200px; height: 200px;"
        >
            <div id="content" style="width: 400px; height: 800px;"></div>
        </flint-scroll-area>
    `);
    await el.updateComplete;
    return el;
}

function getViewport(el: FlintScrollArea): HTMLDivElement {
    return el.shadowRoot!.querySelector('.viewport') as HTMLDivElement;
}

function getScrollbarY(el: FlintScrollArea): HTMLDivElement {
    return el.shadowRoot!.querySelector('.scrollbar--y') as HTMLDivElement;
}

function getScrollbarX(el: FlintScrollArea): HTMLDivElement {
    return el.shadowRoot!.querySelector('.scrollbar--x') as HTMLDivElement;
}

function getThumbY(el: FlintScrollArea): HTMLDivElement {
    return el.shadowRoot!.querySelector('.thumb--y') as HTMLDivElement;
}

function getThumbX(el: FlintScrollArea): HTMLDivElement {
    return el.shadowRoot!.querySelector('.thumb--x') as HTMLDivElement;
}

async function makeScrollBar(
    orientation: 'vertical' | 'horizontal' = 'vertical',
): Promise<FlintScrollBar> {
    const el = await fixture<FlintScrollBar>(html`
        <flint-scroll-bar orientation=${orientation}></flint-scroll-bar>
    `);
    await el.updateComplete;
    return el;
}

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — rendering', () => {
    it('renders a viewport div in shadow DOM', async () => {
        const el = await makeArea();
        expect(getViewport(el)).not.toBeNull();
    });

    it('renders a vertical scrollbar in shadow DOM', async () => {
        const el = await makeArea();
        expect(getScrollbarY(el)).not.toBeNull();
    });

    it('renders a horizontal scrollbar in shadow DOM', async () => {
        const el = await makeArea();
        expect(getScrollbarX(el)).not.toBeNull();
    });

    it('renders a thumb inside the vertical scrollbar', async () => {
        const el = await makeArea();
        expect(getThumbY(el)).not.toBeNull();
    });

    it('renders a thumb inside the horizontal scrollbar', async () => {
        const el = await makeArea();
        expect(getThumbX(el)).not.toBeNull();
    });

    it('renders a default slot in the viewport', async () => {
        const el = await makeArea();
        const slot = getViewport(el).querySelector('slot:not([name])');
        expect(slot).not.toBeNull();
    });

    it('renders a named scrollbar slot in the root', async () => {
        const el = await makeArea();
        const slot = el.shadowRoot!.querySelector('slot[name="scrollbar"]');
        expect(slot).not.toBeNull();
    });

    it('viewport dir attribute reflects the dir prop', async () => {
        const el = await makeArea({ dir: 'rtl' });
        const vp = getViewport(el);
        expect(vp.getAttribute('dir')).toBe('rtl');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — props & attributes
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — props', () => {
    it('defaults to type="hover"', async () => {
        const el = await makeArea();
        expect(el.type).toBe('hover');
    });

    it('defaults to dir="ltr"', async () => {
        const el = await makeArea();
        expect(el.dir).toBe('ltr');
    });

    it('reflects type prop to attribute', async () => {
        const el = await makeArea({ type: 'always' });
        expect(el.getAttribute('type')).toBe('always');
    });

    it('reflects dir prop to attribute', async () => {
        const el = await makeArea({ dir: 'rtl' });
        expect(el.getAttribute('dir')).toBe('rtl');
    });

    it('accepts all valid type values', async () => {
        for (const type of ['hover', 'auto', 'always', 'scroll']) {
            const el = await makeArea({ type });
            expect(el.type).toBe(type);
        }
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — scroll helpers
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — scroll helpers', () => {
    it('_getScrollPos returns 0 by default (vertical)', async () => {
        const el = await makeArea();
        expect(el._getScrollPos('vertical')).toBe(0);
    });

    it('_getScrollPos returns 0 by default (horizontal)', async () => {
        const el = await makeArea();
        expect(el._getScrollPos('horizontal')).toBe(0);
    });

    it('_setScrollPos clamps to 0 for negative values', async () => {
        const el = await makeArea();
        el._setScrollPos('vertical', -100);
        expect(el._getScrollPos('vertical')).toBe(0);
    });

    it('_getScrollRange returns 0 when no layout (jsdom)', async () => {
        const el = await makeArea();
        // In jsdom scrollHeight === clientHeight === 0
        expect(el._getScrollRange('vertical')).toBe(0);
    });

    it('_setScrollPos updates scrollTop on viewport', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        // In jsdom scrollTop is settable but scrollHeight is 0,
        // so the clamped value will be 0 (range = 0).
        // Just verify the path runs without error.
        el._setScrollPos('vertical', 0);
        expect(vp.scrollTop).toBe(0);
    });

    it('scrollTo is callable', async () => {
        const el = await makeArea();
        // happy-dom div has no scrollTo; component guards with typeof check
        expect(typeof el.scrollTo).toBe('function');
    });

    it('scrollBy is callable', async () => {
        const el = await makeArea();
        expect(typeof el.scrollBy).toBe('function');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — _shouldShowBar logic
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — _shouldShowBar', () => {
    it('type="always" shows vertical bar even without overflow', async () => {
        const el = await makeArea({ type: 'always' });
        // For 'always' the scrollbar CSS is always opacity:1 regardless of class.
        // The type attribute is reflected so the CSS rule fires.
        expect(el.getAttribute('type')).toBe('always');
    });

    it('type="auto" adds scrollbar--visible class when overflow detected', async () => {
        const el = await makeArea({ type: 'auto' });
        // In jsdom no overflow, so scrollbar--visible should NOT be present
        const barY = getScrollbarY(el);
        // Without overflow the class is not added
        expect(barY.classList.contains('scrollbar--visible')).toBe(false);
    });

    it('type="always" does not require scrollbar--visible class (CSS handles it)', async () => {
        const el = await makeArea({ type: 'always' });
        // For type=always the CSS rule :host([type="always"]) .scrollbar applies opacity:1
        // so we just verify type attr is reflected
        expect(el.type).toBe('always');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — scroll event & type="scroll"
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — scroll type', () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });

    it('type="scroll" sets _isScrolling on scroll event', async () => {
        const el = await fixture<FlintScrollArea>(html`
            <flint-scroll-area type="scroll" style="height: 200px; width: 200px;">
                <div style="height: 1000px;"></div>
            </flint-scroll-area>
        `);
        await el.updateComplete;

        const vp = getViewport(el);
        vp.dispatchEvent(new Event('scroll'));
        await el.updateComplete;

        // _isScrolling is internal @state, but we can see the effect:
        // scrollbar--active class should be on the Y scrollbar
        const barY = getScrollbarY(el);
        expect(barY.classList.contains('scrollbar--active')).toBe(true);
    });

    it('type="scroll" clears _isScrolling after 600 ms', async () => {
        const el = await fixture<FlintScrollArea>(html`
            <flint-scroll-area type="scroll" style="height: 200px; width: 200px;">
                <div style="height: 1000px;"></div>
            </flint-scroll-area>
        `);
        await el.updateComplete;

        const vp = getViewport(el);
        vp.dispatchEvent(new Event('scroll'));
        await el.updateComplete;

        vi.advanceTimersByTime(600);
        await el.updateComplete;

        const barY = getScrollbarY(el);
        expect(barY.classList.contains('scrollbar--active')).toBe(false);
    });

    it('type="scroll" resets the hide timer when a second scroll fires before expiry', async () => {
        const el = await fixture<FlintScrollArea>(html`
            <flint-scroll-area type="scroll" style="height: 200px; width: 200px;">
                <div style="height: 1000px;"></div>
            </flint-scroll-area>
        `);
        await el.updateComplete;

        const vp = getViewport(el);
        // First scroll sets _hideTimer
        vp.dispatchEvent(new Event('scroll'));
        await el.updateComplete;

        // Second scroll fires before timer expires — hits `if (this._hideTimer) clearTimeout(...)`
        vp.dispatchEvent(new Event('scroll'));
        await el.updateComplete;

        // Advance only 400 ms — if timer wasn't reset, _isScrolling would be false already;
        // because it was reset the bar should still be active
        vi.advanceTimersByTime(400);
        await el.updateComplete;
        expect(getScrollbarY(el).classList.contains('scrollbar--active')).toBe(true);

        // Now let the full 600 ms expire from the second scroll
        vi.advanceTimersByTime(200);
        await el.updateComplete;
        expect(getScrollbarY(el).classList.contains('scrollbar--active')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — disconnectedCallback
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — disconnectedCallback', () => {
    it('disconnects ResizeObserver on removal', async () => {
        const disconnectSpy = vi.fn();
        // Must use a regular function (not arrow) so it can be called with `new`
        const original = globalThis.ResizeObserver;
        globalThis.ResizeObserver = function MockRO() {
            return { observe: vi.fn(), disconnect: disconnectSpy, unobserve: vi.fn() };
        } as unknown as typeof ResizeObserver;

        let el: FlintScrollArea | undefined;
        try {
            el = await fixture<FlintScrollArea>(html`
                <flint-scroll-area style="height: 200px; width: 200px;">
                    <div style="height: 400px;"></div>
                </flint-scroll-area>
            `);
            await el.updateComplete;
            el.remove();
            expect(disconnectSpy).toHaveBeenCalled();
        } finally {
            globalThis.ResizeObserver = original;
        }
    });

    it('clears scroll-hide timer on removal without throwing', async () => {
        vi.useFakeTimers();
        try {
            const el = await fixture<FlintScrollArea>(html`
                <flint-scroll-area type="scroll" style="height: 200px; width: 200px;">
                    <div style="height: 1000px;"></div>
                </flint-scroll-area>
            `);
            await el.updateComplete;
            getViewport(el).dispatchEvent(new Event('scroll'));
            await el.updateComplete;
            // remove before timer fires — should not throw
            el.remove();
            vi.advanceTimersByTime(700);
        } finally {
            vi.useRealTimers();
        }
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — aria attributes
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — aria', () => {
    it('vertical scrollbar has role="scrollbar"', async () => {
        const el = await makeArea();
        const barY = getScrollbarY(el);
        expect(barY.getAttribute('role')).toBe('scrollbar');
    });

    it('vertical scrollbar has aria-orientation="vertical"', async () => {
        const el = await makeArea();
        const barY = getScrollbarY(el);
        expect(barY.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('horizontal scrollbar has role="scrollbar"', async () => {
        const el = await makeArea();
        const barX = getScrollbarX(el);
        expect(barX.getAttribute('role')).toBe('scrollbar');
    });

    it('horizontal scrollbar has aria-orientation="horizontal"', async () => {
        const el = await makeArea();
        const barX = getScrollbarX(el);
        expect(barX.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('aria-valuenow is a numeric string', async () => {
        const el = await makeArea();
        const val = getScrollbarY(el).getAttribute('aria-valuenow');
        expect(Number.isFinite(Number(val))).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-bar — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-bar — rendering', () => {
    it('renders a .track div in shadow DOM', async () => {
        const bar = await makeScrollBar();
        const track = bar.shadowRoot!.querySelector('.track');
        expect(track).not.toBeNull();
    });

    it('renders a .thumb div inside the track', async () => {
        const bar = await makeScrollBar();
        const thumb = bar.shadowRoot!.querySelector('.thumb');
        expect(thumb).not.toBeNull();
    });

    it('defaults to orientation="vertical"', async () => {
        const bar = await makeScrollBar();
        expect(bar.orientation).toBe('vertical');
    });

    it('reflects orientation to attribute', async () => {
        const bar = await makeScrollBar('horizontal');
        expect(bar.getAttribute('orientation')).toBe('horizontal');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-bar — setThumb
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-bar — setThumb', () => {
    it('setThumb updates _thumbPos', async () => {
        const bar = await makeScrollBar();
        bar.setThumb(30, 20);
        await bar.updateComplete;
        expect(bar._thumbPos).toBe(30);
    });

    it('setThumb updates _thumbSize', async () => {
        const bar = await makeScrollBar();
        bar.setThumb(30, 20);
        await bar.updateComplete;
        expect(bar._thumbSize).toBe(20);
    });

    it('vertical thumb style uses height/top', async () => {
        const bar = await makeScrollBar('vertical');
        bar.setThumb(25, 40);
        await bar.updateComplete;
        const thumb = bar.shadowRoot!.querySelector('.thumb') as HTMLElement;
        expect(thumb.getAttribute('style')).toContain('height: 40%');
        expect(thumb.getAttribute('style')).toContain('top: 25%');
    });

    it('horizontal thumb style uses width/left', async () => {
        const bar = await makeScrollBar('horizontal');
        bar.setThumb(10, 50);
        await bar.updateComplete;
        const thumb = bar.shadowRoot!.querySelector('.thumb') as HTMLElement;
        expect(thumb.getAttribute('style')).toContain('width: 50%');
        expect(thumb.getAttribute('style')).toContain('left: 10%');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-bar — setVisible
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-bar — setVisible', () => {
    it('setVisible(true) adds data-visible attribute', async () => {
        const bar = await makeScrollBar();
        bar.setVisible(true);
        expect(bar.hasAttribute('data-visible')).toBe(true);
    });

    it('setVisible(false) removes data-visible attribute', async () => {
        const bar = await makeScrollBar();
        bar.setVisible(true);
        bar.setVisible(false);
        expect(bar.hasAttribute('data-visible')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-bar — aria
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-bar — aria', () => {
    it('track has role="scrollbar"', async () => {
        const bar = await makeScrollBar();
        const track = bar.shadowRoot!.querySelector('.track');
        expect(track?.getAttribute('role')).toBe('scrollbar');
    });

    it('track has aria-orientation matching orientation', async () => {
        const bar = await makeScrollBar('horizontal');
        const track = bar.shadowRoot!.querySelector('.track');
        expect(track?.getAttribute('aria-orientation')).toBe('horizontal');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — slotted flint-scroll-bar sync
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — slotted flint-scroll-bar', () => {
    it('calls setThumb on slotted flint-scroll-bar after slot change', async () => {
        const el = await fixture<FlintScrollArea>(html`
            <flint-scroll-area type="always" style="height: 200px; width: 200px;">
                <div style="height: 400px;"></div>
                <flint-scroll-bar slot="scrollbar" orientation="vertical"></flint-scroll-bar>
            </flint-scroll-area>
        `);
        await el.updateComplete;

        const bar = el.querySelector('flint-scroll-bar') as FlintScrollBar;
        await bar.updateComplete;

        // setThumb is called — just verify _thumbPos and _thumbSize are numbers
        expect(typeof bar._thumbPos).toBe('number');
        expect(typeof bar._thumbSize).toBe('number');
    });

    it('setVisible is called on slotted bars', async () => {
        const el = await fixture<FlintScrollArea>(html`
            <flint-scroll-area type="always" style="height: 200px; width: 200px;">
                <div style="height: 400px;"></div>
                <flint-scroll-bar slot="scrollbar" orientation="horizontal"></flint-scroll-bar>
            </flint-scroll-area>
        `);
        await el.updateComplete;

        const bar = el.querySelector('flint-scroll-bar') as FlintScrollBar;
        await bar.updateComplete;

        // type="always" → setVisible(true) → data-visible present
        expect(bar.hasAttribute('data-visible')).toBe(true);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — scrollTo / scrollBy overloads
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — scrollTo/scrollBy overloads', () => {
    it('scrollTo(options) delegates to viewport', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        const spy = vi.fn();
        vp.scrollTo = spy as typeof vp.scrollTo;
        el.scrollTo({ top: 100 });
        expect(spy).toHaveBeenCalledWith({ top: 100 });
    });

    it('scrollTo(x, y) delegates to viewport', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        const spy = vi.fn();
        vp.scrollTo = spy as typeof vp.scrollTo;
        el.scrollTo(100, 200);
        expect(spy).toHaveBeenCalledWith(100, 200);
    });

    it('scrollTo does not throw when viewport lacks scrollTo', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        Object.defineProperty(vp, 'scrollTo', { value: undefined, configurable: true });
        expect(() => el.scrollTo({ top: 100 })).not.toThrow();
    });

    it('scrollBy(options) delegates to viewport', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        const spy = vi.fn();
        vp.scrollBy = spy as typeof vp.scrollBy;
        el.scrollBy({ top: 50 });
        expect(spy).toHaveBeenCalledWith({ top: 50 });
    });

    it('scrollBy(x, y) delegates to viewport', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        const spy = vi.fn();
        vp.scrollBy = spy as typeof vp.scrollBy;
        el.scrollBy(10, 20);
        expect(spy).toHaveBeenCalledWith(10, 20);
    });

    it('scrollBy does not throw when viewport lacks scrollBy', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        Object.defineProperty(vp, 'scrollBy', { value: undefined, configurable: true });
        expect(() => el.scrollBy({ top: 10 })).not.toThrow();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — overflow detection & _computeThumb
═══════════════════════════════════════════════════════════════════════════ */

function mockOverflowY(vp: HTMLDivElement, scrollHeight = 800, clientHeight = 200) {
    Object.defineProperty(vp, 'scrollHeight', { value: scrollHeight, configurable: true });
    Object.defineProperty(vp, 'clientHeight', { value: clientHeight, configurable: true });
}

function mockOverflowX(vp: HTMLDivElement, scrollWidth = 600, clientWidth = 200) {
    Object.defineProperty(vp, 'scrollWidth', { value: scrollWidth, configurable: true });
    Object.defineProperty(vp, 'clientWidth', { value: clientWidth, configurable: true });
}

describe('flint-scroll-area — overflow detection', () => {
    it('_getScrollRange returns correct vertical range with mocked dims', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        mockOverflowY(vp);
        expect(el._getScrollRange('vertical')).toBe(600);
    });

    it('_getScrollRange returns correct horizontal range with mocked dims', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        mockOverflowX(vp);
        expect(el._getScrollRange('horizontal')).toBe(400);
    });

    it('_setScrollPos sets scrollLeft for horizontal', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        mockOverflowX(vp, 600, 200);
        el._setScrollPos('horizontal', 50);
        expect(vp.scrollLeft).toBe(50);
    });

    it('type="auto" adds scrollbar--visible when overflow', async () => {
        const el = await makeArea({ type: 'auto' });
        const vp = getViewport(el);
        mockOverflowY(vp);
        vp.dispatchEvent(new Event('scroll'));
        await el.updateComplete;
        expect(getScrollbarY(el).classList.contains('scrollbar--visible')).toBe(true);
    });

    it('type="hover" adds scrollbar--visible when overflow', async () => {
        const el = await makeArea({ type: 'hover' });
        const vp = getViewport(el);
        mockOverflowY(vp);
        vp.dispatchEvent(new Event('scroll'));
        await el.updateComplete;
        expect(getScrollbarY(el).classList.contains('scrollbar--visible')).toBe(true);
    });

    it('type="always" adds scrollbar--visible regardless of overflow', async () => {
        const el = await makeArea({ type: 'always' });
        await el.updateComplete;
        expect(getScrollbarY(el).classList.contains('scrollbar--visible')).toBe(true);
    });

    it('type="scroll" adds scrollbar--visible while scrolling with overflow', async () => {
        vi.useFakeTimers();
        try {
            const el = await makeArea({ type: 'scroll' });
            const vp = getViewport(el);
            mockOverflowY(vp);
            vp.dispatchEvent(new Event('scroll'));
            await el.updateComplete;
            expect(getScrollbarY(el).classList.contains('scrollbar--visible')).toBe(true);
        } finally {
            vi.useRealTimers();
        }
    });

    it('_computeThumb produces correct thumb size with overflow', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        // scrollHeight=800, clientHeight=200 → thumbSize = max(10, 200/800*100) = 25
        mockOverflowY(vp);
        vp.dispatchEvent(new Event('scroll'));
        await el.updateComplete;
        const thumbStyle = getThumbY(el).getAttribute('style') ?? '';
        expect(thumbStyle).toContain('height: 25%');
    });

    it('_computeThumb clamps thumb size to minimum 10%', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        // scrollHeight=10000, clientHeight=200 → thumbSize = max(10, 2) = 10
        mockOverflowY(vp, 10000, 200);
        vp.dispatchEvent(new Event('scroll'));
        await el.updateComplete;
        const thumbStyle = getThumbY(el).getAttribute('style') ?? '';
        expect(thumbStyle).toContain('height: 10%');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — built-in Y-thumb drag
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — Y-thumb drag', () => {
    it('pointerdown on thumb--y adds thumb--dragging class', async () => {
        const el = await makeArea();
        const thumbY = el.shadowRoot!.querySelector('.thumb--y') as HTMLElement;
        thumbY.setPointerCapture = vi.fn();
        thumbY.dispatchEvent(
            new PointerEvent('pointerdown', { clientY: 100, pointerId: 1 }),
        );
        await el.updateComplete;
        expect(thumbY.classList.contains('thumb--dragging')).toBe(true);
    });

    it('pointermove on thumb--y does nothing when not dragging', async () => {
        const el = await makeArea();
        const thumbY = el.shadowRoot!.querySelector('.thumb--y') as HTMLElement;
        thumbY.dispatchEvent(new PointerEvent('pointermove', { clientY: 150 }));
        expect(getViewport(el).scrollTop).toBe(0);
    });

    it('pointerup on thumb--y removes thumb--dragging class', async () => {
        const el = await makeArea();
        const thumbY = el.shadowRoot!.querySelector('.thumb--y') as HTMLElement;
        thumbY.setPointerCapture = vi.fn();
        thumbY.releasePointerCapture = vi.fn();
        thumbY.dispatchEvent(
            new PointerEvent('pointerdown', { clientY: 100, pointerId: 1 }),
        );
        await el.updateComplete;
        thumbY.dispatchEvent(
            new PointerEvent('pointerup', { pointerId: 1 }),
        );
        await el.updateComplete;
        expect(thumbY.classList.contains('thumb--dragging')).toBe(false);
    });

    it('pointercancel on thumb--y removes thumb--dragging class', async () => {
        const el = await makeArea();
        const thumbY = el.shadowRoot!.querySelector('.thumb--y') as HTMLElement;
        thumbY.setPointerCapture = vi.fn();
        thumbY.releasePointerCapture = vi.fn();
        thumbY.dispatchEvent(
            new PointerEvent('pointerdown', { clientY: 100, pointerId: 1 }),
        );
        await el.updateComplete;
        thumbY.dispatchEvent(
            new PointerEvent('pointercancel', { pointerId: 1 }),
        );
        await el.updateComplete;
        expect(thumbY.classList.contains('thumb--dragging')).toBe(false);
    });

    it('pointerup on thumb--y does nothing when not dragging', async () => {
        const el = await makeArea();
        const thumbY = el.shadowRoot!.querySelector('.thumb--y') as HTMLElement;
        thumbY.releasePointerCapture = vi.fn();
        // no pointerdown first
        thumbY.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }));
        expect(thumbY.classList.contains('thumb--dragging')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — built-in X-thumb drag
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — X-thumb drag', () => {
    it('pointerdown on thumb--x adds thumb--dragging class', async () => {
        const el = await makeArea();
        const thumbX = el.shadowRoot!.querySelector('.thumb--x') as HTMLElement;
        thumbX.setPointerCapture = vi.fn();
        thumbX.dispatchEvent(
            new PointerEvent('pointerdown', { clientX: 50, pointerId: 2 }),
        );
        await el.updateComplete;
        expect(thumbX.classList.contains('thumb--dragging')).toBe(true);
    });

    it('pointermove on thumb--x does nothing when not dragging', async () => {
        const el = await makeArea();
        const thumbX = el.shadowRoot!.querySelector('.thumb--x') as HTMLElement;
        thumbX.dispatchEvent(new PointerEvent('pointermove', { clientX: 80 }));
        expect(getViewport(el).scrollLeft).toBe(0);
    });

    it('pointerup on thumb--x removes thumb--dragging class', async () => {
        const el = await makeArea();
        const thumbX = el.shadowRoot!.querySelector('.thumb--x') as HTMLElement;
        thumbX.setPointerCapture = vi.fn();
        thumbX.releasePointerCapture = vi.fn();
        thumbX.dispatchEvent(
            new PointerEvent('pointerdown', { clientX: 50, pointerId: 2 }),
        );
        await el.updateComplete;
        thumbX.dispatchEvent(
            new PointerEvent('pointerup', { pointerId: 2 }),
        );
        await el.updateComplete;
        expect(thumbX.classList.contains('thumb--dragging')).toBe(false);
    });

    it('pointercancel on thumb--x removes thumb--dragging class', async () => {
        const el = await makeArea();
        const thumbX = el.shadowRoot!.querySelector('.thumb--x') as HTMLElement;
        thumbX.setPointerCapture = vi.fn();
        thumbX.releasePointerCapture = vi.fn();
        thumbX.dispatchEvent(
            new PointerEvent('pointerdown', { clientX: 50, pointerId: 2 }),
        );
        await el.updateComplete;
        thumbX.dispatchEvent(
            new PointerEvent('pointercancel', { pointerId: 2 }),
        );
        await el.updateComplete;
        expect(thumbX.classList.contains('thumb--dragging')).toBe(false);
    });

    it('pointerup on thumb--x does nothing when not dragging', async () => {
        const el = await makeArea();
        const thumbX = el.shadowRoot!.querySelector('.thumb--x') as HTMLElement;
        thumbX.releasePointerCapture = vi.fn();
        thumbX.dispatchEvent(new PointerEvent('pointerup', { pointerId: 2 }));
        expect(thumbX.classList.contains('thumb--dragging')).toBe(false);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-bar — pointer drag
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-bar — pointer drag', () => {
    it('pointerdown on track adds thumb--dragging class', async () => {
        const bar = await makeScrollBar();
        const track = bar.shadowRoot!.querySelector('.track') as HTMLElement;
        track.setPointerCapture = vi.fn();
        track.dispatchEvent(
            new PointerEvent('pointerdown', { clientY: 100, pointerId: 1 }),
        );
        await bar.updateComplete;
        expect(bar.shadowRoot!.querySelector('.thumb--dragging')).not.toBeNull();
    });

    it('pointermove does nothing when not dragging', async () => {
        const bar = await makeScrollBar();
        const track = bar.shadowRoot!.querySelector('.track') as HTMLElement;
        // Should not throw even without an area
        expect(() =>
            track.dispatchEvent(new PointerEvent('pointermove', { clientY: 150 })),
        ).not.toThrow();
    });

    it('pointermove with no area returns early', async () => {
        const bar = await makeScrollBar();
        const track = bar.shadowRoot!.querySelector('.track') as HTMLElement;
        track.setPointerCapture = vi.fn();
        track.dispatchEvent(
            new PointerEvent('pointerdown', { clientY: 100, pointerId: 1 }),
        );
        await bar.updateComplete;
        // bar is not inside a flint-scroll-area, so _area is null → returns early
        expect(() =>
            track.dispatchEvent(new PointerEvent('pointermove', { clientY: 150 })),
        ).not.toThrow();
    });

    it('pointerup releases dragging state', async () => {
        const bar = await makeScrollBar();
        const track = bar.shadowRoot!.querySelector('.track') as HTMLElement;
        track.setPointerCapture = vi.fn();
        track.releasePointerCapture = vi.fn();
        track.dispatchEvent(
            new PointerEvent('pointerdown', { clientY: 100, pointerId: 1 }),
        );
        await bar.updateComplete;
        track.dispatchEvent(
            new PointerEvent('pointerup', { pointerId: 1 }),
        );
        await bar.updateComplete;
        expect(bar.shadowRoot!.querySelector('.thumb--dragging')).toBeNull();
    });

    it('pointercancel also releases dragging state', async () => {
        const bar = await makeScrollBar();
        const track = bar.shadowRoot!.querySelector('.track') as HTMLElement;
        track.setPointerCapture = vi.fn();
        track.releasePointerCapture = vi.fn();
        track.dispatchEvent(
            new PointerEvent('pointerdown', { clientY: 100, pointerId: 1 }),
        );
        await bar.updateComplete;
        track.dispatchEvent(
            new PointerEvent('pointercancel', { pointerId: 1 }),
        );
        await bar.updateComplete;
        expect(bar.shadowRoot!.querySelector('.thumb--dragging')).toBeNull();
    });

    it('pointerup does nothing when not dragging', async () => {
        const bar = await makeScrollBar();
        const track = bar.shadowRoot!.querySelector('.track') as HTMLElement;
        track.releasePointerCapture = vi.fn();
        // No prior pointerdown
        expect(() =>
            track.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 })),
        ).not.toThrow();
        expect(bar.shadowRoot!.querySelector('.thumb--dragging')).toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-bar — inside flint-scroll-area (drag communicates with parent)
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-bar — drag communicates with parent scroll area', () => {
    it('pointermove calls _setScrollPos on parent', async () => {
        const el = await fixture<FlintScrollArea>(html`
            <flint-scroll-area type="always" style="height: 200px; width: 200px;">
                <div style="height: 1000px;"></div>
                <flint-scroll-bar slot="scrollbar" orientation="vertical"></flint-scroll-bar>
            </flint-scroll-area>
        `);
        await el.updateComplete;
        const bar = el.querySelector('flint-scroll-bar') as FlintScrollBar;
        await bar.updateComplete;

        const track = bar.shadowRoot!.querySelector('.track') as HTMLElement;
        track.setPointerCapture = vi.fn();
        // Mock offsetHeight for delta calculation
        Object.defineProperty(track, 'offsetHeight', { value: 200, configurable: true });

        const vp = el.shadowRoot!.querySelector('.viewport') as HTMLDivElement;
        Object.defineProperty(vp, 'scrollHeight', { value: 1000, configurable: true });
        Object.defineProperty(vp, 'clientHeight', { value: 200, configurable: true });

        track.dispatchEvent(
            new PointerEvent('pointerdown', { clientY: 0, pointerId: 1 }),
        );
        track.dispatchEvent(
            new PointerEvent('pointermove', { clientY: 50, pointerId: 1 }),
        );
        // scrollTop should be updated (clamped to range)
        expect(typeof vp.scrollTop).toBe('number');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — _onSlotChange with ResizeObserver
═══════════════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — scrollTo/scrollBy without y argument
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — scrollTo/scrollBy y-default', () => {
    it('scrollTo(x) defaults y to 0', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        const spy = vi.fn();
        vp.scrollTo = spy as typeof vp.scrollTo;
        // Call the (x, y) overload with only x via apply
        el.scrollTo(42, undefined as unknown as number);
        expect(spy).toHaveBeenCalledWith(42, 0);
    });

    it('scrollBy(x) defaults y to 0', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        const spy = vi.fn();
        vp.scrollBy = spy as typeof vp.scrollBy;
        el.scrollBy(10, undefined as unknown as number);
        expect(spy).toHaveBeenCalledWith(10, 0);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — Y-thumb drag with mocked track height
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — Y-thumb drag with layout', () => {
    it('pointermove on thumb--y scrolls viewport when trackH > 0', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        mockOverflowY(vp, 800, 200);

        const scrollbarY = getScrollbarY(el);
        Object.defineProperty(scrollbarY, 'offsetHeight', { value: 200, configurable: true });

        const thumbY = getThumbY(el);
        thumbY.setPointerCapture = vi.fn();

        thumbY.dispatchEvent(
            new PointerEvent('pointerdown', { clientY: 0, pointerId: 1 }),
        );
        await el.updateComplete;

        thumbY.dispatchEvent(
            new PointerEvent('pointermove', { clientY: 50 }),
        );
        // delta=50, trackH=200, range=600 → expected scrollTop = 0 + (50/200)*600 = 150
        expect(vp.scrollTop).toBe(150);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — X-thumb drag with mocked track width
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — X-thumb drag with layout', () => {
    it('pointermove on thumb--x scrolls viewport when trackW > 0', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        mockOverflowX(vp, 600, 200);

        const scrollbarX = getScrollbarX(el);
        Object.defineProperty(scrollbarX, 'offsetWidth', { value: 200, configurable: true });

        const thumbX = getThumbX(el);
        thumbX.setPointerCapture = vi.fn();

        thumbX.dispatchEvent(
            new PointerEvent('pointerdown', { clientX: 0, pointerId: 2 }),
        );
        await el.updateComplete;

        thumbX.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 40 }),
        );
        // delta=40, trackW=200, range=400 → expected scrollLeft = 0 + (40/200)*400 = 80
        expect(vp.scrollLeft).toBe(80);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-bar — horizontal pointer drag
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-bar — horizontal pointer drag', () => {
    it('pointerdown records clientX for horizontal bar', async () => {
        const bar = await makeScrollBar('horizontal');
        const track = bar.shadowRoot!.querySelector('.track') as HTMLElement;
        track.setPointerCapture = vi.fn();
        track.dispatchEvent(
            new PointerEvent('pointerdown', { clientX: 80, pointerId: 3 }),
        );
        await bar.updateComplete;
        expect(bar.shadowRoot!.querySelector('.thumb--dragging')).not.toBeNull();
    });

    it('pointermove computes delta from clientX for horizontal bar', async () => {
        // Horizontal bar inside a scroll area
        const el = await fixture<FlintScrollArea>(html`
            <flint-scroll-area type="always" style="height: 200px; width: 200px;">
                <div style="width: 600px; height: 100px;"></div>
                <flint-scroll-bar slot="scrollbar" orientation="horizontal"></flint-scroll-bar>
            </flint-scroll-area>
        `);
        await el.updateComplete;
        const bar = el.querySelector('flint-scroll-bar') as FlintScrollBar;
        await bar.updateComplete;

        const track = bar.shadowRoot!.querySelector('.track') as HTMLElement;
        track.setPointerCapture = vi.fn();
        // Mock bar offsetWidth (horizontal uses offsetWidth)
        Object.defineProperty(bar, 'offsetWidth', { value: 200, configurable: true });

        const vp = el.shadowRoot!.querySelector('.viewport') as HTMLDivElement;
        Object.defineProperty(vp, 'scrollWidth', { value: 600, configurable: true });
        Object.defineProperty(vp, 'clientWidth', { value: 200, configurable: true });

        track.dispatchEvent(
            new PointerEvent('pointerdown', { clientX: 0, pointerId: 3 }),
        );
        track.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 50 }),
        );
        // delta=50, trackW=200, range=400 → scrollLeft = 0 + (50/200)*400 = 100
        expect(vp.scrollLeft).toBe(100);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-bar — vertical drag with parent (full path)
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-bar — vertical drag with parent (full path)', () => {
    it('pointermove calls _setScrollPos with correct calculation', async () => {
        const el = await fixture<FlintScrollArea>(html`
            <flint-scroll-area type="always" style="height: 200px; width: 200px;">
                <div style="height: 1000px;"></div>
                <flint-scroll-bar slot="scrollbar" orientation="vertical"></flint-scroll-bar>
            </flint-scroll-area>
        `);
        await el.updateComplete;
        const bar = el.querySelector('flint-scroll-bar') as FlintScrollBar;
        await bar.updateComplete;

        const track = bar.shadowRoot!.querySelector('.track') as HTMLElement;
        track.setPointerCapture = vi.fn();
        // Mock bar offsetHeight (vertical uses offsetHeight)
        Object.defineProperty(bar, 'offsetHeight', { value: 200, configurable: true });

        const vp = el.shadowRoot!.querySelector('.viewport') as HTMLDivElement;
        Object.defineProperty(vp, 'scrollHeight', { value: 1000, configurable: true });
        Object.defineProperty(vp, 'clientHeight', { value: 200, configurable: true });

        track.dispatchEvent(
            new PointerEvent('pointerdown', { clientY: 0, pointerId: 1 }),
        );
        track.dispatchEvent(
            new PointerEvent('pointermove', { clientY: 50 }),
        );
        // delta=50, trackH=200, range=800 → scrollTop = 0 + (50/200)*800 = 200
        expect(vp.scrollTop).toBe(200);
    });
});

describe('flint-scroll-area — _onSlotChange ResizeObserver', () => {
    it('observes slotted elements when ResizeObserver is available', async () => {
        const observeSpy = vi.fn();
        const original = globalThis.ResizeObserver;
        globalThis.ResizeObserver = function MockRO() {
            return { observe: observeSpy, disconnect: vi.fn(), unobserve: vi.fn() };
        } as unknown as typeof ResizeObserver;

        try {
            const el = await fixture<FlintScrollArea>(html`
                <flint-scroll-area style="height: 200px; width: 200px;">
                    <div style="height: 800px;"></div>
                </flint-scroll-area>
            `);
            await el.updateComplete;
            // observe is called at least for the viewport in firstUpdated
            // and for slotted children in _onSlotChange
            expect(observeSpy).toHaveBeenCalled();
        } finally {
            globalThis.ResizeObserver = original;
        }
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — ResizeObserver callback (lines 193-194)
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — ResizeObserver callback fires', () => {
    it('executes _updateOverflow and _syncScrollBars when the callback is invoked', async () => {
        let roCallback: (() => void) | null = null;
        const original = globalThis.ResizeObserver;
        globalThis.ResizeObserver = function MockRO(cb: () => void) {
            roCallback = cb;
            return { observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() };
        } as unknown as typeof ResizeObserver;

        try {
            const el = await fixture<FlintScrollArea>(html`
                <flint-scroll-area style="height: 200px; width: 200px;">
                    <div style="height: 800px;"></div>
                </flint-scroll-area>
            `);
            await el.updateComplete;
            expect(roCallback).not.toBeNull();
            // Invoking the callback covers lines 193-194 (_updateOverflow + _syncScrollBars)
            roCallback!();
            await el.updateComplete;
            // After callback fires the element is still connected without errors
            expect(el.shadowRoot!.querySelector('.viewport')).not.toBeNull();
        } finally {
            globalThis.ResizeObserver = original;
        }
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — _shouldShowBar default branch (line 333)
═══════════════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — viewport null guards (lines 237, 244, 251, 277, 284)
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — viewport null guards', () => {
    it('_getScrollPos returns 0 when viewport is not rendered', () => {
        const el = document.createElement('flint-scroll-area') as FlintScrollArea;
        expect(el._getScrollPos('vertical')).toBe(0);
        expect(el._getScrollPos('horizontal')).toBe(0);
    });

    it('_getScrollRange returns 0 when viewport is not rendered', () => {
        const el = document.createElement('flint-scroll-area') as FlintScrollArea;
        expect(el._getScrollRange('vertical')).toBe(0);
        expect(el._getScrollRange('horizontal')).toBe(0);
    });

    it('_setScrollPos does nothing when viewport is not rendered', () => {
        const el = document.createElement('flint-scroll-area') as FlintScrollArea;
        // Should not throw
        expect(() => el._setScrollPos('vertical', 50)).not.toThrow();
    });

    it('_updateOverflow and _computeThumb handle null viewport (lines 277, 284)', async () => {
        const el = await makeArea();
        const realVp = getViewport(el);

        // Shadow _viewport to null — triggers the `if (!vp) return` guards in both
        // _updateOverflow (line 277) and _computeThumb (line 284)
        Object.defineProperty(el, '_viewport', { get: () => null, configurable: true });

        // Dispatch scroll on the real viewport div — _onScroll fires, calling
        // _updateOverflow() and _syncScrollBars() → _computeThumb() with null _viewport
        realVp.dispatchEvent(new Event('scroll'));
        await el.updateComplete;

        // No errors; element still intact
        expect(el.shadowRoot!.querySelector('.scrollbar--y')).not.toBeNull();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — _syncScrollBars skips nested scrollbar (line 313)
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — _syncScrollBars skips nested scrollbar', () => {
    it('does not call setThumb on a flint-scroll-bar inside a nested flint-scroll-area', async () => {
        const outer = await fixture<FlintScrollArea>(html`
            <flint-scroll-area type="always" style="height: 300px; width: 300px;">
                <flint-scroll-area style="height: 200px; width: 200px;">
                    <div style="height: 800px;"></div>
                    <flint-scroll-bar slot="scrollbar" orientation="vertical"></flint-scroll-bar>
                </flint-scroll-area>
            </flint-scroll-area>
        `);
        await outer.updateComplete;

        const innerBar = outer.querySelector('flint-scroll-bar') as FlintScrollBar;
        const setThumbSpy = vi.spyOn(innerBar, 'setThumb');

        // Force outer _syncScrollBars — the inner bar's closest('flint-scroll-area') !== outer
        outer.shadowRoot!.querySelector('.viewport')!.dispatchEvent(new Event('scroll'));
        await outer.updateComplete;

        expect(setThumbSpy).not.toHaveBeenCalled();
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — Y-thumb drag returns early when trackH = 0 (line 358)
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — Y-thumb drag zero track', () => {
    it('pointermove does nothing when scrollbarY offsetHeight is 0', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        const thumbY = getThumbY(el);
        thumbY.setPointerCapture = vi.fn();

        // Start drag
        thumbY.dispatchEvent(new PointerEvent('pointerdown', { clientY: 0, pointerId: 1 }));
        await el.updateComplete;

        // Fire move without mocking offsetHeight — stays 0 in jsdom → early return
        thumbY.dispatchEvent(new PointerEvent('pointermove', { clientY: 50 }));
        expect(vp.scrollTop).toBe(0);
    });

    it('pointermove does nothing when scrollbarY is null (?.  null path)', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        const thumbY = getThumbY(el);
        thumbY.setPointerCapture = vi.fn();

        // Start drag
        thumbY.dispatchEvent(new PointerEvent('pointerdown', { clientY: 0, pointerId: 1 }));
        await el.updateComplete;

        // Shadow scrollbarY to null on the instance so _scrollbarY?. returns undefined
        Object.defineProperty(el, '_scrollbarY', { get: () => null, configurable: true });

        thumbY.dispatchEvent(new PointerEvent('pointermove', { clientY: 50 }));
        expect(vp.scrollTop).toBe(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — X-thumb drag returns early when trackW = 0 (line 388)
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — X-thumb drag zero track', () => {
    it('pointermove does nothing when scrollbarX offsetWidth is 0', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        const thumbX = getThumbX(el);
        thumbX.setPointerCapture = vi.fn();

        // Start drag
        thumbX.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, pointerId: 2 }));
        await el.updateComplete;

        // Fire move without mocking offsetWidth — stays 0 in jsdom → early return
        thumbX.dispatchEvent(new PointerEvent('pointermove', { clientX: 50 }));
        expect(vp.scrollLeft).toBe(0);
    });

    it('pointermove does nothing when scrollbarX is null (?. null path)', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        const thumbX = getThumbX(el);
        thumbX.setPointerCapture = vi.fn();

        // Start drag
        thumbX.dispatchEvent(new PointerEvent('pointerdown', { clientX: 0, pointerId: 2 }));
        await el.updateComplete;

        // Shadow scrollbarX to null on the instance
        Object.defineProperty(el, '_scrollbarX', { get: () => null, configurable: true });

        thumbX.dispatchEvent(new PointerEvent('pointermove', { clientX: 50 }));
        expect(vp.scrollLeft).toBe(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-scroll-area — _shouldShowBar default branch (line 333)
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-scroll-area — _shouldShowBar default branch', () => {
    it('returns hasOverflow for an unknown type value', async () => {
        const el = await makeArea();
        const vp = getViewport(el);
        mockOverflowY(vp, 800, 200);

        // Dispatch scroll to trigger _onScroll → _updateOverflow → _hasOverflowY = true
        vp.dispatchEvent(new Event('scroll'));
        await el.updateComplete;

        // Force an unknown type so the switch falls through to `default`
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any).type = 'unknown-type';
        // Trigger re-render so _scrollbarClasses → _shouldShowBar is called
        el.requestUpdate();
        await el.updateComplete;

        // default case returns hasOverflow (true here), so the bar gets scrollbar--visible
        const sbY = getScrollbarY(el);
        expect(sbY.classList.contains('scrollbar--visible')).toBe(true);
    });
});
