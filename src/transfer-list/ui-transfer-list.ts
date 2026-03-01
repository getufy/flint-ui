import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';

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
    static styles = css`
    :host {
      display: block;
      --ui-transfer-list-height: 300px;
      --ui-transfer-list-width: 200px;
      
      font-family: var(--ui-font-family, sans-serif);
      color: var(--ui-text-color, #111827);
    }

    .container {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .list-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .list-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--ui-text-color-muted, #6b7280);
      margin-bottom: 4px;
    }

    .list-box {
      width: var(--ui-transfer-list-width);
      height: var(--ui-transfer-list-height);
      background: var(--ui-surface-background, #ffffff);
      border: 1.5px solid var(--ui-border-color, #e5e7eb);
      border-radius: var(--ui-border-radius-lg, 8px);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      box-shadow: var(--ui-shadow-sm);
    }

    .list-item {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      cursor: pointer;
      transition: background-color 0.2s;
      gap: 10px;
      user-select: none;
    }

    .list-item:hover {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
    }

    .list-item.selected {
      background-color: rgba(59, 130, 246, 0.08);
    }

    .checkbox {
      width: 18px;
      height: 18px;
      border: 2px solid var(--ui-border-color, #d1d5db);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .list-item.selected .checkbox {
      background-color: var(--ui-primary-color, #3b82f6);
      border-color: var(--ui-primary-color, #3b82f6);
    }

    .check-icon {
      color: white;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.2s;
    }

    .list-item.selected .check-icon {
      opacity: 1;
      transform: scale(1);
    }

    .item-label {
      font-size: 0.9375rem;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .action-button {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid var(--ui-border-color, #e5e7eb);
      background: var(--ui-surface-background, #ffffff);
      border-radius: 8px;
      cursor: pointer;
      color: var(--ui-text-color, #111827);
      transition: all 0.2s;
    }

    .action-button:hover:not(:disabled) {
      border-color: var(--ui-primary-color, #3b82f6);
      color: var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-md);
      transform: translateY(-1px);
    }

    .action-button:active:not(:disabled) {
      transform: translateY(0);
    }

    .action-button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      background-color: var(--ui-surface-background-flat, #f3f4f6);
    }

    /* Scrollbar */
    .list-box::-webkit-scrollbar {
      width: 6px;
    }
    .list-box::-webkit-scrollbar-track {
      background: transparent;
    }
    .list-box::-webkit-scrollbar-thumb {
      background: var(--ui-border-color, #e5e7eb);
      border-radius: 3px;
    }
  `;

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
