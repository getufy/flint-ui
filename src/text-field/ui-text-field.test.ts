import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-text-field.js';
import type { UiTextField } from './ui-text-field.js';

describe('ui-text-field', () => {
    it('is defined', () => {
        const el = document.createElement('ui-text-field');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders with label and placeholder', async () => {
        const el = await fixture<UiTextField>(html`
      <ui-text-field label="Username" placeholder="Enter name"></ui-text-field>
    `);

        expect(el.shadowRoot?.querySelector('label')?.textContent).toBe('Username');
        expect(el.shadowRoot?.querySelector('input')?.placeholder).toBe('Enter name');
    });

    it('updates value correctly', async () => {
        const el = await fixture<UiTextField>(html`<ui-text-field value="init"></ui-text-field>`);
        const input = el.shadowRoot!.querySelector('input')!;

        expect(input.value).toBe('init');

        input.value = 'updated';
        input.dispatchEvent(new Event('input'));

        expect(el.value).toBe('updated');
    });

    it('handles focus and blur states', async () => {
        const el = await fixture<UiTextField>(html`<ui-text-field></ui-text-field>`);
        const input = el.shadowRoot!.querySelector('input')!;
        const wrapper = el.shadowRoot!.querySelector('.input-wrapper')!;

        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;
        expect(wrapper.classList.contains('focused')).toBe(true);

        input.dispatchEvent(new Event('blur'));
        await el.updateComplete;
        expect(wrapper.classList.contains('focused')).toBe(false);
    });

    it('renders error message and applies error class', async () => {
        const el = await fixture<UiTextField>(html`
      <ui-text-field errorMessage="Required field"></ui-text-field>
    `);

        const wrapper = el.shadowRoot!.querySelector('.input-wrapper')!;
        const errorText = el.shadowRoot!.querySelector('.error-text')!;

        expect(wrapper.classList.contains('error')).toBe(true);
        expect(errorText.textContent).toBe('Required field');
    });

    it('respects disabled state', async () => {
        const el = await fixture<UiTextField>(html`<ui-text-field disabled></ui-text-field>`);
        const input = el.shadowRoot!.querySelector('input')!;

        expect(input.disabled).toBe(true);
        expect(el.shadowRoot!.querySelector('.input-wrapper')!.classList.contains('disabled')).toBe(true);
    });

    it('dispatches change event on change', async () => {
        let changed = false;
        const el = await fixture<UiTextField>(html`
      <ui-text-field @change=${() => changed = true}></ui-text-field>
    `);

        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('change'));

        expect(changed).toBe(true);
    });
});
