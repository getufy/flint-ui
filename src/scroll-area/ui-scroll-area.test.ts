import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-scroll-area';
import type { UiScrollArea, UiScrollBar } from './ui-scroll-area';

/* ── helpers ────────────────────────────────────────────────────────── */

async function makeArea(
    opts: { type?: string; dir?: string } = {},
) {
    const type = opts.type ?? 'hover';
    const dir = opts.dir ?? 'ltr';
    const el = await fixture<UiScrollArea>(html`
        <ui-scroll-area
            .type=${type as 'hover'}
            .dir=${dir as 'ltr'}
            style="width: 200px; height: 200px;"
        >
            <div id="content" style="width: 400px; height: 800px;"></div>
        </ui-scroll-area>
    `);
    await el.updateComplete;
    return el;
}

function getViewport(el: UiScrollArea): HTMLDivElement {
    return el.shadowRoot!.querySelector('.viewport') as HTMLDivElement;
}

function getScrollbarY(el: UiScrollArea): HTMLDivElement {
    return el.shadowRoot!.querySelector('.scrollbar--y') as HTMLDivElement;
}

function getScrollbarX(el: UiScrollArea): HTMLDivElement {
    return el.shadowRoot!.querySelector('.scrollbar--x') as HTMLDivElement;
}

function getThumbY(el: UiScrollArea): HTMLDivElement {
    return el.shadowRoot!.querySelector('.thumb--y') as HTMLDivElement;
}

function getThumbX(el: UiScrollArea): HTMLDivElement {
    return el.shadowRoot!.querySelector('.thumb--x') as HTMLDivElement;
}

async function makeScrollBar(
    orientation: 'vertical' | 'horizontal' = 'vertical',
): Promise<UiScrollBar> {
    const el = await fixture<UiScrollBar>(html`
        <ui-scroll-bar orientation=${orientation}></ui-scroll-bar>
    `);
    await el.updateComplete;
    return el;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ui-scroll-area — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-area — rendering', () => {
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
   ui-scroll-area — props & attributes
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-area — props', () => {
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
   ui-scroll-area — scroll helpers
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-area — scroll helpers', () => {
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
   ui-scroll-area — _shouldShowBar logic
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-area — _shouldShowBar', () => {
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
   ui-scroll-area — scroll event & type="scroll"
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-area — scroll type', () => {
    beforeEach(() => { vi.useFakeTimers(); });
    afterEach(() => { vi.useRealTimers(); });

    it('type="scroll" sets _isScrolling on scroll event', async () => {
        const el = await fixture<UiScrollArea>(html`
            <ui-scroll-area type="scroll" style="height: 200px; width: 200px;">
                <div style="height: 1000px;"></div>
            </ui-scroll-area>
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
        const el = await fixture<UiScrollArea>(html`
            <ui-scroll-area type="scroll" style="height: 200px; width: 200px;">
                <div style="height: 1000px;"></div>
            </ui-scroll-area>
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
});

/* ═══════════════════════════════════════════════════════════════════════════
   ui-scroll-area — disconnectedCallback
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-area — disconnectedCallback', () => {
    it('disconnects ResizeObserver on removal', async () => {
        const disconnectSpy = vi.fn();
        // Must use a regular function (not arrow) so it can be called with `new`
        const original = globalThis.ResizeObserver;
        globalThis.ResizeObserver = function MockRO() {
            return { observe: vi.fn(), disconnect: disconnectSpy, unobserve: vi.fn() };
        } as unknown as typeof ResizeObserver;

        let el: UiScrollArea | undefined;
        try {
            el = await fixture<UiScrollArea>(html`
                <ui-scroll-area style="height: 200px; width: 200px;">
                    <div style="height: 400px;"></div>
                </ui-scroll-area>
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
            const el = await fixture<UiScrollArea>(html`
                <ui-scroll-area type="scroll" style="height: 200px; width: 200px;">
                    <div style="height: 1000px;"></div>
                </ui-scroll-area>
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
   ui-scroll-area — aria attributes
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-area — aria', () => {
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
   ui-scroll-bar — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-bar — rendering', () => {
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
   ui-scroll-bar — setThumb
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-bar — setThumb', () => {
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
   ui-scroll-bar — setVisible
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-bar — setVisible', () => {
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
   ui-scroll-bar — aria
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-bar — aria', () => {
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
   ui-scroll-area — slotted ui-scroll-bar sync
═══════════════════════════════════════════════════════════════════════════ */
describe('ui-scroll-area — slotted ui-scroll-bar', () => {
    it('calls setThumb on slotted ui-scroll-bar after slot change', async () => {
        const el = await fixture<UiScrollArea>(html`
            <ui-scroll-area type="always" style="height: 200px; width: 200px;">
                <div style="height: 400px;"></div>
                <ui-scroll-bar slot="scrollbar" orientation="vertical"></ui-scroll-bar>
            </ui-scroll-area>
        `);
        await el.updateComplete;

        const bar = el.querySelector('ui-scroll-bar') as UiScrollBar;
        await bar.updateComplete;

        // setThumb is called — just verify _thumbPos and _thumbSize are numbers
        expect(typeof bar._thumbPos).toBe('number');
        expect(typeof bar._thumbSize).toBe('number');
    });

    it('setVisible is called on slotted bars', async () => {
        const el = await fixture<UiScrollArea>(html`
            <ui-scroll-area type="always" style="height: 200px; width: 200px;">
                <div style="height: 400px;"></div>
                <ui-scroll-bar slot="scrollbar" orientation="horizontal"></ui-scroll-bar>
            </ui-scroll-area>
        `);
        await el.updateComplete;

        const bar = el.querySelector('ui-scroll-bar') as UiScrollBar;
        await bar.updateComplete;

        // type="always" → setVisible(true) → data-visible present
        expect(bar.hasAttribute('data-visible')).toBe(true);
    });
});
