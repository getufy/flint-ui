import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/* ── SVG icons ─────────────────────────────────────────────────────── */
const iconCheck = html`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
const iconWarn = html`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;

/* ================================================================== */
/* UiStepConnector                                                      */
/* ================================================================== */
@customElement('ui-step-connector')
export class UiStepConnector extends LitElement {
    static styles = css`
        :host { display: block; }
        .line {
            background: var(--ui-stepper-connector-color, #e5e7eb);
            border-radius: 2px;
            transition: background 0.3s;
        }
        .line.completed { background: var(--ui-primary-color, #3b82f6); }
        :host([orientation="horizontal"]) .line { height: 2px; width: 100%; }
        :host([orientation="vertical"])   .line { width: 2px; min-height: 24px; margin: 0 auto; }
    `;

    @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
    @property({ type: Boolean }) completed = false;

    render() { return html`<div class="line ${classMap({ completed: this.completed })}"></div>`; }
}

/* ================================================================== */
/* UiStepLabel                                                          */
/* ================================================================== */
@customElement('ui-step-label')
export class UiStepLabel extends LitElement {
    static styles = css`
        :host { display: block; }
        .label { font-size: .875rem; font-weight: 500; color: var(--ui-text-color, #111827); font-family: var(--ui-font-family,'Inter',sans-serif); line-height: 1.4; }
        .optional { font-size: .75rem; color: #9ca3af; font-style: italic; }
        :host([active])   .label { color: var(--ui-primary-color, #3b82f6); font-weight: 600; }
        :host([disabled]) .label { color: #9ca3af; }
        :host([error])    .label { color: var(--ui-error-color, #ef4444); }
    `;

    @property({ type: Boolean, reflect: true }) active = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) error = false;

    render() {
        return html`
        <div class="label"><slot></slot></div>
        <div class="optional"><slot name="optional"></slot></div>
    `;
    }
}

/* ================================================================== */
/* UiStepContent                                                        */
/* ================================================================== */
@customElement('ui-step-content')
export class UiStepContent extends LitElement {
    static styles = css`
        :host { display: block; overflow: hidden; }
        .panel {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.25s ease;
        }
        .panel.open { grid-template-rows: 1fr; }
        .inner {
            overflow: hidden;
            padding: 0 16px;
            /* padding animates together with the grid expand */
            transition: padding 0.25s ease;
        }
        .panel.open .inner { padding: 8px 16px 16px; }
        .content {
            font-size: .875rem;
            color: var(--ui-text-color, #374151);
            font-family: var(--ui-font-family,'Inter',sans-serif);
        }
    `;

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
/* UiStep                                                               */
/* ================================================================== */
@customElement('ui-step')
export class UiStep extends LitElement {
    static styles = css`
        :host {
            display: flex;
            /*
             * flex: 1 1 0  ← key for equal columns:
             * '0' flex-basis means the available space is divided equally,
             * ignoring each step's content size.  Combined with min-width:0
             * this prevents longer labels from widening their column.
             */
            flex: 1 1 0;
            min-width: 0;
            font-family: var(--ui-font-family,'Inter',sans-serif);
        }

        /* ── Horizontal ── */
        :host([orientation="horizontal"]) { align-items: flex-start; padding-top: 4px; }

        /* ── Vertical ── */
        :host([orientation="vertical"]) {
            flex-direction: column;
            flex: none;
            width: 100%;
        }

        /* ── Alternative label (horizontal) ── */
        :host([alternative-label]) {
            flex-direction: column;
            align-items: center;
            flex: 1;
            min-width: 0;
        }

        /* connector wrapper — fills the gap between steps */
        .conn-wrap {
            flex: 1 1 auto;
            min-width: 12px;
            display: flex;
            /*
             * flex-start so the connector stays anchored to the top
             * regardless of how tall a multi-line label makes the row.
             * padding-top places the 2px line exactly at the icon's center:
             *   host padding-top (4px) + half icon (16px) - 1px (half line) = 15px
             */
            align-items: flex-start;
            padding-top: 15px;
        }
        .conn-wrap ui-step-connector { flex: 1; }

        /*
         * alt-label top row: always render two symmetric fills so every
         * icon is centred in its column regardless of position.
         * First step's leading fill is empty; last step's trailing fill
         * is empty — both are rendered to keep equal column widths.
         */
        .alt-top { display: flex; align-items: center; width: 100%; }
        .alt-top .conn-fill { flex: 1; display: flex; align-items: center; }
        .alt-top .conn-fill ui-step-connector { flex: 1; }

        /* ── Step header: icon + label ── */
        .step-header {
            display: flex;
            align-items: flex-start;   /* icon aligns to first line of label */
            gap: 14px;
            min-width: 0;              /* allow label to wrap instead of overflow */
        }
        /* Optically nudge label down so its baseline sits at the icon's centre */
        .step-header ui-step-label,
        .step-btn    ui-step-label {
            padding-top: 5px;          /* (32px icon − ~22px text) / 2 ≈ 5px */
            min-width: 0;
        }

        :host([alternative-label]) .alt-label-row {
            margin-top: 8px;
            text-align: center;
            min-width: 0;
            width: 100%;
        }

        /* clickable button mode */
        .step-btn {
            background: none; border: none; padding: 0; cursor: pointer;
            font-family: inherit; border-radius: 6px; outline: none;
            display: flex; align-items: flex-start; gap: 14px;
            min-width: 0;
            text-align: left;
        }
        .step-btn:focus-visible { outline: 2px solid var(--ui-primary-color, #3b82f6); outline-offset: 3px; }
        :host([disabled]) .step-btn { cursor: default; }
        :host([alternative-label]) .step-btn { flex-direction: column; align-items: center; gap: 0; }

        /* ── Vertical body ── */
        .v-body {
            display: flex;
            margin-left: 15px;
            min-height: 16px;
        }
        .v-line {
            width: 2px;
            background: var(--ui-stepper-connector-color, #e5e7eb);
            border-radius: 2px;
            flex-shrink: 0;
            transition: background 0.3s;
            margin-right: 14px;
        }
        .v-line.completed { background: var(--ui-primary-color, #3b82f6); }
        :host([last]) .v-line { background: transparent; }
        .v-content { flex: 1; padding-bottom: 8px; min-width: 0; }

        /* ── Step icon circle ── */
        .icon-circle {
            width: var(--ui-stepper-icon-size, 32px);
            height: var(--ui-stepper-icon-size, 32px);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: .8125rem; font-weight: 700;
            border: 2px solid #d1d5db;
            color: #9ca3af;
            background: transparent;
            transition: all .2s;
            /* Never shrink — it's a fixed-size indicator */
            flex-shrink: 0;
            box-sizing: border-box;
        }
        .icon-circle.active   { background: var(--ui-primary-color,#3b82f6); border-color: var(--ui-primary-color,#3b82f6); color:#fff; box-shadow:0 0 0 4px rgba(59,130,246,.15); }
        .icon-circle.completed{ background: var(--ui-primary-color,#3b82f6); border-color: var(--ui-primary-color,#3b82f6); color:#fff; }
        .icon-circle.error    { border-color: var(--ui-error-color,#ef4444); color: var(--ui-error-color,#ef4444); }
        :host([disabled]) .icon-circle { opacity: .4; }
    `;

