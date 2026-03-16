import { unsafeCSS, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FlintElement } from '../flint-element.js';
import uiStepConnectorStyles from './flint-step-connector.css?inline';
import uiStepLabelStyles from './flint-step-label.css?inline';
import uiStepContentStyles from './flint-step-content.css?inline';
import uiStepStyles from './flint-step.css?inline';
import uiStepperStyles from './flint-stepper.css?inline';
import uiMobileStepperStyles from './flint-mobile-stepper.css?inline';

/* ── Event detail interfaces ──────────────────────────────────────── */
export interface FlintStepClickDetail { step: number; }
export interface FlintStepChangeDetail { step: number; }

/* ── SVG icons ─────────────────────────────────────────────────────── */
const iconCheck = html`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
const iconWarn = html`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;

/* ================================================================== */
/* FlintStepConnector                                                      */
/* ================================================================== */
export class FlintStepConnector extends FlintElement {
    static styles = unsafeCSS(uiStepConnectorStyles);

    /** Layout direction of the connector line. */
    @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
    /** Whether the connector represents a completed step transition. */
    @property({ type: Boolean }) completed = false;

    render() { return html`<div class="line ${classMap({ completed: this.completed })}"></div>`; }
}

/* ================================================================== */
/* FlintStepLabel                                                          */
/* ================================================================== */
/**
 * Step Label: the label for a step.
 *
 * @slot - Label text.
 * @slot optional - Optional step text.
 */
export class FlintStepLabel extends FlintElement {
    static styles = unsafeCSS(uiStepLabelStyles);

    /** Whether the label's step is currently active. */
    @property({ type: Boolean, reflect: true }) active = false;
    /** Whether the label's step is disabled. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Whether the label's step is in an error state. */
    @property({ type: Boolean, reflect: true }) error = false;

    render() {
        return html`
        <div class="label"><slot></slot></div>
        <div class="optional"><slot name="optional"></slot></div>
    `;
    }
}

/* ================================================================== */
/* FlintStepContent                                                        */
/* ================================================================== */
/**
 * Step Content: the collapsible content area for a step.
 *
 * @slot - Step content.
 */
export class FlintStepContent extends FlintElement {
    static styles = unsafeCSS(uiStepContentStyles);

    /** Whether the content is visible. Defaults true so standalone usage always shows. */
    @property({ type: Boolean, reflect: true }) open = true;

    render() {
        return html`
            <div
                class="panel ${classMap({ open: this.open })}"
                aria-hidden=${this.open ? 'false' : 'true'}
            >
                <div class="inner">
                    <div class="content"><slot></slot></div>
                </div>
            </div>`;
    }
}

/* ================================================================== */
/* FlintStep                                                               */
/* ================================================================== */
/**
 * Step: an individual step within a stepper.
 *
 * @slot icon - Custom step icon.
 * @slot label - Custom label content.
 * @slot - Step content.
 *
 * @fires flint-step-click - Fired when a non-linear step is clicked. detail: `{ step: number }`
 */
export class FlintStep extends FlintElement {
    static styles = unsafeCSS(uiStepStyles);

    /** Whether this step is the currently active step. */
    @property({ type: Boolean, reflect: true }) active = false;
    /** Whether this step has been completed. */
    @property({ type: Boolean, reflect: true }) completed = false;
    /** Whether this step is disabled and non-interactive. */
    @property({ type: Boolean, reflect: true }) disabled = false;
    /** Whether this step is optional. */
    @property({ type: Boolean, reflect: true }) optional = false;
    /** Whether this step is in an error state. */
    @property({ type: Boolean, reflect: true }) error = false;
    /** Whether this is the last step in the stepper. */
    @property({ type: Boolean, reflect: true }) last = false;
    /** Whether this step can be clicked to navigate to it. */
    @property({ type: Boolean, reflect: true }) clickable = false;
    /** Layout direction of the step. */
    @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
    /** Whether to display the label below the step icon instead of beside it. */
    @property({ type: Boolean, reflect: true, attribute: 'alternative-label' }) alternativeLabel = false;
    /** Zero-based index of this step within the stepper. */
    @property({ type: Number, attribute: 'step-index' }) stepIndex = 0;
    /** Text shown below the label when the step is optional. */
    @property({ type: String, attribute: 'optional-label' }) optionalLabel = 'Optional';
    /**
     * Set by FlintStepper — true when the immediately preceding step is completed.
     * Controls whether the leading connector is rendered in the primary colour.
     */
    @property({ type: Boolean, attribute: 'prev-completed' }) prevCompleted = false;

    connectedCallback() {
        super.connectedCallback();
        /* Expose semantic list role so assistive technologies can count steps */
        if (!this.hasAttribute('role')) this.setAttribute('role', 'listitem');
    }

