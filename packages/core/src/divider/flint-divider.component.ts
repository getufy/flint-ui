import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiDividerStyles from './flint-divider.css?inline';

/**
 * A divider component that provides a thin line for grouping elements.
 *
 * @slot - Optional text or content to display within the divider.
 */
export class FlintDivider extends FlintElement {
  static styles = unsafeCSS(uiDividerStyles);

  /** Orientation of the divider line. */
  @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  /** Inset variant controlling how far the divider extends. */
  @property({ type: String }) variant: 'full' | 'middle' | 'inset' = 'full';
  /** Thickness of the divider line. */
  @property({ type: String }) weight: 'light' | 'medium' | 'heavy' = 'light';
  /** Alignment of text content within the divider. */
  @property({ type: String }) textAlign: 'left' | 'center' | 'right' = 'center';

  render() {
    return html`
      <div
        class="divider-container ${classMap({
      [`variant-${this.variant}`]: true,
      [`weight-${this.weight}`]: true
    })}"
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
