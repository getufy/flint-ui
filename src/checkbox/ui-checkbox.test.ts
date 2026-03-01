import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-checkbox';
import type { UiCheckbox } from './ui-checkbox';

describe('ui-checkbox', () => {
    it('renders correctly with label', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox label="Test Label"></ui-checkbox>`);
        expect(el.shadowRoot!.textContent).toContain('Test Label');
        const input = el.shadowRoot!.querySelector('input');
        expect(input).not.toBeNull();
        expect(input?.type).toBe('checkbox');
    });

    it('can be checked', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox></ui-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;

        input.click();
        await el.updateComplete;

        expect(el.checked).toBe(true);
    });

    it('reflects checked property', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox checked></ui-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.checked).toBe(true);
    });

    it('handles indeterminate state', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox indeterminate></ui-checkbox>`);
        const checkboxDiv = el.shadowRoot!.querySelector('.checkbox')!;
        expect(checkboxDiv.classList.contains('indeterminate')).toBe(true);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.indeterminate).toBe(true);
    });

    it('is disabled when the disabled property is set', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox disabled></ui-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.disabled).toBe(true);

        // Clicking should not change state
        el.click();
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });

    it('dispatches change event', async () => {
        let eventTriggered = false;
        const el = await fixture<UiCheckbox>(html`
            <ui-checkbox @change=${() => eventTriggered = true}></ui-checkbox>
        `);

        const input = el.shadowRoot!.querySelector('input')!;
        input.click();

        expect(eventTriggered).toBe(true);
    });
});
