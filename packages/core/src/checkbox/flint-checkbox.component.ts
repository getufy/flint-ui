import { unsafeCSS, html, nothing, PropertyValues, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { FormAssociated } from '../mixins/form-associated.js';
import { FormControlController } from '../controllers/form-control.js';
import uiCheckboxStyles from './flint-checkbox.css?inline';

/**
 * Checkbox: a form control for boolean selection.
 *
 * @fires flint-checkbox-change - Fired when the checked state changes. detail: `{ checked: boolean; value: string; indeterminate: boolean }`
 */
export class FlintCheckbox extends FormAssociated(FlintElement) {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
    static styles = unsafeCSS(uiCheckboxStyles);

    private _formControl = new FormControlController(this);

    /** Current checked state (controlled). When set, the component reflects this state and does not manage its own state. */
    @property({ type: Boolean, reflect: true }) checked = false;
    /** Displays the checkbox in an indeterminate state. */
    @property({ type: Boolean }) indeterminate = false;
    /** Disables the checkbox and prevents interaction. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Marks the checkbox as required for form validation. */
    @property({ type: Boolean, reflect: true }) required = false;
    /**
     * Size of the checkbox control.
     * @default 'md'
     */
    @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
    /** Visible label text displayed next to the checkbox. */
    @property({ type: String }) label = '';
    /** Form field name used when submitting form data. */
    @property({ type: String }) name = '';
    /** Value submitted with form data when checked. */
    @property({ type: String }) value = 'on';
    /** Initial checked state (uncontrolled). Only used on first render; ignored after mount. */
    @property({ type: Boolean, attribute: 'default-checked' }) defaultChecked = false;
    /** Accessible label for screen readers when no visible label is provided. */
    @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

    protected override willUpdate(changed: PropertyValues) {
        super.willUpdate(changed);
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultChecked) {
                this.checked = true;
            }
        }
    }

    protected override updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('checked') || changed.has('value')) {
            this._initFormValue(this.checked ? this.value : null);
        }
        if (changed.has('checked') || changed.has('required')) {
            this._initFormValidity(this.required, !this.checked, 'Please check this box.');
        }
        this._formControl.updateDataAttributes();
    }

    private _handleChange(e: Event) {
        if (this.disabled) return;

        const target = e.target as HTMLInputElement;
        this.checked = target.checked;
        this.indeterminate = false;

        this.dispatchEvent(new CustomEvent('flint-checkbox-change', {
            detail: { checked: this.checked, value: this.value, indeterminate: false },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
      <label class=${classMap({ wrapper: true, disabled: this.disabled })} part="base">
        <input
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name || nothing}
          .value=${this.value}
          aria-label=${this.ariaLabel ?? nothing}
          @change=${this._handleChange}
        >
        <div class=${classMap({ checkbox: true, checked: this.checked, indeterminate: this.indeterminate })} part="control">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            ${this.indeterminate
                ? html`<line x1="4" y1="12" x2="20" y2="12"></line>`
                : html`<polyline points="20 6 9 17 4 12"></polyline>`
            }
          </svg>
        </div>
        ${this.label ? html`<span class="label" part="label">${this.label}</span>` : html`<slot class="label" part="label"></slot>`}
      </label>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-checkbox': FlintCheckbox;
    }
}
