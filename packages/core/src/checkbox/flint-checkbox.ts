import { LitElement, unsafeCSS, html, nothing, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FormAssociated } from '../mixins/form-associated.js';
import uiCheckboxStyles from './flint-checkbox.css?inline';

@customElement('flint-checkbox')
export class FlintCheckbox extends FormAssociated(LitElement) {
    static styles = unsafeCSS(uiCheckboxStyles);

    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean }) indeterminate = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) required = false;
    @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
    @property({ type: String }) label = '';
    @property({ type: String }) name = '';
    @property({ type: String }) value = 'on';
    @property({ type: Boolean, attribute: 'default-checked' }) defaultChecked = false;
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
      <label class=${classMap({ wrapper: true, disabled: this.disabled })}>
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
        <div class=${classMap({ checkbox: true, checked: this.checked, indeterminate: this.indeterminate })}>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            ${this.indeterminate
                ? html`<line x1="4" y1="12" x2="20" y2="12"></line>`
                : html`<polyline points="20 6 9 17 4 12"></polyline>`
            }
          </svg>
        </div>
        ${this.label ? html`<span class="label">${this.label}</span>` : html`<slot class="label"></slot>`}
      </label>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-checkbox': FlintCheckbox;
    }
}
