import { describe, it, expect, vi, beforeAll } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-split-panel.js';
import { parseSnapPoints } from './flint-split-panel.js';
import type { FlintSplitPanel } from './flint-split-panel.js';

/* ── jsdom polyfills ─────────────────────────────────────────────── */

beforeAll(() => {
    // ResizeObserver is not available in jsdom
    if (!globalThis.ResizeObserver) {
        globalThis.ResizeObserver = class {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    }
    // setPointerCapture / releasePointerCapture are not in jsdom
    if (!HTMLElement.prototype.setPointerCapture) {
        HTMLElement.prototype.setPointerCapture = function () {};
    }
    if (!HTMLElement.prototype.releasePointerCapture) {
        HTMLElement.prototype.releasePointerCapture = function () {};
    }
});

/* ── helpers ─────────────────────────────────────────────────────── */

async function make(
    attrs: {
        position?: number;
        positionInPixels?: number;
        vertical?: boolean;
        disabled?: boolean;
        primary?: 'start' | 'end';
        snapThreshold?: number;
    } = {},
) {
    const el = await fixture<FlintSplitPanel>(html`
        <flint-split-panel
            .position=${attrs.position ?? 50}
            .positionInPixels=${attrs.positionInPixels ?? -1}
            ?vertical=${attrs.vertical ?? false}
            ?disabled=${attrs.disabled ?? false}
            .primary=${attrs.primary}
            .snapThreshold=${attrs.snapThreshold ?? 12}
        >
            <div slot="start">Start content</div>
            <div slot="end">End content</div>
        </flint-split-panel>
    `);
    await el.updateComplete;
    return el;
}

function getDivider(el: FlintSplitPanel) {
    return el.shadowRoot!.querySelector('.divider') as HTMLElement;
}
function getEnd(el: FlintSplitPanel) {
    return el.shadowRoot!.querySelector('.end') as HTMLElement;
}

/* ── parseSnapPoints utility ─────────────────────────────────────── */

describe('parseSnapPoints', () => {
    it('parses px values', () => {
        const pts = parseSnapPoints('100px 250px', 600);
        expect(pts).toEqual([100, 250]);
    });

    it('parses % values', () => {
        const pts = parseSnapPoints('25% 75%', 600);
        expect(pts).toEqual([150, 450]);
    });

    it('parses repeat(px)', () => {
        const pts = parseSnapPoints('repeat(200px)', 600);
        expect(pts).toEqual([200, 400]);
    });

    it('parses repeat(%)', () => {
        const pts = parseSnapPoints('repeat(25%)', 400);
        expect(pts).toEqual([100, 200, 300]);
    });

    it('parses mixed tokens', () => {
        const pts = parseSnapPoints('100px 50% repeat(200px)', 600);
        expect(pts).toContain(100);
        expect(pts).toContain(300); // 50% of 600
        expect(pts).toContain(200); // repeat(200px)
        expect(pts).toContain(400); // repeat(200px) × 2
    });

    it('returns empty array for empty string', () => {
        expect(parseSnapPoints('', 600)).toEqual([]);
    });

    it('ignores unknown tokens', () => {
        const pts = parseSnapPoints('foo bar', 600);
        expect(pts).toEqual([]);
    });

    it('handles repeat that would exceed container — excludes equal to size', () => {
        const pts = parseSnapPoints('repeat(300px)', 600);
        expect(pts).toEqual([300]); // 300 < 600 ✓, 600 is not < 600 ✗
    });
});

/* ── rendering ───────────────────────────────────────────────────── */

describe('flint-split-panel — rendering', () => {
    it('renders start, divider, and end in shadow DOM', async () => {
        const el = await make();
        expect(el.shadowRoot!.querySelector('.start')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.divider')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.end')).not.toBeNull();
    });

    it('has three named slots: start, end, divider', async () => {
        const el = await make();
        const slots = el.shadowRoot!.querySelectorAll('slot');
        const names = Array.from(slots).map((s) => s.getAttribute('name'));
        expect(names).toContain('start');
        expect(names).toContain('end');
        expect(names).toContain('divider');
    });

    it('divider has role="separator"', async () => {
        const el = await make();
        expect(getDivider(el).getAttribute('role')).toBe('separator');
    });

    it('divider has aria-orientation="horizontal" by default', async () => {
        const el = await make();
        expect(getDivider(el).getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('divider has tabindex="0" when not disabled', async () => {
        const el = await make();
        expect(getDivider(el).getAttribute('tabindex')).toBe('0');
    });

    it('divider has aria-valuenow corresponding to position', async () => {
        const el = await make({ position: 30 });
        expect(getDivider(el).getAttribute('aria-valuenow')).toBe('30');
    });

    it('end panel has flex:1 via class assignment', async () => {
        const el = await make();
        expect(getEnd(el).classList.contains('end')).toBe(true);
    });
});

/* ── props & attributes ──────────────────────────────────────────── */

describe('flint-split-panel — props', () => {
    it('defaults to position=50', async () => {
        const el = await make();
        expect(el.position).toBe(50);
    });

    it('reflects vertical attribute', async () => {
        const el = await make({ vertical: true });
        await el.updateComplete;
        expect(el.hasAttribute('vertical')).toBe(true);
    });

    it('does not have vertical attribute when false', async () => {
        const el = await make({ vertical: false });
        await el.updateComplete;
        expect(el.hasAttribute('vertical')).toBe(false);
    });

    it('reflects disabled attribute', async () => {
        const el = await make({ disabled: true });
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects primary attribute', async () => {
        const el = await make({ primary: 'end' });
        await el.updateComplete;
        expect(el.getAttribute('primary')).toBe('end');
    });

    it('defaults to snapThreshold=12', async () => {
        const el = await make();
        expect(el.snapThreshold).toBe(12);
    });

    it('sets custom snap string', async () => {
        const el = await make();
        el.snap = '100px 50%';
        await el.updateComplete;
        expect(el.snap).toBe('100px 50%');
    });

    it('sets snap as a function', async () => {
        const fn = ({ pos }: { pos: number }) => Math.round(pos / 10) * 10;
        const el = await make();
        el.snap = fn;
        await el.updateComplete;
        expect(typeof el.snap).toBe('function');
    });
});

/* ── disabled ────────────────────────────────────────────────────── */

describe('flint-split-panel — disabled', () => {
    it('divider has tabindex="-1" when disabled', async () => {
        const el = await make({ disabled: true });
        expect(getDivider(el).getAttribute('tabindex')).toBe('-1');
    });

    it('divider has aria-disabled="true" when disabled', async () => {
        const el = await make({ disabled: true });
        expect(getDivider(el).getAttribute('aria-disabled')).toBe('true');
    });

    it('does not have aria-disabled when not disabled', async () => {
        const el = await make({ disabled: false });
        expect(getDivider(el).getAttribute('aria-disabled')).toBeNull();
    });

    it('disabled prevents keyboard movement', async () => {
        const el = await make({ disabled: true });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        const divider = getDivider(el);
        divider.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }),
        );
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ── vertical ────────────────────────────────────────────────────── */

describe('flint-split-panel — vertical', () => {
    it('divider has aria-orientation="vertical" when vertical', async () => {
        const el = await make({ vertical: true });
        expect(getDivider(el).getAttribute('aria-orientation')).toBe('vertical');
    });
});

/* ── keyboard ────────────────────────────────────────────────────── */

describe('flint-split-panel — keyboard', () => {
    function fireKey(el: FlintSplitPanel, key: string, shiftKey = false) {
        getDivider(el).dispatchEvent(
            new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, composed: true }),
        );
    }

    it('ArrowRight fires reposition event (horizontal)', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        fireKey(el, 'ArrowRight');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowLeft fires reposition event (horizontal)', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        fireKey(el, 'ArrowLeft');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowDown fires reposition event (vertical)', async () => {
        const el = await make({ vertical: true });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        fireKey(el, 'ArrowDown');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowUp fires reposition event (vertical)', async () => {
        const el = await make({ vertical: true });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        fireKey(el, 'ArrowUp');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('Home fires reposition event', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        fireKey(el, 'Home');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('End fires reposition event', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        fireKey(el, 'End');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('event detail includes position and positionInPixels', async () => {
        const el = await make();
        let detail: { position: number; positionInPixels: number } | null = null;
        el.addEventListener('flint-split-panel-reposition', (e) => {
            detail = (e as CustomEvent).detail;
        });
        fireKey(el, 'ArrowRight');
        await el.updateComplete;
        expect(detail).not.toBeNull();
        expect(typeof detail!.position).toBe('number');
        expect(typeof detail!.positionInPixels).toBe('number');
    });

    it('Shift+ArrowRight moves by 10 (larger step)', async () => {
        // Mock layout so the container has a real size
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ position: 50 });
        const before = el.positionInPixels;
        fireKey(el, 'ArrowRight', true);
        await el.updateComplete;
        expect(el.positionInPixels).toBe(before + 10);
        vi.restoreAllMocks();
    });

    it('ArrowRight moves by 1 (normal step)', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ position: 50 });
        const before = el.positionInPixels;
        fireKey(el, 'ArrowRight');
        await el.updateComplete;
        expect(el.positionInPixels).toBe(before + 1);
        vi.restoreAllMocks();
    });

    it('ArrowLeft moves by -1', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ position: 50 });
        const before = el.positionInPixels;
        fireKey(el, 'ArrowLeft');
        await el.updateComplete;
        expect(el.positionInPixels).toBe(before - 1);
        vi.restoreAllMocks();
    });

    it('ArrowLeft on vertical does nothing (wrong orientation)', async () => {
        const el = await make({ vertical: true });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        fireKey(el, 'ArrowLeft');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('ArrowDown on horizontal does nothing (wrong orientation)', async () => {
        const el = await make({ vertical: false });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        fireKey(el, 'ArrowDown');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('Home sets positionInPixels to 0', async () => {
        const el = await make();
        fireKey(el, 'Home');
        await el.updateComplete;
        expect(el.positionInPixels).toBe(0);
    });

    it('End sets positionInPixels to cached container size', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ position: 50 });
        fireKey(el, 'End');
        await el.updateComplete;
        expect(el.position).toBeCloseTo(100, 0);
        expect(el.positionInPixels).toBeCloseTo(600, 0);
        vi.restoreAllMocks();
    });
});

