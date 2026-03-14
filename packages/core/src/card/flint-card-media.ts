import { LitElement, unsafeCSS, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiCardMediaStyles from './flint-card-media.css?inline';

@customElement('flint-card-media')
export class FlintCardMedia extends LitElement {
    static styles = unsafeCSS(uiCardMediaStyles);

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
        'flint-card-media': FlintCardMedia;
    }
}
