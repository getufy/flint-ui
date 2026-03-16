import { unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import uiHoverCardTriggerStyles from './flint-hover-card-trigger.css?inline';
import uiHoverCardContentStyles from './flint-hover-card-content.css?inline';
import uiHoverCardStyles from './flint-hover-card.css?inline';
import { FlintElement } from '../flint-element.js';

/* ── ARIA id counter ──────────────────────────────────────────────── */
let nextId = 0;

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-hover-card-trigger                                               */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Trigger element for a hover card. Place inside `flint-hover-card`.
 * Automatically wires up to the nearest `flint-hover-card` ancestor.
 *
 * @slot - The element that activates the hover card (link, button, avatar…).
 */
export class FlintHoverCardTrigger extends FlintElement {
    static styles = unsafeCSS(uiHoverCardTriggerStyles);

    /** Whether the associated hover card is currently open. Set by the parent. */
    @property({ type: Boolean, attribute: false }) expanded = false;

    /** The id of the associated content element, for `aria-describedby`. Set by the parent. */
    @property({ attribute: false }) contentId = '';

    private _getRoot(): FlintHoverCard | null {
        return this.closest('flint-hover-card') as FlintHoverCard | null;
    }

    private _handleMouseEnter = () => this._getRoot()?.handleTriggerEnter();
    private _handleMouseLeave = () => this._getRoot()?.handleTriggerLeave();
    private _handleFocusIn   = () => this._getRoot()?.handleTriggerEnter();
    private _handleFocusOut  = () => this._getRoot()?.handleTriggerLeave();

    render() {
        return html`
            <div
                part="base"
                role="button"
                tabindex="0"
                aria-haspopup="true"
                aria-expanded=${this.expanded ? 'true' : 'false'}
                aria-describedby=${this.contentId || nothing}
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
/*  flint-hover-card-content                                               */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * The floating card panel. Position is controlled via `placement` and `align`.
 * Place inside `flint-hover-card`; its `open` state is managed by the parent.
 *
 * @slot - Rich content displayed inside the card.
 *
 * @attr {string}  placement - Which side of the trigger to display: top | right | bottom | left.
 * @attr {string}  align     - Alignment along the cross axis: start | center | end.
 * @attr {boolean} open  - Whether the card is visible (set by `flint-hover-card`).
 *
 * @cssprop --flint-hovercard-bg           - Card background (default: #fff).
 * @cssprop --flint-hovercard-border-color - Card border color (default: #e5e7eb).
 * @cssprop --flint-hovercard-radius       - Card border-radius (default: 8px).
 * @cssprop --flint-hovercard-shadow       - Card box-shadow.
 * @cssprop --flint-hovercard-padding      - Card padding (default: 16px).
 * @cssprop --flint-hovercard-min-width    - Card min-width (default: 200px).
 * @cssprop --flint-hovercard-font-size    - Card font-size (default: 0.875rem).
 * @cssprop --flint-hovercard-color        - Card text color (default: #111827).
 * @cssprop --flint-hovercard-offset       - Gap between trigger and card (default: 8px).
 * @cssprop --flint-hovercard-duration     - Open/close transition duration (default: 150ms).
 * @cssprop --flint-hovercard-z-index      - z-index of the card (default: 1000).
 */
export class FlintHoverCardContent extends FlintElement {
    static styles = unsafeCSS(uiHoverCardContentStyles);

    /** Auto-generated unique id used for ARIA linkage. */
    readonly contentId = `flint-hovercard-${++nextId}`;

    /** Which side of the trigger to display the card on. */
    @property({ type: String, reflect: true }) placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

    /** Alignment of the card along the cross axis relative to the trigger. */
    @property({ type: String, reflect: true }) align: 'start' | 'center' | 'end' = 'center';

    /** Whether the card is visible. Managed by the parent `flint-hover-card`. */
    @property({ type: Boolean, reflect: true }) open = false;

    /**
     * When true, uses `position: fixed` to escape overflow containers.
     * Set automatically by the parent `flint-hover-card`.
     */
    @property({ type: Boolean, reflect: true }) hoist = false;

    private _getRoot(): FlintHoverCard | null {
        return this.closest('flint-hover-card') as FlintHoverCard | null;
    }

    private _handleMouseEnter = () => this._getRoot()?.handleContentEnter();
    private _handleMouseLeave = () => this._getRoot()?.handleContentLeave();

    private _scrollHandler = () => this._handleReposition();
    private _resizeHandler = () => this._handleReposition();

    override firstUpdated() {
        this._applyPosition();
    }

    override updated(changed: PropertyValues) {
        if (changed.has('placement') || changed.has('align')) {
            this._applyPosition();
        }
        if (changed.has('open')) {
            if (this.open && this.hoist) {
                this._startHoist();
            } else if (!this.open) {
                this._cleanupHoist();
            }
        }
        if (changed.has('hoist') && this.open && this.hoist) {
            this._startHoist();
        }
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this._cleanupHoist();
    }

    /** Recalculates fixed position based on the trigger's bounding rect. */
    private _handleReposition(): void {
        const root = this._getRoot();
        if (!root) return;
        const trigger = root.querySelector('flint-hover-card-trigger') as HTMLElement | null;
        if (!trigger) return;

        const rect = trigger.getBoundingClientRect();
        const { placement: side, align } = this;
        const offset = 8;

        this.style.removeProperty('top');
        this.style.removeProperty('bottom');
        this.style.removeProperty('left');
        this.style.removeProperty('right');
        this.style.removeProperty('transform');

        if (side === 'bottom' || side === 'top') {
            if (side === 'bottom') {
                this.style.setProperty('top', `${rect.bottom + offset}px`);
            } else {
                this.style.setProperty('top', `${rect.top - offset}px`);
                this.style.setProperty('transform', 'translateY(-100%)');
            }
            if (align === 'start') {
                this.style.setProperty('left', `${rect.left}px`);
            } else if (align === 'end') {
                this.style.setProperty('left', `${rect.right}px`);
                const currentTransform = this.style.getPropertyValue('transform');
                this.style.setProperty('transform', currentTransform ? `${currentTransform} translateX(-100%)` : 'translateX(-100%)');
            } else {
                this.style.setProperty('left', `${rect.left + rect.width / 2}px`);
                const currentTransform = this.style.getPropertyValue('transform');
                this.style.setProperty('transform', currentTransform ? `${currentTransform} translateX(-50%)` : 'translateX(-50%)');
            }
        } else {
            if (side === 'right') {
                this.style.setProperty('left', `${rect.right + offset}px`);
            } else {
                this.style.setProperty('left', `${rect.left - offset}px`);
                this.style.setProperty('transform', 'translateX(-100%)');
            }
            if (align === 'start') {
                this.style.setProperty('top', `${rect.top}px`);
            } else if (align === 'end') {
                this.style.setProperty('top', `${rect.bottom}px`);
                const currentTransform = this.style.getPropertyValue('transform');
                this.style.setProperty('transform', currentTransform ? `${currentTransform} translateY(-100%)` : 'translateY(-100%)');
            } else {
                this.style.setProperty('top', `${rect.top + rect.height / 2}px`);
                const currentTransform = this.style.getPropertyValue('transform');
                this.style.setProperty('transform', currentTransform ? `${currentTransform} translateY(-50%)` : 'translateY(-50%)');
            }
        }
    }

    /** Starts listening for scroll/resize to keep the hoisted content in position. */
    private _startHoist(): void {
        void this.updateComplete.then(() => {
            this._handleReposition();
            if (typeof window !== 'undefined') {
                window.addEventListener('scroll', this._scrollHandler, true);
                window.addEventListener('resize', this._resizeHandler);
            }
        });
    }

    /** Removes scroll/resize listeners and clears inline styles. */
    private _cleanupHoist(): void {
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', this._scrollHandler, true);
            window.removeEventListener('resize', this._resizeHandler);
        }
    }

    /** Applies absolute positioning inline styles based on `side` and `align`. */
    private _applyPosition() {
        const { placement: side, align } = this;
        const offset = 'var(--flint-hovercard-offset, 8px)';

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
                part="content"
                id=${this.contentId}
                role="tooltip"
                aria-hidden=${this.open ? 'false' : 'true'}
                @mouseenter=${this._handleMouseEnter}
                @mouseleave=${this._handleMouseLeave}
            >
                <slot></slot>
            </div>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  flint-hover-card                                                       */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Root container for a hover card.
 * Manages open/closed state with configurable open and close delays.
 *
 * @slot - Accepts `flint-hover-card-trigger` and `flint-hover-card-content`.
 *
 * @fires flint-hover-card-open  - Fired when the card becomes visible. detail: `{ open: true }`
 * @fires flint-hover-card-close - Fired when the card is dismissed. detail: `{ open: false }`
 *
 * @attr {number} open-delay  - Delay in ms before the card opens (default: 700).
 * @attr {number} close-delay - Delay in ms before the card closes (default: 300).
 *
 * @prop {boolean} isOpen - Read-only: whether the card is currently open.
 */
export class FlintHoverCard extends FlintElement {
    static styles = unsafeCSS(uiHoverCardStyles);

    /** Delay in milliseconds before the hover card opens. */
    @property({ type: Number, attribute: 'open-delay' }) openDelay = 700;

    /** Delay in milliseconds before the hover card closes. */
    @property({ type: Number, attribute: 'close-delay' }) closeDelay = 300;

    /**
     * When true, the hover card content uses `position: fixed` instead of `position: absolute`
     * so it can escape containers with `overflow: hidden` or `overflow: clip`.
     */
    @property({ type: Boolean }) hoist = false;

    private _isOpen = false;
    private _openTimer: ReturnType<typeof setTimeout> | null = null;
    private _closeTimer: ReturnType<typeof setTimeout> | null = null;

    /** Whether the card is currently open. */
    get isOpen(): boolean { return this._isOpen; }

    /** Called by `flint-hover-card-trigger` when the pointer/focus enters. */
    handleTriggerEnter() {
        this._cancelClose();
        if (!this._isOpen) {
            this._openTimer = setTimeout(() => this._setOpen(true), this.openDelay);
        }
    }

    /** Called by `flint-hover-card-trigger` when the pointer/focus leaves. */
    handleTriggerLeave() {
        this._cancelOpen();
        this._cancelClose();
        this._closeTimer = setTimeout(() => this._setOpen(false), this.closeDelay);
    }

    /** Called by `flint-hover-card-content` when the pointer enters the card. */
    handleContentEnter() {
        this._cancelClose();
    }

    /** Called by `flint-hover-card-content` when the pointer leaves the card. */
    handleContentLeave() {
        this._cancelClose();
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
            open ? 'flint-hover-card-open' : 'flint-hover-card-close',
            { bubbles: true, composed: true, detail: { open } }
        ));
    }

    private _syncChildren() {
        // Collect content ids for aria-describedby linkage
        const contentIds: string[] = [];
        this.querySelectorAll('flint-hover-card-content').forEach(el => {
            if ((el.closest('flint-hover-card') as unknown) === this) {
                const content = el as unknown as FlintHoverCardContent;
                content.open = this._isOpen;
                content.hoist = this.hoist;
                contentIds.push(content.contentId);
            }
        });

        // Sync ARIA state to triggers
        const contentIdStr = contentIds.join(' ');
        this.querySelectorAll('flint-hover-card-trigger').forEach(el => {
            if ((el.closest('flint-hover-card') as unknown) === this) {
                const trigger = el as unknown as FlintHoverCardTrigger;
                trigger.expanded = this._isOpen;
                trigger.contentId = contentIdStr;
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
        'flint-hover-card': FlintHoverCard;
        'flint-hover-card-trigger': FlintHoverCardTrigger;
        'flint-hover-card-content': FlintHoverCardContent;
    }
}