    @property({ type: Boolean, reflect: true }) active = false;
    @property({ type: Boolean, reflect: true }) completed = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: Boolean, reflect: true }) optional = false;
    @property({ type: Boolean, reflect: true }) error = false;
    @property({ type: Boolean, reflect: true }) last = false;
    @property({ type: Boolean, reflect: true }) clickable = false;
    @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
    @property({ type: Boolean, reflect: true, attribute: 'alternative-label' }) alternativeLabel = false;
    @property({ type: Number, attribute: 'step-index' }) stepIndex = 0;
    @property({ type: String, attribute: 'optional-label' }) optionalLabel = 'Optional';
    /**
     * Set by UiStepper — true when the immediately preceding step is completed.
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
        this.dispatchEvent(new CustomEvent('ui-step-click', { detail: { index: this.stepIndex }, bubbles: true, composed: true }));
    }

    private _icon() {
        const cls = { 'icon-circle': true, active: this.active, completed: this.completed, error: this.error };
        const inner = this.error ? iconWarn : this.completed ? iconCheck : html`<slot name="icon">${this.stepIndex + 1}</slot>`;
        return html`<div class=${classMap(cls)}>${inner}</div>`;
    }

    private _label() {
        return html`
            <ui-step-label ?active=${this.active} ?disabled=${this.disabled} ?error=${this.error}>
                <slot name="label"></slot>
                ${this.optional ? html`<span slot="optional">${this.optionalLabel}</span>` : nothing}
            </ui-step-label>`;
    }

    private _connector(completed = false) {
        return html`<ui-step-connector orientation=${this.orientation} ?completed=${completed}></ui-step-connector>`;
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
/* UiStepper                                                            */
/* ================================================================== */
@customElement('ui-stepper')
export class UiStepper extends LitElement {
    static styles = css`
        :host { display: block; font-family: var(--ui-font-family,'Inter',sans-serif); }
        .stepper {
            display: flex;
            padding: 16px 24px;
            background: var(--ui-surface-background, #fff);
        }
        /* Horizontal: align-items:stretch lets each step be as tall as the tallest */
        .stepper.horizontal { align-items: stretch; flex-direction: row; }
        .stepper.vertical   { flex-direction: column; gap: 0; }
        /* alt-label: icons sit at the same height across all steps */
        .stepper.alt { align-items: flex-start; }

        /* Expose primary color to steps */
        ::slotted(ui-step) { /* overridden in child */ }
    `;

