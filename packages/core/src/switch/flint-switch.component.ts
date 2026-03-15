import { unsafeCSS, html, nothing, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { FormAssociated } from '../mixins/form-associated.js';
import uiSwitchStyles from './flint-switch.css?inline';

let _uidCounter = 0;

/**
 * A Switch component for toggling settings.
 *
 * @fires flint-switch-change - Dispatched when the switch state changes. Detail: `{ checked: boolean }`
 * @slot icon-on - Optional icon to show when the switch is ON.
 * @slot icon-off - Optional icon to show when the switch is OFF.
 * @slot - Optional label content (used when the `label` prop is not set).
 */
export class FlintSwitch extends FormAssociated(FlintElement) {
    static styles = unsafeCSS(uiSwitchStyles);

    /** Whether the switch is toggled on. */
    @property({ type: Boolean, reflect: true }) checked = false;
    /** Disables the switch and prevents interaction. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Marks the switch as required for form validation. */
    @property({ type: Boolean, reflect: true }) required = false;
    /** Size of the switch control. */
    @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
    /** Visible label text displayed next to the switch. */
    @property({ type: String }) label = '';
    /** Form field name used when submitting form data. */
    @property({ type: String }) name = '';
    /** Value submitted with form data when checked. */
    @property({ type: String }) value = 'on';
    /** Initial checked state for uncontrolled usage. */
    @property({ type: Boolean, attribute: 'default-checked' }) defaultChecked = false;
    /** Accessible label for screen readers when no visible label is provided. */
    @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

    private readonly _labelId: string;

    constructor() {
        super();
        _uidCounter++;
        this._labelId = `flint-switch-label-${_uidCounter}`;
    }

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
            this._initFormValidity(this.required, !this.checked, 'Please check this switch.');
        }
    }

    private _handleClick() {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('flint-switch-change', {
            detail: { checked: this.checked },
            bubbles: true,
            composed: true,
        }));
    }

    override render() {
        const hasLabel = Boolean(this.label);
        return html`
      <div class="wrapper" @click=${this._handleClick}>
        <div
          class=${classMap({ switch: true, checked: this.checked, disabled: this.disabled })}
          role="switch"
          aria-checked=${this.checked ? 'true' : 'false'}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          aria-required=${this.required ? 'true' : 'false'}
          aria-label=${this.ariaLabel ?? nothing}
          aria-labelledby=${hasLabel ? this._labelId : nothing}
          .tabIndex=${this.disabled ? -1 : 0}
          @keydown=${(e: KeyboardEvent) => (e.key === ' ' || e.key === 'Enter') && this._handleClick()}
        >
          <div class="thumb">
            <div class="icon-wrapper">
              ${this.checked ? html`<slot name="icon-on"></slot>` : html`<slot name="icon-off"></slot>`}
            </div>
          </div>
        </div>
        ${hasLabel
            ? html`<span id=${this._labelId} class=${classMap({ label: true, disabled: this.disabled })}>${this.label}</span>`
            : html`<slot></slot>`}
      </div>
    `;
    }
}