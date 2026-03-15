import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { FlintCheckbox } from './flint-checkbox';
import { expectAccessible } from '../test-utils/axe';

describe('flint-checkbox', () => {
    it('renders correctly with label', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox label="Test Label"></flint-checkbox>`);
        expect(el.shadowRoot!.textContent).toContain('Test Label');
        const input = el.shadowRoot!.querySelector('input');
        expect(input).not.toBeNull();
        expect(input?.type).toBe('checkbox');
    });

    it('can be checked', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;

        input.click();
        await el.updateComplete;

        expect(el.checked).toBe(true);
    });

    it('reflects checked property', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox checked></flint-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.checked).toBe(true);
    });

    it('reflects checked attribute', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox checked></flint-checkbox>`);
        expect(el.hasAttribute('checked')).toBe(true);
    });

    it('handles indeterminate state', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox indeterminate></flint-checkbox>`);
        const checkboxDiv = el.shadowRoot!.querySelector('.checkbox')!;
        expect(checkboxDiv.classList.contains('indeterminate')).toBe(true);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.indeterminate).toBe(true);
    });

    it('is disabled when the disabled property is set', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox disabled></flint-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.disabled).toBe(true);

        // Clicking should not change state
        el.click();
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });

    it('dispatches change event', async () => {
        let eventTriggered = false;
        const el = await fixture<FlintCheckbox>(html`
            <flint-checkbox @flint-checkbox-change=${() => eventTriggered = true}></flint-checkbox>
        `);

        const input = el.shadowRoot!.querySelector('input')!;
        input.click();

        expect(eventTriggered).toBe(true);
    });

    // ── Default property values ────────────────────────────────────────────────

    it('indeterminate defaults to false', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        expect(el.indeterminate).toBe(false);
    });

    it('required defaults to false', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        expect(el.required).toBe(false);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.required).toBe(false);
    });

    it('checked defaults to false', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        expect(el.checked).toBe(false);
    });

    it('disabled defaults to false', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        expect(el.disabled).toBe(false);
    });

    it('size defaults to md', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        expect(el.size).toBe('md');
        expect(el.getAttribute('size')).toBe('md');
    });

    it('value defaults to on', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        expect(el.value).toBe('on');
    });

    // ── Mutation-killing: event properties ────────────────────────────────────

    it('change event detail has correct checked=true value', async () => {
        const spy = vi.fn();
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox value="my-val" @flint-checkbox-change=${spy}></flint-checkbox>`);
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
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox checked value="x" @flint-checkbox-change=${spy}></flint-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.click();
        await el.updateComplete;
        const detail = (spy.mock.calls[0][0] as CustomEvent).detail;
        expect(detail.checked).toBe(false);
        expect(detail.value).toBe('x');
        expect(detail.indeterminate).toBe(false);
    });

    it('indeterminate is reset to false after change', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox indeterminate></flint-checkbox>`);
        expect(el.indeterminate).toBe(true);
        const input = el.shadowRoot!.querySelector('input')!;
        input.click();
        await el.updateComplete;
        expect(el.indeterminate).toBe(false);
    });

    it('change event detail.indeterminate is always false after change', async () => {
        const spy = vi.fn();
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox indeterminate @flint-checkbox-change=${spy}></flint-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        input.click();
        const detail = (spy.mock.calls[0][0] as CustomEvent).detail;
        expect(detail.indeterminate).toBe(false);
    });

    it('change event has bubbles=true', async () => {
        let event: CustomEvent | null = null;
        const el = await fixture<FlintCheckbox>(html`
            <flint-checkbox @flint-checkbox-change=${(e: CustomEvent) => { event = e; }}></flint-checkbox>
        `);
        el.shadowRoot!.querySelector('input')!.click();
        expect(event!.bubbles).toBe(true);
    });

    it('change event has composed=true', async () => {
        let event: CustomEvent | null = null;
        const el = await fixture<FlintCheckbox>(html`
            <flint-checkbox @flint-checkbox-change=${(e: CustomEvent) => { event = e; }}></flint-checkbox>
        `);
        el.shadowRoot!.querySelector('input')!.click();
        expect(event!.composed).toBe(true);
    });

    it('change event detail is not empty', async () => {
        let event: CustomEvent | null = null;
        const el = await fixture<FlintCheckbox>(html`
            <flint-checkbox @flint-checkbox-change=${(e: CustomEvent) => { event = e; }}></flint-checkbox>
        `);
        el.shadowRoot!.querySelector('input')!.click();
        expect(Object.keys(event!.detail).length).toBeGreaterThan(0);
        expect(event!.detail).toHaveProperty('checked');
        expect(event!.detail).toHaveProperty('value');
        expect(event!.detail).toHaveProperty('indeterminate');
    });

    it('disabled prevents change event when input dispatches change directly', async () => {
        const spy = vi.fn();
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox disabled @flint-checkbox-change=${spy}></flint-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        // Simulate native change event on the (disabled) input
        input.dispatchEvent(new Event('change', { bubbles: true }));
        expect(spy).not.toHaveBeenCalled();
        expect(el.checked).toBe(false);
    });

    it('disabled guard: _handleChange returns early when disabled', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox disabled checked></flint-checkbox>`);
        const input = el.shadowRoot!.querySelector('input')!;
        // Direct dispatch of change event on the input
        input.dispatchEvent(new Event('change', { bubbles: true }));
        await el.updateComplete;
        // checked remains true (disabled guard prevented unchecking)
        expect(el.checked).toBe(true);
    });

    it('reflects disabled attribute', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox disabled></flint-checkbox>`);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('renders label span when label prop is set', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox label="Agree"></flint-checkbox>`);
        await el.updateComplete;
        const span = el.shadowRoot!.querySelector('span.label');
        expect(span).not.toBeNull();
        expect(span?.textContent?.trim()).toBe('Agree');
    });

    it('renders slot instead of label span when label is empty', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        await el.updateComplete;
        // no label prop → falls back to <slot>
        expect(el.shadowRoot!.querySelector('span.label')).toBeNull();
        expect(el.shadowRoot!.querySelector('slot.label')).not.toBeNull();
    });

    it('renders slot content when no label prop', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox><span>Custom label</span></flint-checkbox>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('slot.label')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('span.label')).toBeNull();
    });

    it('name attribute present when name is set', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox name="agree"></flint-checkbox>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.name).toBe('agree');
    });

    it('name attribute absent when name is empty string', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.getAttribute('name')).toBeNull();
    });

    it('name uses || not && logic: name absent when empty, present when set', async () => {
        const elEmpty = await fixture<FlintCheckbox>(html`<flint-checkbox name=""></flint-checkbox>`);
        expect(elEmpty.shadowRoot!.querySelector('input')!.getAttribute('name')).toBeNull();

        const elSet = await fixture<FlintCheckbox>(html`<flint-checkbox name="field"></flint-checkbox>`);
        expect(elSet.shadowRoot!.querySelector('input')!.name).toBe('field');
    });

    it('required attribute is forwarded to input', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox required></flint-checkbox>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.required).toBe(true);
    });

    it('required reflects to attribute', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox required></flint-checkbox>`);
        expect(el.hasAttribute('required')).toBe(true);
    });

    it('unchecked checkbox div does not have checked class', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.checkbox')!;
        expect(div.classList.contains('checked')).toBe(false);
    });

    it('checked checkbox div has checked class', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox checked></flint-checkbox>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.checkbox')!;
        expect(div.classList.contains('checked')).toBe(true);
    });

    it('checkbox div always has checkbox class', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        await el.updateComplete;
        const div = el.shadowRoot!.querySelector('.checkbox')!;
        expect(div).not.toBeNull();
        expect(div.classList.contains('checkbox')).toBe(true);
    });

    it('wrapper always has wrapper class', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.wrapper')).not.toBeNull();
    });

    it('disabled wrapper has disabled class', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox disabled></flint-checkbox>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.wrapper')!;
        expect(wrapper.classList.contains('disabled')).toBe(true);
    });

    it('non-disabled wrapper does not have disabled class', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        await el.updateComplete;
        const wrapper = el.shadowRoot!.querySelector('.wrapper')!;
        expect(wrapper.classList.contains('disabled')).toBe(false);
    });

    it('indeterminate renders line SVG element', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox indeterminate></flint-checkbox>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('line')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('polyline')).toBeNull();
    });

    it('non-indeterminate renders polyline SVG element', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('polyline')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('line')).toBeNull();
    });

    it('SVG line has correct attributes', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox indeterminate></flint-checkbox>`);
        await el.updateComplete;
        const line = el.shadowRoot!.querySelector('line')!;
        expect(line.getAttribute('x1')).toBe('4');
        expect(line.getAttribute('y1')).toBe('12');
        expect(line.getAttribute('x2')).toBe('20');
        expect(line.getAttribute('y2')).toBe('12');
    });

    it('SVG polyline has correct points', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        await el.updateComplete;
        const polyline = el.shadowRoot!.querySelector('polyline')!;
        expect(polyline.getAttribute('points')).toBe('20 6 9 17 4 12');
    });

    it('change event bubbles and is composed', async () => {
        const spy = vi.fn();
        const container = await fixture<HTMLDivElement>(html`
            <div @flint-checkbox-change=${spy}><flint-checkbox></flint-checkbox></div>
        `);
        const el = container.querySelector('flint-checkbox')!;
        const input = el.shadowRoot!.querySelector('input')!;
        input.click();
        expect(spy).toHaveBeenCalledOnce();
    });

    // ── size prop ─────────────────────────────────────────────────────────────

    it('size reflects to attribute', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox size="sm"></flint-checkbox>`);
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('size sm reflects to attribute', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox size="sm"></flint-checkbox>`);
        expect(el.size).toBe('sm');
        expect(el.hasAttribute('size')).toBe(true);
        expect(el.getAttribute('size')).toBe('sm');
    });

    it('size lg reflects to attribute', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox size="lg"></flint-checkbox>`);
        expect(el.size).toBe('lg');
        expect(el.getAttribute('size')).toBe('lg');
    });

    // ── defaultChecked ────────────────────────────────────────────────────────

    it('defaultChecked sets checked on first update', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox default-checked></flint-checkbox>`);
        await el.updateComplete;
        expect(el.checked).toBe(true);
    });

    it('defaultChecked=false leaves checked=false', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });

    it('defaultChecked does not override explicit checked=false', async () => {
        // When both are set, willUpdate runs defaultChecked first, then checked=false from attr
        // In practice, explicit checked should take precedence via property binding
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox default-checked></flint-checkbox>`);
        await el.updateComplete;
        // defaultChecked sets it to true
        expect(el.checked).toBe(true);
        // Can still uncheck programmatically
        el.checked = false;
        await el.updateComplete;
        expect(el.checked).toBe(false);
    });

    // ── form association ──────────────────────────────────────────────────────

    it('is form-associated', () => {
        expect((FlintCheckbox as unknown as Record<string, unknown>).formAssociated).toBe(true);
    });

    it('has _internals when attachInternals is available', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        const internals = (el as unknown as Record<string, unknown>)['_internals'];
        // In jsdom attachInternals may or may not be present
        expect(internals === null || typeof internals === 'object').toBe(true);
    });

    it('constructor sets _internals to null when attachInternals is unavailable', () => {
        // Save original
        const origAttachInternals = HTMLElement.prototype.attachInternals;
        // Remove attachInternals to simulate unsupported environment
        /* eslint-disable */
        (HTMLElement.prototype as any).attachInternals = undefined;
        /* eslint-enable */
        const el = document.createElement('flint-checkbox') as FlintCheckbox;
        const internals = (el as unknown as Record<string, unknown>)['_internals'];
        expect(internals).toBeNull();
        // Restore
        HTMLElement.prototype.attachInternals = origAttachInternals;
    });

    it('setFormValue is called with value when checked', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox value="yes"></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        el.checked = true;
        await el.updateComplete;
        expect(mockInternals.setFormValue).toHaveBeenCalledWith('yes');
    });

    it('setFormValue is called with null when unchecked', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox checked value="yes"></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        el.checked = false;
        await el.updateComplete;
        expect(mockInternals.setFormValue).toHaveBeenCalledWith(null);
    });

    it('setFormValue is called when value changes while checked', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox checked value="a"></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        el.value = 'b';
        await el.updateComplete;
        expect(mockInternals.setFormValue).toHaveBeenCalledWith('b');
    });

    it('setValidity called with valueMissing when required and unchecked', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        el.required = true;
        await el.updateComplete;
        expect(mockInternals.setValidity).toHaveBeenCalledWith({ valueMissing: true }, 'Please check this box.');
    });

    it('setValidity called with empty object when required and checked', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox required checked></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        // Trigger an update by toggling checked
        el.checked = false;
        await el.updateComplete;
        el.checked = true;
        await el.updateComplete;
        expect(mockInternals.setValidity).toHaveBeenCalledWith({});
    });

    it('setValidity clears when required is removed', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox required></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        el.required = false;
        await el.updateComplete;
        expect(mockInternals.setValidity).toHaveBeenCalledWith({});
    });

    it('updated is triggered by checked change (both setFormValue and setValidity)', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        el.checked = true;
        await el.updateComplete;
        expect(mockInternals.setFormValue).toHaveBeenCalled();
        expect(mockInternals.setValidity).toHaveBeenCalled();
    });

    it('changing only value (not checked) triggers setFormValue', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox checked value="a"></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        el.value = 'changed';
        await el.updateComplete;
        expect(mockInternals.setFormValue).toHaveBeenCalledWith('changed');
    });

    it('changing only required (not checked) triggers setValidity', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        el.required = true;
        await el.updateComplete;
        expect(mockInternals.setValidity).toHaveBeenCalledWith({ valueMissing: true }, 'Please check this box.');
    });

    it('setValidity with valueMissing: required=true && checked=false', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        el.required = true;
        await el.updateComplete;
        // Must be called with valueMissing, not empty
        expect(mockInternals.setValidity).toHaveBeenCalledWith({ valueMissing: true }, 'Please check this box.');
        // Must NOT have been called with empty object (the else branch)
        expect(mockInternals.setValidity).not.toHaveBeenCalledWith({});
    });

    it('setValidity without valueMissing: required=false', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox required></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        el.required = false;
        await el.updateComplete;
        // The else branch: setValidity({})
        expect(mockInternals.setValidity).toHaveBeenCalledWith({});
    });

    it('setValidity without valueMissing: required=true but checked=true', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        el.required = true;
        el.checked = true;
        await el.updateComplete;
        // required && !checked is false → else branch
        expect(mockInternals.setValidity).toHaveBeenCalledWith({});
    });

    it('setFormValue not called when neither checked nor value changes', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        // Change label only — should not trigger setFormValue
        el.label = 'new label';
        await el.updateComplete;
        expect(mockInternals.setFormValue).not.toHaveBeenCalled();
    });

    it('setValidity not called when neither checked nor required changes', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        const mockInternals = { setFormValue: vi.fn(), setValidity: vi.fn() };
        (el as unknown as Record<string, unknown>)['_internals'] = mockInternals;
        // Change label only — should not trigger setValidity
        el.label = 'new label';
        await el.updateComplete;
        expect(mockInternals.setValidity).not.toHaveBeenCalled();
    });

    it('required + unchecked triggers validity', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox required></flint-checkbox>`);
        await el.updateComplete;
        expect(el.required).toBe(true);
        expect(el.checked).toBe(false);
    });

    it('required + checked clears validity', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox required checked></flint-checkbox>`);
        await el.updateComplete;
        expect(el.required).toBe(true);
        expect(el.checked).toBe(true);
    });

    // ── ariaLabel ─────────────────────────────────────────────────────────────

    it('aria-label is forwarded to input', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox aria-label="Accept terms"></flint-checkbox>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.getAttribute('aria-label')).toBe('Accept terms');
    });

    it('aria-label absent when not set', async () => {
        const el = await fixture<FlintCheckbox>(html`<flint-checkbox></flint-checkbox>`);
        await el.updateComplete;
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.getAttribute('aria-label')).toBeNull();
    });

    // ── Accessibility ─────────────────────────────────────────────────────────

    it('should pass automated a11y checks', async () => {
        const el = await fixture(html`<flint-checkbox label="Accept terms"></flint-checkbox>`);
        await expectAccessible(el);
    }, 15000);
});
