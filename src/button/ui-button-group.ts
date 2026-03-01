import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('ui-button-group')
export class UiButtonGroup extends LitElement {
    static styles = css`
    :host {
      display: inline-flex;
      border-radius: var(--ui-border-radius-md, 6px);
    }
    
    ::slotted(ui-button) {
      position: relative;
    }

    ::slotted(ui-button:hover),
    ::slotted(ui-button:focus-within),
    ::slotted(ui-button:active) {
      z-index: 1;
    }

    ::slotted(ui-button:not(:first-child)) {
      margin-left: -1px;
    }

    /* Base state for grouped buttons - 0 border radius internally */
    ::slotted(ui-button) {
      --ui-button-border-radius: 0;
    }

    /* First child */
    ::slotted(ui-button:first-child) {
      --ui-button-border-radius: var(--ui-border-radius-md, 6px) 0 0 var(--ui-border-radius-md, 6px);
    }

    /* Last child */
    ::slotted(ui-button:last-child) {
      --ui-button-border-radius: 0 var(--ui-border-radius-md, 6px) var(--ui-border-radius-md, 6px) 0;
    }

    /* Only child - reset to full radius */
    ::slotted(ui-button:first-child:last-child) {
      --ui-button-border-radius: var(--ui-border-radius-md, 6px);
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
        'ui-button-group': UiButtonGroup;
    }
}
