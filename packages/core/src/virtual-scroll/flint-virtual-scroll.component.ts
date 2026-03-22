import { html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';

/**
 * Callback for rendering a single item in the virtual scroll container.
 */
export type RenderItemFn<T> = (item: T, index: number) => unknown;

/**
 * A generic virtual scrolling container [§38.1].
 *
 * Only renders visible items plus a configurable buffer, enabling
 * smooth scrolling through large datasets without DOM bloat.
 *
 * @example
 * ```ts
 * const items = Array.from({ length: 10000 }, (_, i) => ({ id: i, label: `Item ${i}` }));
 *
 * html`
 *   <flint-virtual-scroll
 *     .items=${items}
 *     .itemHeight=${40}
 *     .renderItem=${(item, i) => html`<div class="row">${item.label}</div>`}
 *     style="height: 400px;"
 *   ></flint-virtual-scroll>
 * `;
 * ```
 *
 * @slot - Fallback content shown when items is empty.
 */
export class FlintVirtualScroll<T = unknown> extends FlintElement {
    static styles = css`
        :host {
            display: block;
            overflow-y: auto;
            position: relative;
            contain: strict;
        }
        .spacer {
            width: 100%;
            pointer-events: none;
        }
        .viewport {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }
    `;

    /** Array of data items to render. */
    @property({ type: Array })
    items: T[] = [];

    /** Fixed height of each item in pixels. Used for position calculations. */
    @property({ type: Number, attribute: 'item-height' })
    itemHeight = 40;

    /**
     * Number of extra items to render above and below the visible area.
     * @default 5
     */
    @property({ type: Number })
    overscan = 5;

    /**
     * Render function for a single item. Receives the item and its index.
     * Must return a Lit template result.
     */
    @property({ attribute: false })
    renderItem: RenderItemFn<T> = () => html``;

    @state() private _scrollTop = 0;
    @state() private _containerHeight = 0;

    private _resizeObserver: ResizeObserver | null = null;

    willUpdate() {
        if (this.itemHeight <= 0) this.itemHeight = 1;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('scroll', this._handleScroll, { passive: true });
        this._resizeObserver = new ResizeObserver(entries => {
            if (!this.isConnected) return;
            for (const entry of entries) {
                this._containerHeight = entry.contentRect.height;
            }
        });
        this._resizeObserver.observe(this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('scroll', this._handleScroll);
        this._resizeObserver?.disconnect();
        this._resizeObserver = null;
    }

    private _handleScroll = () => {
        this._scrollTop = this.scrollTop;
    };

    private get _totalHeight(): number {
        return this.items.length * this.itemHeight;
    }

    private get _visibleRange(): { start: number; end: number } {
        const startIndex = Math.floor(this._scrollTop / this.itemHeight);
        const visibleCount = Math.ceil(this._containerHeight / this.itemHeight);

        const start = Math.max(0, startIndex - this.overscan);
        const end = Math.min(this.items.length, startIndex + visibleCount + this.overscan);

        return { start, end };
    }

    render() {
        if (this.items.length === 0) {
            return html`<slot></slot>`;
        }

        const { start, end } = this._visibleRange;
        const offsetY = start * this.itemHeight;
        const visibleItems = this.items.slice(start, end);

        return html`
            <div class="spacer" part="spacer" style="height: ${this._totalHeight}px;"></div>
            <div class="viewport" part="viewport" style="transform: translateY(${offsetY}px);">
                ${visibleItems.map((item, i) => this.renderItem(item, start + i))}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-virtual-scroll': FlintVirtualScroll;
    }
}
