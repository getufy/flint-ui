import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-fab';
import { UiFab } from './ui-fab';

describe('UiFab', () => {
    it('is defined', () => {
        const el = document.createElement('ui-fab');
        expect(el).toBeInstanceOf(UiFab);
    });

    it('renders with default values', async () => {
        const el = await fixture<UiFab>(html`<ui-fab></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button).toBeDefined();
        expect(el.extended).toBe(false);
        expect(el.disabled).toBe(false);
        expect(el.label).toBe('Action');
    });

    // ── aria-label (BUG 2 fix) ──────────────────────────────────────────────

    it('sets aria-label from label prop on non-extended FAB', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="static"></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.getAttribute('aria-label')).toBe('Action');
    });

    it('uses custom label as aria-label on non-extended FAB', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="static" label="Create post"></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.getAttribute('aria-label')).toBe('Create post');
    });

    it('omits aria-label (not empty string) when extended', async () => {
        const el = await fixture<UiFab>(html`<ui-fab extended position="static"></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        // Must not be set at all — an empty string aria-label hides the button from screen readers
        expect(button.hasAttribute('aria-label')).toBe(false);
    });

    // ── position applied to :host (BUG 1 fix) ─────────────────────────────

    it('applies bottom-right position to host by default', async () => {
        const el = await fixture<UiFab>(html`<ui-fab></ui-fab>`);
        expect(el.style.bottom).toBe('24px');
        expect(el.style.right).toBe('24px');
        expect(el.style.top).toBe('');
        expect(el.style.left).toBe('');
    });

    it('applies bottom-left position to host', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="bottom-left"></ui-fab>`);
        expect(el.style.bottom).toBe('24px');
        expect(el.style.left).toBe('24px');
        expect(el.style.top).toBe('');
        expect(el.style.right).toBe('');
    });

    it('applies top-right position to host', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="top-right"></ui-fab>`);
        expect(el.style.top).toBe('24px');
        expect(el.style.right).toBe('24px');
        expect(el.style.bottom).toBe('');
        expect(el.style.left).toBe('');
    });

    it('applies top-left position to host', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="top-left"></ui-fab>`);
        expect(el.style.top).toBe('24px');
        expect(el.style.left).toBe('24px');
        expect(el.style.bottom).toBe('');
        expect(el.style.right).toBe('');
    });

    it('applies static position to host', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="static"></ui-fab>`);
        expect(el.style.position).toBe('static');
    });

    it('updates host position when position prop changes', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="bottom-right"></ui-fab>`);
        expect(el.style.right).toBe('24px');
        expect(el.style.left).toBe('');

        el.position = 'bottom-left';
        await el.updateComplete;

        expect(el.style.left).toBe('24px');
        expect(el.style.right).toBe('');
    });

    // inner button no longer carries position styles
    it('does not put position styles on the inner button', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="bottom-left"></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.getAttribute('style') ?? '').not.toContain('bottom');
        expect(button.getAttribute('style') ?? '').not.toContain('left');
    });

    // ── extended variant ───────────────────────────────────────────────────

    it('renders extended variant', async () => {
        const el = await fixture<UiFab>(html`<ui-fab extended position="static"></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.classList.contains('extended')).toBe(true);
        expect(el.shadowRoot!.querySelector('.label-slot')).not.toBeNull();
    });

    it('does not render label-slot when not extended', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="static"></ui-fab>`);
        expect(el.shadowRoot!.querySelector('.label-slot')).toBeNull();
    });

    // ── slots ──────────────────────────────────────────────────────────────

    it('renders named icon and label slots correctly', async () => {
        const el = await fixture<UiFab>(html`
      <ui-fab extended position="static">
        <span slot="icon" id="test-icon">+</span>
        <span slot="label" id="test-label">Add</span>
      </ui-fab>
    `);
        const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]') as HTMLSlotElement;
        const labelSlot = el.shadowRoot!.querySelector('slot[name="label"]') as HTMLSlotElement;

        expect(iconSlot.assignedElements()[0].id).toBe('test-icon');
        expect(labelSlot.assignedElements()[0].id).toBe('test-label');
    });

    it('renders default slot content inside the icon area', async () => {
        const el = await fixture<UiFab>(html`
      <ui-fab position="static">
        <span id="default-icon">+</span>
      </ui-fab>
    `);
        const defaultSlot = el.shadowRoot!.querySelector('.icon-slot slot:not([name])') as HTMLSlotElement;
        expect(defaultSlot).not.toBeNull();
        expect(defaultSlot.assignedElements()[0].id).toBe('default-icon');
    });

    // ── disabled ───────────────────────────────────────────────────────────

    it('reflects disabled attribute and disables the button', async () => {
        const el = await fixture<UiFab>(html`<ui-fab disabled position="static"></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(el.disabled).toBe(true);
        expect(el.hasAttribute('disabled')).toBe(true);
        expect(button.disabled).toBe(true);
    });

    it('button is not disabled by default', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="static"></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.disabled).toBe(false);
    });

    it('disabled button does not fire click', async () => {
        const el = await fixture<UiFab>(html`<ui-fab disabled position="static"></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        const clickSpy = vi.fn();
        el.addEventListener('click', clickSpy);
        button.click();
        expect(clickSpy).not.toHaveBeenCalled();
    });

    // ── click event ────────────────────────────────────────────────────────

    it('click on button bubbles to host', async () => {
        const el = await fixture<UiFab>(html`<ui-fab position="static"></ui-fab>`);
        const button = el.shadowRoot!.querySelector('button')!;
        const clickSpy = vi.fn();
        el.addEventListener('click', clickSpy);
        button.click();
        expect(clickSpy).toHaveBeenCalledOnce();
    });
});
