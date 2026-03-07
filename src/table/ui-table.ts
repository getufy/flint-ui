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
 */
@customElement('ui-table-container')
export class UiTableContainer extends LitElement {
  static styles = unsafeCSS(uiTableContainerStyles);
  @property({ type: Boolean, reflect: true }) shadow = false;
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table
 */
@customElement('ui-table')
export class UiTable extends LitElement {
  static styles = unsafeCSS(uiTableStyles);
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
 */
@customElement('ui-table-body')
export class UiTableBody extends LitElement {
  static styles = unsafeCSS(uiTableBodyStyles);
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-row
 */
@customElement('ui-table-row')
export class UiTableRow extends LitElement {
  static styles = unsafeCSS(uiTableRowStyles);
  @property({ type: Boolean, reflect: true }) selected = false;
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-cell
 */
@customElement('ui-table-cell')
export class UiTableCell extends LitElement {
  static styles = unsafeCSS(uiTableCellStyles);
  @property({ type: Boolean, reflect: true }) header = false;
  @property({ type: String, reflect: true }) align: 'left' | 'right' | 'center' = 'left';

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
