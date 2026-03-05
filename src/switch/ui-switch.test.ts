import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { UiSwitch } from './ui-switch';

describe('ui-switch', () => {
    // ── Definition ──────────────────────────────────────────────────────────

    it('is defined', async () => {
        const el = document.createElement('ui-switch');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    // ── Default rendering ────────────────────────────────────────────────────

    it('renders with default values', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
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
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;
        expect(switchEl.tabIndex).toBe(0);
    });

    // ── Attribute reflection ─────────────────────────────────────────────────

    it('reflects checked attribute', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        el.checked = true;
        await el.updateComplete;
        expect(el.hasAttribute('checked')).toBe(true);

        el.checked = false;
        await el.updateComplete;
        expect(el.hasAttribute('checked')).toBe(false);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        el.disabled = true;
        await el.updateComplete;
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('reflects required attribute', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        el.required = true;
        await el.updateComplete;
        expect(el.hasAttribute('required')).toBe(true);
    });

    it('reflects size attribute', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch size="sm"></ui-switch>`);
        expect(el.getAttribute('size')).toBe('sm');
    });

    // ── Toggle behaviour ─────────────────────────────────────────────────────

    it('toggles when clicked', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;

        const spy = vi.fn();
        el.addEventListener('ui-switch-change', spy);

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
        const el = await fixture<UiSwitch>(html`<ui-switch disabled></ui-switch>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;

        const spy = vi.fn();
        el.addEventListener('ui-switch-change', spy);

        wrapper.click();
        await el.updateComplete;

        expect(el.checked).toBe(false);
        expect(spy).not.toHaveBeenCalled();
    });

    // ── Event details ────────────────────────────────────────────────────────

    it('fires ui-switch-change (not "change")', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;

        const changeSpy = vi.fn();
        const legacySpy = vi.fn();
        el.addEventListener('ui-switch-change', changeSpy);
        el.addEventListener('change', legacySpy);

        wrapper.click();
        await el.updateComplete;

        expect(changeSpy).toHaveBeenCalledOnce();
        expect(legacySpy).not.toHaveBeenCalled();
    });

    it('event bubbles and is composed', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        const wrapper = el.shadowRoot!.querySelector('.wrapper') as HTMLElement;

        let captured: CustomEvent | null = null;
        document.addEventListener('ui-switch-change', (e) => { captured = e as CustomEvent; }, { once: true });

        wrapper.click();
        await el.updateComplete;

        expect(captured).not.toBeNull();
        expect((captured as unknown as CustomEvent).bubbles).toBe(true);
        expect((captured as unknown as CustomEvent).composed).toBe(true);
    });

    // ── Keyboard interaction ─────────────────────────────────────────────────

    it('toggles on Space key', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;
        expect(el.checked).toBe(true);
    });

    it('toggles on Enter key', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(el.checked).toBe(true);
    });

    it('does not toggle on Space/Enter when disabled', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch disabled></ui-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
        await el.updateComplete;
        expect(el.checked).toBe(false);

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });

    it('does not toggle on unrelated key', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;

        switchEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });

    it('has tabIndex -1 when disabled', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch disabled></ui-switch>`);
        const switchEl = el.shadowRoot!.querySelector('.switch') as HTMLElement;
        expect(switchEl.tabIndex).toBe(-1);
    });

    // ── Label ────────────────────────────────────────────────────────────────

    it('renders label prop', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch label="Test switch"></ui-switch>`);
        const label = el.shadowRoot!.querySelector('.label');
        expect(label?.textContent?.trim()).toBe('Test switch');
    });

    it('adds disabled class to label when disabled', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch label="Test" disabled></ui-switch>`);
        const label = el.shadowRoot!.querySelector('.label');
        expect(label?.classList.contains('disabled')).toBe(true);
    });

    it('renders default slot when no label prop', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch><span id="slotted">My label</span></ui-switch>`);
        expect(el.shadowRoot!.querySelector('.label')).toBeNull();
        expect(el.shadowRoot!.querySelector('slot:not([name])')).toBeTruthy();
    });

    // ── aria-labelledby / aria-label ─────────────────────────────────────────

    it('sets aria-labelledby on switch div when label prop is used', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch label="Toggle"></ui-switch>`);
        const switchDiv = el.shadowRoot!.querySelector('.switch')!;
        const labelSpan = el.shadowRoot!.querySelector('.label')!;
        expect(switchDiv.getAttribute('aria-labelledby')).toBe(labelSpan.id);
    });

    it('does not set aria-labelledby when no label prop', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        const switchDiv = el.shadowRoot!.querySelector('.switch')!;
        expect(switchDiv.hasAttribute('aria-labelledby')).toBe(false);
    });

    it('sets aria-label on switch div from aria-label attribute', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch aria-label="Toggle dark mode"></ui-switch>`);
        const switchDiv = el.shadowRoot!.querySelector('.switch')!;
        expect(switchDiv.getAttribute('aria-label')).toBe('Toggle dark mode');
    });

    it('does not set aria-label when not provided', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        const switchDiv = el.shadowRoot!.querySelector('.switch')!;
        expect(switchDiv.hasAttribute('aria-label')).toBe(false);
    });

    // ── aria-required ────────────────────────────────────────────────────────

    it('sets aria-required on switch div when required', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch required></ui-switch>`);
        const switchDiv = el.shadowRoot!.querySelector('.switch')!;
        expect(switchDiv.getAttribute('aria-required')).toBe('true');
    });

    // ── defaultChecked ───────────────────────────────────────────────────────

    it('initialises checked from defaultChecked', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch default-checked></ui-switch>`);
        expect(el.checked).toBe(true);
    });

    it('defaultChecked does not cause a second update cycle', async () => {
        // If willUpdate is correct this simply resolves without throwing
        const el = await fixture<UiSwitch>(html`<ui-switch default-checked></ui-switch>`);
        await el.updateComplete;
        expect(el.checked).toBe(true);
    });

    // ── Size variants ────────────────────────────────────────────────────────

    it('defaults to size md', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        expect(el.size).toBe('md');
        expect(el.getAttribute('size')).toBe('md');
    });

    it('accepts size sm', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch size="sm"></ui-switch>`);
        expect(el.size).toBe('sm');
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('accepts size lg', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch size="lg"></ui-switch>`);
        expect(el.size).toBe('lg');
        expect(el.getAttribute('size')).toBe('lg');
    });

    // ── Form association ─────────────────────────────────────────────────────
    // Note: jsdom does not support FormData with form-associated custom elements.
    // These tests verify the API surface; FormData behaviour is verified in browser tests.

    it('is form-associated', () => {
        expect(UiSwitch.formAssociated).toBe(true);
    });

    it('has name prop', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch name="toggle"></ui-switch>`);
        expect(el.name).toBe('toggle');
    });

    it('has value prop defaulting to "on"', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch></ui-switch>`);
        expect(el.value).toBe('on');
    });

    it('value prop can be customised', async () => {
        const el = await fixture<UiSwitch>(html`<ui-switch value="yes"></ui-switch>`);
        expect(el.value).toBe('yes');
    });
});
