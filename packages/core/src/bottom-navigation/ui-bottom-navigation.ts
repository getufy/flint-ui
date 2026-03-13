import { LitElement, unsafeCSS, html, PropertyValues } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { UiBottomNavigationAction } from './ui-bottom-navigation-action.js';
import uiBottomNavigationStyles from './ui-bottom-navigation.css?inline';

/**
 * Bottom Navigation bars allow movement between primary destinations in an app.
 * 
 * @slot - destinations (ui-bottom-navigation-action).
 * @fires ui-bottom-navigation-change - Dispatched when the selected value changes.
 */
@customElement('ui-bottom-navigation')
export class UiBottomNavigation extends LitElement {
    static styles = unsafeCSS(uiBottomNavigationStyles);

    /**
     * The value of the currently selected action.
     */
    @property() value: unknown;

    /**
     * If true, all labels are shown at all times.
     */
    @property({ type: Boolean, attribute: 'show-labels' }) showLabels = false;

    @queryAssignedElements({ selector: 'ui-bottom-navigation-action' })
    private _actions!: Array<UiBottomNavigationAction>;

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
            (el): el is UiBottomNavigationAction => el instanceof UiBottomNavigationAction
        );
        if (!action || action.value === this.value) return;

        this.value = action.value;
        this.dispatchEvent(new CustomEvent('ui-bottom-navigation-change', {
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
        'ui-bottom-navigation': UiBottomNavigation;
    }
}
