import { unsafeCSS, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import uiCollapsibleTriggerStyles from './flint-collapsible-trigger.css?inline';
import uiCollapsibleContentStyles from './flint-collapsible-content.css?inline';
import uiCollapsibleStyles from './flint-collapsible.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-collapsible-trigger                                              */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Toggle button for a collapsible. Place inside `flint-collapsible`.
 * Automatically wires up to the nearest `flint-collapsible` ancestor.
 *
 * @slot - Trigger label or any content (icon, text, avatar…).
 *
 * @attr {boolean} expanded - Mirrors the parent's open state (set by parent).
 * @attr {boolean} disabled - Disables interaction (set by parent or directly).
 */
export class FlintCollapsibleTrigger extends FlintElement {
    static styles = unsafeCSS(uiCollapsibleTriggerStyles);

    /** Reflects the parent collapsible's open state. Set by `flint-collapsible`. */
    @property({ type: Boolean, reflect: true }) expanded = false;

    /** Disables the trigger. Set by `flint-collapsible` or directly. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    private _handleClick() {
        if (this.disabled) return;
        const root = this.closest('flint-collapsible') as (HTMLElement & { toggle(): void }) | null;
        root?.toggle();
    }

    render() {
        return html`
            <button
                class="trigger"
                aria-expanded=${this.expanded ? 'true' : 'false'}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
            >
                <slot></slot>
            </button>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-collapsible-content                                              */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * The collapsible panel. Animates open/closed with a CSS grid transition.
 * Place inside `flint-collapsible`; its `open` state is managed automatically.
 *
 * @slot - Content to reveal when expanded.
 *
 * @attr {boolean} open - Whether the panel is visible (set by `flint-collapsible`).
 *
 * @cssprop --flint-collapsible-duration - Animation duration (default: `200ms`).
 * @cssprop --flint-collapsible-easing   - Animation easing (default: `ease`).
 */
export class FlintCollapsibleContent extends FlintElement {
    static styles = unsafeCSS(uiCollapsibleContentStyles);

    /** Whether the panel is visible. Managed by the parent `flint-collapsible`. */
    @property({ type: Boolean, reflect: true }) open = false;

    override updated() {
        if (this.open) {
            this.removeAttribute('inert');
        } else {
            this.setAttribute('inert', '');
        }
    }

    render() {
        return html`
            <div class="panel" aria-hidden=${!this.open}>
                <div class="panel-inner">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-collapsible                                                      */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Root container for a collapsible panel.
 * Manages open/closed state and coordinates child trigger and content.
 *
 * @slot - Accepts `flint-collapsible-trigger`, `flint-collapsible-content`, and any
 *         other elements that should always be visible.
 *
 * @fires flint-collapsible-change - Fired when the open state changes.
 *   `detail: { open: boolean }`
 *
 * @attr {boolean} open         - Current open state (also settable for controlled usage).
 * @attr {boolean} default-open - Initial open state for uncontrolled usage.
 * @attr {boolean} disabled     - Prevents toggling.
 *
 * @method toggle() - Toggle open/closed programmatically.
 */
export class FlintCollapsible extends FlintElement {
    static styles = unsafeCSS(uiCollapsibleStyles);

    /** Whether the panel is open. Reflects to attribute for CSS targeting. */
    @property({ type: Boolean, reflect: true }) open = false;

    /**
     * Initial open state for uncontrolled usage.
     * Has no effect after the element has connected to the DOM.
     */
    @property({ type: Boolean, attribute: 'default-open' }) defaultOpen = false;

    /** Disables the trigger, preventing user interaction. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    private _firstUpdate = true;

    override willUpdate(changed: PropertyValues) {
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultOpen && !this.open) {
                this.open = true;
            }
        }
        void changed;
    }

    override updated(changed: PropertyValues) {
        if (changed.has('open') || changed.has('disabled')) {
            this._syncChildren();
        }
    }

    /** Toggle the open state and fire `flint-collapsible-change`. */
    toggle() {
        if (this.disabled) return;
        this.open = !this.open;
        this.dispatchEvent(new CustomEvent('flint-collapsible-change', {
            detail: { open: this.open },
            bubbles: true,
            composed: true,
        }));
    }

    private _syncChildren() {
        this.querySelectorAll('flint-collapsible-content').forEach(el => {
            if (el.closest('flint-collapsible') === this) {
                (el as FlintCollapsibleContent).open = this.open;
            }
        });
        this.querySelectorAll('flint-collapsible-trigger').forEach(el => {
            if (el.closest('flint-collapsible') === this) {
                (el as FlintCollapsibleTrigger).expanded = this.open;
                (el as FlintCollapsibleTrigger).disabled = this.disabled;
            }
        });
    }

    render() {
        return html`<slot @slotchange=${() => this._syncChildren()}></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-collapsible': FlintCollapsible;
        'flint-collapsible-trigger': FlintCollapsibleTrigger;
        'flint-collapsible-content': FlintCollapsibleContent;
    }
}
