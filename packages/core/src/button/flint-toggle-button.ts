import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiToggleButtonStyles from './flint-toggle-button.css?inline';

/**
 * Toggle Button: a button that can be toggled on/off.
 *
 * @fires flint-toggle-button-change - Fired when the button's selected state changes.
 */
@customElement('flint-toggle-button')
export class FlintToggleButton extends LitElement {
    static styles = unsafeCSS(uiToggleButtonStyles);

    /** Whether the button is currently selected (pressed). */
    @property({ type: Boolean, reflect: true }) selected = false;
    /** Whether the button is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Value associated with this toggle button. */
    @property({ type: String }) value = '';
    /** Size variant of the toggle button. */
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
