import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-box.js';
import type { UiBox } from './ui-box.js';

describe('ui-box', () => {
    it('is defined', () => {
        const el = document.createElement('ui-box');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders a div by default', async () => {
        const el = await fixture<UiBox>(html`<ui-box>Content</ui-box>`);
        const innerElement = el.shadowRoot?.querySelector('div');
        expect(innerElement).toBeTruthy();
    });

    it('renders a different element when "component" is set', async () => {
        const el = await fixture<UiBox>(html`<ui-box component="section">Content</ui-box>`);
        const innerElement = el.shadowRoot?.querySelector('section');
        expect(innerElement).toBeTruthy();
        expect(el.shadowRoot?.querySelector('div')).toBeNull();
    });

    it('falls back to div and warns for an invalid component tag', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const el = await fixture<UiBox>(html`<ui-box component="script">Content</ui-box>`);
        expect(el.shadowRoot?.querySelector('div')).toBeTruthy();
        expect(el.shadowRoot?.querySelector('script')).toBeNull();
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('"script"'));
        warn.mockRestore();
    });

    it('applies basic padding/margin through props', async () => {
        const el = await fixture<UiBox>(html`<ui-box p="12px" m="16px">Content</ui-box>`);
        const innerElement = el.shadowRoot!.querySelector('div')!;
        const style = getComputedStyle(innerElement);
        expect(style.padding).toBe('12px');
        expect(style.margin).toBe('16px');
    });

    it('specific margin props override shorthand mx/my', async () => {
        // ml should win over mx (specific beats shorthand)
        const el = await fixture<UiBox>(html`<ui-box mx="20px" ml="5px">Content</ui-box>`);
        const innerElement = el.shadowRoot!.querySelector('div')!;
        expect(innerElement.style.marginLeft).toBe('5px');
        expect(innerElement.style.marginRight).toBe('20px');
    });

    it('specific padding props override shorthand px/py', async () => {
        const el = await fixture<UiBox>(html`<ui-box px="20px" pl="5px">Content</ui-box>`);
        const innerElement = el.shadowRoot!.querySelector('div')!;
        expect(innerElement.style.paddingLeft).toBe('5px');
        expect(innerElement.style.paddingRight).toBe('20px');
    });

    it('applies theme-aware colors via inline style', async () => {
        // Use element.style (not getComputedStyle) — CSS vars are not resolved in happy-dom
        const el = await fixture<UiBox>(html`<ui-box bgcolor="primary" color="secondary">Content</ui-box>`);
        const innerElement = el.shadowRoot!.querySelector('div')!;
        expect(innerElement.style.backgroundColor).toBe('var(--ui-primary-color)');
        expect(innerElement.style.color).toBe('var(--ui-secondary-color)');
    });

    it('passes raw color values through unchanged', async () => {
        const el = await fixture<UiBox>(html`<ui-box bgcolor="#ff0000" color="blue">Content</ui-box>`);
        const innerElement = el.shadowRoot!.querySelector('div')!;
        expect(innerElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
        expect(innerElement.style.color).toBe('blue');
    });

    it('applies flex properties', async () => {
        const el = await fixture<UiBox>(html`<ui-box display="flex" flexDirection="column" alignItems="center">Content</ui-box>`);
        const innerElement = el.shadowRoot!.querySelector('div')!;
        const style = getComputedStyle(innerElement);
        expect(style.display).toBe('flex');
        expect(style.flexDirection).toBe('column');
        expect(style.alignItems).toBe('center');
    });

    it('applies gap', async () => {
        const el = await fixture<UiBox>(html`<ui-box display="flex" gap="8px">Content</ui-box>`);
        const innerElement = el.shadowRoot!.querySelector('div')!;
        expect(innerElement.style.gap).toBe('8px');
    });

    it('applies border and borderRadius', async () => {
        const el = await fixture<UiBox>(html`<ui-box border="2px solid rgb(255, 0, 0)" borderRadius="8px">Content</ui-box>`);
        const innerElement = el.shadowRoot!.querySelector('div')!;
        const style = getComputedStyle(innerElement);
        expect(style.borderTopWidth).toBe('2px');
        expect(style.borderTopStyle).toBe('solid');
        expect(style.borderTopColor).toBe('rgb(255, 0, 0)');
        expect(style.borderRadius).toBe('8px');
    });
});
