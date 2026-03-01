import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-grid.js';
import type { UiGrid } from './ui-grid.js';

describe('ui-grid', () => {
    let originalInnerWidth: number;

    beforeEach(() => {
        originalInnerWidth = window.innerWidth;
        // Mock ResizeObserver for JSDOM correctly
        global.ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    });

    afterEach(() => {
        vi.stubGlobal('innerWidth', originalInnerWidth);
    });

    it('is defined', () => {
        const el = document.createElement('ui-grid');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('applies container class when container: true', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container></ui-grid>`);
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper');
        expect(wrapper?.classList.contains('container')).toBe(true);
    });

    it('applies basic xs size correctly via host styles', async () => {
        vi.stubGlobal('innerWidth', 375); // xs
        const el = await fixture<UiGrid>(html`<ui-grid xs="6"></ui-grid>`);
        (el as unknown as { _currentWidth: number })._currentWidth = 375;
        await el.updateComplete;
        // Item styles are applied to the host element (this.style), not the inner wrapper
        expect(el.style.flexBasis).toContain('50%');
        expect(el.style.maxWidth).toContain('50%');
    });

    it('applies auto-layout size (xs=true)', async () => {
        vi.stubGlobal('innerWidth', 375); // xs
        const el = await fixture<UiGrid>(html`<ui-grid .xs=${true}></ui-grid>`);
        (el as unknown as { _currentWidth: number })._currentWidth = 375;
        await el.updateComplete;
        // xs=true sets flex-grow:1 and flex-basis:0% on the host element
        expect(el.style.flexBasis).toBe('0%');
        expect(el.style.flexGrow).toBe('1');
    });

    it('applies auto width content (xs="auto")', async () => {
        vi.stubGlobal('innerWidth', 375); // xs
        const el = await fixture<UiGrid>(html`<ui-grid .xs=${'auto'}></ui-grid>`);
        (el as unknown as { _currentWidth: number })._currentWidth = 375;
        await el.updateComplete;
        // xs="auto" sets flex-basis:auto and width:auto on the host element
        expect(el.style.flexBasis).toBe('auto');
        expect(el.style.width).toBe('auto');
    });

    it('calculates size based on "columns" prop', async () => {
        vi.stubGlobal('innerWidth', 375); // xs
        const el = await fixture<UiGrid>(html`<ui-grid columns="16" xs="4"></ui-grid>`);
        (el as unknown as { _currentWidth: number })._currentWidth = 375;
        await el.updateComplete;
        // 4/16 = 25%; applied to host element
        expect(el.style.flexBasis).toContain('25%');
    });

    it('applies spacing in container', async () => {
        vi.stubGlobal('innerWidth', 375); // xs
        const el = await fixture<UiGrid>(html`<ui-grid container spacing="3"></ui-grid>`);
        (el as unknown as { _currentWidth: number })._currentWidth = 375;
        await el.updateComplete;
        // Spacing/gap goes on the inner wrapper (applied via styleMap in render())
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        expect(wrapper.style.gap).toBe('24px 24px');
    });

    it('applies offset correctly', async () => {
        vi.stubGlobal('innerWidth', 375); // xs
        const el = await fixture<UiGrid>(html`<ui-grid xs="4" .offset=${{ xs: 4 }}></ui-grid>`);
        (el as unknown as { _currentWidth: number })._currentWidth = 375;
        await el.updateComplete;
        // Offset margin-left is applied to host element as a percentage
        expect(parseFloat(el.style.marginLeft)).toBeCloseTo(33.33, 1);
    });

    it('applies flex direction class on wrapper', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container direction="column"></ui-grid>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper');
        expect(wrapper?.classList.contains('direction-column')).toBe(true);
    });

    it('applies flex alignment styles on wrapper', async () => {
        const el = await fixture<UiGrid>(html`<ui-grid container align-items="center" justify-content="space-between"></ui-grid>`);
        await el.updateComplete;
        // Alignment styles are applied to the inner wrapper via styleMap
        const wrapper = el.shadowRoot!.querySelector('.grid-wrapper') as HTMLDivElement;
        expect(wrapper.style.alignItems || wrapper.style.getPropertyValue('align-items')).toBe('center');
        expect(wrapper.style.justifyContent || wrapper.style.getPropertyValue('justify-content')).toBe('space-between');
    });
});
