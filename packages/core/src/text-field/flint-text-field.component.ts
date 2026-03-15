import { unsafeCSS, html, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiTextFieldStyles from './flint-text-field.css?inline';

/**
 * Text Field: a styled text input with outlined/filled variants.
 *
 * @fires flint-text-field-input - Fired on each keystroke as the value changes. detail: `{ value: string }`
 * @fires flint-text-field-change - Fired when the input loses focus after the value has changed. detail: `{ value: string }`
 */
export class FlintTextField extends FlintElement {
    static styles = unsafeCSS(uiTextFieldStyles);

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
    @property({ type: Boolean }) disabled = false;
    /** Whether the text field is in an error state. */
    @property({ type: Boolean }) error = false;
    /** Helper text displayed below the input. */
    @property({ type: String }) helperText = '';
    /** Error message displayed below the input when in error state. */
    @property({ type: String }) errorMessage = '';
    /** Initial value for uncontrolled usage. */
    @property({ type: String, attribute: 'default-value' }) defaultValue = '';

    @state() private _focused = false;
    private _firstUpdate = true;


    protected override willUpdate(changed: PropertyValues) {
        super.willUpdate(changed);
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultValue && !this.value) {
                this.value = this.defaultValue;
            }
        }
    }

    private _handleInput(e: InputEvent) {
        this.value = (e.target as HTMLInputElement).value;
        this.dispatchEvent(new CustomEvent('flint-text-field-input', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    private _handleChange(e: Event) {
        this.value = (e.target as HTMLInputElement).value;
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

        return html`
      <div class=${classMap({ 'field-container': true, 'filled': this.variant === 'filled' })}>
        ${this.label ? html`<label class="label">${this.label}</label>` : ''}

        <div class=${classMap({
            'input-wrapper': true,
            'focused': this._focused,
            'error': isError,
            'disabled': this.disabled
        })}>
          <div class="icon-leading" part="leading-icon">
            <slot name="leading"></slot>
          </div>

          <input
            .type=${this.type}
            .value=${this.value}
            .placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
            aria-invalid=${isError ? 'true' : 'false'}
          />

          <div class="icon-trailing" part="trailing-icon">
            <slot name="trailing"></slot>
          </div>
        </div>

        ${isError && this.errorMessage ?
                html`<span class="helper-text error-text">${this.errorMessage}</span>` :
                this.helperText ? html`<span class="helper-text">${this.helperText}</span>` : ''
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
