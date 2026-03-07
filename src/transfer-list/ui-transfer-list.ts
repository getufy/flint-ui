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
 * @fires change - Dispatched when items are moved between lists.
 */
@customElement('ui-transfer-list')
export class UiTransferList extends LitElement {
    static styles = unsafeCSS(uiTransferListStyles);

    @property({ type: Array }) options: TransferOption[] = [];
    @property({ type: Array }) value: string[] = []; // Values on the right side
    @property({ type: String }) leftTitle = 'Options';
    @property({ type: String }) rightTitle = 'Selected';

    @state() private leftChecked: string[] = [];
    @state() private rightChecked: string[] = [];

    private _toggleChecked(val: string, side: 'left' | 'right') {
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
        this.value = [...this.value, ...this.leftChecked];
        this.leftChecked = [];
        this._dispatchChange();
    }

    private _moveLeft() {
        this.value = this.value.filter(v => !this.rightChecked.includes(v));
        this.rightChecked = [];
        this._dispatchChange();
    }

    private _moveAllRight() {
        this.value = this.options.map(opt => opt.value);
        this.leftChecked = [];
        this.rightChecked = [];
        this._dispatchChange();
    }

    private _moveAllLeft() {
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

        return html`
      <div class="container">
        <!-- Left List -->
        <div class="list-wrapper">
          <div class="list-title">${this.leftTitle}</div>
          <div class="list-box">
            ${repeat(leftOptions, (opt) => opt.value, (opt) => html`
              <div 
                class="list-item ${classMap({ selected: this.leftChecked.includes(opt.value) })}"
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
          <button class="action-button" title="Move all right" @click=${this._moveAllRight}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
            </svg>
          </button>
          <button 
            class="action-button" 
            title="Move selected right" 
            ?disabled=${this.leftChecked.length === 0}
            @click=${this._moveRight}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          <button 
            class="action-button" 
            title="Move selected left" 
            ?disabled=${this.rightChecked.length === 0}
            @click=${this._moveLeft}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button class="action-button" title="Move all left" @click=${this._moveAllLeft}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
            </svg>
          </button>
        </div>

        <!-- Right List -->
        <div class="list-wrapper">
          <div class="list-title">${this.rightTitle}</div>
          <div class="list-box">
            ${repeat(rightOptions, (opt) => opt.value, (opt) => html`
              <div 
                class="list-item ${classMap({ selected: this.rightChecked.includes(opt.value) })}"
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
