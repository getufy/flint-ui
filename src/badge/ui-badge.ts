import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * A badge component that generates a small badge at the top-right of its children.
 * 
 * @slot - The content to which the badge is attached.
 */
@customElement('ui-badge')
export class UiBadge extends LitElement {
    static styles = css`
    :host {
      display: inline-flex;
      position: relative;
      vertical-align: middle;
      flex-shrink: 0;
    }

    .badge {
      display: flex;
      flex-wrap: wrap;
      place-content: center;
      align-items: center;
      position: absolute;
      box-sizing: border-box;
      font-family: var(--ui-font-family, sans-serif);
      font-weight: 600;
      font-size: 0.75rem;
      min-width: 20px;
      line-height: 1;
      padding: 0 6px;
      height: 20px;
      border-radius: 10px;
      z-index: 1;
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      background-color: var(--ui-badge-background, var(--ui-primary-color, #3b82f6));
      color: var(--ui-badge-color, var(--ui-text-color-on-primary, white));
      top: 0;
      right: 0;
      transform: scale(1) translate(50%, -50%);
      transform-origin: 100% 0%;
      border: 2px solid var(--ui-surface-background, white);
    }

    .badge.hidden {
      transform: scale(0) translate(50%, -50%);
    }

    .badge.dot {
      min-width: 8px;
      height: 8px;
      padding: 0;
      border-radius: 4px;
    }

    /* Variants */
    .primary { background-color: var(--ui-primary-color, #3b82f6); }
    .secondary { background-color: var(--ui-secondary-color, #6b7280); }
    .error { background-color: #ef4444; }
    .success { background-color: #10b981; }
    .warning { background-color: #f59e0b; }
  `;

    @property({ type: String }) content = '';
    @property({ type: Boolean }) dot = false;
    @property({ type: Boolean }) invisible = false;
    @property({ type: String }) variant: 'primary' | 'secondary' | 'error' | 'success' | 'warning' = 'primary';
    @property({ type: Number }) max = 99;

    private get _displayContent() {
        if (this.dot) return '';
        const num = Number(this.content);
        if (!isNaN(num) && num > this.max) {
            return `${this.max}+`;
        }
        return this.content;
    }

    render() {
        const showBadge = !this.invisible && (this.dot || this.content !== '');

        return html`
      <slot></slot>
      <span
        class="badge ${classMap({
            hidden: !showBadge,
            dot: this.dot,
            [this.variant]: true
        })}"
        role="status"
        aria-hidden="${!showBadge ? 'true' : 'false'}"
      >
        ${this._displayContent}
      </span>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-badge': UiBadge;
    }
}
