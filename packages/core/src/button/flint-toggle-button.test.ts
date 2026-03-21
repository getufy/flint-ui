import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-toggle-button';
import type { FlintToggleButton } from './flint-toggle-button';
import { expectAccessible } from '../test-utils/axe.js';

describe('flint-toggle-button', () => {
    it('renders with default properties', async () => {
        const el = await fixture<FlintToggleButton>(html`<flint-toggle-button value="x">X</flint-toggle-button>`);
        expect(el.selected).toBe(false);
        expect(el.disabled).toBe(false);
        expect(el.value).toBe('x');
        expect(el.size).toBe('md');

        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.type).toBe('button');
        expect(button.disabled).toBe(false);
        expect(button.getAttribute('aria-pressed')).toBe('false');
    });

    it('reflects selected state to aria-pressed', async () => {
        const el = await fixture<FlintToggleButton>(html`<flint-toggle-button selected>X</flint-toggle-button>`);
        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.getAttribute('aria-pressed')).toBe('true');
        expect(button.classList.contains('selected')).toBe(true);
    });

    it('reflects selected as attribute on host', async () => {
        const el = await fixture<FlintToggleButton>(html`<flint-toggle-button selected>X</flint-toggle-button>`);
        expect(el.hasAttribute('selected')).toBe(true);
    });

    it('reflects disabled as attribute on host', async () => {
        const el = await fixture<FlintToggleButton>(html`<flint-toggle-button disabled>X</flint-toggle-button>`);
        expect(el.hasAttribute('disabled')).toBe(true);

        const button = el.shadowRoot!.querySelector('button')!;
        expect(button.disabled).toBe(true);
    });

    it('dispatches flint-toggle-button-change event with value and next selected state', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintToggleButton>(html`
            <flint-toggle-button value="bold" @flint-toggle-button-change=${handler}>B</flint-toggle-button>
        `);

        el.shadowRoot!.querySelector('button')!.click();

        expect(handler).toHaveBeenCalledOnce();
        const event = handler.mock.calls[0][0] as CustomEvent;
        expect(event.detail.value).toBe('bold');
        expect(event.detail.selected).toBe(true);
    });

    it('dispatches flint-toggle-button-change with selected=false when already selected', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintToggleButton>(html`
            <flint-toggle-button value="bold" selected @flint-toggle-button-change=${handler}>B</flint-toggle-button>
        `);

        el.shadowRoot!.querySelector('button')!.click();

        const event = handler.mock.calls[0][0] as CustomEvent;
        expect(event.detail.selected).toBe(false);
    });

    it('does not dispatch event when native disabled button is clicked', async () => {
        const handler = vi.fn();
        const el = await fixture<FlintToggleButton>(html`
            <flint-toggle-button value="bold" disabled @flint-toggle-button-change=${handler}>B</flint-toggle-button>
        `);

        // Native disabled button swallows DOM click — handler is never invoked
        el.shadowRoot!.querySelector('button')!.click();
        expect(handler).not.toHaveBeenCalled();
    });

    it('_handleClick returns early when disabled is true (covers disabled branch)', async () => {
        // Directly invoke _handleClick while disabled=true to exercise the guard branch.
        // Native button.click() on a disabled button never fires in jsdom, so we bypass it here.
        const handler = vi.fn();
        const el = await fixture<FlintToggleButton>(html`
            <flint-toggle-button value="x" disabled @flint-toggle-button-change=${handler}>X</flint-toggle-button>
        `);
        (el as unknown as { _handleClick(): void })._handleClick();
        expect(handler).not.toHaveBeenCalled();
    });

    it('flint-toggle-button-change event bubbles and is composed', async () => {
        let captured: CustomEvent | null = null;
        const el = await fixture<FlintToggleButton>(html`<flint-toggle-button value="x">X</flint-toggle-button>`);
        el.addEventListener('flint-toggle-button-change', (e) => { captured = e as CustomEvent; });

        el.shadowRoot!.querySelector('button')!.click();

        expect(captured).not.toBeNull();
        expect(captured!.bubbles).toBe(true);
        expect(captured!.composed).toBe(true);
    });

    it('renders slotted content', async () => {
        const el = await fixture<FlintToggleButton>(html`<flint-toggle-button>Bold</flint-toggle-button>`);
        expect(el.textContent?.trim()).toBe('Bold');
    });

    it('has empty string as default value', async () => {
        const el = await fixture<FlintToggleButton>(html`<flint-toggle-button>X</flint-toggle-button>`);
        expect(el.value).toBe('');
    });

    describe('size prop', () => {
        it('defaults to md', async () => {
            const el = await fixture<FlintToggleButton>(html`<flint-toggle-button>X</flint-toggle-button>`);
            expect(el.size).toBe('md');
            expect(el.getAttribute('size')).toBe('md');
        });

        it('reflects sm to attribute', async () => {
            const el = await fixture<FlintToggleButton>(html`<flint-toggle-button size="sm">X</flint-toggle-button>`);
            expect(el.size).toBe('sm');
            expect(el.getAttribute('size')).toBe('sm');
        });

        it('reflects lg to attribute', async () => {
            const el = await fixture<FlintToggleButton>(html`<flint-toggle-button size="lg">X</flint-toggle-button>`);
            expect(el.size).toBe('lg');
            expect(el.getAttribute('size')).toBe('lg');
        });

        it('can be changed programmatically', async () => {
            const el = await fixture<FlintToggleButton>(html`<flint-toggle-button>X</flint-toggle-button>`);
            el.size = 'lg';
            await el.updateComplete;
            expect(el.getAttribute('size')).toBe('lg');
        });
    });

    describe('accessibility', () => {
        it('should be accessible', async () => {
            const el = await fixture(html`<flint-toggle-button aria-label="Toggle bold" value="bold">B</flint-toggle-button>`);
            await expectAccessible(el);
        });
    });
});
