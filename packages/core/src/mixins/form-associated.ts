import type { LitElement } from 'lit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

export interface FormAssociatedInterface {
    _internals: ElementInternals | null;
    _firstUpdate: boolean;
    _initFormValue(value: FormDataEntryValue | FormData | null): void;
    _initFormValidity(required: boolean, empty: boolean, message: string): void;
    _syncCustomStates(): void;

    /** The form element this component is associated with, or `null`. */
    readonly form: HTMLFormElement | null;
    /** The `ValidityState` of this element. */
    readonly validity: ValidityState;
    /** The localised validation message, or `""` if valid. */
    readonly validationMessage: string;
    /** Whether this element will be validated when the form is submitted. */
    readonly willValidate: boolean;

    /** Returns `true` if the element satisfies its constraints. */
    checkValidity(): boolean;
    /** Like `checkValidity()` but also shows the browser validation UI. */
    reportValidity(): boolean;
    /** Sets a custom validation message (empty string clears it). */
    setCustomValidity(message: string): void;
    /** Called by the browser when the owning form's `disabled` state changes. */
    formDisabledCallback(disabled: boolean): void;
}

/**
 * Mixin that provides form-association boilerplate for Lit components.
 *
 * Sets `static formAssociated = true`, initialises `ElementInternals`,
 * and exposes `_initFormValue()` / `_initFormValidity()` helpers.
 *
 * The consumer is still responsible for calling these helpers from its
 * own `willUpdate()` / `updated()` lifecycle hooks.
 */
export function FormAssociated<T extends Constructor<LitElement>>(Base: T) {
    class FormElement extends Base {
        static formAssociated = true;

        _internals: ElementInternals | null = null;
        _firstUpdate = true;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);
            if (typeof this.attachInternals === 'function') {
                this._internals = this.attachInternals();
            }
        }

        /** Set the form value reported to the enclosing `<form>`. */
        _initFormValue(value: FormDataEntryValue | FormData | null) {
            if (!this._internals || typeof this._internals.setFormValue !== 'function') return;
            this._internals.setFormValue(value);
        }

        /** Set constraint-validation state. */
        _initFormValidity(required: boolean, empty: boolean, message: string) {
            if (!this._internals || typeof this._internals.setValidity !== 'function') return;
            if (required && empty) {
                this._internals.setValidity({ valueMissing: true }, message);
            } else {
                this._internals.setValidity({});
            }
            this._syncCustomStates();
        }

        /**
         * Synchronise `ElementInternals.states` custom state pseudo-classes.
         *
         * Enables CSS selectors such as:
         * - `flint-input:state(invalid)` / `:state(valid)`
         * - `:state(dirty)` / `:state(touched)`
         * - `:state(disabled)` / `:state(required)`
         */
        _syncCustomStates() {
            const states = this._internals?.states;
            if (!states) return;

            const isValid = this._internals!.validity?.valid !== false;

            // Validity
            if (isValid) {
                states.add('valid');
                states.delete('invalid');
            } else {
                states.add('invalid');
                states.delete('valid');
            }

            // Disabled
            if ((this as unknown as { disabled?: boolean }).disabled) {
                states.add('disabled');
            } else {
                states.delete('disabled');
            }

            // Required
            if ((this as unknown as { required?: boolean }).required) {
                states.add('required');
            } else {
                states.delete('required');
            }
        }

        // ── Standard form element APIs ──────────────────────────────────

        /** The form element this component is associated with, or `null`. */
        get form(): HTMLFormElement | null {
            return this._internals?.form ?? null;
        }

        /** The `ValidityState` of this element. */
        get validity(): ValidityState {
            // Fall back to a "valid" ValidityState when internals are unavailable
            return this._internals?.validity ?? ({
                badInput: false,
                customError: false,
                patternMismatch: false,
                rangeOverflow: false,
                rangeUnderflow: false,
                stepMismatch: false,
                tooLong: false,
                tooShort: false,
                typeMismatch: false,
                valid: true,
                valueMissing: false,
            } as ValidityState);
        }

        /** The localised validation message, or `""` if valid. */
        get validationMessage(): string {
            return this._internals?.validationMessage ?? '';
        }

        /** Whether this element will be validated when the form is submitted. */
        get willValidate(): boolean {
            return this._internals?.willValidate ?? false;
        }

        /** Returns `true` if the element satisfies its constraints. */
        checkValidity(): boolean {
            if (this._internals && typeof this._internals.checkValidity === 'function') {
                return this._internals.checkValidity();
            }
            return true;
        }

        /** Like `checkValidity()` but also shows the browser validation UI. */
        reportValidity(): boolean {
            if (this._internals && typeof this._internals.reportValidity === 'function') {
                return this._internals.reportValidity();
            }
            return true;
        }

        /** Sets a custom validation message (empty string clears it). */
        setCustomValidity(message: string): void {
            if (!this._internals || typeof this._internals.setValidity !== 'function') return;
            if (message) {
                this._internals.setValidity({ customError: true }, message);
            } else {
                this._internals.setValidity({});
            }
        }

        /** Called by the browser when the owning form's `disabled` state changes. */
        formDisabledCallback(disabled: boolean): void {
            (this as unknown as { disabled: boolean }).disabled = disabled;
        }
    }

    return FormElement as Constructor<FormAssociatedInterface> & T;
}
