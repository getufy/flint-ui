import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FlintElement } from '../flint-element.js';
import uiImageListStyles from './flint-image-list.css?inline';

export type ImageListVariant = 'standard' | 'quilted' | 'woven' | 'masonry';

/**
 * A container that displays images in an organized grid layout.
 * Supports standard, quilted, woven, and masonry variants.
 *
 * @slot - Place `flint-image-list-item` elements here.
 */
export class FlintImageList extends FlintElement {
  static styles = unsafeCSS(uiImageListStyles);

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
      styles['--flint-image-list-row-height'] = `${this.rowHeight}px`;
      styles['grid-auto-rows'] = this.autoRows ? 'auto' : `${this.rowHeight}px`;
    }

    // Pass gap to child items via CSS custom property
    styles['--flint-image-list-gap'] = `${this.gap}px`;

    return html`
      <ul class="image-list variant-${this.variant}" part="base" style="${styleMap(styles)}" role="list">
        <slot></slot>
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-image-list': FlintImageList;
  }
}
