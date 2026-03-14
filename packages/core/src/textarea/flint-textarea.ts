import { LitElement, unsafeCSS, html, nothing, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormAssociated } from '../mixins/form-associated.js';
import uiTextareaStyles from './flint-textarea.css?inline';

let _uidCounter = 0;

/**
 * A Textarea component for multi-line text input.
 *
 * @fires flint-textarea-input  - Dispatched on every keystroke. Detail: `{ value: string }`
 * @fires flint-textarea-change - Dispatched on blur/change. Detail: `{ value: string }`
 */
@customElement('flint-textarea')
export class FlintTextarea extends FormAssociated(LitElement) {
    static styles = unsafeCSS(uiTextareaStyles);

    @property({ type: String }) value = '';
    @property({ type: String }) placeholder = '';
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) readonly = false;
    @property({ type: Boolean, reflect: true }) required = false;
    @property({ type: Boolean }) error = false;
    @property({ type: String, attribute: 'error-message' }) errorMessage = '';
    @property({ type: String, attribute: 'help-text' }) helpText = '';
    @property({ type: String }) label = '';
    @property({ type: String, reflect: true }) size: 'sm' | 'default' | 'lg' = 'default';
    @property({ type: Number }) rows = 3;
    @property({ type: Number }) maxlength: number | undefined = undefined;
    @property({ type: Number }) minlength: number | undefined = undefined;
    @property({ type: String }) name = '';
    @property({ type: String }) autocomplete = '';
    /**
     * Controls the resize handle.
     * 'auto' enables automatic height expansion as the user types.
     */
    @property({ type: String, reflect: true })
    resize: 'none' | 'both' | 'horizontal' | 'vertical' | 'auto' = 'vertical';
    @property({ type: String, attribute: 'default-value' }) defaultValue = '';
    @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

    private readonly _textareaId: string;
    private readonly _descId: string;

    constructor() {
        super();
        _uidCounter++;
        this._textareaId = `flint-textarea-${_uidCounter}`;
        this._descId = `flint-textarea-desc-${_uidCounter}`;
    }

    /** Direct access to the internal <textarea> element. */
    get textareaElement(): HTMLTextAreaElement | null {
        return this.shadowRoot?.querySelector('textarea') ?? null;
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

    protected override updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('value')) {
            this._initFormValue(this.value);
            if (this.resize === 'auto') {
                this._autoResize();
            }
        }
        if (changed.has('required') || changed.has('value')) {
            this._initFormValidity(this.required, !this.value, 'Please fill in this field.');
        }
    }

    private _autoResize() {
        const ta = this.textareaElement;
        if (!ta) return;
        ta.style.height = 'auto';
        ta.style.height = `${ta.scrollHeight}px`;
    }

    private _handleInput(e: Event) {
        this.value = (e.target as HTMLTextAreaElement).value;
        this.dispatchEvent(new CustomEvent('flint-textarea-input', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    private _handleChange(e: Event) {
        this.value = (e.target as HTMLTextAreaElement).value;
        this.dispatchEvent(new CustomEvent('flint-textarea-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    override render() {
        const errorState = this.error || !!this.errorMessage;
        const hasDesc = (errorState && !!this.errorMessage) || !!this.helpText;

        return html`
      <div class="textarea-wrapper" part="wrapper">
        ${this.label ? html`
          <label for=${this._textareaId} part="label">${this.label}</label>
        ` : nothing}

        <textarea
          id=${this._textareaId}
          part="textarea"
          class=${classMap({ 'error-textarea': errorState })}
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          aria-required=${this.required ? 'true' : 'false'}
          rows=${this.rows}
          maxlength=${ifDefined(this.maxlength)}
          minlength=${ifDefined(this.minlength)}
          name=${this.name}
          autocomplete=${this.autocomplete || nothing}
          aria-invalid=${errorState ? 'true' : 'false'}
          aria-describedby=${hasDesc ? this._descId : nothing}
          aria-label=${this.ariaLabel ?? nothing}
          @input=${this._handleInput}
          @change=${this._handleChange}
        ></textarea>

        ${errorState && this.errorMessage
            ? html`<p id=${this._descId} class="help-text error-text" part="error-text" role="alert">${this.errorMessage}</p>`
            : this.helpText
                ? html`<p id=${this._descId} class="help-text" part="help-text">${this.helpText}</p>`
                : nothing}
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-textarea': FlintTextarea;
    }
}
