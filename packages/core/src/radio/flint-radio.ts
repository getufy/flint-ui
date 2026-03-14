import { LitElement, unsafeCSS, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormAssociated } from '../mixins/form-associated.js';
import uiRadioGroupStyles from './flint-radio-group.css?inline';
import uiRadioStyles from './flint-radio.css?inline';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioOrientation = 'horizontal' | 'vertical';

@customElement('flint-radio-group')
export class FlintRadioGroup extends FormAssociated(LitElement) {
    static styles = unsafeCSS(uiRadioGroupStyles);

    @property({ type: String }) label = '';
    @property({ type: String }) name = '';
    @property({ type: String }) value = '';
    @property({ type: String, attribute: 'default-value' }) defaultValue = '';
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) required = false;
    @property({ type: String, reflect: true }) orientation: RadioOrientation = 'vertical';
    @property({ type: String, reflect: true }) size: RadioSize = 'md';

    private _handleRadioSelect = (e: Event) => {
        this._onRadioSelect(e as CustomEvent);
    };

    private _handleKeyDown = (e: Event) => {
        this._onKeyDown(e as KeyboardEvent);
    };

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('flint-radio-select', this._handleRadioSelect);
        this.addEventListener('keydown', this._handleKeyDown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('flint-radio-select', this._handleRadioSelect);
        this.removeEventListener('keydown', this._handleKeyDown);
    }

    willUpdate() {
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultValue && !this.value) {
                this.value = this.defaultValue;
            }
        }
    }

    updated(changed: PropertyValues) {
        if (changed.has('value') || changed.has('name') || changed.has('size') || changed.has('required')) {
            this._syncChildren();
        }
        if (changed.has('value') || changed.has('name') || changed.has('required')) {
            this._updateFormValue();
        }
    }

    formResetCallback() {
        this.value = this.defaultValue || '';
        this._updateFormValue();
    }

    private _updateFormValue() {
        this._initFormValue(this.value || null);
        this._initFormValidity(this.required, !this.value, 'Please select an option.');
    }

    private _getRadios(): FlintRadio[] {
        return Array.from(this.querySelectorAll('flint-radio')) as FlintRadio[];
    }

    private _getEnabledRadios(): FlintRadio[] {
        return this._getRadios().filter(r => !r.disabled);
    }

    private _onRadioSelect(e: CustomEvent) {
        if (this.disabled) return;
        const { value } = e.detail;
        this.value = value;
        this._syncChildren();
        this.dispatchEvent(new CustomEvent('flint-radio-group-change', {
            detail: { value },
            bubbles: true,
            composed: true,
        }));
    }

    private _onKeyDown(e: KeyboardEvent) {
        if (this.disabled) return;
        if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

        const enabled = this._getEnabledRadios();
        if (!enabled.length) return;

        const path = e.composedPath();
        const focused = enabled.find(r => path.includes(r));
        const currentIndex = focused
            ? enabled.indexOf(focused)
            : enabled.findIndex(r => r.value === this.value);
        const startIndex = currentIndex >= 0 ? currentIndex : 0;

        e.preventDefault();
        const nextIndex = (e.key === 'ArrowDown' || e.key === 'ArrowRight')
            ? (startIndex + 1) % enabled.length
            : (startIndex - 1 + enabled.length) % enabled.length;

        const next = enabled[nextIndex];
        next.focus();
        this.value = next.value;
        this._syncChildren();
        this.dispatchEvent(new CustomEvent('flint-radio-group-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    private _syncChildren() {
        this._getRadios().forEach(r => {
            r.checked = r.value === this.value;
            if (this.name) r.name = this.name;
            r.size = this.size;
            r.required = this.required;
        });
    }

    private _handleSlotChange() {
        this._syncChildren();
    }

    render() {
        return html`
            <div
                class="group-container"
                role="radiogroup"
                aria-label=${ifDefined(this.label || undefined)}
                aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
                aria-required=${ifDefined(this.required ? 'true' : undefined)}
            >
                <slot @slotchange=${this._handleSlotChange}></slot>
            </div>
        `;
    }
}

@customElement('flint-radio')
export class FlintRadio extends LitElement {
    static styles = unsafeCSS(uiRadioStyles);

    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) required = false;
    @property({ type: String }) name = '';
    @property({ type: String }) value = '';
    @property({ type: String }) label = '';
    @property({ type: String, reflect: true }) size: RadioSize = 'md';

    override focus(options?: FocusOptions) {
        this.shadowRoot?.querySelector<HTMLInputElement>('input')?.focus(options);
    }

    private _handleChange() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('flint-radio-select', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    render() {
        return html`
            <label class=${classMap({ wrapper: true, disabled: this.disabled })}>
                <input
                    type="radio"
                    .name=${this.name}
                    .value=${this.value}
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    ?required=${this.required}
                    @change=${this._handleChange}
                >
                <div class=${classMap({ 'radio-circle': true, checked: this.checked })}></div>
                <span class="label">
                    ${this.label ? this.label : html`<slot></slot>`}
                </span>
            </label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-radio-group': FlintRadioGroup;
        'flint-radio': FlintRadio;
    }
}
