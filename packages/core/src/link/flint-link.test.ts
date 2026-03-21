import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-link.js';
import type { FlintLink } from './flint-link.js';
import { expectAccessible } from '../test-utils/axe.js';

describe('flint-link', () => {
    it('is defined', () => {
        const el = document.createElement('flint-link');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders an anchor element', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="/foo">Click me</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor).not.toBeNull();
        expect(anchor!.getAttribute('href')).toBe('/foo');
    });

    it('defaults color to primary', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#">Link</flint-link>`);
        expect(el.color).toBe('primary');
    });

    it('defaults underline to always', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#">Link</flint-link>`);
        expect(el.underline).toBe('always');
    });

    it('defaults variant to inherit', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#">Link</flint-link>`);
        expect(el.variant).toBe('inherit');
    });

    it('auto-adds noopener noreferrer when target=_blank', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="https://example.com" target="_blank">Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.rel).toContain('noopener');
        expect(anchor!.rel).toContain('noreferrer');
    });

    it('does not add noopener when target is _self', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#" target="_self">Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.getAttribute('rel')).toBeNull();
    });

    it('merges existing rel with noopener noreferrer for target=_blank without duplicates', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#" target="_blank" rel="nofollow">Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        const parts = anchor!.rel.split(' ');
        expect(parts).toContain('nofollow');
        expect(parts).toContain('noopener');
        expect(parts).toContain('noreferrer');
        expect(parts.filter(p => p === 'noopener').length).toBe(1);
    });

    it('passes rel through when target is not _blank', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#" rel="nofollow">Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.getAttribute('rel')).toBe('nofollow');
    });

    it('renders as disabled when disabled prop is set', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#" disabled>Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.getAttribute('aria-disabled')).toBe('true');
    });

    it('disabled link has no href', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="/go" disabled>Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.getAttribute('href')).toBeNull();
    });

    it('disabled link has tabindex=-1', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#" disabled>Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.getAttribute('tabindex')).toBe('-1');
    });

    it('enabled link has tabindex=0', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#">Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.getAttribute('tabindex')).toBe('0');
    });

    it('disabled link prevents click navigation', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="/go" disabled>Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a')!;
        let defaultPrevented = false;
        anchor.addEventListener('click', (e: Event) => { defaultPrevented = e.defaultPrevented; });
        anchor.click();
        expect(defaultPrevented).toBe(true);
    });

    it('reflects color attribute', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#" color="secondary">Link</flint-link>`);
        expect(el.getAttribute('color')).toBe('secondary');
    });

    it('reflects underline attribute', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#" underline="hover">Link</flint-link>`);
        expect(el.getAttribute('underline')).toBe('hover');
    });

    it('reflects variant attribute', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#" variant="body2">Link</flint-link>`);
        expect(el.getAttribute('variant')).toBe('body2');
    });

    it('sets aria-label from label prop', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#" label="Go home">Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.getAttribute('aria-label')).toBe('Go home');
    });

    it('does not render aria-label when label is not set', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#">Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.hasAttribute('aria-label')).toBe(false);
    });

    it('renders download attribute on anchor', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="/file.pdf" download="report.pdf">Download</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.getAttribute('download')).toBe('report.pdf');
    });

    it('does not render download attribute when not set', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#">Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.hasAttribute('download')).toBe(false);
    });

    it('does not render target attribute for default _self', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#">Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.getAttribute('target')).toBeNull();
    });

    it('renders target attribute for non-default values', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#" target="_blank">Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.getAttribute('target')).toBe('_blank');
    });

    it('does not render rel attribute when empty and target is _self', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#">Link</flint-link>`);
        const anchor = el.shadowRoot!.querySelector('a');
        expect(anchor!.hasAttribute('rel')).toBe(false);
    });

    it('fires click event on enabled link', async () => {
        const el = await fixture<FlintLink>(html`<flint-link href="#">Link</flint-link>`);
        const spy = vi.fn();
        el.addEventListener('click', spy);
        el.shadowRoot!.querySelector('a')!.click();
        expect(spy).toHaveBeenCalledOnce();
    });

    describe('accessibility', () => {
        it('should be accessible', async () => {
            const el = await fixture(html`<flint-link href="#">Link text</flint-link>`);
            await expectAccessible(el);
        });
    });
});
