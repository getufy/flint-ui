import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * @tag ui-navigation-menu-item
 *
 * Individual menu item container. Groups a trigger and its associated content.
 *
 * @slot default - Item content (NavigationMenuTrigger and NavigationMenuContent)
 *
 * @csspart root - The root item element
 *
 * @cssprop --ui-navigation-menu-item-padding - Item padding (default: 0)
 * @cssprop --ui-navigation-menu-item-position - Position style (default: relative)
 */
export class UiNavigationMenuItem extends LitElement {
    static override styles = css`
        :host {
            display: inline-block;
            --ui-navigation-menu-item-padding: 0;
            --ui-navigation-menu-item-position: relative;
        }

        .item {
            padding: var(--ui-navigation-menu-item-padding);
            position: var(--ui-navigation-menu-item-position);
        }
    `;

    /** Unique identifier for this menu item */
    @property({ type: String })
    itemId: string = '';

    /** Whether this item is disabled */
    @property({ type: Boolean, reflect: true })
    disabled: boolean = false;

    override render() {
        return html`
            <div class="item" part="root" role="menuitem" ?aria-disabled=${this.disabled}>
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-navigation-menu-item': UiNavigationMenuItem;
    }
}
