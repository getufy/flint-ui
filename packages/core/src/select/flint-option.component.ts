import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';

/**
 * An option element for use inside `<flint-select>`.
 * Provides a declarative child-element API as an alternative to the `options` prop.
 *
 * @example
 * ```html
 * <flint-select label="Category">
 *   <flint-option value="food">Food</flint-option>
 *   <flint-option value="drink" disabled>Drink</flint-option>
 * </flint-select>
 * ```
 *
 * @slot - Option label text. Falls back to the `label` prop if empty.
 */
export class FlintOption extends FlintElement {
    /** The machine-readable value for this option. */
    @property({ type: String }) value = '';
    /** Display label. If not set, the element's text content is used. */
    @property({ type: String }) label = '';
    /** Whether this option is disabled. */
    @property({ type: Boolean }) disabled = false;
    /** Optional group name. Options with the same group are rendered under a group header. */
    @property({ type: String }) group = '';

    /** Resolved label: explicit `label` prop takes priority, then text content. */
    get resolvedLabel(): string {
        return this.label || this.textContent?.trim() || this.value;
    }

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-option': FlintOption;
    }
}
