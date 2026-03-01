import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-element';
import type { UiElement } from './ui-element';

describe('ui-element', () => {
    it('renders with default values', async () => {
        const el = await fixture<UiElement>(html`<ui-element></ui-element>`);
        expect(el.name).toBe('World');
        expect(el.count).toBe(0);
        const h1 = el.shadowRoot!.querySelector('h1')!;
        expect(h1.textContent).toContain('Hello, World!');
    });

    it('increments count on button click', async () => {
        const el = await fixture<UiElement>(html`<ui-element></ui-element>`);
        const button = el.shadowRoot!.querySelector('button')!;
        button.click();
        expect(el.count).toBe(1);
        await el.updateComplete;
        expect(button.textContent).toContain('1');
    });

    it('allows property overrides', async () => {
        const el = await fixture<UiElement>(html`<ui-element name="Test" count="5"></ui-element>`);
        expect(el.name).toBe('Test');
        expect(el.count).toBe(5);
    });
});
