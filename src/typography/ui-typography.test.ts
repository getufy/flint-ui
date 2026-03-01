import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-typography.js';
import type { UiTypography } from './ui-typography.js';

describe('ui-typography', () => {
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

    it('renders a p tag for body1', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="body1">Text</ui-typography>`);
        const inner = el.shadowRoot!.querySelector('p');
        expect(inner).not.toBeNull();
    });

    it('renders an h1 tag for h1 variant', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="h1">Heading</ui-typography>`);
        const inner = el.shadowRoot!.querySelector('h1');
        expect(inner).not.toBeNull();
    });

    it('renders h6 tag for subtitle1', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="subtitle1">Sub</ui-typography>`);
        const inner = el.shadowRoot!.querySelector('h6');
        expect(inner).not.toBeNull();
    });

    it('renders span tag for caption', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="caption">Cap</ui-typography>`);
        const inner = el.shadowRoot!.querySelector('span');
        expect(inner).not.toBeNull();
    });

    it('applies noWrap attribute', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography noWrap>Long text</ui-typography>`);
        expect(el.noWrap).toBe(true);
        expect(el.hasAttribute('nowrap')).toBe(true);
    });

    it('applies gutterBottom attribute', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography gutterBottom>Text</ui-typography>`);
        expect(el.gutterBottom).toBe(true);
    });

    it('reflects variant attribute', async () => {
        const el = await fixture<UiTypography>(html`<ui-typography variant="h3">Heading</ui-typography>`);
        expect(el.getAttribute('variant')).toBe('h3');
    });
});
