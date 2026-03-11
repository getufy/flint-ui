import { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import './ui-stepper';
import '../paper/ui-paper';
import '../button/ui-button';
import '../stack/ui-stack';
import '../box/ui-box';
import type { UiStepper, UiStep, UiMobileStepper, UiStepContent } from './ui-stepper';

const meta: Meta = {
    title: 'Navigation/Stepper',
    component: 'ui-stepper',
    argTypes: {
        activeStep: { control: { type: 'number', min: 0, max: 5 } },
        orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'] },
        alternativeLabel: { control: 'boolean' },
        nonLinear: { control: 'boolean' },
    },
};
export default meta;
type Story = StoryObj;

/* ── shared wrappers ── */
const panel = (inner: unknown) => html`
    <div style="font-family:Inter,sans-serif;max-width:760px;margin:0 auto;">${inner}</div>`;

const card = (inner: unknown) => html`
    <ui-paper elevation="2" style="overflow:hidden;">
        ${inner}
    </ui-paper>`;

/* ================================================================== */
/* Playground                                                           */
/* ================================================================== */
export const Playground: Story = {
    args: { activeStep: 1, orientation: 'horizontal', alternativeLabel: false, nonLinear: false },
    render: (args) => html`
        <ui-stepper
            .activeStep=${args['activeStep'] as number}
            .orientation=${args['orientation'] as 'horizontal' | 'vertical'}
            ?alternative-label=${args['alternativeLabel']}
            ?non-linear=${args['nonLinear']}
            style="border:1px solid #e2e8f0;border-radius:10px;"
        >
            <ui-step><span slot="label">Select campaign settings</span></ui-step>
            <ui-step optional optional-label="Optional"><span slot="label">Create an ad group</span></ui-step>
            <ui-step><span slot="label">Create an ad</span></ui-step>
        </ui-stepper>`,
};

/* ================================================================== */
/* Linear Horizontal                                                    */
/* ================================================================== */
export const LinearHorizontal: Story = {
    render: () => {
        let step = 0;
        const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

        function syncUI() {
            const sd = document.getElementById('lh-stepper') as UiStepper | null;
            if (!sd) return;
            sd.activeStep = step;
            const content = document.getElementById('lh-content');
            if (content) {
                content.innerHTML = step < steps.length
                    ? `<strong>Step ${step + 1}:</strong> ${steps[step]}`
                    : `<span style="color:#22c55e;font-weight:600;">✅ All steps completed!</span>`;
            }
        }

        return panel(card(html`
            <ui-stepper id="lh-stepper" active-step="0"
                style="border-bottom:1px solid #f1f5f9;">
                ${steps.map(l => html`<ui-step><span slot="label">${l}</span></ui-step>`)}
            </ui-stepper>

            <div id="lh-content"
                style="padding:24px;min-height:80px;font-size:.875rem;color:#374151;font-family:Inter,sans-serif;">
                <strong>Step 1:</strong> ${steps[0]}
            </div>

            <ui-stack direction="row" gap="8px" p="0 24px 16px">
                <ui-button variant="outlined" @click=${() => { step = Math.max(0, step - 1); syncUI(); }}>Back</ui-button>
                <ui-button @click=${() => {
                const sd = document.getElementById('lh-stepper') as UiStepper | null;
                if (!sd) return;
                if (step < steps.length - 1) {
                    sd.querySelectorAll<UiStep>('ui-step')[step].completed = true;
                    step++;
                } else if (step === steps.length - 1) {
                    sd.querySelectorAll<UiStep>('ui-step')[step].completed = true;
                    step = steps.length;
                }
                syncUI();
            }}>
                    ${step >= steps.length - 1 ? 'Finish' : 'Next'}
                </ui-button>
            </ui-stack>
        `));
    },
};

/* ================================================================== */
/* Non-Linear                                                           */
/* ================================================================== */
export const NonLinear: Story = {
    render: () => {
        let active = 0;
        const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
        const completed = new Set<number>();

        function syncNL() {
            const sd = document.getElementById('nl-stepper') as UiStepper | null;
            if (!sd) return;
            sd.activeStep = active;
            sd.querySelectorAll<UiStep>('ui-step').forEach((s, i) => { s.completed = completed.has(i); });
            const info = document.getElementById('nl-info');
            if (info) info.innerHTML = `<strong>Active Step ${active + 1}:</strong> ${steps[active]}`;
        }

        return panel(card(html`
            <ui-stepper id="nl-stepper" non-linear active-step="0"
                style="border-bottom:1px solid #f1f5f9;"
                @ui-step-change=${(e: CustomEvent) => { active = e.detail.step; syncNL(); }}>
                ${steps.map(l => html`<ui-step><span slot="label">${l}</span></ui-step>`)}
            </ui-stepper>

            <div id="nl-info"
                style="padding:24px;min-height:64px;font-size:.875rem;color:#374151;font-family:Inter,sans-serif;">
                <strong>Active Step 1:</strong> ${steps[0]}
                <span style="font-size:.75rem;color:#9ca3af;margin-left:8px;">(Click steps above to navigate freely)</span>
            </div>

            <ui-stack direction="row" gap="8px" p="0 24px 16px" style="font-family:Inter,sans-serif;">
                <ui-button @click=${() => { completed.add(active); syncNL(); }}>Mark Complete</ui-button>
                <ui-button variant="outlined" @click=${() => { completed.delete(active); syncNL(); }}>Reset Step</ui-button>
            </div>
        `));
    },
};

/* ================================================================== */
/* Alternative Label                                                    */
/* ================================================================== */
export const AlternativeLabel: Story = {
    render: () => panel(card(html`
        <ui-stepper alternative-label active-step="1"
            style="border-bottom:1px solid #f1f5f9;padding:24px;">
            <ui-step completed><span slot="label">Select campaign settings</span></ui-step>
            <ui-step><span slot="label">Create an ad group</span></ui-step>
            <ui-step><span slot="label">Create an ad</span></ui-step>
        </ui-stepper>
        <div style="padding:24px;font-size:.875rem;color:#9ca3af;font-family:Inter,sans-serif;text-align:center;">
            Labels appear below the step icons
        </div>
    `)),
};

/* ================================================================== */
/* Vertical Stepper                                                     */
/* ================================================================== */
export const Vertical: Story = {
    render: () => {
        let step = 0;
        const steps = [
            { label: 'Select campaign settings', content: "For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more." },
            { label: 'Create an ad group', content: 'An ad group contains one or more ads which target a shared set of keywords. Try to create a new ad group for each product category.' },
            { label: 'Create an ad', content: 'Try out different ad text to see what brings in the most customers, and put your best words up front.' },
        ];

        function syncV() {
            const sd = document.getElementById('v-stepper') as UiStepper | null;
            if (!sd) return;
            sd.activeStep = step;
            /* Use UiStepContent.open for accessible animated reveal */
            sd.querySelectorAll<UiStep>('ui-step').forEach((s, i) => {
                const content = s.querySelector<UiStepContent>('ui-step-content');
                if (content) content.open = i === step;
            });
        }

        return panel(card(html`
            <ui-stepper id="v-stepper" orientation="vertical" active-step="0">
                ${steps.map((s, i) => html`
                    <ui-step>
                        <span slot="label">${s.label}</span>
                        <ui-step-content ?open=${i === 0}>
                            <div style="color:#374151;font-size:.875rem;margin-bottom:12px;">${s.content}</div>
                            <ui-stack direction="row" gap="8px;">
                                <ui-button @click=${() => { if (step < steps.length - 1) step++; syncV(); }}>Continue</ui-button>
                                ${i > 0 ? html`
                                    <ui-button variant="outlined" @click=${() => { step = Math.max(0, step - 1); syncV(); }}>Back</ui-button>
                                ` : nothing}
                            </ui-stack>
                        </ui-step-content>
                    </ui-step>
                `)}
            </ui-stepper>
        `));
    },
};

/* ================================================================== */
/* Optional Step                                                        */
/* ================================================================== */
export const OptionalStep: Story = {
    render: () => panel(card(html`
        <ui-stepper active-step="1" style="border-bottom:1px solid #f1f5f9;padding:16px 24px;">
            <ui-step completed><span slot="label">Select campaign settings</span></ui-step>
            <ui-step optional optional-label="Optional"><span slot="label">Create an ad group</span></ui-step>
            <ui-step><span slot="label">Create an ad</span></ui-step>
        </ui-stepper>
        <div style="padding:16px 24px;font-size:.875rem;color:#6b7280;font-family:Inter,sans-serif;">
            Step 2 is marked as Optional — it can be skipped.
        </div>
    `)),
};

/* ================================================================== */
/* Error State                                                          */
/* ================================================================== */
export const ErrorStep: Story = {
    render: () => panel(card(html`
        <ui-stepper active-step="1" style="border-bottom:1px solid #f1f5f9;padding:16px 24px;">
            <ui-step completed><span slot="label">Select campaign settings</span></ui-step>
            <ui-step error><span slot="label">Create an ad group</span></ui-step>
            <ui-step disabled><span slot="label">Create an ad</span></ui-step>
        </ui-stepper>
        <div style="padding:16px 24px;font-size:.875rem;color:#ef4444;font-family:Inter,sans-serif;">
            ⚠️ Step 2 has an error — fix it before continuing.
        </div>
    `)),
};

/* ================================================================== */
/* All Steps Completed                                                  */
/* ================================================================== */
export const AllCompleted: Story = {
    render: () => panel(card(html`
        <ui-stepper active-step="3" style="border-bottom:1px solid #f1f5f9;padding:16px 24px;">
            <ui-step completed><span slot="label">Select campaign settings</span></ui-step>
            <ui-step completed><span slot="label">Create an ad group</span></ui-step>
            <ui-step completed><span slot="label">Create an ad</span></ui-step>
        </ui-stepper>
        <div style="padding:24px;text-align:center;font-family:Inter,sans-serif;">
            <div style="font-size:2rem;margin-bottom:8px;">🎉</div>
            <div style="font-size:1rem;font-weight:600;color:#22c55e;">All steps completed!</div>
            <div style="font-size:.875rem;color:#6b7280;margin-top:4px;">Your campaign is ready to go.</div>
        </div>
    `)),
};

/* ================================================================== */
/* Error Recovery                                                       */
/* ================================================================== */
export const ErrorRecovery: Story = {
    render: () => {
        let hasError = true;

        function update() {
            const sd = document.getElementById('er-stepper') as UiStepper | null;
            if (!sd) return;
            const step1 = sd.querySelectorAll<UiStep>('ui-step')[1];
            step1.error = hasError;
            step1.completed = !hasError;
            sd.activeStep = hasError ? 1 : 2;
            const msg = document.getElementById('er-msg');
            if (msg) {
                msg.textContent = hasError
                    ? '⚠️ There is a validation error in step 2. Fix it to continue.'
                    : '✅ Error resolved — you can now proceed to step 3.';
                (msg as HTMLElement).style.color = hasError ? '#ef4444' : '#22c55e';
            }
        }

        return panel(card(html`
            <ui-stepper id="er-stepper" active-step="1" style="border-bottom:1px solid #f1f5f9;padding:16px 24px;">
                <ui-step completed><span slot="label">Select campaign settings</span></ui-step>
                <ui-step error><span slot="label">Create an ad group</span></ui-step>
                <ui-step><span slot="label">Create an ad</span></ui-step>
            </ui-stepper>

            <div id="er-msg"
                style="padding:16px 24px;font-size:.875rem;color:#ef4444;font-family:Inter,sans-serif;">
                ⚠️ There is a validation error in step 2. Fix it to continue.
            </div>

            <ui-stack direction="row" gap="8px" p="0 24px 16px" style="font-family:Inter,sans-serif;">
                <ui-button @click=${() => { hasError = false; update(); }}>Fix Error</ui-button>
                <ui-button variant="outlined" @click=${() => { hasError = true; update(); }}>Re-introduce Error</ui-button>
            </div>
        `));
    },
};

/* ================================================================== */
/* Custom Icons                                                         */
/* ================================================================== */
export const CustomIcons: Story = {
    render: () => panel(card(html`
        <ui-stepper active-step="1" style="border-bottom:1px solid #f1f5f9;padding:16px 24px;">
            <ui-step completed>
                <span slot="icon">★</span>
                <span slot="label">Favourites</span>
            </ui-step>
            <ui-step>
                <span slot="icon">✎</span>
                <span slot="label">Edit Details</span>
            </ui-step>
            <ui-step>
                <span slot="icon">✔</span>
                <span slot="label">Confirm</span>
            </ui-step>
        </ui-stepper>
        <div style="padding:16px 24px;font-size:.875rem;color:#6b7280;font-family:Inter,sans-serif;">
            Custom icon content via <code>&lt;span slot="icon"&gt;</code>. Overridden automatically when step is completed or has an error.
        </div>
    `)),
};

/* ================================================================== */
/* Controlled Stepper                                                   */
/* ================================================================== */
export const Controlled: Story = {
    render: () => {
        /* Controlled: all state lives outside the component */
        let externalStep = 0;
        const steps = ['Account', 'Profile', 'Review'];

        function render() {
            const sd = document.getElementById('ctrl-stepper') as UiStepper | null;
            if (sd) sd.activeStep = externalStep;
            const info = document.getElementById('ctrl-info');
            if (info) info.textContent = `External state: step = ${externalStep}`;
        }

        return panel(card(html`
            <ui-stepper id="ctrl-stepper" active-step="0"
                style="border-bottom:1px solid #f1f5f9;"
                @ui-step-change=${(e: CustomEvent) => {
                    /* In controlled mode the parent decides whether to accept the change */
                    externalStep = e.detail.step;
                    render();
                }}>
                ${steps.map(l => html`<ui-step><span slot="label">${l}</span></ui-step>`)}
            </ui-stepper>

            <div id="ctrl-info"
                style="padding:16px 24px;font-size:.875rem;color:#374151;font-family:Inter,sans-serif;border-bottom:1px solid #f1f5f9;">
                External state: step = 0
            </div>

            <ui-stack direction="row" gap="8px" p="16px 24px" style="font-family:Inter,sans-serif;">
                <ui-button variant="outlined" @click=${() => { externalStep = Math.max(0, externalStep - 1); render(); }}>← Prev</ui-button>
                <ui-button @click=${() => { externalStep = Math.min(steps.length - 1, externalStep + 1); render(); }}>Next →</ui-button>
                <ui-button variant="outlined" style="margin-left:auto;" @click=${() => { externalStep = 0; render(); }}>Reset</ui-button>
            </div>
        `));
    },
};

/* ================================================================== */
/* Mobile Stepper — Text                                                */
/* ================================================================== */
export const MobileStepperText: Story = {
    render: () => {
        let step = 0;
        const steps = 5;
        const slides = ['🦁 Lion', '🐘 Elephant', '🦒 Giraffe', '🐧 Penguin', '🦓 Zebra'];

        return panel(html`
            <div style="width:320px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
                <ui-box id="ms-text-content" display="flex" alignItems="center" justifyContent="center" height="160px" style="font-size:2.5rem;background:var(--ui-muted-background, #f8fafc);">
                    ${slides[step]}
                </ui-box>
                <ui-mobile-stepper id="ms-text" variant="text" .steps=${steps} .activeStep=${step} position="static"
                    @ui-mobile-step-back=${() => {
                const el = document.getElementById('ms-text') as UiMobileStepper;
                step = Math.max(0, step - 1);
                el.activeStep = step;
                const c = document.getElementById('ms-text-content');
                if (c) c.textContent = slides[step];
            }}
                    @ui-mobile-step-next=${() => {
                const el = document.getElementById('ms-text') as UiMobileStepper;
                step = Math.min(steps - 1, step + 1);
                el.activeStep = step;
                const c = document.getElementById('ms-text-content');
                if (c) c.textContent = slides[step];
            }}
                ></ui-mobile-stepper>
            </div>
        `);
    },
};

/* ================================================================== */
/* Mobile Stepper — Dots                                               */
/* ================================================================== */
export const MobileStepperDots: Story = {
    render: () => {
        let step = 0;
        const steps = 4;
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];
        const labels = ['Ocean Blue', 'Deep Purple', 'Hot Pink', 'Amber'];

        return panel(html`
            <div style="width:320px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
                <ui-box id="ms-dots-content" display="flex" alignItems="center" justifyContent="center" height="160px" style="font-size:1rem;font-family:Inter,sans-serif;font-weight:600;color:#fff;background:${colors[step]};transition:background .3s;">
                    ${labels[step]}
                </ui-box>
                <ui-mobile-stepper id="ms-dots" variant="dots" .steps=${steps} .activeStep=${step} position="static"
                    @ui-mobile-step-back=${() => {
                const el = document.getElementById('ms-dots') as UiMobileStepper;
                step = Math.max(0, step - 1);
                el.activeStep = step;
                const c = document.getElementById('ms-dots-content') as HTMLElement;
                if (c) { c.style.background = colors[step]; c.textContent = labels[step]; }
            }}
                    @ui-mobile-step-next=${() => {
                const el = document.getElementById('ms-dots') as UiMobileStepper;
                step = Math.min(steps - 1, step + 1);
                el.activeStep = step;
                const c = document.getElementById('ms-dots-content') as HTMLElement;
                if (c) { c.style.background = colors[step]; c.textContent = labels[step]; }
            }}
                ></ui-mobile-stepper>
            </div>
        `);
    },
};

