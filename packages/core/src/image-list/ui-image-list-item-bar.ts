import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiImageListItemBarStyles from './ui-image-list-item-bar.css?inline';

/**
 * A title/subtitle bar for `ui-image-list-item`.
 *
 * Overlay positions ('bottom', 'top'): gradient over the image.
 * 'below': solid background, placed outside the image area.
 *
 * Positioning relative to the image is controlled by `bar-position` on
 * the parent `ui-image-list-item`; `position` on the bar controls styling.
 *
 * @slot          - Title text
 * @slot subtitle - Subtitle text
 * @slot action   - An icon button or secondary action
 */
@customElement('ui-image-list-item-bar')
export class UiImageListItemBar extends LitElement {
  static styles = unsafeCSS(uiImageListItemBarStyles);

  /** Position hint for styling: 'bottom' (default overlay), 'top' (overlay), or 'below' (solid) */
  @property({ type: String, reflect: true }) position: 'bottom' | 'top' | 'below' = 'bottom';

  render() {
    return html`
      <div class="bar-inner">
        <div class="bar-text">
          <div class="bar-title"><slot></slot></div>
          <div class="bar-subtitle"><slot name="subtitle"></slot></div>
        </div>
        <div class="bar-action">
          <slot name="action"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-image-list-item-bar': UiImageListItemBar;
  }
}
