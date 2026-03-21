import { unsafeCSS, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiCardStyles from './flint-card.css?inline';

/**
 * A card container with optional interactive behavior.
 *
 * @fires flint-card-click - Fired when an interactive card is clicked or activated via keyboard (Enter/Space).
 *
 * @slot - Card content (header, content, actions, media sub-components).
 * @csspart base - The card wrapper div.
 */
export class FlintCard extends FlintElement {
  static styles = unsafeCSS(uiCardStyles);

  /**
   * Visual style variant of the card.
   * @default 'elevated'
   */
  @property({ type: String, reflect: true })
  variant: 'elevated' | 'outlined' | 'flat' = 'elevated';

  @property({ type: Boolean, reflect: true })
  interactive = false;

  private _handleClick() {
    if (this.interactive) {
      this.dispatchEvent(new CustomEvent('flint-card-click', { bubbles: true, composed: true }));
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('flint-card-click', { bubbles: true, composed: true }));
    }
  }

  render() {
    const classes = {
      card: true,
      [`variant-${this.variant}`]: true,
      interactive: this.interactive,
    };

    return html`
      <div
        class=${classMap(classes)}
        part="base"
        tabindex=${this.interactive ? '0' : nothing}
        role=${this.interactive ? 'button' : nothing}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-card': FlintCard;
  }
}
