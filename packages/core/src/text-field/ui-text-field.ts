import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiTextFieldStyles from './ui-text-field.css?inline';

@customElement('ui-text-field')
export class UiTextField extends LitElement {
    static styles = unsafeCSS(uiTextFieldStyles);

    @property({ type: String }) label = '';
    @property({ type: String }) value = '';
    @property({ type: String }) placeholder = '';
    @property({ type: String }) type = 'text';
    @property({ type: String }) variant: 'outlined' | 'filled' = 'outlined';
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) error = false;
    @property({ type: String }) helperText = '';
    @property({ type: String }) errorMessage = '';

    @state() private _focused = false;


    private _handleInput(e: InputEvent) {
        this.value = (e.target as HTMLInputElement).value;
        this.dispatchEvent(new CustomEvent('input', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    private _handleChange(e: Event) {
        this.value = (e.target as HTMLInputElement).value;
        this.dispatchEvent(new CustomEvent('change', {
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
        'ui-text-field': UiTextField;
    }
}
