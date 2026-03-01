import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('ui-slider')
export class UiSlider extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 12px 0;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      color: var(--ui-text-color, #111827);
    }

    :host([vertical]) {
      /* The host IS the sizing boundary. Consumers set height on the host
         (or via --ui-slider-vertical-height). Internal layout fills it. */
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
      /* Fill the host completely; label row at top, track fills the rest */
      flex-direction: column;
      align-items: center;
      gap: 12px;
      width: 100%;
      height: 100%;
      /* Move label/value to the bottom so the track has maximum room above */
      flex-direction: column-reverse;
      justify-content: flex-end;
    }

    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
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
      /* Fill all remaining vertical space */
      flex: 1;
      min-height: 0;   /* critical: lets flex child shrink below content size */
      width: auto;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    input[type='range'] {
      -webkit-appearance: none;
      width: 100%;
      height: 6px;
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
      /* Width/height are swapped in vertical writing mode:
         'width' here becomes the visual thickness of the track,
         'height' becomes the visual length. */
      width: 6px;
      height: 100%;
      margin: 0;
      appearance: slider-vertical;
      -webkit-appearance: slider-vertical;
    }

    @supports not (appearance: slider-vertical) {
      input[type='range'].vertical {
        writing-mode: vertical-lr;
        direction: rtl;
        width: 6px;
        height: 100%;
        margin: 0;
      }
    }

    input[type='range']:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Thumb Styling */
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--ui-surface-background, white);
      border: 2px solid var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-sm);
      cursor: pointer;
      transition: transform 0.1s ease, box-shadow 0.1s ease;
    }

    input[type='range']::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--ui-surface-background, white);
      border: 2px solid var(--ui-primary-color, #3b82f6);
      box-shadow: var(--ui-shadow-sm);
      cursor: pointer;
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

  @property({ type: Number }) value = 50;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';
  @property({ type: Boolean }) showValue = false;
  @property({ type: Boolean, reflect: true }) vertical = false;

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;

    // For vertical sliders, the fill direction is bottom-to-top.
    // writing-mode: vertical-lr + direction: rtl maps "left" to "bottom",
    // so we keep the same gradient direction and it renders correctly.
    const trackStyle = this.vertical
      ? {
        background: `linear-gradient(to left, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${percentage}%, var(--ui-input-border-color, #d1d5db) ${percentage}%, var(--ui-input-border-color, #d1d5db) 100%)`
      }
      : {
        background: `linear-gradient(to right, var(--ui-primary-color, #3b82f6) 0%, var(--ui-primary-color, #3b82f6) ${percentage}%, var(--ui-input-border-color, #d1d5db) ${percentage}%, var(--ui-input-border-color, #d1d5db) 100%)`
      };

    const wrapperClasses = { 'slider-wrapper': true, vertical: this.vertical };
    const labelRowClasses = { 'label-row': true, vertical: this.vertical };
    const trackClasses = { 'track-container': true, vertical: this.vertical };
    const inputClasses = { vertical: this.vertical };

    return html`
      <div class=${classMap(wrapperClasses)}>
        <div class=${classMap(labelRowClasses)}>
          ${this.label ? html`<label class=${classMap({ 'disabled-label': this.disabled })}>${this.label}</label>` : ''}
          ${this.showValue ? html`<span class="value-display">${this.value}</span>` : ''}
        </div>
        <div class=${classMap(trackClasses)}>
          <input
            type="range"
            class=${classMap(inputClasses)}
            .min=${this.min.toString()}
            .max=${this.max.toString()}
            .step=${this.step.toString()}
            .value=${this.value.toString()}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            style=${styleMap(trackStyle)}
            aria-label=${this.label || 'Slider'}
            aria-orientation=${this.vertical ? 'vertical' : 'horizontal'}
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