import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FormAssociated } from '../mixins/form-associated.js';
import uiInputStyles from './flint-input.css?inline';

let idCounter = 0;

@customElement('flint-input')
export class FlintInput extends FormAssociated(LitElement) {
    static styles = unsafeCSS(uiInputStyles);

    private _inputId = `flint-input-${++idCounter}`;

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

    formResetCallback() {
        this.value = '';
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
