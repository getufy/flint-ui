import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import type { Orientation } from '../types.js';
import uiDividerStyles from './flint-divider.css?inline';

/**
 * A divider component that provides a thin line for grouping elements.
 *
 * @slot - Optional text or content to display within the divider.
 * @csspart base - The component's base wrapper element.
 */
export class FlintDivider extends FlintElement {
  static styles = unsafeCSS(uiDividerStyles);

  /**
   * Orientation of the divider line.
   * @default 'horizontal'
   */
  @property({ type: String, reflect: true }) orientation: Orientation = 'horizontal';
  /**
   * Inset variant controlling how far the divider extends.
   * @default 'full'
   */
  @property({ type: String }) variant: 'full' | 'middle' | 'inset' = 'full';
  /**
   * Thickness of the divider line.
   * @default 'light'
   */
  @property({ type: String }) weight: 'light' | 'medium' | 'heavy' = 'light';
  /**
   * Alignment of text content within the divider.
   * @default 'center'
   */
  @property({ type: String }) textAlign: 'left' | 'center' | 'right' = 'center';

  render() {
    return html`
      <div
        class="divider-container ${classMap({
      [`variant-${this.variant}`]: true,
      [`weight-${this.weight}`]: true
    })}"
        part="base"
        role="separator"
        aria-orientation="${this.orientation}"
      >
        ${this.textAlign !== 'left' || this.orientation === 'vertical' ? html`<div class="divider-line"></div>` : ''}

        <slot class="divider-content"></slot>

        ${this.textAlign !== 'right' || this.orientation === 'vertical' ? html`<div class="divider-line"></div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-divider': FlintDivider;
  }
}
