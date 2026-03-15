import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-text-field.js';
import type { FlintTextField } from './flint-text-field.js';

describe('flint-text-field', () => {
    it('is defined', () => {
        const el = document.createElement('flint-text-field');
        expect(el).toBeInstanceOf(HTMLElement);
    });

    it('renders with label and placeholder', async () => {
        const el = await fixture<FlintTextField>(html`
      <flint-text-field label="Username" placeholder="Enter name"></flint-text-field>
    `);

        expect(el.shadowRoot?.querySelector('label')?.textContent).toBe('Username');
        expect(el.shadowRoot?.querySelector('input')?.placeholder).toBe('Enter name');
    });

    it('updates value correctly', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field value="init"></flint-text-field>`);
        const input = el.shadowRoot!.querySelector('input')!;

        expect(input.value).toBe('init');

        input.value = 'updated';
        input.dispatchEvent(new Event('input'));

        expect(el.value).toBe('updated');
    });

    it('handles focus and blur states', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field></flint-text-field>`);
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
        const el = await fixture<FlintTextField>(html`
      <flint-text-field errorMessage="Required field"></flint-text-field>
    `);

        const wrapper = el.shadowRoot!.querySelector('.input-wrapper')!;
        const errorText = el.shadowRoot!.querySelector('.error-text')!;

        expect(wrapper.classList.contains('error')).toBe(true);
        expect(errorText.textContent).toBe('Required field');
    });

    it('respects disabled state', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field disabled></flint-text-field>`);
        const input = el.shadowRoot!.querySelector('input')!;

        expect(input.disabled).toBe(true);
        expect(el.shadowRoot!.querySelector('.input-wrapper')!.classList.contains('disabled')).toBe(true);
    });

    it('dispatches change event on change', async () => {
        let changed = false;
        const el = await fixture<FlintTextField>(html`
      <flint-text-field @flint-text-field-change=${() => changed = true}></flint-text-field>
    `);

        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('change'));

        expect(changed).toBe(true);
    });

    // ── Mutation-killing additions ─────────────────────────────────────────────

    // isError = this.error || !!this.errorMessage
    it('error=true alone (no errorMessage) adds error class and sets aria-invalid=true', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field error></flint-text-field>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.input-wrapper')!;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(wrapper.classList.contains('error')).toBe(true);
        expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('no error shows aria-invalid=false', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field></flint-text-field>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.getAttribute('aria-invalid')).toBe('false');
    });

    it('error=true alone does not render error-text span (errorMessage is empty)', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field error></flint-text-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.error-text')).toBeNull();
    });

    it('errorMessage takes priority over helperText (shows error-text, not helper)', async () => {
        const el = await fixture<FlintTextField>(html`
            <flint-text-field errorMessage="Err" helperText="Help"></flint-text-field>
        `);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.error-text')?.textContent).toBe('Err');
        // helperText should NOT be shown when errorMessage is set
        const helperSpans = el.shadowRoot!.querySelectorAll('.helper-text');
        const helperOnly = Array.from(helperSpans).filter(s => !s.classList.contains('error-text'));
        expect(helperOnly.length).toBe(0);
    });

    it('helperText shows when there is no error', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field helperText="Hint"></flint-text-field>`);
        await el.updateComplete;
        const helper = el.shadowRoot!.querySelector('.helper-text');
        expect(helper).not.toBeNull();
        expect(helper?.textContent).toBe('Hint');
        expect(helper?.classList.contains('error-text')).toBe(false);
    });

    it('no helperText and no errorMessage renders no helper span', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field></flint-text-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.helper-text')).toBeNull();
    });

    it('no label renders no label element', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field></flint-text-field>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('label')).toBeNull();
    });

    it('input event dispatches with correct detail.value', async () => {
        const spy = vi.fn();
        const el = await fixture<FlintTextField>(html`<flint-text-field @flint-text-field-input=${spy}></flint-text-field>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'hello';
        input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
        expect(spy).toHaveBeenCalled();
        // Find the CustomEvent (has .detail) dispatched by the component
        const customCall = spy.mock.calls.find(c => (c[0] as CustomEvent).detail !== undefined);
        expect(customCall).toBeDefined();
        expect((customCall![0] as CustomEvent).detail.value).toBe('hello');
    });

    it('change event dispatches with correct detail.value', async () => {
        const spy = vi.fn();
        const el = await fixture<FlintTextField>(html`<flint-text-field @flint-text-field-change=${spy}></flint-text-field>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'world';
        input.dispatchEvent(new Event('change', { bubbles: true }));
        expect(spy).toHaveBeenCalledOnce();
        expect((spy.mock.calls[0][0] as CustomEvent).detail.value).toBe('world');
    });

    it('variant=filled adds filled class to container', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field variant="filled"></flint-text-field>`);
        await el.updateComplete;
        const container = el.shadowRoot!.querySelector('.field-container')!;
        expect(container.classList.contains('filled')).toBe(true);
    });

    it('variant=outlined (default) does not add filled class', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field></flint-text-field>`);
        await el.updateComplete;
        const container = el.shadowRoot!.querySelector('.field-container')!;
        expect(container.classList.contains('filled')).toBe(false);
    });

    it('type prop sets input type attribute', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field type="email"></flint-text-field>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.type).toBe('email');
    });

    it('type defaults to text', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field></flint-text-field>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.type).toBe('text');
    });

    it('wrapper has no focused class initially', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field></flint-text-field>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.input-wrapper')!;
        expect(wrapper.classList.contains('focused')).toBe(false);
    });

    it('input event bubbles and is composed', async () => {
        const spy = vi.fn();
        const container = await fixture<HTMLDivElement>(html`
            <div @flint-text-field-input=${spy}><flint-text-field></flint-text-field></div>
        `);
        const el = container.querySelector('flint-text-field')!;
        const input = el.shadowRoot!.querySelector('input')!;
        input.value = 'test';
        input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
        expect(spy).toHaveBeenCalled();
    });

    it('change event bubbles and is composed', async () => {
        const spy = vi.fn();
        const container = await fixture<HTMLDivElement>(html`
            <div @flint-text-field-change=${spy}><flint-text-field></flint-text-field></div>
        `);
        const el = container.querySelector('flint-text-field')!;
        const input = el.shadowRoot!.querySelector('input')!;
        input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        expect(spy).toHaveBeenCalled();
    });

    it('errorMessage without error prop still shows error-text and error class', async () => {
        const el = await fixture<FlintTextField>(html`<flint-text-field errorMessage="Bad input"></flint-text-field>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.input-wrapper')!;
        expect(wrapper.classList.contains('error')).toBe(true);
        expect(el.shadowRoot!.querySelector('.error-text')?.textContent).toBe('Bad input');
    });
});
