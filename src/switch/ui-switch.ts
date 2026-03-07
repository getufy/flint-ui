import { LitElement, unsafeCSS, html, nothing, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiSwitchStyles from './ui-switch.css?inline';

let _uidCounter = 0;

/**
 * A Switch component for toggling settings.
 *
 * @fires ui-switch-change - Dispatched when the switch state changes. Detail: `{ checked: boolean }`
 * @slot icon-on - Optional icon to show when the switch is ON.
 * @slot icon-off - Optional icon to show when the switch is OFF.
 * @slot - Optional label content (used when the `label` prop is not set).
 */
@customElement('ui-switch')
export class UiSwitch extends LitElement {
    static formAssociated = true;

    static styles = unsafeCSS(uiSwitchStyles);

    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) required = false;
    @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
    @property({ type: String }) label = '';
    @property({ type: String }) name = '';
    @property({ type: String }) value = 'on';
    @property({ type: Boolean, attribute: 'default-checked' }) defaultChecked = false;
    @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

    private _internals: ElementInternals | null = null;
    private _firstUpdate = true;
    private readonly _labelId: string;

    constructor() {
        super();
        _uidCounter++;
        this._labelId = `ui-switch-label-${_uidCounter}`;
        if (typeof this.attachInternals === 'function') {
            this._internals = this.attachInternals();
        }
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
            this._internals?.setFormValue?.(this.checked ? this.value : null);
        }
        if (changed.has('checked') || changed.has('required')) {
            if (this.required && !this.checked) {
                this._internals?.setValidity?.({ valueMissing: true }, 'Please check this switch.');
            } else {
                this._internals?.setValidity?.({});
            }
        }
    }

    private _handleClick() {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('ui-switch-change', {
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

declare global {
    interface HTMLElementTagNameMap {
        'ui-switch': UiSwitch;
    }
}
