import { LitElement, unsafeCSS, html, PropertyValues, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiToggleStyles from './ui-toggle.css?inline';

/**
 * A two-state button that can be either on (pressed) or off.
 *
 * @fires ui-toggle-change - Dispatched when the pressed state changes. Detail: `{ pressed: boolean }`
 * @slot - Content to render inside the toggle (text, icons, or both).
 *
 * @attr {boolean} pressed - Whether the toggle is currently pressed (on).
 * @attr {boolean} disabled - Whether the toggle is disabled.
 * @attr {'default'|'outline'} variant - Visual variant.
 * @attr {'sm'|'default'|'lg'} size - Size of the toggle.
 * @attr {'ltr'|'rtl'} dir - Text direction.
 * @attr {boolean} default-pressed - Initial pressed state (uncontrolled mode).
 * @attr {string} aria-label - Accessible label for icon-only toggles.
 */
@customElement('ui-toggle')
export class UiToggle extends LitElement {
    static styles = unsafeCSS(uiToggleStyles);

    @property({ type: Boolean, reflect: true }) pressed = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String, reflect: true }) variant: 'default' | 'outline' = 'default';
    @property({ type: String, reflect: true }) size: 'sm' | 'default' | 'lg' = 'default';
    @property({ type: String, reflect: true }) dir: 'ltr' | 'rtl' = 'ltr';
    @property({ type: Boolean, attribute: 'default-pressed' }) defaultPressed = false;
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
        this.dispatchEvent(new CustomEvent('ui-toggle-change', {
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
        'ui-toggle': UiToggle;
    }
}