    private _fire() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent<FlintStepClickDetail>('flint-step-click', { detail: { step: this.stepIndex }, bubbles: true, composed: true }));
    }

    private _icon() {
        const cls = { 'icon-circle': true, active: this.active, completed: this.completed, error: this.error };
        const inner = this.error ? iconWarn : this.completed ? iconCheck : html`<slot name="icon">${this.stepIndex + 1}</slot>`;
        return html`<div class=${classMap(cls)}>${inner}</div>`;
    }

    private _label() {
        return html`
            <flint-step-label ?active=${this.active} ?disabled=${this.disabled} ?error=${this.error}>
                <slot name="label"></slot>
                ${this.optional ? html`<span slot="optional">${this.optionalLabel}</span>` : nothing}
            </flint-step-label>`;
    }

    private _connector(completed = false) {
        return html`<flint-step-connector orientation=${this.orientation} ?completed=${completed}></flint-step-connector>`;
    }

    render() {
        const showConn = this.stepIndex > 0;

        /* ── Vertical ── */
        if (this.orientation === 'vertical') {
            const header = this.clickable
                ? html`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? 'step' : nothing}>${this._icon()} ${this._label()}</button>`
                : html`<div class="step-header">${this._icon()} ${this._label()}</div>`;
            return html`
                ${header}
                <div class="v-body">
                    <div class="v-line ${classMap({ completed: this.completed })}"></div>
                    <div class="v-content"><slot></slot></div>
                </div>`;
        }

        /* ── Horizontal alt-label ── */
        if (this.alternativeLabel) {
            const inner = this.clickable
                ? html`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? 'step' : nothing}>${this._icon()}</button>`
                : this._icon();
            /*
             * Both fills are always rendered (even if empty) to keep every icon
             * centred in its equal-width column. The leading fill of the first step
             * and the trailing fill of the last step are intentionally empty.
             */
            return html`
                <div class="alt-top">
                    <div class="conn-fill">${showConn ? this._connector(this.prevCompleted) : nothing}</div>
                    ${inner}
                    <div class="conn-fill"></div>
                </div>
                <div class="alt-label-row">${this._label()}</div>`;
        }

        /* ── Horizontal ── */
        const inner = this.clickable
            ? html`<button class="step-btn" ?disabled=${this.disabled} @click=${this._fire} aria-current=${this.active ? 'step' : nothing}>${this._icon()} ${this._label()}</button>`
            : html`<div class="step-header">${this._icon()} ${this._label()}</div>`;
        return html`
            ${showConn ? html`<div class="conn-wrap">${this._connector(this.prevCompleted)}</div>` : nothing}
            ${inner}`;
    }
}

/* ================================================================== */
/* FlintStepper                                                            */
/* ================================================================== */
/**
 * Stepper: a multi-step progress indicator.
 *
 * @fires flint-step-change - Fired when the active step changes via step click.
 */
export class FlintStepper extends FlintElement {
    static styles = unsafeCSS(uiStepperStyles);

    /** Zero-based index of the currently active step. */
    @property({ type: Number, attribute: 'active-step' }) activeStep = 0;
    /**
     * Initial active step for uncontrolled usage.
     * Has no effect after the element has connected to the DOM.
     */
    @property({ type: Number, attribute: 'default-active-step' }) defaultActiveStep?: number;
    /** Layout direction of the stepper. */
    @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
    /** Whether to display step labels below the icons instead of beside them. */
    @property({ type: Boolean, attribute: 'alternative-label' }) alternativeLabel = false;
    /** Whether steps can be navigated in any order (enables clickable steps). */
    @property({ type: Boolean, attribute: 'non-linear' }) nonLinear = false;
    /** Accessible label for the stepper landmark (maps to aria-label on the list element). */
    @property({ type: String }) label = 'steps';

    private _firstUpdate = true;

    override willUpdate(changed: PropertyValues) {
        if (this._firstUpdate) {
            this._firstUpdate = false;
            if (this.defaultActiveStep !== undefined) {
                this.activeStep = this.defaultActiveStep;
            }
        }
        void changed;
    }

    private _syncSteps() {
        const steps = Array.from(this.querySelectorAll<FlintStep>(':scope > flint-step'));
        steps.forEach((s, i) => {
            s.stepIndex = i;
            s.last = i === steps.length - 1;
            s.orientation = this.orientation;
            s.alternativeLabel = this.alternativeLabel;
            s.active = i === this.activeStep;
            /* The leading connector of step i should be blue only when step i-1 is completed */
            s.prevCompleted = i > 0 && steps[i - 1]!.completed;
            if (!this.nonLinear) {
                if (!s.completed) s.disabled = i > this.activeStep;
                s.clickable = false;
            } else {
                s.disabled = false;
                s.clickable = true;
            }
        });
    }

