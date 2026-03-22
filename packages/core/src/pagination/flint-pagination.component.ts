import { unsafeCSS, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import { LocalizeController } from '../utilities/localize.js';
import type { Size } from '../types.js';
import uiPaginationStyles from './flint-pagination.css?inline';

/* ── SVG icon helpers ─────────────────────────────────────────────── */
const iconFirst = html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg>`;
const iconLast = html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg>`;
const iconPrev = html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;
const iconNext = html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;
const iconEllipsis = html`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`;

/* ── Page range algorithm ─────────────────────────────────────────── */
type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function buildPages(
    count: number,
    page: number,
    siblingCount: number,
    boundaryCount: number,
): PageItem[] {
    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

    const siblingsStart = Math.max(
        Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
        boundaryCount + 2,
    );
    const siblingsEnd = Math.min(
        Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
        endPages.length > 0 ? endPages[0]! - 2 : count - 1,
    );

    const items: PageItem[] = [
        ...startPages,
        ...(siblingsStart > boundaryCount + 2
            ? ['start-ellipsis' as const]
            : boundaryCount + 1 < count - boundaryCount
                ? [boundaryCount + 1]
                : []),
        ...range(siblingsStart, siblingsEnd),
        ...(siblingsEnd < count - boundaryCount - 1
            ? ['end-ellipsis' as const]
            : count - boundaryCount > boundaryCount
                ? [count - boundaryCount]
                : []),
        ...endPages,
    ];

    // Deduplicate while preserving order
    const seen = new Set<string>();
    return items.filter(item => {
        const key = String(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

/* ================================================================== */
/*  flint-pagination                                                       */
/* ================================================================== */

/**
 * Pagination component enabling the user to select a specific page from
 * a range of pages.
 *
 * @fires flint-pagination-change - Fired when the active page changes. detail: `{ page: number }`
 *
 * @slot prev-icon    - Icon for the previous button (default: chevron left SVG).
 * @slot next-icon    - Icon for the next button (default: chevron right SVG).
 * @slot first-icon   - Icon for the first button (default: skip-to-start SVG).
 * @slot last-icon    - Icon for the last button (default: skip-to-end SVG).
 * @slot ellipsis-icon - Icon for ellipsis items (default: three-dot SVG).
 * @csspart base - The component's base wrapper element.
 * @csspart button - The button element.
 */
export class FlintPagination extends FlintElement {
    static styles = unsafeCSS(uiPaginationStyles);

    private _localize = new LocalizeController(this);

    /** Total number of pages. */
    @property({ type: Number }) count = 1;

    /** The current page (1-based). In controlled mode, update this from the flint-pagination-change event. */
    @property({ type: Number }) page = 1;

    /** Initial page for uncontrolled mode. Ignored after first render. */
    @property({ type: Number, attribute: 'default-page' }) defaultPage = 1;

    /** Accessible label for the nav landmark (aria-label). */
    @property({ type: String }) label = '';

    /**
     * Visual style variant of the pagination buttons.
     * @default 'text'
     */
    @property({ type: String, reflect: true }) variant: 'text' | 'outlined' = 'text';

    /**
     * Shape of the pagination buttons.
     * @default 'circular'
     */
    @property({ type: String, reflect: true }) shape: 'circular' | 'rounded' | 'square' = 'circular';

    /**
     * Size of the pagination buttons.
     * @default 'medium'
     */
    @property({ type: String, reflect: true }) size: Size = 'md';

    /**
     * Color theme of the pagination buttons.
     * @default 'primary'
     */
    @property({ type: String, reflect: true }) color: 'primary' | 'secondary' | 'standard' = 'primary';

    /** Show first-page button. */
    @property({ type: Boolean, reflect: true, attribute: 'show-first-button' }) showFirstButton = false;

    /** Show last-page button. */
    @property({ type: Boolean, reflect: true, attribute: 'show-last-button' }) showLastButton = false;

    /** Hide previous button. */
    @property({ type: Boolean, reflect: true, attribute: 'hide-prev-button' }) hidePrevButton = false;

    /** Hide next button. */
    @property({ type: Boolean, reflect: true, attribute: 'hide-next-button' }) hideNextButton = false;

    /** Number of sibling pages around the current page. */
    @property({ type: Number, attribute: 'sibling-count' }) siblingCount = 1;

    /** Number of pages always shown at start and end. */
    @property({ type: Number, attribute: 'boundary-count' }) boundaryCount = 1;

    /** Disable the whole component. */
    @property({ type: Boolean, reflect: true }) disabled = false;

    private _firstUpdate = true;

    willUpdate() {
        if (this._firstUpdate && this.defaultPage !== 1) {
            this.page = this.defaultPage;
        }
        this._firstUpdate = false;
    }

    private get _safeCount(): number {
        return Math.max(1, this.count);
    }

    private get _safePage(): number {
        return Math.min(Math.max(1, this.page), this._safeCount);
    }

    private _emit(page: number) {
        this.emit('flint-pagination-change', { page });
    }

    private _go(p: number) {
        const count = this._safeCount;
        const page = this._safePage;
        if (p < 1 || p > count || p === page) return;
        this.page = p;
        this._emit(p);
    }

    private _renderNavBtn(
        label: string,
        slotName: string,
        fallbackIcon: unknown,
        onClick: () => void,
        disabled: boolean,
        hidden: boolean,
    ) {
        if (hidden) return nothing;
        return html`
            <li>
                <button
                    class="page-btn"
                    part="button"
                    aria-label=${label}
                    ?disabled=${disabled || this.disabled}
                    @click=${onClick}
                ><slot name=${slotName}>${fallbackIcon}</slot></button>
            </li>
        `;
    }

    render() {
        const count = this._safeCount;
        const page = this._safePage;
        const pages = buildPages(count, page, this.siblingCount, this.boundaryCount);
        const navLabel = this.label || 'pagination navigation';

        return html`
            <nav part="base" aria-label=${navLabel}>
                <ol>
                    ${this._renderNavBtn(this._localize.term('firstPage'), 'first-icon', iconFirst, () => this._go(1), page === 1, !this.showFirstButton)}
                    ${this._renderNavBtn(this._localize.term('previousPage'), 'prev-icon', iconPrev, () => this._go(page - 1), page === 1, this.hidePrevButton)}

                    ${pages.map(item => {
            if (item === 'start-ellipsis' || item === 'end-ellipsis') {
                return html`
                            <li>
                                <button class="page-btn ellipsis" part="button" tabindex="-1" aria-hidden="true">
                                    <slot name="ellipsis-icon">${iconEllipsis}</slot>
                                </button>
                            </li>`;
            }
            const active = item === page;
            return html`
                        <li>
                            <button
                                class=${classMap({ 'page-btn': true, active })}
                                part="button"
                                aria-label=${this._localize.term('pageLabel', item as number)}
                                aria-current=${active ? 'page' : nothing}
                                ?disabled=${this.disabled}
                                @click=${() => this._go(item as number)}
                            >${item}</button>
                        </li>
                    `;
        })}

                    ${this._renderNavBtn(this._localize.term('nextPage'), 'next-icon', iconNext, () => this._go(page + 1), page === count, this.hideNextButton)}
                    ${this._renderNavBtn(this._localize.term('lastPage'), 'last-icon', iconLast, () => this._go(count), page === count, !this.showLastButton)}
                </ol>
            </nav>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-pagination': FlintPagination;
    }
}
