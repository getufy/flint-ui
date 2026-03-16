import { unsafeCSS, html, nothing, PropertyValues, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { FormAssociated } from '../mixins/form-associated.js';
import { FormControlController } from '../controllers/form-control.js';
import uiInputStyles from './flint-input.css?inline';

let idCounter = 0;

/**
 * Input: a styled text input with label, help text, and error states.
 *
 * @fires flint-input-input - Fired on each keystroke as the value changes. detail: `{ value: string }`
 * @fires flint-input-change - Fired when the input loses focus after the value has changed. detail: `{ value: string }`
 */
export class FlintInput extends FormAssociated(FlintElement) {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
    static styles = unsafeCSS(uiInputStyles);

    private _formControl = new FormControlController(this);
    private _inputId = `flint-input-${++idCounter}`;

    /** Label text displayed above the input. */
    @property({ type: String })
    label = '';

    /** Current input value. */
    @property({ type: String })
    value = '';

    /** HTML input type (text, email, password, etc.). */
    @property({ type: String })
    type: string = 'text';

    /** Placeholder text shown when the input is empty. */
    @property({ type: String })
    placeholder = '';

    /** Help text displayed below the input. */
    @property({ type: String, attribute: 'helper-text' })
    helperText = '';

    /** Whether the input is in an error state. */
    @property({ type: Boolean })
    error = false;

    /** Error message displayed below the input. */
    @property({ type: String, attribute: 'error-message' })
    errorMessage = '';

    /** Disables the input and prevents interaction. */
    @property({ type: Boolean, reflect: true })
    disabled = false;

    /** Marks the input as required for form validation. */
    @property({ type: Boolean, reflect: true })
    required = false;

    /** Makes the input read-only. */
    @property({ type: Boolean, reflect: true })
    readonly = false;

    /** Form field name used when submitting form data. */
    @property({ type: String })
    name = '';

    /** Browser autocomplete hint. */
    @property({ type: String })
    autocomplete = '';

    /** Regex pattern for validation. */
    @property({ type: String })
    pattern = '';

    /** Minimum value (for number/date inputs). */
    @property({ type: String })
    min = '';

    /** Maximum value (for number/date inputs). */
    @property({ type: String })
    max = '';

    /** Minimum length for text validation. */
    @property({ type: Number, attribute: 'minlength' })
    minLength?: number;

    /** Maximum length for text validation. */
    @property({ type: Number, attribute: 'maxlength' })
    maxLength?: number;

    /**
     * Size variant of the input.
     * @default 'md'
     */
    @property({ type: String, reflect: true })
    size: 'sm' | 'md' | 'lg' = 'md';

    /** Initial value for uncontrolled usage. */
    @property({ type: String, attribute: 'default-value' })
    defaultValue?: string;

    /** Shows a clear button when the input has a value. */
    @property({ type: Boolean })
    clearable = false;

    /** Whether the password is currently visible (password toggle). */
    @state() private _passwordVisible = false;

    /** Expose the internal <input> for direct access */
    get inputElement(): HTMLInputElement {
        return this.shadowRoot!.querySelector('input')!;
    }

    protected override willUpdate(changed: PropertyValues) {
        super.willUpdate(changed);
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultValue && !this.value) {
                this.value = this.defaultValue;
            }
        }
    }

    formResetCallback() {
        this.value = this.defaultValue ?? '';
        this._updateFormValue();
        this._formControl.reset();
    }

    private _updateFormValue() {
        this._initFormValue(this.value || null);
        this._validateConstraints();
        this._formControl.updateDataAttributes();
    }

    /** Delegate constraint validation to the inner native <input> element. */
    private _validateConstraints() {
        if (!this._internals || typeof this._internals.setValidity !== 'function') return;

        const innerInput = this.shadowRoot?.querySelector('input');
        if (innerInput && !innerInput.validity.valid) {
            this._internals.setValidity(innerInput.validity, innerInput.validationMessage, innerInput);
        } else {
            this._internals.setValidity({});
        }
        this._syncCustomStates();
    }

    private _handleClear() {
        this.value = '';
        this._updateFormValue();
        this.dispatchEvent(new CustomEvent('flint-input-input', {
            detail: { value: '' },
            bubbles: true,
            composed: true,
        }));
        this.dispatchEvent(new CustomEvent('flint-input-change', {
            detail: { value: '' },
            bubbles: true,
            composed: true,
        }));
        // Return focus to the input
        this.shadowRoot?.querySelector('input')?.focus();
    }

    private _togglePasswordVisibility() {
        this._passwordVisible = !this._passwordVisible;
    }

    render() {
        const errorState = this.error || !!this.errorMessage;
        const descId = (errorState && this.errorMessage) || this.helperText
            ? `${this._inputId}-desc`
            : undefined;
        const isPassword = this.type === 'password';
        const effectiveType = isPassword && this._passwordVisible ? 'text' : this.type;
        const showClear = this.clearable && this.value && !this.disabled && !this.readonly;

        return html`
      <div class="input-wrapper" part="base">
        ${this.label
                ? html`<label for=${this._inputId} part="label">${this.label}</label>`
                : ''}

        <div class=${classMap({
            'input-container': true,
            'has-prefix': true,
            'has-suffix': true,
        })}>
          <span class="prefix" part="prefix"><slot name="prefix"></slot></span>

          <input
            id=${this._inputId}
            part="input"
            .type=${effectiveType}
            .value=${this.value}
            .placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            pattern=${this.pattern || nothing}
            min=${this.min || nothing}
            max=${this.max || nothing}
            minlength=${this.minLength ?? nothing}
            maxlength=${this.maxLength ?? nothing}
            aria-required=${this.required ? 'true' : 'false'}
            aria-invalid=${errorState ? 'true' : 'false'}
            aria-describedby=${descId ?? ''}
            name=${this.name}
            autocomplete=${this.autocomplete}
            class=${classMap({ 'error-input': errorState })}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />

          ${showClear ? html`
            <button
              type="button"
              class="clear-btn"
              part="clear-button"
              aria-label="Clear input"
              @click=${this._handleClear}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          ` : nothing}

          ${isPassword ? html`
            <button
              type="button"
              class="password-toggle"
              part="password-toggle"
              aria-label=${this._passwordVisible ? 'Hide password' : 'Show password'}
              @click=${this._togglePasswordVisibility}
            >
              ${this._passwordVisible
                ? html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
                : html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
              }
            </button>
          ` : nothing}

          <span class="suffix" part="suffix"><slot name="suffix"></slot></span>
        </div>

        ${errorState && this.errorMessage
                ? html`<p id=${descId} class="help-text error-text" part="error-message" role="alert">${this.errorMessage}</p>`
                : this.helperText
                    ? html`<p id=${descId} class="help-text" part="help-text">${this.helperText}</p>`
                    : ''}
      </div>
    `;
    }

    private _handleInput(e: Event) {
        this.value = (e.target as HTMLInputElement).value;
        this._updateFormValue();
        this.dispatchEvent(
            new CustomEvent('flint-input-input', {
                detail: { value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }

    private _handleChange(e: Event) {
        this.value = (e.target as HTMLInputElement).value;
        this._updateFormValue();
        this.dispatchEvent(
            new CustomEvent('flint-input-change', {
                detail: { value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-input': FlintInput;
    }
}