import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-app-bar';
import type { UiAppBar } from './ui-app-bar';

describe('ui-app-bar', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-app-bar');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('has correct default property values', async () => {
        const el = await fixture<UiAppBar>(html`<ui-app-bar></ui-app-bar>`);
        expect(el.position).toBe('static');
        expect(el.variant).toBe('regular');
        expect(el.title).toBe('');
    });

    it('renders with title', async () => {
        const el = await fixture<UiAppBar>(html`<ui-app-bar title="Test Brand"></ui-app-bar>`);
        const titleDiv = el.shadowRoot!.querySelector('.title');
        expect(titleDiv?.textContent?.trim()).toBe('Test Brand');
    });

    it('reflects position attribute on host', async () => {
        const el = await fixture<UiAppBar>(html`<ui-app-bar position="fixed"></ui-app-bar>`);
        expect(el.getAttribute('position')).toBe('fixed');
    });

    it('applies outlined variant class', async () => {
        const el = await fixture<UiAppBar>(html`<ui-app-bar variant="outlined"></ui-app-bar>`);
        const header = el.shadowRoot!.querySelector('header');
        expect(header?.classList.contains('variant-outlined')).toBe(true);
    });

    it('regular variant does not apply outlined class', async () => {
        const el = await fixture<UiAppBar>(html`<ui-app-bar variant="regular"></ui-app-bar>`);
        const header = el.shadowRoot!.querySelector('header');
        expect(header?.classList.contains('variant-outlined')).toBe(false);
    });

    it('renders navigation and actions slots', async () => {
        const el = await fixture<UiAppBar>(html`
            <ui-app-bar>
                <div slot="navigation" id="test-nav">Nav</div>
                <div slot="actions" id="test-action">Action</div>
            </ui-app-bar>
        `);
        expect(el.querySelector('#test-nav')).not.toBeNull();
        expect(el.querySelector('#test-action')).not.toBeNull();
    });

    it('renders title slot content', async () => {
        const el = await fixture<UiAppBar>(html`
            <ui-app-bar>
                <span slot="title" id="custom-title">Custom Title</span>
            </ui-app-bar>
        `);
        const slottedTitle = el.querySelector('#custom-title');
        expect(slottedTitle?.textContent).toBe('Custom Title');
    });
});
