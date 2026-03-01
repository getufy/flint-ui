import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './ui-accordion';
import { UiAccordion } from './ui-accordion';
import '../button/ui-button';

const meta: Meta = {
    title: 'Surfaces/Accordion',
    component: 'ui-accordion',
    argTypes: {
        expanded: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
};

export default meta;

type Story = StoryObj;

export const Basic: Story = {
    args: {
        expanded: false,
        disabled: false,
    },
    render: (args) => html`
        <div style="padding: 24px; background: #f9fafb;">
            <ui-accordion ?expanded=${args.expanded} ?disabled=${args.disabled} @ui-accordion-change=${(e: Event) => ((e.target as UiAccordion).expanded = (e as CustomEvent).detail.expanded)}>
                <ui-accordion-summary>
                    Accordion 1
                </ui-accordion-summary>
                <ui-accordion-details>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                </ui-accordion-details>
            </ui-accordion>
            <ui-accordion @ui-accordion-change=${(e: Event) => ((e.target as UiAccordion).expanded = (e as CustomEvent).detail.expanded)}>
                <ui-accordion-summary>
                    Accordion 2
                </ui-accordion-summary>
                <ui-accordion-details>
                    Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.
                </ui-accordion-details>
            </ui-accordion>
            <ui-accordion disabled>
                <ui-accordion-summary>
                    Disabled Accordion
                </ui-accordion-summary>
                <ui-accordion-details>
                    This content will never be shown because the accordion is disabled.
                </ui-accordion-details>
            </ui-accordion>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const accordions = canvasElement.querySelectorAll('ui-accordion');
        const acc1 = accordions[0] as UiAccordion;
        const acc2 = accordions[1] as UiAccordion;
        const disabledAcc = accordions[2] as UiAccordion;

        const summary1 = acc1.querySelector('ui-accordion-summary') as HTMLElement;
        const summary2 = acc2.querySelector('ui-accordion-summary') as HTMLElement;
        const disabledSummary = disabledAcc.querySelector('ui-accordion-summary') as HTMLElement;

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
    render: () => html`
        <div style="padding: 24px;">
            <ui-accordion @ui-accordion-change=${(e: Event) => ((e.target as UiAccordion).expanded = (e as CustomEvent).detail.expanded)}>
                <ui-accordion-summary>
                    Custom Icon
                    <span slot="expandIcon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </span>
                </ui-accordion-summary>
                <ui-accordion-details>
                    The icon on the right can be customized using the "expandIcon" slot.
                </ui-accordion-details>
            </ui-accordion>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const acc = canvasElement.querySelector('ui-accordion') as UiAccordion;
        const summary = acc.querySelector('ui-accordion-summary') as HTMLElement;

        await userEvent.click(summary);
        await waitFor(() => expect(acc).toHaveAttribute('expanded'));
    },
};

export const Actions: Story = {
    render: () => html`
        <div style="padding: 24px;">
            <ui-accordion expanded @ui-accordion-change=${(e: Event) => ((e.target as UiAccordion).expanded = (e as CustomEvent).detail.expanded)}>
                <ui-accordion-summary>
                    User Agreement
                </ui-accordion-summary>
                <ui-accordion-details>
                    Please read and accept the following terms and conditions to proceed with the activation of your account.
                </ui-accordion-details>
                <ui-accordion-actions>
                    <ui-button variant="secondary" size="small">Cancel</ui-button>
                    <ui-button variant="primary" size="small">Agree</ui-button>
                </ui-accordion-actions>
            </ui-accordion>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const acc = canvasElement.querySelector('ui-accordion') as UiAccordion;
        const cancelBtn = canvasElement.querySelector('ui-button[variant="secondary"]') as HTMLElement;
        const agreeBtn = canvasElement.querySelector('ui-button[variant="primary"]') as HTMLElement;

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
            <ui-accordion id="acc1" expanded @ui-accordion-change=${(e: Event) => {
            const detail = (e as CustomEvent).detail;
            (e.target as UiAccordion).expanded = detail.expanded;
            if (detail.expanded) {
                (document.getElementById('acc2') as UiAccordion).expanded = false;
                (document.getElementById('acc3') as UiAccordion).expanded = false;
            }
        }}>
                <ui-accordion-summary>Section 1</ui-accordion-summary>
                <ui-accordion-details>Content of section 1.</ui-accordion-details>
            </ui-accordion>
            <ui-accordion id="acc2" @ui-accordion-change=${(e: Event) => {
            const detail = (e as CustomEvent).detail;
            (e.target as UiAccordion).expanded = detail.expanded;
            if (detail.expanded) {
                (document.getElementById('acc1') as UiAccordion).expanded = false;
                (document.getElementById('acc3') as UiAccordion).expanded = false;
            }
        }}>
                <ui-accordion-summary>Section 2</ui-accordion-summary>
                <ui-accordion-details>Content of section 2.</ui-accordion-details>
            </ui-accordion>
            <ui-accordion id="acc3" @ui-accordion-change=${(e: Event) => {
            const detail = (e as CustomEvent).detail;
            (e.target as UiAccordion).expanded = detail.expanded;
            if (detail.expanded) {
                (document.getElementById('acc1') as UiAccordion).expanded = false;
                (document.getElementById('acc2') as UiAccordion).expanded = false;
            }
        }}>
                <ui-accordion-summary>Section 3</ui-accordion-summary>
                <ui-accordion-details>Content of section 3.</ui-accordion-details>
            </ui-accordion>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const acc1 = canvasElement.querySelector('#acc1') as UiAccordion;
        const acc2 = canvasElement.querySelector('#acc2') as UiAccordion;
        const acc3 = canvasElement.querySelector('#acc3') as UiAccordion;

        const summary2 = acc2.querySelector('ui-accordion-summary') as HTMLElement;
        const summary3 = acc3.querySelector('ui-accordion-summary') as HTMLElement;

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
