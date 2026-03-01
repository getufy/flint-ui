import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Bottom Navigation Action: Individual navigation item.
 */
@customElement('ui-bottom-navigation-action')
export class UiBottomNavigationAction extends LitElement {
    static styles = css`
        :host {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 6px 12px 8px;
            color: var(--ui-text-color-muted, #6b7280);
            cursor: pointer;
            transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1), padding 250ms cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
            min-width: 80px;
            max-width: 168px;
        }

        :host(:hover) {
            background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
        }

        :host([active]) {
            color: var(--ui-primary-color, #3b82f6);
            padding-top: 8px;
        }

        .icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            margin-bottom: 2px;
            transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host([active]) .icon-container {
            transform: scale(1.1);
        }

        .label {
            font-family: var(--ui-font-family, sans-serif);
            font-size: 0.75rem;
            transition: font-size 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 1;
        }

        :host([active]) .label {
            font-size: 0.875rem;
        }

        .label.hidden {
            opacity: 0;
            font-size: 0;
            pointer-events: none;
        }
    `;

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
        'ui-bottom-navigation-action': UiBottomNavigationAction;
    }
}
