import { unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiSpeedDialActionStyles from './flint-speed-dial-action.css?inline';
import uiSpeedDialStyles from './flint-speed-dial.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-speed-dial-action                                                */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * A single action item inside a `flint-speed-dial`.
 *
 * @slot - Icon content for the action button.
 * @fires flint-speed-dial-action-click - Fired when the action button is clicked.
 */
export class FlintSpeedDialAction extends FlintElement {
    static styles = unsafeCSS(uiSpeedDialActionStyles);

    /** Programmatic identifier for this action, included in the click event detail. */
    @property({ type: String }) name = '';

    /** Tooltip text shown alongside the action and used as aria-label. */
    @property({ type: String, attribute: 'tooltip-title' }) tooltipTitle = '';

    /** Forces the tooltip to be visible regardless of hover state. */
    @property({ type: Boolean, attribute: 'tooltip-open' }) tooltipOpen = false;

    /** Tooltip placement relative to the action button. */
    @property({ type: String, reflect: true, attribute: 'tooltip-placement' })
    tooltipPlacement: 'left' | 'right' | 'top' | 'bottom' = 'left';

    /** If true, the action button is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    @state() private _hovered = false;

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'menuitem');
    }

    private _handleClick() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('flint-speed-dial-action-click', {
            bubbles: true,
            composed: true,
            detail: { name: this.name, tooltipTitle: this.tooltipTitle },
        }));
    }

    private get _tooltipVisible() {
        return this.tooltipOpen || this._hovered;
    }

    render() {
        return html`
            <button
                class="action-btn"
                role="menuitem"
                aria-label=${this.tooltipTitle}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
                @mouseenter=${() => { this._hovered = true; }}
                @mouseleave=${() => { this._hovered = false; }}
                @focus=${() => { this._hovered = true; }}
                @blur=${() => { this._hovered = false; }}
            >
                <slot></slot>
            </button>
            ${this.tooltipTitle ? html`
                <div class="tooltip ${classMap({ visible: this._tooltipVisible })}">
                    ${this.tooltipTitle}
                </div>
            ` : nothing}
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-speed-dial                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Speed Dial — a FAB that reveals 3-6 related actions when pressed.
 *
 * ## Keyboard behaviour
 * - **Focus on FAB** → opens the speed dial.
 * - **Space / Enter** → toggle open/closed (or trigger focused action).
 * - **Arrow keys** → navigate between actions (any direction works initially).
 * - **Escape** → close the speed dial and return focus to the FAB.
 *
 * @slot           - `flint-speed-dial-action` elements.
 * @slot icon      - Icon shown on the FAB when closed (default: + SVG).
 * @slot open-icon - Icon shown on the FAB when open (default: x SVG).
 *
 * @fires flint-speed-dial-open  - Fired when the dial opens. detail: `{ open: true }`
 * @fires flint-speed-dial-close - Fired when the dial closes. detail: `{ open: false }`
 */
export class FlintSpeedDial extends FlintElement {
    static styles = unsafeCSS(uiSpeedDialStyles);

    /* ── Properties ──────────────────────────────────────────────── */

    /** Whether the speed dial is open (controlled). */
    @property({ type: Boolean, reflect: true }) open = false;

    /** Initial open state for uncontrolled usage. Sets `open` once on first render. */
    @property({ type: Boolean, attribute: 'default-open' }) defaultOpen = false;

    /** Direction in which actions expand from the FAB (default 'up'). */
    @property({ type: String, reflect: true }) direction: 'up' | 'down' | 'left' | 'right' = 'up';

    /** Hides the entire speed dial component. */
    @property({ type: Boolean, reflect: true }) hidden = false;

    /** Disables the FAB and prevents opening. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** When true, tooltips on all actions are always visible (good for touch/a11y). */
    @property({ type: Boolean, attribute: 'persistent-tooltips' }) persistentTooltips = false;

    /** Custom char/text rendered as the x close icon on the FAB. Falls back to built-in SVG. */
    @property({ type: String, attribute: 'close-icon' }) closeIcon = '';

    /** ARIA label for the main FAB button. */
    @property({ type: String, attribute: 'aria-label' }) ariaLabel = 'Speed dial';

    /** True on touch-only devices (auto-detected unless explicitly set). */
    @property({ type: Boolean, attribute: 'is-touch' }) isTouch = false;

    private _firstUpdate = true;

    /* ── Lifecycle ───────────────────────────────────────────────── */

    willUpdate(changed: PropertyValues) {
        if (this._firstUpdate && this.defaultOpen) {
            this.open = true;
        }
        if (this._firstUpdate) this._firstUpdate = false;
        // Forward to existing updated logic handled in updated()
        void changed;
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('is-touch') && typeof window.matchMedia === 'function') {
            this.isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        }
        // Keyboard events from shadow-DOM action buttons bubble as composed events.
        this.addEventListener('keydown', this._onHostKeyDown);
        this.addEventListener('focusout', this._onHostFocusOut);
    }

    disconnectedCallback() {
        this.removeEventListener('keydown', this._onHostKeyDown);
        this.removeEventListener('focusout', this._onHostFocusOut);
        super.disconnectedCallback();
    }

    /* ── Private helpers ─────────────────────────────────────────── */

    /** All enabled action buttons (shadow DOM buttons inside slotted actions). */
    private _actionButtons(): HTMLButtonElement[] {
        return Array.from(this.querySelectorAll('flint-speed-dial-action'))
            .filter(a => !a.hasAttribute('disabled'))
            .map(a => (a as Element).shadowRoot?.querySelector<HTMLButtonElement>('.action-btn'))
            .filter((b): b is HTMLButtonElement => !!b);
    }

    /** Index of the currently focused action button, or -1. */
    private _focusedActionIndex(): number {
        const actions = Array.from(this.querySelectorAll('flint-speed-dial-action'));
        return actions.findIndex(a =>
            (a as Element).shadowRoot?.activeElement?.classList.contains('action-btn')
        );
    }

    /** Move focus to the action at `idx`, clamped to valid range. */
    private _focusActionAt(idx: number) {
        const btns = this._actionButtons();
        if (!btns.length) return;
        btns[Math.max(0, Math.min(idx, btns.length - 1))]?.focus();
    }

    /** Move focus back to the FAB. */
    private _focusFab() {
        this.shadowRoot?.querySelector<HTMLButtonElement>('.fab')?.focus();
    }

    private _setOpen(val: boolean) {
        this.open = val;
        this._updateActionTooltips();
        this.dispatchEvent(new CustomEvent(
            val ? 'flint-speed-dial-open' : 'flint-speed-dial-close',
            { bubbles: true, composed: true, detail: { open: val } }
        ));
    }

    private _toggle() {
        if (this.disabled) return;
        this._setOpen(!this.open);
    }

    /* ── Keyboard handler ────────────────────────────────────────── */

    /**
     * Unified keydown handler on the host element.
     * Because `flint-speed-dial-action` shadow-DOM button events are composed,
     * they bubble up through the host and are caught here.
     */
    private _onHostKeyDown = (e: KeyboardEvent) => {
        if (this.disabled) return;
        const { key } = e;
        const fabFocused = this.shadowRoot?.activeElement?.classList.contains('fab') ?? false;
        const currentIdx = this._focusedActionIndex();
        const actionFocused = currentIdx !== -1;

        /* ── Escape: close + return focus to FAB ── */
        if (key === 'Escape') {
            if (this.open) {
                e.preventDefault();
                e.stopPropagation();
                this._setOpen(false);
                this._focusFab();
            }
            return;
        }

        /* ── Home / End: jump to first / last action ── */
        if ((key === 'Home' || key === 'End') && this.open && actionFocused) {
            e.preventDefault();
            const btns = this._actionButtons();
            if (btns.length) btns[key === 'Home' ? 0 : btns.length - 1]!.focus();
            return;
        }

        /* ── Arrow keys: open and/or navigate actions ── */
        const isArrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
        if (isArrow) {
            e.preventDefault();

            if (!this.open) {
                // Any arrow key opens the dial; the "expected" first focus position
                // depends on key: Down/Right → first action, Up/Left → last action.
                const toFirst = key === 'ArrowDown' || key === 'ArrowRight';
                this._setOpen(true);
                void this.updateComplete.then(() => {
                    const btns = this._actionButtons();
                    btns[toFirst ? 0 : btns.length - 1]?.focus();
                });
                return;
            }

            if (actionFocused) {
                // Navigate within open actions
                const prev = key === 'ArrowUp' || key === 'ArrowLeft';
                this._focusActionAt(prev ? currentIdx - 1 : currentIdx + 1);
            } else if (fabFocused) {
                // Arrow from FAB (already open) → jump to first or last action
                const btns = this._actionButtons();
                const toEnd = key === 'ArrowDown' || key === 'ArrowRight';
                btns[toEnd ? 0 : btns.length - 1]?.focus();
            }
        }
    };

    /* ── FAB handlers ────────────────────────────────────────────── */

    /** Suppresses the next FAB-focus auto-open (used when closing internally). */
    private _suppressNextOpen = false;

    /** Opens the dial when FAB receives keyboard focus from outside the component. */
    private _onFabFocus(e: FocusEvent) {
        if (this._suppressNextOpen) return;
        // Open only when focus arrives from another element (keyboard tab-in), not from mouse.
        if (e.relatedTarget !== null && !this.open) {
            this._setOpen(true);
        }
    }

    /* ── Action click → close ────────────────────────────────────── */

    private _onActionClick() {
        // Suppress FAB's auto-open-on-focus so returning focus here doesn't reopen the dial.
        this._suppressNextOpen = true;
        this._setOpen(false);
        this._focusFab();
        // Reset flag after the synchronous focus event has fired.
        void Promise.resolve().then(() => { this._suppressNextOpen = false; });
    }

    /* ── Focus-out → close ───────────────────────────────────────── */

    private _onHostFocusOut = (e: FocusEvent) => {
        // Close only when focus leaves the entire component (not moving between inner elements)
        if (this.open && !this.contains(e.relatedTarget as Node)) {
            this._setOpen(false);
        }
    };

    /* ── Tooltip helpers ─────────────────────────────────────────── */

    /** True for directions where the first DOM action is visually farthest from the FAB. */
    private _isReversedDirection(): boolean {
        return this.direction === 'up' || this.direction === 'left';
    }

    private _updateActionTooltips() {
        const actions = this.querySelectorAll('flint-speed-dial-action');
        const showTooltip = this.persistentTooltips || this.isTouch;
        const placement = this._tooltipPlacement();
        const reversed = this._isReversedDirection();
        const count = actions.length;
        actions.forEach((action, i) => {
            action.setAttribute('tooltip-placement', placement);
            if (showTooltip && this.open) {
                action.setAttribute('tooltip-open', '');
            } else {
                action.removeAttribute('tooltip-open');
            }
            // Stagger from FAB outward: for reversed directions the last DOM item is nearest the FAB
            const staggerIdx = reversed ? (count - 1 - i) : i;
            const closeIdx  = reversed ? i : (count - 1 - i);
            (action as HTMLElement).style.transitionDelay = this.open
                ? `${staggerIdx * 40}ms`
                : `${closeIdx * 30}ms`;
        });
    }

    private _tooltipPlacement(): string {
        switch (this.direction) {
            case 'up': return 'left';
            case 'down': return 'left';
            case 'left': return 'top';
            case 'right': return 'top';
            default: return 'left';
        }
    }

    updated(changed: Map<string, unknown>) {
        if (changed.has('open') || changed.has('direction') ||
            changed.has('persistentTooltips') || changed.has('isTouch')) {
            this._updateActionTooltips();
        }
    }

    /* ── Render ──────────────────────────────────────────────────── */

    render() {
        return html`
            <!-- Click-away backdrop -->
            <div class="backdrop" @click=${() => this._setOpen(false)}></div>

            <!-- Actions — action-click events bubble up here -->
            <div
                id="sd-menu"
                class="actions"
                role="menu"
                aria-label="Speed dial actions"
                aria-hidden=${this.open ? 'false' : 'true'}
            >
                <slot
                    @slotchange=${() => this._updateActionTooltips()}
                    @flint-speed-dial-action-click=${this._onActionClick}
                ></slot>
            </div>

            <!-- Main FAB -->
            <button
                class="fab"
                aria-label=${this.ariaLabel}
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-haspopup="menu"
                aria-controls="sd-menu"
                aria-disabled=${this.disabled ? 'true' : nothing}
                ?disabled=${this.disabled}
                @click=${this._toggle}
                @focus=${this._onFabFocus}
            >
                <!-- + icon: visible when closed -->
                <span class="fab-icon open-icon">
                    <slot name="icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        </svg>
                    </slot>
                </span>

                <!-- x icon: visible when open -->
                <span class="fab-icon close-icon">
                    <slot name="open-icon">
                        ${this.closeIcon
                ? html`<span style="line-height:1;font-size:1.5rem;">${this.closeIcon}</span>`
                : html`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`
            }
                    </slot>
                </span>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-speed-dial': FlintSpeedDial;
        'flint-speed-dial-action': FlintSpeedDialAction;
    }
}
