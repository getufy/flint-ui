import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-autocomplete';
import type { UiAutocomplete } from './ui-autocomplete';

const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
];

describe('ui-autocomplete', () => {
    it('renders input', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input');
        expect(input).not.toBeNull();
    });

    it('has combobox role and aria attributes', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.getAttribute('role')).toBe('combobox');
        expect(input.getAttribute('aria-autocomplete')).toBe('list');
        expect(input.getAttribute('aria-haspopup')).toBe('listbox');
        expect(input.getAttribute('aria-expanded')).toBe('false');
    });

    it('filters options on input', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'app';
        input.dispatchEvent(new Event('input'));

        await el.updateComplete;

        const renderedOptions = el.shadowRoot!.querySelectorAll('.option');
        expect(renderedOptions.length).toBe(1);
        expect(renderedOptions[0].textContent).toContain('Apple');
    });

    it('shows all options on focus', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));

        await el.updateComplete;

        const renderedOptions = el.shadowRoot!.querySelectorAll('.option');
        expect(renderedOptions.length).toBe(2);
    });

    it('opens dropdown and updates aria-expanded on focus', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));

        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();
        expect(input.getAttribute('aria-expanded')).toBe('true');
    });

    it('selects option on click', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        const firstOption = el.shadowRoot!.querySelector('.option') as HTMLElement;
        firstOption.click();
        await el.updateComplete;

        expect(input.value).toBe('Apple');
        expect(el.value).toBe('apple');
        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    it('dispatches change event with value and label on selection', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        const handler = vi.fn();
        el.addEventListener('change', handler);

        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        (el.shadowRoot!.querySelector('.option') as HTMLElement).click();
        await el.updateComplete;

        expect(handler).toHaveBeenCalledOnce();
        expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ value: 'apple', label: 'Apple' });
    });

    it('navigates options with ArrowDown', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        const optionEls = el.shadowRoot!.querySelectorAll('.option');
        expect(optionEls[0].classList.contains('active')).toBe(true);
        expect(optionEls[0].getAttribute('aria-selected')).toBe('true');
    });

    it('navigates options with ArrowUp', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        // Go to last option
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
        await el.updateComplete;

        const optionEls = el.shadowRoot!.querySelectorAll('.option');
        expect(optionEls[0].classList.contains('active')).toBe(true);
    });

    it('selects highlighted option with Enter', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;

        expect(el.value).toBe('apple');
        expect(input.value).toBe('Apple');
        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    it('closes dropdown on Escape and resets input to selected value', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options} value="apple"></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        // Type something to change the input
        input.value = 'xyz';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;

        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
        // Input resets to the previously selected label
        expect(input.value).toBe('Apple');
    });

    it('opens dropdown with ArrowDown when closed', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;

        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.dropdown.open')).not.toBeNull();
        const optionEls = el.shadowRoot!.querySelectorAll('.option');
        expect(optionEls[0].classList.contains('active')).toBe(true);
    });

    it('syncs _inputValue when value prop changes externally', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        el.value = 'banana';
        await el.updateComplete;

        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.value).toBe('Banana');
    });

    it('behaves as freeSolo input', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete freeSolo></ui-autocomplete>`);
        const handler = vi.fn();
        el.addEventListener('change', handler);

        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'Custom Value';
        input.dispatchEvent(new Event('input'));

        await el.updateComplete;
        expect(el.value).toBe('Custom Value');
        expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ value: 'Custom Value', label: 'Custom Value' });
    });

    it('disables the input when disabled prop is set', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete disabled></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.disabled).toBe(true);
    });

    it('does not open dropdown on focus when disabled', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options} disabled></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('focus'));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeNull();
    });

    it('shows no-options message when no matches found', async () => {
        const el = await fixture<UiAutocomplete>(html`<ui-autocomplete .options=${options}></ui-autocomplete>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'zzz';
        input.dispatchEvent(new Event('input'));
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('.no-options')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.no-options')!.textContent).toContain('No options');
    });
});
