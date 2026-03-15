import { unsafeCSS, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiBackdropStyles from './flint-backdrop.css?inline';

/**
 * A backdrop component that narrows the user's focus to a particular element.
 *
 * @fires flint-backdrop-close - Dispatched when the backdrop is clicked or Escape is pressed. detail: `{ open: false }`
 * @slot - Content to display in the foreground.
 */
export class FlintBackdrop extends FlintElement {
  static styles = unsafeCSS(uiBackdropStyles);

  /** Whether the backdrop is visible and active. */
  @property({ type: Boolean, reflect: true }) open = false;
  /** When true, the backdrop overlay is transparent. */
  @property({ type: Boolean }) invisible = false;
  /** When true, the backdrop is scoped to its parent container instead of the viewport. */
  @property({ type: Boolean, reflect: true }) container = false;

  private _boundKeydown = this._handleKeydown.bind(this);

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._boundKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._boundKeydown);
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.open) {
      this.dispatchEvent(new CustomEvent('flint-backdrop-close', { bubbles: true, composed: true, detail: { open: false } }));
    }
  }

  private _handleClick(e: MouseEvent) {
    // Only trigger close if clicking directly on the backdrop, not the content
    if (e.target === e.currentTarget) {
      this.dispatchEvent(new CustomEvent('flint-backdrop-close', { bubbles: true, composed: true, detail: { open: false } }));
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
        role="presentation"
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
    'flint-backdrop': FlintBackdrop;
  }
}
