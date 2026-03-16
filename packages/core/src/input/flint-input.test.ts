import { describe, it, expect, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './flint-input';
import type { FlintInput } from './flint-input';
import { expectAccessible } from '../test-utils/axe';

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

    it('sets aria-describedby when helperText is present', async () => {
        const el = await fixture<FlintInput>(html`<flint-input helper-text="Hint"></flint-input>`);
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
        const el = await fixture<FlintInput>(html`<flint-input helper-text="Helpful tip"></flint-input>`);
        const helpText = el.shadowRoot!.querySelector('.help-text')!;
        expect(helpText.textContent).toBe('Helpful tip');
        expect(helpText.classList.contains('error-text')).toBe(false);
    });

    it('displays error text over help text when both set', async () => {
        const el = await fixture<FlintInput>(html`<flint-input helper-text="Hint" error-message="Error!"></flint-input>`);
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

    it('defaults to size="md"', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        expect(el.size).toBe('md');
        expect(el.getAttribute('size')).toBe('md');
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

    // ─── CSS parts ───────────────────────────────────────────────────────────

    it('exposes CSS parts for external styling', async () => {
        const el = await fixture<FlintInput>(html`<flint-input label="Name" helper-text="Hint"></flint-input>`);
        expect(el.shadowRoot!.querySelector('[part="base"]')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="label"]')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="input"]')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="help-text"]')).not.toBeNull();
    });

    it('exposes error-message CSS part when in error state', async () => {
        const el = await fixture<FlintInput>(html`<flint-input error-message="Bad"></flint-input>`);
        expect(el.shadowRoot!.querySelector('[part="error-message"]')).not.toBeNull();
    });

    // ─── Clearable ─────────────────────────────────────────────────────────

    it('does not show clear button by default', async () => {
        const el = await fixture<FlintInput>(html`<flint-input value="hello"></flint-input>`);
        expect(el.shadowRoot!.querySelector('.clear-btn')).toBeNull();
    });

    it('does not show clear button when clearable but value is empty', async () => {
        const el = await fixture<FlintInput>(html`<flint-input clearable></flint-input>`);
        expect(el.shadowRoot!.querySelector('.clear-btn')).toBeNull();
    });

    it('shows clear button when clearable and has value', async () => {
        const el = await fixture<FlintInput>(html`<flint-input clearable value="hello"></flint-input>`);
        expect(el.shadowRoot!.querySelector('.clear-btn')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="clear-button"]')).not.toBeNull();
    });

    it('does not show clear button when disabled', async () => {
        const el = await fixture<FlintInput>(html`<flint-input clearable value="hello" disabled></flint-input>`);
        expect(el.shadowRoot!.querySelector('.clear-btn')).toBeNull();
    });

    it('does not show clear button when readonly', async () => {
        const el = await fixture<FlintInput>(html`<flint-input clearable value="hello" readonly></flint-input>`);
        expect(el.shadowRoot!.querySelector('.clear-btn')).toBeNull();
    });

    it('clears value when clear button is clicked', async () => {
        const el = await fixture<FlintInput>(html`<flint-input clearable value="hello"></flint-input>`);
        const clearBtn = el.shadowRoot!.querySelector('.clear-btn') as HTMLButtonElement;
        clearBtn.click();
        await el.updateComplete;
        expect(el.value).toBe('');
    });

    it('dispatches flint-input-clear event on clear', async () => {
        const el = await fixture<FlintInput>(html`<flint-input clearable value="hello"></flint-input>`);
        const spy = vi.fn();
        el.addEventListener('flint-input-clear', spy);
        const clearBtn = el.shadowRoot!.querySelector('.clear-btn') as HTMLButtonElement;
        clearBtn.click();
        expect(spy).toHaveBeenCalledOnce();
    });

    it('dispatches flint-input-input and flint-input-change on clear', async () => {
        const el = await fixture<FlintInput>(html`<flint-input clearable value="hello"></flint-input>`);
        const inputSpy = vi.fn();
        const changeSpy = vi.fn();
        el.addEventListener('flint-input-input', inputSpy);
        el.addEventListener('flint-input-change', changeSpy);
        const clearBtn = el.shadowRoot!.querySelector('.clear-btn') as HTMLButtonElement;
        clearBtn.click();
        expect(inputSpy).toHaveBeenCalledOnce();
        expect(inputSpy.mock.calls[0][0].detail).toEqual({ value: '' });
        expect(changeSpy).toHaveBeenCalledOnce();
        expect(changeSpy.mock.calls[0][0].detail).toEqual({ value: '' });
    });

    it('clear button has aria-label', async () => {
        const el = await fixture<FlintInput>(html`<flint-input clearable value="hello"></flint-input>`);
        const clearBtn = el.shadowRoot!.querySelector('.clear-btn') as HTMLButtonElement;
        expect(clearBtn.getAttribute('aria-label')).toBe('Clear input');
    });

    it('hides clear button after clearing', async () => {
        const el = await fixture<FlintInput>(html`<flint-input clearable value="hello"></flint-input>`);
        const clearBtn = el.shadowRoot!.querySelector('.clear-btn') as HTMLButtonElement;
        clearBtn.click();
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('.clear-btn')).toBeNull();
    });

    // ─── Password toggle ─────────────────────────────────────────────────────

    it('does not show password toggle by default on type=password', async () => {
        const el = await fixture<FlintInput>(html`<flint-input type="password"></flint-input>`);
        expect(el.shadowRoot!.querySelector('.password-toggle')).toBeNull();
    });

    it('shows password toggle when password-toggle is set on type=password', async () => {
        const el = await fixture<FlintInput>(html`<flint-input type="password" password-toggle></flint-input>`);
        expect(el.shadowRoot!.querySelector('.password-toggle')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="password-toggle-button"]')).not.toBeNull();
    });

    it('does not show password toggle on non-password type', async () => {
        const el = await fixture<FlintInput>(html`<flint-input type="text" password-toggle></flint-input>`);
        expect(el.shadowRoot!.querySelector('.password-toggle')).toBeNull();
    });

    it('does not show password toggle when disabled', async () => {
        const el = await fixture<FlintInput>(html`<flint-input type="password" password-toggle disabled></flint-input>`);
        expect(el.shadowRoot!.querySelector('.password-toggle')).toBeNull();
    });

    it('toggles password visibility when toggle button is clicked', async () => {
        const el = await fixture<FlintInput>(html`<flint-input type="password" password-toggle></flint-input>`);
        const input = el.shadowRoot!.querySelector('input')!;

        // Initially password type
        expect(input.type).toBe('password');

        // Click toggle
        const toggleBtn = el.shadowRoot!.querySelector('.password-toggle') as HTMLButtonElement;
        toggleBtn.click();
        await el.updateComplete;

        // Now text type
        expect(input.type).toBe('text');
        expect(el.passwordVisible).toBe(true);

        // Click again to hide
        const toggleBtn2 = el.shadowRoot!.querySelector('.password-toggle') as HTMLButtonElement;
        toggleBtn2.click();
        await el.updateComplete;
        expect(input.type).toBe('password');
        expect(el.passwordVisible).toBe(false);
    });

    it('password toggle button has correct aria-label', async () => {
        const el = await fixture<FlintInput>(html`<flint-input type="password" password-toggle></flint-input>`);
        const toggleBtn = el.shadowRoot!.querySelector('.password-toggle') as HTMLButtonElement;
        expect(toggleBtn.getAttribute('aria-label')).toBe('Show password');

        toggleBtn.click();
        await el.updateComplete;

        const toggleBtn2 = el.shadowRoot!.querySelector('.password-toggle') as HTMLButtonElement;
        expect(toggleBtn2.getAttribute('aria-label')).toBe('Hide password');
    });

    it('password-visible attribute controls initial visibility', async () => {
        const el = await fixture<FlintInput>(html`<flint-input type="password" password-toggle password-visible></flint-input>`);
        const input = el.shadowRoot!.querySelector('input')!;
        expect(input.type).toBe('text');
    });

    // ─── Prefix / Suffix slots ───────────────────────────────────────────────

    it('has prefix and suffix slot containers with CSS parts', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        expect(el.shadowRoot!.querySelector('[part="prefix"]')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('[part="suffix"]')).not.toBeNull();
    });

    it('has prefix slot named "prefix"', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        const prefixSlot = el.shadowRoot!.querySelector('slot[name="prefix"]') as HTMLSlotElement;
        expect(prefixSlot).not.toBeNull();
    });

    it('has suffix slot named "suffix"', async () => {
        const el = await fixture<FlintInput>(html`<flint-input></flint-input>`);
        const suffixSlot = el.shadowRoot!.querySelector('slot[name="suffix"]') as HTMLSlotElement;
        expect(suffixSlot).not.toBeNull();
    });

    it('renders slotted prefix content', async () => {
        const el = await fixture<FlintInput>(html`
            <flint-input>
                <span slot="prefix" class="test-prefix">@</span>
            </flint-input>
        `);
        const prefixSlot = el.shadowRoot!.querySelector('slot[name="prefix"]') as HTMLSlotElement;
        const assigned = prefixSlot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent).toBe('@');
    });

    it('renders slotted suffix content', async () => {
        const el = await fixture<FlintInput>(html`
            <flint-input>
                <span slot="suffix" class="test-suffix">.com</span>
            </flint-input>
        `);
        const suffixSlot = el.shadowRoot!.querySelector('slot[name="suffix"]') as HTMLSlotElement;
        const assigned = suffixSlot.assignedElements();
        expect(assigned.length).toBe(1);
        expect(assigned[0].textContent).toBe('.com');
    });

    // ─── Clearable + Password toggle together ────────────────────────────────

    it('shows both clear button and password toggle', async () => {
        const el = await fixture<FlintInput>(html`<flint-input type="password" clearable password-toggle value="secret"></flint-input>`);
        expect(el.shadowRoot!.querySelector('.clear-btn')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.password-toggle')).not.toBeNull();
    });

    // ── Accessibility ─────────────────────────────────────────────────────────

    it('should pass automated a11y checks', async () => {
        const el = await fixture(html`<flint-input label="Username"></flint-input>`);
        await expectAccessible(el);
    }, 15000);

    // ── Constraint validation ─────────────────────────────────────────────────

    describe('constraint validation', () => {
        it('sets patternMismatch when value does not match pattern', async () => {
            const el = await fixture<FlintInput>(html`<flint-input pattern="[a-z]+"></flint-input>`);
            if (!el._internals || typeof el._internals.setValidity !== 'function') return;
            const input = el.shadowRoot!.querySelector('input')!;
            input.value = '123';
            input.dispatchEvent(new Event('input'));
            await el.updateComplete;
            expect(el.validity.patternMismatch).toBe(true);
            expect(el.validationMessage).toBe('Please match the requested format.');
        });

        it('clears patternMismatch when value matches pattern', async () => {
            const el = await fixture<FlintInput>(html`<flint-input pattern="[a-z]+"></flint-input>`);
            if (!el._internals || typeof el._internals.setValidity !== 'function') return;
            const input = el.shadowRoot!.querySelector('input')!;
            input.value = 'abc';
            input.dispatchEvent(new Event('input'));
            await el.updateComplete;
            expect(el.validity.valid).toBe(true);
        });

        it('sets rangeUnderflow when numeric value is below min', async () => {
            const el = await fixture<FlintInput>(html`<flint-input type="number" min="5"></flint-input>`);
            if (!el._internals || typeof el._internals.setValidity !== 'function') return;
            const input = el.shadowRoot!.querySelector('input')!;
            input.value = '2';
            input.dispatchEvent(new Event('input'));
            await el.updateComplete;
            expect(el.validity.rangeUnderflow).toBe(true);
        });

        it('sets rangeOverflow when numeric value exceeds max', async () => {
            const el = await fixture<FlintInput>(html`<flint-input type="number" max="10"></flint-input>`);
            if (!el._internals || typeof el._internals.setValidity !== 'function') return;
            const input = el.shadowRoot!.querySelector('input')!;
            input.value = '15';
            input.dispatchEvent(new Event('input'));
            await el.updateComplete;
            expect(el.validity.rangeOverflow).toBe(true);
        });

        it('sets tooShort when value is shorter than minlength', async () => {
            const el = await fixture<FlintInput>(html`<flint-input minlength="5"></flint-input>`);
            if (!el._internals || typeof el._internals.setValidity !== 'function') return;
            const input = el.shadowRoot!.querySelector('input')!;
            input.value = 'ab';
            input.dispatchEvent(new Event('input'));
            await el.updateComplete;
            expect(el.validity.tooShort).toBe(true);
        });

        it('sets tooLong when value exceeds maxlength', async () => {
            const el = await fixture<FlintInput>(html`<flint-input maxlength="3"></flint-input>`);
            if (!el._internals || typeof el._internals.setValidity !== 'function') return;
            el.value = 'abcdef';
            el['_updateFormValue']();
            expect(el.validity.tooLong).toBe(true);
        });

        it('sets valueMissing when required and empty', async () => {
            const el = await fixture<FlintInput>(html`<flint-input required></flint-input>`);
            if (!el._internals || typeof el._internals.setValidity !== 'function') return;
            el['_updateFormValue']();
            expect(el.validity.valueMissing).toBe(true);
        });

        it('clears validity when required field has value', async () => {
            const el = await fixture<FlintInput>(html`<flint-input required></flint-input>`);
            if (!el._internals || typeof el._internals.setValidity !== 'function') return;
            const input = el.shadowRoot!.querySelector('input')!;
            input.value = 'hello';
            input.dispatchEvent(new Event('input'));
            await el.updateComplete;
            expect(el.validity.valid).toBe(true);
        });

        it('checkValidity returns false when constraints fail', async () => {
            const el = await fixture<FlintInput>(html`<flint-input required></flint-input>`);
            if (!el._internals || typeof el._internals.setValidity !== 'function') return;
            el['_updateFormValue']();
            expect(el.checkValidity()).toBe(false);
        });

        it('checkValidity returns true when constraints pass', async () => {
            const el = await fixture<FlintInput>(html`<flint-input required value="ok"></flint-input>`);
            if (!el._internals || typeof el._internals.setValidity !== 'function') return;
            el['_updateFormValue']();
            expect(el.checkValidity()).toBe(true);
        });
    });
});
