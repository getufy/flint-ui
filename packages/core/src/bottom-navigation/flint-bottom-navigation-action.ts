import { LitElement, unsafeCSS, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import uiBottomNavigationActionStyles from './flint-bottom-navigation-action.css?inline';

/**
 * Bottom Navigation Action: Individual navigation item.
 */
@customElement('flint-bottom-navigation-action')
export class FlintBottomNavigationAction extends LitElement {
    static styles = unsafeCSS(uiBottomNavigationActionStyles);

    /**
     * Label text for the action.
     */
    @property({ type: String }) label = '';

    /**
     * Unique value for this action.
     */
    @property() value: unknown;

    /**
     * If true, this action is currently selected. (Internal property managed by parent)
     */
    @property({ type: Boolean, reflect: true }) active = false;

    /**
     * Controls label visibility. (Internal property managed by parent)
     */
    @property({ type: Boolean }) showLabel = true;

    connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'tab');
        }
        if (!this.hasAttribute('tabindex')) {
            this.tabIndex = 0;
        }
        this.addEventListener('keydown', this._handleKeydown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('keydown', this._handleKeydown);
    }

    protected updated(changedProperties: PropertyValues) {
        if (changedProperties.has('active')) {
            this.setAttribute('aria-selected', String(this.active));
        }
    }

    private _handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    };

    render() {
        return html`
            <div class="icon-container" aria-hidden="true">
                <slot name="icon"></slot>
                <slot></slot>
            </div>
            <span class="${classMap({ 'label': true, 'hidden': !this.showLabel })}">
                ${this.label}
            </span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-bottom-navigation-action': FlintBottomNavigationAction;
    }
}
