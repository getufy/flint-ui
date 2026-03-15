import { unsafeCSS, html, nothing, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import styles from './flint-form-field.css?inline';

let _uidCounter = 0;

export type LabelPosition = 'top' | 'start';

/**
 * A form field wrapper that provides consistent layout (label + control +
 * helper text + error message) for any slotted form control.
 *
 * @slot - The form control (e.g. FlintInput, FlintSelect, FlintCheckbox).
 * @slot label - Custom label content (overrides the `label` prop).
 * @slot helper-text - Custom helper text content (overrides the `helper-text` prop).
 * @slot error-message - Custom error message content (overrides the `error-message` prop).
 *
 * @csspart label - The label element.
 * @csspart field - The control wrapper.
 * @csspart helper-text - The helper text element.
 * @csspart error-message - The error message element.
 */
export class FlintFormField extends FlintElement {
    static styles = unsafeCSS(styles);

    /** Field label text. */
    @property({ type: String })
    label = '';

    /** Helper text displayed below the control. */
    @property({ type: String, attribute: 'helper-text' })
    helperText = '';

    /** Error message displayed when `error` is true. */
    @property({ type: String, attribute: 'error-message' })
    errorMessage = '';

    /** Whether the field is in an error state. */
    @property({ type: Boolean, reflect: true })
    error = false;

    /** Shows a required indicator next to the label. */
    @property({ type: Boolean, reflect: true })
    required = false;

    /** Disables the field and its slotted control. */
    @property({ type: Boolean, reflect: true })
    disabled = false;

    /** Label placement relative to the control. */
    @property({ type: String, reflect: true, attribute: 'label-position' })
    labelPosition: LabelPosition = 'top';

    private readonly _fieldId: string;

    constructor() {
        super();
        _uidCounter++;
        this._fieldId = `flint-form-field-${_uidCounter}`;
    }

    protected override updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('error') || changed.has('disabled') || changed.has('required') || changed.has('label')) {
            this._syncSlottedControl();
        }
    }

    /** Push error/disabled/required/label state down to the slotted form control. */
    private _syncSlottedControl() {
        const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
        if (!slot) return;
        const assigned = slot.assignedElements({ flatten: true });
        for (const node of assigned) {
            const el = node as HTMLElement & Record<string, unknown>;
            if ('error' in el) el.error = this.error;
            if ('disabled' in el) el.disabled = this.disabled;
            if ('required' in el) el.required = this.required;
            // Sync label for cross-shadow-DOM accessibility (<label for> can't cross shadow boundaries)
            if (this.label && 'label' in el) el.label = this.label;
        }
    }

    private _handleSlotChange() {
        this._syncSlottedControl();

        // Set the generated ID on the first slotted control for label association
        const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
        if (!slot) return;
        const assigned = slot.assignedElements({ flatten: true });
        if (assigned.length > 0) {
            const control = assigned[0] as HTMLElement;
            if (!control.id) {
                control.id = this._fieldId;
            }
        }
    }

    override render() {
        const hasLabel = Boolean(this.label);
        const showError = this.error && Boolean(this.errorMessage);
        const showHelper = !showError && Boolean(this.helperText);
        const descId = `${this._fieldId}-desc`;

        return html`
      <div class="form-field" part="base">
        ${hasLabel ? html`
          <div class="label-wrapper">
            <span class="label" part="label">
              <slot name="label">${this.label}</slot>
            </span>
            ${this.required ? html`<span class="required-indicator" aria-hidden="true">*</span>` : nothing}
          </div>
        ` : html`
          <slot name="label" @slotchange=${() => this.requestUpdate()}></slot>
        `}

        <div class="control" part="field">
          <slot @slotchange=${() => this._handleSlotChange()}></slot>
        </div>

        ${showError ? html`
          <p id=${descId} class="error-message" part="error-message" role="alert">
            <slot name="error-message">${this.errorMessage}</slot>
          </p>
        ` : showHelper ? html`
          <p id=${descId} class="helper-text" part="helper-text">
            <slot name="helper-text">${this.helperText}</slot>
          </p>
        ` : html`
          <slot name="helper-text"></slot>
          <slot name="error-message"></slot>
        `}
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-form-field': FlintFormField;
    }
}
