import { unsafeCSS, html, svg, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { PropertyValues } from 'lit';
import { FlintElement } from '../flint-element.js';
import { FormAssociated } from '../mixins/form-associated.js';
import { FormControlController } from '../controllers/form-control.js';
import type { Size } from '../types.js';
import uiRatingStyles from './flint-rating.css?inline';

/**
 * Rating: a star-based rating input.
 *
 * @fires flint-rating-change - Fired when the rating value changes. detail: `{ value: number }`
 */
export class FlintRating extends FormAssociated(FlintElement) {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
    static styles = unsafeCSS(uiRatingStyles);

    /** Current rating value. */
    @property({ type: Number }) value = 0;
    /** Maximum number of stars. */
    @property({ type: Number }) max = 5;
    /** Whether the rating is read-only. */
    @property({ type: Boolean, reflect: true }) readonly = false;
    /** Whether the rating is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Whether clicking the current value clears the rating. */
    @property({ type: Boolean }) clearable = false;
    /** Initial rating value for uncontrolled mode. */
    @property({ type: Number }) defaultValue = 0;
    /** Size of the rating stars. */
    @property({ type: String, reflect: true }) size: Size = 'md';
    /** Form field name for the hidden input. */
    @property({ type: String }) name = '';
    /** Accessible label for the rating group. */
    @property({ type: String }) label = 'Rating';
    /** Rating step precision (1 for full stars, 0.5 for half stars). */
    @property({ type: Number }) precision: 1 | 0.5 = 1;
    /** Marks the rating as required for form validation. */
    @property({ type: Boolean, reflect: true }) required = false;

    private _formControl = new FormControlController(this);
    @state() private _hoverValue = -1;

    override willUpdate(changed: PropertyValues) {
        super.willUpdate(changed);
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultValue !== 0) {
                this.value = this.defaultValue;
            }
        }
    }

    protected override updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('value') || changed.has('name') || changed.has('required')) {
            this._updateFormValue();
        }
    }

    private _updateFormValue() {
        this._initFormValue(this.value ? String(this.value) : null);
        this._initFormValidity(this.required, this.value === 0, 'Please select a rating.');
        this._formControl.updateDataAttributes();
    }

    formResetCallback() {
        this.value = this.defaultValue;
        this._updateFormValue();
        this._formControl.reset();
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
        let next: number;

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
            <div
                class="rating-container"
                part="base"
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
