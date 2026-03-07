import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiTablePaginationStyles from './ui-table-pagination.css?inline';

@customElement('ui-table-pagination')
export class UiTablePagination extends LitElement {
    static styles = unsafeCSS(uiTablePaginationStyles);

    @property({ type: Number }) count = 0;
    @property({ type: Number }) page = 0;
    @property({ type: Number }) rowsPerPage = 10;
    @property({ type: Array }) rowsPerPageOptions = [5, 10, 25];

    private _handlePageChange(delta: number) {
        this.dispatchEvent(new CustomEvent('page-change', {
            detail: { page: this.page + delta },
            bubbles: true,
            composed: true
        }));
    }

    private _handleRowChange(e: Event) {
        const val = (e.target as HTMLSelectElement).value;
        this.dispatchEvent(new CustomEvent('rows-per-page-change', {
            detail: { rowsPerPage: parseInt(val) },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const from = this.page * this.rowsPerPage + 1;
        const to = Math.min(this.count, (this.page + 1) * this.rowsPerPage);

        return html`
      <div class="spacer"></div>
      <div class="actions">
        <span>Rows per page:</span>
        <select @change=${this._handleRowChange}>
          ${this.rowsPerPageOptions.map(opt => html`
            <option value=${opt} ?selected=${this.rowsPerPage === opt}>${opt}</option>
          `)}
        </select>
        <span>${from}-${to} of ${this.count}</span>
        <div class="nav-buttons">
          <button ?disabled=${this.page === 0} @click=${() => this._handlePageChange(-1)} aria-label="Previous page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <button ?disabled=${to >= this.count} @click=${() => this._handlePageChange(1)} aria-label="Next page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
      </div>
    `;
    }
}
