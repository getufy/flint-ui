import { unsafeCSS, html, type PropertyValues } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import type { Orientation } from '../types.js';
import type { FlintButton } from './flint-button.component.js';
import type { ButtonAppearance, ButtonColor, ButtonSize } from './flint-button.component.js';
import uiButtonGroupStyles from './flint-button-group.css?inline';

/**
 * @csspart base - The component's base wrapper element.
 */
export class FlintButtonGroup extends FlintElement {
    static styles = unsafeCSS(uiButtonGroupStyles);

    @queryAssignedElements({ selector: 'flint-button' })
    private _assignedButtons!: FlintButton[];

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
        if (this._internals) this._internals.role = 'group';
    }

    updated(changed: PropertyValues) {
        if (changed.has('size') || changed.has('appearance') || changed.has('color')) {
            this._syncChildren();
        }
    }

    private _syncChildren() {
        for (const btn of this._assignedButtons) {
            const b = btn;
            if (this.size) b.size = this.size;
            if (this.appearance) b.appearance = this.appearance;
            if (this.color) b.color = this.color;
        }
    }

    private _handleSlotChange = () => {
        this._syncChildren();
    };

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
