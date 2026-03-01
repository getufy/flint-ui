import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ui-text-field')
export class UiTextField extends LitElement {
    static styles = css`
    :host {
      display: block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      margin-bottom: 1rem;
    }

    .field-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-text-color, #111827);
      transition: color 0.2s;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background-color: var(--ui-surface-background, white);
      border: 1px solid var(--ui-input-border-color, #d1d5db);
      border-radius: var(--ui-input-border-radius, 6px);
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .input-wrapper:hover:not(.disabled):not(.error) {
      border-color: var(--ui-text-color-muted, #6b7280);
    }

    .input-wrapper.focused:not(.error) {
      border-color: var(--ui-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .input-wrapper.error {
      border-color: #ef4444;
    }

    .input-wrapper.error.focused {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }

    .input-wrapper.disabled {
      background-color: var(--ui-surface-background-flat, #f3f4f6);
      cursor: not-allowed;
      opacity: 0.7;
    }

    input {
      flex: 1;
      width: 100%;
      padding: 0.625rem 0.875rem;
      font-size: 1rem;
      font-family: inherit;
      color: inherit;
      background: transparent;
      border: none;
      outline: none;
    }

    input:disabled {
      cursor: not-allowed;
    }

    input::placeholder {
      color: var(--ui-text-color-muted, #9ca3af);
    }

    .icon-leading, .icon-trailing {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ui-text-color-muted, #6b7280);
      padding: 0 0.75rem;
    }

    .icon-leading {
      padding-right: 0;
    }

    .icon-trailing {
      padding-left: 0;
    }

    .helper-text {
      font-size: 0.75rem;
      color: var(--ui-text-color-muted, #6b7280);
    }

    .error-text {
      color: #ef4444;
    }

    /* Outlined variant (default) */
    /* Filled variant */
    .filled .input-wrapper {
      background-color: var(--ui-surface-background-flat, #f3f4f6);
      border-bottom: 2px solid var(--ui-input-border-color, #d1d5db);
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 4px 4px 0 0;
    }

    .filled .input-wrapper.focused {
      border-bottom-color: var(--ui-primary-color, #3b82f6);
      background-color: var(--ui-hover-color, rgba(0,0,0,0.02));
    }
  `;

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
