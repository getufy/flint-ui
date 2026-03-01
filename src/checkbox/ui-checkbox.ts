import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ui-checkbox')
export class UiCheckbox extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
    }

    .wrapper {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }

    .wrapper.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .checkbox {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border: 2px solid var(--ui-input-border-color, #d1d5db);
      border-radius: var(--ui-border-radius-sm, 4px);
      background-color: var(--ui-surface-background, white);
      transition: all 0.2s ease;
      margin-right: 8px;
    }

    .wrapper:hover:not(.disabled) .checkbox {
      border-color: var(--ui-primary-color, #3b82f6);
    }

    .checkbox.checked, .checkbox.indeterminate {
      background-color: var(--ui-primary-color, #3b82f6);
      border-color: var(--ui-primary-color, #3b82f6);
    }

    .icon {
      fill: none;
      stroke: var(--ui-text-color-on-primary, white);
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      width: 12px;
      height: 12px;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .checked .icon, .indeterminate .icon {
      opacity: 1;
      transform: scale(1);
    }

    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;
    }

    /* Focus ring for accessibility */
    input:focus-visible + .checkbox {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 2px;
    }

    .label {
      font-size: 14px;
      line-height: 1.5;
      user-select: none;
    }

    /* Style when no label and no slot text is passed */
    ::slotted(*), .label {
      cursor: inherit;
    }
  `;

    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean }) indeterminate = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean }) required = false;
    @property({ type: String }) label = '';
    @property({ type: String }) name = '';
    @property({ type: String }) value = '';

    private _handleChange(e: Event) {
        if (this.disabled) return;

        const target = e.target as HTMLInputElement;
        this.checked = target.checked;
        this.indeterminate = false;

        this.dispatchEvent(new CustomEvent('change', {
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
        'ui-checkbox': UiCheckbox;
    }
}
