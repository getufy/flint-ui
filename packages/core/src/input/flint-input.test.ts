import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-input';
import type { FlintInput } from './flint-input';

describe('flint-input', () => {
    // ─── Default rendering ───────────────────────────────────────────────────

    it('renders with default properties', async () => {
        const el = await fixture<FlintInput>(html`<flint-input label="Username"></flint-input>`);

        expect(el.label).toBe('Username');
        expect(el.value).toBe('');
        expect(el.type).toBe('text');

        const label = el.shadowRoot!.querySelector('label')!;
        expect(label.textContent).toBe('Username');

        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.type).toBe('text');
        expect(input.disabled).toBe(false);
    });

    it('renders without a label when label is empty', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        expect(el.shadowRoot!.querySelector('label')).toBeNull();
    });

    it('renders placeholder on the native input', async () => {
        const el = await fixture<FlintInput>(html`<flint-input placeholder="Type here"></flint-input>`);
        expect(el.shadowRoot!.querySelector('input')!.placeholder).toBe('Type here');
    });

    // ─── Label–input association (accessibility) ─────────────────────────────

    it('links label to input via for/id', async () => {
        const el = await fixture<FlintInput>(html`<flint-input label="Email"></flint-input>`);
        const label = el.shadowRoot!.querySelector('label')!;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(label.getAttribute('for')).toBe(input.id);
        expect(input.id).toBeTruthy();
    });

    it('generates unique ids for multiple instances', async () => {
        const a = await fixture<FlintInput>(html`<flint-input label="A"></flint-input>`);
        const b = await fixture<FlintInput>(html`<flint-input label="B"></flint-input>`);
        const idA = a.shadowRoot!.querySelector('input')!.id;
        const idB = b.shadowRoot!.querySelector('input')!.id;
        expect(idA).not.toBe(idB);
    });

    // ─── aria-invalid ─────────────────────────────────────────────────────────

    it('sets aria-invalid="false" by default', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-invalid')).toBe('false');
    });

    it('sets aria-invalid="true" when error=true', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        el.error = true;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-invalid')).toBe('true');
    });

    it('sets aria-invalid="true" when errorMessage is set', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        el.errorMessage = 'Required';
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-invalid')).toBe('true');
    });

    // ─── aria-describedby ────────────────────────────────────────────────────

    it('sets aria-describedby when helpText is present', async () => {
        const el = await fixture<FlintInput>(html`<flint-input help-text="Hint"></flint-input>`);
        const input = el.shadowRoot!.querySelector('input')!;
        const descId = input.getAttribute('aria-describedby')!;
        expect(descId).toBeTruthy();
        const desc = el.shadowRoot!.querySelector(`#${descId}`)!;
        expect(desc.textContent).toBe('Hint');
    });

    it('sets aria-describedby to error paragraph when errorMessage present', async () => {
        const el = await fixture<FlintInput>(html`<flint-input error-message="Bad value"></flint-input>`);
        const input = el.shadowRoot!.querySelector('input')!;
        const descId = input.getAttribute('aria-describedby')!;
        const desc = el.shadowRoot!.querySelector(`#${descId}`)!;
        expect(desc.textContent).toBe('Bad value');
        expect(desc.classList.contains('error-text')).toBe(true);
    });

    it('error paragraph has role="alert"', async () => {
        const el = await fixture<FlintInput>(html`<flint-input error-message="Oops"></flint-input>`);
        const alert = el.shadowRoot!.querySelector('[role="alert"]')!;
        expect(alert).not.toBeNull();
        expect(alert.textContent).toBe('Oops');
    });

    // ─── aria-required ──────────────────────────────────────────────────────

    it('sets aria-required="false" by default', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-required')).toBe('false');
    });

    it('sets aria-required="true" when required', async () => {
        const el = await fixture<FlintInput>(html`<flint-input required></flint-input>`);
        expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-required')).toBe('true');
    });

    it('updates aria-required when required changes', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        el.required = true;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-required')).toBe('true');
        el.required = false;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-required')).toBe('false');
    });

    // ─── help text / error text display ──────────────────────────────────────

    it('displays help text', async () => {
        const el = await fixture<FlintInput>(html`<flint-input help-text="Helpful tip"></flint-input>`);
        const helpText = el.shadowRoot!.querySelector('.help-text')!;
        expect(helpText.textContent).toBe('Helpful tip');
        expect(helpText.classList.contains('error-text')).toBe(false);
    });

    it('displays error text over help text when both set', async () => {
        const el = await fixture<FlintInput>(html`<flint-input help-text="Hint" error-message="Error!"></flint-input>`);
        const para = el.shadowRoot!.querySelector('.help-text')!;
        expect(para.textContent).toBe('Error!');
        expect(para.classList.contains('error-text')).toBe(true);
    });

    it('hides error text when errorMessage cleared', async () => {
        const el = await fixture<FlintInput>(html`<flint-input error-message="Oops"></flint-input>`);
        el.errorMessage = '';
        el.error = false;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.error-text')).toBeNull();
    });

    // ─── disabled ────────────────────────────────────────────────────────────

    it('disables the native input', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        el.disabled = true;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.disabled).toBe(true);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    // ─── required ────────────────────────────────────────────────────────────

    it('marks native input as required', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        el.required = true;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.required).toBe(true);
        expect(el.hasAttribute('required')).toBe(true);
    });

    // ─── readonly ────────────────────────────────────────────────────────────

    it('marks native input as readonly', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        el.readonly = true;
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.readOnly).toBe(true);
        expect(el.hasAttribute('readonly')).toBe(true);
    });

    // ─── name / autocomplete ─────────────────────────────────────────────────

    it('passes name to native input', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        el.name = 'email';
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.name).toBe('email');
    });

    it('passes autocomplete to native input', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        el.autocomplete = 'email';
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('input')!.autocomplete).toBe('email');
    });

    // ─── type variants ───────────────────────────────────────────────────────

    it.each(['password', 'email', 'number', 'search', 'url', 'tel', 'file', 'date'])(
        'supports type="%s"',
        async (t) => {
            const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
            el.type = t;
            await el.updateComplete;
            expect(el.shadowRoot!.querySelector('input')!.type).toBe(t);
        }
    );

    // ─── size variants ───────────────────────────────────────────────────────

    it('defaults to size="default"', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        expect(el.size).toBe('default');
        expect(el.getAttribute('size')).toBe('default');
    });

    it('reflects size="sm" attribute', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        el.size = 'sm';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('reflects size="lg" attribute', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        el.size = 'lg';
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('lg');
    });

    // ─── events ──────────────────────────────────────────────────────────────

    it('dispatches flint-input-input with correct detail on input event', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        const input = el.shadowRoot!.querySelector('input')!;

        const spy = vi.fn();
        el.addEventListener('flint-input-input', spy);

        input.value = 'hello';
        input.dispatchEvent(new Event('input'));

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: 'hello' });
        expect(el.value).toBe('hello');
    });

    it('dispatches flint-input-change with correct detail on change event', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        const input = el.shadowRoot!.querySelector('input')!;

        const spy = vi.fn();
        el.addEventListener('flint-input-change', spy);

        input.value = 'world';
        input.dispatchEvent(new Event('change'));

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0].detail).toEqual({ value: 'world' });
        expect(el.value).toBe('world');
    });

    it('events bubble and are composed', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        const input = el.shadowRoot!.querySelector('input')!;

        let bubbled = false;
        document.addEventListener('flint-input-input', () => { bubbled = true; }, { once: true });

        input.value = 'x';
        input.dispatchEvent(new Event('input'));

        expect(bubbled).toBe(true);
    });

    // ─── inputElement accessor ───────────────────────────────────────────────

    it('exposes inputElement getter', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        expect(el.inputElement).toBeInstanceOf(HTMLInputElement);
    });
});
