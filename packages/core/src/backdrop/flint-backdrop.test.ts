import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-backdrop';
import type { FlintBackdrop } from './flint-backdrop';

describe('flint-backdrop', () => {
    it('is defined', async () => {
        const el = document.createElement('flint-backdrop');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders as hidden by default', async () => {
        const el = await fixture<FlintBackdrop>(html`<flint-backdrop></flint-backdrop>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop?.classList.contains('open')).toBe(false);
        expect(el.open).toBe(false);
    });

    it('shows when the open property is true', async () => {
        const el = await fixture<FlintBackdrop>(html`<flint-backdrop open></flint-backdrop>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop?.classList.contains('open')).toBe(true);
        expect(el.open).toBe(true);
    });

    it('dispatches the close event when the backdrop is clicked', async () => {
        const el = await fixture<FlintBackdrop>(html`<flint-backdrop open></flint-backdrop>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
        const closeSpy = vi.fn();
        el.addEventListener('flint-backdrop-close', closeSpy);

        backdrop.click();
        await el.updateComplete;

        expect(closeSpy).toHaveBeenCalled();
    });

    it('does not dispatch the close event when content is clicked', async () => {
        const el = await fixture<FlintBackdrop>(html`
            <flint-backdrop open>
                <div id="inner-content">Content</div>
            </flint-backdrop>
        `);
        const content = el.querySelector('#inner-content') as HTMLElement;
        const closeSpy = vi.fn();
        el.addEventListener('flint-backdrop-close', closeSpy);

        content.click();
        await el.updateComplete;

        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('renders with invisible class when property is set', async () => {
        const el = await fixture<FlintBackdrop>(html`<flint-backdrop invisible></flint-backdrop>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop?.classList.contains('invisible')).toBe(true);
        expect(el.invisible).toBe(true);
    });

    it('shows when the open property is toggled dynamically', async () => {
        const el = await fixture<FlintBackdrop>(html`<flint-backdrop></flint-backdrop>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop?.classList.contains('open')).toBe(false);

        el.open = true;
        await el.updateComplete;

        expect(backdrop?.classList.contains('open')).toBe(true);
    });

    it('sets aria-hidden to true when closed', async () => {
        const el = await fixture<FlintBackdrop>(html`<flint-backdrop></flint-backdrop>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop?.getAttribute('aria-hidden')).toBe('true');
    });

    it('removes aria-hidden when open', async () => {
        const el = await fixture<FlintBackdrop>(html`<flint-backdrop open></flint-backdrop>`);
        const backdrop = el.shadowRoot!.querySelector('.backdrop');
        expect(backdrop?.hasAttribute('aria-hidden')).toBe(false);
    });

    it('reflects the container attribute', async () => {
        const el = await fixture<FlintBackdrop>(html`<flint-backdrop container></flint-backdrop>`);
        expect(el.container).toBe(true);
        expect(el.hasAttribute('container')).toBe(true);
    });

    it('dispatches close event when Escape is pressed while open', async () => {
        const el = await fixture<FlintBackdrop>(html`<flint-backdrop open></flint-backdrop>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-backdrop-close', closeSpy);

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

        expect(closeSpy).toHaveBeenCalled();
    });

    it('does not dispatch close event on Escape when closed', async () => {
        const el = await fixture<FlintBackdrop>(html`<flint-backdrop></flint-backdrop>`);
        const closeSpy = vi.fn();
        el.addEventListener('flint-backdrop-close', closeSpy);

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

        expect(closeSpy).not.toHaveBeenCalled();
    });
});
