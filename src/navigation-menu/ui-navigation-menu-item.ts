import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
@customElement('ui-navigation-menu-item')
export class UiNavigationMenuItem extends LitElement {
    static override styles = css`
        :host {
            display: inline-flex;
            position: relative;
            --ui-navigation-menu-item-padding: 0;
        }

        .item {
            display: inline-flex;
            align-items: center;
            padding: var(--ui-navigation-menu-item-padding);
            position: relative;
        }
    `;

    /** Unique identifier for this menu item */
    @property({ type: String })
    itemId: string = '';

    /** Whether this item is disabled */
    @property({ type: Boolean, reflect: true })
    disabled: boolean = false;

    override connectedCallback() {
        super.connectedCallback();
        this.shadowRoot!.addEventListener('slotchange', this._syncChildren);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.shadowRoot!.removeEventListener('slotchange', this._syncChildren);
    }

    override updated(changed: Map<PropertyKey, unknown>) {
        if (changed.has('disabled')) {
            this._syncChildren();
        }
    }

    private _syncChildren = () => {
        const triggers = this.querySelectorAll('ui-navigation-menu-trigger');
        const links = this.querySelectorAll('ui-navigation-menu-link');
        triggers.forEach((el) => {
            if (el.closest('ui-navigation-menu-item') === this) {
                (el as any).disabled = this.disabled;
            }
        });
        links.forEach((el) => {
            if (el.closest('ui-navigation-menu-item') === this) {
                (el as any).disabled = this.disabled;
            }
        });
    };

    override render() {
        return html`
            <div class="item" part="root" role="none">
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
