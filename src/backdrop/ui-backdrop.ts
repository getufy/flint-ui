import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * A backdrop component that narrows the user's focus to a particular element.
 * 
 * @fires close - Dispatched when the backdrop is clicked.
 * @slot - Content to display in the foreground.
 */
@customElement('ui-backdrop')
export class UiBackdrop extends LitElement {
  static styles = css`
    :host {
      display: block;
      --ui-backdrop-color: rgba(0, 0, 0, 0.5);
      --ui-backdrop-z-index: 1200;
    }

    .backdrop {
      position: var(--ui-backdrop-position, fixed);
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      background-color: var(--ui-backdrop-color);
      z-index: var(--ui-backdrop-z-index);
      -webkit-tap-highlight-color: transparent;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
    }

    :host([container]) {
      --ui-backdrop-position: absolute;
    }

    .backdrop.open {
      opacity: 1;
      visibility: visible;
    }

    .backdrop.invisible {
      background-color: transparent;
    }

    .content {
      z-index: calc(var(--ui-backdrop-z-index) + 1);
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean }) invisible = false;
  @property({ type: Boolean, reflect: true }) container = false;

  private _handleClick(e: MouseEvent) {
    // Only trigger close if clicking directly on the backdrop, not the content
    if (e.target === e.currentTarget) {
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }
  }

  render() {
    return html`
      <div 
        class="${classMap({
      backdrop: true,
      open: this.open,
      invisible: this.invisible
    })}" 
        @click="${this._handleClick}"
        aria-hidden="${this.open ? nothing : 'true'}"
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-backdrop': UiBackdrop;
  }
}
