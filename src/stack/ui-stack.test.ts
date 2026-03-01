import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-stack.js';
import type { UiStack } from './ui-stack.js';

describe('ui-stack', () => {
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

    it('is defined', () => {
        const el = document.createElement('ui-stack');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('applies default column direction', async () => {
        const el = await fixture<UiStack>(html`<ui-stack></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.flexDirection).toBe('column');
    });

    it('applies row direction', async () => {
        const el = await fixture<UiStack>(html`<ui-stack direction="row"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.flexDirection).toBe('row');
    });

    it('applies spacing as gap', async () => {
        const el = await fixture<UiStack>(html`<ui-stack spacing="2"></ui-stack>`);
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.gap).toBe('16px');
    });

    it('handles responsive direction', async () => {
        vi.stubGlobal('innerWidth', 375); // xs
        const el = await fixture<UiStack>(html`<ui-stack .direction=${{ xs: 'column', sm: 'row' }}></ui-stack>`);
        (el as unknown as { _currentWidth: number })._currentWidth = 375;
        await el.updateComplete;

        let wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.flexDirection).toBe('column');

        // Change to sm
        vi.stubGlobal('innerWidth', 700);
        (el as unknown as { _currentWidth: number })._currentWidth = 700;
        await el.updateComplete;

        wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.flexDirection).toBe('row');
    });

    it('applies alignment and justification', async () => {
        const el = await fixture<UiStack>(html`<ui-stack .alignItems=${'center'} .justifyContent=${'space-between'}></ui-stack>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.stack-wrapper') as HTMLElement;
        expect(wrapper.style.alignItems).toBe('center');
        expect(wrapper.style.justifyContent).toBe('space-between');
    });
});
