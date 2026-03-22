import { unsafeCSS, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiBackdropStyles from './flint-backdrop.css?inline';

/**
 * A backdrop component that narrows the user's focus to a particular element.
 *
 * @fires flint-backdrop-close - Dispatched when the backdrop is clicked or Escape is pressed. detail: `{ open: false }`
 * @slot - Content to display in the foreground.
 * @csspart base - The component's base wrapper element.
 * @csspart content - The content container.
 */
export class FlintBackdrop extends FlintElement {
  static styles = unsafeCSS(uiBackdropStyles);

  /** Whether the backdrop is visible and active. */
  @property({ type: Boolean, reflect: true }) open = false;
  /** When true, the backdrop overlay is transparent. */
  @property({ type: Boolean }) invisible = false;
  /** When true, the backdrop is scoped to its parent container instead of the viewport. */
  @property({ type: Boolean, reflect: true }) container = false;

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeydown);
  }

  protected override updated(changed: PropertyValues) {
    if (changed.has('open')) {
      if (this.open) {
        document.addEventListener('keydown', this._handleKeydown);
      } else {
        document.removeEventListener('keydown', this._handleKeydown);
      }
    }
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) {
      this.emit('flint-backdrop-close', { open: false });
    }
  };

  private _handleClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.emit('flint-backdrop-close', { open: false });
    }
  };

  render() {
    return html`
      <div
        class="${classMap({
      backdrop: true,
      open: this.open,
      invisible: this.invisible
    })}"
        part="base"
        @click="${this._handleClick}"
        role="presentation"
        aria-hidden="${this.open ? 'false' : 'true'}"
      >
        <div class="content" part="content">
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
