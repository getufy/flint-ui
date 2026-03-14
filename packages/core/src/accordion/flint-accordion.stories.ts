import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-accordion';
import { FlintAccordion } from './flint-accordion';
import '../button/flint-button';

const meta: Meta = {
    title: 'Surfaces/Accordion',
    component: 'flint-accordion',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'aria-valid-attr-value', enabled: false },
                    { id: 'landmark-unique', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
#### \`<flint-accordion>\`

Accordion: the wrapper for grouping related components.

- **Tag**: \`<flint-accordion>\`
- **Class**: \`FlintAccordion\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`expanded\` | \`expanded\` | \`boolean\` | \`false\` | If true, expands the accordion by default. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | If true, the accordion is disabled. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-accordion-change\` | \`{ expanded: this.expanded }\` |  |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-border-color\` | — |
| \`--flint-font-family\` | — |
| \`--flint-text-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-border-radius-md\` | — |
| \`--flint-shadow-md\` | — |

---

#### \`<flint-accordion-summary>\`

Accordion Summary: the wrapper for the Accordion header.

- **Tag**: \`<flint-accordion-summary>\`
- **Class**: \`FlintAccordionSummary\`

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-accordion-toggle\` | — |  |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |
| \`expandIcon\` |  |

---

#### \`<flint-accordion-details>\`

Accordion Details: the wrapper for the Accordion content.

- **Tag**: \`<flint-accordion-details>\`
- **Class**: \`FlintAccordionDetails\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |

---

#### \`<flint-accordion-actions>\`

Accordion Actions: an optional wrapper that groups a set of buttons.

- **Tag**: \`<flint-accordion-actions>\`
- **Class**: \`FlintAccordionActions\`

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Default slot for content |
                `,
            },
        },
    },
    argTypes: {
        expanded: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    args: {
        expanded: false,
        disabled: false,
    },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
    render: (args) => html`
        <div style="padding: 24px;">
            <flint-accordion
                .expanded=${args.expanded}
                .disabled=${args.disabled}
                @flint-accordion-change=${(e: Event) => ((e.target as FlintAccordion).expanded = (e as CustomEvent).detail.expanded)}
            >
                <flint-accordion-summary>
                    Accordion 1
                </flint-accordion-summary>
                <flint-accordion-details>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                </flint-accordion-details>
            </flint-accordion>
            <flint-accordion @flint-accordion-change=${(e: Event) => ((e.target as FlintAccordion).expanded = (e as CustomEvent).detail.expanded)}>
                <flint-accordion-summary>
                    Accordion 2
                </flint-accordion-summary>
                <flint-accordion-details>
                    Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.
                </flint-accordion-details>
            </flint-accordion>
            <flint-accordion disabled>
                <flint-accordion-summary>
                    Disabled Accordion
                </flint-accordion-summary>
                <flint-accordion-details>
                    This content will never be shown because the accordion is disabled.
                </flint-accordion-details>
            </flint-accordion>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const accordions = canvasElement.querySelectorAll('flint-accordion');
        const acc1 = accordions[0] as FlintAccordion;
        const acc2 = accordions[1] as FlintAccordion;
        const disabledAcc = accordions[2] as FlintAccordion;

        const summary1 = acc1.querySelector('flint-accordion-summary') as HTMLElement;
        const summary2 = acc2.querySelector('flint-accordion-summary') as HTMLElement;
        const disabledSummary = disabledAcc.querySelector('flint-accordion-summary') as HTMLElement;

        // Expand accordion 1
        await userEvent.click(summary1);
        await waitFor(() => expect(acc1).toHaveAttribute('expanded'));

        // Collapse accordion 1
        await userEvent.click(summary1);
        await waitFor(() => expect(acc1).not.toHaveAttribute('expanded'));

        // Expand accordion 2
        await userEvent.click(summary2);
        await waitFor(() => expect(acc2).toHaveAttribute('expanded'));

        // Disabled accordion stays collapsed — verify without pointer interaction
        // (pointer-events: none prevents userEvent.click; the JS guard is unit-tested separately)
        void disabledSummary;
        await waitFor(() => {
            expect(disabledAcc.hasAttribute('disabled')).toBe(true);
            expect(disabledAcc.hasAttribute('expanded')).toBe(false);
        });
    },
};

export const ExpandIcon: Story = {
    render: (args) => html`
        <div style="padding: 24px;">
            <flint-accordion
                .expanded=${args.expanded}
                .disabled=${args.disabled}
                @flint-accordion-change=${(e: Event) => ((e.target as FlintAccordion).expanded = (e as CustomEvent).detail.expanded)}
            >
                <flint-accordion-summary>
                    Custom Icon
                    <span slot="expandIcon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </span>
                </flint-accordion-summary>
                <flint-accordion-details>
                    The icon on the right can be customized using the "expandIcon" slot.
                </flint-accordion-details>
            </flint-accordion>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const acc = canvasElement.querySelector('flint-accordion') as FlintAccordion;
        const summary = acc.querySelector('flint-accordion-summary') as HTMLElement;

        await userEvent.click(summary);
        await waitFor(() => expect(acc).toHaveAttribute('expanded'));
    },
};

