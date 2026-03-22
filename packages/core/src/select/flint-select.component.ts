import { unsafeCSS, html, nothing, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { PropertyValues } from 'lit';
import { FlintElement } from '../flint-element.js';
import { FlintPopup } from '../popup/flint-popup.component.js';
import { FlintTooltip } from '../tooltip/flint-tooltip.component.js';
import { FormAssociated } from '../mixins/form-associated.js';
import { FormControlController } from '../controllers/form-control.js';
import { LocalizeController } from '../utilities/localize.js';
import { runOverlayAnimation } from '../utilities/animation-registry.js';
import { validateEnum } from '../utilities/dev-warnings.js';
import type { Size } from '../types.js';
import { rovingIndex } from '../utilities/roving-index.js';
import '../utilities/animation-presets.js';
import uiSelectStyles from './flint-select.css?inline';
import { generateId } from '../utilities/id-generator.js';

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  /** Optional group name. Options with the same group are rendered under a group header. */
  group?: string;
}

export type SelectSize = Size;

/**
 * A select component for choosing one or multiple options from a list.
 *
 * @fires flint-select-change - Dispatched when the selection changes. detail: `{ value: string, multiple: false } | { value: string[], multiple: true }`
 * @slot icon - Optional icon shown at the start of the trigger.
 * @slot error-message - Optional slot for error message content (use error-message prop for simple text).
 *
 * @fires flint-clear - Dispatched when the clear button is clicked.
 *
 * @csspart label - The `<label>` element.
 * @csspart trigger - The combobox trigger container.
 * @csspart placeholder - The placeholder text `<span>`.
 * @csspart chip - A selected-value chip (multiple mode).
 * @csspart chip-overflow - The "+N more" overflow chip (multiple mode).
 * @csspart clear-button - The clear button (when clearable).
 * @csspart search-input - The search input (when searchable).
 * @csspart dropdown - The dropdown listbox container.
 * @csspart option - An individual option element.
 * @csspart error-message - The error message `<span>`.
 */
export class FlintSelect extends FormAssociated(FlintElement) {
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
  static styles = unsafeCSS(uiSelectStyles);

  static override dependencies: Record<string, typeof FlintElement> = {
    'flint-popup': FlintPopup,
    'flint-tooltip': FlintTooltip,
  };

  /** Label text displayed above the select. */
  @property({ type: String }) label = '';
  /** Array of selectable options. */
  @property({ type: Array }) options: SelectOption[] = [];
  /** Current value (controlled). When set, the component reflects this value and does not manage its own state. Accepts a single string or an array of strings. */
  @property({ type: Array }) value: string | string[] = [];
  /** Allow multiple selections. */
  @property({ type: Boolean }) multiple = false;
  /** Placeholder text when no value is selected. */
  @property({ type: String }) placeholder = '';
  /** Disables the select and prevents interaction. */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Makes the select read-only. */
  @property({ type: Boolean, reflect: true }) readonly = false;
  /** Marks the select as required for form validation. */
  @property({ type: Boolean, reflect: true }) required = false;
  /** Whether the select is in an error state. */
  @property({ type: Boolean, reflect: true }) error = false;
  /** Error message displayed below the select. */
  @property({ type: String, attribute: 'error-message' }) errorMessage = '';
  /** Form field name used when submitting form data. */
  @property({ type: String }) name = '';
  /**
   * Size variant of the select.
   * @default 'md'
   */
  @property({ type: String, reflect: true }) size: SelectSize = 'md';
  /** Initial value (uncontrolled). Only used on first render; ignored after mount. Single-select only. */
  @property({ type: String, attribute: 'default-value' }) defaultValue = '';
  /**
   * When true, the dropdown uses `position: fixed` so it can escape
   * containers with `overflow: hidden/clip` (e.g. dialogs, cards).
   * @default true
   */
  @property({ type: Boolean }) hoist = true;

  /**
   * Async options loader. When provided, called when the dropdown opens.
   * Should return a promise that resolves to an array of `SelectOption`.
   * While loading, a spinner is shown in the dropdown.
   */
  @property({ attribute: false }) loadOptions: ((searchTerm?: string) => Promise<SelectOption[]>) | null = null;

  /** When true, shows a clear button in the trigger when a value is selected. */
  @property({ type: Boolean }) clearable = false;

