import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiCardStyles from './flint-card.css?inline';

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

  render() {
    const classes = {
      card: true,
      [`variant-${this.variant}`]: true,
      interactive: this.interactive,
    };

    return html`
      <div class=${classMap(classes)} part="base">
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
