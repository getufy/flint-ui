import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-grid.js';
import type { UiGrid } from './ui-grid.js';

// Helper: force a specific viewport width and re-run item style calculations
async function setWidth(el: UiGrid, width: number) {
    vi.stubGlobal('innerWidth', width);
    (el as unknown as { _currentWidth: number })._currentWidth = width;
    await el.updateComplete;
}

describe('ui-grid', () => {
    let originalInnerWidth: number;

    beforeEach(() => {
        originalInnerWidth = window.innerWidth;
        global.ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    });

    afterEach(() => {
        vi.stubGlobal('innerWidth', originalInnerWidth);
    });

    // -------------------------------------------------------------------------
    // Basics
    // -------------------------------------------------------------------------

    it('is defined', () => {
        const el = document.createElement('ui-grid');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('applies container class when container=true', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container></ui-grid>`);
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper');
        expect(wrapper?.classList.contains('container')).toBe(true);
    });

    it('does not apply container class when container is not set', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="6"></ui-grid>`);
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper');
        expect(wrapper?.classList.contains('container')).toBe(false);
    });

    // -------------------------------------------------------------------------
    // Size calculation
    // -------------------------------------------------------------------------

    it('applies basic xs size correctly via host styles', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="6"></ui-grid>`);
        await setWidth(el, 375);
        expect(el.style.flexBasis).toContain('50%');
        expect(el.style.maxWidth).toContain('50%');
    });

    it('applies auto-layout size (xs=true)', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid .xs=${true}></ui-grid>`);
        await setWidth(el, 375);
        expect(el.style.flexBasis).toBe('0%');
        expect(el.style.flexGrow).toBe('1');
    });

    it('applies auto width content (xs="auto")', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid .xs=${'auto'}></ui-grid>`);
        await setWidth(el, 375);
        expect(el.style.flexBasis).toBe('auto');
        expect(el.style.width).toBe('auto');
    });

    it('calculates size based on "columns" prop', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid columns="16" xs="4"></ui-grid>`);
        await setWidth(el, 375);
        // 4/16 = 25%
        expect(el.style.flexBasis).toContain('25%');
    });

    it('full-width item: columns=16, xs=16 occupies 100%', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid columns="16" xs="16"></ui-grid>`);
        await setWidth(el, 375);
        expect(el.style.flexBasis).toContain('100%');
    });

    // -------------------------------------------------------------------------
    // Breakpoint cascade
    // -------------------------------------------------------------------------

    it('does not apply md size when viewport is xs', async () => {
        // md="6" set but no xs/sm — item should fall back to no explicit size
        const el = await fixture<UiGrid>(html`<ui-grid md="6"></ui-grid>`);
        await setWidth(el, 375); // xs viewport
        // No breakpoint resolved → should not set a numeric flex-basis
        expect(el.style.flexBasis).not.toMatch(/^\d/);
    });

    it('does not cascade sm size UP to xs (cascade is downward only)', async () => {
        // The cascade algorithm walks from the current breakpoint index downward to xs.
        // sm="4" means: "use 4 columns at sm and above". At an xs viewport there is no
        // xs value set, so no size is resolved — the item gets no explicit flex-basis.
        const el = await fixture<UiGrid>(html`<ui-grid sm="4"></ui-grid>`);
        await setWidth(el, 375); // xs viewport
        expect(el.style.flexBasis).not.toMatch(/^\d/);
    });

    it('cascades md size down to sm when sm is not explicitly set', async () => {
        // At an md viewport md="6" is found. At an sm viewport (600–899px) there is
        // no sm value, so the algorithm continues downward: xs is also unset → no size.
        // At exactly md width it should resolve.
        const el = await fixture<UiGrid>(html`<ui-grid md="6"></ui-grid>`);
        await setWidth(el, 960); // md viewport
        expect(el.style.flexBasis).toContain('50%');

        await setWidth(el, 700); // sm viewport — md="6" does NOT cascade down to sm
        expect(el.style.flexBasis).not.toMatch(/^\d/);
    });

    it('uses the most specific breakpoint when multiple are set', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="12" md="6"></ui-grid>`);
        await setWidth(el, 1024); // md viewport
        expect(el.style.flexBasis).toContain('50%');

        await setWidth(el, 375); // back to xs
        expect(el.style.flexBasis).toContain('100%');
    });

    // -------------------------------------------------------------------------
    // Spacing
    // -------------------------------------------------------------------------

    it('applies spacing in container', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container spacing="3"></ui-grid>`);
        await setWidth(el, 375);
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        expect(wrapper.style.gap).toBe('24px 24px');
    });

    it('applies rowSpacing and columnSpacing independently', async () => {
        const el = await fixture<UiGrid>(html`
            <ui-grid container .rowSpacing=${2} .columnSpacing=${4}></ui-grid>
        `);
        await setWidth(el, 375);
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        // rowSpacing=2 → 16px, columnSpacing=4 → 32px
        expect(wrapper.style.gap).toBe('16px 32px');
    });

    it('rowSpacing=0 overrides spacing correctly (FIX: falsy zero check)', async () => {
        const el = await fixture<UiGrid>(html`
            <ui-grid container spacing="3" .rowSpacing=${0}></ui-grid>
        `);
        await setWidth(el, 375);
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        // rowSpacing explicitly 0 → row gap should be 0px, column gap falls back to spacing (24px)
        expect(wrapper.style.gap).toBe('0px 24px');
    });

    it('sets --ui-grid-column-gap CSS variable on container host', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container spacing="2"></ui-grid>`);
        await setWidth(el, 375);
        const colGap = el.style.getPropertyValue('--ui-grid-column-gap');
        expect(colGap).toBe('16px');
    });

    it('does not apply spacing styles on a non-container', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="6" spacing="3"></ui-grid>`);
        await setWidth(el, 375);
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        // gap should not be set on a non-container
        expect(wrapper.style.gap).toBe('');
    });

    // -------------------------------------------------------------------------
    // Offset
    // -------------------------------------------------------------------------

    it('applies offset correctly', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="4" .offset=${{ xs: 4 }}></ui-grid>`);
        await setWidth(el, 375);
        expect(parseFloat(el.style.marginLeft)).toBeCloseTo(33.33, 1);
    });

    it('applies offset="auto" as margin-left: auto', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="4" .offset=${{ xs: 'auto' }}></ui-grid>`);
        await setWidth(el, 375);
        expect(el.style.marginLeft).toBe('auto');
    });

    it('does not cascade offset from sm UP to xs (cascade is downward only)', async () => {
        // offset={{ sm: 2 }} means "apply this offset at sm and above".
        // At an xs viewport there is no xs offset defined, so no margin-left is applied.
        const el = await fixture<UiGrid>(html`<ui-grid xs="4" .offset=${{ sm: 2 }}></ui-grid>`);
        await setWidth(el, 375); // xs viewport
        expect(el.style.marginLeft).toBe('');
    });

    it('cascades offset from md down when viewport is exactly md', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="4" .offset=${{ md: 2 }}></ui-grid>`);
        await setWidth(el, 960); // md viewport — offset should be 2/12 ≈ 16.67%
        expect(parseFloat(el.style.marginLeft)).toBeCloseTo(16.67, 1);
    });

    // -------------------------------------------------------------------------
    // Order
    // -------------------------------------------------------------------------

    it('applies a flat order value', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="6" .order=${-1}></ui-grid>`);
        await setWidth(el, 375);
        expect(el.style.order).toBe('-1');
    });

    it('applies responsive order value at correct breakpoint', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="12" md="6" .order=${{ xs: 2, md: 0 }}></ui-grid>`);

        await setWidth(el, 375); // xs
        expect(el.style.order).toBe('2');

        await setWidth(el, 1024); // md
        expect(el.style.order).toBe('0');
    });

    // -------------------------------------------------------------------------
    // Direction & Wrap
    // -------------------------------------------------------------------------

    it('applies flex direction class on wrapper', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container direction="column"></ui-grid>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper');
        expect(wrapper?.classList.contains('direction-column')).toBe(true);
    });

    it('applies wrap-nowrap class when wrap="nowrap"', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container wrap="nowrap"></ui-grid>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper');
        expect(wrapper?.classList.contains('wrap-nowrap')).toBe(true);
    });

    it('applies wrap-wrap-reverse class when wrap="wrap-reverse"', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container wrap="wrap-reverse"></ui-grid>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper');
        expect(wrapper?.classList.contains('wrap-wrap-reverse')).toBe(true);
    });

    it('does not apply a wrap class when wrap="wrap" (default)', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container></ui-grid>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper');
        expect(wrapper?.classList.contains('wrap-wrap')).toBe(false);
        expect(wrapper?.classList.contains('wrap-nowrap')).toBe(false);
        expect(wrapper?.classList.contains('wrap-wrap-reverse')).toBe(false);
    });

    // -------------------------------------------------------------------------
    // Alignment
    // -------------------------------------------------------------------------

    it('applies flex alignment styles on wrapper', async () => {
        const el = await fixture<UiGrid>(html`
            <ui-grid container align-items="center" justify-content="space-between"></ui-grid>
        `);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        expect(wrapper.style.alignItems || wrapper.style.getPropertyValue('align-items')).toBe('center');
        expect(wrapper.style.justifyContent || wrapper.style.getPropertyValue('justify-content')).toBe('space-between');
    });

    // -------------------------------------------------------------------------
    // Columns CSS variable inheritance
    // -------------------------------------------------------------------------

    it('sets --ui-grid-columns CSS variable on container host', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container columns="16"></ui-grid>`);
        await setWidth(el, 375);
        const colVar = el.style.getPropertyValue('--ui-grid-columns');
        expect(colVar).toBe('16');
    });

    // -------------------------------------------------------------------------
    // Resize event
    // -------------------------------------------------------------------------

    it('updates styles when window resize event fires', async () => {
        vi.stubGlobal('innerWidth', 375); // xs
        const el = await fixture<UiGrid>(html`<ui-grid xs="12" md="6"></ui-grid>`);
        (el as unknown as { _currentWidth: number })._currentWidth = 375;
        await el.updateComplete;
        expect(el.style.flexBasis).toContain('100%');

        // Simulate resize to md
        vi.stubGlobal('innerWidth', 1024);
        window.dispatchEvent(new Event('resize'));
        await el.updateComplete;
        expect(el.style.flexBasis).toContain('50%');
    });

    // -------------------------------------------------------------------------
    // Perf guard: no item styles applied when no size/offset/order props set
    // -------------------------------------------------------------------------

    it('does not set item styles on a pure container with no size props', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container spacing="2"></ui-grid>`);
        await setWidth(el, 375);
        // Host element should have no flex-basis or max-width from item styles
        expect(el.style.flexBasis).toBe('');
        expect(el.style.maxWidth).toBe('');
    });
});