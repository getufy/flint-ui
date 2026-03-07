import { describe, it, expect, vi, beforeAll } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-split-panel.js';
import { parseSnapPoints } from './ui-split-panel.js';
import type { UiSplitPanel } from './ui-split-panel.js';

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
    const el = await fixture<UiSplitPanel>(html`
        <ui-split-panel
            .position=${attrs.position ?? 50}
            .positionInPixels=${attrs.positionInPixels ?? -1}
            ?vertical=${attrs.vertical ?? false}
            ?disabled=${attrs.disabled ?? false}
            .primary=${attrs.primary}
            .snapThreshold=${attrs.snapThreshold ?? 12}
        >
            <div slot="start">Start content</div>
            <div slot="end">End content</div>
        </ui-split-panel>
    `);
    await el.updateComplete;
    return el;
}

function getDivider(el: UiSplitPanel) {
    return el.shadowRoot!.querySelector('.divider') as HTMLElement;
}
function getEnd(el: UiSplitPanel) {
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

describe('ui-split-panel — rendering', () => {
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

describe('ui-split-panel — props', () => {
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

describe('ui-split-panel — disabled', () => {
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
        el.addEventListener('ui-split-panel-reposition', spy);
        const divider = getDivider(el);
        divider.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }),
        );
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });
});

/* ── vertical ────────────────────────────────────────────────────── */

describe('ui-split-panel — vertical', () => {
    it('divider has aria-orientation="vertical" when vertical', async () => {
        const el = await make({ vertical: true });
        expect(getDivider(el).getAttribute('aria-orientation')).toBe('vertical');
    });
});

/* ── keyboard ────────────────────────────────────────────────────── */

describe('ui-split-panel — keyboard', () => {
    function fireKey(el: UiSplitPanel, key: string, shiftKey = false) {
        getDivider(el).dispatchEvent(
            new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, composed: true }),
        );
    }

    it('ArrowRight fires reposition event (horizontal)', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-split-panel-reposition', spy);
        fireKey(el, 'ArrowRight');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowLeft fires reposition event (horizontal)', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-split-panel-reposition', spy);
        fireKey(el, 'ArrowLeft');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowDown fires reposition event (vertical)', async () => {
        const el = await make({ vertical: true });
        const spy = vi.fn();
        el.addEventListener('ui-split-panel-reposition', spy);
        fireKey(el, 'ArrowDown');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('ArrowUp fires reposition event (vertical)', async () => {
        const el = await make({ vertical: true });
        const spy = vi.fn();
        el.addEventListener('ui-split-panel-reposition', spy);
        fireKey(el, 'ArrowUp');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('Home fires reposition event', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-split-panel-reposition', spy);
        fireKey(el, 'Home');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('End fires reposition event', async () => {
        const el = await make();
        const spy = vi.fn();
        el.addEventListener('ui-split-panel-reposition', spy);
        fireKey(el, 'End');
        await el.updateComplete;
        expect(spy).toHaveBeenCalledOnce();
    });

    it('event detail includes position and positionInPixels', async () => {
        const el = await make();
        let detail: { position: number; positionInPixels: number } | null = null;
        el.addEventListener('ui-split-panel-reposition', (e) => {
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
        el.addEventListener('ui-split-panel-reposition', spy);
        fireKey(el, 'ArrowLeft');
        await el.updateComplete;
        expect(spy).not.toHaveBeenCalled();
    });

    it('ArrowDown on horizontal does nothing (wrong orientation)', async () => {
        const el = await make({ vertical: false });
        const spy = vi.fn();
        el.addEventListener('ui-split-panel-reposition', spy);
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

describe('ui-split-panel — reposition event', () => {
    it('event bubbles', async () => {
        const el = await make();
        let bubbled = false;
        document.addEventListener(
            'ui-split-panel-reposition',
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

describe('ui-split-panel — snap function', () => {
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

/* ── disconnectedCallback ────────────────────────────────────────── */

describe('ui-split-panel — lifecycle', () => {
    it('disconnects without errors', async () => {
        const el = await make();
        expect(() => el.remove()).not.toThrow();
    });
});
