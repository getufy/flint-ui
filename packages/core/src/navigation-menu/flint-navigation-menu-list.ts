import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @tag flint-navigation-menu-list
 *
 * List wrapper for navigation menu items. Acts as a flex container for menu items.
 *
 * @slot default - Menu items (NavigationMenuItem elements)
 *
 * @csspart root - The root list element
 *
 * @cssprop --flint-navigation-menu-list-gap - Gap between items (default: 8px)
 * @cssprop --flint-navigation-menu-list-direction - Flex direction (default: row)
 */
@customElement('flint-navigation-menu-list')
export class FlintNavigationMenuList extends LitElement {
    static override styles = css`
        :host {
            display: flex;
            --flint-navigation-menu-list-gap: 4px;
            --flint-navigation-menu-list-direction: row;
            --flint-navigation-menu-list-align: center;
        }

        .list {
            display: flex;
            align-items: var(--flint-navigation-menu-list-align);
            flex-direction: var(--flint-navigation-menu-list-direction);
            gap: var(--flint-navigation-menu-list-gap);
            list-style: none;
            margin: 0;
            padding: 0;
            width: 100%;
        }
    `;

    /** Gap between menu items */
    @property({ type: Number })
    gap: number = 4;

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
        this.style.setProperty('--flint-navigation-menu-list-gap', `${this.gap}px`);
        this.style.setProperty('--flint-navigation-menu-list-direction', this.direction);
        this.style.setProperty('--flint-navigation-menu-list-align', this.direction === 'column' ? 'stretch' : 'center');
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
        'flint-navigation-menu-list': FlintNavigationMenuList;
    }
}
