import { unsafeCSS, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import uiBreadcrumbsStyles from './flint-breadcrumbs.css?inline';

/**
 * Breadcrumbs provide a navigational aid showing the current page's location
 * within a site hierarchy, allowing users to navigate back up the trail.
 *
 * @slot - Breadcrumb items (links or text), distributed in order.
 * @slot separator - Custom separator element rendered between each item.
 *
 * @cssvar --flint-breadcrumb-font-size          - Font size for items (default: 0.875rem)
 * @cssvar --flint-breadcrumb-color              - Inactive item color
 * @cssvar --flint-breadcrumb-color-active       - Active/current item color
 * @cssvar --flint-breadcrumb-separator-margin   - Horizontal margin around separators (default: 8px)
 * @cssvar --flint-breadcrumb-collapsed-bg       - Background of the expand "..." button
 * @cssvar --flint-breadcrumb-collapsed-hover-bg - Hover background of the expand button
 * @cssvar --flint-breadcrumb-collapsed-radius   - Border-radius of the expand button
 */
export class FlintBreadcrumbs extends FlintElement {
    static styles = unsafeCSS(uiBreadcrumbsStyles);

    /**
     * Max number of items to display before collapsing.
     */
    @property({ type: Number, attribute: 'max-items' }) maxItems = 8;

    /**
     * Number of items to show before the ellipsis.
     */
    @property({ type: Number, attribute: 'items-before' }) itemsBefore = 1;

    /**
     * Number of items to show after the ellipsis.
     */
    @property({ type: Number, attribute: 'items-after' }) itemsAfter = 1;

    /**
     * The character or string used as a separator (fallback when no separator slot is provided).
     */
    @property({ type: String }) separator = '/';

    @state() private _expanded = false;
    @state() private _itemsCount = 0;
    @state() private _separatorNode: Node | null = null;

    private _handleSlotChange() {
        const children = Array.from(this.children) as HTMLElement[];
        const items = children.filter(child => !child.slot || child.slot.startsWith('breadcrumb-item-'));

        items.forEach((item, index) => {
            const slotName = `breadcrumb-item-${index}`;
            if (item.getAttribute('slot') !== slotName) {
                item.setAttribute('slot', slotName);
            }
        });

        this._itemsCount = items.length;
    }

    private _handleSeparatorSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;
        const nodes = slot.assignedNodes({ flatten: true });
        // Clone the separator node so we can safely reuse it across all separator positions.
        this._separatorNode = nodes.length > 0 ? nodes[0]!.cloneNode(true) : null;
    }

    private _renderSeparator() {
        return html`
            <span class="separator" aria-hidden="true">
                ${this._separatorNode ? this._separatorNode.cloneNode(true) : this.separator}
            </span>
        `;
    }

    private _renderItem(index: number, isLast: boolean) {
        return html`
            <li class="breadcrumb-li" aria-current=${isLast ? 'page' : nothing}>
                <slot name="breadcrumb-item-${index}"></slot>
                ${!isLast ? this._renderSeparator() : ''}
            </li>
        `;
    }

    private _renderCollapsed() {
        const total = this._itemsCount;
        if (total === 0) return html``;

        if (total <= this.maxItems || this._expanded) {
            return Array.from({ length: total }).map((_, i) => this._renderItem(i, i === total - 1));
        }

        const beforeCount = Math.min(this.itemsBefore, total);
        const afterCount = Math.min(this.itemsAfter, total - beforeCount);

        // If before + after covers everything, skip the ellipsis.
        if (beforeCount + afterCount >= total) {
            return Array.from({ length: total }).map((_, i) => this._renderItem(i, i === total - 1));
        }

        const before = Array.from({ length: beforeCount }).map((_, i) => i);
        const after = Array.from({ length: afterCount }).map((_, i) => total - afterCount + i);

        return html`
            ${before.map(i => this._renderItem(i, false))}
            <li class="breadcrumb-li">
                <button class="collapsed-button" @click=${() => { this._expanded = true; }} aria-label="Show all breadcrumbs">
                    &hellip;
                </button>
                ${this._renderSeparator()}
            </li>
            ${after.map((i, idx) => this._renderItem(i, idx === after.length - 1))}
        `;
    }

    render() {
        return html`
            <nav aria-label="breadcrumb">
                <ol class="breadcrumbs-ol">
                    ${this._renderCollapsed()}
                </ol>
            </nav>
            <div style="display: none" aria-hidden="true">
                <slot @slotchange=${this._handleSlotChange}></slot>
                <slot name="separator" @slotchange=${this._handleSeparatorSlotChange}></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-breadcrumbs': FlintBreadcrumbs;
    }
}
