import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { PropertyValues } from 'lit';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';

let _uidCounter = 0;

/**
 * A select component for choosing one or multiple options from a list.
 *
 * @fires change - Dispatched when the selection changes. detail: { value: string | null } (single) or { value: string[] } (multiple)
 * @slot icon - Optional icon shown at the start of the trigger.
 * @slot error-message - Optional slot for error message content (use error-message prop for simple text).
 */
@customElement('ui-select')
export class UiSelect extends LitElement {
  static formAssociated = true;

  static styles = css`
    :host {
      display: block;
      /* Size tokens — override per [size] attribute */
      --_h: 40px;
      --_px: 12px;
      --_font: 0.875rem;

      --ui-select-bg: var(--ui-surface-background, #ffffff);
      --ui-select-border: var(--ui-input-border-color, #d1d5db);
      --ui-select-radius: var(--ui-input-border-radius, 8px);
      --ui-select-focus-color: var(--ui-primary-color, #3b82f6);
      --ui-select-error-color: #ef4444;

      font-family: var(--ui-font-family, sans-serif);
    }

    :host([size='sm']) { --_h: 32px; --_px: 8px;  --_font: 0.8125rem; }
    :host([size='md']) { --_h: 40px; --_px: 12px; --_font: 0.875rem;  }
    :host([size='lg']) { --_h: 48px; --_px: 16px; --_font: 0.9375rem; }

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
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
      min-height: var(--_h);
      padding: 0 var(--_px);
      background-color: var(--ui-select-bg);
      border: 1.5px solid var(--ui-select-border);
      border-radius: var(--ui-select-radius);
      cursor: pointer;
      transition: border-color 0.2s, box-shadow 0.2s;
      position: relative;
      gap: 10px;
      user-select: none;
      outline: none;
    }

    .select-trigger:hover:not(.disabled):not(.readonly) {
      border-color: var(--ui-secondary-color, #6b7280);
    }

    .select-trigger.focused {
      border-color: var(--ui-select-focus-color);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    :host([error]) .select-trigger {
      border-color: var(--ui-select-error-color);
    }

    :host([error]) .select-trigger.focused {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }

    .select-trigger.disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: var(--ui-surface-background-flat, #f3f4f6);
    }

    .select-trigger.readonly {
      cursor: default;
      background-color: var(--ui-surface-background-flat, #f3f4f6);
    }

    .value-container {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 6px 0;
      min-height: 24px;
      align-items: center;
      overflow: hidden;
    }

    .placeholder {
      color: var(--ui-text-color-muted, #6b7280);
      font-size: var(--_font);
    }

    .single-value {
      color: var(--ui-text-color, #111827);
      font-size: var(--_font);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .chip {
      background-color: var(--ui-primary-color, #3b82f6);
      color: #ffffff;
      padding: 2px 8px 2px 10px;
      border-radius: 16px;
      font-size: 0.75rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
      animation: chip-in 0.2s ease-out;
    }

    @keyframes chip-in {
      from { transform: scale(0.8); opacity: 0; }
      to   { transform: scale(1);   opacity: 1; }
    }

    .chip-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.2s;
      background: none;
      border: none;
      padding: 0;
      color: inherit;
      line-height: 0;
    }

    .chip-remove:hover { opacity: 1; }

    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
      color: var(--ui-text-color-muted, #6b7280);
      flex-shrink: 0;
    }

    .select-trigger.open .arrow {
      transform: rotate(180deg);
      color: var(--ui-select-focus-color);
    }

    /* Dropdown */
    .dropdown {
      position: absolute;
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
      pointer-events: none;
      transition: opacity 0.15s, transform 0.15s;
    }

    .dropdown.below {
      top: calc(100% + 6px);
      transform: translateY(-8px);
    }

    .dropdown.above {
      bottom: calc(100% + 6px);
      transform: translateY(8px);
    }

    .dropdown.open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    /* Options */
    .option {
      padding: 10px 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--ui-text-color, #111827);
      transition: background-color 0.15s;
      font-size: var(--_font);
    }

    .option.highlighted {
      background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.05));
    }

    .option.selected {
      background-color: rgba(59, 130, 246, 0.08);
      color: var(--ui-primary-color, #3b82f6);
      font-weight: 600;
    }

    .option.option-disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    .check-icon {
      color: var(--ui-primary-color, #3b82f6);
      opacity: 0;
      transition: opacity 0.15s;
      flex-shrink: 0;
    }

    .option.selected .check-icon { opacity: 1; }

    .no-options {
      padding: 12px 16px;
      color: var(--ui-text-color-muted, #6b7280);
      font-size: 0.875rem;
      cursor: default;
    }

    .error-message {
      font-size: 0.75rem;
      color: var(--ui-select-error-color);
      margin-left: 2px;
    }

    /* Scrollbar */
    .dropdown::-webkit-scrollbar { width: 6px; }
    .dropdown::-webkit-scrollbar-track { background: transparent; }
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
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: String, attribute: 'error-message' }) errorMessage = '';
  @property({ type: String }) name = '';
  @property({ type: String, reflect: true }) size: SelectSize = 'md';
  /** Sets the initial value in uncontrolled mode (single-select only). */
  @property({ type: String, attribute: 'default-value' }) defaultValue = '';

  @state() private _isOpen = false;
  @state() private _highlightedIndex = -1;
  @state() private _isFocused = false;
  @state() private _opensUp = false;

  private _internals: ElementInternals | undefined;
  private readonly _uid = `ui-select-${++_uidCounter}`;
  private _firstUpdate = true;

  constructor() {
    super();
    try {
      this._internals = this.attachInternals();
    } catch {
      // ElementInternals not supported in this environment
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  willUpdate(changed: PropertyValues) {
    if (this._firstUpdate) {
      this._firstUpdate = false;
      if (this.defaultValue && this.value.length === 0) {
        this.value = [this.defaultValue];
      }
    }
    if (changed.has('value') || changed.has('name') || changed.has('required')) {
      this._updateFormValue();
    }
  }

  private _updateFormValue() {
    if (!this._internals || typeof this._internals.setFormValue !== 'function') return;
    if (this.multiple) {
      const fd = new FormData();
      this.value.forEach(v => fd.append(this.name || 'select', v));
      this._internals.setFormValue(fd);
    } else {
      this._internals.setFormValue(this.value[0] ?? '');
    }
    if (this.required && this.value.length === 0) {
      this._internals.setValidity({ valueMissing: true }, 'Please select an option');
    } else {
      this._internals.setValidity({});
    }
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this._isOpen) return;
    const path = e.composedPath();
    const inside = path.length > 0 ? path.includes(this) : this.contains(e.target as Node);
    if (!inside) {
      this._isOpen = false;
      this._highlightedIndex = -1;
    }
  };

  private _toggleDropdown() {
    if (this.disabled || this.readonly) return;
    if (!this._isOpen) {
      const rect = this.getBoundingClientRect();
      this._opensUp = window.innerHeight - rect.bottom < 280;
      // Pre-highlight currently selected option
      this._highlightedIndex = this.value.length > 0
        ? this.options.findIndex(o => o.value === this.value[0])
        : -1;
    } else {
      this._highlightedIndex = -1;
    }
    this._isOpen = !this._isOpen;
  }

  private _handleOptionClick(option: SelectOption, e: Event) {
    if (option.disabled) return;
    e.stopPropagation(); // prevent wrapper re-triggering toggle

    if (this.multiple) {
      const next = [...this.value];
      const idx = next.indexOf(option.value);
      if (idx > -1) {
        next.splice(idx, 1);
      } else {
        next.push(option.value);
      }
      this.value = next;
    } else {
      this.value = [option.value];
      this._isOpen = false;
      this._highlightedIndex = -1;
    }
    this._dispatchChange();
  }

  private _removeValue(val: string, e: Event) {
    e.stopPropagation(); // prevent trigger click from firing
    this.value = this.value.filter(v => v !== val);
    this._dispatchChange();
    // Return focus to trigger so keyboard users aren't lost
    this.shadowRoot?.querySelector<HTMLElement>('.select-trigger')?.focus();
  }

  private _dispatchChange() {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.multiple ? this.value : (this.value[0] ?? null) },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    const enabled = this.options.map((o, i) => ({ o, i })).filter(({ o }) => !o.disabled);

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        if (!this._isOpen) {
          this._toggleDropdown();
          if (this._highlightedIndex === -1 && enabled.length > 0) {
            this._highlightedIndex = enabled[0].i;
          }
        } else {
          const cur = enabled.findIndex(({ i }) => i === this._highlightedIndex);
          const next = enabled[cur + 1];
          if (next) {
            this._highlightedIndex = next.i;
            this._scrollOptionIntoView(next.i);
          }
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (this._isOpen) {
          const cur = enabled.findIndex(({ i }) => i === this._highlightedIndex);
          const prev = cur > 0 ? enabled[cur - 1] : null;
          if (prev) {
            this._highlightedIndex = prev.i;
            this._scrollOptionIntoView(prev.i);
          }
        }
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (!this._isOpen) {
          this._toggleDropdown();
        } else if (this._highlightedIndex >= 0) {
          this._handleOptionClick(this.options[this._highlightedIndex], e);
        }
        break;
      }
      case 'Escape': {
        if (this._isOpen) {
          e.preventDefault();
          this._isOpen = false;
          this._highlightedIndex = -1;
        }
        break;
      }
      case 'Tab': {
        if (this._isOpen) {
          this._isOpen = false;
          this._highlightedIndex = -1;
        }
        break;
      }
    }
  };

  private _scrollOptionIntoView(index: number) {
    void this.updateComplete.then(() => {
      const el = this.shadowRoot?.querySelector<HTMLElement>(`#${this._uid}-opt-${index}`);
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  render() {
    const selectedOptions = this.options.filter(opt => this.value.includes(opt.value));
    const labelId = `${this._uid}-label`;
    const listboxId = `${this._uid}-listbox`;
    const activeDescendant = this._highlightedIndex >= 0
      ? `${this._uid}-opt-${this._highlightedIndex}`
      : '';

    return html`
      <div class="wrapper">
        ${this.label ? html`<label id=${labelId}>${this.label}</label>` : nothing}

        <div
          class=${classMap({
            'select-trigger': true,
            focused: this._isOpen || this._isFocused,
            open: this._isOpen,
            disabled: this.disabled,
            readonly: this.readonly,
            'has-value': selectedOptions.length > 0,
          })}
          tabindex=${this.disabled ? '-1' : '0'}
          role="combobox"
          aria-expanded=${this._isOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
          aria-controls=${listboxId}
          aria-labelledby=${this.label ? labelId : nothing}
          aria-activedescendant=${activeDescendant || nothing}
          aria-disabled=${this.disabled ? 'true' : nothing}
          aria-required=${this.required ? 'true' : nothing}
          @click=${this._toggleDropdown}
          @keydown=${this._handleKeydown}
          @focus=${() => { this._isFocused = true; }}
          @blur=${() => { this._isFocused = false; }}
        >
          <slot name="icon"></slot>

          <div class="value-container">
            ${selectedOptions.length === 0 ? html`
              <span class="placeholder">${this.placeholder}</span>
            ` : nothing}

            ${this.multiple
              ? repeat(selectedOptions, opt => opt.value, opt => html`
                  <span class="chip">
                    ${opt.label}
                    <button
                      type="button"
                      class="chip-remove"
                      aria-label="Remove ${opt.label}"
                      @click=${(e: Event) => this._removeValue(opt.value, e)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                      </svg>
                    </button>
                  </span>
                `)
              : (selectedOptions[0] ? html`
                  <span class="single-value">${selectedOptions[0].label}</span>
                ` : nothing)
            }
          </div>

          <div class="arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div
          id=${listboxId}
          class=${classMap({
            dropdown: true,
            open: this._isOpen,
            above: this._opensUp,
            below: !this._opensUp,
          })}
          role="listbox"
          aria-multiselectable=${this.multiple ? 'true' : 'false'}
        >
          ${this.options.length === 0
            ? html`<div class="no-options">No options available</div>`
            : repeat(this.options, opt => opt.value, (opt, i) => {
                const isSelected = this.value.includes(opt.value);
                return html`
                  <div
                    id=${`${this._uid}-opt-${i}`}
                    class=${classMap({
                      option: true,
                      selected: isSelected,
                      highlighted: i === this._highlightedIndex,
                      'option-disabled': !!opt.disabled,
                    })}
                    @click=${(e: Event) => this._handleOptionClick(opt, e)}
                    @mouseenter=${() => { if (!opt.disabled) this._highlightedIndex = i; }}
                    role="option"
                    aria-selected=${isSelected ? 'true' : 'false'}
                    aria-disabled=${opt.disabled ? 'true' : nothing}
                  >
                    <span>${opt.label}</span>
                    <div class="check-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                `;
              })
          }
        </div>

        ${this.error && this.errorMessage ? html`
          <span class="error-message" role="alert">${this.errorMessage}</span>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-select': UiSelect;
  }
}
