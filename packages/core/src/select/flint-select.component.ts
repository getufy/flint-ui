import { unsafeCSS, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { PropertyValues } from 'lit';
import { FlintElement } from '../flint-element.js';
import { FormAssociated } from '../mixins/form-associated.js';
import { FormControlController } from '../controllers/form-control.js';
import { LocalizeController } from '../utilities/localize.js';
import { getAnimation, animateTo, stopAnimations, resolveKeyframes } from '../utilities/animation-registry.js';
import '../utilities/animation-presets.js';
import uiSelectStyles from './flint-select.css?inline';

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
 * @fires flint-select-change - Dispatched when the selection changes. detail: `{ value: string[] }`
 * @slot icon - Optional icon shown at the start of the trigger.
 * @slot error-message - Optional slot for error message content (use error-message prop for simple text).
 *
 * @csspart label - The `<label>` element.
 * @csspart trigger - The combobox trigger container.
 * @csspart placeholder - The placeholder text `<span>`.
 * @csspart chip - A selected-value chip (multiple mode).
 * @csspart dropdown - The dropdown listbox container.
 * @csspart option - An individual option element.
 * @csspart error-message - The error message `<span>`.
 */
export class FlintSelect extends FormAssociated(FlintElement) {
  static styles = unsafeCSS(uiSelectStyles);

  /** Label text displayed above the select. */
  @property({ type: String }) label = '';
  /** Array of selectable options. */
  @property({ type: Array }) options: SelectOption[] = [];
  /** Currently selected value(s). */
  @property({ type: Array }) value: string[] = [];
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
  /** Sets the initial value in uncontrolled mode (single-select only). */
  @property({ type: String, attribute: 'default-value' }) defaultValue = '';
  /**
   * When true, the dropdown uses `position: fixed` so it can escape
   * containers with `overflow: hidden/clip` (e.g. dialogs, cards).
   * @default true
   */
  @property({ type: Boolean }) hoist = true;

  private _formControl = new FormControlController(this);
  private _localize = new LocalizeController(this);

  @state() private _isOpen = false;
  @state() private _highlightedIndex = -1;
  @state() private _isFocused = false;
  @state() private _opensUp = false;

  private readonly _uid = `flint-select-${++_uidCounter}`;

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
    this._cleanupHoist();
  }

  /** Called by the browser when the associated form is reset. */
  formResetCallback() {
    this.value = this.defaultValue ? [this.defaultValue] : [];
    this._updateFormValue();
    this._formControl.reset();
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
    if (this.multiple) {
      const fd = new FormData();
      this.value.forEach(v => fd.append(this.name || 'select', v));
      this._initFormValue(fd);
    } else {
      this._initFormValue(this.value[0] ?? '');
    }
    this._initFormValidity(this.required, this.value.length === 0, 'Please select an option');
    this._formControl.updateDataAttributes();
  }

  private _handleReposition = () => {
    if (!this._isOpen || !this.hoist) return;
    void this.updateComplete.then(() => {
      const dropdown = this.shadowRoot?.querySelector<HTMLElement>('.dropdown');
      if (!dropdown) return;
      const trigger = this.shadowRoot?.querySelector<HTMLElement>('.select-trigger');
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const opensUp = spaceBelow < 280;
      dropdown.style.position = 'fixed';
      dropdown.style.left = `${rect.left}px`;
      dropdown.style.width = `${rect.width}px`;
      if (opensUp) {
        dropdown.style.bottom = `${window.innerHeight - rect.top + 6}px`;
        dropdown.style.top = '';
      } else {
        dropdown.style.top = `${rect.bottom + 6}px`;
        dropdown.style.bottom = '';
      }
    });
  };

  private _startHoist() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this._handleReposition, true);
      window.addEventListener('resize', this._handleReposition);
    }
    this._handleReposition();
  }

  private _cleanupHoist() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this._handleReposition, true);
      window.removeEventListener('resize', this._handleReposition);
    }
    const dropdown = this.shadowRoot?.querySelector<HTMLElement>('.dropdown');
    if (dropdown) {
      dropdown.style.position = '';
      dropdown.style.left = '';
      dropdown.style.width = '';
      dropdown.style.top = '';
      dropdown.style.bottom = '';
    }
  }

  private async _runShowAnimation() {
    const dropdown = this.shadowRoot?.querySelector<HTMLElement>('.dropdown');
    if (!dropdown) return;
    const animation = getAnimation(this, 'dropdown.show');
    if (!animation) return;
    await stopAnimations(dropdown);
    const keyframes = resolveKeyframes(this, animation);
    await animateTo(dropdown, keyframes, animation.options);
  }

  private async _runHideAnimation() {
    const dropdown = this.shadowRoot?.querySelector<HTMLElement>('.dropdown');
    if (!dropdown) return;
    const animation = getAnimation(this, 'dropdown.hide');
    if (!animation) return;
    await stopAnimations(dropdown);
    const keyframes = resolveKeyframes(this, animation);
    await animateTo(dropdown, keyframes, animation.options);
  }

  /** Close the dropdown with animation, then clean up state. */
  private async _closeDropdown() {
    this._highlightedIndex = -1;
    await this._runHideAnimation();
    this._isOpen = false;
    if (this.hoist) this._cleanupHoist();
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this._isOpen) return;
    const path = e.composedPath();
    const inside = path.length > 0 ? path.includes(this) : this.contains(e.target as Node);
    if (!inside) {
      void this._closeDropdown();
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
      this._isOpen = true;
      if (this.hoist) this._startHoist();
      void this._runShowAnimation();
    } else {
      void this._closeDropdown();
    }
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
      void this._closeDropdown();
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
    this.dispatchEvent(new CustomEvent('flint-select-change', {
      detail: { value: this.multiple ? this.value : (this.value[0] !== undefined ? [this.value[0]] : []) },
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
      case 'Home': {
        e.preventDefault();
        if (this._isOpen && enabled.length > 0) {
          this._highlightedIndex = enabled[0].i;
          this._scrollOptionIntoView(enabled[0].i);
        }
        break;
      }
      case 'End': {
        e.preventDefault();
        if (this._isOpen && enabled.length > 0) {
          this._highlightedIndex = enabled[enabled.length - 1].i;
          this._scrollOptionIntoView(enabled[enabled.length - 1].i);
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
          void this._closeDropdown();
        }
        break;
      }
      case 'Tab': {
        if (this._isOpen) {
          void this._closeDropdown();
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
        ${this.label ? html`<label id=${labelId} part="label">${this.label}</label>` : nothing}

        <div
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
            ${selectedOptions.length === 0 ? html`
              <span class="placeholder" part="placeholder">${this.placeholder || this._localize.term('selectOption')}</span>
            ` : nothing}

            ${this.multiple
              ? repeat(selectedOptions, opt => opt.value, opt => html`
                  <span class="chip" part="chip">
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
          part="dropdown"
          class=${classMap({
            dropdown: true,
            open: this._isOpen,
            above: this._opensUp,
            below: !this._opensUp,
            hoisted: this.hoist,
          })}
          role="listbox"
          aria-multiselectable=${this.multiple ? 'true' : 'false'}
        >
          ${this.options.length === 0
            ? html`<div class="no-options">${this._localize.term('noOptions')}</div>`
            : repeat(this.options, opt => opt.value, (opt, i) => {
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
