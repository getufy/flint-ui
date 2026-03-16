import { unsafeCSS, html, type PropertyValues, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiAutocompleteStyles from './flint-autocomplete.css?inline';

export interface AutocompleteOption {
    label: string;
    value: string;
}

/**
 * Autocomplete: a text input with a dropdown of selectable suggestions.
 *
 * @fires flint-autocomplete-change - Fired when the selected value changes.
 */
export class FlintAutocomplete extends FlintElement {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
    static styles = unsafeCSS(uiAutocompleteStyles);

    /** The list of selectable options. */
    @property({ type: Array }) options: AutocompleteOption[] = [];
    /** When true, allows arbitrary values that are not in the options list. */
    @property({ type: Boolean }) freeSolo = false;
    /** Whether the autocomplete input is disabled. */
    @property({ type: Boolean }) disabled = false;
    /** The current selected value. */
    @property({ type: String }) value = '';
    /** Placeholder text shown when the input is empty. */
    @property({ type: String }) placeholder = '';

    @state() private _isOpen = false;
    @state() private _inputValue = '';
    @state() private _filteredOptions: AutocompleteOption[] = [];
    @state() private _activeIndex = -1;

    connectedCallback() {
        super.connectedCallback();
        this._inputValue = this.value;
        document.addEventListener('click', this._handleOutsideClick);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._handleOutsideClick);
    }

    willUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('options')) {
            this._filterOptions();
            this._activeIndex = -1;
        }
        if (changedProperties.has('value') && !changedProperties.has('_inputValue')) {
            const selectedOption = this.options.find(opt => opt.value === this.value);
            if (selectedOption) {
                this._inputValue = selectedOption.label;
            } else if (this.freeSolo) {
                this._inputValue = this.value;
            } else {
                this._inputValue = '';
            }
        }
    }

    private _handleOutsideClick = (e: MouseEvent) => {
        if (!this.contains(e.target as Node)) {
            this._isOpen = false;
            this._activeIndex = -1;
            if (!this.freeSolo) {
                const selectedOption = this.options.find(opt => opt.value === this.value);
                this._inputValue = selectedOption ? selectedOption.label : '';
            }
        }
    };

    private _handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this._inputValue = target.value;
        this._activeIndex = -1;

        if (this.freeSolo) {
            this.value = this._inputValue;
            this.dispatchEvent(new CustomEvent('flint-autocomplete-change', { detail: { value: this.value, label: this.value } }));
        }

        this._filterOptions();
        this._isOpen = true;
    }

    private _filterOptions() {
        const q = this._inputValue.toLowerCase();
        this._filteredOptions = this.options.filter(opt =>
            opt.label.toLowerCase().includes(q)
        );
    }

    private _handleFocus() {
        if (this.disabled) return;
        this._filterOptions();
        this._isOpen = true;
        this._activeIndex = -1;
    }

    private _handleKeyDown(e: KeyboardEvent) {
        const count = this._filteredOptions.length;

        if (!this._isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                this._filterOptions();
                this._isOpen = true;
                this._activeIndex = e.key === 'ArrowDown' ? 0 : count - 1;
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this._activeIndex = Math.min(this._activeIndex + 1, count - 1);
                this._scrollActiveIntoView();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this._activeIndex = Math.max(this._activeIndex - 1, -1);
                this._scrollActiveIntoView();
                break;
            case 'Enter':
                if (this._activeIndex >= 0 && this._filteredOptions[this._activeIndex]) {
                    e.preventDefault();
                    this._selectOption(this._filteredOptions[this._activeIndex]!);
                }
                break;
            case 'Escape':
                e.preventDefault();
                this._isOpen = false;
                this._activeIndex = -1;
                if (!this.freeSolo) {
                    const selectedOption = this.options.find(opt => opt.value === this.value);
                    this._inputValue = selectedOption ? selectedOption.label : '';
                }
                break;
            case 'Tab':
                this._isOpen = false;
                this._activeIndex = -1;
                break;
            default:
                break;
        }
    }

    private _scrollActiveIntoView() {
        void this.updateComplete.then(() => {
            if (this._activeIndex < 0) return;
            const optionEls = this.shadowRoot?.querySelectorAll('.option');
            const activeEl = optionEls?.[this._activeIndex] as HTMLElement | undefined;
            if (activeEl && typeof activeEl.scrollIntoView === 'function') {
                activeEl.scrollIntoView({ block: 'nearest' });
            }
        });
    }

    private _selectOption(option: AutocompleteOption) {
        this.value = option.value;
        this._inputValue = option.label;
        this._isOpen = false;
        this._activeIndex = -1;
        this.dispatchEvent(new CustomEvent('flint-autocomplete-change', { detail: { value: option.value, label: option.label } }));
    }

    render() {
        const dropdownOpen = this._isOpen && (this._filteredOptions.length > 0 || !this.freeSolo);
        return html`
      <div class="input-wrapper" part="base">
        <input
          type="text"
          part="input"
          role="combobox"
          aria-expanded=${dropdownOpen ? 'true' : 'false'}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-activedescendant=${this._activeIndex >= 0 ? `option-${this._activeIndex}` : ''}
          .value=${this._inputValue}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @focus=${this._handleFocus}
          @keydown=${this._handleKeyDown}
        />
        <div
          role="listbox"
          part="dropdown"
          class=${classMap({ dropdown: true, open: dropdownOpen })}
        >
          ${this._filteredOptions.length > 0
                ? this._filteredOptions.map(
                    (opt, i) => html`
                  <div
                    id="option-${i}"
                    role="option"
                    aria-selected=${i === this._activeIndex ? 'true' : 'false'}
                    class=${classMap({ option: true, active: i === this._activeIndex })}
                    @mousedown=${(e: Event) => e.preventDefault()}
                    @click=${() => this._selectOption(opt)}
                  >
                    ${opt.label}
                  </div>
                `
                )
                : html`<div class="no-options">No options</div>`}
        </div>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-autocomplete': FlintAutocomplete;
    }
}
