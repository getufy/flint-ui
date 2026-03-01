import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-input';
import type { UiInput } from './ui-input';

describe('ui-input', () => {
    it('renders with default properties', async () => {
        const el = await fixture<UiInput>(html`<ui-input label="Username"></ui-input>`);

        expect(el.label).toBe('Username');
        expect(el.value).toBe('');
        expect(el.type).toBe('text');

        const label = el.shadowRoot!.querySelector('label')!;
        expect(label.textContent).toBe('Username');

        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.type).toBe('text');
        expect(input.disabled).toBe(false);
    });

    it('displays help text and error text properly', async () => {
        const el = await fixture<UiInput>(html`
      <ui-input helpText="Helpful tip"></ui-input>
    `);

        let helpText = el.shadowRoot!.querySelector('.help-text')!;
        expect(helpText.textContent).toBe('Helpful tip');

        el.error = true;
        el.errorMessage = 'An error occurred';
        await el.updateComplete;

        helpText = el.shadowRoot!.querySelector('.help-text.error-text')!;
        expect(helpText.textContent).toBe('An error occurred');
    });

    it('dispatches events on input and change', async () => {
        const el = await fixture<UiInput>(html`<ui-input></ui-input>`);
        const input = el.shadowRoot!.querySelector('input')!;

        const inputSpy = vi.fn();
        const changeSpy = vi.fn();
        el.addEventListener('ui-input-input', inputSpy);
        el.addEventListener('ui-input-change', changeSpy);

        input.value = 'test sequence';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('change'));

        expect(el.value).toBe('test sequence');
        expect(inputSpy).toHaveBeenCalledOnce();
        expect(changeSpy).toHaveBeenCalledOnce();
    });
});
