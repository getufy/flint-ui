import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './ui-visually-hidden.css?inline';

/**
 * Makes content accessible to assistive devices (screen readers) without
 * displaying it visually on screen.
 *
 * Content becomes visible when something inside receives keyboard focus,
 * so sighted keyboard users can still see where focus has landed. To suppress
 * this reveal (e.g. for inline annotations that should never appear visually),
 * add the `not-focusable` attribute.
 *
 * @prop {boolean} notFocusable - When true, disables the focus-reveal behaviour.
 *   Useful for pure SR-only text (e.g. "opens in a new window") that should
 *   never become visible, even when a containing element is focused.
 *
 * @slot - The content to be visually hidden.
 *
 * @example
 * <!-- Skip navigation link (reveals on keyboard focus) -->
 * <ui-visually-hidden>
 *   <a href="#main">Skip to main content</a>
 * </ui-visually-hidden>
 *
 * @example
 * <!-- Pure SR-only annotation — never reveals visually -->
 * <a href="/report" target="_blank">
 *   Annual Report
 *   <ui-visually-hidden not-focusable>opens in a new tab</ui-visually-hidden>
 * </a>
 *
 * @example
 * <!-- Supplemental screen-reader-only label -->
 * <a href="/about">
 *   About
 *   <ui-visually-hidden>our company</ui-visually-hidden>
 * </a>
 */
@customElement('ui-visually-hidden')
export class UiVisuallyHidden extends LitElement {
    static styles = unsafeCSS(styles);

    /**
     * When `true`, the focus-reveal behaviour is disabled.
     * The content stays hidden even if a focusable child receives keyboard focus.
     * Set the `not-focusable` attribute (no value) to activate this mode.
     */
    @property({ type: Boolean, reflect: true, attribute: 'not-focusable' })
    notFocusable = false;

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-visually-hidden': UiVisuallyHidden;
    }
}
