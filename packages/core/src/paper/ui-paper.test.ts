import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-paper';
import type { UiPaper } from './ui-paper';

describe('UiPaper', () => {
    // ── Construction ─────────────────────────────────────────────────────────

    it('is defined', () => {
        const el = document.createElement('ui-paper');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    // ── Default properties ────────────────────────────────────────────────────

    it('renders with default property values', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper>Default Paper</ui-paper>`);
        expect(el.elevation).toBe(1);
        expect(el.square).toBe(false);
        expect(el.variant).toBe('elevated');
    });

    it('reflects default properties to attributes', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper></ui-paper>`);
        expect(el.getAttribute('elevation')).toBe('1');
        expect(el.hasAttribute('square')).toBe(false);
        expect(el.getAttribute('variant')).toBe('elevated');
    });

    // ── Attribute initialisation ──────────────────────────────────────────────

    it('reads elevation from attribute', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper elevation="4"></ui-paper>`);
        expect(el.elevation).toBe(4);
        expect(el.getAttribute('elevation')).toBe('4');
    });

    it('reads square from attribute', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper square></ui-paper>`);
        expect(el.square).toBe(true);
        expect(el.hasAttribute('square')).toBe(true);
    });

    it('reads variant from attribute', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper variant="outlined"></ui-paper>`);
        expect(el.variant).toBe('outlined');
        expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('reads flat variant from attribute', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper variant="flat"></ui-paper>`);
        expect(el.variant).toBe('flat');
        expect(el.getAttribute('variant')).toBe('flat');
    });

    it('reflects all attributes together', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper elevation="8" square variant="outlined"></ui-paper>`);
        expect(el.elevation).toBe(8);
        expect(el.square).toBe(true);
        expect(el.variant).toBe('outlined');
        expect(el.getAttribute('elevation')).toBe('8');
        expect(el.hasAttribute('square')).toBe(true);
        expect(el.getAttribute('variant')).toBe('outlined');
    });

    // ── Dynamic property changes ──────────────────────────────────────────────

    it('reflects elevation property change to attribute', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper></ui-paper>`);
        el.elevation = 12;
        await el.updateComplete;
        expect(el.getAttribute('elevation')).toBe('12');
    });

    it('reflects square property change to attribute', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper></ui-paper>`);
        el.square = true;
        await el.updateComplete;
        expect(el.hasAttribute('square')).toBe(true);
    });

    it('removes square attribute when set to false', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper square></ui-paper>`);
        el.square = false;
        await el.updateComplete;
        expect(el.hasAttribute('square')).toBe(false);
    });

    it('reflects variant property change to attribute', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper></ui-paper>`);
        el.variant = 'outlined';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('reflects variant change to flat', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper></ui-paper>`);
        el.variant = 'flat';
        await el.updateComplete;
        expect(el.getAttribute('variant')).toBe('flat');
    });

    // ── Slotted content ───────────────────────────────────────────────────────

    it('renders slotted content', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper>Paper Content</ui-paper>`);
        expect(el.textContent).toBe('Paper Content');
    });

    it('renders slotted HTML elements', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper><span id="child">text</span></ui-paper>`);
        expect(el.querySelector('#child')).not.toBeNull();
    });

    // ── Shadow DOM structure ──────────────────────────────────────────────────

    it('renders a <slot> in the shadow root', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper></ui-paper>`);
        const slot = el.shadowRoot!.querySelector('slot');
        expect(slot).not.toBeNull();
    });

    it('does not render any extra wrapper div', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper></ui-paper>`);
        const divs = el.shadowRoot!.querySelectorAll('div');
        expect(divs.length).toBe(0);
    });

    it('does not expose a landmark role', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper></ui-paper>`);
        // shadow root should contain only a <slot>, not a role="region" element
        const regionEl = el.shadowRoot!.querySelector('[role]');
        expect(regionEl).toBeNull();
    });

    // ── Invalid / edge-case elevation values ─────────────────────────────────

    it('accepts unsupported elevation values without throwing', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper elevation="5"></ui-paper>`);
        expect(el.elevation).toBe(5);
        expect(el.getAttribute('elevation')).toBe('5');
    });

    it('accepts elevation="0"', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper elevation="0"></ui-paper>`);
        expect(el.elevation).toBe(0);
    });

    it('accepts elevation="24"', async () => {
        const el = await fixture<UiPaper>(html`<ui-paper elevation="24"></ui-paper>`);
        expect(el.elevation).toBe(24);
    });
});
