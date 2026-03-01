import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Accordion: the wrapper for grouping related components.
 */
@customElement('ui-accordion')
export class UiAccordion extends LitElement {
    static styles = css`
        :host {
            display: block;
            border-top: 1px solid var(--ui-border-color, #e5e7eb);
            background-color: var(--ui-surface-background, #ffffff);
            color: var(--ui-text-color, #111827);
            transition: margin 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host(:first-of-type) {
            border-top: none;
            border-top-left-radius: var(--ui-border-radius-md, 4px);
            border-top-right-radius: var(--ui-border-radius-md, 4px);
        }

        :host(:last-of-type) {
            border-bottom-left-radius: var(--ui-border-radius-md, 4px);
            border-bottom-right-radius: var(--ui-border-radius-md, 4px);
        }

        :host([expanded]) {
            margin: 16px 0;
            border-top: none;
            box-shadow: var(--ui-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
        }

        :host([expanded]:first-of-type) {
            margin-top: 0;
        }

        :host([expanded]:last-of-type) {
            margin-bottom: 0;
        }

        .accordion-container {
            display: flex;
            flex-direction: column;
        }
    `;

    /**
     * If true, expands the accordion by default.
     */
    @property({ type: Boolean, reflect: true }) expanded = false;

    /**
     * If true, the accordion is disabled.
     */
    @property({ type: Boolean, reflect: true }) disabled = false;

    private _handleToggle = () => {
        if (this.disabled) return;
        this.expanded = !this.expanded;
        this.dispatchEvent(new CustomEvent('ui-accordion-change', {
            detail: { expanded: this.expanded },
            bubbles: true,
            composed: true
        }));
    };

    constructor() {
        super();
        this.addEventListener('ui-accordion-toggle', this._handleToggle);
    }

    render() {
        return html`
            <div class="accordion-container" role="region">
                <slot></slot>
            </div>
        `;
    }
}

/**
 * Accordion Summary: the wrapper for the Accordion header.
 */
@customElement('ui-accordion-summary')
export class UiAccordionSummary extends LitElement {
    static styles = css`
        :host {
            display: flex;
            align-items: center;
            padding: 0 16px;
            min-height: 48px;
            cursor: pointer;
            user-select: none;
            transition: min-height 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host(:focus-visible) {
            outline: 2px solid var(--ui-primary-color, #3b82f6);
            outline-offset: -2px;
        }

        :host(:hover) {
            background-color: var(--ui-hover-color, rgba(0, 0, 0, 0.04));
        }

        :host-context(ui-accordion[expanded]) {
            min-height: 64px;
        }

        :host-context(ui-accordion[disabled]) {
            cursor: default;
            opacity: 0.5;
            pointer-events: none;
        }

        .content {
            display: flex;
            flex-grow: 1;
            margin: 12px 0;
            font-family: var(--ui-font-family, sans-serif);
            font-weight: 500;
        }

        .expand-icon {
            display: flex;
            padding: 8px;
            border-radius: 50%;
            color: var(--ui-text-color-muted, #6b7280);
            transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host-context(ui-accordion[expanded]) .expand-icon {
            transform: rotate(180deg);
        }
    `;

    private _handleActivate = () => {
        this.dispatchEvent(new CustomEvent('ui-accordion-toggle', {
            bubbles: true,
            composed: true,
        }));
    };

    private _handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._handleActivate();
        }
    };

    constructor() {
        super();
        this.addEventListener('click', this._handleActivate);
        this.addEventListener('keydown', this._handleKeyDown);
    }

    override connectedCallback() {
        super.connectedCallback();
        if (!this.hasAttribute('role')) this.setAttribute('role', 'button');
        if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
    }

    render() {
        return html`
            <div class="content">
                <slot></slot>
            </div>
            <div class="expand-icon">
                <slot name="expandIcon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </slot>
            </div>
        `;
    }
}

/**
 * Accordion Details: the wrapper for the Accordion content.
 */
@customElement('ui-accordion-details')
export class UiAccordionDetails extends LitElement {
    static styles = css`
        :host {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 150ms cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
        }

        :host-context(ui-accordion[expanded]) {
            grid-template-rows: 1fr;
        }

        .details-inner {
            min-height: 0;
        }

        .content {
            padding: 8px 16px 16px;
            font-family: var(--ui-font-family, sans-serif);
            font-size: 0.875rem;
            color: var(--ui-text-color, #111827);
        }
    `;

    render() {
        return html`
            <div class="details-inner">
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

/**
 * Accordion Actions: an optional wrapper that groups a set of buttons.
 */
@customElement('ui-accordion-actions')
export class UiAccordionActions extends LitElement {
    static styles = css`
        :host {
            display: none;
            padding: 8px 16px 16px;
            justify-content: flex-end;
            gap: 8px;
            border-top: 1px solid var(--ui-border-color, #e5e7eb);
        }

        :host-context(ui-accordion[expanded]) {
            display: flex;
        }
    `;

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-accordion': UiAccordion;
        'ui-accordion-summary': UiAccordionSummary;
        'ui-accordion-details': UiAccordionDetails;
        'ui-accordion-actions': UiAccordionActions;
    }
}
