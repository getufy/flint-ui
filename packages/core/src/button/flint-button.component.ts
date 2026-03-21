import { unsafeCSS, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { validateEnum } from '../utilities/dev-warnings.js';
import type { Size } from '../types.js';
import uiButtonStyles from './flint-button.css?inline';

export type ButtonAppearance = 'filled' | 'outlined' | 'text' | 'ghost';
export type ButtonColor = 'primary' | 'neutral' | 'destructive' | 'success' | 'warning';
export type ButtonSize = Size;
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonShape = 'default' | 'pill' | 'circle';

/**
 * Button: a clickable element used for actions and navigation.
 *
 * @csspart base - The button's base wrapper element.
 * @csspart prefix - The container wrapping the prefix slot.
 * @csspart label - The container wrapping the default slot (label text).
 * @csspart suffix - The container wrapping the suffix slot.
 * @csspart spinner - The loading spinner element.
 */
export class FlintButton extends FlintElement {
  static styles = unsafeCSS(uiButtonStyles);

  /**
   * Visual appearance of the button (structural style).
   * @default 'filled'
   */
  @property({ type: String, reflect: true })
  appearance: ButtonAppearance = 'filled';

  /**
   * Semantic color of the button.
   * @default 'primary'
   */
  @property({ type: String, reflect: true })
  color: ButtonColor = 'primary';

  /**
   * Size of the button.
   * @default 'md'
   */
  @property({ type: String })
  size: ButtonSize = 'md';

  /** Disables the button and prevents interaction. */
  @property({ type: Boolean })
  disabled = false;

  /** Whether the button stretches to fill its container width. */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Button type attribute. When `submit` or `reset`, a hidden native
   * button is used to proxy form submission / reset.
   * @default 'button'
   */
  @property({ type: String })
  type: ButtonType = 'button';

  /**
   * Accessible label for screen readers. Essential for icon-only buttons.
   */
  @property({ type: String })
  label = '';

  /**
   * Shows a loading spinner and disables interaction.
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * When set, renders an `<a>` tag instead of a `<button>`.
   */
  @property({ type: String })
  href = '';

  /**
   * Optional `target` attribute when `href` is set.
   */
  @property({ type: String })
  target = '';

  /**
   * Shape variant of the button.
   * - `default` — standard rounded corners
   * - `pill` — fully rounded ends
   * - `circle` — circular, best for icon-only buttons
   * @default 'default'
   */
  @property({ type: String })
  shape: ButtonShape = 'default';

  override willUpdate() {
    if (import.meta.env?.DEV) {
      validateEnum('flint-button', 'appearance', this.appearance, ['filled', 'outlined', 'text', 'ghost']);
      validateEnum('flint-button', 'color', this.color, ['primary', 'neutral', 'destructive', 'success', 'warning']);
      validateEnum('flint-button', 'size', this.size, ['sm', 'md', 'lg']);
      validateEnum('flint-button', 'shape', this.shape, ['default', 'pill', 'circle']);
    }
  }

  private _handleClick() {
    if (this.disabled || this.loading) return;

    if (this.type === 'submit' || this.type === 'reset') {
      const proxy = this.shadowRoot?.querySelector('.form-proxy') as HTMLButtonElement | null;
      proxy?.click();
    }
  }

  render() {
    const isDisabled = this.disabled || this.loading;
    const classes = {
      [this.appearance]: true,
      [this.color]: true,
      [this.size]: true,
      pill: this.shape === 'pill',
      circle: this.shape === 'circle',
      'is-loading': this.loading,
      'is-disabled': isDisabled,
    };

    const ariaLabel = this.label || undefined;

    const inner = html`
      <span class="prefix-slot" part="prefix"><slot name="prefix"></slot></span>
      <span class="label-inner" part="label"><slot></slot></span>
      <span class="suffix-slot" part="suffix"><slot name="suffix"></slot></span>
      <span class="spinner" part="spinner" aria-hidden="true">
        <span class="spinner-icon"></span>
      </span>
    `;

    // Link variant
    if (this.href) {
      return html`
        <a
          class=${classMap(classes)}
          part="base"
          href=${this.href}
          target=${this.target || nothing}
          rel=${this.target ? 'noopener noreferrer' : nothing}
          aria-label=${ariaLabel ?? nothing}
          aria-disabled=${isDisabled ? 'true' : nothing}
          aria-busy=${this.loading ? 'true' : nothing}
          role="button"
          tabindex=${isDisabled ? '-1' : nothing}
        >${inner}</a>
      `;
    }

    // Button variant
    return html`
      <button
        type="button"
        class=${classMap(classes)}
        ?disabled=${isDisabled}
        part="base"
        aria-label=${ariaLabel ?? nothing}
        aria-busy=${this.loading ? 'true' : nothing}
        @click=${this._handleClick}
      >${inner}</button>
      ${this.type !== 'button'
        ? html`<button
            class="form-proxy"
            type=${this.type as string}
            tabindex="-1"
            aria-hidden="true"
            ?disabled=${isDisabled}
          ></button>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-button': FlintButton;
  }
}
