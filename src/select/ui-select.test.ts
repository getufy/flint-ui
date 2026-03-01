import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-select';
import type { UiSelect } from './ui-select';

describe('ui-select', () => {
    const defaultOptions = [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
    ];

    it('renders with options correctly', async () => {
        const el = await fixture<UiSelect>(html`<ui-select .options=${defaultOptions} label="Select one"></ui-select>`);

        expect(el.options.length).toBe(2);
        expect(el.value).toEqual([]);

        const label = el.shadowRoot!.querySelector('label')!;
        expect(label.textContent).toBe('Select one');

        const dropdown = el.shadowRoot!.querySelector('.dropdown')!;
        const optionElements = dropdown.querySelectorAll('.option');
        expect(optionElements.length).toBe(2);
        expect(optionElements[0].querySelector('span')!.textContent?.trim()).toBe('Option 1');
    });

    it('toggles dropdown and selects an option', async () => {
        const el = await fixture<UiSelect>(html`<ui-select .options=${defaultOptions}></ui-select>`);
        const trigger = el.shadowRoot!.querySelector('.select-trigger') as HTMLElement;

        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        // Open dropdown
        trigger.click();
        await el.updateComplete;

        // Click first option
        const firstOption = el.shadowRoot!.querySelector('.option') as HTMLElement;
        firstOption.click();
        await el.updateComplete;

        expect(el.value).toEqual(['opt1']);
        expect(changeSpy).toHaveBeenCalledOnce();
    });

    it('supports multi-select mode', async () => {
        const el = await fixture<UiSelect>(html`
      <ui-select multiple .options=${defaultOptions} .value=${['opt1', 'opt2']}></ui-select>
    `);

        const chips = el.shadowRoot!.querySelectorAll('.chip');
        expect(chips.length).toBe(2);

        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        // Remove one chip
        const removeIcon = el.shadowRoot!.querySelector('.chip-remove') as HTMLElement;
        removeIcon.click();
        await el.updateComplete;

        expect(el.value).toEqual(['opt2']);
        expect(changeSpy).toHaveBeenCalledOnce();
    });
});
