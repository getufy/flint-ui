import { unsafeCSS, html, nothing, PropertyValues, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { FormAssociated } from '../mixins/form-associated.js';
import { FormControlController } from '../controllers/form-control.js';
import uiTextFieldStyles from './flint-text-field.css?inline';

let idCounter = 0;

/**
 * Text Field: a styled text input with outlined/filled variants.
 *
 * @fires flint-text-field-input - Fired on each keystroke as the value changes. detail: `{ value: string }`
 * @fires flint-text-field-change - Fired when the input loses focus after the value has changed. detail: `{ value: string }`
 * @fires flint-text-field-clear - Fired when the clear button is clicked. detail: `undefined`
 *
 * @slot prefix - Content placed before the input (e.g. icon).
 * @slot suffix - Content placed after the input (e.g. icon).
 *
 * @csspart prefix-icon - The prefix slot container.
 * @csspart suffix-icon - The suffix slot container.
 * @csspart clear-button - The clear button.
 * @csspart password-toggle-button - The password toggle button.
 */
export class FlintTextField extends FormAssociated(FlintElement) {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
    static styles = unsafeCSS(uiTextFieldStyles);

    private _formControl = new FormControlController(this);
    private _inputId = `flint-text-field-${++idCounter}`;

    /** Label text displayed above the input. */
    @property({ type: String }) label = '';
    /** Current value of the text field. */
    @property({ type: String }) value = '';
    /** Placeholder text shown when the input is empty. */
    @property({ type: String }) placeholder = '';
    /** HTML input type (e.g. 'text', 'password', 'email'). */
    @property({ type: String }) type = 'text';
    /** Visual style variant of the text field. */
    @property({ type: String }) variant: 'outlined' | 'filled' = 'outlined';
    /** Whether the text field is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Whether the text field is in an error state. */
    @property({ type: Boolean }) error = false;
    /** Helper text displayed below the input. */
    @property({ type: String }) helperText = '';
    /** Error message displayed below the input when in error state. */
    @property({ type: String }) errorMessage = '';
    /** Initial value for uncontrolled usage. */
    @property({ type: String, attribute: 'default-value' }) defaultValue = '';
    /** Form field name used when submitting form data. */
    @property({ type: String }) name = '';
    /** Marks the input as required for form validation. */
    @property({ type: Boolean, reflect: true }) required = false;
    /** Regex pattern for validation. */
    @property({ type: String }) pattern = '';
    /** Minimum value (for number/date inputs). */
    @property({ type: String }) min = '';
    /** Maximum value (for number/date inputs). */
    @property({ type: String }) max = '';
    /** Minimum length for text validation. */
    @property({ type: Number, attribute: 'minlength' }) minLength?: number;
    /** Maximum length for text validation. */
    @property({ type: Number, attribute: 'maxlength' }) maxLength?: number;
    /** Makes the input read-only. */
    @property({ type: Boolean, reflect: true }) readonly = false;
    /** Shows a clear button when the input has a value. */
    @property({ type: Boolean }) clearable = false;
    /** Shows a toggle button on password inputs to reveal/hide the value. */
    @property({ type: Boolean, attribute: 'password-toggle' }) passwordToggle = false;
    /** Whether the password is currently visible. Only relevant when `passwordToggle` is true. */
    @property({ type: Boolean, attribute: 'password-visible' }) passwordVisible = false;

    @state() private _focused = false;

    /** Expose the internal <input> for direct access. */
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

    /** Run constraint validation for required, pattern, min, max, minlength, maxlength. */
    private _validateConstraints() {
        if (!this._internals || typeof this._internals.setValidity !== 'function') return;

        const innerInput = this.shadowRoot?.querySelector('input');
        this._formControl.validateConstraints({
            value: this.value,
            required: this.required,
            pattern: this.pattern || undefined,
            min: this.min || undefined,
            max: this.max || undefined,
            minLength: this.minLength,
            maxLength: this.maxLength,
            type: this.type,
        }, innerInput ?? undefined);
        this._syncCustomStates();
    }

    private _handleInput = (e: InputEvent) => {
        this.value = (e.target as HTMLInputElement).value;
        this._updateFormValue();
        this.dispatchEvent(new CustomEvent('flint-text-field-input', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    };

    private _handleChange = (e: Event) => {
        this.value = (e.target as HTMLInputElement).value;
        this._updateFormValue();
        this.dispatchEvent(new CustomEvent('flint-text-field-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    };

    private _handleClear = () => {
        this.value = '';
        this._updateFormValue();
        this.dispatchEvent(new CustomEvent('flint-text-field-clear', {
            bubbles: true,
            composed: true,
        }));
        this.dispatchEvent(new CustomEvent('flint-text-field-input', {
            detail: { value: '' },
            bubbles: true,
            composed: true,
        }));
        this.dispatchEvent(new CustomEvent('flint-text-field-change', {
            detail: { value: '' },
            bubbles: true,
            composed: true,
        }));
        this.shadowRoot?.querySelector('input')?.focus();
    };

    private _togglePasswordVisibility = () => {
        this.passwordVisible = !this.passwordVisible;
    };

    private _handleFocus = () => {
        this._focused = true;
    };

    private _handleBlur = () => {
        this._focused = false;
    };

    render() {
        const isError = this.error || !!this.errorMessage;
        const descId = (isError && this.errorMessage) || this.helperText
            ? `${this._inputId}-desc`
            : undefined;
        const isPassword = this.type === 'password';
        const effectiveType = isPassword && this.passwordVisible ? 'text' : this.type;
        const showClear = this.clearable && this.value && !this.disabled && !this.readonly;

        return html`
      <div class=${classMap({ 'field-container': true, 'filled': this.variant === 'filled' })}>
        ${this.label ? html`<label class="label" for=${this._inputId}>${this.label}</label>` : ''}

        <div class=${classMap({
            'input-wrapper': true,
            'focused': this._focused,
            'error': isError,
            'disabled': this.disabled
        })}>
          <div class="icon-prefix" part="prefix-icon">
            <slot name="prefix"></slot>
          </div>

          <input
            id=${this._inputId}
            .type=${effectiveType}
            .value=${this.value}
            .placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            pattern=${this.pattern || nothing}
            min=${this.min || nothing}
            max=${this.max || nothing}
            minlength=${this.minLength ?? nothing}
            maxlength=${this.maxLength ?? nothing}
            aria-required=${this.required ? 'true' : 'false'}
            aria-invalid=${isError ? 'true' : 'false'}
            aria-describedby=${descId ?? ''}
            name=${this.name}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />

          ${showClear ? html`
            <button
              type="button"
              class="clear-btn"
              part="clear-button"
              aria-label="Clear input"
              @click=${this._handleClear}
              tabindex="-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          ` : nothing}

          ${isPassword && this.passwordToggle && !this.disabled ? html`
            <button
              type="button"
              class="password-toggle"
              part="password-toggle-button"
              aria-label=${this.passwordVisible ? 'Hide password' : 'Show password'}
              @click=${this._togglePasswordVisibility}
              tabindex="-1"
            >
              ${this.passwordVisible
                ? html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
                : html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
              }
            </button>
          ` : nothing}

          <div class="icon-suffix" part="suffix-icon">
            <slot name="suffix"></slot>
          </div>
        </div>

        ${isError && this.errorMessage ?
                html`<span id=${descId} class="helper-text error-text" role="alert">${this.errorMessage}</span>` :
                this.helperText ? html`<span id=${descId} class="helper-text">${this.helperText}</span>` : ''
            }
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-text-field': FlintTextField;
    }
}
