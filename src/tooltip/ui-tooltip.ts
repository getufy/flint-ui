import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiTooltipStyles from './ui-tooltip.css?inline';

/**
 * ui-tooltip
 * A component that displays a text label when users hover over or focus on an element.
 */
@customElement('ui-tooltip')
export class UiTooltip extends LitElement {
    static styles = unsafeCSS(uiTooltipStyles);

    @property({ type: String }) label = '';
    @property({ type: String }) placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
    @property({ type: Boolean }) arrow = false;
    @property({ type: Boolean, reflect: true }) disabled = false;

    @state() private _visible = false;

    private _show() {
        if (this.disabled || !this.label) return;
        this._visible = true;
    }

    private _hide() {
        this._visible = false;
    }

    render() {
        return html`
      <div 
        class="tooltip-container"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focusin=${this._show}
        @focusout=${this._hide}
      >
        <slot></slot>
        <div class=${classMap({
            'tooltip-popup': true,
            [this.placement]: true,
            'visible': this._visible
        })}>
          ${this.label}
          ${this.arrow ? html`<div class="arrow"></div>` : ''}
        </div>
      </div>
    `;
    }
}
