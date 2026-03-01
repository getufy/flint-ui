import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-card-media')
export class UiCardMedia extends LitElement {
    static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow: hidden;
    }
    
    .media {
      width: 100%;
      height: var(--ui-card-media-height, 200px);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  `;

    @property({ type: String })
    image = '';

    @property({ type: String })
    alt = '';

    @property({ type: String })
    height = '';

    render() {
        if (this.image) {
            // Accept numeric (e.g. "200") or already-unit values (e.g. "200px", "50%")
            const heightVal = this.height
                ? (isNaN(Number(this.height)) ? this.height : `${this.height}px`)
                : '';
            const style = heightVal ? `height: ${heightVal}` : '';
            return html`
                <div class="media" part="media" style=${style}>
                    <img src="${this.image}" alt="${this.alt}" part="img" loading="lazy" />
                </div>
            `;
        }
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-card-media': UiCardMedia;
    }
}
