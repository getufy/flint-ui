import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import uiTransferListStyles from './ui-transfer-list.css?inline';

export interface TransferOption {
    label: string;
    value: string;
}

/**
 * A premium Transfer List component for moving items between two lists.
 *
 * @fires change - Dispatched when items are moved between lists. Detail: `{ value: string[] }`
 */
@customElement('ui-transfer-list')
export class UiTransferList extends LitElement {
    static styles = unsafeCSS(uiTransferListStyles);

    @property({ type: Array }) options: TransferOption[] = [];
    @property({ type: Array }) value: string[] = [];
    @property({ type: String }) leftTitle = 'Options';
    @property({ type: String }) rightTitle = 'Selected';
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean }) searchable = false;

    @state() private leftChecked: string[] = [];
    @state() private rightChecked: string[] = [];
    @state() private _leftSearch = '';
    @state() private _rightSearch = '';

    private _toggleChecked(val: string, side: 'left' | 'right') {
        if (this.disabled) return;
        if (side === 'left') {
            const idx = this.leftChecked.indexOf(val);
            if (idx > -1) {
                this.leftChecked = this.leftChecked.filter(v => v !== val);
            } else {
                this.leftChecked = [...this.leftChecked, val];
            }
        } else {
            const idx = this.rightChecked.indexOf(val);
            if (idx > -1) {
                this.rightChecked = this.rightChecked.filter(v => v !== val);
            } else {
                this.rightChecked = [...this.rightChecked, val];
            }
        }
    }

    private _moveRight() {
        if (this.disabled) return;
        this.value = [...this.value, ...this.leftChecked];
        this.leftChecked = [];
        this._dispatchChange();
    }

    private _moveLeft() {
        if (this.disabled) return;
        this.value = this.value.filter(v => !this.rightChecked.includes(v));
        this.rightChecked = [];
        this._dispatchChange();
    }

    private _moveAllRight() {
        if (this.disabled) return;
        this.value = this.options.map(opt => opt.value);
        this.leftChecked = [];
        this.rightChecked = [];
        this._dispatchChange();
    }

    private _moveAllLeft() {
        if (this.disabled) return;
        this.value = [];
        this.leftChecked = [];
        this.rightChecked = [];
        this._dispatchChange();
    }

    private _dispatchChange() {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const leftOptions = this.options.filter(opt => !this.value.includes(opt.value));
        const rightOptions = this.options.filter(opt => this.value.includes(opt.value));

        const filteredLeft = this.searchable
            ? leftOptions.filter(opt => opt.label.toLowerCase().includes(this._leftSearch.toLowerCase()))
            : leftOptions;
        const filteredRight = this.searchable
            ? rightOptions.filter(opt => opt.label.toLowerCase().includes(this._rightSearch.toLowerCase()))
            : rightOptions;

        return html`
      <div class="container">
        <!-- Left List -->
        <div class="list-wrapper">
          <div class="list-header">
            <span class="list-title">${this.leftTitle}</span>
            <span class="list-count">${leftOptions.length}</span>
          </div>
          ${this.searchable ? html`
            <input
              class="list-search"
              type="text"
              placeholder="Search..."
              .value=${this._leftSearch}
              @input=${(e: Event) => { this._leftSearch = (e.target as HTMLInputElement).value; }}
              ?disabled=${this.disabled}
            />
          ` : ''}
          <div class="list-box" role="listbox" aria-label="${this.leftTitle}" aria-multiselectable="true">
            ${repeat(filteredLeft, (opt) => opt.value, (opt) => html`
              <div
                class="list-item ${classMap({ selected: this.leftChecked.includes(opt.value) })}"
                role="option"
                aria-selected=${this.leftChecked.includes(opt.value)}
                @click=${() => this._toggleChecked(opt.value, 'left')}
              >
                <div class="checkbox">
                  <svg class="check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span class="item-label">${opt.label}</span>
              </div>
            `)}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="actions">
          <button class="action-button" title="Move all right" aria-label="Move all right"
            ?disabled=${this.disabled} @click=${this._moveAllRight}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
            </svg>
          </button>
          <button
            class="action-button"
            title="Move selected right"
            aria-label="Move selected right"
            ?disabled=${this.disabled || this.leftChecked.length === 0}
            @click=${this._moveRight}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          <button
            class="action-button"
            title="Move selected left"
            aria-label="Move selected left"
            ?disabled=${this.disabled || this.rightChecked.length === 0}
            @click=${this._moveLeft}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button class="action-button" title="Move all left" aria-label="Move all left"
            ?disabled=${this.disabled} @click=${this._moveAllLeft}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
            </svg>
          </button>
        </div>

        <!-- Right List -->
        <div class="list-wrapper">
          <div class="list-header">
            <span class="list-title">${this.rightTitle}</span>
            <span class="list-count">${rightOptions.length}</span>
          </div>
          ${this.searchable ? html`
            <input
              class="list-search"
              type="text"
              placeholder="Search..."
              .value=${this._rightSearch}
              @input=${(e: Event) => { this._rightSearch = (e.target as HTMLInputElement).value; }}
              ?disabled=${this.disabled}
            />
          ` : ''}
          <div class="list-box" role="listbox" aria-label="${this.rightTitle}" aria-multiselectable="true">
            ${repeat(filteredRight, (opt) => opt.value, (opt) => html`
              <div
                class="list-item ${classMap({ selected: this.rightChecked.includes(opt.value) })}"
                role="option"
                aria-selected=${this.rightChecked.includes(opt.value)}
                @click=${() => this._toggleChecked(opt.value, 'right')}
              >
                <div class="checkbox">
                  <svg class="check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span class="item-label">${opt.label}</span>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-transfer-list': UiTransferList;
    }
}
