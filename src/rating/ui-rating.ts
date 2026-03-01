import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('ui-rating')
export class UiRating extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      font-family: var(--ui-font-family, 'Inter', sans-serif);
      --ui-rating-color: #ffb400;
      --ui-rating-empty-color: #faaf0033;
    }

    .rating-container {
      display: inline-flex;
      position: relative;
      cursor: pointer;
      font-size: 2rem;
      line-height: 1;
    }

    .rating-container.readonly {
      cursor: default;
    }

    .star-wrapper {
        position: relative;
        display: inline-flex;
        transition: transform 0.1s ease;
    }

    .star-wrapper:not(.readonly):hover {
        transform: scale(1.1);
    }

    svg {
        width: 1em;
        height: 1em;
        fill: var(--ui-rating-empty-color);
        stroke: var(--ui-rating-color);
        stroke-width: 1;
        transition: fill 0.2s ease, stroke 0.2s ease;
    }

    .active svg {
        fill: var(--ui-rating-color);
    }
    
    .hover svg {
        fill: var(--ui-rating-color);
        opacity: 0.7;
    }

    .hidden-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
    }
  `;

    @property({ type: Number }) value = 0;
    @property({ type: Number }) max = 5;
    @property({ type: Boolean }) readonly = false;
    @property({ type: String }) name = '';

    @state() private _hoverValue = -1;

    private _handleMouseEnter(val: number) {
        if (this.readonly) return;
        this._hoverValue = val;
    }

    private _handleMouseLeave() {
        if (this.readonly) return;
        this._hoverValue = -1;
    }

    private _handleClick(val: number) {
        if (this.readonly) return;
        this.value = val;
        this.dispatchEvent(new CustomEvent('change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const stars = [];
        for (let i = 1; i <= this.max; i++) {
            const isHovered = this._hoverValue >= i;
            const isActive = this.value >= i && this._hoverValue === -1;

            stars.push(html`
            <span 
                class=${classMap({
                'star-wrapper': true,
                'active': isActive,
                'hover': isHovered,
                'readonly': this.readonly
            })}
                @mouseenter=${() => this._handleMouseEnter(i)}
                @mouseleave=${this._handleMouseLeave}
                @click=${() => this._handleClick(i)}
            >
                <svg viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            </span>
        `);
        }

        return html`
      <div class=${classMap({ 'rating-container': true, 'readonly': this.readonly })} role="slider" 
           aria-valuemin="0" aria-valuemax=${this.max} aria-valuenow=${this.value}>
        ${stars}
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-rating': UiRating;
    }
}
