import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiTableSortLabelStyles from './ui-table-sort-label.css?inline';

@customElement('ui-table-sort-label')
export class UiTableSortLabel extends LitElement {
    static styles = unsafeCSS(uiTableSortLabelStyles);

    @property({ type: Boolean, reflect: true }) active = false;
    @property({ type: String }) direction: 'asc' | 'desc' = 'asc';

    render() {
        return html`
      <slot></slot>
      <svg class=${classMap({ icon: true, asc: this.direction === 'asc', desc: this.direction === 'desc' })} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    `;
    }
}