/* ================================================================== */
/* Mobile Stepper — Progress                                           */
/* ================================================================== */
export const MobileStepperProgress: Story = {
    render: () => {
        let step = 0;
        const steps = 8;

        return panel(html`
            <div style="width:360px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
                <div style="padding:20px 24px;background:var(--ui-muted-background, #f8fafc);font-family:Inter,sans-serif;">
                    <div id="ms-prog-label" style="font-weight:600;color:#374151;margin-bottom:4px;">Step 1 of ${steps}</div>
                    <div style="font-size:.8rem;color:#6b7280;">Long installation wizard with many steps</div>
                </div>
                <ui-mobile-stepper id="ms-prog" variant="progress" .steps=${steps} .activeStep=${step} position="static"
                    @ui-mobile-step-back=${() => {
                const el = document.getElementById('ms-prog') as UiMobileStepper;
                step = Math.max(0, step - 1);
                el.activeStep = step;
                const l = document.getElementById('ms-prog-label');
                if (l) l.textContent = `Step ${step + 1} of ${steps}`;
            }}
                    @ui-mobile-step-next=${() => {
                const el = document.getElementById('ms-prog') as UiMobileStepper;
                step = Math.min(steps - 1, step + 1);
                el.activeStep = step;
                const l = document.getElementById('ms-prog-label');
                if (l) l.textContent = `Step ${step + 1} of ${steps}`;
            }}
                ></ui-mobile-stepper>
            </div>
        `);
    },
};

