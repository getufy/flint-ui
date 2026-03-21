import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-paper';
import type { FlintPaper } from './flint-paper';
import { expectAccessible } from '../test-utils/axe.js';

describe('FlintPaper', () => {
    // ── Construction ─────────────────────────────────────────────────────────

    it('is defined', () => {
        const el = document.createElement('flint-paper');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    // ── Default properties ────────────────────────────────────────────────────

    it('renders with default property values', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper>Default Paper</flint-paper>`);
        expect(el.elevation).toBe(1);
        expect(el.square).toBe(false);
        expect(el.variant).toBe('elevated');
    });

    it('reflects default properties to attributes', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper></flint-paper>`);
        expect(el.getAttribute('elevation')).toBe('1');
        expect(el.hasAttribute('square')).toBe(false);
        expect(el.getAttribute('variant')).toBe('elevated');
    });

    // ── Attribute initialisation ──────────────────────────────────────────────

    it('reads elevation from attribute', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper elevation="4"></flint-paper>`);
        expect(el.elevation).toBe(4);
        expect(el.getAttribute('elevation')).toBe('4');
    });

    it('reads square from attribute', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper square></flint-paper>`);
        expect(el.square).toBe(true);
        expect(el.hasAttribute('square')).toBe(true);
    });

    it('reads variant from attribute', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper variant="outlined"></flint-paper>`);
        expect(el.variant).toBe('outlined');
        expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('reads flat variant from attribute', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper variant="flat"></flint-paper>`);
        expect(el.variant).toBe('flat');
        expect(el.getAttribute('variant')).toBe('flat');
    });

    it('reflects all attributes together', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper elevation="8" square variant="outlined"></flint-paper>`);
        expect(el.elevation).toBe(8);
        expect(el.square).toBe(true);
        expect(el.variant).toBe('outlined');
        expect(el.getAttribute('elevation')).toBe('8');
        expect(el.hasAttribute('square')).toBe(true);
        expect(el.getAttribute('variant')).toBe('outlined');
    });

    // ── Dynamic property changes ──────────────────────────────────────────────

    it('reflects elevation property change to attribute', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper></flint-paper>`);
        el.elevation = 12;
        await el.updateComplete;
        expect(el.getAttribute('elevation')).toBe('12');
    });

    it('reflects square property change to attribute', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper></flint-paper>`);
        el.square = true;
        await el.updateComplete;
        expect(el.hasAttribute('square')).toBe(true);
    });

    it('removes square attribute when set to false', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper square></flint-paper>`);
        el.square = false;
        await el.updateComplete;
        expect(el.hasAttribute('square')).toBe(false);
    });

    it('reflects variant property change to attribute', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper></flint-paper>`);
        el.variant = 'outlined';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('reflects variant change to flat', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper></flint-paper>`);
        el.variant = 'flat';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('flat');
    });

    // ── Slotted content ───────────────────────────────────────────────────────

    it('renders slotted content', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper>Paper Content</flint-paper>`);
        expect(el.textContent).toBe('Paper Content');
    });

    it('renders slotted HTML elements', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper><span id="child">text</span></flint-paper>`);
        expect(el.querySelector('#child')).not.toBeNull();
    });

    // ── Shadow DOM structure ──────────────────────────────────────────────────

    it('renders a <slot> in the shadow root', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper></flint-paper>`);
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).not.toBeNull();
    });

    it('does not render any extra wrapper div', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper></flint-paper>`);
        const divs = el.shadowRoot!.querySelectorAll('div');
        expect(divs.length).toBe(0);
    });

    it('does not expose a landmark role', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper></flint-paper>`);
        // shadow root should contain only a <slot>, not a role="region" element
        const regionEl = el.shadowRoot!.querySelector('[role]');
        expect(regionEl).toBeNull();
    });

    // ── Invalid / edge-case elevation values ─────────────────────────────────

    it('accepts unsupported elevation values without throwing', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper elevation="5"></flint-paper>`);
        expect(el.elevation).toBe(5);
        expect(el.getAttribute('elevation')).toBe('5');
    });

    it('accepts elevation="0"', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper elevation="0"></flint-paper>`);
        expect(el.elevation).toBe(0);
    });

    it('accepts elevation="24"', async () => {
        const el = await fixture<FlintPaper>(html`<flint-paper elevation="24"></flint-paper>`);
        expect(el.elevation).toBe(24);
    });

    describe('accessibility', () => {
        it('should be accessible', async () => {
            const el = await fixture(html`<flint-paper>Content</flint-paper>`);
            await expectAccessible(el);
        });
    });
});
