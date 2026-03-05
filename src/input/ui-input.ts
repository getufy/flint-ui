import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

let idCounter = 0;

@customElement('ui-input')
export class UiInput extends LitElement {
    static styles = css`
    :host {
      display: block;
      font-family: var(--ui-font-family, system-ui);
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-size: 14px;
      font-weight: 500;
      color: var(--ui-label-color, #374151);
    }

    input {
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 14px;
      font-size: 14px;
      border-radius: 6px;
      border: 1px solid var(--ui-input-border-color, #d1d5db);
      background-color: var(--ui-input-bg, #ffffff);
      color: var(--ui-text-color, #111827);
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }

    :host([size="sm"]) input {
      padding: 6px 10px;
      font-size: 13px;
    }

    :host([size="lg"]) input {
      padding: 12px 16px;
      font-size: 16px;
    }

    input::placeholder {
      color: var(--ui-input-placeholder-color, #9ca3af);
    }

    input:hover:not(:disabled):not(.error-input) {
      border-color: var(--ui-input-border-hover-color, #9ca3af);
    }

    input:focus-visible {
      border-color: var(--ui-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    input[aria-invalid="true"] {
      border-color: var(--ui-error-color, #ef4444);
    }

    input[aria-invalid="true"]:focus-visible {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }

    input:disabled {
      background-color: var(--ui-input-disabled-bg, #f3f4f6);
      color: var(--ui-input-disabled-color, #9ca3af);
      cursor: not-allowed;
      opacity: 1;
    }

    input[readonly] {
      background-color: var(--ui-input-readonly-bg, #f9fafb);
      cursor: default;
    }

    .help-text {
      font-size: 12px;
      color: var(--ui-help-text-color, #6b7280);
      margin: 0;
    }

    .error-text {
      color: var(--ui-error-color, #ef4444);
    }
  `;

    private _inputId = `ui-input-${++idCounter}`;

    @property({ type: String })
    label = '';

    @property({ type: String })
    value = '';

    @property({ type: String })
    type: string = 'text';

    @property({ type: String })
    placeholder = '';

    @property({ type: String, attribute: 'help-text' })
    helpText = '';

    @property({ type: Boolean })
    error = false;

    @property({ type: String, attribute: 'error-message' })
    errorMessage = '';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    required = false;

    @property({ type: Boolean, reflect: true })
    readonly = false;

    @property({ type: String })
    name = '';

    @property({ type: String })
    autocomplete = '';

    /** 'sm' | 'default' | 'lg' */
    @property({ type: String, reflect: true })
    size: 'sm' | 'default' | 'lg' = 'default';

    /** Expose the internal <input> for direct access */
    get inputElement(): HTMLInputElement {
        return this.shadowRoot!.querySelector('input')!;
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
