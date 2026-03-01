import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ui-card-content')
export class UiCardContent extends LitElement {
    static styles = css`
    :host {
      display: block;
      padding: var(--ui-card-content-padding, 16px 24px);
      font-size: var(--ui-card-content-size, 1rem);
      color: var(--ui-card-content-color, #4b5563);
      line-height: 1.5;
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
        'ui-card-content': UiCardContent;
    }
}
