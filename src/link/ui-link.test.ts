import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-link.js';
import type { UiLink } from './ui-link.js';

describe('ui-link', () => {
    it('is defined', () => {
        const el = document.createElement('ui-link');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders an anchor element', async () => {
        const el = await fixture<UiLink>(html`<ui-link href="/foo">Click me</ui-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor).not.toBeNull();
        expect(anchor!.getAttribute('href')).toBe('/foo');
    });

    it('defaults color to primary', async () => {
        const el = await fixture<UiLink>(html`<ui-link href="#">Link</ui-link>`);
        expect(el.color).toBe('primary');
    });

    it('defaults underline to always', async () => {
        const el = await fixture<UiLink>(html`<ui-link href="#">Link</ui-link>`);
        expect(el.underline).toBe('always');
    });

    it('defaults variant to inherit', async () => {
        const el = await fixture<UiLink>(html`<ui-link href="#">Link</ui-link>`);
        expect(el.variant).toBe('inherit');
    });

    it('auto-adds noopener noreferrer when target=_blank', async () => {
        const el = await fixture<UiLink>(html`<ui-link href="https://example.com" target="_blank">Link</ui-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.rel).toContain('noopener');
        expect(anchor!.rel).toContain('noreferrer');
    });

    it('does not add noopener when target is _self', async () => {
        const el = await fixture<UiLink>(html`<ui-link href="#" target="_self">Link</ui-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.rel).toBe('');
    });

    it('renders as disabled when disabled prop is set', async () => {
        const el = await fixture<UiLink>(html`<ui-link href="#" disabled>Link</ui-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.getAttribute('aria-disabled')).toBe('true');
    });

    it('reflects color attribute', async () => {
        const el = await fixture<UiLink>(html`<ui-link href="#" color="secondary">Link</ui-link>`);
        expect(el.getAttribute('color')).toBe('secondary');
    });

    it('reflects underline attribute', async () => {
        const el = await fixture<UiLink>(html`<ui-link href="#" underline="hover">Link</ui-link>`);
        expect(el.getAttribute('underline')).toBe('hover');
    });
});