    firstUpdated() {
        this._syncSteps();
    }

    updated(c: Map<string, unknown>) {
        if (c.has('activeStep') || c.has('orientation') || c.has('alternativeLabel') || c.has('nonLinear')) {
            this._syncSteps();
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('flint-step-click', this._onStepClick as EventListener);
    }
    disconnectedCallback() {
        this.removeEventListener('flint-step-click', this._onStepClick as EventListener);
        super.disconnectedCallback();
    }

    private _onStepClick = (e: CustomEvent) => {
        this.activeStep = e.detail.step;
        this.dispatchEvent(new CustomEvent<FlintStepChangeDetail>('flint-step-change', { detail: { step: this.activeStep }, bubbles: true, composed: true }));
        this._syncSteps();
    };

    render() {
        const cls = `stepper ${this.orientation}${this.alternativeLabel ? ' alt' : ''}`;
        return html`
            <div class=${cls} role="list" aria-label=${this.label}>
                <slot @slotchange=${() => { this._syncSteps(); this.requestUpdate(); }}></slot>
            </div>`;
    }
}

/* ================================================================== */
/* FlintMobileStepper                                                      */
/* ================================================================== */
/**
 * Mobile Stepper: a compact stepper for mobile layouts.
 *
 * @slot back-button - Back navigation button.
 * @slot next-button - Next navigation button.
 *
 * @fires flint-mobile-step-back - Fired when the back button is clicked.
 * @fires flint-mobile-step-next - Fired when the next button is clicked.
 */
export class FlintMobileStepper extends FlintElement {
    static styles = unsafeCSS(uiMobileStepperStyles);

    /** Total number of steps. */
    @property({ type: Number }) steps = 0;
    /** Zero-based index of the currently active step. */
    @property({ type: Number, attribute: 'active-step' }) activeStep = 0;
    /** Progress indicator style: text counter, dot indicators, or a progress bar. */
    @property({ type: String }) variant: 'text' | 'dots' | 'progress' = 'dots';
    /** Positioning of the mobile stepper within its container. */
    @property({ type: String, reflect: true }) position: 'top' | 'bottom' | 'static' = 'static';
    /** Label text for the Back navigation button (supports i18n). */
    @property({ type: String, attribute: 'back-label' }) backLabel = 'Back';
    /** Label text for the Next navigation button (supports i18n). */
    @property({ type: String, attribute: 'next-label' }) nextLabel = 'Next';

    /** Guards against steps=0 (divide-by-zero, nonsensical UI). */
    private get _safeSteps() { return Math.max(1, this.steps); }

    private _emit(name: string) {
        this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
    }

    private _progress() {
        const current = this.activeStep + 1;
        const total = this._safeSteps;

        if (this.variant === 'text') {
            return html`<span class="text" aria-live="polite">Step ${current} of ${total}</span>`;
        }
        if (this.variant === 'dots') {
            return html`
                <div class="dots" aria-label="Step ${current} of ${total}">
                    <span class="sr-only" aria-live="polite">Step ${current} of ${total}</span>
                    ${Array.from({ length: total }, (_, i) =>
                        html`<div class="dot ${i === this.activeStep ? 'active' : ''}"></div>`)}
                </div>`;
        }
        /* progress variant */
        const pct = total > 1 ? (this.activeStep / (total - 1)) * 100 : 100;
        return html`
            <div
                class="bar-track"
                role="progressbar"
                aria-valuenow=${current}
                aria-valuemin="1"
                aria-valuemax=${total}
                aria-label="Step ${current} of ${total}"
            >
                <div class="bar-fill" style="width:${pct}%"></div>
            </div>`;
    }

    render() {
        return html`
            <slot name="back-button">
                <button
                    class="nav-btn back"
                    ?disabled=${this.activeStep === 0}
                    aria-label="Go to previous step"
                    @click=${() => this._emit('flint-mobile-step-back')}
                >${this.backLabel}</button>
            </slot>
            <div class="progress">${this._progress()}</div>
            <slot name="next-button">
                <button
                    class="nav-btn next"
                    ?disabled=${this.activeStep >= this._safeSteps - 1}
                    aria-label="Go to next step"
                    @click=${() => this._emit('flint-mobile-step-next')}
                >${this.nextLabel}</button>
            </slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'flint-stepper': FlintStepper;
        'flint-step': FlintStep;
        'flint-step-label': FlintStepLabel;
        'flint-step-content': FlintStepContent;
        'flint-step-connector': FlintStepConnector;
        'flint-mobile-stepper': FlintMobileStepper;
    }
}
