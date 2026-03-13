import { LitElement, unsafeCSS, html, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiTableSortLabelStyles from './ui-table-sort-label.css?inline';

@customElement('ui-table-sort-label')
export class UiTableSortLabel extends LitElement {
    static styles = unsafeCSS(uiTableSortLabelStyles);

    @property({ type: Boolean, reflect: true }) active = false;
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
      <svg class=${classMap({ icon: true, asc: this.direction === 'asc', desc: this.direction === 'desc' })} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-table-sort-label': UiTableSortLabel;
    }
}
