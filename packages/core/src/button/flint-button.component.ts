import { unsafeCSS, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiButtonStyles from './flint-button.css?inline';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'success' | 'warning' | 'neutral';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonShape = 'default' | 'pill' | 'circle';

export class FlintButton extends FlintElement {
  static styles = unsafeCSS(uiButtonStyles);

  /**
   * Visual style variant of the button.
   * @default 'primary'
   */
  @property({ type: String })
  variant: ButtonVariant = 'primary';

  /**
   * Size of the button.
   * @default 'medium'
   */
  @property({ type: String })
  size: ButtonSize = 'medium';

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
      [this.variant]: true,
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
