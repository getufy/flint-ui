import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-typography.js';
import type { UiTypography } from './ui-typography.js';

describe('ui-typography', () => {
    // ── Defaults ────────────────────────────────────────────────────────
    it('is defined', () => {
        const el = document.createElement('ui-typography');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('defaults to body1 variant', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography>Text</ui-typography>`);
        expect(el.variant).toBe('body1');
    });

    it('defaults to textPrimary color', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography>Text</ui-typography>`);
        expect(el.color).toBe('textPrimary');
    });

    it('defaults align to left', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography>Text</ui-typography>`);
        expect(el.align).toBe('left');
    });

    it('defaults noWrap to false', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography>Text</ui-typography>`);
        expect(el.noWrap).toBe(false);
    });

    it('defaults gutterBottom to false', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography>Text</ui-typography>`);
        expect(el.gutterBottom).toBe(false);
    });

    it('defaults paragraph to false', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography>Text</ui-typography>`);
        expect(el.paragraph).toBe(false);
    });

    // ── Variant → tag mapping ────────────────────────────────────────────
    it('renders p tag for body1', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="body1">Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('p')).not.toBeNull();
    });

    it('renders p tag for body2', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="body2">Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('p')).not.toBeNull();
    });

    it('renders h1 tag for h1 variant', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="h1">Heading</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h1')).not.toBeNull();
    });

    it('renders h2 tag for h2 variant', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="h2">Heading</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h2')).not.toBeNull();
    });

    it('renders h3 tag for h3 variant', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="h3">Heading</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h3')).not.toBeNull();
    });

    it('renders h4 tag for h4 variant', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="h4">Heading</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h4')).not.toBeNull();
    });

    it('renders h5 tag for h5 variant', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="h5">Heading</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h5')).not.toBeNull();
    });

    it('renders h6 tag for h6 variant', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="h6">Heading</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h6')).not.toBeNull();
    });

    it('renders h6 tag for subtitle1', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="subtitle1">Sub</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h6')).not.toBeNull();
    });

    it('renders h6 tag for subtitle2', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="subtitle2">Sub</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h6')).not.toBeNull();
    });

    it('renders span tag for caption', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="caption">Cap</ui-typography>`);
        expect(el.shadowRoot!.querySelector('span')).not.toBeNull();
    });

    it('renders span tag for overline', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="overline">Over</ui-typography>`);
        expect(el.shadowRoot!.querySelector('span')).not.toBeNull();
    });

    it('renders p tag for inherit variant', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="inherit">Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('p')).not.toBeNull();
    });

    it('inherit variant does not add variant class to inner element', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="inherit">Text</ui-typography>`);
        const inner = el.shadowRoot!.querySelector('.typography')!;
        expect(inner.classList.contains('inherit')).toBe(false);
        expect(inner.className.trim()).toBe('typography');
    });

    // ── component prop (custom tag override) ────────────────────────────
    it('component prop renders h1 tag', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography .component=${'h1'}>Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h1')).not.toBeNull();
    });

    it('component prop renders h2 tag', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography .component=${'h2'}>Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h2')).not.toBeNull();
    });

    it('component prop renders h3 tag', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography .component=${'h3'}>Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h3')).not.toBeNull();
    });

    it('component prop renders h4 tag', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography .component=${'h4'}>Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h4')).not.toBeNull();
    });

    it('component prop renders h5 tag', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography .component=${'h5'}>Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h5')).not.toBeNull();
    });

    it('component prop renders h6 tag', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography .component=${'h6'}>Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('h6')).not.toBeNull();
    });

    it('component prop renders p tag', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography .component=${'p'}>Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('p')).not.toBeNull();
    });

    it('component prop renders span tag', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography .component=${'span'}>Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('span')).not.toBeNull();
    });

    it('component prop renders div tag', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography .component=${'div'}>Text</ui-typography>`);
        expect(el.shadowRoot!.querySelector('div')).not.toBeNull();
    });

    it('component prop falls back to p for unknown tag name', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography .component=${'article'}>Text</ui-typography>`);
        // unknown tag not in map → falls back to literal`p`
        expect(el.shadowRoot!.querySelector('p')).not.toBeNull();
    });

    // ── Boolean props ────────────────────────────────────────────────────
    it('applies noWrap attribute', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography noWrap>Long text</ui-typography>`);
        expect(el.noWrap).toBe(true);
        expect(el.hasAttribute('nowrap')).toBe(true);
    });

    it('applies gutterBottom attribute', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography gutterBottom>Text</ui-typography>`);
        expect(el.gutterBottom).toBe(true);
        expect(el.hasAttribute('gutterbottom')).toBe(true);
    });

    it('applies paragraph attribute', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography paragraph>Text</ui-typography>`);
        expect(el.paragraph).toBe(true);
        expect(el.hasAttribute('paragraph')).toBe(true);
    });

    // ── Reflection ───────────────────────────────────────────────────────
    it('reflects variant attribute', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="h3">Heading</ui-typography>`);
        expect(el.getAttribute('variant')).toBe('h3');
    });

    it('reflects color attribute', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography color="primary">Text</ui-typography>`);
        expect(el.getAttribute('color')).toBe('primary');
    });

    it('reflects align attribute', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography align="center">Text</ui-typography>`);
        expect(el.getAttribute('align')).toBe('center');
    });

    // ── Colors ───────────────────────────────────────────────────────────
    it('sets color to primary', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography color="primary">Text</ui-typography>`);
        expect(el.color).toBe('primary');
    });

    it('sets color to secondary', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography color="secondary">Text</ui-typography>`);
        expect(el.color).toBe('secondary');
    });

    it('sets color to success', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography color="success">Text</ui-typography>`);
        expect(el.color).toBe('success');
    });

    it('sets color to error', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography color="error">Text</ui-typography>`);
        expect(el.color).toBe('error');
    });

    it('sets color to warning', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography color="warning">Text</ui-typography>`);
        expect(el.color).toBe('warning');
    });

    it('sets color to info', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography color="info">Text</ui-typography>`);
        expect(el.color).toBe('info');
    });

    it('sets color to textSecondary', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography color="textSecondary">Text</ui-typography>`);
        expect(el.color).toBe('textSecondary');
    });

    it('sets color to inherit', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography color="inherit">Text</ui-typography>`);
        expect(el.color).toBe('inherit');
    });

    // ── Alignment ────────────────────────────────────────────────────────
    it('sets align to center', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography align="center">Text</ui-typography>`);
        expect(el.align).toBe('center');
    });

    it('sets align to right', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography align="right">Text</ui-typography>`);
        expect(el.align).toBe('right');
    });

    it('sets align to justify', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography align="justify">Text</ui-typography>`);
        expect(el.align).toBe('justify');
    });

    // ── Rendered class names ─────────────────────────────────────────────
    it('inner element has typography + variant class', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="h2">Text</ui-typography>`);
        const inner = el.shadowRoot!.querySelector('.typography')!;
        expect(inner.classList.contains('h2')).toBe(true);
    });

    it('inner element has only typography class for inherit variant', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="inherit">Text</ui-typography>`);
        const inner = el.shadowRoot!.querySelector('.typography')!;
        expect(inner.className.trim()).toBe('typography');
    });

    // ── Unknown variant fallback (branch coverage) ───────────────────────
    it('falls back to p for unknown variant value set via attribute', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography>Text</ui-typography>`);
        // Set an unknown variant at runtime (bypasses TS typing via attribute)
        el.setAttribute('variant', 'unknown-variant');
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('p')).not.toBeNull();
    });

    // ── Slot content ─────────────────────────────────────────────────────
    it('renders slot content', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography>Hello world</ui-typography>`);
        const textNodes = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
        const text = textNodes.map(n => n.textContent).join('').trim();
        expect(text).toBe('Hello world');
    });
});
