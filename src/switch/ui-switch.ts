import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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

    static styles = css`
    :host {
      display: inline-block;
      --ui-switch-width: 52px;
      --ui-switch-height: 32px;
      --ui-switch-thumb-size: 24px;
      --ui-switch-thumb-offset: 4px;
      --ui-switch-bg: var(--ui-secondary-color, #6b7280);
      --ui-switch-bg-on: var(--ui-primary-color, #3b82f6);
      --ui-switch-thumb-bg: #ffffff;

      font-family: var(--ui-font-family, sans-serif);
      cursor: pointer;
    }

    :host([disabled]) {
      cursor: not-allowed;
    }

    :host([size="sm"]) {
      --ui-switch-width: 36px;
      --ui-switch-height: 22px;
      --ui-switch-thumb-size: 16px;
      --ui-switch-thumb-offset: 3px;
    }

    :host([size="lg"]) {
      --ui-switch-width: 64px;
      --ui-switch-height: 38px;
      --ui-switch-thumb-size: 30px;
      --ui-switch-thumb-offset: 4px;
    }

    .wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      user-select: none;
    }

    .switch {
      position: relative;
      width: var(--ui-switch-width);
      height: var(--ui-switch-height);
      background-color: var(--ui-switch-bg);
      border-radius: calc(var(--ui-switch-height) / 2);
      transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
    }

    .switch.checked {
      background-color: var(--ui-switch-bg-on);
    }

    .thumb {
      position: absolute;
      top: var(--ui-switch-thumb-offset);
      left: var(--ui-switch-thumb-offset);
      width: var(--ui-switch-thumb-size);
      height: var(--ui-switch-thumb-size);
      background-color: var(--ui-switch-thumb-bg);
      border-radius: 50%;
      box-shadow: var(--ui-shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ui-text-color-muted, #6b7280);
    }

    .switch.checked .thumb {
      transform: translateX(calc(var(--ui-switch-width) - var(--ui-switch-thumb-size) - (var(--ui-switch-thumb-offset) * 2)));
      color: var(--ui-primary-color, #3b82f6);
    }

    .label {
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--ui-text-color, #111827);
    }

    .label.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .switch.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .switch:focus-visible {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 2px;
    }

    .icon-wrapper {
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

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
