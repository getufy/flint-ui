import { LitElement, unsafeCSS, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiKbdStyles from './ui-kbd.css?inline';
import uiKbdGroupStyles from './ui-kbd-group.css?inline';

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-kbd                                                              */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Displays a single keyboard key or modifier symbol.
 * Renders a semantic `<kbd>` element for accessibility.
 *
 * @slot - Key label: text, symbol (⌘ ⇧ ⌥ ⌃ ⏎), or any inline content.
 *
 * @attr {'default'|'sm'|'lg'} size    - Visual size of the key.
 * @attr {'raised'|'flat'}     variant - `raised` (default) shows bottom border + shadow; `flat` removes them for inline use.
 * @attr {string}              label   - Accessible label forwarded as `aria-label` on the inner `<kbd>` element.
 *
 * @cssprop --ui-kbd-bg            - Background color (default: `#f9fafb`).
 * @cssprop --ui-kbd-border-color  - Border color (default: `#e5e7eb`).
 * @cssprop --ui-kbd-color         - Text color (default: `#374151`).
 * @cssprop --ui-kbd-font-family   - Font family (default: monospace stack).
 * @cssprop --ui-kbd-radius        - Border radius (default: `4px`).
 * @cssprop --ui-kbd-shadow-color  - Bottom-shadow color for the key effect (default: `#d1d5db`).
 */
@customElement('ui-kbd')
export class UiKbd extends LitElement {
    static styles = unsafeCSS(uiKbdStyles);

    /** Visual size of the key. */
    @property({ reflect: true })
    size: 'sm' | 'default' | 'lg' = 'default';

    /** Visual style: `raised` (default, bottom border + shadow) or `flat` (no raised effect). */
    @property({ reflect: true })
    variant: 'raised' | 'flat' = 'raised';

    /** Accessible label forwarded as `aria-label` on the inner `<kbd>` element. Useful for symbol keys like ⌘. */
    @property({ reflect: true })
    label = '';

    render() {
        return html`
            <kbd aria-label=${this.label || nothing}>
                <slot></slot>
            </kbd>
        `;
    }
}

/* ─────────────────────────────────────────────────────────────────── */
/*  ui-kbd-group                                                        */
/* ─────────────────────────────────────────────────────────────────── */

/**
 * Groups multiple `ui-kbd` elements in a row.
 * Provides a flex container with tight spacing for key combos.
 *
 * @slot - `ui-kbd` elements, separators (e.g. `<span>+</span>`), or text.
 *
 * @cssprop --ui-kbd-group-gap - Gap between items (default: `4px`).
 */
@customElement('ui-kbd-group')
export class UiKbdGroup extends LitElement {
    static styles = unsafeCSS(uiKbdGroupStyles);

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-kbd': UiKbd;
        'ui-kbd-group': UiKbdGroup;
    }
}