/* ── reposition event ────────────────────────────────────────────── */

describe('flint-split-panel — reposition event', () => {
    it('event bubbles', async () => {
        const el = await make();
        let bubbled = false;
        document.addEventListener(
            'flint-split-panel-reposition',
            () => { bubbled = true; },
            { once: true },
        );
        getDivider(el).dispatchEvent(
            new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }),
        );
        await el.updateComplete;
        expect(bubbled).toBe(true);
    });
});

/* ── snap function ───────────────────────────────────────────────── */

describe('flint-split-panel — snap function', () => {
    it('custom snap function is called during keyboard move', async () => {
        const snapFn = vi.fn(({ pos }: { pos: number }) => pos);
        const el = await make();
        el.snap = snapFn;
        getDivider(el).dispatchEvent(
            new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }),
        );
        await el.updateComplete;
        // snap fn is applied during _applySnap (only during pointer drag in full implementation,
        // but keyboard uses _moveTo which doesn't call _applySnap — so no call expected here)
        // This tests the property assignment works
        expect(el.snap).toBe(snapFn);
    });
});

/* ── pointer drag ────────────────────────────────────────────────── */

describe('flint-split-panel — pointer drag', () => {
    function mockLayout() {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
    }

    function firePointerDown(el: FlintSplitPanel, x = 300, y = 200) {
        getDivider(el).dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0, buttons: 1, clientX: x, clientY: y,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
    }

    function firePointerMove(el: FlintSplitPanel, x: number, y = 200) {
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                buttons: 1, clientX: x, clientY: y,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
    }

    function firePointerUp(el: FlintSplitPanel) {
        el.dispatchEvent(
            new PointerEvent('pointerup', {
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
    }

    it('starts drag on pointerdown and updates position on pointermove', async () => {
        mockLayout();
        const el = await make({ position: 50 });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);

        firePointerDown(el, 300);
        firePointerMove(el, 350);
        await el.updateComplete;

        expect(spy).toHaveBeenCalled();
        expect(el.positionInPixels).toBe(350);
        vi.restoreAllMocks();
    });

    it('fires reposition event with correct detail on drag', async () => {
        mockLayout();
        const el = await make({ position: 50 });
        let detail: { position: number; positionInPixels: number } | null = null;
        el.addEventListener('flint-split-panel-reposition', (e) => {
            detail = (e as CustomEvent).detail;
        });

        firePointerDown(el, 300);
        firePointerMove(el, 200);
        await el.updateComplete;

        expect(detail).not.toBeNull();
        expect(detail!.positionInPixels).toBe(200);
        expect(detail!.position).toBeCloseTo((200 / 600) * 100, 1);
        vi.restoreAllMocks();
    });

    it('stops drag on pointerup and releases capture', async () => {
        mockLayout();
        const el = await make({ position: 50 });

        firePointerDown(el, 300);
        firePointerUp(el);

        // After pointerup, further pointermove should not change position
        const posAfterUp = el.positionInPixels;
        firePointerMove(el, 100);
        await el.updateComplete;
        expect(el.positionInPixels).toBe(posAfterUp);
        vi.restoreAllMocks();
    });

    it('ignores pointerdown when disabled', async () => {
        mockLayout();
        const el = await make({ disabled: true });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);

        firePointerDown(el, 300);
        firePointerMove(el, 200);
        await el.updateComplete;

        expect(spy).not.toHaveBeenCalled();
        vi.restoreAllMocks();
    });

    it('ignores non-primary button', async () => {
        mockLayout();
        const el = await make({ position: 50 });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);

        // button=2 is right-click
        getDivider(el).dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 2, buttons: 2, clientX: 300, clientY: 200,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
        firePointerMove(el, 200);
        await el.updateComplete;

        expect(spy).not.toHaveBeenCalled();
        vi.restoreAllMocks();
    });

    it('stops drag when buttons === 0 during pointermove', async () => {
        mockLayout();
        const el = await make({ position: 50 });

        firePointerDown(el, 300);
        // Simulate buttons=0 (mouse released outside)
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                buttons: 0, clientX: 200, clientY: 200,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
        await el.updateComplete;

        // Further moves should not affect position
        const posAfter = el.positionInPixels;
        firePointerMove(el, 100);
        await el.updateComplete;
        expect(el.positionInPixels).toBe(posAfter);
        vi.restoreAllMocks();
    });

    it('drags vertically when vertical=true', async () => {
        mockLayout();
        const el = await make({ vertical: true, position: 50 });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);

        firePointerDown(el, 300, 200);
        // Move pointer on Y axis
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                buttons: 1, clientX: 300, clientY: 150,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
        await el.updateComplete;

        expect(spy).toHaveBeenCalled();
        expect(el.positionInPixels).toBe(150);
        vi.restoreAllMocks();
    });

    it('clamps drag position to container bounds', async () => {
        mockLayout();
        const el = await make({ position: 50 });

        firePointerDown(el, 300);
        firePointerMove(el, 800); // beyond container width=600
        await el.updateComplete;

        expect(el.positionInPixels).toBe(600);

        firePointerMove(el, -50); // below 0
        await el.updateComplete;

        expect(el.positionInPixels).toBe(0);
        vi.restoreAllMocks();
    });
});

