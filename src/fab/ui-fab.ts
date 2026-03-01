import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * A floating action button (FAB) represents the primary action of a screen.
 *
 * @slot icon - The icon to display inside the FAB.
 * @slot - Default slot for icon content (icon-only FAB).
 * @slot label - The label to display in the extended FAB.
 */
@customElement('ui-fab')
export class UiFab extends LitElement {
    static styles = css`
    :host {
      --ui-fab-size: 56px;
      --ui-fab-background: var(--ui-primary-color, #3b82f6);
      --ui-fab-color: var(--ui-text-color-on-primary, white);
      --ui-fab-shadow: var(--ui-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      --ui-fab-radius: 50%;

      display: inline-block;
      position: fixed;
      z-index: 100;
    }

    .fab {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ui-fab-size);
      height: var(--ui-fab-size);
      border-radius: var(--ui-fab-radius);
      background-color: var(--ui-fab-background);
      color: var(--ui-fab-color);
      box-shadow: var(--ui-fab-shadow);
      border: none;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 0;
      overflow: hidden;
      outline: none;
    }

    .fab:hover:not(:disabled) {
      box-shadow: var(--ui-shadow-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1));
      filter: brightness(1.1);
      transform: translateY(-2px);
    }

    .fab:active:not(:disabled) {
      transform: translateY(0);
      filter: brightness(0.9);
    }

    .fab:focus-visible {
      outline: 3px solid var(--ui-fab-background);
      outline-offset: 3px;
    }

    .fab:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .fab.extended {
      width: auto;
      min-width: 80px;
      padding: 0 20px;
      border-radius: 28px;
      height: 56px;
    }

    .fab.extended .icon-slot {
      margin-right: 12px;
    }

    .icon-slot {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .label-slot {
      font-family: var(--ui-font-family, sans-serif);
      font-weight: 500;
      font-size: 0.875rem;
      letter-spacing: 0.1px;
      text-transform: uppercase;
    }
  `;

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

        if (this.position === 'static') {
            this.style.position = 'static';
            return;
        }

        const coords: Record<string, [string, string, string, string]> = {
            'bottom-right': ['', '24px', '24px', ''],
            'bottom-left':  ['', '24px', '',     '24px'],
            'top-right':    ['24px', '', '24px', ''],
            'top-left':     ['24px', '', '',     '24px'],
        };

        const [top, bottom, right, left] = coords[this.position] ?? coords['bottom-right'];
        this.style.position = 'fixed';
        this.style.top    = top;
        this.style.bottom = bottom;
        this.style.right  = right;
        this.style.left   = left;
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
