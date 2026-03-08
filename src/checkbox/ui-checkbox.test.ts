import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ui-checkbox';
import type { UiCheckbox } from './ui-checkbox';

describe('ui-checkbox', () => {
    it('renders correctly with label', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox label="Test Label"></ui-checkbox>`);
        expect(el.shadowRoot!.textContent).toContain('Test Label');
        const input = el.shadowRoot!.querySelector('input');
        expect(input).not.toBeNull();
        expect(input?.type).toBe('checkbox');
    });

    it('can be checked', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox></ui-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;

        input.click();
        await el.updateComplete;

        expect(el.checked).toBe(true);
    });

    it('reflects checked property', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox checked></ui-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.checked).toBe(true);
    });

    it('reflects checked attribute', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox checked></ui-checkbox>`);
        expect(el.hasAttribute('checked')).toBe(true);
    });

    it('handles indeterminate state', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox indeterminate></ui-checkbox>`);
        const checkboxDiv = el.shadowRoot!.querySelector('.checkbox')!;
        expect(checkboxDiv.classList.contains('indeterminate')).toBe(true);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.indeterminate).toBe(true);
    });

    it('is disabled when the disabled property is set', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox disabled></ui-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.disabled).toBe(true);

        // Clicking should not change state
        el.click();
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });

    it('dispatches change event', async () => {
        let eventTriggered = false;
        const el = await fixture<UiCheckbox>(html`
            <ui-checkbox @change=${() => eventTriggered = true}></ui-checkbox>
        `);

        const input = el.shadowRoot!.querySelector('input')!;
        input.click();

        expect(eventTriggered).toBe(true);
    });

    // ── Mutation-killing additions ─────────────────────────────────────────────

    it('change event detail has correct checked=true value', async () => {
        const spy = vi.fn();
        const el = await fixture<UiCheckbox>(html`<ui-checkbox value="my-val" @change=${spy}></ui-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.click();
        expect(spy).toHaveBeenCalledOnce();
        const detail = (spy.mock.calls[0][0] as CustomEvent).detail;
        expect(detail.checked).toBe(true);
        expect(detail.value).toBe('my-val');
        expect(detail.indeterminate).toBe(false);
    });

    it('change event detail has correct checked=false after unchecking', async () => {
        const spy = vi.fn();
        const el = await fixture<UiCheckbox>(html`<ui-checkbox checked value="x" @change=${spy}></ui-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.click();
        await el.updateComplete;
        const detail = (spy.mock.calls[0][0] as CustomEvent).detail;
        expect(detail.checked).toBe(false);
        expect(detail.value).toBe('x');
        expect(detail.indeterminate).toBe(false);
    });

    it('indeterminate is reset to false after change', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox indeterminate></ui-checkbox>`);
        expect(el.indeterminate).toBe(true);
        const input = el.shadowRoot!.querySelector('input')!;
        input.click();
        await el.updateComplete;
        expect(el.indeterminate).toBe(false);
    });

    it('change event detail.indeterminate is always false after change', async () => {
        const spy = vi.fn();
        const el = await fixture<UiCheckbox>(html`<ui-checkbox indeterminate @change=${spy}></ui-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.click();
        const detail = (spy.mock.calls[0][0] as CustomEvent).detail;
        expect(detail.indeterminate).toBe(false);
    });

    it('disabled prevents change event when input dispatches change directly', async () => {
        const spy = vi.fn();
        const el = await fixture<UiCheckbox>(html`<ui-checkbox disabled @change=${spy}></ui-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        // Simulate native change event on the (disabled) input
        input.dispatchEvent(new Event('change', { bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
        expect(el.checked).toBe(false);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox disabled></ui-checkbox>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('renders label span when label prop is set', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox label="Agree"></ui-checkbox>`);
        await el.updateComplete;
        const span = el.shadowRoot!.querySelector('span.label');
        expect(span).not.toBeNull();
        expect(span?.textContent?.trim()).toBe('Agree');
    });

    it('renders slot instead of label span when label is empty', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox></ui-checkbox>`);
        await el.updateComplete;
        // no label prop → falls back to <slot>
        expect(el.shadowRoot!.querySelector('span.label')).toBeNull();
        expect(el.shadowRoot!.querySelector('slot.label')).not.toBeNull();
    });

    it('name attribute present when name is set', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox name="agree"></ui-checkbox>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.name).toBe('agree');
    });

    it('name attribute absent when name is empty string', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox></ui-checkbox>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.getAttribute('name')).toBeNull();
    });

    it('required attribute is forwarded to input', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox required></ui-checkbox>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.required).toBe(true);
    });

    it('unchecked checkbox div does not have checked class', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox></ui-checkbox>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.checkbox')!;
        expect(div.classList.contains('checked')).toBe(false);
    });

    it('checked checkbox div has checked class', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox checked></ui-checkbox>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.checkbox')!;
        expect(div.classList.contains('checked')).toBe(true);
    });

    it('disabled wrapper has disabled class', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox disabled></ui-checkbox>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.wrapper')!;
        expect(wrapper.classList.contains('disabled')).toBe(true);
    });

    it('non-disabled wrapper does not have disabled class', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox></ui-checkbox>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.wrapper')!;
        expect(wrapper.classList.contains('disabled')).toBe(false);
    });

    it('indeterminate renders line SVG element', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox indeterminate></ui-checkbox>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('line')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('polyline')).toBeNull();
    });

    it('non-indeterminate renders polyline SVG element', async () => {
        const el = await fixture<UiCheckbox>(html`<ui-checkbox></ui-checkbox>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('polyline')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('line')).toBeNull();
    });

    it('change event bubbles and is composed', async () => {
        const spy = vi.fn();
        const container = await fixture<HTMLDivElement>(html`
            <div @change=${spy}><ui-checkbox></ui-checkbox></div>
        `);
        const el = container.querySelector('ui-checkbox')!;
        const input = el.shadowRoot!.querySelector('input')!;
        input.click();
        expect(spy).toHaveBeenCalledOnce();
    });
});
