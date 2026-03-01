import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Breadcrumbs provide a navigational aid showing the current page's location
 * within a site hierarchy, allowing users to navigate back up the trail.
 *
 * @slot - Breadcrumb items (links or text), distributed in order.
 * @slot separator - Custom separator element rendered between each item.
 */
@customElement('ui-breadcrumbs')
export class UiBreadcrumbs extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .breadcrumbs-ol {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 0;
            margin: 0;
            list-style: none;
        }

        .breadcrumb-li {
            display: flex;
            align-items: center;
        }

        .separator {
            display: flex;
            user-select: none;
            margin-left: 8px;
            margin-right: 8px;
            color: var(--ui-text-color-muted, #6b7280);
        }

        ::slotted(*) {
            font-family: var(--ui-font-family, sans-serif);
            font-size: 0.875rem;
            color: var(--ui-text-color-muted, #6b7280);
            text-decoration: none;
            transition: color 200ms;
        }

        ::slotted(a:hover) {
            text-decoration: underline;
            color: var(--ui-text-color, #111827);
        }

        ::slotted([aria-current="page"]),
        ::slotted(.active) {
            color: var(--ui-text-color, #111827);
            font-weight: 500;
            pointer-events: none;
        }

        .collapsed-button {
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
            border: none;
            border-radius: 4px;
            cursor: pointer;
            padding: 4px 8px;
            font-size: 1rem;
            line-height: 1;
            color: var(--ui-text-color-muted, #6b7280);
            transition: background-color 200ms;
        }

        .collapsed-button:hover {
            background-color: var(--ui-hover-color-strong, rgba(0, 0, 0, 0.08));
        }
    `;

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
        this._separatorNode = nodes.length > 0 ? nodes[0].cloneNode(true) : null;
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
            <li class="breadcrumb-li">
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
                <button class="collapsed-button" @click=${() => this._expanded = true} aria-label="Show all breadcrumbs">
                    ...
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
        'ui-breadcrumbs': UiBreadcrumbs;
    }
}
