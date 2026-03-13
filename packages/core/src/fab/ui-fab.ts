import { LitElement, unsafeCSS, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import uiFabStyles from './ui-fab.css?inline';

/**
 * A floating action button (FAB) represents the primary action of a screen.
 *
 * @slot icon - The icon to display inside the FAB.
 * @slot - Default slot for icon content (icon-only FAB).
 * @slot label - The label to display in the extended FAB.
 */
@customElement('ui-fab')
export class UiFab extends LitElement {
  static styles = unsafeCSS(uiFabStyles);

  @property({ type: Boolean, reflect: true })
  extended = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Accessible label for icon-only (non-extended) FABs. */
  @property({ type: String })
  label = 'Action';

  @property({ type: String })
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'static' = 'bottom-right';

  updated(changed: PropertyValues) {
    if (changed.has('position')) {
      this._applyPositionToHost();
    }
  }

  private _applyPositionToHost() {
    // Reset all sides so stale values don't conflict
    this.style.top = '';
    this.style.bottom = '';
    this.style.left = '';
    this.style.right = '';
    this.style.position = '';

    if (this.position === 'static') {
      this.style.position = 'static';
      return;
    }

    const coords: Record<string, [string, string, string, string]> = {
      'bottom-right': ['', '24px', '24px', ''],
      'bottom-left': ['', '24px', '', '24px'],
      'top-right': ['24px', '', '24px', ''],
      'top-left': ['24px', '', '', '24px'],
    };

    const [top, bottom, right, left] = coords[this.position] ?? coords['bottom-right'];
    this.style.position = 'fixed';
    this.style.top = top;
    this.style.bottom = bottom;
    this.style.right = right;
    this.style.left = left;
  }

  render() {
    const classes = {
      fab: true,
      extended: this.extended,
    };

    return html`
      <button
        class="${classMap(classes)}"
        ?disabled="${this.disabled}"
        aria-label="${ifDefined(this.extended ? undefined : this.label)}"
      >
        <span class="icon-slot">
          <slot name="icon"></slot>
          <slot></slot>
        </span>
        ${this.extended ? html`<span class="label-slot"><slot name="label"></slot></span>` : ''}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-fab': UiFab;
  }
}