import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-copy-button';

const meta: Meta = {
    title: 'Utilities/Copy Button',
    component: 'ui-copy-button',
    argTypes: {
        value: { control: 'text' },
        from: { control: 'text' },
        disabled: { control: 'boolean' },
        copyLabel: { control: 'text' },
        successLabel: { control: 'text' },
        errorLabel: { control: 'text' },
        feedbackDuration: { control: 'number' },
        tooltipPlacement: {
            control: 'select',
            options: ['top', 'right', 'bottom', 'left'],
        },
    },
    args: {
        value: 'Hello, World!',
        disabled: false,
        copyLabel: 'Copy',
        successLabel: 'Copied!',
        errorLabel: 'Error',
        feedbackDuration: 1000,
        tooltipPlacement: 'top',
    },
};

export default meta;
type Story = StoryObj;

/* ─── Playground ─────────────────────────────────────────── */
export const Playground: Story = {
    render: (args) => html`
        <ui-copy-button
            .value=${args.value}
            ?disabled=${args.disabled}
            copy-label=${args.copyLabel}
            success-label=${args.successLabel}
            error-label=${args.errorLabel}
            feedback-duration=${args.feedbackDuration}
            tooltip-placement=${args.tooltipPlacement}
            @ui-copy=${() => console.log('Copied!')}
            @ui-copy-error=${() => console.log('Copy error')}
        ></ui-copy-button>
    `,
};

/* ─── Default ────────────────────────────────────────────── */
export const Default: Story = {
    args: { value: 'Copy me!' },
    render: (args) => html`<ui-copy-button
        .value=${args.value}
        ?disabled=${args.disabled}
        copy-label=${args.copyLabel}
        success-label=${args.successLabel}
        error-label=${args.errorLabel}
        feedback-duration=${args.feedbackDuration}
        tooltip-placement=${args.tooltipPlacement}
    ></ui-copy-button>`,
};

/* ─── Custom Labels ──────────────────────────────────────── */
export const CustomLabels: Story = {
    render: () => html`
        <ui-copy-button
            value="Custom labels"
            copy-label="Click to copy"
            success-label="Done!"
            error-label="Failed!"
        ></ui-copy-button>
    `,
};

/* ─── Custom Icons ───────────────────────────────────────── */
export const CustomIcons: Story = {
    render: () => html`
        <ui-copy-button value="Custom icons">
            <span slot="copy-icon" style="font-size: 14px">&#128203;</span>
            <span slot="success-icon" style="font-size: 14px">&#9989;</span>
            <span slot="error-icon" style="font-size: 14px">&#10060;</span>
        </ui-copy-button>
    `,
};

/* ─── Copy From Element ──────────────────────────────────── */
export const CopyFromElement: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
                <strong>Copy text content:</strong>
                <span id="phone-number">+1 (234) 456-7890</span>
                <ui-copy-button from="phone-number"></ui-copy-button>
            </div>
            <div>
                <strong>Copy input value:</strong>
                <input id="my-input" type="text" value="Hello from input" />
                <ui-copy-button from="my-input.value"></ui-copy-button>
            </div>
            <div>
                <strong>Copy attribute:</strong>
                <a id="my-link" href="https://example.com">Example Link</a>
                <ui-copy-button from="my-link[href]"></ui-copy-button>
            </div>
        </div>
    `,
};

/* ─── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = {
    render: () => html`<ui-copy-button value="Can't copy" disabled></ui-copy-button>`,
};

/* ─── Tooltip Placement ──────────────────────────────────── */
export const TooltipPlacement: Story = {
    render: () => html`
        <div style="display: flex; gap: 32px; padding: 48px;">
            <ui-copy-button value="Top" tooltip-placement="top" copy-label="Top"></ui-copy-button>
            <ui-copy-button value="Right" tooltip-placement="right" copy-label="Right"></ui-copy-button>
            <ui-copy-button value="Bottom" tooltip-placement="bottom" copy-label="Bottom"></ui-copy-button>
            <ui-copy-button value="Left" tooltip-placement="left" copy-label="Left"></ui-copy-button>
        </div>
    `,
};

/* ─── Feedback Duration ──────────────────────────────────── */
export const FeedbackDuration: Story = {
    render: () => html`
        <div style="display: flex; gap: 16px; align-items: center;">
            <ui-copy-button value="Short" feedback-duration="500" copy-label="500ms"></ui-copy-button>
            <ui-copy-button value="Default" feedback-duration="1000" copy-label="1000ms"></ui-copy-button>
            <ui-copy-button value="Long" feedback-duration="3000" copy-label="3000ms"></ui-copy-button>
        </div>
    `,
};

/* ─── Inline Usage ───────────────────────────────────────── */
export const InlineUsage: Story = {
    render: () => html`
        <div style="display: flex; align-items: center; gap: 8px; padding: 12px; border: 1px solid var(--ui-border-color); border-radius: var(--ui-border-radius-md); font-family: monospace; font-size: 14px; background: var(--ui-surface-2);">
            <code>npm install storybook-lit</code>
            <ui-copy-button value="npm install storybook-lit"></ui-copy-button>
        </div>
    `,
};

/* ─── Error Handling ─────────────────────────────────────── */
export const ErrorHandling: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
                <strong>Empty value (triggers error):</strong>
                <ui-copy-button value=""></ui-copy-button>
            </div>
            <div>
                <strong>Invalid from reference (triggers error):</strong>
                <ui-copy-button from="nonexistent-id"></ui-copy-button>
            </div>
        </div>
    `,
};

/* ─── Keyboard Accessibility ────────────────────────────── */
export const KeyboardAccessibility: Story = {
    render: () => html`
        <div style="display: flex; gap: 16px; align-items: center; padding: 24px;">
            <span>Tab to focus, Enter/Space to copy:</span>
            <ui-copy-button value="Keyboard copied!" copy-label="Focus me"></ui-copy-button>
            <ui-copy-button value="Second" copy-label="Then me"></ui-copy-button>
            <ui-copy-button value="Disabled" copy-label="Skip me" disabled></ui-copy-button>
            <ui-copy-button value="Third" copy-label="And me"></ui-copy-button>
        </div>
    `,
};
