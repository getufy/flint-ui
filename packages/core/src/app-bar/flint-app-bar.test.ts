import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-app-bar';
import type { FlintAppBar } from './flint-app-bar';

describe('flint-app-bar', () => {
    it('is defined', async () => {
        const el = document.createElement('flint-app-bar');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('has correct default property values', async () => {
        const el = await fixture<FlintAppBar>(html`<flint-app-bar></flint-app-bar>`);
        expect(el.position).toBe('static');
        expect(el.variant).toBe('regular');
        expect(el.title).toBe('');
    });

    it('renders with title', async () => {
        const el = await fixture<FlintAppBar>(html`<flint-app-bar title="Test Brand"></flint-app-bar>`);
        const titleDiv = el.shadowRoot!.querySelector('.title');
        expect(titleDiv?.textContent?.trim()).toBe('Test Brand');
    });

    it('reflects position attribute on host', async () => {
        const el = await fixture<FlintAppBar>(html`<flint-app-bar position="fixed"></flint-app-bar>`);
        expect(el.getAttribute('position')).toBe('fixed');
    });

    it('applies outlined variant class', async () => {
        const el = await fixture<FlintAppBar>(html`<flint-app-bar variant="outlined"></flint-app-bar>`);
        const header = el.shadowRoot!.querySelector('header');
        expect(header?.classList.contains('variant-outlined')).toBe(true);
    });

    it('regular variant does not apply outlined class', async () => {
        const el = await fixture<FlintAppBar>(html`<flint-app-bar variant="regular"></flint-app-bar>`);
        const header = el.shadowRoot!.querySelector('header');
        expect(header?.classList.contains('variant-outlined')).toBe(false);
    });

    it('renders navigation and actions slots', async () => {
        const el = await fixture<FlintAppBar>(html`
            <flint-app-bar>
                <div slot="navigation" id="test-nav">Nav</div>
                <div slot="actions" id="test-action">Action</div>
            </flint-app-bar>
        `);
        expect(el.querySelector('#test-nav')).not.toBeNull();
        expect(el.querySelector('#test-action')).not.toBeNull();
    });

    it('renders title slot content', async () => {
        const el = await fixture<FlintAppBar>(html`
            <flint-app-bar>
                <span slot="title" id="custom-title">Custom Title</span>
            </flint-app-bar>
        `);
        const slottedTitle = el.querySelector('#custom-title');
        expect(slottedTitle?.textContent).toBe('Custom Title');
    });

    it('renders a header element', async () => {
        const el = await fixture<FlintAppBar>(html`<flint-app-bar></flint-app-bar>`);
        const header = el.shadowRoot!.querySelector('header');
        expect(header).not.toBeNull();
    });

    it('renders three sections (left, title, right)', async () => {
        const el = await fixture<FlintAppBar>(html`<flint-app-bar></flint-app-bar>`);
        const leftSection = el.shadowRoot!.querySelector('.left-section');
        const titleSection = el.shadowRoot!.querySelector('.title');
        const rightSection = el.shadowRoot!.querySelector('.right-section');
        expect(leftSection).not.toBeNull();
        expect(titleSection).not.toBeNull();
        expect(rightSection).not.toBeNull();
    });

    it('reflects variant attribute on host', async () => {
        const el = await fixture<FlintAppBar>(html`<flint-app-bar variant="outlined"></flint-app-bar>`);
        expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('updates title dynamically', async () => {
        const el = await fixture<FlintAppBar>(html`<flint-app-bar title="Old"></flint-app-bar>`);
        el.title = 'New';
        await el.updateComplete;
        const titleDiv = el.shadowRoot!.querySelector('.title');
        expect(titleDiv?.textContent?.trim()).toBe('New');
    });

    it('supports all position values', async () => {
        const el = await fixture<FlintAppBar>(html`<flint-app-bar></flint-app-bar>`);
        for (const pos of ['fixed', 'absolute', 'sticky'] as const) {
            el.position = pos;
            await el.updateComplete;
            expect(el.getAttribute('position')).toBe(pos);
        }
    });
});
