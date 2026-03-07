import { LitElement, unsafeCSS, html, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiCollapsibleTriggerStyles from './ui-collapsible-trigger.css?inline';
import uiCollapsibleContentStyles from './ui-collapsible-content.css?inline';
import uiCollapsibleStyles from './ui-collapsible.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-collapsible-trigger                                              */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Toggle button for a collapsible. Place inside `ui-collapsible`.
 * Automatically wires up to the nearest `ui-collapsible` ancestor.
 *
 * @slot - Trigger label or any content (icon, text, avatar…).
 *
 * @attr {boolean} expanded - Mirrors the parent's open state (set by parent).
 * @attr {boolean} disabled - Disables interaction (set by parent or directly).
 */
@customElement('ui-collapsible-trigger')
export class UiCollapsibleTrigger extends LitElement {
    static styles = unsafeCSS(uiCollapsibleTriggerStyles);

    /** Reflects the parent collapsible's open state. Set by `ui-collapsible`. */
    @property({ type: Boolean, reflect: true }) expanded = false;

    /** Disables the trigger. Set by `ui-collapsible` or directly. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    private _handleClick() {
        if (this.disabled) return;
        const root = this.closest('ui-collapsible') as (HTMLElement & { toggle(): void }) | null;
        root?.toggle();
    }

    render() {
        return html`
            <button
                class="trigger"
                aria-expanded=${this.expanded}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
            >
                <slot></slot>
            </button>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-collapsible-content                                              */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * The collapsible panel. Animates open/closed with a CSS grid transition.
 * Place inside `ui-collapsible`; its `open` state is managed automatically.
 *
 * @slot - Content to reveal when expanded.
 *
 * @attr {boolean} open - Whether the panel is visible (set by `ui-collapsible`).
 *
 * @cssprop --ui-collapsible-duration - Animation duration (default: `200ms`).
 * @cssprop --ui-collapsible-easing   - Animation easing (default: `ease`).
 */
@customElement('ui-collapsible-content')
export class UiCollapsibleContent extends LitElement {
    static styles = unsafeCSS(uiCollapsibleContentStyles);

    /** Whether the panel is visible. Managed by the parent `ui-collapsible`. */
    @property({ type: Boolean, reflect: true }) open = false;

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
/*  ui-collapsible                                                      */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Root container for a collapsible panel.
 * Manages open/closed state and coordinates child trigger and content.
 *
 * @slot - Accepts `ui-collapsible-trigger`, `ui-collapsible-content`, and any
 *         other elements that should always be visible.
 *
 * @fires ui-collapsible-change - Fired when the open state changes.
 *   `detail: { open: boolean }`
 *
 * @attr {boolean} open         - Current open state (also settable for controlled usage).
 * @attr {boolean} default-open - Initial open state for uncontrolled usage.
 * @attr {boolean} disabled     - Prevents toggling.
 *
 * @method toggle() - Toggle open/closed programmatically.
 */
@customElement('ui-collapsible')
export class UiCollapsible extends LitElement {
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
        // Honour defaultOpen on first render, but only when `open` was not
        // explicitly provided. willUpdate() batches this into the current
        // update cycle, so no extra round-trip or Lit warning is triggered.
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

    /** Toggle the open state and fire `ui-collapsible-change`. */
    toggle() {
        if (this.disabled) return;
        this.open = !this.open;
        this.dispatchEvent(new CustomEvent('ui-collapsible-change', {
            detail: { open: this.open },
            bubbles: true,
            composed: true,
        }));
    }

    private _syncChildren() {
        this.querySelectorAll('ui-collapsible-content').forEach(el => {
            if (el.closest('ui-collapsible') === this) {
                (el as UiCollapsibleContent).open = this.open;
            }
        });
        this.querySelectorAll('ui-collapsible-trigger').forEach(el => {
            if (el.closest('ui-collapsible') === this) {
                (el as UiCollapsibleTrigger).expanded = this.open;
                (el as UiCollapsibleTrigger).disabled = this.disabled;
            }
        });
    }

    render() {
        return html`<slot @slotchange=${() => this._syncChildren()}></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-collapsible': UiCollapsible;
        'ui-collapsible-trigger': UiCollapsibleTrigger;
        'ui-collapsible-content': UiCollapsibleContent;
    }
}
