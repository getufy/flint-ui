import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiTableContainerStyles from './ui-table-container.css?inline';
import uiTableStyles from './ui-table.css?inline';
import uiTableHeadStyles from './ui-table-head.css?inline';
import uiTableBodyStyles from './ui-table-body.css?inline';
import uiTableRowStyles from './ui-table-row.css?inline';
import uiTableCellStyles from './ui-table-cell.css?inline';
import uiTableFooterStyles from './ui-table-footer.css?inline';

/**
 * ui-table-container
 * @prop {boolean} shadow        - Stronger box-shadow elevation.
 * @prop {boolean} sticky-header - Sticks thead to top on scroll.
 */
@customElement('ui-table-container')
export class UiTableContainer extends LitElement {
  static styles = unsafeCSS(uiTableContainerStyles);
  @property({ type: Boolean, reflect: true }) shadow = false;
  @property({ type: Boolean, reflect: true, attribute: 'sticky-header' }) stickyHeader = false;
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table
 * @prop {'medium'|'small'} size - Cell padding density.
 */
@customElement('ui-table')
export class UiTable extends LitElement {
  static styles = unsafeCSS(uiTableStyles);
  @property({ type: String, reflect: true }) size: 'medium' | 'small' = 'medium';
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-head
 */
@customElement('ui-table-head')
export class UiTableHead extends LitElement {
  static styles = unsafeCSS(uiTableHeadStyles);
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-body
 * @prop {boolean} striped - Alternating row shading.
 */
@customElement('ui-table-body')
export class UiTableBody extends LitElement {
  static styles = unsafeCSS(uiTableBodyStyles);
  @property({ type: Boolean, reflect: true }) striped = false;
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-row
 * @prop {boolean} selected - Selected row highlight.
 * @prop {boolean} hover    - Force hover highlight.
 */
@customElement('ui-table-row')
export class UiTableRow extends LitElement {
  static styles = unsafeCSS(uiTableRowStyles);
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) hover = false;
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-cell
 * @prop {boolean}                    header  - Header cell styling.
 * @prop {'left'|'right'|'center'}    align   - Text alignment.
 * @prop {'normal'|'checkbox'|'none'} padding - Padding preset.
 */
@customElement('ui-table-cell')
export class UiTableCell extends LitElement {
  static styles = unsafeCSS(uiTableCellStyles);
  @property({ type: Boolean, reflect: true }) header = false;
  @property({ type: String, reflect: true }) align: 'left' | 'right' | 'center' = 'left';
  @property({ type: String, reflect: true }) padding: 'normal' | 'checkbox' | 'none' = 'normal';

  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-footer
 */
@customElement('ui-table-footer')
export class UiTableFooter extends LitElement {
  static styles = unsafeCSS(uiTableFooterStyles);
  render() { return html`<slot></slot>`; }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-table-container': UiTableContainer;
        'ui-table': UiTable;
        'ui-table-head': UiTableHead;
        'ui-table-body': UiTableBody;
        'ui-table-row': UiTableRow;
        'ui-table-cell': UiTableCell;
        'ui-table-footer': UiTableFooter;
    }
}
