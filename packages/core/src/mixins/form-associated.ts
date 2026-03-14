import type { LitElement } from 'lit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

export interface FormAssociatedInterface {
    _internals: ElementInternals | null;
    _firstUpdate: boolean;
    _initFormValue(value: FormDataEntryValue | FormData | null): void;
    _initFormValidity(required: boolean, empty: boolean, message: string): void;
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
        }
    }

    return FormElement as Constructor<FormAssociatedInterface> & T;
}
