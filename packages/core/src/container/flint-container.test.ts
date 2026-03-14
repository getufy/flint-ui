import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-container.js';
import type { FlintContainer } from './flint-container.js';

describe('flint-container', () => {
    it('is defined', () => {
        const el = document.createElement('flint-container');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('has default maxWidth="lg"', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container>Content</flint-container>`);
        expect(el.maxWidth).toBe('lg');
    });

    it('has default disableGutters=false', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container>Content</flint-container>`);
        expect(el.disableGutters).toBe(false);
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('disable-gutters')).toBe(false);
    });

    it('has default fixed=false', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container>Content</flint-container>`);
        expect(el.fixed).toBe(false);
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('fixed')).toBe(false);
    });

    it('centers content horizontally', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container>Content</flint-container>`);
        await el.updateComplete;
        const container = el.shadowRoot?.querySelector('.container');
        expect(container).toBeTruthy();
        expect(container?.classList.contains('container')).toBe(true);
    });

    it('applies the correct class for "xs"', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container max-width="xs">Content</flint-container>`);
        await el.updateComplete;
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('max-width-xs')).toBe(true);
    });

    it('applies the correct class for "sm"', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container max-width="sm">Content</flint-container>`);
        await el.updateComplete;
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('max-width-sm')).toBe(true);
    });

    it('applies the correct class for "md"', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container max-width="md">Content</flint-container>`);
        await el.updateComplete;
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('max-width-md')).toBe(true);
    });

    it('applies the correct class for "lg"', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container max-width="lg">Content</flint-container>`);
        await el.updateComplete;
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('max-width-lg')).toBe(true);
    });

    it('applies the correct class for "xl"', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container max-width="xl">Content</flint-container>`);
        await el.updateComplete;
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('max-width-xl')).toBe(true);
    });

    it('applies no max-width class when maxWidth is false', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container>Content</flint-container>`);
        el.maxWidth = false;
        await el.updateComplete;
        const container = el.shadowRoot?.querySelector('.container');
        for (const bp of ['xs', 'sm', 'md', 'lg', 'xl']) {
            expect(container?.classList.contains(`max-width-${bp}`)).toBe(false);
        }
        expect(container?.classList.contains('max-width-false')).toBe(false);
    });

    it('parses attribute "false" as boolean false', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container max-width="false">Content</flint-container>`);
        await el.updateComplete;
        expect(el.maxWidth).toBe(false);
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('max-width-false')).toBe(false);
    });

    it('reflects maxWidth attribute when set via property', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container max-width="sm">Content</flint-container>`);
        expect(el.getAttribute('max-width')).toBe('sm');
        el.maxWidth = 'xl';
        await el.updateComplete;
        expect(el.getAttribute('max-width')).toBe('xl');
    });

    it('removes max-width attribute when maxWidth is set to false', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container max-width="sm">Content</flint-container>`);
        el.maxWidth = false;
        await el.updateComplete;
        expect(el.getAttribute('max-width')).toBeNull();
    });

    it('applies the correct class when disable-gutters is set', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container disable-gutters>Content</flint-container>`);
        await el.updateComplete;
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('disable-gutters')).toBe(true);
    });

    it('reflects the disableGutters attribute', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container>Content</flint-container>`);
        el.disableGutters = true;
        await el.updateComplete;
        expect(el.hasAttribute('disable-gutters')).toBe(true);
        el.disableGutters = false;
        await el.updateComplete;
        expect(el.hasAttribute('disable-gutters')).toBe(false);
    });

    it('reflects the "fixed" property and applies class', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container fixed>Content</flint-container>`);
        await el.updateComplete;
        expect(el.fixed).toBe(true);
        expect(el.hasAttribute('fixed')).toBe(true);
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('fixed')).toBe(true);
    });

    it('fixed=true + maxWidth="xs" applies both classes (regression: was collapsing to max-width:0)', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container fixed max-width="xs">Content</flint-container>`);
        await el.updateComplete;
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('fixed')).toBe(true);
        expect(container?.classList.contains('max-width-xs')).toBe(true);
    });

    it('fixed=true keeps max-width-lg class from default maxWidth', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container fixed>Content</flint-container>`);
        await el.updateComplete;
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('fixed')).toBe(true);
        expect(container?.classList.contains('max-width-lg')).toBe(true);
    });

    it('updating maxWidth dynamically updates classes', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container max-width="sm">Content</flint-container>`);
        let container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('max-width-sm')).toBe(true);

        el.maxWidth = 'xl';
        await el.updateComplete;
        container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('max-width-xl')).toBe(true);
        expect(container?.classList.contains('max-width-sm')).toBe(false);
    });

    it('renders slotted content', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container><span id="child">Hello</span></flint-container>`);
        const child = el.querySelector('#child');
        expect(child).toBeTruthy();
        expect(child?.textContent).toBe('Hello');
    });

    it('disableGutters and fixed can be combined', async () => {
        const el = await fixture<FlintContainer>(html`<flint-container disable-gutters fixed max-width="md">Content</flint-container>`);
        await el.updateComplete;
        const container = el.shadowRoot?.querySelector('.container');
        expect(container?.classList.contains('disable-gutters')).toBe(true);
        expect(container?.classList.contains('fixed')).toBe(true);
        expect(container?.classList.contains('max-width-md')).toBe(true);
    });
});
