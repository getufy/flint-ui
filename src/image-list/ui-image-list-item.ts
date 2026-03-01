import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * A single item inside a `ui-image-list`.
 *
 * In standard/quilted/woven mode it renders as a grid cell.
 * For masonry mode it renders as a column-flow block.
 *
 * Use the `rows` and `cols` props to make an item span multiple cells
 * (effective in quilted and woven variants).
 *
 * @slot img   - Place an `<img>` element here.
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

    /* bar-position below: switch host to column flex so bar sits below */
    :host([bar-position="below"]) {
      display: flex;
      flex-direction: column;
      overflow: visible;
    }

    .item-wrapper {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    /* Masonry: let height follow the image aspect ratio */
    :host(.masonry) .item-wrapper {
      height: auto;
      break-inside: avoid;
      margin-bottom: var(--ui-image-list-gap, 4px);
    }

    /* Default image slot styling */
    ::slotted(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Masonry: images resize naturally */
    :host(.masonry) ::slotted(img) {
      height: auto;
      object-fit: contain;
    }

    /* Bar slot: pinned at bottom by default */
    ::slotted(ui-image-list-item-bar) {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    /* Bar below: place bar outside the image area */
    :host([bar-position="below"]) {
      display: flex;
      flex-direction: column;
    }

    :host([bar-position="below"]) .item-wrapper {
      flex: 1;
    }

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

  connectedCallback() {
    super.connectedCallback();
    // Apply grid span styles to the host element so the parent CSS grid picks them up
    this._applyGridSpan();
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    this._applyGridSpan();
  }

  private _applyGridSpan() {
    if (this.rows > 1) {
      this.style.gridRow = `span ${this.rows}`;
    }
    if (this.cols > 1) {
      this.style.gridColumn = `span ${this.cols}`;
    }

    // Detect masonry parent
    const parent = this.closest('ui-image-list');
    if (parent && parent.getAttribute('variant') === 'masonry') {
      // eslint-disable-next-line wc/no-self-class
      this.classList.add('masonry');
    } else {
      // eslint-disable-next-line wc/no-self-class
      this.classList.remove('masonry');
    }

    // Woven: alternate heights via row spans
    if (parent && parent.getAttribute('variant') === 'woven') {
      this.style.gridRow = this.weave === 'odd' ? 'span 2' : 'span 1';
    }
  }

  render() {
    const styles: Record<string, string> = {};
    if (this.rows > 1) {
      styles['grid-row'] = `span ${this.rows}`;
    }
    if (this.cols > 1) {
      styles['grid-column'] = `span ${this.cols}`;
    }

    return html`
      <li class="item-wrapper" style="${styleMap(styles)}">
        <slot name="img"><slot></slot></slot>
        <slot name="bar"></slot>
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-image-list-item': UiImageListItem;
  }
}
