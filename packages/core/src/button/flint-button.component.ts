import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiButtonStyles from './flint-button.css?inline';

export class FlintButton extends FlintElement {
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
        part="button"
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flint-button': FlintButton;
  }
}