  /** When true, adds a text input for filtering options by label. */
  @property({ type: Boolean }) searchable = false;

  /**
   * Maximum number of chips visible in multi-select mode.
   * Excess selections are collapsed into a "+N more" indicator.
   * @default Infinity
   */
  @property({ type: Number, attribute: 'max-tags-visible' }) maxTagsVisible = Infinity;

  private _formControl = new FormControlController(this);
  private _localize = new LocalizeController(this);

  @state() private _isOpen = false;
  @state() private _highlightedIndex = -1;
  @state() private _isFocused = false;
  @state() private _isLoading = false;
  @state() private _searchTerm = '';

  private readonly _uid = generateId('flint-select');
  private _searchDebounce?: ReturnType<typeof setTimeout>;

  private get _filteredOptions(): SelectOption[] {
    if (!this.searchable || !this._searchTerm) return this.options;
    const term = this._searchTerm.toLowerCase();
    return this.options.filter(opt => opt.label.toLowerCase().includes(term));
  }

  /* ── Typeahead ─────────────────────────────────────────────────────── */
  private _typeaheadBuffer = '';
  private _typeaheadTimeout?: ReturnType<typeof setTimeout>;

  private _handleTypeahead(key: string) {
    clearTimeout(this._typeaheadTimeout);
    this._typeaheadBuffer += key.toLowerCase();

    const match = this.options.find(opt =>
      !opt.disabled && opt.label.toLowerCase().startsWith(this._typeaheadBuffer)
    );
    if (match) {
      const idx = this.options.indexOf(match);
      this._highlightedIndex = idx;
      this._scrollOptionIntoView(idx);
    }

    this._typeaheadTimeout = setTimeout(() => { this._typeaheadBuffer = ''; }, 500);
  }

  /* ── Virtualization ────────────────────────────────────────────────── */
  /** Enable virtual scrolling for large option lists. */
  @property({ type: Boolean }) virtualize = false;

  /** Fixed item height in px used for virtual scroll calculations. */
  @property({ type: Number, attribute: 'item-height' }) itemHeight = 36;

  /** Maximum visible items in the dropdown (determines dropdown height). */
  @property({ type: Number, attribute: 'visible-items' }) visibleItems = 8;

  @state() private _scrollTop = 0;

  private _handleDropdownScroll = (e: Event) => {
    this._scrollTop = (e.target as HTMLElement).scrollTop;
  };

  private get _virtualRange(): { start: number; end: number; totalHeight: number } {
    const opts = this._filteredOptions;
    const overscan = 5;
    const totalHeight = opts.length * this.itemHeight;
    const start = Math.max(0, Math.floor(this._scrollTop / this.itemHeight) - overscan);
    const visibleCount = this.visibleItems + overscan * 2;
    const end = Math.min(opts.length, start + visibleCount);
    return { start, end, totalHeight };
  }

