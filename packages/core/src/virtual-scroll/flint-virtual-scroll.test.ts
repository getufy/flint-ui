import { describe, it, expect, beforeAll } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { html as litHtml } from 'lit';
import './flint-virtual-scroll';
import type { FlintVirtualScroll } from './flint-virtual-scroll';
import { expectAccessible } from '../test-utils/axe';

/* ── ResizeObserver polyfill for jsdom ─────────────────────────────── */
beforeAll(() => {
    if (typeof globalThis.ResizeObserver === 'undefined') {
        globalThis.ResizeObserver = class ResizeObserver {
            constructor(_cb: ResizeObserverCallback) { void _cb; }
            observe() { /* no-op in jsdom */ }
            unobserve() { /* no-op */ }
            disconnect() { /* no-op */ }
        } as unknown as typeof ResizeObserver;
    }
});

/* ── helpers ────────────────────────────────────────────────────────── */

interface SimpleItem {
    id: number;
    label: string;
}

function makeItems(count: number): SimpleItem[] {
    return Array.from({ length: count }, (_, i) => ({ id: i, label: `Item ${i}` }));
}

async function make(opts: {
    items?: SimpleItem[];
    itemHeight?: number;
    overscan?: number;
} = {}) {
    const items = opts.items ?? [];
    const itemHeight = opts.itemHeight ?? 40;
    const overscan = opts.overscan ?? 5;

    const el = await fixture<FlintVirtualScroll<SimpleItem>>(html`
        <flint-virtual-scroll
            .items=${items}
            .itemHeight=${itemHeight}
            .overscan=${overscan}
            .renderItem=${(item: SimpleItem) => litHtml`<div class="row">${item.label}</div>`}
            style="height: 200px; width: 300px;"
        >
            <p>No items</p>
        </flint-virtual-scroll>
    `);
    await el.updateComplete;
    return el;
}

/* ═══════════════════════════════════════════════════════════════════════════
   flint-virtual-scroll — rendering
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-virtual-scroll — rendering', () => {
    it('renders a slot in shadow DOM when items is empty', async () => {
        const el = await make();
        expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
    });

    it('shows fallback content when items is empty', async () => {
        const el = await make();
        const p = el.querySelector('p');
        expect(p).not.toBeNull();
        expect(p!.textContent).toBe('No items');
    });

    it('renders viewport and spacer when items are provided', async () => {
        const el = await make({ items: makeItems(100) });
        expect(el.shadowRoot!.querySelector('.viewport')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.spacer')).not.toBeNull();
    });

    it('spacer height equals items.length * itemHeight', async () => {
        const el = await make({ items: makeItems(50), itemHeight: 30 });
        const spacer = el.shadowRoot!.querySelector('.spacer') as HTMLElement;
        expect(spacer.style.height).toBe(`${50 * 30}px`);
    });

    it('is defined as a custom element', async () => {
        const el = await make();
        expect(el.tagName.toLowerCase()).toBe('flint-virtual-scroll');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-virtual-scroll — properties
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-virtual-scroll — properties', () => {
    it('items defaults to empty array', async () => {
        const el = await fixture<FlintVirtualScroll>(html`
            <flint-virtual-scroll style="height: 200px;"></flint-virtual-scroll>
        `);
        await el.updateComplete;
        expect(el.items).toEqual([]);
    });

    it('itemHeight defaults to 40', async () => {
        const el = await fixture<FlintVirtualScroll>(html`
            <flint-virtual-scroll style="height: 200px;"></flint-virtual-scroll>
        `);
        await el.updateComplete;
        expect(el.itemHeight).toBe(40);
    });

    it('overscan defaults to 5', async () => {
        const el = await fixture<FlintVirtualScroll>(html`
            <flint-virtual-scroll style="height: 200px;"></flint-virtual-scroll>
        `);
        await el.updateComplete;
        expect(el.overscan).toBe(5);
    });

    it('accepts custom itemHeight', async () => {
        const el = await make({ items: makeItems(10), itemHeight: 60 });
        expect(el.itemHeight).toBe(60);
    });

    it('clamps itemHeight to 1 when set to 0', async () => {
        const el = await make({ items: makeItems(10), itemHeight: 0 });
        expect(el.itemHeight).toBe(1);
    });

    it('clamps negative itemHeight to 1', async () => {
        const el = await make({ items: makeItems(10), itemHeight: -5 });
        expect(el.itemHeight).toBe(1);
    });

    it('accepts custom overscan', async () => {
        const el = await make({ items: makeItems(10), overscan: 10 });
        expect(el.overscan).toBe(10);
    });

    it('item-height reflects from attribute', async () => {
        const el = await fixture<FlintVirtualScroll>(html`
            <flint-virtual-scroll item-height="80" style="height: 200px;"></flint-virtual-scroll>
        `);
        await el.updateComplete;
        expect(el.itemHeight).toBe(80);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-virtual-scroll — styles
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-virtual-scroll — styles', () => {
    it('host has display: block in its static styles', async () => {
        const el = await make();
        const styles = el.shadowRoot!.querySelectorAll('style');
        const styleText = Array.from(styles).map(s => s.textContent).join('');
        expect(styleText).toContain('display: block');
    });

    it('host has overflow-y: auto in its static styles', async () => {
        const el = await make();
        const styles = el.shadowRoot!.querySelectorAll('style');
        const styleText = Array.from(styles).map(s => s.textContent).join('');
        expect(styleText).toContain('overflow-y: auto');
    });

    it('host has contain: strict in its static styles', async () => {
        const el = await make();
        const styles = el.shadowRoot!.querySelectorAll('style');
        const styleText = Array.from(styles).map(s => s.textContent).join('');
        expect(styleText).toContain('contain: strict');
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-virtual-scroll — viewport structure
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-virtual-scroll — viewport structure', () => {
    it('viewport has part="viewport" attribute', async () => {
        const el = await make({ items: makeItems(10) });
        const viewport = el.shadowRoot!.querySelector('[part="viewport"]');
        expect(viewport).not.toBeNull();
    });

    it('spacer has part="spacer" attribute', async () => {
        const el = await make({ items: makeItems(10) });
        const spacer = el.shadowRoot!.querySelector('[part="spacer"]');
        expect(spacer).not.toBeNull();
    });

    it('renders items inside viewport', async () => {
        const el = await make({ items: makeItems(20) });
        const viewport = el.shadowRoot!.querySelector('.viewport');
        const rows = viewport!.querySelectorAll('.row');
        // Should render some items (at least overscan count)
        expect(rows.length).toBeGreaterThan(0);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   flint-virtual-scroll — accessibility
═══════════════════════════════════════════════════════════════════════════ */
describe('flint-virtual-scroll — accessibility', () => {
    it('should pass automated a11y checks (empty)', async () => {
        const el = await fixture(html`
            <flint-virtual-scroll style="height: 200px;">
                <p>No items available</p>
            </flint-virtual-scroll>
        `);
        await expectAccessible(el);
    }, 15000);
});
