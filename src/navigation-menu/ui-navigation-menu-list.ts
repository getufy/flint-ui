import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @tag ui-navigation-menu-list
 *
 * List wrapper for navigation menu items. Acts as a flex container for menu items.
 *
 * @slot default - Menu items (NavigationMenuItem elements)
 *
 * @csspart root - The root list element
 *
 * @cssprop --ui-navigation-menu-list-gap - Gap between items (default: 8px)
 * @cssprop --ui-navigation-menu-list-direction - Flex direction (default: row)
 */
@customElement('ui-navigation-menu-list')
export class UiNavigationMenuList extends LitElement {
    static override styles = css`
        :host {
            display: inline-flex;
            --ui-navigation-menu-list-gap: 4px;
            --ui-navigation-menu-list-direction: row;
        }

        .list {
            display: inline-flex;
            align-items: center;
            flex-direction: var(--ui-navigation-menu-list-direction);
            gap: var(--ui-navigation-menu-list-gap);
            list-style: none;
            margin: 0;
            padding: 0;
        }
    `;

    /** Gap between menu items */
    @property({ type: Number })
    gap: number = 8;

    /** Flex direction for the list */
    @property({ type: String })
    direction: 'row' | 'column' = 'row';

    /**
     * Accessible label for the navigation landmark.
     * Required when multiple nav elements are on the same page.
     */
    @property({ type: String, attribute: 'aria-label' })
    override ariaLabel: string = 'Main navigation';

    override connectedCallback() {
        super.connectedCallback();
        this._updateStyles();
    }

    override willUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('gap') || changedProperties.has('direction')) {
            this._updateStyles();
        }
    }

    private _updateStyles() {
        this.style.setProperty('--ui-navigation-menu-list-gap', `${this.gap}px`);
        this.style.setProperty('--ui-navigation-menu-list-direction', this.direction);
    }

    override render() {
        return html`
            <nav class="list" part="root" role="menubar" aria-label=${this.ariaLabel}>
                <slot></slot>
            </nav>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-navigation-menu-list': UiNavigationMenuList;
    }
}
