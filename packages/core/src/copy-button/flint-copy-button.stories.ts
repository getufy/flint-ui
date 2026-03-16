import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-copy-button';

const meta: Meta = {
    title: 'Utilities/Copy Button',
    component: 'flint-copy-button',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'button-name', enabled: false },
                    { id: 'label', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
Copy Button: copies text to the clipboard with visual feedback.

- **Tag**: \`<flint-copy-button>\`
- **Class**: \`FlintCopyButton\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | The text value to copy. |
| \`from\` | \`from\` | \`string\` | \`''\` | An id referencing another element to copy from. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the copy button. |
| \`copyLabel\` | \`copy-label\` | \`string\` | \`'Copy'\` | Label shown in the tooltip (idle state). |
| \`successLabel\` | \`success-label\` | \`string\` | \`'Copied!'\` | Label shown in the tooltip after successful copy. |
| \`errorLabel\` | \`error-label\` | \`string\` | \`'Error'\` | Label shown in the tooltip on copy error. |
| \`feedbackDuration\` | \`feedback-duration\` | \`number\` | \`1000\` | Duration (ms) to show feedback before returning to idle. |
| \`tooltipPlacement\` | \`tooltip-placement\` | \`'top' \\| 'right' \\| 'bottom' \\| 'left'\` | \`'top'\` | Tooltip placement. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-copy-error\` | — | Fired when the copy operation fails. |
| \`flint-copy\` | — | Fired after a successful copy operation. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-copy-button-size\` | — |
| \`--flint-copy-button-icon-size\` | — |
| \`--flint-copy-button-success-color\` | \`var(--flint-success-color\` |
| \`--flint-copy-button-error-color\` | \`var(--flint-error-color\` |
| \`--flint-font-family\` | — |
| \`--flint-border-color\` | — |
| \`--flint-border-radius-md\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-text-color\` | — |
| \`--flint-active-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-border-radius-sm\` | — |
| \`--flint-tooltip-bg\` | — |
| \`--flint-tooltip-text-color\` | — |
                `,
            },
        },
    },
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
        <flint-copy-button
            .value=${args.value}
            ?disabled=${args.disabled}
            copy-label=${args.copyLabel}
            success-label=${args.successLabel}
            error-label=${args.errorLabel}
            feedback-duration=${args.feedbackDuration}
            tooltip-placement=${args.tooltipPlacement}
            @flint-copy=${() => console.log('Copied!')}
            @flint-copy-error=${() => console.log('Copy error')}
        ></flint-copy-button>
    `,
};

/* ─── Default ────────────────────────────────────────────── */
export const Default: Story = {
    args: { value: 'Copy me!' },
    render: (args) => html`<flint-copy-button
        .value=${args.value}
        ?disabled=${args.disabled}
        copy-label=${args.copyLabel}
        success-label=${args.successLabel}
        error-label=${args.errorLabel}
        feedback-duration=${args.feedbackDuration}
        tooltip-placement=${args.tooltipPlacement}
    ></flint-copy-button>`,
};

Default.play = async ({ canvasElement }) => {
    const copyBtn = canvasElement.querySelector('flint-copy-button') as HTMLElement;
    await waitFor(() => expect(copyBtn).toBeTruthy());

    // Click the copy button
    const button = copyBtn.shadowRoot!.querySelector('button') as HTMLButtonElement;
    if (button) {
        await userEvent.click(button);
    }
};

/* ─── Custom Labels ──────────────────────────────────────── */
export const CustomLabels: Story = {
    render: () => html`
        <flint-copy-button
            value="Custom labels"
            copy-label="Click to copy"
            success-label="Done!"
            error-label="Failed!"
        ></flint-copy-button>
    `,
};

/* ─── Custom Icons ───────────────────────────────────────── */
export const CustomIcons: Story = {
    render: () => html`
        <flint-copy-button value="Custom icons">
            <span slot="copy-icon" style="font-size: 14px">&#128203;</span>
            <span slot="success-icon" style="font-size: 14px">&#9989;</span>
            <span slot="error-icon" style="font-size: 14px">&#10060;</span>
        </flint-copy-button>
    `,
};

/* ─── Copy From Element ──────────────────────────────────── */
export const CopyFromElement: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
                <strong>Copy text content:</strong>
                <span id="phone-number">+1 (234) 456-7890</span>
                <flint-copy-button from="phone-number"></flint-copy-button>
            </div>
            <div>
                <strong>Copy input value:</strong>
                <input id="my-input" type="text" value="Hello from input" />
                <flint-copy-button from="my-input.value"></flint-copy-button>
            </div>
            <div>
                <strong>Copy attribute:</strong>
                <a id="my-link" href="https://example.com">Example Link</a>
                <flint-copy-button from="my-link[href]"></flint-copy-button>
            </div>
        </div>
    `,
};

/* ─── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = {
    render: () => html`<flint-copy-button value="Can't copy" disabled></flint-copy-button>`,
};

/* ─── Tooltip Placement ──────────────────────────────────── */
export const TooltipPlacement: Story = {
    render: () => html`
        <div style="display: flex; gap: 32px; padding: 48px;">
            <flint-copy-button value="Top" tooltip-placement="top" copy-label="Top"></flint-copy-button>
            <flint-copy-button value="Right" tooltip-placement="right" copy-label="Right"></flint-copy-button>
            <flint-copy-button value="Bottom" tooltip-placement="bottom" copy-label="Bottom"></flint-copy-button>
            <flint-copy-button value="Left" tooltip-placement="left" copy-label="Left"></flint-copy-button>
        </div>
    `,
};

/* ─── Feedback Duration ──────────────────────────────────── */
export const FeedbackDuration: Story = {
    render: () => html`
        <div style="display: flex; gap: 16px; align-items: center;">
            <flint-copy-button value="Short" feedback-duration="500" copy-label="500ms"></flint-copy-button>
            <flint-copy-button value="Default" feedback-duration="1000" copy-label="1000ms"></flint-copy-button>
            <flint-copy-button value="Long" feedback-duration="3000" copy-label="3000ms"></flint-copy-button>
        </div>
    `,
};

/* ─── Inline Usage ───────────────────────────────────────── */
export const InlineUsage: Story = {
    render: () => html`
        <div style="display: flex; align-items: center; gap: 8px; padding: 12px; border: 1px solid var(--flint-border-color); border-radius: var(--flint-border-radius-md); font-family: monospace; font-size: 14px; background: var(--flint-surface-2);">
            <code>npm install flint-ui</code>
            <flint-copy-button value="npm install flint-ui"></flint-copy-button>
        </div>
    `,
};

/* ─── Error Handling ─────────────────────────────────────── */
export const ErrorHandling: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
                <strong>Empty value (triggers error):</strong>
                <flint-copy-button value=""></flint-copy-button>
            </div>
            <div>
                <strong>Invalid from reference (triggers error):</strong>
                <flint-copy-button from="nonexistent-id"></flint-copy-button>
            </div>
        </div>
    `,
};

/* ─── Keyboard Accessibility ────────────────────────────── */
export const KeyboardAccessibility: Story = {
    render: () => html`
        <div style="display: flex; gap: 16px; align-items: center; padding: 24px;">
            <span>Tab to focus, Enter/Space to copy:</span>
            <flint-copy-button value="Keyboard copied!" copy-label="Focus me"></flint-copy-button>
            <flint-copy-button value="Second" copy-label="Then me"></flint-copy-button>
            <flint-copy-button value="Disabled" copy-label="Skip me" disabled></flint-copy-button>
            <flint-copy-button value="Third" copy-label="And me"></flint-copy-button>
        </div>
    `,
};
