import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

type Size = 'sm' | 'md' | 'lg';

@customElement('ui-slider')
export class UiSlider extends LitElement {
  static formAssociated = true;

  static styles = css`
    :host {
      display: block;
      padding: 12px 0;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);

      /* Size tokens — overridden per size below */
      --_track-height: 6px;
      --_thumb-size: 20px;
      --_font-size: 14px;
    }

    :host([size='sm']) {
      --_track-height: 4px;
      --_thumb-size: 14px;
      --_font-size: 12px;
    }

    :host([size='lg']) {
      --_track-height: 8px;
      --_thumb-size: 24px;
      --_font-size: 16px;
    }

    :host([vertical]) {
      padding: 0 12px;
      display: inline-flex;
      height: var(--ui-slider-vertical-height, 200px);
    }

    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .slider-wrapper.vertical {
      flex-direction: column-reverse;
      align-items: center;
      gap: 12px;
      width: 100%;
      height: 100%;
      justify-content: flex-end;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--_font-size);
      font-weight: 500;
    }

    .label-row.vertical {
      flex-direction: column;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .value-display {
      font-weight: 600;
      color: var(--ui-primary-color, #3b82f6);
    }

    .track-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .track-container.vertical {
      flex: 1;
      min-height: 0;
      width: auto;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    input[type='range'] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: var(--_track-height);
      background: var(--ui-input-border-color, #d1d5db);
      border-radius: 3px;
      outline: none;
      margin: 10px 0;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    input[type='range'].vertical {
      writing-mode: vertical-lr;
      direction: rtl;
      width: var(--_track-height);
      height: 100%;
      margin: 0;
      appearance: slider-vertical;
      -webkit-appearance: slider-vertical;
    }

    @supports not (appearance: slider-vertical) {
      input[type='range'].vertical {
        writing-mode: vertical-lr;
        direction: rtl;
        width: var(--_track-height);
        height: 100%;
        margin: 0;
      }
    }

    input[type='range']:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Thumb — WebKit */
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: var(--_thumb-size);
      height: var(--_thumb-size);
      border-radius: 50%;
      background: var(--ui-surface-background, white);
      border: 2px solid var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-sm);
      cursor: pointer;
      transition: transform 0.1s ease, box-shadow 0.1s ease;
    }

    /* Thumb — Firefox */
    input[type='range']::-moz-range-thumb {
      width: calc(var(--_thumb-size) - 2px);
      height: calc(var(--_thumb-size) - 2px);
      border-radius: 50%;
      background: var(--ui-surface-background, white);
      border: 2px solid var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-sm);
      cursor: pointer;
    }

    /* Firefox fill track */
    input[type='range']::-moz-range-progress {
      background: var(--ui-primary-color, #3b82f6);
      height: var(--_track-height);
      border-radius: 3px;
    }

    input[type='range']:focus-visible::-webkit-slider-thumb {
      outline: 2px solid var(--ui-primary-color, #3b82f6);
      outline-offset: 4px;
    }

    input[type='range']:not(:disabled):hover::-webkit-slider-thumb {
      transform: scale(1.1);
      box-shadow: var(--ui-shadow-md);
    }

    input[type='range']:active::-webkit-slider-thumb {
      transform: scale(0.95);
    }

    .disabled-label {
      color: var(--ui-text-color-muted);
    }
  `;

  // ── Form association ──────────────────────────────────────────────────────
  private _internals: ElementInternals | null = null;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this._internals = this.attachInternals();
    }
  }

  // ── Props ─────────────────────────────────────────────────────────────────
  @property({ type: Number }) value = 50;
  @property({ type: Number, attribute: 'default-value' }) defaultValue: number | undefined = undefined;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: Boolean, attribute: 'show-value' }) showValue = false;
  @property({ type: Boolean, reflect: true }) vertical = false;
  @property({ type: String, reflect: true }) size: Size = 'md';
  @property({ type: String }) name = '';
  /** Optional formatter: `(value: number) => string`. JS-only prop (not an attribute). */
  @property({ attribute: false }) formatValue: ((v: number) => string) | undefined = undefined;

  // ── Internals ─────────────────────────────────────────────────────────────
  private _firstUpdate = true;

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
      if (typeof this._internals?.setFormValue === 'function') {
        this._internals.setFormValue(this._safeValue.toString());
      }
    }
  }

  // ── Event handler ─────────────────────────────────────────────────────────
  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);

    this.dispatchEvent(new CustomEvent('ui-slider-change', {
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
          background: `linear-gradient(to left, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${percentage}%, var(--ui-input-border-color, #d1d5db) ${percentage}%, var(--ui-input-border-color, #d1d5db) 100%)`,
        }
      : {
          background: `linear-gradient(to right, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${percentage}%, var(--ui-input-border-color, #d1d5db) ${percentage}%, var(--ui-input-border-color, #d1d5db) 100%)`,
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
            @input=${this._handleInput}
            style=${styleMap(trackStyle)}
            aria-label=${this.label || 'Slider'}
            aria-orientation=${this.vertical ? 'vertical' : 'horizontal'}
            aria-valuetext=${this.formatValue ? displayStr : ''}
          >
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-slider': UiSlider;
  }
}
