import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ui-table-sort-label')
export class UiTableSortLabel extends LitElement {
    static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: color 0.2s;
    }
    :host(:hover) {
      color: var(--ui-text-color, #111827);
    }
    :host(.active) {
      color: var(--ui-text-color, #111827);
      font-weight: 700;
    }
    .icon {
      margin-left: 4px;
      width: 18px;
      height: 18px;
      transition: transform 0.2s ease, opacity 0.2s;
      opacity: 0;
    }
    :host(:hover) .icon, :host(.active) .icon {
      opacity: 1;
    }
    .icon.desc {
      transform: rotate(180deg);
    }
  `;

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
