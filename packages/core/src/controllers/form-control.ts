import type { ReactiveController, ReactiveControllerHost } from 'lit';

export type ValidationLevel = 'error' | 'warning' | 'info';

export interface FormControlHost extends ReactiveControllerHost, HTMLElement {
    name: string;
    value: unknown;
    disabled: boolean;
    required: boolean;
    _internals: ElementInternals | null;
}

export interface FormControlOptions {
    /** Events that mark the control as "interacted with" (touched). Defaults to `['blur', 'focusout']`. */
    assumeInteractionOn?: string[];
}

/**
 * A Lit ReactiveController that standardises form behaviour across all
 * form-associated Flint components.
 *
 * Tracks dirty/touched interaction state, proxies `ElementInternals`
 * calls, and maintains `data-*` attributes on the host for CSS styling.
 *
 * Use alongside the `FormAssociated` mixin — the mixin provides
 * `static formAssociated`, `attachInternals()`, and `_internals`;
 * this controller sits on top.
 */
export class FormControlController implements ReactiveController {
    host: FormControlHost;

    private _dirty = false;
    private _touched = false;
    private _validationLevel: ValidationLevel = 'error';
    private _validationMessage = '';
    private readonly _interactionEvents: string[];
    private readonly _handleInteraction = () => { this._markTouched(); };
    private readonly _handleValueChange = () => { this._markDirty(); };

    constructor(host: FormControlHost, options?: FormControlOptions) {
        this.host = host;
        this._interactionEvents = options?.assumeInteractionOn ?? ['blur', 'focusout'];
        host.addController(this);
    }

    hostConnected(): void {
        for (const event of this._interactionEvents) {
            this.host.addEventListener(event, this._handleInteraction);
        }
        this.host.addEventListener('input', this._handleValueChange);
        this.updateDataAttributes();
    }

    hostDisconnected(): void {
        for (const event of this._interactionEvents) {
            this.host.removeEventListener(event, this._handleInteraction);
        }
        this.host.removeEventListener('input', this._handleValueChange);
    }

    /** Whether the user has changed the value. */
    get dirty(): boolean {
        return this._dirty;
    }

    /** Whether the user has interacted with the control. */
    get touched(): boolean {
        return this._touched;
    }

    /** Reset dirty/touched state. */
    reset(): void {
        this._dirty = false;
        this._touched = false;
        this.updateDataAttributes();
    }

    /** Update form value — calls `ElementInternals.setFormValue()`. */
    setValue(value: FormDataEntryValue | FormData | null): void {
        const internals = this.host._internals;
        if (!internals || typeof internals.setFormValue !== 'function') return;
        internals.setFormValue(value);
    }

    /** Update validity — calls `ElementInternals.setValidity()`. */
    setValidity(flags?: ValidityStateFlags, message?: string, anchor?: HTMLElement): void {
        const internals = this.host._internals;
        if (!internals || typeof internals.setValidity !== 'function') return;
        if (flags && message) {
            internals.setValidity(flags, message, anchor);
        } else {
            internals.setValidity({});
        }
        this.updateDataAttributes();
    }

    /** Mark as valid (clears all validity flags). */
    setValid(): void {
        this.setValidity({});
    }

    /** Standard required + empty check. */
    validateRequired(isEmpty: boolean, message = 'Please fill out this field.'): void {
        if (this.host.required && isEmpty) {
            this.setValidity({ valueMissing: true }, message);
        } else {
            this.setValid();
        }
    }

    /** Report validity (shows browser validation UI). */
    reportValidity(): boolean {
        const internals = this.host._internals;
        if (!internals || typeof internals.reportValidity !== 'function') return true;
        return internals.reportValidity();
    }

    /**
     * The current validation level: 'error', 'warning', or 'info'.
     * Only meaningful when validation message is set.
     */
    get validationLevel(): ValidationLevel {
        return this._validationLevel;
    }

