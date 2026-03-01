import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * ui-table-container
 */
@customElement('ui-table-container')
export class UiTableContainer extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow-x: auto;
      background-color: var(--ui-surface-background, white);
      border-radius: var(--ui-border-radius-lg, 8px);
      box-shadow: var(--ui-shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
    }
    :host([shadow]) {
      box-shadow: var(--ui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
    }
  `;
  @property({ type: Boolean, reflect: true }) shadow = false;
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table
 */
@customElement('ui-table')
export class UiTable extends LitElement {
  static styles = css`
    :host {
      display: table;
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
    }
  `;
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-head
 */
@customElement('ui-table-head')
export class UiTableHead extends LitElement {
  static styles = css`
    :host {
      display: table-header-group;
    }
  `;
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-body
 */
@customElement('ui-table-body')
export class UiTableBody extends LitElement {
  static styles = css`
    :host {
      display: table-row-group;
    }
  `;
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-row
 */
@customElement('ui-table-row')
export class UiTableRow extends LitElement {
  static styles = css`
    :host {
      display: table-row;
      vertical-align: middle;
      outline: 0;
      transition: background-color 0.2s ease;
    }
    :host(:hover) {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
    }
    :host([selected]) {
      background-color: var(--ui-active-color, rgba(59, 130, 246, 0.08));
    }
  `;
  @property({ type: Boolean, reflect: true }) selected = false;
  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-cell
 */
@customElement('ui-table-cell')
export class UiTableCell extends LitElement {
  static styles = css`
    :host {
      display: table-cell;
      padding: 16px;
      font-size: 0.875rem;
      text-align: left;
      border-bottom: 1px solid var(--ui-border-color, #e5e7eb);
    }
    :host([header]) {
      color: var(--ui-text-color-muted, #6b7280);
      font-weight: 600;
      line-height: 1.5rem;
    }
    :host([align="right"]) { text-align: right; }
    :host([align="center"]) { text-align: center; }
    :host([padding="checkbox"]) { width: 48px; padding: 0 0 0 4px; }
  `;
  @property({ type: Boolean, reflect: true }) header = false;
  @property({ type: String, reflect: true }) align: 'left' | 'right' | 'center' = 'left';

  render() { return html`<slot></slot>`; }
}

/**
 * ui-table-footer
 */
@customElement('ui-table-footer')
export class UiTableFooter extends LitElement {
  static styles = css`
    :host {
      display: table-footer-group;
    }
  `;
  render() { return html`<slot></slot>`; }
}
