import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiToggleButtonStyles from './ui-toggle-button.css?inline';

@customElement('ui-toggle-button')
export class UiToggleButton extends LitElement {
    static styles = unsafeCSS(uiToggleButtonStyles);

    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) value = '';

    private _handleClick() {
        if (this.disabled) return;

        this.dispatchEvent(new CustomEvent('toggle-click', {
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
        'ui-toggle-button': UiToggleButton;
    }
}