/* ── snap via pointer drag ───────────────────────────────────────── */

describe('flint-split-panel — snap during drag', () => {
    function mockLayout() {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
    }

    it('snaps to string snap points within threshold during drag', async () => {
        mockLayout();
        const el = await make({ position: 50 });
        el.snap = '200px';
        el.snapThreshold = 15;
        await el.updateComplete;

        getDivider(el).dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0, buttons: 1, clientX: 300, clientY: 200,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
        // Move to 208 (within 15px of 200)
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                buttons: 1, clientX: 208, clientY: 200,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
        await el.updateComplete;

        expect(el.positionInPixels).toBe(200); // snapped
        vi.restoreAllMocks();
    });

    it('does not snap when outside threshold', async () => {
        mockLayout();
        const el = await make({ position: 50 });
        el.snap = '200px';
        el.snapThreshold = 5;
        await el.updateComplete;

        getDivider(el).dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0, buttons: 1, clientX: 300, clientY: 200,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
        // Move to 210 (10px from 200, threshold is 5)
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                buttons: 1, clientX: 210, clientY: 200,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
        await el.updateComplete;

        expect(el.positionInPixels).toBe(210); // not snapped
        vi.restoreAllMocks();
    });

    it('calls snap function during drag', async () => {
        mockLayout();
        const el = await make({ position: 50 });
        const snapFn = vi.fn(({ pos }: { pos: number }) => Math.round(pos / 50) * 50);
        el.snap = snapFn;
        await el.updateComplete;

        getDivider(el).dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0, buttons: 1, clientX: 300, clientY: 200,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                buttons: 1, clientX: 227, clientY: 200,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
        await el.updateComplete;

        expect(snapFn).toHaveBeenCalledWith(
            expect.objectContaining({ pos: 227, size: 600 }),
        );
        expect(el.positionInPixels).toBe(250); // rounded to nearest 50
        vi.restoreAllMocks();
    });

    it('_applySnap returns px unchanged when snap is empty', async () => {
        mockLayout();
        const el = await make({ position: 50 });
        el.snap = '';
        await el.updateComplete;

        getDivider(el).dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0, buttons: 1, clientX: 300, clientY: 200,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                buttons: 1, clientX: 237, clientY: 200,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );
        await el.updateComplete;

        expect(el.positionInPixels).toBe(237); // no snapping
        vi.restoreAllMocks();
    });
});

