import { LitElement, unsafeCSS, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiBackdropStyles from './ui-backdrop.css?inline';

/**
 * A backdrop component that narrows the user's focus to a particular element.
 *
 * @fires close - Dispatched when the backdrop is clicked or Escape is pressed.
 * @slot - Content to display in the foreground.
 */
@customElement('ui-backdrop')
export class UiBackdrop extends LitElement {
  static styles = unsafeCSS(uiBackdropStyles);

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean }) invisible = false;
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
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }
  }

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
