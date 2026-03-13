import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-button';
import type { UiButton } from './ui-button';

describe('ui-button', () => {
    it('renders with default properties', async () => {
        const el = await fixture<UiButton>(html`<ui-button>Click Me</ui-button>`);
        expect(el.variant).toBe('primary');
        expect(el.size).toBe('medium');
        expect(el.disabled).toBe(false);

        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('primary');
        expect(button.className).toContain('medium');
        expect(button.className).not.toContain('secondary');
        expect(button.className).not.toContain('destructive');
        expect(button.className).not.toContain('small');
        expect(button.className).not.toContain('large');
        expect(button.disabled).toBe(false);
    });

    it('applies variant and size classes', async () => {
        const el = await fixture<UiButton>(html`<ui-button variant="secondary" size="small">Click</ui-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('secondary');
        expect(button.className).toContain('small');
        expect(button.className).not.toContain('primary');
        expect(button.className).not.toContain('destructive');
        expect(button.className).not.toContain('medium');
        expect(button.className).not.toContain('large');
    });

    it('passes disabled state to native button', async () => {
        const el = await fixture<UiButton>(html`<ui-button disabled></ui-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.disabled).toBe(true);
    });

    it('renders with type="button" to prevent form submission', async () => {
        const el = await fixture<UiButton>(html`<ui-button>Click</ui-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.type).toBe('button');
    });

    it('applies large size class', async () => {
        const el = await fixture<UiButton>(html`<ui-button size="large">Large</ui-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('large');
        expect(button.className).not.toContain('small');
        expect(button.className).not.toContain('medium');
    });

    it('renders slotted content', async () => {
        const el = await fixture<UiButton>(html`<ui-button>Hello World</ui-button>`);
        expect(el.textContent?.trim()).toBe('Hello World');
    });

    it('exposes part="button" for external styling', async () => {
        const el = await fixture<UiButton>(html`<ui-button>Click</ui-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.getAttribute('part')).toBe('button');
    });

    it('applies destructive variant class', async () => {
        const el = await fixture<UiButton>(html`<ui-button variant="destructive">Delete</ui-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('destructive');
        expect(button.className).not.toContain('primary');
    });

    it('reflects full-width attribute and switches host to block', async () => {
        const el = await fixture<UiButton>(html`<ui-button full-width>Wide</ui-button>`);
        expect(el.hasAttribute('full-width')).toBe(true);
        expect(el.fullWidth).toBe(true);
    });

    it('does not have full-width attribute by default', async () => {
        const el = await fixture<UiButton>(html`<ui-button>Default</ui-button>`);
        expect(el.hasAttribute('full-width')).toBe(false);
        expect(el.fullWidth).toBe(false);
    });
});
