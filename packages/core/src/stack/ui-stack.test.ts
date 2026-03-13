import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { UiStack } from './ui-stack.js';

interface StackInternal {
    _currentWidth: number;
    _getBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    _resolveResponsive<T>(val: unknown, bp: string): T;
    _getSpacingPx(spacing: number | string): string;
    _getBreakpointValue(name: string, fallback: number): number;
    _updateDividers(): void;
    updateComplete: Promise<boolean>;
    shadowRoot: ShadowRoot | null;
    querySelector(selector: string): Element | null;
    querySelectorAll(selector: string): NodeListOf<Element>;
    direction: UiStack['direction'];
    remove(): void;
}

function clearBpCache() {
    (UiStack as unknown as { _breakPoints: Record<string, number> })._breakPoints = {};
}

describe('ui-stack', () => {
    let originalInnerWidth: number;

    beforeEach(() => {
        originalInnerWidth = window.innerWidth;
        clearBpCache();
    });

    afterEach(() => {
        vi.stubGlobal('innerWidth', originalInnerWidth);
        vi.restoreAllMocks();
        clearBpCache();
    });

    // ── basic ──────────────────────────────────────────────────────────────

    it('is defined', () => {
        expect(document.createElement('ui-stack')).toBeInstanceOf(HTMLElement);
    });

    it('renders a .stack-wrapper div', async () => {
        const el = await fixture<UiStack>(html`<ui-stack></ui-stack>`);
        expect(el.shadowRoot!.querySelector('.stack-wrapper')).not.toBeNull();
    });

    it('renders slotted children', async () => {
        const el = await fixture<UiStack>(html`
            <ui-stack><div id="child">item</div></ui-stack>
        `);
        expect(el.querySelector('#child')).not.toBeNull();
    });

    // ── direction ─────────────────────────────────────────────────────────

    it('defaults to column direction', async () => {
        const el = await fixture<UiStack>(html`<ui-stack></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.flexDirection).toBe('column');
        expect(wrapper.classList.contains('direction-column')).toBe(true);
    });

    it('applies row direction via attribute', async () => {
        const el = await fixture<UiStack>(html`<ui-stack direction="row"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.flexDirection).toBe('row');
        expect(wrapper.classList.contains('direction-row')).toBe(true);
    });

    it('applies column-reverse direction', async () => {
        const el = await fixture<UiStack>(html`<ui-stack direction="column-reverse"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.flexDirection).toBe('column-reverse');
    });

    it('applies row-reverse direction', async () => {
        const el = await fixture<UiStack>(html`<ui-stack direction="row-reverse"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.flexDirection).toBe('row-reverse');
    });

    it('fromAttribute: parses JSON direction object', async () => {
        const el = await fixture<UiStack>(html`<ui-stack></ui-stack>`);
        el.setAttribute('direction', JSON.stringify({ xs: 'column', md: 'row' }));
        await el.updateComplete;
        expect(el.direction).toEqual({ xs: 'column', md: 'row' });
    });

    it('fromAttribute: returns column when attribute is removed (null)', async () => {
        const el = await fixture<UiStack>(html`<ui-stack direction="row"></ui-stack>`);
        el.removeAttribute('direction');
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.flexDirection).toBe('column');
    });

    // ── spacing ───────────────────────────────────────────────────────────

    it('converts numeric spacing to px gap (× 8)', async () => {
        const el = await fixture<UiStack>(html`<ui-stack spacing="2"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.gap).toBe('16px');
    });

    it('defaults spacing=0 to 0px gap', async () => {
        const el = await fixture<UiStack>(html`<ui-stack></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.gap).toBe('0px');
    });

    it('passes string spacing through unchanged', async () => {
        const el = await fixture<UiStack>(html`<ui-stack .spacing=${'2rem'}></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.gap).toBe('2rem');
    });

    it('sets --ui-stack-spacing custom property', async () => {
        const el = await fixture<UiStack>(html`<ui-stack spacing="2"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.getPropertyValue('--ui-stack-spacing')).toBe('16px');
    });

    // ── alignItems / justifyContent ────────────────────────────────────────

    it('defaults alignItems to stretch for column', async () => {
        const el = await fixture<UiStack>(html`<ui-stack direction="column"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.alignItems).toBe('stretch');
    });

    it('defaults alignItems to stretch for column-reverse', async () => {
        const el = await fixture<UiStack>(html`<ui-stack direction="column-reverse"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.alignItems).toBe('stretch');
    });

    it('defaults alignItems to center for row', async () => {
        const el = await fixture<UiStack>(html`<ui-stack direction="row"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.alignItems).toBe('center');
    });

    it('defaults alignItems to center for row-reverse', async () => {
        const el = await fixture<UiStack>(html`<ui-stack direction="row-reverse"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.alignItems).toBe('center');
    });

    it('applies explicit alignItems override', async () => {
        const el = await fixture<UiStack>(html`<ui-stack direction="row" .alignItems=${'flex-start'}></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.alignItems).toBe('flex-start');
    });

    it('applies all alignItems values', async () => {
        for (const val of ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const) {
            const el = await fixture<UiStack>(html`<ui-stack .alignItems=${val}></ui-stack>`);
            const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
            expect(wrapper.style.alignItems).toBe(val);
        }
    });

    it('applies explicit justifyContent', async () => {
        const el = await fixture<UiStack>(html`<ui-stack .justifyContent=${'space-between'}></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.justifyContent).toBe('space-between');
    });

    it('defaults justifyContent to flex-start', async () => {
        const el = await fixture<UiStack>(html`<ui-stack></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.justifyContent).toBe('flex-start');
    });

    it('applies all justifyContent values', async () => {
        for (const val of ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const) {
            const el = await fixture<UiStack>(html`<ui-stack .justifyContent=${val}></ui-stack>`);
            const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
            expect(wrapper.style.justifyContent).toBe(val);
        }
    });

    // ── useFlexGap ─────────────────────────────────────────────────────────

    it('does not add no-flex-gap class by default', async () => {
        const el = await fixture<UiStack>(html`<ui-stack></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.classList.contains('no-flex-gap')).toBe(false);
    });

    it('adds no-flex-gap class when useFlexGap=false', async () => {
        const el = await fixture<UiStack>(html`<ui-stack .useFlexGap=${false}></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.classList.contains('no-flex-gap')).toBe(true);
        expect(wrapper.style.gap).toBe('0');
    });

    it('still sets --ui-stack-spacing when useFlexGap=false', async () => {
        const el = await fixture<UiStack>(html`<ui-stack .useFlexGap=${false} spacing="2"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.getPropertyValue('--ui-stack-spacing')).toBe('16px');
    });

    // ── responsive direction ───────────────────────────────────────────────

    it('resolves xs direction at 375px', async () => {
        const el = await fixture<UiStack>(html`<ui-stack .direction=${{ xs: 'column', sm: 'row' }}></ui-stack>`);
        (el as unknown as StackInternal)._currentWidth = 375;
        await el.updateComplete;
        expect(
            (el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement).style.flexDirection
        ).toBe('column');
    });

    it('resolves sm direction at 700px', async () => {
        const el = await fixture<UiStack>(html`<ui-stack .direction=${{ xs: 'column', sm: 'row' }}></ui-stack>`);
        (el as unknown as StackInternal)._currentWidth = 700;
        await el.updateComplete;
        expect(
            (el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement).style.flexDirection
        ).toBe('row');
    });

    it('resolves md direction at 950px', async () => {
        const el = await fixture<UiStack>(html`<ui-stack .direction=${{ xs: 'column', md: 'row' }}></ui-stack>`);
        (el as unknown as StackInternal)._currentWidth = 950;
        await el.updateComplete;
        expect(
            (el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement).style.flexDirection
        ).toBe('row');
    });

    it('resolves lg direction at 1250px', async () => {
        const el = await fixture<UiStack>(html`<ui-stack .direction=${{ xs: 'column', lg: 'row' }}></ui-stack>`);
        (el as unknown as StackInternal)._currentWidth = 1250;
        await el.updateComplete;
        expect(
            (el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement).style.flexDirection
        ).toBe('row');
    });

    it('resolves xl direction at 1600px', async () => {
        const el = await fixture<UiStack>(html`<ui-stack .direction=${{ xs: 'column', xl: 'row' }}></ui-stack>`);
        (el as unknown as StackInternal)._currentWidth = 1600;
        await el.updateComplete;
        expect(
            (el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement).style.flexDirection
        ).toBe('row');
    });

    it('cascades direction to lower breakpoint when current not defined', async () => {
        // sm not defined → falls back to xs
        const el = await fixture<UiStack>(html`<ui-stack .direction=${{ xs: 'column-reverse', lg: 'row' }}></ui-stack>`);
        (el as unknown as StackInternal)._currentWidth = 700; // sm
        await el.updateComplete;
        expect(
            (el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement).style.flexDirection
        ).toBe('column-reverse');
    });

    it('falls back to first defined breakpoint key when no lower bps match', async () => {
        // Only md defined; at xs the loop finds nothing → falls back to obj['md']
        const el = await fixture<UiStack>(html`<ui-stack .direction=${{ md: 'row-reverse' }}></ui-stack>`);
        (el as unknown as StackInternal)._currentWidth = 375; // xs
        await el.updateComplete;
        expect(
            (el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement).style.flexDirection
        ).toBe('row-reverse');
    });

    it('handles responsive spacing', async () => {
        const el = await fixture<UiStack>(html`<ui-stack .spacing=${{ xs: 1, md: 3 }}></ui-stack>`);
        (el as unknown as StackInternal)._currentWidth = 375;
        await el.updateComplete;
        expect(
            (el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement).style.gap
        ).toBe('8px');
    });

    // ── _getBreakpoint ─────────────────────────────────────────────────────

    it('_getBreakpoint returns xs below 600', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        el._currentWidth = 400;
        expect(el._getBreakpoint()).toBe('xs');
    });

    it('_getBreakpoint returns sm at 600–899', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        el._currentWidth = 650;
        expect(el._getBreakpoint()).toBe('sm');
    });

    it('_getBreakpoint returns md at 900–1199', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        el._currentWidth = 950;
        expect(el._getBreakpoint()).toBe('md');
    });

    it('_getBreakpoint returns lg at 1200–1535', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        el._currentWidth = 1250;
        expect(el._getBreakpoint()).toBe('lg');
    });

    it('_getBreakpoint returns xl at 1536+', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        el._currentWidth = 1600;
        expect(el._getBreakpoint()).toBe('xl');
    });

    it('_getBreakpoint returns xl at exactly 1536', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        el._currentWidth = 1536;
        expect(el._getBreakpoint()).toBe('xl');
    });

    it('_getBreakpoint returns lg at exactly 1200', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        el._currentWidth = 1200;
        expect(el._getBreakpoint()).toBe('lg');
    });

    // ── _getBreakpointValue ────────────────────────────────────────────────

    it('_getBreakpointValue returns fallback when CSS var absent', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        expect(el._getBreakpointValue('nonexistent-bp', 42)).toBe(42);
    });

    it('_getBreakpointValue returns cached value without calling getComputedStyle', () => {
        (UiStack as unknown as { _breakPoints: Record<string, number> })._breakPoints['cached-sm'] = 777;
        const spy = vi.spyOn(window, 'getComputedStyle');
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        expect(el._getBreakpointValue('cached-sm', 100)).toBe(777);
        expect(spy).not.toHaveBeenCalled();
    });

    it('_getBreakpointValue reads and caches CSS custom property value', () => {
        vi.spyOn(window, 'getComputedStyle').mockReturnValue({
            getPropertyValue: () => ' 800',
        } as unknown as CSSStyleDeclaration);

        const el = document.createElement('ui-stack') as unknown as StackInternal;
        const result = el._getBreakpointValue('css-var-bp', 500);
        expect(result).toBe(800);
        expect(
            (UiStack as unknown as { _breakPoints: Record<string, number> })._breakPoints['css-var-bp']
        ).toBe(800);
    });

    // ── _getSpacingPx ──────────────────────────────────────────────────────

    it('_getSpacingPx multiplies number spacing by 8', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        expect(el._getSpacingPx(0)).toBe('0px');
        expect(el._getSpacingPx(1)).toBe('8px');
        expect(el._getSpacingPx(2)).toBe('16px');
        expect(el._getSpacingPx(0.5)).toBe('4px');
    });

    it('_getSpacingPx returns string spacing unchanged', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        expect(el._getSpacingPx('2rem')).toBe('2rem');
        expect(el._getSpacingPx('16px')).toBe('16px');
        expect(el._getSpacingPx('auto')).toBe('auto');
    });

    // ── _resolveResponsive ─────────────────────────────────────────────────

    it('_resolveResponsive returns scalar values directly', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        expect(el._resolveResponsive('row', 'md')).toBe('row');
        expect(el._resolveResponsive(3, 'sm')).toBe(3);
        expect(el._resolveResponsive(0, 'xs')).toBe(0);
    });

    it('_resolveResponsive returns exact breakpoint match', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        expect(el._resolveResponsive({ xs: 'column', md: 'row' }, 'md')).toBe('row');
    });

    it('_resolveResponsive cascades to nearest lower defined breakpoint', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        // sm not defined → falls back to xs
        expect(el._resolveResponsive({ xs: 'column', lg: 'row' }, 'sm')).toBe('column');
    });

    it('_resolveResponsive falls back to first key when no lower bps defined', () => {
        const el = document.createElement('ui-stack') as unknown as StackInternal;
        // Only md defined; requesting xs — loop finds nothing, returns obj[first key]
        expect(el._resolveResponsive({ md: 'row' }, 'xs')).toBe('row');
    });

    // ── connectedCallback / disconnectedCallback ────────────────────────────

    it('adds resize listener on connectedCallback', async () => {
        const spy = vi.spyOn(window, 'addEventListener');
        await fixture<UiStack>(html`<ui-stack></ui-stack>`);
        expect(spy).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('removes resize listener on disconnectedCallback', async () => {
        const el = await fixture<UiStack>(html`<ui-stack></ui-stack>`);
        const spy = vi.spyOn(window, 'removeEventListener');
        el.remove();
        expect(spy).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    // ── _onResize ──────────────────────────────────────────────────────────

    it('_onResize updates _currentWidth and re-renders', async () => {
        const el = await fixture<UiStack>(html`
            <ui-stack .direction=${{ xs: 'column', sm: 'row' }}></ui-stack>
        `);
        // Set to xs first
        (el as unknown as StackInternal)._currentWidth = 375;
        await el.updateComplete;
        expect(
            (el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement).style.flexDirection
        ).toBe('column');

        // Simulate window resize to sm
        vi.stubGlobal('innerWidth', 700);
        window.dispatchEvent(new Event('resize'));
        await el.updateComplete;

        expect((el as unknown as StackInternal)._currentWidth).toBe(700);
        expect(
            (el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement).style.flexDirection
        ).toBe('row');
    });

    // ── _updateDividers ────────────────────────────────────────────────────

    it('sets divider orientation to vertical for row stack', async () => {
        const el = await fixture<UiStack>(html`
            <ui-stack direction="row">
                <ui-divider></ui-divider>
            </ui-stack>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-divider')!.getAttribute('orientation')).toBe('vertical');
    });

    it('sets divider orientation to horizontal for column stack', async () => {
        const el = await fixture<UiStack>(html`
            <ui-stack direction="column">
                <ui-divider></ui-divider>
            </ui-stack>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-divider')!.getAttribute('orientation')).toBe('horizontal');
    });

    it('sets divider orientation to vertical for row-reverse stack', async () => {
        const el = await fixture<UiStack>(html`
            <ui-stack direction="row-reverse">
                <ui-divider></ui-divider>
            </ui-stack>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-divider')!.getAttribute('orientation')).toBe('vertical');
    });

    it('sets divider orientation to horizontal for column-reverse stack', async () => {
        const el = await fixture<UiStack>(html`
            <ui-stack direction="column-reverse">
                <ui-divider></ui-divider>
            </ui-stack>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-divider')!.getAttribute('orientation')).toBe('horizontal');
    });

    it('skips setAttribute when divider orientation already correct', async () => {
        const el = await fixture<UiStack>(html`
            <ui-stack direction="row">
                <ui-divider></ui-divider>
            </ui-stack>
        `);
        await el.updateComplete;
        const divider = el.querySelector('ui-divider')!;
        // After first render, orientation is already 'vertical'
        const setSpy = vi.spyOn(divider, 'setAttribute');
        // Trigger another update with the same direction
        (el as unknown as StackInternal)._currentWidth = 500;
        await el.updateComplete;
        expect(setSpy).not.toHaveBeenCalled();
    });

    it('_updateDividers handles stack with no dividers', async () => {
        const el = await fixture<UiStack>(html`<ui-stack direction="row"><div>item</div></ui-stack>`);
        await el.updateComplete;
        // Should not throw
        expect(el).toBeDefined();
    });

    it('updates orientation on multiple dividers', async () => {
        const el = await fixture<UiStack>(html`
            <ui-stack direction="row">
                <ui-divider></ui-divider>
                <ui-divider></ui-divider>
            </ui-stack>
        `);
        await el.updateComplete;
        const dividers = el.querySelectorAll('ui-divider');
        dividers.forEach(d => expect(d.getAttribute('orientation')).toBe('vertical'));
    });

    it('updates divider orientation when direction changes', async () => {
        const el = await fixture<UiStack>(html`
            <ui-stack direction="column">
                <ui-divider></ui-divider>
            </ui-stack>
        `);
        await el.updateComplete;
        expect(el.querySelector('ui-divider')!.getAttribute('orientation')).toBe('horizontal');

        el.direction = 'row';
        await el.updateComplete;
        expect(el.querySelector('ui-divider')!.getAttribute('orientation')).toBe('vertical');
    });
});
