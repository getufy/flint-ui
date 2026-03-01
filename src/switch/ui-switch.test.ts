import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-switch';
import type { UiSwitch } from './ui-switch';

describe('ui-switch', () => {
    it('is defined', async () => {
        const el = document.createElement('ui-switch');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders with default values', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        expect(el.checked).toBe(false);
        expect(el.disabled).toBe(false);

        const switchEl = el.shadowRoot!.querySelector('.switch');
        expect(switchEl).toBeDefined();
        expect(switchEl?.getAttribute('aria-checked')).toBe('false');
    });

    it('toggles when clicked', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;

        const changeSpy = vi.fn();
        el.addEventListener('change', changeSpy);

        wrapper.click();
        await el.updateComplete;

        expect(el.checked).toBe(true);
        expect(changeSpy).toHaveBeenCalledWith(expect.objectContaining({
            detail: { checked: true }
        }));

        wrapper.click();
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });

    it('does not toggle when disabled', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch disabled></ui-switch>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;

        wrapper.click();
        await el.updateComplete;

        expect(el.checked).toBe(false);
    });

    it('renders label', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch label="Test switch"></ui-switch>`);
        const label = el.shadowRoot!.querySelector('.label');
        expect(label?.textContent).toBe('Test switch');
    });

    it('handles keyboard interaction', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        await el.updateComplete;
        expect(el.checked).toBe(true);

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });
});