  connectedCallback() {
    super.connectedCallback();
    if (typeof document !== 'undefined') {
      document.addEventListener('click', this._handleOutsideClick);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this._handleOutsideClick);
    }
  }

  /** Called by the browser when the associated form is reset. */
  formResetCallback() {
    this.value = this.defaultValue ? [this.defaultValue] : [];
    this._updateFormValue();
    this._formControl.reset();
  }

  willUpdate(changed: PropertyValues) {
    if (import.meta.env?.DEV) {
      validateEnum('flint-select', 'size', this.size, ['sm', 'md', 'lg']);
    }

    // Normalize value: accept string | string[], always store as string[]
    if (typeof this.value === 'string') {
      this.value = this.value ? [this.value] : [];
    }
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
    if (this.multiple) {
      const fd = new FormData();
      (this.value as string[]).forEach(v => fd.append(this.name || 'select', v));
      this._initFormValue(fd);
    } else {
      this._initFormValue(this.value[0] ?? '');
    }
    this._initFormValidity(this.required, this.value.length === 0, 'Please select an option');
    this._formControl.updateDataAttributes();
  }

  private async _runShowAnimation() {
    await runOverlayAnimation(this, this.shadowRoot?.querySelector<HTMLElement>('.dropdown'), 'dropdown.show');
  }

  private async _runHideAnimation() {
    await runOverlayAnimation(this, this.shadowRoot?.querySelector<HTMLElement>('.dropdown'), 'dropdown.hide');
  }

  /** Close the dropdown with animation, then clean up state. */
  private async _closeDropdown() {
    this._highlightedIndex = -1;
    this._searchTerm = '';
    clearTimeout(this._searchDebounce);
    await this._runHideAnimation();
    this._isOpen = false;
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this._isOpen) return;
    const path = e.composedPath();
    const inside = path.length > 0 ? path.includes(this) : this.contains(e.target as Node);
    if (!inside) {
      void this._closeDropdown();
    }
  };

  private _toggleDropdown = () => {
    if (this.disabled || this.readonly) return;
    if (!this._isOpen) {
      // Pre-highlight currently selected option
      this._highlightedIndex = this.value.length > 0
        ? this.options.findIndex(o => o.value === this.value[0])
        : -1;
      this._isOpen = true;
      void this._runShowAnimation();

      // Focus search input if searchable
      if (this.searchable) {
        void this.updateComplete.then(() => {
          this.shadowRoot?.querySelector<HTMLInputElement>('.search-input')?.focus();
        });
      }

      // Trigger async loading if a loadOptions callback is provided
      if (this.loadOptions) {
        this._isLoading = true;
        this.emit('flint-select-load');
        this.loadOptions()
          .then(opts => {
            this.options = opts;
            this._isLoading = false;
          })
          .catch(() => {
            this._isLoading = false;
          });
      }
    } else {
      void this._closeDropdown();
    }
  };

  private _handleSearchInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this._searchTerm = input.value;
    this._highlightedIndex = -1;

    if (this.loadOptions) {
      clearTimeout(this._searchDebounce);
      this._searchDebounce = setTimeout(() => {
        this._isLoading = true;
        this.loadOptions!(this._searchTerm)
          .then(opts => { this.options = opts; this._isLoading = false; })
          .catch(() => { this._isLoading = false; });
      }, 300);
    }
  };

  private _handleSearchKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case 'Escape':
      case 'Tab':
        this._handleKeydown(e);
        break;
      case 'Backspace':
        // Remove last chip when search is empty in multi-select
        if (this.multiple && this._searchTerm === '' && (this.value as string[]).length > 0) {
          const vals = [...this.value as string[]];
          vals.pop();
          this.value = vals;
          this._dispatchChange();
        }
        break;
    }
  };

  private _handleClear = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    this.value = [];
    this._dispatchChange();
    this.emit('flint-clear');
    this.shadowRoot?.querySelector<HTMLElement>('.select-trigger')?.focus();
  };

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
      void this._closeDropdown();
    }
    this._dispatchChange();
  }

  private _removeValue(val: string, e: Event) {
    e.stopPropagation(); // prevent trigger click from firing
    this.value = (this.value as string[]).filter(v => v !== val);
    this._dispatchChange();
    // Return focus to trigger so keyboard users aren't lost
    this.shadowRoot?.querySelector<HTMLElement>('.select-trigger')?.focus();
  }

  private _dispatchChange() {
    const detail = this.multiple
      ? { value: this.value as string[], multiple: true as const }
      : { value: (this.value as string[])[0] ?? '', multiple: false as const };
    this.emit('flint-select-change', detail);
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    const enabled = this.options.map((o, i) => ({ o, i })).filter(({ o }) => !o.disabled);

    // Handle open/close and activation keys
    switch (e.key) {
      case 'ArrowDown': {
        if (!this._isOpen) {
          e.preventDefault();
          this._toggleDropdown();
          if (this._highlightedIndex === -1 && enabled.length > 0) {
            this._highlightedIndex = enabled[0]!.i;
          }
          return;
        }
        break;
      }
      case 'ArrowUp': {
        if (!this._isOpen) return;
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (!this._isOpen) {
          this._toggleDropdown();
        } else if (this._highlightedIndex >= 0) {
          this._handleOptionClick(this.options[this._highlightedIndex]!, e);
        }
        return;
      }
      case 'Escape': {
        if (this._isOpen) {
          e.preventDefault();
          void this._closeDropdown();
        }
        return;
      }
      case 'Tab': {
        if (this._isOpen) {
          void this._closeDropdown();
        }
        return;
      }
    }

    // Roving navigation when open
    if (this._isOpen) {
      const cur = enabled.findIndex(({ i }) => i === this._highlightedIndex);
      const { index, handled } = rovingIndex(e.key, cur, enabled.length, { wrap: false });
      if (handled) {
        e.preventDefault();
        this._highlightedIndex = enabled[index]!.i;
        this._scrollOptionIntoView(enabled[index]!.i);
        return;
      }

      // Typeahead: single printable characters trigger search (skip when searchable — input handles it)
      if (!this.searchable && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        this._handleTypeahead(e.key);
      }
    }
  };

  private _scrollOptionIntoView(index: number) {
    void this.updateComplete.then(() => {
      if (this.virtualize) {
        // In virtual mode, programmatically scroll the container so the
        // target index falls inside the visible window.
        const container = this.shadowRoot?.querySelector<HTMLElement>('.virtual-scroll-container');
        if (!container) return;
        const itemTop = index * this.itemHeight;
        const itemBottom = itemTop + this.itemHeight;
        const viewTop = container.scrollTop;
        const viewBottom = viewTop + container.clientHeight;

        if (itemTop < viewTop) {
          container.scrollTop = itemTop;
        } else if (itemBottom > viewBottom) {
          container.scrollTop = itemBottom - container.clientHeight;
        }
        // Update _scrollTop so the virtual range recalculates
        this._scrollTop = container.scrollTop;
        return;
      }
      const el = this.shadowRoot?.querySelector<HTMLElement>(`#${this._uid}-opt-${index}`);
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  private _renderOption(opt: SelectOption, i: number, style = '') {
    const isSelected = this.value.includes(opt.value);
    return html`
      <div
        id=${`${this._uid}-opt-${i}`}
        part="option"
        class=${classMap({
          option: true,
          selected: isSelected,
          highlighted: i === this._highlightedIndex,
          'option-disabled': !!opt.disabled,
        })}
        style=${style || nothing}
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
  }

  /** Whether any option has a `group` field set. */
  private get _hasGroups(): boolean {
    return this.options.some(opt => !!opt.group);
  }

  private _renderGrouped() {
    // Collect options by group, preserving order of first appearance
    const groups: { name: string; options: { opt: SelectOption; idx: number }[] }[] = [];
    const ungrouped: { opt: SelectOption; idx: number }[] = [];
    const groupMap = new Map<string, { opt: SelectOption; idx: number }[]>();

    this.options.forEach((opt, i) => {
      if (opt.group) {
        let items = groupMap.get(opt.group);
        if (!items) {
          items = [];
          groupMap.set(opt.group, items);
          groups.push({ name: opt.group, options: items });
        }
        items.push({ opt, idx: i });
      } else {
        ungrouped.push({ opt, idx: i });
      }
    });

    return html`
      ${ungrouped.map(({ opt, idx }) => this._renderOption(opt, idx))}
      ${groups.map(g => html`
        <div class="option-group" role="group" aria-label=${g.name}>
          <div class="option-group-label" part="group-label">${g.name}</div>
          ${g.options.map(({ opt, idx }) => this._renderOption(opt, idx))}
        </div>
      `)}
    `;
  }

  private _renderVirtualized() {
    const { start, end, totalHeight } = this._virtualRange;
    const visibleOptions = this._filteredOptions.slice(start, end);
    const containerHeight = Math.min(this.visibleItems * this.itemHeight, totalHeight);

    return html`
      <div
        class="virtual-scroll-container"
        style="height:${containerHeight}px;overflow-y:auto;position:relative;"
        @scroll=${this._handleDropdownScroll}
      >
        <div style="height:${totalHeight}px;position:relative;">
          ${visibleOptions.map((opt, vi) => {
            const realIndex = start + vi;
            const yPos = realIndex * this.itemHeight;
            return this._renderOption(opt, realIndex, `position:absolute;top:${yPos}px;left:0;right:0;height:${this.itemHeight}px;`);
          })}
        </div>
      </div>
    `;
  }

  render() {
    const selectedOptions = this.options.filter(opt => this.value.includes(opt.value));
    const filteredOptions = this._filteredOptions;
    const labelId = `${this._uid}-label`;
    const listboxId = `${this._uid}-listbox`;
    const activeDescendant = this._highlightedIndex >= 0
      ? `${this._uid}-opt-${this._highlightedIndex}`
      : '';

    // maxTagsVisible
    const visibleChips = this.multiple && isFinite(this.maxTagsVisible)
      ? selectedOptions.slice(0, this.maxTagsVisible)
      : selectedOptions;
    const overflowCount = selectedOptions.length - visibleChips.length;

    const showClear = this.clearable && selectedOptions.length > 0 && !this.disabled && !this.readonly;

    return html`
      <div class="wrapper">
        ${this.label ? html`<label id=${labelId} part="label">${this.label}</label>` : nothing}

        <flint-popup
          .active=${this._isOpen}
          placement="bottom-start"
          .strategy=${this.hoist ? 'fixed' as const : 'absolute' as const}
          .distance=${4}
          flip
          shift
          sync="width"
        >
          <div
            slot="anchor"
            part="trigger"
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
              ${this.multiple
                ? html`
                    ${selectedOptions.length === 0 && !(this.searchable && this._isOpen) ? html`
                      <span class="placeholder" part="placeholder">${this.placeholder || this._localize.term('selectOption')}</span>
                    ` : nothing}
                    ${repeat(visibleChips, opt => opt.value, opt => html`
                      <span class="chip" part="chip">
                        ${opt.label}
                        <button
                          type="button"
                          class="chip-remove"
                          aria-label=${this._localize.term('removeOption', opt.label)}
                          @click=${(e: Event) => this._removeValue(opt.value, e)}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                          </svg>
                        </button>
                      </span>
                    `)}
                    ${overflowCount > 0 ? html`
                      <flint-tooltip .label=${selectedOptions.slice(this.maxTagsVisible).map(o => o.label).join(', ')} placement="top">
                        <span class="chip chip-overflow" part="chip-overflow"
                          aria-label=${this._localize.term('moreSelected', overflowCount)}>
                          +${overflowCount}
                        </span>
                      </flint-tooltip>
                    ` : nothing}
                    ${this.searchable && this._isOpen ? html`
                      <input
                        class="search-input search-input--multi"
                        part="search-input"
                        type="text"
                        .value=${this._searchTerm}
                        placeholder=${visibleChips.length === 0 ? (this.placeholder || this._localize.term('search')) : ''}
                        @input=${this._handleSearchInput}
                        @click=${(e: Event) => e.stopPropagation()}
                        @keydown=${this._handleSearchKeydown}
                        autocomplete="off"
                      />
                    ` : nothing}
                  `
                : html`
                    ${this.searchable && this._isOpen
                      ? html`
                        <input
                          class="search-input"
                          part="search-input"
                          type="text"
                          .value=${this._searchTerm}
                          placeholder=${this.placeholder || this._localize.term('search')}
                          @input=${this._handleSearchInput}
                          @click=${(e: Event) => e.stopPropagation()}
                          @keydown=${this._handleSearchKeydown}
                          autocomplete="off"
                        />`
                      : selectedOptions.length === 0
                        ? html`<span class="placeholder" part="placeholder">${this.placeholder || this._localize.term('selectOption')}</span>`
                        : html`<span class="single-value">${selectedOptions[0]!.label}</span>`
                    }
                  `
              }
            </div>

            ${showClear ? html`
              <button
                type="button"
                class="clear-btn"
                part="clear-button"
                tabindex="-1"
                aria-label=${this._localize.term('clear')}
                @click=${this._handleClear}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </button>
            ` : nothing}

            <div class="arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <div
            id=${listboxId}
            part="dropdown"
            class=${classMap({
              dropdown: true,
              open: this._isOpen,
            })}
            role="listbox"
            aria-multiselectable=${this.multiple ? 'true' : 'false'}
          >
            ${this._isLoading
              ? html`<div class="loading-indicator" part="loading"><span class="loading-spinner"></span> ${this._localize.term('loading')}</div>`
              : filteredOptions.length === 0
                ? html`<div class="no-options">${this._searchTerm ? this._localize.term('noResults') : this._localize.term('noOptions')}</div>`
                : this.virtualize
                  ? this._renderVirtualized()
                  : this._hasGroups
                    ? this._renderGrouped()
                    : repeat(filteredOptions, opt => opt.value, (opt, i) => this._renderOption(opt, i))
            }
          </div>
        </flint-popup>

        ${this.error ? html`
          <span class="error-message" part="error-message" role="alert">
            ${this.errorMessage}
            <slot name="error-message"></slot>
          </span>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-select': FlintSelect;
  }
}
