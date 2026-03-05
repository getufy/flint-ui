import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%);
      color: #fff;
      padding: 12px 12px 8px;
      font-family: var(--ui-font-family, system-ui, sans-serif);
    }

    /* Top overlay: gradient flows downward */
    :host([position="top"]) {
      background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%);
      padding: 8px 12px 12px;
    }

    /* Below-image mode: solid background */
    :host([position="below"]) {
      background: var(--ui-surface-color, #fff);
      color: var(--ui-text-color, #111827);
      border-top: 1px solid var(--ui-border-color, #e5e7eb);
      padding: 8px 12px;
    }

    .bar-inner {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bar-text {
      flex: 1;
      min-width: 0;
    }

    .bar-title {
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .bar-subtitle {
      font-size: 0.75rem;
      font-weight: 400;
      opacity: 0.8;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 2px;
    }

    .bar-action {
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    ::slotted([slot="action"]) {
      color: #fff;
    }

    :host([position="below"]) ::slotted([slot="action"]) {
      color: var(--ui-text-color, #111827);
    }
  `;

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