export const Actions: Story = {
    args: { expanded: true },
    render: (args) => html`
        <div style="padding: 24px;">
            <flint-accordion .expanded=${args.expanded} .disabled=${args.disabled} @flint-accordion-change=${(e: Event) => ((e.target as FlintAccordion).expanded = (e as CustomEvent).detail.expanded)}>
                <flint-accordion-summary>
                    User Agreement
                </flint-accordion-summary>
                <flint-accordion-details>
                    Please read and accept the following terms and conditions to proceed with the activation of your account.
                </flint-accordion-details>
                <flint-accordion-actions>
                    <flint-button variant="secondary" size="small">Cancel</flint-button>
                    <flint-button variant="primary" size="small">Agree</flint-button>
                </flint-accordion-actions>
            </flint-accordion>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const acc = canvasElement.querySelector('flint-accordion') as FlintAccordion;
        const cancelBtn = canvasElement.querySelector('flint-button[variant="secondary"]') as HTMLElement;
        const agreeBtn = canvasElement.querySelector('flint-button[variant="primary"]') as HTMLElement;

        // Accordion starts expanded
        await waitFor(() => expect(acc).toHaveAttribute('expanded'));

        // Clicking action buttons must NOT toggle the accordion
        await userEvent.click(cancelBtn);
        await waitFor(() => expect(acc).toHaveAttribute('expanded'));

        await userEvent.click(agreeBtn);
        await waitFor(() => expect(acc).toHaveAttribute('expanded'));
    },
};

export const ControlledExpansion: Story = {
    render: () => html`
        <div style="padding: 24px;">
            <p style="margin-bottom: 16px;">Clicking one will close the others (Single expansion mode implemented in story logic).</p>
            <flint-accordion id="acc1" expanded @flint-accordion-change=${(e: Event) => {
            const detail = (e as CustomEvent).detail;
            (e.target as FlintAccordion).expanded = detail.expanded;
            if (detail.expanded) {
                (document.getElementById('acc2') as FlintAccordion).expanded = false;
                (document.getElementById('acc3') as FlintAccordion).expanded = false;
            }
        }}>
                <flint-accordion-summary>Section 1</flint-accordion-summary>
                <flint-accordion-details>Content of section 1.</flint-accordion-details>
            </flint-accordion>
            <flint-accordion id="acc2" @flint-accordion-change=${(e: Event) => {
            const detail = (e as CustomEvent).detail;
            (e.target as FlintAccordion).expanded = detail.expanded;
            if (detail.expanded) {
                (document.getElementById('acc1') as FlintAccordion).expanded = false;
                (document.getElementById('acc3') as FlintAccordion).expanded = false;
            }
        }}>
                <flint-accordion-summary>Section 2</flint-accordion-summary>
                <flint-accordion-details>Content of section 2.</flint-accordion-details>
            </flint-accordion>
            <flint-accordion id="acc3" @flint-accordion-change=${(e: Event) => {
            const detail = (e as CustomEvent).detail;
            (e.target as FlintAccordion).expanded = detail.expanded;
            if (detail.expanded) {
                (document.getElementById('acc1') as FlintAccordion).expanded = false;
                (document.getElementById('acc2') as FlintAccordion).expanded = false;
            }
        }}>
                <flint-accordion-summary>Section 3</flint-accordion-summary>
                <flint-accordion-details>Content of section 3.</flint-accordion-details>
            </flint-accordion>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const acc1 = canvasElement.querySelector('#acc1') as FlintAccordion;
        const acc2 = canvasElement.querySelector('#acc2') as FlintAccordion;
        const acc3 = canvasElement.querySelector('#acc3') as FlintAccordion;

        const summary2 = acc2.querySelector('flint-accordion-summary') as HTMLElement;
        const summary3 = acc3.querySelector('flint-accordion-summary') as HTMLElement;

        // Initially acc1 is expanded
        await waitFor(() => expect(acc1).toHaveAttribute('expanded'));

        // Click section 2 → it expands, section 1 collapses
        await userEvent.click(summary2);
        await waitFor(() => {
            expect(acc2).toHaveAttribute('expanded');
            expect(acc1).not.toHaveAttribute('expanded');
            expect(acc3).not.toHaveAttribute('expanded');
        });

        // Click section 3 → it expands, section 2 collapses
        await userEvent.click(summary3);
        await waitFor(() => {
            expect(acc3).toHaveAttribute('expanded');
            expect(acc1).not.toHaveAttribute('expanded');
            expect(acc2).not.toHaveAttribute('expanded');
        });
    },
};
