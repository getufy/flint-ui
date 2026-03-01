import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-table-pagination')
export class UiTablePagination extends LitElement {
    static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 8px 16px;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-size: 0.875rem;
      color: var(--ui-text-color-muted, #6b7280);
      border-top: 1px solid var(--ui-border-color, #e5e7eb);
    }
    .spacer {
      flex: 1 1 100%;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .nav-buttons {
      display: flex;
      gap: 4px;
    }
    button {
      background: transparent;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--ui-text-color, #111827);
      transition: background-color 0.2s;
    }
    button:hover:not(:disabled) {
      background-color: var(--ui-hover-color, rgba(0,0,0,0.04));
    }
    button:disabled {
      color: var(--ui-text-color-muted, #9ca3af);
      cursor: not-allowed;
    }
    select {
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      outline: none;
    }
  `;

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