    @property({ type: Number, attribute: 'active-step' }) activeStep = 0;
    @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
    @property({ type: Boolean, attribute: 'alternative-label' }) alternativeLabel = false;
    @property({ type: Boolean, attribute: 'non-linear' }) nonLinear = false;
    /** Accessible label for the stepper landmark (maps to aria-label on the list element). */
    @property({ type: String }) label = 'steps';

    private _syncSteps() {
        const steps = Array.from(this.querySelectorAll<UiStep>(':scope > ui-step'));
        steps.forEach((s, i) => {
            s.stepIndex = i;
            s.last = i === steps.length - 1;
            s.orientation = this.orientation;
            s.alternativeLabel = this.alternativeLabel;
            s.active = i === this.activeStep;
            /* The leading connector of step i should be blue only when step i-1 is completed */
            s.prevCompleted = i > 0 && steps[i - 1].completed;
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
        this.addEventListener('ui-step-click', this._onStepClick as EventListener);
    }
    disconnectedCallback() {
        this.removeEventListener('ui-step-click', this._onStepClick as EventListener);
        super.disconnectedCallback();
    }

    private _onStepClick = (e: CustomEvent) => {
        this.activeStep = e.detail.index;
        this.dispatchEvent(new CustomEvent('ui-step-change', { detail: { step: e.detail.index }, bubbles: true, composed: true }));
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
/* UiMobileStepper                                                      */
/* ================================================================== */
@customElement('ui-mobile-stepper')
export class UiMobileStepper extends LitElement {
    static styles = css`
        :host {
            display: flex; align-items: center; justify-content: space-between;
            padding: 8px 12px; gap: 8px;
            background: var(--ui-surface-background,#fff);
            font-family: var(--ui-font-family,'Inter',sans-serif);
        }
        :host([position="static"]) { border:1px solid var(--ui-border-color,#e5e7eb); border-radius:8px; }
        :host([position="bottom"]) { border-top:1px solid var(--ui-border-color,#e5e7eb); }
        :host([position="top"])    { border-bottom:1px solid var(--ui-border-color,#e5e7eb); }

        .progress { display:flex; align-items:center; justify-content:center; flex:1; gap:0; }

        /* text */
        .text { font-size:.8rem; color:#6b7280; }

        /* dots */
        .dots { display:flex; gap:6px; }
        .dot  { width:10px; height:10px; border-radius:50%; background:#d1d5db; transition:background .2s; }
        .dot.active { background:var(--ui-primary-color,#3b82f6); }

        /* progress bar */
        .bar-track { flex:1; height:4px; background:#e5e7eb; border-radius:2px; overflow:hidden; }
        .bar-fill   { height:100%; background:var(--ui-primary-color,#3b82f6); border-radius:2px; transition:width .3s; }

        /* screen-reader-only utility */
        .sr-only {
            position: absolute; width: 1px; height: 1px;
            padding: 0; margin: -1px; overflow: hidden;
            clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }

        /* default nav buttons */
        .nav-btn {
            padding:6px 14px; border-radius:6px; font-size:.8rem; font-family:inherit; cursor:pointer;
            transition: opacity .15s;
        }
        .nav-btn:disabled { opacity:.38; cursor:default; }
        .nav-btn.back { background:#fff; color:#374151; border:1px solid #e2e8f0; }
        .nav-btn.next { background:var(--ui-primary-color,#3b82f6); color:#fff; border:none; }
    `;

    @property({ type: Number }) steps = 0;
    @property({ type: Number, attribute: 'active-step' }) activeStep = 0;
    @property({ type: String }) variant: 'text' | 'dots' | 'progress' = 'dots';
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
                    @click=${() => this._emit('ui-mobile-step-back')}
                >${this.backLabel}</button>
            </slot>
            <div class="progress">${this._progress()}</div>
            <slot name="next-button">
                <button
                    class="nav-btn next"
                    ?disabled=${this.activeStep >= this._safeSteps - 1}
                    aria-label="Go to next step"
                    @click=${() => this._emit('ui-mobile-step-next')}
                >${this.nextLabel}</button>
            </slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ui-stepper': UiStepper;
        'ui-step': UiStep;
        'ui-step-label': UiStepLabel;
        'ui-step-content': UiStepContent;
        'ui-step-connector': UiStepConnector;
        'ui-mobile-stepper': UiMobileStepper;
    }
}
