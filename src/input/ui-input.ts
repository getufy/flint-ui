import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiInputStyles from './ui-input.css?inline';

let idCounter = 0;

@customElement('ui-input')
export class UiInput extends LitElement {
    static styles = unsafeCSS(uiInputStyles);

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
