import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiBadgeStyles from './flint-badge.css?inline';

/**
 * A badge component that generates a small badge at the top-right of its children.
 *
 * @slot - The content to which the badge is attached.
 * @csspart base - The component's base wrapper element.
 */
export class FlintBadge extends FlintElement {
    static styles = unsafeCSS(uiBadgeStyles);

    /** Text content displayed inside the badge. */
    @property({ type: String }) content = '';
    /** Whether to display a small dot instead of content. */
    @property({ type: Boolean, reflect: true }) dot = false;
    /** Whether the badge is hidden. */
    @property({ type: Boolean }) invisible = false;
    /**
     * Color variant of the badge.
     * @default 'primary'
     */
    @property({ type: String, reflect: true }) variant: 'primary' | 'secondary' | 'error' | 'success' | 'warning' = 'primary';
    /**
     * Maximum numeric value before displaying "max+".
     * @default 99
     */
    @property({ type: Number }) max = 99;

    private get _displayContent() {
        if (this.dot || !this.content) return '';
        const num = Number(this.content);
        if (!isNaN(num) && isFinite(num) && num > this.max) {
            return `${this.max}+`;
        }
        return this.content;
    }

    render() {
        const showBadge = !this.invisible && (this.dot || this.content !== '');

        return html`
      <slot></slot>
      <span
        part="base"
        class="badge ${classMap({
            hidden: !showBadge,
            dot: this.dot,
            [this.variant]: true
        })}"
        role="status"
        aria-hidden="${!showBadge ? 'true' : 'false'}"
      >
        ${this._displayContent}
      </span>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-badge': FlintBadge;
    }
}
