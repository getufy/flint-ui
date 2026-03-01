import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';

export interface SelectOption {
  label: string;
  value: string;
}

/**
 * A premium Select component for choosing options from a list.
 * 
 * @fires change - Dispatched when the selection changes.
 * @slot icon - Optional icon to show at the start of the select.
 */
@customElement('ui-select')
export class UiSelect extends LitElement {
  static styles = css`
    :host {
      display: block;
      --ui-select-height: 48px;
      --ui-select-bg: var(--ui-surface-background, #ffffff);
      --ui-select-border: var(--ui-input-border-color, #d1d5db);
      --ui-select-radius: var(--ui-input-border-radius, 8px);
      --ui-select-focus-color: var(--ui-primary-color, #3b82f6);
      
      font-family: var(--ui-font-family, sans-serif);
      margin-bottom: 16px;
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;
    }

    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ui-text-color, #111827);
      margin-left: 2px;
    }

    .select-trigger {
      display: flex;
      align-items: center;
      min-height: var(--ui-select-height);
      padding: 0 16px;
      background-color: var(--ui-select-bg);
      border: 1.5px solid var(--ui-select-border);
      border-radius: var(--ui-select-radius);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      gap: 12px;
      user-select: none;
    }

    .select-trigger:hover:not(.disabled) {
      border-color: var(--ui-secondary-color, #6b7280);
    }

    .select-trigger.focused {
      border-color: var(--ui-select-focus-color);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
    }

    .select-trigger.disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: var(--ui-surface-background-flat, #f3f4f6);
    }

    .value-container {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 8px 0;
      min-height: 24px;
      align-items: center;
      overflow: hidden;
    }

    .placeholder {
      color: var(--ui-text-color-muted, #6b7280);
      font-size: 0.9375rem;
    }

    .single-value {
      color: var(--ui-text-color, #111827);
      font-size: 0.9375rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .chip {
      background-color: var(--ui-primary-color, #3b82f6);
      color: var(--ui-text-color-on-primary, #ffffff);
      padding: 4px 10px;
      border-radius: 16px;
      font-size: 0.75rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
      animation: chip-in 0.2s ease-out;
    }

    @keyframes chip-in {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .chip-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .chip-remove:hover {
      opacity: 1;
    }

    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
      color: var(--ui-text-color-muted, #6b7280);
    }

    .select-trigger.focused .arrow {
      transform: rotate(180deg);
      color: var(--ui-select-focus-color);
    }

    .dropdown {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      right: 0;
      background-color: var(--ui-select-bg);
      border-radius: var(--ui-select-radius);
      box-shadow: var(--ui-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      border: 1px solid var(--ui-border-color, #e5e7eb);
      z-index: 1000;
      max-height: 260px;
      overflow-y: auto;
      opacity: 0;
      transform: translateY(-10px);
      pointer-events: none;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .dropdown.open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .option {
      padding: 12px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--ui-text-color, #111827);
      transition: background-color 0.2s;
      font-size: 0.9375rem;
    }

    .option:hover {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
    }

    .option.selected {
      background-color: rgba(59, 130, 246, 0.08);
      color: var(--ui-primary-color, #3b82f6);
      font-weight: 600;
    }

    .check-icon {
      color: var(--ui-primary-color, #3b82f6);
      opacity: 0;
      transition: opacity 0.2s;
    }

    .option.selected .check-icon {
      opacity: 1;
    }

    /* Scrollbar Styling */
    .dropdown::-webkit-scrollbar {
      width: 6px;
    }
    .dropdown::-webkit-scrollbar-track {
      background: transparent;
    }
    .dropdown::-webkit-scrollbar-thumb {
      background: var(--ui-border-color, #e5e7eb);
      border-radius: 3px;
    }
  `;

  @property({ type: String }) label = '';
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: Array }) value: string[] = [];
  @property({ type: Boolean }) multiple = false;
  @property({ type: String }) placeholder = 'Select an option';
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private isOpen = false;


  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    if (this.isOpen && !this.contains(e.target as Node)) {
      this.isOpen = false;
    }
  };

  private _toggleDropdown() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  private _handleOptionClick(option: SelectOption, e: Event) {
    e.stopPropagation();

    if (this.multiple) {
      const newValue = [...this.value];
      const index = newValue.indexOf(option.value);

      if (index > -1) {
        newValue.splice(index, 1);
      } else {
        newValue.push(option.value);
      }
      this.value = newValue;
    } else {
      this.value = [option.value];
      this.isOpen = false;
    }

    this._dispatchChange();
  }

  private _removeValue(val: string, e: Event) {
    e.stopPropagation();
    this.value = this.value.filter(v => v !== val);
    this._dispatchChange();
  }

  private _dispatchChange() {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.multiple ? this.value : this.value[0] },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const selectedOptions = this.options.filter(opt => this.value.includes(opt.value));

    return html`
      <div class="wrapper">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        
        <div 
          class="select-trigger ${classMap({
      focused: this.isOpen,
      disabled: this.disabled,
      has_value: selectedOptions.length > 0
    })}"
          @click=${this._toggleDropdown}
          role="combobox"
          aria-expanded="${this.isOpen}"
          aria-haspopup="listbox"
        >
          <slot name="icon"></slot>
          
          <div class="value-container">
            ${selectedOptions.length === 0 ? html`
              <span class="placeholder">${this.placeholder}</span>
            ` : ''}
            
            ${this.multiple ?
        repeat(selectedOptions, (opt) => opt.value, (opt) => html`
                <span class="chip">
                  ${opt.label}
                  <span class="chip-remove" @click=${(e: Event) => this._removeValue(opt.value, e)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </span>
                </span>
              `) :
        (selectedOptions[0] ? html`
                <span class="single-value">${selectedOptions[0].label}</span>
              ` : '')
      }
          </div>

          <div class="arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div class="dropdown ${classMap({ open: this.isOpen })}" role="listbox">
          ${this.options.length === 0 ? html`
            <div class="option" style="cursor: default; opacity: 0.5;">No options available</div>
          ` : repeat(this.options, (opt) => opt.value, (opt) => {
        const isSelected = this.value.includes(opt.value);
        return html`
              <div 
                class="option ${classMap({ selected: isSelected })}"
                @click=${(e: Event) => this._handleOptionClick(opt, e)}
                role="option"
                aria-selected="${isSelected}"
              >
                <span>${opt.label}</span>
                <div class="check-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            `;
      })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-select': UiSelect;
  }
}
