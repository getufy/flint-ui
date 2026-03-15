import { unsafeCSS, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { PropertyValues } from 'lit';
import uiTablePaginationStyles from './flint-table-pagination.css?inline';
import { FlintElement } from '../flint-element.js';

/**
 * Table Pagination: pagination controls for tabular data.
 *
 * @fires flint-pagination-page-change - Fired when the current page changes.
 * @fires flint-pagination-rows-per-page-change - Fired when rows per page changes.
 */
export class FlintTablePagination extends FlintElement {
    static styles = unsafeCSS(uiTablePaginationStyles);

    /** Total number of rows. */
    @property({ type: Number }) count = 0;
    /** Controlled current page (0-indexed). */
    @property({ type: Number }) page = 0;
    /** Controlled rows per page. */
    @property({ type: Number }) rowsPerPage = 10;
    /** Available rows-per-page options. */
    @property({ type: Array }) rowsPerPageOptions: number[] = [5, 10, 25];
    /** Uncontrolled default page (applied on first render). */
    @property({ type: Number, attribute: 'default-page' }) defaultPage = 0;
    /** Uncontrolled default rows per page. */
    @property({ type: Number, attribute: 'default-rows-per-page' }) defaultRowsPerPage = -1;
    /** Show First/Last page buttons. */
    @property({ type: Boolean, attribute: 'show-first-last' }) showFirstLast = false;
    /** Label for the rows-per-page selector. */
    @property({ type: String, attribute: 'label-rows-per-page' }) labelRowsPerPage = 'Rows per page:';

    @state() private _page = 0;
    @state() private _rowsPerPage = 10;

    private _firstUpdate = true;

    willUpdate(changed: PropertyValues) {
        if (this._firstUpdate) {
            this._firstUpdate = false;
            this._page = this.defaultPage > 0 ? this.defaultPage : this.page;
            this._rowsPerPage = this.defaultRowsPerPage > 0 ? this.defaultRowsPerPage : this.rowsPerPage;
            return;
        }
        // Sync controlled props when they change externally after first render
        if (changed.has('page')) this._page = this.page;
        if (changed.has('rowsPerPage')) this._rowsPerPage = this.rowsPerPage;
    }

    private _go(delta: number) {
        const next = this._page + delta;
        this._page = next;
        this.dispatchEvent(new CustomEvent('flint-pagination-page-change', {
            detail: { page: next },
            bubbles: true,
            composed: true
        }));
    }

    private _goTo(p: number) {
        this._page = p;
        this.dispatchEvent(new CustomEvent('flint-pagination-page-change', {
            detail: { page: p },
            bubbles: true,
            composed: true
        }));
    }

    private _handleRowChange(e: Event) {
        const val = parseInt((e.target as HTMLSelectElement).value);
        this._rowsPerPage = val;
        this._page = 0;
        this.dispatchEvent(new CustomEvent('flint-pagination-rows-per-page-change', {
            detail: { rowsPerPage: val },
            bubbles: true,
            composed: true
        }));
    }

    private get _lastPage() {
        return Math.max(0, Math.ceil(this.count / this._rowsPerPage) - 1);
    }

    render() {
        const from = this._page * this._rowsPerPage + 1;
        const to = Math.min(this.count, (this._page + 1) * this._rowsPerPage);
        const isFirst = this._page === 0;
        const isLast = to >= this.count;

        return html`
      <div class="spacer"></div>
      <div class="actions">
        <span>${this.labelRowsPerPage}</span>
        <select @change=${this._handleRowChange} aria-label="${this.labelRowsPerPage}">
          ${this.rowsPerPageOptions.map(opt => html`
            <option value=${opt} ?selected=${this._rowsPerPage === opt}>${opt}</option>
          `)}
        </select>
        <span>${from}-${to} of ${this.count}</span>
        <div class="nav-buttons">
          ${this.showFirstLast ? html`
            <button ?disabled=${isFirst} @click=${() => this._goTo(0)} aria-label="First page">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg>
            </button>
          ` : ''}
          <button ?disabled=${isFirst} @click=${() => this._go(-1)} aria-label="Previous page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <button ?disabled=${isLast} @click=${() => this._go(1)} aria-label="Next page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
          ${this.showFirstLast ? html`
            <button ?disabled=${isLast} @click=${() => this._goTo(this._lastPage)} aria-label="Last page">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-table-pagination': FlintTablePagination;
    }
}
