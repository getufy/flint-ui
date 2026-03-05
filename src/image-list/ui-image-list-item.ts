import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ImageFit = 'cover' | 'contain';

/**
 * A single item inside a `ui-image-list`.
 *
 * In standard/quilted/woven mode it renders as a grid cell.
 * For masonry mode it renders as a column-flow block.
 *
 * Use the `rows` and `cols` props to make an item span multiple cells
 * (effective in quilted and woven variants).
 *
 * Use `aspect-ratio` to control the cell's aspect ratio (e.g. "3/4" for portrait).
 * Use `fit` to control how the image fills the cell ("cover" or "contain").
 *
 * @slot       - Place an `<img>` or any content here.
 * @slot bar   - Place a `ui-image-list-item-bar` element here.
 */
@customElement('ui-image-list-item')
export class UiImageListItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }

    /* bar-position below: host becomes column-flex so bar sits below image */
    :host([bar-position="below"]) {
      display: flex;
      flex-direction: column;
      overflow: visible;
    }

    /* Masonry: let height follow image, avoid column breaks */
    :host(.masonry) {
      break-inside: avoid;
      margin-bottom: var(--ui-image-list-gap, 4px);
    }

    .item-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    :host([bar-position="below"]) .item-wrapper {
      flex: 1 1 auto;
      overflow: hidden;
    }

    /* Masonry: wrapper height follows content */
    :host(.masonry) .item-wrapper {
      height: auto;
    }

    ::slotted(img) {
      width: 100%;
      height: 100%;
      object-fit: var(--ui-image-fit, cover);
      display: block;
    }

    /* Masonry images: natural height */
    :host(.masonry) ::slotted(img) {
      height: auto;
    }

    /* Bar overlay: pinned to bottom of :host (not wrapper) */
    ::slotted(ui-image-list-item-bar) {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    /* Bar at top of image */
    ::slotted(ui-image-list-item-bar[position="top"]) {
      bottom: auto;
      top: 0;
    }

    /* Bar below image: static flow */
    :host([bar-position="below"]) ::slotted(ui-image-list-item-bar) {
      position: static;
    }
  `;

  /** How many grid rows this item spans (quilted/woven only) */
  @property({ type: Number }) rows = 1;

  /** How many grid columns this item spans (quilted/woven only) */
  @property({ type: Number }) cols = 1;

  /** Position of the title bar: 'overlay' (default) or 'below' */
  @property({ type: String, attribute: 'bar-position', reflect: true })
  barPosition: 'overlay' | 'below' = 'overlay';

  /** Woven variant: 'odd' or 'even' identity for alternating height */
  @property({ type: String }) weave: 'odd' | 'even' = 'odd';

  /**
   * CSS aspect-ratio for the cell (e.g. "1/1", "4/3", "3/4", "16/9", "9/16").
   * Set to "auto" (default) to let the grid row height control cell size.
   */
  @property({ type: String, attribute: 'aspect-ratio', reflect: true })
  aspectRatio = 'auto';

  /**
   * How the image fills the cell: 'cover' (default, crops to fill)
   * or 'contain' (letterboxes to fit without cropping).
   */
  @property({ type: String }) fit: ImageFit = 'cover';

  connectedCallback() {
    super.connectedCallback();
    this._applyHostStyles();
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    this._applyHostStyles();
  }

  private _applyHostStyles() {
    // Grid row span — reset when back to 1
    const parent = this.closest('ui-image-list');
    const variant = parent?.getAttribute('variant');

    if (variant === 'woven') {
      this.style.gridRow = this.weave === 'odd' ? 'span 2' : 'span 1';
    } else if (this.rows > 1) {
      this.style.gridRow = `span ${this.rows}`;
    } else {
      this.style.gridRow = '';
    }

    if (this.cols > 1) {
      this.style.gridColumn = `span ${this.cols}`;
    } else {
      this.style.gridColumn = '';
    }

    // Masonry class for CSS selector targeting
    if (variant === 'masonry') {
      // eslint-disable-next-line wc/no-self-class
      this.classList.add('masonry');
    } else {
      // eslint-disable-next-line wc/no-self-class
      this.classList.remove('masonry');
    }

    // Aspect ratio on host
    this.style.aspectRatio = this.aspectRatio !== 'auto' ? this.aspectRatio : '';

    // Object-fit via CSS custom property (inherited by ::slotted img rule)
    this.style.setProperty('--ui-image-fit', this.fit);
  }

  render() {
    return html`
      <div class="item-wrapper">
        <slot></slot>
      </div>
      <slot name="bar"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-image-list-item': UiImageListItem;
  }
}
