import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-tooltip.js';
import type { UiTooltip } from './ui-tooltip';

describe('ui-tooltip', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-tooltip');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('shows tooltip on mouseenter', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Testing">
                <button>Hover me</button>
            </ui-tooltip>
        `);

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        expect(popup.classList.contains('visible')).toBe(false);

        container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, composed: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);
        expect(popup.textContent!.trim()).toBe('Testing');

        container.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true, composed: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    it('shows tooltip on focusin', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Focus testing">
                <button>Focus me</button>
            </ui-tooltip>
        `);

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new Event('focusin', { bubbles: true, composed: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(true);

        container.dispatchEvent(new Event('focusout', { bubbles: true, composed: true }));
        await el.updateComplete;
        expect(popup.classList.contains('visible')).toBe(false);
    });

    it('does not show when disabled', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Disabled" disabled>
                <button>Hover me</button>
            </ui-tooltip>
        `);

        const container = el.shadowRoot!.querySelector('.tooltip-container')!;
        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;

        container.dispatchEvent(new MouseEvent('mouseenter'));
        expect(popup.classList.contains('visible')).toBe(false);
    });

    it('applies correct placement class', async () => {
        const el = await fixture<UiTooltip>(html`
            <ui-tooltip label="Right" placement="right">
                <button>Hover me</button>
            </ui-tooltip>
        `);

        const popup = el.shadowRoot!.querySelector('.tooltip-popup')!;
        expect(popup.classList.contains('right')).toBe(true);
    });
});
