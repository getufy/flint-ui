import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

export type ImageListVariant = 'standard' | 'quilted' | 'woven' | 'masonry';

/**
 * A container that displays images in an organized grid layout.
 * Supports standard, quilted, woven, and masonry variants.
 *
 * @slot - Place `ui-image-list-item` elements here.
 */
@customElement('ui-image-list')
export class UiImageList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .image-list {
      display: grid;
      overflow: hidden;
      box-sizing: border-box;
    }

    /* Standard: uniform grid, items crop to fill each cell */
    .variant-standard {
      grid-auto-rows: var(--ui-image-list-row-height, 164px);
    }

    /* Quilted: same column grid, items can span multiple rows/cols */
    .variant-quilted {
      grid-auto-rows: var(--ui-image-list-row-height, 164px);
    }

    /* Woven: alternating heights, set via nth-child in items */
    .variant-woven {
      grid-auto-rows: var(--ui-image-list-row-height, 164px);
    }

    /* Masonry: CSS columns-based layout — column-count set inline */
    .variant-masonry {
      display: block;
    }
  `;

  /** Layout variant */
  @property({ type: String }) variant: ImageListVariant = 'standard';

  /** Number of columns */
  @property({ type: Number }) cols = 3;

  /** Gap between items (in px) */
  @property({ type: Number }) gap = 4;

  /** Row height for non-masonry variants (in px). Ignored when autoRows=true. */
  @property({ type: Number }) rowHeight = 164;

  /** When true, row height is automatic (use with bar-position="below") */
  @property({ type: Boolean }) autoRows = false;

  render() {
    const isMasonry = this.variant === 'masonry';

    const styles: Record<string, string> = {};

    if (isMasonry) {
      styles['column-count'] = String(this.cols);
      styles['column-gap'] = `${this.gap}px`;
    } else {
      styles['grid-template-columns'] = `repeat(${this.cols}, 1fr)`;
      styles['gap'] = `${this.gap}px`;
      styles['--ui-image-list-row-height'] = `${this.rowHeight}px`;
      styles['grid-auto-rows'] = this.autoRows ? 'auto' : `${this.rowHeight}px`;
    }

    // Pass gap to child items via CSS custom property
    styles['--ui-image-list-gap'] = `${this.gap}px`;

    return html`
      <ul class="image-list variant-${this.variant}" style="${styleMap(styles)}" role="list">
        <slot></slot>
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-image-list': UiImageList;
  }
}
