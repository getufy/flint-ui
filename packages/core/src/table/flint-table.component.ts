import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import uiTableContainerStyles from './flint-table-container.css?inline';
import uiTableStyles from './flint-table.css?inline';
import uiTableHeadStyles from './flint-table-head.css?inline';
import uiTableBodyStyles from './flint-table-body.css?inline';
import uiTableRowStyles from './flint-table-row.css?inline';
import uiTableCellStyles from './flint-table-cell.css?inline';
import uiTableFooterStyles from './flint-table-footer.css?inline';
import { FlintElement } from '../flint-element.js';

/**
 * flint-table-container
 * @prop {boolean} shadow        - Stronger box-shadow elevation.
 * @prop {boolean} sticky-header - Sticks thead to top on scroll.
 */
export class FlintTableContainer extends FlintElement {
  static styles = unsafeCSS(uiTableContainerStyles);
  /** Applies a stronger box-shadow elevation. */
  @property({ type: Boolean, reflect: true }) shadow = false;
  /** Sticks the table header to the top on scroll. */
  @property({ type: Boolean, reflect: true, attribute: 'sticky-header' }) stickyHeader = false;
  render() { return html`<slot></slot>`; }
}

/**
 * flint-table
 * @prop {'medium'|'small'} size - Cell padding density.
 */
export class FlintTable extends FlintElement {
  static styles = unsafeCSS(uiTableStyles);
  /** Cell padding density. */
  @property({ type: String, reflect: true }) size: 'md' | 'sm' = 'md';
  render() { return html`<slot></slot>`; }
}

/**
 * flint-table-head
 */
export class FlintTableHead extends FlintElement {
  static styles = unsafeCSS(uiTableHeadStyles);
  render() { return html`<slot></slot>`; }
}

/**
 * flint-table-body
 * @prop {boolean} striped - Alternating row shading.
 */
export class FlintTableBody extends FlintElement {
  static styles = unsafeCSS(uiTableBodyStyles);
  /** Enables alternating row shading. */
  @property({ type: Boolean, reflect: true }) striped = false;
  render() { return html`<slot></slot>`; }
}

/**
 * flint-table-row
 * @prop {boolean} selected - Selected row highlight.
 * @prop {boolean} hover    - Force hover highlight.
 */
export class FlintTableRow extends FlintElement {
  static styles = unsafeCSS(uiTableRowStyles);
  /** Highlights the row as selected. */
  @property({ type: Boolean, reflect: true }) selected = false;
  /** Forces hover highlight on the row. */
  @property({ type: Boolean, reflect: true }) hover = false;
  render() { return html`<slot></slot>`; }
}

/**
 * flint-table-cell
 * @prop {boolean}                    header  - Header cell styling.
 * @prop {'left'|'right'|'center'}    align   - Text alignment.
 * @prop {'normal'|'checkbox'|'none'} padding - Padding preset.
 */
export class FlintTableCell extends FlintElement {
  static styles = unsafeCSS(uiTableCellStyles);
  /** Renders the cell with header styling. */
  @property({ type: Boolean, reflect: true }) header = false;
  /** Text alignment within the cell. */
  @property({ type: String, reflect: true }) align: 'left' | 'right' | 'center' = 'left';
  /** Padding preset for the cell. */
  @property({ type: String, reflect: true }) padding: 'normal' | 'checkbox' | 'none' = 'normal';

  render() { return html`<slot></slot>`; }
}

/**
 * flint-table-footer
 */
export class FlintTableFooter extends FlintElement {
  static styles = unsafeCSS(uiTableFooterStyles);
  render() { return html`<slot></slot>`; }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-table-container': FlintTableContainer;
        'flint-table': FlintTable;
        'flint-table-head': FlintTableHead;
        'flint-table-body': FlintTableBody;
        'flint-table-row': FlintTableRow;
        'flint-table-cell': FlintTableCell;
        'flint-table-footer': FlintTableFooter;
    }
}
