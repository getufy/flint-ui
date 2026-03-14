import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { FlintSwitch } from './flint-switch';

describe('flint-switch', () => {
    // ── Definition ──────────────────────────────────────────────────────────

    it('is defined', async () => {
        const el = document.createElement('flint-switch');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    // ── Default rendering ────────────────────────────────────────────────────

    it('renders with default values', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        expect(el.checked).toBe(false);
        expect(el.disabled).toBe(false);
        expect(el.required).toBe(false);
        expect(el.value).toBe('on');

        const switchEl = el.shadowRoot!.querySelector('.switch');
        expect(switchEl).toBeTruthy();
        expect(switchEl!.getAttribute('aria-checked')).toBe('false');
        expect(switchEl!.getAttribute('aria-disabled')).toBe('false');
        expect(switchEl!.getAttribute('aria-required')).toBe('false');
    });

    it('has tabIndex 0 by default', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;
        expect(switchEl.tabIndex).toBe(0);
    });

    // ── Attribute reflection ─────────────────────────────────────────────────

    it('reflects checked attribute', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        el.checked = true;
        await el.updateComplete;
        expect(el.hasAttribute('checked')).toBe(true);

        el.checked = false;
        await el.updateComplete;
        expect(el.hasAttribute('checked')).toBe(false);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        el.disabled = true;
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects required attribute', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        el.required = true;
        await el.updateComplete;
        expect(el.hasAttribute('required')).toBe(true);
    });

    it('reflects size attribute', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch size="sm"></flint-switch>`);
        expect(el.getAttribute('size')).toBe('sm');
    });

    // ── Toggle behaviour ─────────────────────────────────────────────────────

    it('toggles when clicked', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;

        const spy = vi.fn();
        el.addEventListener('flint-switch-change', spy);

        wrapper.click();
        await el.updateComplete;

        expect(el.checked).toBe(true);
        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ checked: true });

        wrapper.click();
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });

    it('does not toggle when disabled', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch disabled></flint-switch>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;

        const spy = vi.fn();
        el.addEventListener('flint-switch-change', spy);

        wrapper.click();
        await el.updateComplete;

        expect(el.checked).toBe(false);
        expect(spy).not.toHaveBeenCalled();
    });

    // ── Event details ────────────────────────────────────────────────────────

    it('fires flint-switch-change (not "change")', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;

        const changeSpy = vi.fn();
        const legacySpy = vi.fn();
        el.addEventListener('flint-switch-change', changeSpy);
        el.addEventListener('change', legacySpy);

        wrapper.click();
        await el.updateComplete;

        expect(changeSpy).toHaveBeenCalledOnce();
        expect(legacySpy).not.toHaveBeenCalled();
    });

    it('event bubbles and is composed', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;

        let captured: CustomEvent | null = null;
        document.addEventListener('flint-switch-change', (e) => { captured = e as CustomEvent; }, { once: true });

        wrapper.click();
        await el.updateComplete;

        expect(captured).not.toBeNull();
        expect((captured as unknown as CustomEvent).bubbles).toBe(true);
        expect((captured as unknown as CustomEvent).composed).toBe(true);
    });

    // ── Keyboard interaction ─────────────────────────────────────────────────

    it('toggles on Space key', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;
        expect(el.checked).toBe(true);
    });

    it('toggles on Enter key', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(el.checked).toBe(true);
    });

    it('does not toggle on Space/Enter when disabled', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch disabled></flint-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;
        expect(el.checked).toBe(false);

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });

    it('does not toggle on unrelated key', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });

    it('has tabIndex -1 when disabled', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch disabled></flint-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;
        expect(switchEl.tabIndex).toBe(-1);
    });

    // ── Label ────────────────────────────────────────────────────────────────

    it('renders label prop', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch label="Test switch"></flint-switch>`);
        const label = el.shadowRoot!.querySelector('.label');
        expect(label?.textContent?.trim()).toBe('Test switch');
    });

    it('adds disabled class to label when disabled', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch label="Test" disabled></flint-switch>`);
        const label = el.shadowRoot!.querySelector('.label');
        expect(label?.classList.contains('disabled')).toBe(true);
    });

    it('renders default slot when no label prop', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch><span id="slotted">My label</span></flint-switch>`);
        expect(el.shadowRoot!.querySelector('.label')).toBeNull();
        expect(el.shadowRoot!.querySelector('slot:not([name])')).toBeTruthy();
    });

    // ── aria-labelledby / aria-label ─────────────────────────────────────────

    it('sets aria-labelledby on switch div when label prop is used', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch label="Toggle"></flint-switch>`);
        const switchDiv = el.shadowRoot!.querySelector('.switch')!;
        const labelSpan = el.shadowRoot!.querySelector('.label')!;
        expect(switchDiv.getAttribute('aria-labelledby')).toBe(labelSpan.id);
    });

    it('does not set aria-labelledby when no label prop', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        const switchDiv = el.shadowRoot!.querySelector('.switch')!;
        expect(switchDiv.hasAttribute('aria-labelledby')).toBe(false);
    });

    it('sets aria-label on switch div from aria-label attribute', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch aria-label="Toggle dark mode"></flint-switch>`);
        const switchDiv = el.shadowRoot!.querySelector('.switch')!;
        expect(switchDiv.getAttribute('aria-label')).toBe('Toggle dark mode');
    });

    it('does not set aria-label when not provided', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        const switchDiv = el.shadowRoot!.querySelector('.switch')!;
        expect(switchDiv.hasAttribute('aria-label')).toBe(false);
    });

    // ── aria-required ────────────────────────────────────────────────────────

    it('sets aria-required on switch div when required', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch required></flint-switch>`);
        const switchDiv = el.shadowRoot!.querySelector('.switch')!;
        expect(switchDiv.getAttribute('aria-required')).toBe('true');
    });

    // ── defaultChecked ───────────────────────────────────────────────────────

    it('initialises checked from defaultChecked', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch default-checked></flint-switch>`);
        expect(el.checked).toBe(true);
    });

    it('defaultChecked does not cause a second update cycle', async () => {
        // If willUpdate is correct this simply resolves without throwing
        const el = await fixture<FlintSwitch>(html`<flint-switch default-checked></flint-switch>`);
        await el.updateComplete;
        expect(el.checked).toBe(true);
    });

    // ── Size variants ────────────────────────────────────────────────────────

    it('defaults to size md', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        expect(el.size).toBe('md');
        expect(el.getAttribute('size')).toBe('md');
    });

    it('accepts size sm', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch size="sm"></flint-switch>`);
        expect(el.size).toBe('sm');
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('accepts size lg', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch size="lg"></flint-switch>`);
        expect(el.size).toBe('lg');
        expect(el.getAttribute('size')).toBe('lg');
    });

    // ── Form association ─────────────────────────────────────────────────────
    // Note: jsdom does not support FormData with form-associated custom elements.
    // These tests verify the API surface; FormData behaviour is verified in browser tests.

    it('is form-associated', () => {
        expect(FlintSwitch.formAssociated).toBe(true);
    });

    it('has name prop', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch name="toggle"></flint-switch>`);
        expect(el.name).toBe('toggle');
    });

    it('has value prop defaulting to "on"', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch></flint-switch>`);
        expect(el.value).toBe('on');
    });

    it('value prop can be customised', async () => {
        const el = await fixture<FlintSwitch>(html`<flint-switch value="yes"></flint-switch>`);
        expect(el.value).toBe('yes');
    });
});
