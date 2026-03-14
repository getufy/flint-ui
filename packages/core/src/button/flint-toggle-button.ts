import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiToggleButtonStyles from './flint-toggle-button.css?inline';

@customElement('flint-toggle-button')
export class FlintToggleButton extends LitElement {
    static styles = unsafeCSS(uiToggleButtonStyles);

    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) value = '';
    @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

    private _handleClick() {
        if (this.disabled) return;

        this.dispatchEvent(new CustomEvent('flint-toggle-button-change', {
            detail: { value: this.value, selected: !this.selected },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
      <button
        type="button"
        class=${classMap({ selected: this.selected })}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        aria-pressed=${this.selected}
      >
        <slot></slot>
      </button>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-toggle-button': FlintToggleButton;
    }
}
