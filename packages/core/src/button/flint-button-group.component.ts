import { unsafeCSS, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import type { Orientation } from '../types.js';
import type { ButtonAppearance, ButtonColor, ButtonSize } from './flint-button.component.js';
import uiButtonGroupStyles from './flint-button-group.css?inline';

export class FlintButtonGroup extends FlintElement {
    static styles = unsafeCSS(uiButtonGroupStyles);

    /**
     * Layout direction of the group.
     * @default 'horizontal'
     */
    @property({ type: String, reflect: true })
    orientation: Orientation = 'horizontal';

    /**
     * Size propagated to child `flint-button` elements.
     * When set, overrides each child button's own size.
     */
    @property({ type: String, reflect: true })
    size: ButtonSize | '' = '';

    /**
     * Appearance propagated to child `flint-button` elements.
     * When set, overrides each child button's own appearance.
     */
    @property({ type: String })
    appearance: ButtonAppearance | '' = '';

    /**
     * Color propagated to child `flint-button` elements.
     * When set, overrides each child button's own color.
     */
    @property({ type: String })
    color: ButtonColor | '' = '';

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'group');
        }
    }

    updated(changed: PropertyValues) {
        if (changed.has('size') || changed.has('appearance') || changed.has('color')) {
            this._syncChildren();
        }
    }

    private _syncChildren() {
        const buttons = this.querySelectorAll('flint-button');
        for (const btn of buttons) {
            if (this.size) {
                (btn as unknown as { size: string }).size = this.size;
            }
            if (this.appearance) {
                (btn as unknown as { appearance: string }).appearance = this.appearance;
            }
            if (this.color) {
                (btn as unknown as { color: string }).color = this.color;
            }
        }
    }

    private _handleSlotChange() {
        this._syncChildren();
    }

    render() {
        return html`
      <div class="base" part="base">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-button-group': FlintButtonGroup;
    }
}
