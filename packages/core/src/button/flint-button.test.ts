import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-button';
import type { FlintButton } from './flint-button';
import { expectAccessible } from '../test-utils/axe';

describe('flint-button', () => {
    it('renders with default properties', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Click Me</flint-button>`);
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
        const el = await fixture<FlintButton>(html`<flint-button variant="secondary" size="small">Click</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('secondary');
        expect(button.className).toContain('small');
        expect(button.className).not.toContain('primary');
        expect(button.className).not.toContain('destructive');
        expect(button.className).not.toContain('medium');
        expect(button.className).not.toContain('large');
    });

    it('passes disabled state to native button', async () => {
        const el = await fixture<FlintButton>(html`<flint-button disabled></flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.disabled).toBe(true);
    });

    it('renders with type="button" to prevent form submission', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Click</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.type).toBe('button');
    });

    it('applies large size class', async () => {
        const el = await fixture<FlintButton>(html`<flint-button size="large">Large</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('large');
        expect(button.className).not.toContain('small');
        expect(button.className).not.toContain('medium');
    });

    it('renders slotted content', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Hello World</flint-button>`);
        expect(el.textContent?.trim()).toBe('Hello World');
    });

    it('exposes CSS parts for external styling', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Click</flint-button>`);
        expect(el.shadowRoot!.querySelector('[part="base"]')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="label"]')).not.toBeNull();
    });

    it('applies destructive variant class', async () => {
        const el = await fixture<FlintButton>(html`<flint-button variant="destructive">Delete</flint-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.className).toContain('destructive');
        expect(button.className).not.toContain('primary');
    });

    it('reflects full-width attribute and switches host to block', async () => {
        const el = await fixture<FlintButton>(html`<flint-button full-width>Wide</flint-button>`);
        expect(el.hasAttribute('full-width')).toBe(true);
        expect(el.fullWidth).toBe(true);
    });

    it('does not have full-width attribute by default', async () => {
        const el = await fixture<FlintButton>(html`<flint-button>Default</flint-button>`);
        expect(el.hasAttribute('full-width')).toBe(false);
        expect(el.fullWidth).toBe(false);
    });

    // ── Accessibility ─────────────────────────────────────────────────────────

    it('should pass automated a11y checks', async () => {
        const el = await fixture(html`<flint-button>Click me</flint-button>`);
        await expectAccessible(el);
    });

    it('should pass a11y checks when disabled', async () => {
        const el = await fixture(html`<flint-button disabled>Disabled</flint-button>`);
        await expectAccessible(el);
    });
});
