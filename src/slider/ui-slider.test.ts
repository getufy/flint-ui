import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-slider';
import type { UiSlider } from './ui-slider';

describe('ui-slider', () => {
    it('renders with initial values', async () => {
        const el = await fixture<UiSlider>(html`
            <ui-slider label="Volume" value="25" min="0" max="100"></ui-slider>
        `);

        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.value).toBe('25');
        expect(el.shadowRoot!.textContent).toContain('Volume');
    });

    it('updates value correctly', async () => {
        const el = await fixture<UiSlider>(html`<ui-slider value="50"></ui-slider>`);
        const input = el.shadowRoot!.querySelector('input')!;

        input.value = '75';
        input.dispatchEvent(new Event('input'));

        expect(el.value).toBe(75);
    });

    it('respects min and max bounds', async () => {
        const el = await fixture<UiSlider>(html`
            <ui-slider min="10" max="20" value="15"></ui-slider>
        `);
        const input = el.shadowRoot!.querySelector('input')!;

        expect(input.min).toBe('10');
        expect(input.max).toBe('20');
    });

    it('displays value when showValue is true', async () => {
        const el = await fixture<UiSlider>(html`
            <ui-slider value="42" showValue></ui-slider>
        `);

        const display = el.shadowRoot!.querySelector('.value-display');
        expect(display!.textContent).toBe('42');
    });

    it('is disabled when the disabled property is set', async () => {
        const el = await fixture<UiSlider>(html`<ui-slider disabled></ui-slider>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.disabled).toBe(true);
    });

    it('dispatches change event on input', async () => {
        let changedValue = 0;
        const el = await fixture<UiSlider>(html`
            <ui-slider @change=${(e: CustomEvent) => changedValue = e.detail.value}></ui-slider>
        `);

        const input = el.shadowRoot!.querySelector('input')!;
        input.value = '90';
        input.dispatchEvent(new Event('input'));

        expect(changedValue).toBe(90);
    });

    // --- Vertical slider tests ---

    it('is horizontal by default', async () => {
        const el = await fixture<UiSlider>(html`<ui-slider></ui-slider>`);
        expect(el.vertical).toBe(false);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.classList.contains('vertical')).toBe(false);
        expect(input.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('renders in vertical mode when vertical property is set', async () => {
        const el = await fixture<UiSlider>(html`<ui-slider vertical></ui-slider>`);
        expect(el.vertical).toBe(true);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.classList.contains('vertical')).toBe(true);
    });

    it('reflects vertical attribute on host element', async () => {
        const el = await fixture<UiSlider>(html`<ui-slider vertical></ui-slider>`);
        expect(el.hasAttribute('vertical')).toBe(true);
    });

    it('sets aria-orientation to vertical when vertical is true', async () => {
        const el = await fixture<UiSlider>(html`<ui-slider vertical></ui-slider>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('applies vertical class to wrapper and track container in vertical mode', async () => {
        const el = await fixture<UiSlider>(html`<ui-slider vertical></ui-slider>`);
        const wrapper = el.shadowRoot!.querySelector('.slider-wrapper')!;
        const trackContainer = el.shadowRoot!.querySelector('.track-container')!;
        expect(wrapper.classList.contains('vertical')).toBe(true);
        expect(trackContainer.classList.contains('vertical')).toBe(true);
    });

    it('still dispatches change events in vertical mode', async () => {
        let changedValue = 0;
        const el = await fixture<UiSlider>(html`
            <ui-slider vertical @change=${(e: CustomEvent) => changedValue = e.detail.value}></ui-slider>
        `);

        const input = el.shadowRoot!.querySelector('input')!;
        input.value = '55';
        input.dispatchEvent(new Event('input'));

        expect(changedValue).toBe(55);
    });

    it('can be disabled in vertical mode', async () => {
        const el = await fixture<UiSlider>(html`<ui-slider vertical disabled></ui-slider>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.disabled).toBe(true);
    });

    it('shows value display in vertical mode when showValue is set', async () => {
        const el = await fixture<UiSlider>(html`
            <ui-slider vertical value="33" showValue></ui-slider>
        `);
        const display = el.shadowRoot!.querySelector('.value-display');
        expect(display).not.toBeNull();
        expect(display!.textContent).toBe('33');
    });
});