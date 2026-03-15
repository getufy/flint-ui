import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiCardStyles from './flint-card.css?inline';

/**
 * Card: a surface container for grouping related content.
 *
 * @csspart base - The outer card wrapper `<div>`.
 */
@customElement('flint-card')
export class FlintCard extends LitElement {
  static styles = unsafeCSS(uiCardStyles);

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
