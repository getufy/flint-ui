import { unsafeCSS, html, PropertyValues } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import { FlintBottomNavigationAction } from './flint-bottom-navigation-action.component.js';
import uiBottomNavigationStyles from './flint-bottom-navigation.css?inline';

export interface FlintBottomNavigationChangeDetail { value: number | string; }

/**
 * Bottom Navigation bars allow movement between primary destinations in an app.
 *
 * @slot - destinations (flint-bottom-navigation-action).
 * @fires flint-bottom-navigation-change - Dispatched when the selected value changes. detail: `{ value: number | string }`
 */
export class FlintBottomNavigation extends FlintElement {
    static styles = unsafeCSS(uiBottomNavigationStyles);

    /**
     * The value of the currently selected action.
     */
    @property() value: unknown;

    /**
     * Initial selected value for uncontrolled usage.
     * Has no effect after the element has connected to the DOM.
     */
    @property({ attribute: 'default-value' }) defaultValue?: unknown;

    /**
     * If true, all labels are shown at all times.
     */
    @property({ type: Boolean, attribute: 'show-labels' }) showLabels = false;

    private _firstUpdate = true;

    protected override willUpdate(changed: PropertyValues) {
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultValue !== undefined) {
                this.value = this.defaultValue;
            }
        }
        void changed;
    }

    @queryAssignedElements({ selector: 'flint-bottom-navigation-action' })
    private _actions!: Array<FlintBottomNavigationAction>;

    protected updated(changedProperties: PropertyValues) {
        if (changedProperties.has('value') || changedProperties.has('showLabels')) {
            this._updateActions();
        }
    }

    private _handleSlotChange() {
        this._updateActions();
    }

    private _updateActions() {
        const actionsCount = this._actions.length;
        const currentShowLabels = this.showLabels || actionsCount <= 3;

        this._actions.forEach(action => {
            action.active = action.value === this.value;
            action.showLabel = currentShowLabels || action.active;
        });
    }

    private _handleActionChange(e: Event) {
        const action = e.composedPath().find(
            (el): el is FlintBottomNavigationAction => el instanceof FlintBottomNavigationAction
        );
        if (!action || action.value === this.value) return;

        this.value = action.value;
        this.dispatchEvent(new CustomEvent('flint-bottom-navigation-change', {
            detail: { value: action.value },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <div class="container" role="tablist" @click=${this._handleActionChange}>
                <slot @slotchange=${this._handleSlotChange}></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-bottom-navigation': FlintBottomNavigation;
    }
}