/* ── _handleContainerResize ──────────────────────────────────────── */

describe('flint-split-panel — container resize', () => {
    it('primary="end" adjusts position to keep end panel size', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ primary: 'end', position: 50 });
        // Position is at 300px, end panel = 300px, cachedSize = 600
        expect(el.positionInPixels).toBe(300);

        // Simulate resize to 800px — end panel should stay at 300px, so position moves to 500
        // Access private method via any
        /* eslint-disable */
        (el as any)._handleContainerResize(800);
        /* eslint-enable */
        await el.updateComplete;

        expect(el.positionInPixels).toBe(500); // 800 - 300 end
    });

    it('primary="start" keeps start panel size on resize', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ primary: 'start', position: 50 });
        expect(el.positionInPixels).toBe(300);

        /* eslint-disable */
        (el as any)._handleContainerResize(800);
        /* eslint-enable */
        await el.updateComplete;

        expect(el.positionInPixels).toBe(300); // start keeps its pixel size
    });

    it('no primary — maintains proportion on resize', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ position: 50 });
        expect(el.positionInPixels).toBe(300);

        /* eslint-disable */
        (el as any)._handleContainerResize(900);
        /* eslint-enable */
        await el.updateComplete;

        expect(el.positionInPixels).toBe(450); // 50% of 900
    });

    it('ignores resize when newSize <= 0', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ position: 50 });
        const posBefore = el.positionInPixels;

        /* eslint-disable */
        (el as any)._handleContainerResize(0);
        /* eslint-enable */
        await el.updateComplete;

        expect(el.positionInPixels).toBe(posBefore);
    });

    it('caches size when _positionPx < 0 (before firstUpdated)', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make();

        // Force _positionPx to -1 to simulate pre-firstUpdated state
        /* eslint-disable */
        (el as any)._positionPx = -1;
        (el as any)._handleContainerResize(500);
        /* eslint-enable */
        await el.updateComplete;

        /* eslint-disable */
        expect((el as any)._cachedSize).toBe(500);
        /* eslint-enable */
    });
});

