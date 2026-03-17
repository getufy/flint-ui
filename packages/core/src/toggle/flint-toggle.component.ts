import { unsafeCSS, html, PropertyValues, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import type { Size } from '../types.js';
import uiToggleStyles from './flint-toggle.css?inline';

/**
 * A two-state button that can be either on (pressed) or off.
 *
 * @fires flint-toggle-change - Dispatched when the pressed state changes. Detail: `{ pressed: boolean }`
 * @slot - Content to render inside the toggle (text, icons, or both).
 *
 * @attr {boolean} pressed - Whether the toggle is currently pressed (on).
 * @attr {boolean} disabled - Whether the toggle is disabled.
 * @attr {'default'|'outlined'} variant - Visual variant.
 * @attr {'sm'|'md'|'lg'} size - Size of the toggle.
 * @attr {'ltr'|'rtl'} dir - Text direction.
 * @attr {boolean} default-pressed - Initial pressed state (uncontrolled mode).
 * @attr {string} aria-label - Accessible label for icon-only toggles.
 */
export class FlintToggle extends FlintElement {
    static styles = unsafeCSS(uiToggleStyles);

    /** Whether the toggle is currently pressed (on). */
    @property({ type: Boolean, reflect: true }) pressed = false;
    /** Whether the toggle is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Visual variant of the toggle. */
    @property({ type: String, reflect: true }) variant: 'default' | 'outlined' = 'default';
    /** Size of the toggle. */
    @property({ type: String, reflect: true }) size: Size = 'md';
    /** Text direction for the toggle. */
    @property({ type: String, reflect: true }) dir: 'ltr' | 'rtl' = 'ltr';
    /** Initial pressed state for uncontrolled mode. */
    @property({ type: Boolean, attribute: 'default-pressed' }) defaultPressed = false;
    /** Accessible label for icon-only toggles. */
    @property({ attribute: 'aria-label' }) ariaLabel: string | null = null;

    private _firstUpdate = true;

    protected override willUpdate(changed: PropertyValues) {
        super.willUpdate(changed);
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultPressed) {
                this.pressed = true;
            }
        }
    }

    private _handleClick() {
        if (this.disabled) return;
        this.pressed = !this.pressed;
        this.dispatchEvent(new CustomEvent('flint-toggle-change', {
            detail: { pressed: this.pressed },
            bubbles: true,
            composed: true,
        }));
    }

    private _handleKeydown(e: KeyboardEvent) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this._handleClick();
        }
    }

    override render() {
        return html`
            <button
                class="toggle"
                part="base"
                type="button"
                aria-pressed=${this.pressed ? 'true' : 'false'}
                aria-label=${this.ariaLabel || nothing}
                ?disabled=${this.disabled}
                @click=${this._handleClick}
                @keydown=${this._handleKeydown}
            >
                <slot></slot>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-toggle': FlintToggle;
    }
}
