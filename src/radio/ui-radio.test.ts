import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-radio';
import type { UiRadioGroup, UiRadio } from './ui-radio';

describe('ui-radio', () => {
    it('renders radio-group and radios', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="test" value="1">
                <ui-radio value="1" label="One"></ui-radio>
                <ui-radio value="2" label="Two"></ui-radio>
            </ui-radio-group>
        `);

        const radios = el.querySelectorAll('ui-radio');
        expect(radios.length).toBe(2);
        expect((radios[0] as UiRadio).checked).toBe(true);
        expect((radios[1] as UiRadio).checked).toBe(false);
    });

    it('updates value on radio click', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group name="test" value="1">
                <ui-radio value="1" label="One"></ui-radio>
                <ui-radio value="2" label="Two"></ui-radio>
            </ui-radio-group>
        `);

        const radio2 = el.querySelectorAll('ui-radio')[1] as UiRadio;
        const input = radio2.shadowRoot!.querySelector('input')!;

        input.click();
        await el.updateComplete;

        expect(el.value).toBe('2');
        expect(radio2.checked).toBe(true);
        expect((el.querySelectorAll('ui-radio')[0] as UiRadio).checked).toBe(false);
    });

    it('dispatches change event', async () => {
        let selectedValue = '';
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group @change=${(e: CustomEvent) => selectedValue = e.detail.value}>
                <ui-radio value="a"></ui-radio>
                <ui-radio value="b"></ui-radio>
            </ui-radio-group>
        `);

        const radioB = el.querySelectorAll('ui-radio')[1] as UiRadio;
        radioB.shadowRoot!.querySelector('input')!.click();

        expect(selectedValue).toBe('b');
    });

    it('respects disabled state', async () => {
        const el = await fixture<UiRadioGroup>(html`
            <ui-radio-group value="a">
                <ui-radio value="a"></ui-radio>
                <ui-radio value="b" disabled></ui-radio>
            </ui-radio-group>
        `);

        const radioB = el.querySelectorAll('ui-radio')[1] as UiRadio;
        radioB.shadowRoot!.querySelector('input')!.click();
        await el.updateComplete;

        expect(el.value).toBe('a'); // Value should not have changed
        expect(radioB.checked).toBe(false);
    });
});
