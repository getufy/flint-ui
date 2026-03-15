import { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import './flint-stepper';
import '../paper/flint-paper';
import '../button/flint-button';
import '../stack/flint-stack';
import '../box/flint-box';
import type { FlintStepper, FlintStep, FlintMobileStepper, FlintStepContent } from './flint-stepper';

const meta: Meta = {
    title: 'Navigation/Stepper',
    component: 'flint-stepper',
    parameters: {
        docs: {
            description: {
                component: `
#### \`<flint-step-connector>\`

- **Tag**: \`<flint-step-connector>\`
- **Class**: \`FlintStepConnector\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`orientation\` | \`orientation\` | \`'horizontal' \\| 'vertical'\` | \`'horizontal'\` | Layout direction of the connector line. |
| \`completed\` | \`completed\` | \`boolean\` | \`false\` | Whether the connector represents a completed step transition. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-surface-1\` | — |
| \`--flint-font-family\` | — |
| \`--flint-border-color\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-text-color\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-error-color\` | — |
| \`--flint-primary-focus-ring\` | — |

---

#### \`<flint-step-label>\`

Step Label: the label for a step.

- **Tag**: \`<flint-step-label>\`
- **Class**: \`FlintStepLabel\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`active\` | \`active\` | \`boolean\` | \`false\` | Whether the label's step is currently active. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the label's step is disabled. |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Whether the label's step is in an error state. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Label text. |
| \`optional\` | Optional step text. |

---

#### \`<flint-step-content>\`

Step Content: the collapsible content area for a step.

- **Tag**: \`<flint-step-content>\`
- **Class**: \`FlintStepContent\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`open\` | \`open\` | \`boolean\` | \`true\` | Whether the content is visible. Defaults true so standalone usage always shows. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Step content. |

---

#### \`<flint-step>\`

Step: an individual step within a stepper.

- **Tag**: \`<flint-step>\`
- **Class**: \`FlintStep\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`active\` | \`active\` | \`boolean\` | \`false\` | Whether this step is the currently active step. |
| \`completed\` | \`completed\` | \`boolean\` | \`false\` | Whether this step has been completed. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether this step is disabled and non-interactive. |
| \`optional\` | \`optional\` | \`boolean\` | \`false\` | Whether this step is optional. |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Whether this step is in an error state. |
| \`last\` | \`last\` | \`boolean\` | \`false\` | Whether this is the last step in the stepper. |
| \`clickable\` | \`clickable\` | \`boolean\` | \`false\` | Whether this step can be clicked to navigate to it. |
| \`orientation\` | \`orientation\` | \`'horizontal' \\| 'vertical'\` | \`'horizontal'\` | Layout direction of the step. |
| \`alternativeLabel\` | \`alternative-label\` | \`boolean\` | \`false\` | Whether to display the label below the step icon instead of beside it. |
| \`stepIndex\` | \`step-index\` | \`number\` | \`0\` | Zero-based index of this step within the stepper. |
| \`optionalLabel\` | \`optional-label\` | \`string\` | \`'Optional'\` | Text shown below the label when the step is optional. |
| \`prevCompleted\` | \`prev-completed\` | \`boolean\` | \`false\` | Set by FlintStepper — true when the immediately preceding step is completed. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-step-click\` | \`{ step: number }\` | Fired when a non-linear step is clicked. detail: \`{ step: number }\` |

#### Slots

| Name | Description |
|---|---|
| \`icon\` | Custom step icon. |
| \`label\` | Custom label content. |
| \`(default)\` | Step content. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-stepper-connector-color\` | — |
| \`--flint-stepper-icon-size\` | \`32px\` |

---

#### \`<flint-stepper>\`

Stepper: a multi-step progress indicator.

- **Tag**: \`<flint-stepper>\`
- **Class**: \`FlintStepper\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`activeStep\` | \`active-step\` | \`number\` | \`0\` | Zero-based index of the currently active step. |
| \`defaultActiveStep\` | \`default-active-step\` | \`number \\| undefined\` | — | Initial active step for uncontrolled usage. |
| \`orientation\` | \`orientation\` | \`'horizontal' \\| 'vertical'\` | \`'horizontal'\` | Layout direction of the stepper. |
| \`alternativeLabel\` | \`alternative-label\` | \`boolean\` | \`false\` | Whether to display step labels below the icons instead of beside them. |
| \`nonLinear\` | \`non-linear\` | \`boolean\` | \`false\` | Whether steps can be navigated in any order (enables clickable steps). |
| \`label\` | \`label\` | \`string\` | \`'steps'\` | Accessible label for the stepper landmark (maps to aria-label on the list element). |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-step-change\` | — | Fired when the active step changes via step click. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-stepper-connector-color\` | — |
| \`--flint-stepper-icon-size\` | \`32px\` |

---

#### \`<flint-mobile-stepper>\`

Mobile Stepper: a compact stepper for mobile layouts.

- **Tag**: \`<flint-mobile-stepper>\`
- **Class**: \`FlintMobileStepper\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`steps\` | \`steps\` | \`number\` | \`0\` | Total number of steps. |
| \`activeStep\` | \`active-step\` | \`number\` | \`0\` | Zero-based index of the currently active step. |
| \`variant\` | \`variant\` | \`'text' \\| 'dots' \\| 'progress'\` | \`'dots'\` | Progress indicator style: text counter, dot indicators, or a progress bar. |
| \`position\` | \`position\` | \`'top' \\| 'bottom' \\| 'static'\` | \`'static'\` | Positioning of the mobile stepper within its container. |
| \`backLabel\` | \`back-label\` | \`string\` | \`'Back'\` | Label text for the Back navigation button (supports i18n). |
| \`nextLabel\` | \`next-label\` | \`string\` | \`'Next'\` | Label text for the Next navigation button (supports i18n). |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-mobile-step-back\` | — | Fired when the back button is clicked. |
| \`flint-mobile-step-next\` | — | Fired when the next button is clicked. |

#### Slots

| Name | Description |
|---|---|
| \`back-button\` | Back navigation button. |
| \`next-button\` | Next navigation button. |
                `,
            },
        },
    },
    argTypes: {
        activeStep: { control: { type: 'number', min: 0, max: 5 } },
        orientation: { control: { type: 'select' }, options: ['horizontal', 'vertical'] },
        alternativeLabel: { control: 'boolean' },
        nonLinear: { control: 'boolean' },
    },
    args: {
        activeStep: 1,
        orientation: 'horizontal',
        alternativeLabel: false,
        nonLinear: false,
    },
};
export default meta;
type Story = StoryObj;

/* ── shared wrappers ── */
const panel = (inner: unknown) => html`
    <div style="font-family:Inter,sans-serif;max-width:760px;margin:0 auto;">${inner}</div>`;

const card = (inner: unknown) => html`
    <flint-paper elevation="2" style="overflow:hidden;">
        ${inner}
    </flint-paper>`;

/* ================================================================== */
/* Playground                                                           */
/* ================================================================== */
export const Playground: Story = {
    render: (args) => html`
        <flint-stepper
            .activeStep=${args['activeStep'] as number}
            .orientation=${args['orientation'] as 'horizontal' | 'vertical'}
            ?alternative-label=${args['alternativeLabel']}
            ?non-linear=${args['nonLinear']}
            style="border:1px solid #e2e8f0;border-radius:10px;"
        >
            <flint-step><span slot="label">Select campaign settings</span></flint-step>
            <flint-step optional optional-label="Optional"><span slot="label">Create an ad group</span></flint-step>
            <flint-step><span slot="label">Create an ad</span></flint-step>
        </flint-stepper>`,
};

/* ================================================================== */
/* Linear Horizontal                                                    */
/* ================================================================== */
export const LinearHorizontal: Story = {
    render: () => {
        let step = 0;
        const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

        function syncUI() {
            const sd = document.getElementById('lh-stepper') as FlintStepper | null;
            if (!sd) return;
            sd.activeStep = step;
            const content = document.getElementById('lh-content');
            if (content) {
                content.innerHTML = step < steps.length
                    ? `<strong>Step ${step + 1}:</strong> ${steps[step]}`
                    : `<span style="color:#15803d;font-weight:600;">✅ All steps completed!</span>`;
            }
        }

        return panel(card(html`
            <flint-stepper id="lh-stepper" active-step="0"
                style="border-bottom:1px solid #f1f5f9;">
                ${steps.map(l => html`<flint-step><span slot="label">${l}</span></flint-step>`)}
            </flint-stepper>

            <div id="lh-content"
                style="padding:24px;min-height:80px;font-size:.875rem;color:#374151;font-family:Inter,sans-serif;">
                <strong>Step 1:</strong> ${steps[0]}
            </div>

            <flint-stack direction="row" gap="8px" p="0 24px 16px">
                <flint-button variant="outlined" @click=${() => { step = Math.max(0, step - 1); syncUI(); }}>Back</flint-button>
                <flint-button @click=${() => {
                const sd = document.getElementById('lh-stepper') as FlintStepper | null;
                if (!sd) return;
                if (step < steps.length - 1) {
                    sd.querySelectorAll<FlintStep>('flint-step')[step].completed = true;
                    step++;
                } else if (step === steps.length - 1) {
                    sd.querySelectorAll<FlintStep>('flint-step')[step].completed = true;
                    step = steps.length;
                }
                syncUI();
            }}>
                    ${step >= steps.length - 1 ? 'Finish' : 'Next'}
                </flint-button>
            </flint-stack>
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
            const sd = document.getElementById('nl-stepper') as FlintStepper | null;
            if (!sd) return;
            sd.activeStep = active;
            sd.querySelectorAll<FlintStep>('flint-step').forEach((s, i) => { s.completed = completed.has(i); });
            const info = document.getElementById('nl-info');
            if (info) info.innerHTML = `<strong>Active Step ${active + 1}:</strong> ${steps[active]}`;
        }

        return panel(card(html`
            <flint-stepper id="nl-stepper" non-linear active-step="0"
                style="border-bottom:1px solid #f1f5f9;"
                @flint-step-change=${(e: CustomEvent) => { active = e.detail.step; syncNL(); }}>
                ${steps.map(l => html`<flint-step><span slot="label">${l}</span></flint-step>`)}
            </flint-stepper>

            <div id="nl-info"
                style="padding:24px;min-height:64px;font-size:.875rem;color:#374151;font-family:Inter,sans-serif;">
                <strong>Active Step 1:</strong> ${steps[0]}
                <span style="font-size:.75rem;color:#4b5563;margin-left:8px;">(Click steps above to navigate freely)</span>
            </div>

            <flint-stack direction="row" gap="8px" p="0 24px 16px" style="font-family:Inter,sans-serif;">
                <flint-button @click=${() => { completed.add(active); syncNL(); }}>Mark Complete</flint-button>
                <flint-button variant="outlined" @click=${() => { completed.delete(active); syncNL(); }}>Reset Step</flint-button>
            </div>
        `));
    },
};

/* ================================================================== */
/* Alternative Label                                                    */
/* ================================================================== */
export const AlternativeLabel: Story = {
    render: () => panel(card(html`
        <flint-stepper alternative-label active-step="1"
            style="border-bottom:1px solid #f1f5f9;padding:24px;">
            <flint-step completed><span slot="label">Select campaign settings</span></flint-step>
            <flint-step><span slot="label">Create an ad group</span></flint-step>
            <flint-step><span slot="label">Create an ad</span></flint-step>
        </flint-stepper>
        <div style="padding:24px;font-size:.875rem;color:#4b5563;font-family:Inter,sans-serif;text-align:center;">
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
            const sd = document.getElementById('v-stepper') as FlintStepper | null;
            if (!sd) return;
            sd.activeStep = step;
            /* Use FlintStepContent.open for accessible animated reveal */
            sd.querySelectorAll<FlintStep>('flint-step').forEach((s, i) => {
                const content = s.querySelector<FlintStepContent>('flint-step-content');
                if (content) content.open = i === step;
            });
        }

        return panel(card(html`
            <flint-stepper id="v-stepper" orientation="vertical" active-step="0">
                ${steps.map((s, i) => html`
                    <flint-step>
                        <span slot="label">${s.label}</span>
                        <flint-step-content ?open=${i === 0}>
                            <div style="color:#374151;font-size:.875rem;margin-bottom:12px;">${s.content}</div>
                            <flint-stack direction="row" gap="8px;">
                                <flint-button @click=${() => { if (step < steps.length - 1) step++; syncV(); }}>Continue</flint-button>
                                ${i > 0 ? html`
                                    <flint-button variant="outlined" @click=${() => { step = Math.max(0, step - 1); syncV(); }}>Back</flint-button>
                                ` : nothing}
                            </flint-stack>
                        </flint-step-content>
                    </flint-step>
                `)}
            </flint-stepper>
        `));
    },
};

/* ================================================================== */
/* Optional Step                                                        */
/* ================================================================== */
export const OptionalStep: Story = {
    render: () => panel(card(html`
        <flint-stepper active-step="1" style="border-bottom:1px solid #f1f5f9;padding:16px 24px;">
            <flint-step completed><span slot="label">Select campaign settings</span></flint-step>
            <flint-step optional optional-label="Optional"><span slot="label">Create an ad group</span></flint-step>
            <flint-step><span slot="label">Create an ad</span></flint-step>
        </flint-stepper>
        <div style="padding:16px 24px;font-size:.875rem;color:#4b5563;font-family:Inter,sans-serif;">
            Step 2 is marked as Optional — it can be skipped.
        </div>
    `)),
};

/* ================================================================== */
/* Error State                                                          */
/* ================================================================== */
export const ErrorStep: Story = {
    render: () => panel(card(html`
        <flint-stepper active-step="1" style="border-bottom:1px solid #f1f5f9;padding:16px 24px;">
            <flint-step completed><span slot="label">Select campaign settings</span></flint-step>
            <flint-step error><span slot="label">Create an ad group</span></flint-step>
            <flint-step disabled><span slot="label">Create an ad</span></flint-step>
        </flint-stepper>
        <div style="padding:16px 24px;font-size:.875rem;color:#dc2626;font-family:Inter,sans-serif;">
            ⚠️ Step 2 has an error — fix it before continuing.
        </div>
    `)),
};

/* ================================================================== */
/* All Steps Completed                                                  */
/* ================================================================== */
export const AllCompleted: Story = {
    render: () => panel(card(html`
        <flint-stepper active-step="3" style="border-bottom:1px solid #f1f5f9;padding:16px 24px;">
            <flint-step completed><span slot="label">Select campaign settings</span></flint-step>
            <flint-step completed><span slot="label">Create an ad group</span></flint-step>
            <flint-step completed><span slot="label">Create an ad</span></flint-step>
        </flint-stepper>
        <div style="padding:24px;text-align:center;font-family:Inter,sans-serif;">
            <div style="font-size:2rem;margin-bottom:8px;">🎉</div>
            <div style="font-size:1rem;font-weight:600;color:#15803d;">All steps completed!</div>
            <div style="font-size:.875rem;color:#4b5563;margin-top:4px;">Your campaign is ready to go.</div>
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
            const sd = document.getElementById('er-stepper') as FlintStepper | null;
            if (!sd) return;
            const step1 = sd.querySelectorAll<FlintStep>('flint-step')[1];
            step1.error = hasError;
            step1.completed = !hasError;
            sd.activeStep = hasError ? 1 : 2;
            const msg = document.getElementById('er-msg');
            if (msg) {
                msg.textContent = hasError
                    ? '⚠️ There is a validation error in step 2. Fix it to continue.'
                    : '✅ Error resolved — you can now proceed to step 3.';
                (msg as HTMLElement).style.color = hasError ? '#dc2626' : '#15803d';
            }
        }

        return panel(card(html`
            <flint-stepper id="er-stepper" active-step="1" style="border-bottom:1px solid #f1f5f9;padding:16px 24px;">
                <flint-step completed><span slot="label">Select campaign settings</span></flint-step>
                <flint-step error><span slot="label">Create an ad group</span></flint-step>
                <flint-step><span slot="label">Create an ad</span></flint-step>
            </flint-stepper>

            <div id="er-msg"
                style="padding:16px 24px;font-size:.875rem;color:#dc2626;font-family:Inter,sans-serif;">
                ⚠️ There is a validation error in step 2. Fix it to continue.
            </div>

            <flint-stack direction="row" gap="8px" p="0 24px 16px" style="font-family:Inter,sans-serif;">
                <flint-button @click=${() => { hasError = false; update(); }}>Fix Error</flint-button>
                <flint-button variant="outlined" @click=${() => { hasError = true; update(); }}>Re-introduce Error</flint-button>
            </div>
        `));
    },
};

/* ================================================================== */
/* Custom Icons                                                         */
/* ================================================================== */
export const CustomIcons: Story = {
    render: () => panel(card(html`
        <flint-stepper active-step="1" style="border-bottom:1px solid #f1f5f9;padding:16px 24px;">
            <flint-step completed>
                <span slot="icon">★</span>
                <span slot="label">Favourites</span>
            </flint-step>
            <flint-step>
                <span slot="icon">✎</span>
                <span slot="label">Edit Details</span>
            </flint-step>
            <flint-step>
                <span slot="icon">✔</span>
                <span slot="label">Confirm</span>
            </flint-step>
        </flint-stepper>
        <div style="padding:16px 24px;font-size:.875rem;color:#4b5563;font-family:Inter,sans-serif;">
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
            const sd = document.getElementById('ctrl-stepper') as FlintStepper | null;
            if (sd) sd.activeStep = externalStep;
            const info = document.getElementById('ctrl-info');
            if (info) info.textContent = `External state: step = ${externalStep}`;
        }

        return panel(card(html`
            <flint-stepper id="ctrl-stepper" active-step="0"
                style="border-bottom:1px solid #f1f5f9;"
                @flint-step-change=${(e: CustomEvent) => {
                    /* In controlled mode the parent decides whether to accept the change */
                    externalStep = e.detail.step;
                    render();
                }}>
                ${steps.map(l => html`<flint-step><span slot="label">${l}</span></flint-step>`)}
            </flint-stepper>

            <div id="ctrl-info"
                style="padding:16px 24px;font-size:.875rem;color:#374151;font-family:Inter,sans-serif;border-bottom:1px solid #f1f5f9;">
                External state: step = 0
            </div>

            <flint-stack direction="row" gap="8px" p="16px 24px" style="font-family:Inter,sans-serif;">
                <flint-button variant="outlined" @click=${() => { externalStep = Math.max(0, externalStep - 1); render(); }}>← Prev</flint-button>
                <flint-button @click=${() => { externalStep = Math.min(steps.length - 1, externalStep + 1); render(); }}>Next →</flint-button>
                <flint-button variant="outlined" style="margin-left:auto;" @click=${() => { externalStep = 0; render(); }}>Reset</flint-button>
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
                <flint-box id="ms-text-content" display="flex" alignItems="center" justifyContent="center" height="160px" style="font-size:2.5rem;background:var(--flint-muted-background, #f8fafc);">
                    ${slides[step]}
                </flint-box>
                <flint-mobile-stepper id="ms-text" variant="text" .steps=${steps} .activeStep=${step} position="static"
                    @flint-mobile-step-back=${() => {
                const el = document.getElementById('ms-text') as FlintMobileStepper;
                step = Math.max(0, step - 1);
                el.activeStep = step;
                const c = document.getElementById('ms-text-content');
                if (c) c.textContent = slides[step];
            }}
                    @flint-mobile-step-next=${() => {
                const el = document.getElementById('ms-text') as FlintMobileStepper;
                step = Math.min(steps - 1, step + 1);
                el.activeStep = step;
                const c = document.getElementById('ms-text-content');
                if (c) c.textContent = slides[step];
            }}
                ></flint-mobile-stepper>
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
        const colors = ['#2563eb', '#7c3aed', '#be185d', '#b45309'];
        const labels = ['Ocean Blue', 'Deep Purple', 'Hot Pink', 'Amber'];

        return panel(html`
            <div style="width:320px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
                <flint-box id="ms-dots-content" display="flex" alignItems="center" justifyContent="center" height="160px" style="font-size:1rem;font-family:Inter,sans-serif;font-weight:600;color:#fff;background:${colors[step]};transition:background .3s;">
                    ${labels[step]}
                </flint-box>
                <flint-mobile-stepper id="ms-dots" variant="dots" .steps=${steps} .activeStep=${step} position="static"
                    @flint-mobile-step-back=${() => {
                const el = document.getElementById('ms-dots') as FlintMobileStepper;
                step = Math.max(0, step - 1);
                el.activeStep = step;
                const c = document.getElementById('ms-dots-content') as HTMLElement;
                if (c) { c.style.background = colors[step]; c.textContent = labels[step]; }
            }}
                    @flint-mobile-step-next=${() => {
                const el = document.getElementById('ms-dots') as FlintMobileStepper;
                step = Math.min(steps - 1, step + 1);
                el.activeStep = step;
                const c = document.getElementById('ms-dots-content') as HTMLElement;
                if (c) { c.style.background = colors[step]; c.textContent = labels[step]; }
            }}
                ></flint-mobile-stepper>
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
                <div style="padding:20px 24px;background:var(--flint-muted-background, #f8fafc);font-family:Inter,sans-serif;">
                    <div id="ms-prog-label" style="font-weight:600;color:#374151;margin-bottom:4px;">Step 1 of ${steps}</div>
                    <div style="font-size:.8rem;color:#4b5563;">Long installation wizard with many steps</div>
                </div>
                <flint-mobile-stepper id="ms-prog" variant="progress" .steps=${steps} .activeStep=${step} position="static"
                    @flint-mobile-step-back=${() => {
                const el = document.getElementById('ms-prog') as FlintMobileStepper;
                step = Math.max(0, step - 1);
                el.activeStep = step;
                const l = document.getElementById('ms-prog-label');
                if (l) l.textContent = `Step ${step + 1} of ${steps}`;
            }}
                    @flint-mobile-step-next=${() => {
                const el = document.getElementById('ms-prog') as FlintMobileStepper;
                step = Math.min(steps - 1, step + 1);
                el.activeStep = step;
                const l = document.getElementById('ms-prog-label');
                if (l) l.textContent = `Step ${step + 1} of ${steps}`;
            }}
                ></flint-mobile-stepper>
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
            <p style="font-family:Inter,sans-serif;font-size:.875rem;color:#4b5563;margin-bottom:12px;">
                Replace the default Back/Next buttons via <code>slot="back-button"</code> and <code>slot="next-button"</code>.
            </p>
            <div style="width:340px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
                <flint-box id="ms-custom-content" display="flex" alignItems="center" justifyContent="center" height="120px" style="font-size:1.25rem;font-family:Inter,sans-serif;color:#374151;background:var(--flint-muted-background, #f8fafc);">
                    Slide ${step + 1}
                </flint-box>
                <flint-mobile-stepper id="ms-custom" variant="dots" .steps=${steps} .activeStep=${step} position="static"
                    @flint-mobile-step-back=${() => {
                const el = document.getElementById('ms-custom') as FlintMobileStepper;
                step = Math.max(0, step - 1);
                el.activeStep = step;
                const c = document.getElementById('ms-custom-content');
                if (c) c.textContent = `Slide ${step + 1}`;
            }}
                    @flint-mobile-step-next=${() => {
                const el = document.getElementById('ms-custom') as FlintMobileStepper;
                step = Math.min(steps - 1, step + 1);
                el.activeStep = step;
                const c = document.getElementById('ms-custom-content');
                if (c) c.textContent = `Slide ${step + 1}`;
            }}
                >
                    <flint-button slot="back-button" variant="text" aria-label="Previous slide"
                        @click=${() => document.getElementById('ms-custom')?.dispatchEvent(new CustomEvent('flint-mobile-step-back', { bubbles: true }))}>
                        ‹
                    </flint-button>
                    <flint-button slot="next-button" variant="text" aria-label="Next slide"
                        @click=${() => document.getElementById('ms-custom')?.dispatchEvent(new CustomEvent('flint-mobile-step-next', { bubbles: true }))}>
                        ›
                    </flint-button>
                </flint-mobile-stepper>
            </div>
        `);
    },
};
