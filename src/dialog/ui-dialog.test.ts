import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-dialog.js';
import type { UiDialog } from './ui-dialog.js';
import type { UiDialogActions } from './ui-dialog.js';
import { UiBackdrop } from '../backdrop/ui-backdrop.js';

describe('ui-dialog', () => {

    // ── Existence ───────────────────────────────────────────────────────────
    it('is defined', () => {
        expect(document.createElement('ui-dialog')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('ui-dialog-title')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('ui-dialog-content')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('ui-dialog-content-text')).toBeInstanceOf(HTMLElement);
        expect(document.createElement('ui-dialog-actions')).toBeInstanceOf(HTMLElement);
    });

    // ── Default state ────────────────────────────────────────────────────────
    it('renders as hidden by default', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog></ui-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.classList.contains('open')).toBe(false);
        expect(el.open).toBe(false);
    });

    it('has pointer-events:none when closed', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog></ui-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.style.pointerEvents).not.toBe('auto');
    });

    // ── Open state ───────────────────────────────────────────────────────────
    it('shows panel when open=true', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog open></ui-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.classList.contains('open')).toBe(true);
        expect(el.open).toBe(true);
    });

    it('reflects open attribute on host', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog open></ui-dialog>`);
        await el.updateComplete;
        expect(el.hasAttribute('open')).toBe(true);
    });

    // ── Close behaviour ──────────────────────────────────────────────────────
    it('dispatches close event when backdrop fires close', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog open></ui-dialog>`);
        const backdrop = el.shadowRoot!.querySelector('ui-backdrop') as UiBackdrop;
        const closeSpy = vi.fn();
        el.addEventListener('close', closeSpy);

        backdrop.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
        await el.updateComplete;

        expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('requestClose() fires close event', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog open></ui-dialog>`);
        const closeSpy = vi.fn();
        el.addEventListener('close', closeSpy);

        el.requestClose();

        expect(closeSpy).toHaveBeenCalledOnce();
    });

    it('does NOT fire close when disableBackdropClose=true and backdrop is clicked', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog open disable-backdrop-close></ui-dialog>`);
        const backdrop = el.shadowRoot!.querySelector('ui-backdrop') as UiBackdrop;
        const closeSpy = vi.fn();
        el.addEventListener('close', closeSpy);

        // Simulate backdrop firing close
        backdrop.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
        await el.updateComplete;

        expect(closeSpy).not.toHaveBeenCalled();
    });

    // ── Transitions ──────────────────────────────────────────────────────────
    it('does NOT add a transition class for scale (default)', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog></ui-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        // scale is handled via base CSS, not a class
        expect(panel.classList.contains('transition-scale')).toBe(false);
    });

    it('adds transition-slide-up class for slide-up', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog transition="slide-up"></ui-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.classList.contains('transition-slide-up')).toBe(true);
    });

    it('adds transition-slide-down class for slide-down', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog transition="slide-down"></ui-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.classList.contains('transition-slide-down')).toBe(true);
    });

    // ── Accessibility ────────────────────────────────────────────────────────
    it('panel has role="dialog" and aria-modal="true"', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog open></ui-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.getAttribute('role')).toBe('dialog');
        expect(panel.getAttribute('aria-modal')).toBe('true');
    });

    it('panel has aria-labelledby and aria-describedby', async () => {
        const el = await fixture<UiDialog>(html`<ui-dialog open></ui-dialog>`);
        await el.updateComplete;
        const panel = el.shadowRoot!.querySelector('.dialog-panel') as HTMLElement;
        expect(panel.hasAttribute('aria-labelledby')).toBe(true);
        expect(panel.hasAttribute('aria-describedby')).toBe(true);
    });

    // ── Slots ────────────────────────────────────────────────────────────────
    it('renders slotted title, content, and actions', async () => {
        const el = await fixture<UiDialog>(html`
            <ui-dialog open>
                <ui-dialog-title id="t">My Title</ui-dialog-title>
                <ui-dialog-content id="c">Content</ui-dialog-content>
                <ui-dialog-actions id="a">Actions</ui-dialog-actions>
            </ui-dialog>
        `);
        expect(el.querySelector('#t')).not.toBeNull();
        expect(el.querySelector('#c')).not.toBeNull();
        expect(el.querySelector('#a')).not.toBeNull();
    });

    // ── ui-dialog-actions align ──────────────────────────────────────────────
    it('dialog-actions reflects align attribute', async () => {
        const el = await fixture<UiDialogActions>(html`
            <ui-dialog-actions align="start"></ui-dialog-actions>
        `);
        await el.updateComplete;
        expect(el.getAttribute('align')).toBe('start');
    });
});
