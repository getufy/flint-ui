import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-hover-card-trigger                                               */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Trigger element for a hover card. Place inside `ui-hover-card`.
 * Automatically wires up to the nearest `ui-hover-card` ancestor.
 *
 * @slot - The element that activates the hover card (link, button, avatar…).
 */
@customElement('ui-hover-card-trigger')
export class UiHoverCardTrigger extends LitElement {
    static styles = css`
        :host { display: inline-block; }
    `;

    private _getRoot(): UiHoverCard | null {
        return this.closest('ui-hover-card') as UiHoverCard | null;
    }

    private _handleMouseEnter = () => this._getRoot()?.handleTriggerEnter();
    private _handleMouseLeave = () => this._getRoot()?.handleTriggerLeave();
    private _handleFocusIn   = () => this._getRoot()?.handleTriggerEnter();
    private _handleFocusOut  = () => this._getRoot()?.handleTriggerLeave();

    render() {
        return html`
            <div
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
                @focusin=${this._handleFocusIn}
                @focusout=${this._handleFocusOut}
            >
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-hover-card-content                                               */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * The floating card panel. Position is controlled via `side` and `align`.
 * Place inside `ui-hover-card`; its `open` state is managed by the parent.
 *
 * @slot - Rich content displayed inside the card.
 *
 * @attr {string}  side  - Which side of the trigger to display: top | right | bottom | left.
 * @attr {string}  align - Alignment along the cross axis: start | center | end.
 * @attr {boolean} open  - Whether the card is visible (set by `ui-hover-card`).
 *
 * @cssprop --ui-hovercard-bg           - Card background (default: #fff).
 * @cssprop --ui-hovercard-border-color - Card border color (default: #e5e7eb).
 * @cssprop --ui-hovercard-radius       - Card border-radius (default: 8px).
 * @cssprop --ui-hovercard-shadow       - Card box-shadow.
 * @cssprop --ui-hovercard-padding      - Card padding (default: 16px).
 * @cssprop --ui-hovercard-min-width    - Card min-width (default: 200px).
 * @cssprop --ui-hovercard-font-size    - Card font-size (default: 0.875rem).
 * @cssprop --ui-hovercard-color        - Card text color (default: #111827).
 * @cssprop --ui-hovercard-offset       - Gap between trigger and card (default: 8px).
 * @cssprop --ui-hovercard-duration     - Open/close transition duration (default: 150ms).
 * @cssprop --ui-hovercard-z-index      - z-index of the card (default: 1000).
 */
@customElement('ui-hover-card-content')
export class UiHoverCardContent extends LitElement {
    static styles = css`
        :host {
            display: block;
            position: absolute;
            z-index: var(--ui-hovercard-z-index, 1000);
            opacity: 0;
            visibility: hidden;
            transition:
                opacity var(--ui-hovercard-duration, 150ms) ease,
                visibility var(--ui-hovercard-duration, 150ms) ease;
            pointer-events: none;
        }

        :host([open]) {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        .card {
            background: var(--ui-hovercard-bg, #fff);
            border: 1px solid var(--ui-hovercard-border-color, #e5e7eb);
            border-radius: var(--ui-hovercard-radius, 8px);
            box-shadow: var(--ui-hovercard-shadow, 0 4px 16px rgba(0, 0, 0, 0.12));
            padding: var(--ui-hovercard-padding, 16px);
            min-width: var(--ui-hovercard-min-width, 200px);
            font-family: var(--ui-font-family, system-ui, sans-serif);
            font-size: var(--ui-hovercard-font-size, 0.875rem);
            color: var(--ui-hovercard-color, #111827);
            line-height: 1.5;
        }
    `;

    /** Which side of the trigger to display the card on. */
    @property({ type: String, reflect: true }) side: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

    /** Alignment of the card along the cross axis relative to the trigger. */
    @property({ type: String, reflect: true }) align: 'start' | 'center' | 'end' = 'center';

    /** Whether the card is visible. Managed by the parent `ui-hover-card`. */
    @property({ type: Boolean, reflect: true }) open = false;

    private _getRoot(): UiHoverCard | null {
        return this.closest('ui-hover-card') as UiHoverCard | null;
    }

    private _handleMouseEnter = () => this._getRoot()?.handleContentEnter();
    private _handleMouseLeave = () => this._getRoot()?.handleContentLeave();

    override firstUpdated() {
        this._applyPosition();
    }

    override updated(changed: PropertyValues) {
        if (changed.has('side') || changed.has('align')) {
            this._applyPosition();
        }
    }

    /** Applies absolute positioning inline styles based on `side` and `align`. */
    private _applyPosition() {
        const { side, align } = this;
        const offset = 'var(--ui-hovercard-offset, 8px)';

        this.style.removeProperty('top');
        this.style.removeProperty('bottom');
        this.style.removeProperty('left');
        this.style.removeProperty('right');
        this.style.removeProperty('transform');

        if (side === 'bottom' || side === 'top') {
            this.style.setProperty(
                side === 'bottom' ? 'top' : 'bottom',
                `calc(100% + ${offset})`
            );
            if (align === 'start') {
                this.style.setProperty('left', '0');
            } else if (align === 'end') {
                this.style.setProperty('right', '0');
            } else {
                this.style.setProperty('left', '50%');
                this.style.setProperty('transform', 'translateX(-50%)');
            }
        } else {
            this.style.setProperty(
                side === 'right' ? 'left' : 'right',
                `calc(100% + ${offset})`
            );
            if (align === 'start') {
                this.style.setProperty('top', '0');
            } else if (align === 'end') {
                this.style.setProperty('bottom', '0');
            } else {
                this.style.setProperty('top', '50%');
                this.style.setProperty('transform', 'translateY(-50%)');
            }
        }
    }

    render() {
        return html`
            <div
                class="card"
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
            >
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-hover-card                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Root container for a hover card.
 * Manages open/closed state with configurable open and close delays.
 *
 * @slot - Accepts `ui-hover-card-trigger` and `ui-hover-card-content`.
 *
 * @fires ui-hover-card-open  - Fired when the card becomes visible.
 * @fires ui-hover-card-close - Fired when the card is dismissed.
 *
 * @attr {number} open-delay  - Delay in ms before the card opens (default: 700).
 * @attr {number} close-delay - Delay in ms before the card closes (default: 300).
 *
 * @prop {boolean} isOpen - Read-only: whether the card is currently open.
 */
@customElement('ui-hover-card')
export class UiHoverCard extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
            position: relative;
        }
    `;

    /** Delay in milliseconds before the hover card opens. */
    @property({ type: Number, attribute: 'open-delay' }) openDelay = 700;

    /** Delay in milliseconds before the hover card closes. */
    @property({ type: Number, attribute: 'close-delay' }) closeDelay = 300;

    private _isOpen = false;
    private _openTimer: ReturnType<typeof setTimeout> | null = null;
    private _closeTimer: ReturnType<typeof setTimeout> | null = null;

    /** Whether the card is currently open. */
    get isOpen(): boolean { return this._isOpen; }

    /** Called by `ui-hover-card-trigger` when the pointer/focus enters. */
    handleTriggerEnter() {
        this._cancelClose();
        if (!this._isOpen) {
            this._openTimer = setTimeout(() => this._setOpen(true), this.openDelay);
        }
    }

    /** Called by `ui-hover-card-trigger` when the pointer/focus leaves. */
    handleTriggerLeave() {
        this._cancelOpen();
        this._closeTimer = setTimeout(() => this._setOpen(false), this.closeDelay);
    }

    /** Called by `ui-hover-card-content` when the pointer enters the card. */
    handleContentEnter() {
        this._cancelClose();
    }

    /** Called by `ui-hover-card-content` when the pointer leaves the card. */
    handleContentLeave() {
        this._closeTimer = setTimeout(() => this._setOpen(false), this.closeDelay);
    }

    private _cancelOpen() {
        if (this._openTimer !== null) {
            clearTimeout(this._openTimer);
            this._openTimer = null;
        }
    }

    private _cancelClose() {
        if (this._closeTimer !== null) {
            clearTimeout(this._closeTimer);
            this._closeTimer = null;
        }
    }

    private _setOpen(open: boolean) {
        if (this._isOpen === open) return;
        this._isOpen = open;
        this._syncChildren();
        this.dispatchEvent(new CustomEvent(
            open ? 'ui-hover-card-open' : 'ui-hover-card-close',
            { bubbles: true, composed: true }
        ));
    }

    private _syncChildren() {
        this.querySelectorAll('ui-hover-card-content').forEach(el => {
            if (el.closest('ui-hover-card') === this) {
                (el as UiHoverCardContent).open = this._isOpen;
            }
        });
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this._cancelOpen();
        this._cancelClose();
    }

    render() {
        return html`<slot @slotchange=${() => this._syncChildren()}></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-hover-card': UiHoverCard;
        'ui-hover-card-trigger': UiHoverCardTrigger;
        'ui-hover-card-content': UiHoverCardContent;
    }
}
