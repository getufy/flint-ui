import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormAssociated } from '../mixins/form-associated.js';
import { FormControlController } from './form-control.js';
import { serialize } from '../utilities/form.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  Test host component                                               */
/* ─────────────────────────────────────────────────────────────────── */

@customElement('test-form-control')
class TestFormControl extends FormAssociated(LitElement) {
    @property() name = '';
    @property() value = '';
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) required = false;

    formControl = new FormControlController(this);

    protected override updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('value')) {
            this.formControl.setValue(this.value || null);
        }
        if (changed.has('required') || changed.has('value')) {
            this.formControl.validateRequired(!this.value, 'Value is required.');
        }
    }

    override render() {
        return html`<slot></slot>`;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  FormControlController tests                                       */
/* ─────────────────────────────────────────────────────────────────── */

describe('FormControlController', () => {
    // ── Dirty / touched tracking ─────────────────────────────────────

    it('defaults dirty and touched to false', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(el.formControl.dirty).toBe(false);
        expect(el.formControl.touched).toBe(false);
    });

    it('marks touched on blur', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        el.dispatchEvent(new Event('blur'));
        expect(el.formControl.touched).toBe(true);
    });

    it('marks touched on focusout', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        el.dispatchEvent(new Event('focusout', { bubbles: true }));
        expect(el.formControl.touched).toBe(true);
    });

    it('marks dirty on input event', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        expect(el.formControl.dirty).toBe(true);
    });

    it('supports custom interaction events via assumeInteractionOn', async () => {
        @customElement('test-form-control-custom-events')
        class TestFormControlCustom extends FormAssociated(LitElement) {
            @property() name = '';
            @property() value = '';
            @property({ type: Boolean }) disabled = false;
            @property({ type: Boolean }) required = false;
            formControl = new FormControlController(this, {
                assumeInteractionOn: ['change'],
            });
            override render() { return html``; }
        }

        const el = await fixture<TestFormControlCustom>(
            html`<test-form-control-custom-events></test-form-control-custom-events>`
        );

        // blur should NOT mark touched (since we override to 'change')
        el.dispatchEvent(new Event('blur'));
        expect(el.formControl.touched).toBe(false);

        // change should mark touched
        el.dispatchEvent(new Event('change'));
        expect(el.formControl.touched).toBe(true);
    });

    // ── setValue ──────────────────────────────────────────────────────

    it('setValue calls setFormValue on internals', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);

        if (el._internals && typeof el._internals.setFormValue === 'function') {
            const spy = vi.spyOn(el._internals, 'setFormValue');
            el.formControl.setValue('hello');
            expect(spy).toHaveBeenCalledWith('hello');
        }
    });

    it('setValue handles null', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);

        if (el._internals && typeof el._internals.setFormValue === 'function') {
            const spy = vi.spyOn(el._internals, 'setFormValue');
            el.formControl.setValue(null);
            expect(spy).toHaveBeenCalledWith(null);
        }
    });

    // ── setValidity / validateRequired / setValid ────────────────────

    it('setValidity sets validity flags on internals', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);

        if (el._internals && typeof el._internals.setValidity === 'function') {
            const spy = vi.spyOn(el._internals, 'setValidity');
            el.formControl.setValidity({ valueMissing: true }, 'Required');
            expect(spy).toHaveBeenCalledWith({ valueMissing: true }, 'Required', undefined);
        }
    });

    it('setValid clears all validity flags', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);

        if (el._internals && typeof el._internals.setValidity === 'function') {
            const spy = vi.spyOn(el._internals, 'setValidity');
            el.formControl.setValid();
            expect(spy).toHaveBeenCalledWith({});
        }
    });

    it('validateRequired sets valueMissing when required and empty', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control required></test-form-control>`);

        if (el._internals && typeof el._internals.setValidity === 'function') {
            const spy = vi.spyOn(el._internals, 'setValidity');
            el.formControl.validateRequired(true, 'Field is required');
            expect(spy).toHaveBeenCalledWith({ valueMissing: true }, 'Field is required', undefined);
        }
    });

    it('validateRequired sets valid when not required', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);

        if (el._internals && typeof el._internals.setValidity === 'function') {
            const spy = vi.spyOn(el._internals, 'setValidity');
            el.formControl.validateRequired(true);
            expect(spy).toHaveBeenCalledWith({});
        }
    });

    it('validateRequired sets valid when required but not empty', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control required></test-form-control>`);

        if (el._internals && typeof el._internals.setValidity === 'function') {
            const spy = vi.spyOn(el._internals, 'setValidity');
            el.formControl.validateRequired(false);
            expect(spy).toHaveBeenCalledWith({});
        }
    });

    // ── Data attributes ──────────────────────────────────────────────

    it('sets data-pristine and data-untouched by default', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(el.dataset.pristine).toBe('');
        expect(el.dataset.untouched).toBe('');
        expect(el.dataset.dirty).toBeUndefined();
        expect(el.dataset.touched).toBeUndefined();
    });

    it('sets data-valid by default (no required, no validity flags)', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(el.dataset.valid).toBe('');
        expect(el.dataset.invalid).toBeUndefined();
    });

    it('sets data-optional by default', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(el.dataset.optional).toBe('');
        expect(el.dataset.required).toBeUndefined();
    });

    it('sets data-required when required', async () => {
        const el = await fixture<TestFormControl>(
            html`<test-form-control required></test-form-control>`
        );
        expect(el.dataset.required).toBe('');
        expect(el.dataset.optional).toBeUndefined();
    });

    it('sets data-dirty after input event', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        expect(el.dataset.dirty).toBe('');
        expect(el.dataset.pristine).toBeUndefined();
    });

    it('sets data-touched after blur', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        el.dispatchEvent(new Event('blur'));
        expect(el.dataset.touched).toBe('');
        expect(el.dataset.untouched).toBeUndefined();
    });

    it('does not set data-user-invalid before interaction', async () => {
        const el = await fixture<TestFormControl>(
            html`<test-form-control required></test-form-control>`
        );
        // In environments with ElementInternals, required + empty → invalid
        if (el._internals && typeof el._internals.setValidity === 'function') {
            expect(el.dataset.invalid).toBe('');
        }
        // user-invalid is never set before interaction regardless
        expect(el.dataset.userInvalid).toBeUndefined();
    });

    it('sets data-user-invalid after interaction when invalid', async () => {
        const el = await fixture<TestFormControl>(
            html`<test-form-control required></test-form-control>`
        );
        // Only testable when ElementInternals is supported
        if (!el._internals || typeof el._internals.setValidity !== 'function') return;
        el.dispatchEvent(new Event('blur'));
        // Now touched + invalid → data-user-invalid
        expect(el.dataset.userInvalid).toBe('');
        expect(el.dataset.userValid).toBeUndefined();
    });

    it('sets data-user-valid after interaction when valid', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        el.dispatchEvent(new Event('blur'));
        expect(el.dataset.userValid).toBe('');
        expect(el.dataset.userInvalid).toBeUndefined();
    });

    it('sets data-disabled when disabled', async () => {
        const el = await fixture<TestFormControl>(
            html`<test-form-control disabled></test-form-control>`
        );
        expect(el.dataset.disabled).toBe('');
    });

    it('does not set data-disabled when enabled', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(el.dataset.disabled).toBeUndefined();
    });

    // ── reset() ──────────────────────────────────────────────────────

    it('reset clears dirty and touched', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('blur'));
        expect(el.formControl.dirty).toBe(true);
        expect(el.formControl.touched).toBe(true);

        el.formControl.reset();
        expect(el.formControl.dirty).toBe(false);
        expect(el.formControl.touched).toBe(false);
        expect(el.dataset.pristine).toBe('');
        expect(el.dataset.untouched).toBe('');
    });

    // ── reportValidity ───────────────────────────────────────────────

    it('reportValidity returns true when valid', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(el.formControl.reportValidity()).toBe(true);
    });

    // ── Cleanup on disconnect ────────────────────────────────────────

    it('removes event listeners on disconnect', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        const removeSpy = vi.spyOn(el, 'removeEventListener');
        el.remove();
        // Should have removed blur, focusout, and input listeners
        const removedEvents = removeSpy.mock.calls.map(c => c[0]);
        expect(removedEvents).toContain('blur');
        expect(removedEvents).toContain('focusout');
        expect(removedEvents).toContain('input');
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  FormAssociated mixin — standard form element APIs                  */
/* ─────────────────────────────────────────────────────────────────── */

describe('FormAssociated mixin — standard form element APIs', () => {
    it('form getter returns null when not in a form', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(el.form).toBeNull();
    });

    it('validity getter returns a ValidityState', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(el.validity).toBeDefined();
        expect(el.validity.valid).toBe(true);
    });

    it('validity reflects invalid state when required and empty', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control required></test-form-control>`);
        await el.updateComplete;
        if (el._internals && typeof el._internals.setValidity === 'function') {
            expect(el.validity.valid).toBe(false);
            expect(el.validity.valueMissing).toBe(true);
        }
    });

    it('validationMessage returns empty string when valid', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(el.validationMessage).toBe('');
    });

    it('validationMessage returns message when invalid', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control required></test-form-control>`);
        await el.updateComplete;
        if (el._internals && typeof el._internals.setValidity === 'function') {
            expect(el.validationMessage).toBe('Value is required.');
        }
    });

    it('willValidate returns a boolean', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(typeof el.willValidate).toBe('boolean');
    });

    it('checkValidity returns true when valid', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(el.checkValidity()).toBe(true);
    });

    it('checkValidity returns false when invalid', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control required></test-form-control>`);
        await el.updateComplete;
        if (el._internals && typeof el._internals.setValidity === 'function' && typeof el._internals.checkValidity === 'function') {
            expect(el.checkValidity()).toBe(false);
        }
    });

    it('reportValidity returns true when valid', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        if (el._internals && typeof el._internals.reportValidity === 'function') {
            expect(el.reportValidity()).toBe(true);
        }
    });

    it('setCustomValidity sets a custom error', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        if (el._internals && typeof el._internals.setValidity === 'function') {
            el.setCustomValidity('Custom error');
            expect(el.validity.customError).toBe(true);
            expect(el.validationMessage).toBe('Custom error');
        }
    });

    it('setCustomValidity with empty string clears error', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        if (el._internals && typeof el._internals.setValidity === 'function') {
            el.setCustomValidity('Custom error');
            expect(el.validity.customError).toBe(true);
            el.setCustomValidity('');
            expect(el.validity.valid).toBe(true);
        }
    });

    it('formDisabledCallback sets disabled', async () => {
        const el = await fixture<TestFormControl>(html`<test-form-control></test-form-control>`);
        expect(el.disabled).toBe(false);
        el.formDisabledCallback(true);
        expect(el.disabled).toBe(true);
        el.formDisabledCallback(false);
        expect(el.disabled).toBe(false);
    });
});

/* ─────────────────────────────────────────────────────────────────── */
/*  serialize() utility tests                                         */
/* ─────────────────────────────────────────────────────────────────── */

describe('serialize', () => {
    it('returns an empty object for an empty form', () => {
        const form = document.createElement('form');
        expect(serialize(form)).toEqual({});
    });

    it('serializes a single text input', () => {
        const form = document.createElement('form');
        const input = document.createElement('input');
        input.name = 'username';
        input.value = 'alice';
        form.appendChild(input);
        expect(serialize(form)).toEqual({ username: 'alice' });
    });

    it('serializes multiple inputs with different names', () => {
        const form = document.createElement('form');
        const a = document.createElement('input');
        a.name = 'first';
        a.value = 'Alice';
        const b = document.createElement('input');
        b.name = 'last';
        b.value = 'Smith';
        form.appendChild(a);
        form.appendChild(b);
        expect(serialize(form)).toEqual({ first: 'Alice', last: 'Smith' });
    });

    it('groups multiple values with the same name into an array', () => {
        const form = document.createElement('form');
        for (const val of ['red', 'blue', 'green']) {
            const input = document.createElement('input');
            input.name = 'colors';
            input.value = val;
            form.appendChild(input);
        }
        expect(serialize(form)).toEqual({ colors: ['red', 'blue', 'green'] });
    });

    it('handles a mix of single and multi-value fields', () => {
        const form = document.createElement('form');
        const name = document.createElement('input');
        name.name = 'name';
        name.value = 'Alice';
        form.appendChild(name);

        for (const val of ['a', 'b']) {
            const input = document.createElement('input');
            input.name = 'tags';
            input.value = val;
            form.appendChild(input);
        }

        const result = serialize(form);
        expect(result.name).toBe('Alice');
        expect(result.tags).toEqual(['a', 'b']);
    });
});
