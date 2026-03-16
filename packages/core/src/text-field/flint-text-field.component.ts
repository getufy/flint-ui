import { unsafeCSS, html, PropertyValues, LitElement } from 'lit';
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
        this._initFormValidity(this.required, !this.value, 'Please fill out this field.');
        this._formControl.updateDataAttributes();
    }

    private _handleInput(e: InputEvent) {
        this.value = (e.target as HTMLInputElement).value;
        this._updateFormValue();
        this.dispatchEvent(new CustomEvent('flint-text-field-input', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    private _handleChange(e: Event) {
        this.value = (e.target as HTMLInputElement).value;
        this._updateFormValue();
        this.dispatchEvent(new CustomEvent('flint-text-field-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    private _handleFocus() {
        this._focused = true;
    }

    private _handleBlur() {
        this._focused = false;
    }

    render() {
        const isError = this.error || !!this.errorMessage;
        const descId = (isError && this.errorMessage) || this.helperText
            ? `${this._inputId}-desc`
            : undefined;

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
            .type=${this.type}
            .value=${this.value}
            .placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-required=${this.required ? 'true' : 'false'}
            aria-invalid=${isError ? 'true' : 'false'}
            aria-describedby=${descId ?? ''}
            name=${this.name}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />

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
