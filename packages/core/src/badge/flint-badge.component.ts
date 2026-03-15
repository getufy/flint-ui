import { unsafeCSS, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiBadgeStyles from './flint-badge.css?inline';

/**
 * A badge component that generates a small badge at the top-right of its children.
 *
 * @slot - The content to which the badge is attached.
 */
export class FlintBadge extends FlintElement {
    static styles = unsafeCSS(uiBadgeStyles);

    /** Text content displayed inside the badge. */
    @property({ type: String }) content = '';
    /** Whether to display a small dot instead of content. */
    @property({ type: Boolean }) dot = false;
    /** Whether the badge is hidden. */
    @property({ type: Boolean }) invisible = false;
    /** Color variant of the badge. */
    @property({ type: String }) variant: 'primary' | 'secondary' | 'error' | 'success' | 'warning' = 'primary';
    /** Maximum numeric value before displaying "max+". */
    @property({ type: Number }) max = 99;

    private get _displayContent() {
        if (this.dot) return '';
        const num = Number(this.content);
        if (!isNaN(num) && num > this.max) {
            return `${this.max}+`;
        }
        return this.content;
    }

    render() {
        const showBadge = !this.invisible && (this.dot || this.content !== '');

        return html`
      <slot></slot>
      <span
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
