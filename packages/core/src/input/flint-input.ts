import { LitElement, unsafeCSS, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FormAssociated } from '../mixins/form-associated.js';
import uiInputStyles from './flint-input.css?inline';

let idCounter = 0;

/**
 * Input: a styled text input with label, help text, and error states.
 *
 * @fires flint-input-input - Fired on each keystroke as the value changes.
 * @fires flint-input-change - Fired when the input loses focus after the value has changed.
 */
@customElement('flint-input')
export class FlintInput extends FormAssociated(LitElement) {
    static styles = unsafeCSS(uiInputStyles);

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
    @property({ type: String, attribute: 'help-text' })
    helpText = '';

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

    /** 'sm' | 'default' | 'lg' */
    @property({ type: String, reflect: true })
    size: 'sm' | 'default' | 'lg' = 'default';

    /** Initial value for uncontrolled usage. */
    @property({ type: String, attribute: 'default-value' })
    defaultValue?: string;

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
    }

    private _updateFormValue() {
        this._initFormValue(this.value || null);
        this._initFormValidity(this.required, !this.value, 'Please fill out this field.');
    }

    render() {
        const errorState = this.error || !!this.errorMessage;
        const descId = (errorState && this.errorMessage) || this.helpText
            ? `${this._inputId}-desc`
            : undefined;

        return html`
      <div class="input-wrapper" part="wrapper">
        ${this.label
                ? html`<label for=${this._inputId} part="label">${this.label}</label>`
                : ''}

        <input
          id=${this._inputId}
          part="input"
          .type=${this.type}
          .value=${this.value}
          .placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          aria-required=${this.required ? 'true' : 'false'}
          aria-invalid=${errorState ? 'true' : 'false'}
          aria-describedby=${descId ?? ''}
          name=${this.name}
          autocomplete=${this.autocomplete}
          class=${classMap({ 'error-input': errorState })}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />

        ${errorState && this.errorMessage
                ? html`<p id=${descId} class="help-text error-text" part="error-text" role="alert">${this.errorMessage}</p>`
                : this.helpText
                    ? html`<p id=${descId} class="help-text" part="help-text">${this.helpText}</p>`
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
