import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiButtonStyles from './flint-button.css?inline';

@customElement('flint-button')
export class FlintButton extends LitElement {
  static styles = unsafeCSS(uiButtonStyles);

  @property({ type: String })
  variant: 'primary' | 'secondary' | 'destructive' = 'primary';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean })
  disabled = false;

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
