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

    // -------------------------------------------------------------------------
    // XL breakpoint
    // -------------------------------------------------------------------------

    it('returns xl breakpoint when viewport >= 1536px', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="12" xl="3"></ui-grid>`);
        await setWidth(el, 1600); // xl viewport
        // 3/12 = 25%
        expect(el.style.flexBasis).toContain('25%');
    });

    it('applies lg size when viewport is lg (1200-1535px)', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="12" lg="4"></ui-grid>`);
        await setWidth(el, 1300); // lg viewport
        // 4/12 ≈ 33.33...%
        expect(el.style.flexBasis).toContain('33.33333333333333%');
    });

    // -------------------------------------------------------------------------
    // String attribute "false" → GridSize false
    // -------------------------------------------------------------------------

    it('treats xs="false" (string attribute) as boolean false → no size applied', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="false"></ui-grid>`);
        await setWidth(el, 375);
        // size===false falls through to the !this.container branch → width 100%
        expect(el.style.width).toBe('100%');
    });

    // -------------------------------------------------------------------------
    // _getEffectiveOffset: numeric string value
    // -------------------------------------------------------------------------

    it('converts a numeric-string offset value to a number', async () => {
        // Set offset via a JS object with a string number to exercise the
        // typeof val === 'string' && !isNaN(Number(val)) branch in _getEffectiveOffset
        const el = await fixture<UiGrid>(html`<ui-grid xs="6" .offset=${{ xs: '3' as unknown as number }}></ui-grid>`);
        await setWidth(el, 375);
        // 3/12 = 25%
        expect(parseFloat(el.style.marginLeft)).toBeCloseTo(25, 1);
    });

    // -------------------------------------------------------------------------
    // _resolveResponsive: responsive object (spacing as object)
    // -------------------------------------------------------------------------

    it('resolves responsive spacing object at current breakpoint', async () => {
        const el = await fixture<UiGrid>(html`
            <ui-grid container .spacing=${{ xs: 1, md: 3 }}></ui-grid>
        `);
        await setWidth(el, 375); // xs → 1 unit = 8px
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        expect(wrapper.style.gap).toBe('8px 8px');

        await setWidth(el, 960); // md → 3 units = 24px
        expect(wrapper.style.gap).toBe('24px 24px');
    });

    it('resolves responsive spacing object to 0 when no breakpoint matches', async () => {
        // Only md defined — at xs viewport the loop exhausts all breakpoints and returns 0
        const el = await fixture<UiGrid>(html`
            <ui-grid container .spacing=${{ md: 3 }}></ui-grid>
        `);
        await setWidth(el, 375); // xs → falls back to 0
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        expect(wrapper.style.gap).toBe('0px 0px');
    });

    it('resolves responsive columnSpacing object at current breakpoint', async () => {
        const el = await fixture<UiGrid>(html`
            <ui-grid container .rowSpacing=${1} .columnSpacing=${{ xs: 2, md: 4 }}></ui-grid>
        `);
        await setWidth(el, 375); // xs col = 2*8=16px, row = 8px
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        expect(wrapper.style.gap).toBe('8px 16px');

        await setWidth(el, 960); // md col = 4*8=32px
        expect(wrapper.style.gap).toBe('8px 32px');
    });

    // -------------------------------------------------------------------------
    // _resolveResponsive: string number for spacing
    // -------------------------------------------------------------------------

    it('converts spacing string number to numeric px value', async () => {
        // spacing="2" as a string attribute exercises the isNaN(Number(val)) branch
        const el = await fixture<UiGrid>(html`<ui-grid container spacing="2"></ui-grid>`);
        await setWidth(el, 375);
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        expect(wrapper.style.gap).toBe('16px 16px');
    });

    // -------------------------------------------------------------------------
    // _resolveResponsiveOrder: object with no match at current breakpoint
    // -------------------------------------------------------------------------

    it('resolves order to undefined when object has no matching lower breakpoint', async () => {
        // order={{ md: 0 }} — at xs viewport there is no xs/sm/md entry for xs
        const el = await fixture<UiGrid>(html`<ui-grid xs="12" .order=${{ md: 0 }}></ui-grid>`);
        await setWidth(el, 375); // xs — md does not cascade downward
        // No order applied since no xs match
        expect(el.style.order).toBe('');
    });

    // -------------------------------------------------------------------------
    // _getEffectiveColumns: container branch
    // -------------------------------------------------------------------------

    it('returns its own columns value when the element is a container', async () => {
        // A container+item hybrid with xs set: _getEffectiveColumns should use
        // this.columns directly (skipping CSS var lookup) because container=true
        const el = await fixture<UiGrid>(html`
            <ui-grid container columns="8" xs="4"></ui-grid>
        `);
        await setWidth(el, 375);
        // 4/8 = 50%
        expect(el.style.flexBasis).toContain('50%');
    });

    // -------------------------------------------------------------------------
    // Direction variants
    // -------------------------------------------------------------------------

    it('applies direction-row class on container with default direction', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container></ui-grid>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper');
        expect(wrapper?.classList.contains('direction-row')).toBe(true);
    });

    it('applies direction-row-reverse class', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container direction="row-reverse"></ui-grid>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper');
        expect(wrapper?.classList.contains('direction-row-reverse')).toBe(true);
    });

    it('applies direction-column-reverse class', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container direction="column-reverse"></ui-grid>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper');
        expect(wrapper?.classList.contains('direction-column-reverse')).toBe(true);
    });

    // -------------------------------------------------------------------------
    // Spacing: gap has only one part (row === column)
    // -------------------------------------------------------------------------

    it('uses single gap value for --ui-grid-column-gap when gap is uniform', async () => {
        // spacing=2 produces "16px 16px" → parts[1] = '16px'
        const el = await fixture<UiGrid>(html`<ui-grid container spacing="2"></ui-grid>`);
        await setWidth(el, 375);
        expect(el.style.getPropertyValue('--ui-grid-column-gap')).toBe('16px');
    });

    // -------------------------------------------------------------------------
    // Breakpoint cascade: sm size resolves at sm viewport
    // -------------------------------------------------------------------------

    it('applies sm size when viewport is in sm range (600-899px)', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="12" sm="6"></ui-grid>`);
        await setWidth(el, 700); // sm viewport
        expect(el.style.flexBasis).toContain('50%');
    });

    // -------------------------------------------------------------------------
    // disconnectedCallback removes resize listener
    // -------------------------------------------------------------------------

    it('removes resize listener on disconnect', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="12" md="6"></ui-grid>`);
        const removeSpy = vi.spyOn(window, 'removeEventListener');
        el.remove();
        expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
        removeSpy.mockRestore();
    });

    // -------------------------------------------------------------------------
    // _breakpointCache: second lookup returns cached value
    // -------------------------------------------------------------------------

    it('uses cached breakpoint values on repeated style calculations', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid xs="6"></ui-grid>`);
        // First call populates cache, second call returns cached value
        await setWidth(el, 375);
        await setWidth(el, 375); // second render — cache hit
        expect(el.style.flexBasis).toContain('50%');
    });

    // -------------------------------------------------------------------------
    // _toPx: string spacing value (already px)
    // -------------------------------------------------------------------------

    it('passes through string spacing value as-is (no unit multiplication)', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container .spacing=${'20px'}></ui-grid>`);
        await setWidth(el, 375);
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        expect(wrapper.style.gap).toBe('20px 20px');
    });

    // -------------------------------------------------------------------------
    // _resolveResponsive: string numeric value (not a px string, not an object)
    // -------------------------------------------------------------------------

    it('converts plain string number spacing to numeric px (e.g. spacing="3" via property)', async () => {
        // Property binding with a string number exercises the
        // `typeof val === 'string' && !isNaN(Number(val))` branch in _resolveResponsive
        const el = await fixture<UiGrid>(html`<ui-grid container .spacing=${'3'}></ui-grid>`);
        await setWidth(el, 375);
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        expect(wrapper.style.gap).toBe('24px 24px');
    });

    // -------------------------------------------------------------------------
    // _getBreakpointValue: CSS custom property lookup (lines 73-74)
    // -------------------------------------------------------------------------

    it('reads breakpoint value from CSS custom property when set on :root', async () => {
        // Set a custom breakpoint on :root so _getBreakpointValue parses it
        document.documentElement.style.setProperty('--ui-breakpoint-sm', '500');
        try {
            const el = await fixture<UiGrid>(html`<ui-grid xs="12" sm="6"></ui-grid>`);
            // Clear the cache so it re-reads from getComputedStyle
            (el as unknown as { _breakpointCache: Record<string, number> })._breakpointCache = {};
            await setWidth(el, 520); // above our custom 500px sm breakpoint
            expect(el.style.flexBasis).toContain('50%');
        } finally {
            document.documentElement.style.removeProperty('--ui-breakpoint-sm');
        }
    });
});