import { LitElement, unsafeCSS, html, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { PropertyValues } from 'lit';
import uiRatingStyles from './flint-rating.css?inline';

@customElement('flint-rating')
export class FlintRating extends LitElement {
    static styles = unsafeCSS(uiRatingStyles);

    @property({ type: Number }) value = 0;
    @property({ type: Number }) max = 5;
    @property({ type: Boolean, reflect: true }) readonly = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean }) clearable = false;
    @property({ type: Number }) defaultValue = 0;
    @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
    @property({ type: String }) name = '';
    @property({ type: String }) label = 'Rating';
    @property({ type: Number }) precision: 1 | 0.5 = 1;

    @state() private _hoverValue = -1;
    private _firstUpdate = true;

    override willUpdate(changed: PropertyValues) {
        if (this._firstUpdate && this.defaultValue !== 0) {
            this.value = this.defaultValue;
        }
        this._firstUpdate = false;
        if (changed.has('value') || changed.has('name')) {
            this._syncHiddenInput();
        }
    }

    private _syncHiddenInput() {
        const input = this.shadowRoot?.querySelector<HTMLInputElement>('.hidden-input');
        if (input) {
            input.name = this.name;
            input.value = String(this.value);
        }
    }

    override firstUpdated() {
        this._syncHiddenInput();
    }

    private _isInteractive() {
        return !this.readonly && !this.disabled;
    }

    private _handleMouseEnter(val: number) {
        if (!this._isInteractive()) return;
        this._hoverValue = val;
    }

    private _handleMouseLeave() {
        if (!this._isInteractive()) return;
        this._hoverValue = -1;
    }

    private _handleMouseMove(e: MouseEvent, starIndex: number) {
        if (!this._isInteractive() || this.precision !== 0.5) return;
        const target = e.currentTarget as HTMLElement;
        const { left, width } = target.getBoundingClientRect();
        const half = e.clientX - left < width / 2;
        this._hoverValue = half ? starIndex - 0.5 : starIndex;
    }

    private _handleClick(val: number) {
        if (!this._isInteractive()) return;
        const newVal = this.clearable && this.value === val ? 0 : val;
        this.value = newVal;
        this.dispatchEvent(new CustomEvent('flint-rating-change', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    private _handleKeydown(e: KeyboardEvent, starIndex: number) {
        if (!this._isInteractive()) return;
        const step = this.precision === 0.5 ? 0.5 : 1;
        let next = this.value;

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                e.preventDefault();
                next = Math.min(this.max, this.value + step);
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                e.preventDefault();
                next = Math.max(0, this.value - step);
                break;
            case 'Home':
                e.preventDefault();
                next = 0;
                break;
            case 'End':
                e.preventDefault();
                next = this.max;
                break;
            case ' ':
            case 'Enter':
                e.preventDefault();
                this._handleClick(starIndex);
                return;
            default:
                return;
        }

        if (next !== this.value) {
            this.value = next;
            this.dispatchEvent(new CustomEvent('flint-rating-change', {
                detail: { value: this.value },
                bubbles: true,
                composed: true,
            }));
        }
    }

    private _starSvg(fillType: 'empty' | 'full' | 'half') {
        const gradId = 'flint-rating-half';
        return svg`
            <svg viewBox="0 0 24 24" aria-hidden="true">
                ${fillType === 'half' ? svg`
                    <defs>
                        <linearGradient id="${gradId}">
                            <stop offset="50%" stop-color="var(--flint-rating-color)"></stop>
                            <stop offset="50%" stop-color="var(--flint-rating-empty-color)"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#${gradId})" stroke="var(--flint-rating-color)" stroke-width="1"
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                ` : svg`
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                `}
            </svg>
        `;
    }

    render() {
        const focusedStar = Math.ceil(this.value) || 1;
        const stars = [];

        for (let i = 1; i <= this.max; i++) {
            const displayVal = this._hoverValue !== -1 ? this._hoverValue : this.value;
            const isHalf = this.precision === 0.5 && displayVal >= i - 0.5 && displayVal < i;
            const isActive = displayVal >= i;
            const isHovered = this._hoverValue !== -1;

            let fillType: 'empty' | 'full' | 'half';
            if (isHalf) fillType = 'half';
            else if (isActive) fillType = 'full';
            else fillType = 'empty';

            const classes = {
                'star-wrapper': true,
                'active': fillType === 'full' && !isHovered,
                'hover': fillType === 'full' && isHovered,
                'half': fillType === 'half',
                'readonly': this.readonly,
                'disabled': this.disabled,
            };

            stars.push(html`
                <span
                    class=${classMap(classes)}
                    role="radio"
                    aria-label="${i} ${i === 1 ? 'star' : 'stars'}"
                    aria-checked=${this.value >= i ? 'true' : 'false'}
                    tabindex=${i === focusedStar && !this.disabled ? '0' : '-1'}
                    @mouseenter=${() => this._handleMouseEnter(i)}
                    @mousemove=${(e: MouseEvent) => this._handleMouseMove(e, i)}
                    @click=${() => this._handleClick(this._hoverValue !== -1 ? this._hoverValue : i)}
                    @keydown=${(e: KeyboardEvent) => this._handleKeydown(e, i)}
                >
                    ${this._starSvg(fillType)}
                </span>
            `);
        }

        return html`
            <input class="hidden-input" type="hidden" .name=${this.name} .value=${String(this.value)}>
            <div
                class="rating-container"
                role="radiogroup"
                aria-label=${this.label}
                aria-disabled=${this.disabled ? 'true' : 'false'}
                aria-readonly=${this.readonly ? 'true' : 'false'}
                @mouseleave=${this._handleMouseLeave}
            >
                ${stars}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-rating': FlintRating;
    }
}