    /** The current validation message (for any level). */
    get validationMessage(): string {
        return this._validationMessage;
    }

    /**
     * Set a multi-level validation state [§38.1].
     *
     * - `'error'` — blocks form submission (uses setValidity)
     * - `'warning'` — advisory, does not block submission
     * - `'info'` — informational hint
     *
     * @param level — The severity level.
     * @param message — The validation message to display.
     * @param anchor — Optional anchor element for native popup positioning.
     */
    setValidationLevel(level: ValidationLevel, message: string, anchor?: HTMLElement): void {
        this._validationLevel = level;
        this._validationMessage = message;

        if (level === 'error') {
            // Errors use native constraint validation
            this.setValidity({ customError: true }, message, anchor);
        } else {
            // Warnings/info don't block form submission
            this.setValid();
        }

        this.updateDataAttributes();
    }

    /** Clear validation level state. */
    clearValidationLevel(): void {
        this._validationLevel = 'error';
        this._validationMessage = '';
        this.setValid();
        this.updateDataAttributes();
    }

    /** Update data attributes on the host element for CSS styling. */
    updateDataAttributes(): void {
        const el = this.host;
        const internals = el._internals;
        const isValid = internals ? internals.validity?.valid !== false : true;

        // Validity
        this._toggleData(el, 'valid', isValid);
        this._toggleData(el, 'invalid', !isValid);

        // User-validity (only shown after interaction)
        this._toggleData(el, 'userValid', this._touched && isValid);
        this._toggleData(el, 'userInvalid', this._touched && !isValid);

        // Dirty / pristine
        this._toggleData(el, 'dirty', this._dirty);
        this._toggleData(el, 'pristine', !this._dirty);

        // Touched / untouched
        this._toggleData(el, 'touched', this._touched);
        this._toggleData(el, 'untouched', !this._touched);

        // Required / optional
        this._toggleData(el, 'required', el.required);
        this._toggleData(el, 'optional', !el.required);

        // Disabled
        this._toggleData(el, 'disabled', el.disabled);

        // Validation level [§38.1]
        const hasMsg = this._validationMessage.length > 0;
        this._toggleData(el, 'validationWarning', hasMsg && this._validationLevel === 'warning');
        this._toggleData(el, 'validationInfo', hasMsg && this._validationLevel === 'info');
        this._toggleData(el, 'validationError', hasMsg && this._validationLevel === 'error');

        // Sync custom state pseudo-classes (dirty/touched)
        this._syncCustomStates();
    }

    // ── Private ──────────────────────────────────────────────────────────

    private _markDirty(): void {
        if (!this._dirty) {
            this._dirty = true;
            this.updateDataAttributes();
        }
    }

    private _markTouched(): void {
        if (!this._touched) {
            this._touched = true;
            this.updateDataAttributes();
        }
    }

    /** Sync dirty/touched/validation custom state pseudo-classes on ElementInternals.states. */
    private _syncCustomStates(): void {
        const states = this.host._internals?.states;
        if (!states) return;

        // Dirty / pristine
        if (this._dirty) {
            states.add('dirty');
        } else {
            states.delete('dirty');
        }

        // Touched / untouched
        if (this._touched) {
            states.add('touched');
        } else {
            states.delete('touched');
        }

        // Validation level custom states [§38.1]
        const hasMsg = this._validationMessage.length > 0;
        const toggleState = (name: string, on: boolean) => {
            if (on) { states.add(name); } else { states.delete(name); }
        };
        toggleState('validation-warning', hasMsg && this._validationLevel === 'warning');
        toggleState('validation-info', hasMsg && this._validationLevel === 'info');
        toggleState('validation-error', hasMsg && this._validationLevel === 'error');
    }

    private _toggleData(el: HTMLElement, name: string, value: boolean): void {
        // Guard: dataset is not available during SSR
        if (!el.dataset) return;
        if (value) {
            el.dataset[name] = '';
        } else {
            delete el.dataset[name];
        }
    }
}
