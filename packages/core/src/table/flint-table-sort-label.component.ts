import { unsafeCSS, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiTableSortLabelStyles from './flint-table-sort-label.css?inline';
import { FlintElement } from '../flint-element.js';

export class FlintTableSortLabel extends FlintElement {
    static styles = unsafeCSS(uiTableSortLabelStyles);

    /** Whether this column is currently sorted. */
    @property({ type: Boolean, reflect: true }) active = false;
    /** Sort direction when active. */
    @property({ type: String }) direction: 'asc' | 'desc' = 'asc';

    updated(changed: PropertyValues) {
        if (changed.has('active') || changed.has('direction')) {
            const sort = this.active
                ? (this.direction === 'asc' ? 'ascending' : 'descending')
                : 'none';
            this.setAttribute('aria-sort', sort);
        }
    }

    render() {
        return html`
      <slot></slot>
      <svg class=${classMap({ icon: true, asc: this.direction === 'asc', desc: this.direction === 'desc' })} part="icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-table-sort-label': FlintTableSortLabel;
    }
}
