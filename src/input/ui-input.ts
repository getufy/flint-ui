import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ui-input')
export class UiInput extends LitElement {
    static styles = css`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
      margin-bottom: 16px;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-size: 14px;
      font-weight: 500;
      color: #374151; /* gray-700 */
    }

    input {
      font-family: inherit;
      padding: 10px 14px;
      font-size: 16px;
      border-radius: 6px;
      border: 1px solid #d1d5db; /* gray-300 */
      background-color: #ffffff;
      color: #111827; /* gray-900 */
      transition: border-color 0.2s, box-shadow 0.2s, outline 0.2s;
      outline: none;
    }

    input::placeholder {
      color: #9ca3af; /* gray-400 */
    }

    input:hover:not(:disabled):not(.error) {
      border-color: #9ca3af;
    }

    input:focus {
      border-color: #3b82f6; /* blue-500 */
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    .error input {
      border-color: #ef4444; /* red-500 */
    }

    .error input:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }
    
    input:disabled {
      background-color: #f3f4f6; /* gray-100 */
      color: #9ca3af;
      cursor: not-allowed;
    }

    .help-text {
      font-size: 12px;
      color: #6b7280; /* gray-500 */
      margin: 0;
    }

    .error-text {
      color: #ef4444;
    }
  `;

    @property({ type: String })
    label = '';

    @property({ type: String })
    value = '';

    @property({ type: String })
    type: 'text' | 'password' | 'email' | 'number' = 'text';

    @property({ type: String })
    placeholder = '';

    @property({ type: String })
    helpText = '';

    @property({ type: Boolean })
    error = false;

    @property({ type: String })
    errorMessage = '';

    @property({ type: Boolean })
    disabled = false;

    @query('input')
    inputElement!: HTMLInputElement;

    render() {
        const errorState = this.error || !!this.errorMessage;

        return html`
      <div class="input-wrapper ${classMap({ error: errorState })}" part="wrapper">
        ${this.label ? html`<label part="label">${this.label}</label>` : ''}
        
        <input
          part="input"
          .type=${this.type}
          .value=${this.value}
          .placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        
        ${errorState && this.errorMessage ?
                html`<p class="help-text error-text" part="error-text">${this.errorMessage}</p>` :
                this.helpText ? html`<p class="help-text" part="help-text">${this.helpText}</p>` : ''
            }
      </div>
    `;
    }

    private _handleInput(e: Event) {
        this.value = (e.target as HTMLInputElement).value;
        this.dispatchEvent(
            new CustomEvent('ui-input-input', {
                detail: { value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }

    private _handleChange(e: Event) {
        this.value = (e.target as HTMLInputElement).value;
        this.dispatchEvent(
            new CustomEvent('ui-input-change', {
                detail: { value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-input': UiInput;
    }
}
