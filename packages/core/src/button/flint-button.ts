import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiButtonStyles from './flint-button.css?inline';

/**
 * A styled button element.
 *
 * @csspart base - The native `<button>` element.
 * @csspart label - The wrapper around the button's label content (default slot).
 */
@customElement('flint-button')
export class FlintButton extends LitElement {
  static styles = unsafeCSS(uiButtonStyles);

  /** Visual style variant of the button. */
  @property({ type: String })
  variant: 'primary' | 'secondary' | 'destructive' = 'primary';

  /** Size of the button. */
  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  /** Disables the button and prevents interaction. */
  @property({ type: Boolean })
  disabled = false;

  /** Whether the button stretches to fill its container width. */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  render() {
    const classes = {
      primary: this.variant === 'primary',
      secondary: this.variant === 'secondary',
      destructive: this.variant === 'destructive',
      small: this.size === 'small',
      medium: this.size === 'medium',
      large: this.size === 'large',
    };

    return html`
      <button
        type="button"
        class=${classMap(classes)}
        ?disabled=${this.disabled}
        part="base"
      >
        <span part="label"><slot></slot></span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-button': FlintButton;
  }
}
