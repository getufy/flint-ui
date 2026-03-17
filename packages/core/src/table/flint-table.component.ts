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
 * Scrollable container that wraps a `<flint-table>` to provide overflow handling,
 * optional elevation shadow, and sticky header support.
 *
 * @slot - Default slot accepts a `<flint-table>` element.
 *
 * @prop {boolean} shadow        - Applies a stronger box-shadow elevation.
 * @prop {boolean} sticky-header - Sticks `<flint-table-head>` to the top on scroll.
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
 * The main table element. Use inside a `<flint-table-container>` for scrolling
 * and sticky header support, or standalone for simple layouts.
 *
 * @slot - Accepts `<flint-table-head>`, `<flint-table-body>`, and `<flint-table-footer>`.
 *
 * @prop {'md'|'sm'} size - Cell padding density.
 */
export class FlintTable extends FlintElement {
  static styles = unsafeCSS(uiTableStyles);
  /** Cell padding density. */
  @property({ type: String, reflect: true }) size: 'md' | 'sm' = 'md';
  render() { return html`<slot></slot>`; }
}

/**
 * Groups header rows at the top of a `<flint-table>`. Rendered with a subtle
 * bottom border and bold text styling by default.
 *
 * @slot - Accepts one or more `<flint-table-row>` elements containing header cells.
 */
export class FlintTableHead extends FlintElement {
  static styles = unsafeCSS(uiTableHeadStyles);
  render() { return html`<slot></slot>`; }
}

/**
 * Groups body rows in a `<flint-table>`. Supports alternating row shading
 * via the `striped` attribute.
 *
 * @slot - Accepts one or more `<flint-table-row>` elements.
 *
 * @prop {boolean} striped - Enables alternating row background shading.
 */
export class FlintTableBody extends FlintElement {
  static styles = unsafeCSS(uiTableBodyStyles);
  /** Enables alternating row shading. */
  @property({ type: Boolean, reflect: true }) striped = false;
  render() { return html`<slot></slot>`; }
}

/**
 * A single row within a `<flint-table-head>`, `<flint-table-body>`,
 * or `<flint-table-footer>`. Supports selected and hover highlight states.
 *
 * @slot - Accepts one or more `<flint-table-cell>` elements.
 *
 * @prop {boolean} selected - Highlights the row as selected.
 * @prop {boolean} hover    - Forces the hover highlight state.
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
 * A single cell within a `<flint-table-row>`. Can render as a data cell
 * or a header cell via the `header` attribute. Supports text alignment
 * and padding presets.
 *
 * @slot - Cell content (text, icons, controls, etc.).
 *
 * @prop {boolean}                    header  - Renders the cell with header (th) styling.
 * @prop {'left'|'right'|'center'}    align   - Text alignment within the cell.
 * @prop {'normal'|'checkbox'|'none'} padding - Padding preset for the cell.
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
 * Footer section of a `<flint-table>`, typically used for summary rows,
 * pagination controls, or aggregate data.
 *
 * @slot - Accepts one or more `<flint-table-row>` elements or arbitrary footer content.
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