/* ================================================================== */
/* Mobile Stepper — Custom Button Slots                                */
/* ================================================================== */
export const MobileStepperCustomButtons: Story = {
    render: () => {
        let step = 0;
        const steps = 4;

        return panel(html`
            <p style="font-family:Inter,sans-serif;font-size:.875rem;color:#6b7280;margin-bottom:12px;">
                Replace the default Back/Next buttons via <code>slot="back-button"</code> and <code>slot="next-button"</code>.
            </p>
            <div style="width:340px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
                <ui-box id="ms-custom-content" display="flex" alignItems="center" justifyContent="center" height="120px" style="font-size:1.25rem;font-family:Inter,sans-serif;color:#374151;background:var(--ui-muted-background, #f8fafc);">
                    Slide ${step + 1}
                </ui-box>
                <ui-mobile-stepper id="ms-custom" variant="dots" .steps=${steps} .activeStep=${step} position="static"
                    @ui-mobile-step-back=${() => {
                const el = document.getElementById('ms-custom') as UiMobileStepper;
                step = Math.max(0, step - 1);
                el.activeStep = step;
                const c = document.getElementById('ms-custom-content');
                if (c) c.textContent = `Slide ${step + 1}`;
            }}
                    @ui-mobile-step-next=${() => {
                const el = document.getElementById('ms-custom') as UiMobileStepper;
                step = Math.min(steps - 1, step + 1);
                el.activeStep = step;
                const c = document.getElementById('ms-custom-content');
                if (c) c.textContent = `Slide ${step + 1}`;
            }}
                >
                    <ui-button slot="back-button" variant="text" aria-label="Previous slide"
                        @click=${() => document.getElementById('ms-custom')?.dispatchEvent(new CustomEvent('ui-mobile-step-back', { bubbles: true }))}>
                        ‹
                    </ui-button>
                    <ui-button slot="next-button" variant="text" aria-label="Next slide"
                        @click=${() => document.getElementById('ms-custom')?.dispatchEvent(new CustomEvent('ui-mobile-step-next', { bubbles: true }))}>
                        ›
                    </ui-button>
                </ui-mobile-stepper>
            </div>
        `);
    },
};
