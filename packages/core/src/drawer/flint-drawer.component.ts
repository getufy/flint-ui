import { unsafeCSS, html, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import { FlintBackdrop } from '../backdrop/flint-backdrop.js';
import { getAnimation, animateTo, stopAnimations, resolveKeyframes } from '../utilities/animation-registry.js';
import { handleFocusTrapKeyDown, getFocusableElements } from '../utilities/focus-trap.js';
import '../utilities/animation-presets.js';
import uiDrawerStyles from './flint-drawer.css?inline';

/**
 * Navigation drawers provide ergonomic access to destinations in a site or app.
 *
 * @slot - Drawer content.
 * @fires flint-drawer-open  - Dispatched after the drawer open animation completes. detail: `{ open: true }`
 * @fires flint-drawer-close - Dispatched when the drawer requests to be closed (backdrop click or Escape). detail: `{ open: false }`
 */
export class FlintDrawer extends FlintElement {
    static styles = unsafeCSS(uiDrawerStyles);
    static dependencies = { 'flint-backdrop': FlintBackdrop as unknown as typeof FlintElement };

    /** Whether the drawer is open. */
    @property({ type: Boolean, reflect: true }) open = false;

    /**
     * Initial open state for uncontrolled usage.
     * Has no effect after the element has connected to the DOM.
     */
    @property({ type: Boolean, attribute: 'default-open' }) defaultOpen = false;
    /**
     * Side from which the drawer slides in.
     * @default 'left'
     */
    @property({ type: String, reflect: true }) placement: 'left' | 'right' | 'top' | 'bottom' = 'left';
    /**
     * Drawer behavior mode.
     * @default 'temporary'
     */
    @property({ type: String, reflect: true }) variant: 'temporary' | 'persistent' | 'mini' = 'temporary';
    /** Whether the drawer uses edge spacing. */
    @property({ type: Boolean, reflect: true }) edge = false;
    /** Whether the drawer is contained within its parent. */
    @property({ type: Boolean, reflect: true }) container = false;
    /** Accessible label for the drawer panel (used as aria-label on the panel). */
    @property({ type: String }) label = 'Drawer';
    /**
     * CSS selector for the element to focus when the drawer opens.
     * Falls back to the first focusable element in the drawer, then the paper panel.
     */
    @property({ type: String, attribute: 'initial-focus' }) initialFocus = '';

    @state() private _visuallyOpen = false;

    private _firstUpdate = true;

    /** Element that had focus before the drawer opened; restored on close. */
    private _lastFocused: HTMLElement | null = null;

    private _boundKeyDown = (e: KeyboardEvent) => {
        // FIX: respect other handlers that already consumed the Escape key
        if (e.defaultPrevented) return;
        if (!this.open || this.variant !== 'temporary') return;

        if (e.key === 'Escape') {
            e.preventDefault();
            this._close();
            return;
        }

        // Trap Tab / Shift+Tab within the drawer when used as a modal overlay
        if (e.key === 'Tab') {
            handleFocusTrapKeyDown(e, this);
        }
    };

    override willUpdate(changed: PropertyValues) {
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultOpen && !this.open) {
                this.open = true;
            }
        }
        // Batch _visuallyOpen into the current render cycle when opening
        if (changed.has('open') && this.open) {
            this._visuallyOpen = true;
        }
    }

    connectedCallback() {
        super.connectedCallback();
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', this._boundKeyDown);
        }
    }
    disconnectedCallback() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('keydown', this._boundKeyDown);
        }
        super.disconnectedCallback();
    }

    updated(changed: PropertyValues) {
        if (!changed.has('open')) return;

        if (this.open) {
            // Focus management only for temporary (overlay dialog behaviour)
            if (this.variant === 'temporary') {
                this._lastFocused = typeof document !== 'undefined' ? document.activeElement as HTMLElement | null : null;
            }
            void this._runOpenAnimation().then(() => {
                if (!this.isConnected) return;
                if (this.variant === 'temporary') {
                    this._focusInitialElement();
                }
                this.dispatchEvent(new CustomEvent('flint-drawer-open', { bubbles: true, composed: true, detail: { open: true } }));
            });
        } else {
            void this._runCloseAnimation().then(() => {
                if (!this.isConnected) return;
                this._visuallyOpen = false;
                if (this.variant === 'temporary') {
                    this._lastFocused?.focus();
                    this._lastFocused = null;
                }
            });
        }
    }

    /** Focus the appropriate element after the drawer opens. */
    private _focusInitialElement() {
        if (this.initialFocus) {
            const target = this.querySelector<HTMLElement>(this.initialFocus);
            if (target) {
                if (target.shadowRoot) {
                    const inner = getFocusableElements(target.shadowRoot);
                    if (inner.length > 0) { inner[0]!.focus(); return; }
                }
                target.focus();
                return;
            }
        }
        const focusable = getFocusableElements(this);
        if (focusable.length > 0) { focusable[0]!.focus(); return; }
        this.shadowRoot?.querySelector<HTMLElement>('.paper')?.focus();
    }

    /** Resolve the animation name suffix based on the placement direction. */
    private _getAnimationSuffix(): string {
        switch (this.placement) {
            case 'right': return '.right';
            case 'top': return '.top';
            case 'bottom': return '.bottom';
            default: return '';
        }
    }

    private async _runOpenAnimation() {
        const paper = this.shadowRoot?.querySelector<HTMLElement>('.paper');
        const backdrop = this.shadowRoot?.querySelector<HTMLElement>('.backdrop');
        const suffix = this._getAnimationSuffix();
        const promises: Promise<unknown>[] = [];

        const panelAnim = getAnimation(this, `drawer.show${suffix}`);
        if (panelAnim && paper) {
            await stopAnimations(paper);
            const keyframes = resolveKeyframes(this, panelAnim);
            promises.push(animateTo(paper, keyframes, panelAnim.options));
        }

        const overlayAnim = getAnimation(this, 'drawer.overlay.show');
        if (overlayAnim && backdrop) {
            await stopAnimations(backdrop);
            const keyframes = resolveKeyframes(this, overlayAnim);
            promises.push(animateTo(backdrop, keyframes, overlayAnim.options));
        }

        await Promise.all(promises);
    }

    private async _runCloseAnimation() {
        const paper = this.shadowRoot?.querySelector<HTMLElement>('.paper');
        const backdrop = this.shadowRoot?.querySelector<HTMLElement>('.backdrop');
        const suffix = this._getAnimationSuffix();
        const promises: Promise<unknown>[] = [];

        const panelAnim = getAnimation(this, `drawer.hide${suffix}`);
        if (panelAnim && paper) {
            await stopAnimations(paper);
            const keyframes = resolveKeyframes(this, panelAnim);
            promises.push(animateTo(paper, keyframes, panelAnim.options));
        }

        const overlayAnim = getAnimation(this, 'drawer.overlay.hide');
        if (overlayAnim && backdrop) {
            await stopAnimations(backdrop);
            const keyframes = resolveKeyframes(this, overlayAnim);
            promises.push(animateTo(backdrop, keyframes, overlayAnim.options));
        }

        await Promise.all(promises);
    }

    private _close() {
        this.dispatchEvent(new CustomEvent('flint-drawer-close', { bubbles: true, composed: true, detail: { open: false } }));
    }

    render() {
        const isTemporary = this.variant === 'temporary';
        // FIX: only show edge for temporary; persistent/mini are position:relative
        // and a fixed/absolute edge handle floats detached from the drawer panel.
        const showEdge = this.edge && !this.open && isTemporary;

        /*
         * aria-hidden logic:
         * - temporary/persistent: hidden from AT when closed (not visible)
         * - mini: ALWAYS accessible — icons remain visible when collapsed,
         *   so aria-hidden must never be "true" for mini regardless of open state.
         */
        const ariaHidden = this.variant === 'mini' ? 'false' : String(!this.open);

        return html`
            ${isTemporary ? html`
                <div
                    class="backdrop ${this._visuallyOpen ? 'open' : ''}"
                    part="backdrop"
                    @click=${this._close}
                    role="presentation"
                    aria-hidden="true"
                ></div>
            ` : ''}

            ${showEdge ? html`
                <div class="edge edge-${this.placement}" @click=${() => { this.open = true; }}>
                    <div class="edge-handle"></div>
                </div>
            ` : ''}

            <div
                class="paper ${this._visuallyOpen ? 'open' : ''}"
                part="panel"
                role=${isTemporary ? 'dialog' : 'complementary'}
                aria-modal=${isTemporary ? String(this.open) : 'false'}
                aria-label=${this.label}
                aria-hidden=${ariaHidden}
                tabindex="-1"
            >
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap { 'flint-drawer': FlintDrawer; }
}
