import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-card-header')
export class UiCardHeader extends LitElement {
    static styles = css`
    :host {
      display: block;
      padding: var(--ui-card-header-padding, 16px 24px);
    }
    
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .content {
      flex: 1 1 auto;
    }

    .title {
      margin: 0;
      font-size: var(--ui-card-title-size, 1.25rem);
      font-weight: 700;
      color: var(--ui-card-title-color, #111827);
      line-height: 1.4;
    }
    
    .subtitle {
      margin: 0;
      font-size: var(--ui-card-subtitle-size, 0.875rem);
      color: var(--ui-card-subtitle-color, #6b7280);
      font-weight: 500;
      margin-top: 4px;
    }
  `;

    @property({ type: String })
    title = '';

    @property({ type: String })
    subtitle = '';

    render() {
        return html`
      <div class="header" part="header">
        <slot name="avatar"></slot>
        <div class="content" part="content">
          ${this.title ? html`<h3 class="title" part="title">${this.title}</h3>` : ''}
          ${this.subtitle ? html`<p class="subtitle" part="subtitle">${this.subtitle}</p>` : ''}
          <slot></slot>
        </div>
        <slot name="action"></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-card-header': UiCardHeader;
    }
}