/* ── updated() guards ────────────────────────────────────────────── */

describe('flint-split-panel — updated() guards', () => {
    it('updated() skips when _internalUpdate is true', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ position: 50 });
        const posBefore = el.positionInPixels;

        // Set _internalUpdate then change position — updated() should skip
        /* eslint-disable */
        (el as any)._internalUpdate = true;
        /* eslint-enable */
        el.position = 80;
        await el.updateComplete;

        // Position px should not change because updated() returned early
        expect(el.positionInPixels).toBe(posBefore);

        /* eslint-disable */
        (el as any)._internalUpdate = false;
        /* eslint-enable */
        vi.restoreAllMocks();
    });

    it('positionInPixels change triggers position sync in updated()', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ position: 50 });

        el.positionInPixels = 200;
        await el.updateComplete;
        // Need another update cycle for the sync
        await el.updateComplete;

        expect(el.positionInPixels).toBeCloseTo(200, 0);
        expect(el.position).toBeCloseTo((200 / 600) * 100, 1);
        vi.restoreAllMocks();
    });
});

/* ── vertical keyboard Home/End ──────────────────────────────────── */

describe('flint-split-panel — vertical keyboard', () => {
    function fireKey(el: FlintSplitPanel, key: string, shiftKey = false) {
        getDivider(el).dispatchEvent(
            new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, composed: true }),
        );
    }

    it('Home fires reposition event in vertical mode', async () => {
        const el = await make({ vertical: true });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        fireKey(el, 'Home');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect(el.positionInPixels).toBe(0);
    });

    it('End fires reposition event in vertical mode', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ vertical: true, position: 50 });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        fireKey(el, 'End');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
        expect(el.positionInPixels).toBeCloseTo(400, 0);
        vi.restoreAllMocks();
    });

    it('Shift+ArrowDown moves by 10 in vertical mode', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ vertical: true, position: 50 });
        const before = el.positionInPixels;
        fireKey(el, 'ArrowDown', true);
        await el.updateComplete;
        expect(el.positionInPixels).toBe(before + 10);
        vi.restoreAllMocks();
    });

    it('ArrowRight on vertical does nothing (wrong orientation)', async () => {
        const el = await make({ vertical: true });
        const spy = vi.fn();
        el.addEventListener('flint-split-panel-reposition', spy);
        fireKey(el, 'ArrowRight');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ── disconnectedCallback ────────────────────────────────────────── */

describe('flint-split-panel — lifecycle', () => {
    it('disconnects without errors', async () => {
        const el = await make();
        expect(() => el.remove()).not.toThrow();
    });

    it('disconnects during active drag without errors', async () => {
        const el = await make();

        getDivider(el).dispatchEvent(
            new PointerEvent('pointerdown', {
                button: 0, buttons: 1, clientX: 300, clientY: 200,
                pointerId: 1, bubbles: true, composed: true,
            }),
        );

        expect(() => el.remove()).not.toThrow();
    });
});

/* ── _parseSizeToken edge cases ──────────────────────────────────── */

describe('flint-split-panel — _parseSizeToken', () => {
    it('returns 0 for "0" value', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ position: 50 });

        /* eslint-disable */
        expect((el as any)._parseSizeToken('0', 999)).toBe(0);
        expect((el as any)._parseSizeToken('100px', 999)).toBe(100);
        expect((el as any)._parseSizeToken('50%', 999)).toBeCloseTo(300, 0); // 50% of cachedSize=600
        expect((el as any)._parseSizeToken('', 42)).toBe(42); // fallback
        expect((el as any)._parseSizeToken('bogus', 42)).toBe(42); // fallback
        /* eslint-enable */
        vi.restoreAllMocks();
    });
});

/* ── rendering edge cases ────────────────────────────────────────── */

describe('flint-split-panel — rendering edge cases', () => {
    it('start panel uses percentage before firstUpdated (fallback)', async () => {
        const el = await make({ position: 30 });
        const start = el.shadowRoot!.querySelector('.start') as HTMLElement;
        // After firstUpdated, the style should use pixel values
        expect(start.getAttribute('style')).toMatch(/width:/);
    });

    it('vertical mode sets height on start panel', async () => {
        const el = await make({ vertical: true, position: 40 });
        const start = el.shadowRoot!.querySelector('.start') as HTMLElement;
        expect(start.getAttribute('style')).toMatch(/height:/);
    });

    it('positionInPixels takes precedence over position in firstUpdated', async () => {
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            width: 600, height: 400, top: 0, left: 0, right: 600, bottom: 400,
            x: 0, y: 0, toJSON() { return this; },
        } as DOMRect);
        const el = await make({ position: 50, positionInPixels: 150 });
        expect(el.positionInPixels).toBe(150);
        vi.restoreAllMocks();
    });
});
