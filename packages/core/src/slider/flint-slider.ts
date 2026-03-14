import { LitElement, unsafeCSS, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FormAssociated } from '../mixins/form-associated.js';
import uiSliderStyles from './flint-slider.css?inline';

type Size = 'sm' | 'md' | 'lg';

@customElement('flint-slider')
export class FlintSlider extends FormAssociated(LitElement) {
  static styles = unsafeCSS(uiSliderStyles);

  // ── Props ─────────────────────────────────────────────────────────────────
  /** Current slider value. */
  @property({ type: Number }) value = 50;
  /** Initial value for uncontrolled usage. */
  @property({ type: Number, attribute: 'default-value' }) defaultValue: number | undefined = undefined;
  /** Minimum allowed value. */
  @property({ type: Number }) min = 0;
  /** Maximum allowed value. */
  @property({ type: Number }) max = 100;
  /** Step increment between values. */
  @property({ type: Number }) step = 1;
  /** Disables the slider and prevents interaction. */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Label text displayed above the slider. */
  @property({ type: String }) label = '';
  /** Whether to display the current value. */
  @property({ type: Boolean, attribute: 'show-value' }) showValue = false;
  /** Renders the slider vertically. */
  @property({ type: Boolean, reflect: true }) vertical = false;
  /** Size variant of the slider. */
  @property({ type: String, reflect: true }) size: Size = 'md';
  /** Form field name used when submitting form data. */
  @property({ type: String }) name = '';
  /** Optional formatter: `(value: number) => string`. JS-only prop (not an attribute). */
  @property({ attribute: false }) formatValue: ((v: number) => string) | undefined = undefined;

  // ── Internals ─────────────────────────────────────────────────────────────

  // ── Safe value getters ────────────────────────────────────────────────────
  private get _safeMin() {
    return this.min < this.max ? this.min : 0;
  }

  private get _safeMax() {
    return this.max > this.min ? this.max : this._safeMin + 100;
  }

  private get _safeValue() {
    return Math.min(this._safeMax, Math.max(this._safeMin, this.value));
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  override willUpdate(changed: PropertyValues) {
    // Initialize from defaultValue once on first update
    if (this._firstUpdate && this.defaultValue !== undefined) {
      this.value = this.defaultValue;
    }
    this._firstUpdate = false;

    // Keep form value in sync with any prop change
    if (changed.has('value') || changed.has('name')) {
      this._initFormValue(this._safeValue.toString());
    }
  }

  // ── Event handler ─────────────────────────────────────────────────────────
  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);

    this.dispatchEvent(new CustomEvent('flint-slider-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  // ── Render ────────────────────────────────────────────────────────────────
  override render() {
    const safeVal = this._safeValue;
    const safeMin = this._safeMin;
    const safeMax = this._safeMax;
    const percentage = ((safeVal - safeMin) / (safeMax - safeMin)) * 100;

    const displayStr = this.formatValue ? this.formatValue(safeVal) : String(safeVal);

    const trackStyle = this.vertical
      ? {
          background: `linear-gradient(to left, var(--flint-primary-color, #3b82f6) 0%, var(--flint-primary-color, #3b82f6) ${percentage}%, var(--flint-input-border-color, #d1d5db) ${percentage}%, var(--flint-input-border-color, #d1d5db) 100%)`,
        }
      : {
          background: `linear-gradient(to right, var(--flint-primary-color, #3b82f6) 0%, var(--flint-primary-color, #3b82f6) ${percentage}%, var(--flint-input-border-color, #d1d5db) ${percentage}%, var(--flint-input-border-color, #d1d5db) 100%)`,
        };

    const wrapperClasses = { 'slider-wrapper': true, vertical: this.vertical };
    const labelRowClasses = { 'label-row': true, vertical: this.vertical };
    const trackClasses = { 'track-container': true, vertical: this.vertical };
    const inputClasses = { vertical: this.vertical };

    const inputId = 'slider-input';

    return html`
      <div class=${classMap(wrapperClasses)}>
        <div class=${classMap(labelRowClasses)}>
          ${this.label
            ? html`<label
                for=${inputId}
                class=${classMap({ 'disabled-label': this.disabled })}
              >${this.label}</label>`
            : ''}
          ${this.showValue ? html`<span class="value-display">${displayStr}</span>` : ''}
        </div>
        <div class=${classMap(trackClasses)}>
          <input
            id=${inputId}
            type="range"
            class=${classMap(inputClasses)}
            .min=${safeMin.toString()}
            .max=${safeMax.toString()}
            .step=${this.step.toString()}
            .value=${safeVal.toString()}
            ?disabled=${this.disabled}
            aria-disabled=${this.disabled ? 'true' : 'false'}
            @input=${this._handleInput}
            style=${styleMap(trackStyle)}
            aria-label=${this.label || 'Slider'}
            aria-orientation=${this.vertical ? 'vertical' : 'horizontal'}
            aria-valuemin=${safeMin}
            aria-valuemax=${safeMax}
            aria-valuenow=${safeVal}
            aria-valuetext=${this.formatValue ? displayStr : ''}
          >
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-slider': FlintSlider;
  }
}
