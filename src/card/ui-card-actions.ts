import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ui-card-actions')
export class UiCardActions extends LitElement {
    static styles = css`
    :host {
      display: flex;
      padding: var(--ui-card-actions-padding, 8px 16px);
      align-items: center;
      gap: 8px;
    }
  `;

    render() {
        return html`
      <slot></slot>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-card-actions': UiCardActions;
    }
}
