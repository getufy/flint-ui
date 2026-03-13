import { LitElement, unsafeCSS, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import uiAccordionStyles from './ui-accordion.css?inline';
import uiAccordionSummaryStyles from './ui-accordion-summary.css?inline';
import uiAccordionDetailsStyles from './ui-accordion-details.css?inline';
import uiAccordionActionsStyles from './ui-accordion-actions.css?inline';

/**
 * Accordion: the wrapper for grouping related components.
 */
@customElement('ui-accordion')
export class UiAccordion extends LitElement {
    static styles = unsafeCSS(uiAccordionStyles);

    /**
     * If true, expands the accordion by default.
     */
    @property({ type: Boolean, reflect: true }) expanded = false;

    /**
     * If true, the accordion is disabled.
     */
    @property({ type: Boolean, reflect: true }) disabled = false;

    override updated(changed: PropertyValues) {
        if (changed.has('expanded') || changed.has('disabled')) {
            this.querySelectorAll('ui-accordion-summary, ui-accordion-details, ui-accordion-actions')
                .forEach(el => {
                    if (this.expanded) el.setAttribute('expanded', '');
                    else el.removeAttribute('expanded');
                    if (this.disabled) el.setAttribute('disabled', '');
                    else el.removeAttribute('disabled');
                });
        }
    }

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

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('ui-accordion-toggle', this._handleToggle);
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
    static styles = unsafeCSS(uiAccordionSummaryStyles);

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

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this._handleActivate);
        this.removeEventListener('keydown', this._handleKeyDown);
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
    static styles = unsafeCSS(uiAccordionDetailsStyles);

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
    static styles = unsafeCSS(uiAccordionActionsStyles);

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
