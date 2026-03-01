import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-toggle-button';
import type { UiToggleButton } from './ui-toggle-button';

describe('ui-toggle-button', () => {
    it('renders with default properties', async () => {
        const el = await fixture<UiToggleButton>(html`<ui-toggle-button value="x">X</ui-toggle-button>`);
        expect(el.selected).toBe(false);
        expect(el.disabled).toBe(false);
        expect(el.value).toBe('x');

        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.type).toBe('button');
        expect(button.disabled).toBe(false);
        expect(button.getAttribute('aria-pressed')).toBe('false');
    });

    it('reflects selected state to aria-pressed', async () => {
        const el = await fixture<UiToggleButton>(html`<ui-toggle-button selected>X</ui-toggle-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.getAttribute('aria-pressed')).toBe('true');
        expect(button.classList.contains('selected')).toBe(true);
    });

    it('reflects selected as attribute on host', async () => {
        const el = await fixture<UiToggleButton>(html`<ui-toggle-button selected>X</ui-toggle-button>`);
        expect(el.hasAttribute('selected')).toBe(true);
    });

    it('reflects disabled as attribute on host', async () => {
        const el = await fixture<UiToggleButton>(html`<ui-toggle-button disabled>X</ui-toggle-button>`);
        expect(el.hasAttribute('disabled')).toBe(true);

        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.disabled).toBe(true);
    });

    it('dispatches toggle-click event with value and next selected state', async () => {
        const handler = vi.fn();
        const el = await fixture<UiToggleButton>(html`
            <ui-toggle-button value="bold" @toggle-click=${handler}>B</ui-toggle-button>
        `);

        el.shadowRoot!.querySelector('button')!.click();

        expect(handler).toHaveBeenCalledOnce();
        const event = handler.mock.calls[0][0] as CustomEvent;
        expect(event.detail.value).toBe('bold');
        expect(event.detail.selected).toBe(true);
    });

    it('dispatches toggle-click with selected=false when already selected', async () => {
        const handler = vi.fn();
        const el = await fixture<UiToggleButton>(html`
            <ui-toggle-button value="bold" selected @toggle-click=${handler}>B</ui-toggle-button>
        `);

        el.shadowRoot!.querySelector('button')!.click();

        const event = handler.mock.calls[0][0] as CustomEvent;
        expect(event.detail.selected).toBe(false);
    });

    it('does not dispatch event when disabled', async () => {
        const handler = vi.fn();
        const el = await fixture<UiToggleButton>(html`
            <ui-toggle-button value="bold" disabled @toggle-click=${handler}>B</ui-toggle-button>
        `);

        el.shadowRoot!.querySelector('button')!.click();
        expect(handler).not.toHaveBeenCalled();
    });

    it('toggle-click event bubbles and is composed', async () => {
        let captured: CustomEvent | null = null;
        const el = await fixture<UiToggleButton>(html`<ui-toggle-button value="x">X</ui-toggle-button>`);
        el.addEventListener('toggle-click', (e) => { captured = e as CustomEvent; });

        el.shadowRoot!.querySelector('button')!.click();

        expect(captured).not.toBeNull();
        expect(captured!.bubbles).toBe(true);
        expect(captured!.composed).toBe(true);
    });

    it('renders slotted content', async () => {
        const el = await fixture<UiToggleButton>(html`<ui-toggle-button>Bold</ui-toggle-button>`);
        expect(el.textContent?.trim()).toBe('Bold');
    });
});
