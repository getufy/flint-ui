import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * A divider component that provides a thin line for grouping elements.
 * 
 * @slot - Optional text or content to display within the divider.
 */
@customElement('ui-divider')
export class UiDivider extends LitElement {
  static styles = css`
    :host {
      display: block;
      --ui-divider-color: var(--ui-border-color, #e5e7eb);
      --ui-divider-margin: 16px;
      --ui-divider-thickness: 1px;
    }

    .divider-container {
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      margin: var(--ui-divider-margin) 0;
    }

    .divider-line {
      flex-grow: 1;
      height: var(--ui-divider-thickness);
      background-color: var(--ui-divider-color);
      border: none;
    }

    .divider-content {
      padding: 0 16px;
      font-family: var(--ui-font-family, sans-serif);
      font-size: 0.875rem;
      color: var(--ui-text-color-muted, #6b7280);
      white-space: nowrap;
    }

    /* Vertical Orientation */
    :host([orientation="vertical"]) {
      display: flex;
      align-self: stretch;
      margin: 0;
      width: auto;
      min-width: var(--ui-divider-thickness);
    }

    :host([orientation="vertical"]) .divider-container {
      flex-direction: column;
      height: 100%;
      width: auto;        /* override the default width: 100% */
      min-width: var(--ui-divider-thickness);
      margin: 0;
    }

    :host([orientation="vertical"]) .divider-line {
      width: var(--ui-divider-thickness);
      height: auto;
      flex: 1;            /* stretch to fill the full height of the row */
      min-height: 24px;
    }

    /* Variants */
    .variant-middle {
      margin-left: 32px;
      margin-right: 32px;
      width: auto;
    }

    .variant-inset {
      margin-left: 72px;
    }

    /* Thickness weights */
    .weight-light { --ui-divider-thickness: 1px; }
    .weight-medium { --ui-divider-thickness: 2px; }
    .weight-heavy { --ui-divider-thickness: 4px; }
  `;

  @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: String }) variant: 'full' | 'middle' | 'inset' = 'full';
  @property({ type: String }) weight: 'light' | 'medium' | 'heavy' = 'light';
  @property({ type: String }) textAlign: 'left' | 'center' | 'right' = 'center';

  render() {
    return html`
      <div 
        class="divider-container ${classMap({
      [`variant-${this.variant}`]: true,
      [`weight-${this.weight}`]: true
    })}"
        role="separator"
        aria-orientation="${this.orientation}"
      >
        ${this.textAlign !== 'left' || this.orientation === 'vertical' ? html`<div class="divider-line"></div>` : ''}
        
        <slot class="divider-content"></slot>
        
        ${this.textAlign !== 'right' || this.orientation === 'vertical' ? html`<div class="divider-line"></div>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-divider': UiDivider;
  }
}
