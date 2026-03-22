import { unsafeCSS, html, type PropertyValues, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { LocalizeController } from '../utilities/localize.js';
import { FlintPopup } from '../popup/flint-popup.component.js';
import { FormAssociated } from '../mixins/form-associated.js';
import { FormControlController } from '../controllers/form-control.js';
import { rovingIndex } from '../utilities/roving-index.js';
import uiComboboxStyles from './flint-combobox.css?inline';

export interface ComboboxOption {
    label: string;
    value: string;
}

/**
 * Combobox: a free-text input with dropdown suggestions.
 *
 * Unlike Select, this always allows arbitrary text input (freeSolo behaviour).
 * Unlike Autocomplete with `freeSolo`, this is purpose-built for the combobox pattern.
 *
 * @fires flint-combobox-change - Fired when the value changes. detail: `{ value: string }`
 *
 * @csspart base - The wrapper element.
 * @csspart input - The text input element.
 * @csspart listbox - The dropdown suggestions container.
 * @csspart option - An individual suggestion element.
 */
export class FlintCombobox extends FormAssociated(FlintElement) {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
    static styles = unsafeCSS(uiComboboxStyles);

    private _localize = new LocalizeController(this);

    static override dependencies: Record<string, typeof FlintElement> = {
        'flint-popup': FlintPopup,
    };

    /** The list of suggestion options. */
    @property({ type: Array }) options: ComboboxOption[] = [];

    /** The current text value. */
    @property({ type: String }) value = '';

    /** Placeholder text shown when the input is empty. */
    @property({ type: String }) placeholder = '';

    /** Whether the combobox is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Marks the combobox as required for form validation. */
    @property({ type: Boolean, reflect: true }) required = false;

    /** Form field name used when submitting form data. */
    @property({ type: String }) name = '';

    /** Initial value for uncontrolled usage. */
    @property({ type: String, attribute: 'default-value' }) defaultValue = '';

    private _formControl = new FormControlController(this);

    @state() private _isOpen = false;
    @state() private _inputValue = '';
    @state() private _filteredOptions: ComboboxOption[] = [];
    @state() private _activeIndex = -1;

    private _abortController?: AbortController;

    connectedCallback() {
        super.connectedCallback();
        this._inputValue = this.value;
        this._abortController = new AbortController();
        document.addEventListener('click', this._handleOutsideClick, { signal: this._abortController.signal });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._abortController?.abort();
    }

    willUpdate(changed: PropertyValues) {
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultValue && !this.value) {
                this.value = this.defaultValue;
                this._inputValue = this.defaultValue;
            }
        }
        if (changed.has('options')) {
            this._filterOptions();
            this._activeIndex = -1;
        }
        if (changed.has('value') && !changed.has('_inputValue')) {
            this._inputValue = this.value;
        }
        if (changed.has('value') || changed.has('name') || changed.has('required')) {
            this._updateFormValue();
        }
    }

    formResetCallback() {
        this.value = this.defaultValue;
        this._inputValue = this.defaultValue;
        this._updateFormValue();
        this._formControl.reset();
    }

    private _updateFormValue() {
        this._initFormValue(this.value || null);
        this._initFormValidity(this.required, !this.value, 'Please enter a value.');
        this._formControl.updateDataAttributes();
    }

    private _handleOutsideClick = (e: MouseEvent) => {
        const path = e.composedPath();
        const inside = path.length > 0 ? path.includes(this) : this.contains(e.target as Node);
        if (!inside) {
            this._isOpen = false;
            this._activeIndex = -1;
        }
    };

    private _handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        this._inputValue = target.value;
        this.value = target.value;
        this._activeIndex = -1;
        this._filterOptions();
        this._isOpen = true;
        this._dispatchChange();
    };

    private _filterOptions() {
        const q = this._inputValue.toLowerCase();
        this._filteredOptions = q
            ? this.options.filter(opt => opt.label.toLowerCase().includes(q))
            : [...this.options];
    }

    private _handleFocus = () => {
        if (this.disabled) return;
        this._filterOptions();
        this._isOpen = true;
        this._activeIndex = -1;
    };

    private _handleKeyDown = (e: KeyboardEvent) => {
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

        // ArrowUp from index 0 should go to -1 (deselect), so offset by 1
        const { index, handled } = rovingIndex(e.key, this._activeIndex + 1, count + 1, { wrap: false });
        if (handled) {
            e.preventDefault();
            this._activeIndex = index - 1;
            this._scrollActiveIntoView();
            return;
        }

        switch (e.key) {
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
                break;
            case 'Tab':
                this._isOpen = false;
                this._activeIndex = -1;
                break;
        }
    };

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

    private _selectOption(option: ComboboxOption) {
        this.value = option.value;
        this._inputValue = option.label;
        this._isOpen = false;
        this._activeIndex = -1;
        this._dispatchChange();
    }

    private _dispatchChange() {
        this.emit('flint-combobox-change', { value: this.value });
    }

    render() {
        const dropdownOpen = this._isOpen && this._filteredOptions.length > 0;
        return html`
      <div class="base" part="base">
        <flint-popup
          .active=${dropdownOpen}
          placement="bottom-start"
          .strategy=${'fixed' as const}
          .distance=${4}
          flip
          shift
          sync="width"
        >
          <input
            slot="anchor"
            type="text"
            part="input"
            role="combobox"
            aria-expanded=${dropdownOpen ? 'true' : 'false'}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-controls="combobox-listbox"
            aria-activedescendant=${this._activeIndex >= 0 ? `combobox-opt-${this._activeIndex}` : ''}
            .value=${this._inputValue}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            @focus=${this._handleFocus}
            @keydown=${this._handleKeyDown}
          />
          <div
            id="combobox-listbox"
            role="listbox"
            part="listbox"
            aria-label=${this._localize.term('suggestions')}
            class=${classMap({ listbox: true, open: dropdownOpen })}
          >
            ${this._filteredOptions.length > 0
                ? this._filteredOptions.map(
                    (opt, i) => html`
                  <div
                    id="combobox-opt-${i}"
                    role="option"
                    part="option"
                    aria-selected=${i === this._activeIndex ? 'true' : 'false'}
                    class=${classMap({
                        option: true,
                        active: i === this._activeIndex,
                        selected: opt.value === this.value,
                    })}
                    @mousedown=${(e: Event) => e.preventDefault()}
                    @click=${() => this._selectOption(opt)}
                  >
                    ${opt.label}
                  </div>
                `
                )
                : html`<div class="no-options">No suggestions</div>`}
          </div>
        </flint-popup>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-combobox': FlintCombobox;
    }
}
