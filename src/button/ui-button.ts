import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ui-button')
export class UiButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    :host([full-width]) {
      display: block;
    }
    button {
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      font-weight: 600;
      border: none;
      border-radius: var(--ui-button-border-radius, var(--ui-border-radius-md, 6px));
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      transition: all 0.2s ease;
      box-shadow: var(--ui-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
    }
    .primary {
      background-color: var(--ui-primary-color, #3b82f6);
      color: var(--ui-text-color-on-primary, white);
    }
    .primary:hover {
      background-color: var(--ui-primary-color-hover, #2563eb);
    }
    .primary:active {
      background-color: var(--ui-primary-color-active, #1d4ed8);
    }
    .secondary {
      background-color: var(--ui-surface-background, white);
      color: var(--ui-text-color, #111827);
      border: 1px solid var(--ui-input-border-color, #d1d5db);
    }
    .secondary:hover {
      background-color: var(--ui-hover-color, #f3f4f6);
    }
    .secondary:active {
      background-color: var(--ui-active-color, #e5e7eb);
    }
    .destructive {
      background-color: var(--ui-destructive-color, #ef4444);
      color: var(--ui-text-color-on-primary, white);
    }
    .destructive:hover {
      background-color: var(--ui-destructive-color-hover, #dc2626);
    }
    .destructive:active {
      background-color: var(--ui-destructive-color-active, #b91c1c);
    }
    .small {
      padding: 6px 12px;
      font-size: 14px;
    }
    .medium {
      padding: 10px 16px;
      font-size: 14px;
    }
    .large {
      padding: 14px 20px;
      font-size: 16px;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;

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
    'ui-button': UiButton;
  }
}
