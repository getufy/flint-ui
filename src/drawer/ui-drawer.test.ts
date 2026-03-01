import { describe, it, expect, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './ui-drawer.js';
import type { UiDrawer } from './ui-drawer.js';

describe('ui-drawer', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-drawer');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders temporary drawer by default', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer></ui-drawer>`);
        expect(el.variant).toBe('temporary');
    });

    it('shows backdrop when open and variant is temporary', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer open variant="temporary"></ui-drawer>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop).not.toBeNull();
        expect(backdrop?.classList.contains('open')).toBe(true);
    });

    it('dispatches ui-drawer-close when backdrop is clicked', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer open></ui-drawer>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;

        setTimeout(() => backdrop?.click());

        const event = await oneEvent(el, 'ui-drawer-close');
        expect(event).toBeDefined();
    });

    it('dispatches ui-drawer-close when Escape is pressed', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer open></ui-drawer>`);

        const closeSpy = vi.fn();
        el.addEventListener('ui-drawer-close', closeSpy);

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(closeSpy).toHaveBeenCalled();
    });

    it('paper has open class when open', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer anchor="right" open></ui-drawer>`);
        const paper = el.shadowRoot!.querySelector('.paper');
        expect(paper?.classList.contains('open')).toBe(true);
    });

    it('shows edge handle when edge is true and closed', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer edge></ui-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge');
        expect(edge).not.toBeNull();
    });

    it('opens drawer when edge handle is clicked', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer edge></ui-drawer>`);
        const edge = el.shadowRoot!.querySelector('.edge') as HTMLElement;
        edge.click();
        expect(el.open).toBe(true);
    });

    it('supports persistent variant without backdrop', async () => {
        const el = await fixture<UiDrawer>(html`<ui-drawer variant="persistent" open></ui-drawer>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop).toBeNull();
    });
});
