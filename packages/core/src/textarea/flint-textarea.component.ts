import { unsafeCSS, html, nothing, PropertyValues, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FlintElement } from '../flint-element.js';
import { FormAssociated } from '../mixins/form-associated.js';
import { FormControlController } from '../controllers/form-control.js';
import type { Size } from '../types.js';
import uiTextareaStyles from './flint-textarea.css?inline';

let _uidCounter = 0;

/**
 * A Textarea component for multi-line text input.
 *
 * @fires flint-textarea-input  - Dispatched on every keystroke. Detail: `{ value: string }`
 * @fires flint-textarea-change - Dispatched on blur/change. Detail: `{ value: string }`
 *
 * @csspart wrapper - The textarea's outer wrapper element.
 * @csspart label - The label element.
 * @csspart textarea - The native textarea element.
 * @csspart error-text - The error message element.
 * @csspart help-text - The helper text element.
 */
export class FlintTextarea extends FormAssociated(FlintElement) {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
    static styles = unsafeCSS(uiTextareaStyles);

    private _formControl = new FormControlController(this);

    /** Current textarea value. */
    @property({ type: String }) value = '';
    /** Placeholder text shown when empty. */
    @property({ type: String }) placeholder = '';
    /** Disables the textarea and prevents interaction. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Makes the textarea read-only. */
    @property({ type: Boolean, reflect: true }) readonly = false;
    /** Marks the textarea as required for form validation. */
    @property({ type: Boolean, reflect: true }) required = false;
    /** Whether the textarea is in an error state. */
    @property({ type: Boolean }) error = false;
    /** Error message displayed below the textarea. */
    @property({ type: String, attribute: 'error-message' }) errorMessage = '';
    /** Help text displayed below the textarea. */
    @property({ type: String, attribute: 'helper-text' }) helperText = '';
    /** Label text displayed above the textarea. */
    @property({ type: String }) label = '';
    /** Size variant of the textarea. */
    @property({ type: String, reflect: true }) size: Size = 'md';
    /** Number of visible text rows. */
    @property({ type: Number }) rows = 3;
    /** Maximum number of characters allowed. */
    @property({ type: Number }) maxlength: number | undefined = undefined;
    /** Minimum number of characters required. */
    @property({ type: Number }) minlength: number | undefined = undefined;
    /** Regex pattern for validation. */
    @property({ type: String }) pattern = '';
    /** Form field name used when submitting form data. */
    @property({ type: String }) name = '';
    /** Browser autocomplete hint. */
    @property({ type: String }) autocomplete = '';
    /**
     * Controls the resize handle.
     * 'auto' enables automatic height expansion as the user types.
     */
    @property({ type: String, reflect: true })
    resize: 'none' | 'both' | 'horizontal' | 'vertical' | 'auto' = 'vertical';
    /** Initial value for uncontrolled usage. */
    @property({ type: String, attribute: 'default-value' }) defaultValue = '';
    /** Accessible label for screen readers when no visible label is provided. */
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
        if (changed.has('required') || changed.has('value') || changed.has('pattern')
            || changed.has('minlength') || changed.has('maxlength')) {
            this._validateConstraints();
        }
    }

    /** Run constraint validation for required, pattern, minlength, maxlength. */
    private _validateConstraints() {
        if (!this._internals || typeof this._internals.setValidity !== 'function') return;

        const innerTextarea = this.shadowRoot?.querySelector('textarea');
        this._formControl.validateConstraints({
            value: this.value,
            required: this.required,
            pattern: this.pattern || undefined,
            minLength: this.minlength,
            maxLength: this.maxlength,
        }, innerTextarea ?? undefined);
        this._syncCustomStates();
        this._formControl.updateDataAttributes();
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
        const hasDesc = (errorState && !!this.errorMessage) || !!this.helperText;

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
            : this.helperText
                ? html`<p id=${this._descId} class="help-text" part="help-text">${this.helperText}</p>`
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
