import { unsafeCSS, html, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { FlintElement } from '../flint-element.js';
import uiAccordionStyles from './flint-accordion.css?inline';
import uiAccordionSummaryStyles from './flint-accordion-summary.css?inline';
import uiAccordionDetailsStyles from './flint-accordion-details.css?inline';
import uiAccordionActionsStyles from './flint-accordion-actions.css?inline';

let _accordionCounter = 0;

/**
 * Accordion: the wrapper for grouping related components.
 *
 * @slot - FlintAccordionSummary and FlintAccordionDetails.
 *
 * @fires flint-accordion-change - Fired when the accordion's expanded state changes. detail: `{ expanded: boolean }`
 *
 * @csspart base - The accordion's base container element.
 * @csspart content - The accordion's content wrapper.
 * @csspart expand-icon - The expand/collapse icon element.
 */
export class FlintAccordion extends FlintElement {
    static styles = unsafeCSS(uiAccordionStyles);

    /**
     * If true, expands the accordion by default.
     */
    @property({ type: Boolean, reflect: true }) expanded = false;

    /**
     * Initial expanded state for uncontrolled usage.
     * Has no effect after the element has connected to the DOM.
     */
    @property({ type: Boolean, attribute: 'default-expanded' }) defaultExpanded = false;

    /**
     * If true, the accordion is disabled.
     */
    @property({ type: Boolean, reflect: true }) disabled = false;

    /** Unique ID used to link the region to its summary heading. */
    private readonly _uid = `flint-accordion-${++_accordionCounter}`;

    /** ID for the summary element (used for aria-labelledby linking). */
    get summaryId(): string { return this._uid + '-summary'; }

    /** ID for the details panel (used for aria-controls linking). */
    get detailsId(): string { return this._uid + '-details'; }

    private _firstUpdate = true;

    override willUpdate(changed: PropertyValues) {
        void changed;
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultExpanded && !this.expanded) {
                this.expanded = true;
            }
        }
    }

    override updated(changed: PropertyValues) {
        if (changed.has('expanded') || changed.has('disabled')) {
            this.querySelectorAll('flint-accordion-summary, flint-accordion-details, flint-accordion-actions')
                .forEach(el => {
                    if (this.expanded) el.setAttribute('expanded', '');
                    else el.removeAttribute('expanded');
                    if (this.disabled) el.setAttribute('disabled', '');
                    else el.removeAttribute('disabled');
                });

            // Sync aria-expanded on summary and id on details
            const summary = this.querySelector('flint-accordion-summary');
            if (summary) {
                summary.setAttribute('aria-expanded', String(this.expanded));
            }
            const details = this.querySelector('flint-accordion-details');
            if (details && !details.hasAttribute('id')) {
                details.setAttribute('id', this.detailsId);
            }
        }
    }

    private _handleToggle = () => {
        if (this.disabled) return;
        this.expanded = !this.expanded;
        this.dispatchEvent(new CustomEvent('flint-accordion-change', {
            detail: { expanded: this.expanded },
            bubbles: true,
            composed: true
        }));
    };

    constructor() {
        super();
        this.addEventListener('flint-accordion-toggle', this._handleToggle);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('flint-accordion-toggle', this._handleToggle);
    }

    render() {
        return html`
            <div class="accordion-container" part="base" role="region" aria-labelledby=${this.summaryId}>
                <slot></slot>
            </div>
        `;
    }
}

/**
 * Accordion Summary: the wrapper for the Accordion header.
 *
 * @slot expandIcon - Custom expand/collapse icon.
 * @slot - Summary content.
 *
 * @fires flint-accordion-toggle - Fired when the summary is clicked or activated via keyboard.
 */
export class FlintAccordionSummary extends FlintElement {
    static styles = unsafeCSS(uiAccordionSummaryStyles);

    private _handleActivate = () => {
        this.dispatchEvent(new CustomEvent('flint-accordion-toggle', {
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
        // Link to parent accordion's region for aria-labelledby / aria-controls
        const accordion = this.closest('flint-accordion') as FlintAccordion | null;
        if (accordion) {
            if (!this.hasAttribute('id')) {
                this.setAttribute('id', accordion.summaryId);
            }
            this.setAttribute('aria-controls', accordion.detailsId);
            this.setAttribute('aria-expanded', String(accordion.expanded));
        }
    }

    render() {
        return html`
            <div class="content" part="content">
                <slot></slot>
            </div>
            <div class="expand-icon" part="expand-icon">
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
 *
 * @slot - Detail content.
 *
 * @csspart base - The details inner wrapper element.
 * @csspart content - The details content element.
 */
export class FlintAccordionDetails extends FlintElement {
    static styles = unsafeCSS(uiAccordionDetailsStyles);

    render() {
        return html`
            <div class="details-inner" part="base">
                <div class="content" part="content">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

/**
 * Accordion Actions: an optional wrapper that groups a set of buttons.
 */
export class FlintAccordionActions extends FlintElement {
    static styles = unsafeCSS(uiAccordionActionsStyles);

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-accordion': FlintAccordion;
        'flint-accordion-summary': FlintAccordionSummary;
        'flint-accordion-details': FlintAccordionDetails;
        'flint-accordion-actions': FlintAccordionActions;
    }
}
