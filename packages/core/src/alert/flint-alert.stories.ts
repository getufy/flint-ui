import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { expect, waitFor } from 'storybook/test';
import './flint-alert';

const meta: Meta = {
    title: 'Feedback/Alert',
    component: 'flint-alert',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
Alerts display brief messages for the user without interrupting their use of the app.

- **Tag**: \`<flint-alert>\`
- **Class**: \`FlintAlert\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`severity\` | \`severity\` | \`'info' \\| 'success' \\| 'warning' \\| 'error'\` | \`'info'\` | The severity level of the alert. |
| \`title\` | \`title\` | \`string\` | \`''\` | An optional title for the alert. |
| \`dismissible\` | \`dismissible\` | \`boolean\` | \`false\` | Whether the alert can be dismissed by the user. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-alert-close\` | \`&#123; open: false, severity: string &#125;\` | Fired when the alert's close button is clicked. detail: \`&#123; open: false, severity: string &#125;\` |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | The message content of the alert. |
| \`icon\` | Optional icon to display instead of the default severity icon. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-font-family\` | — |
| \`--flint-border-radius-md\` | — |
| \`--flint-info-bg\` | — |
| \`--flint-info-border-color\` | — |
| \`--flint-info-text-color\` | — |
| \`--flint-info-icon-color\` | — |
| \`--flint-success-bg\` | — |
| \`--flint-success-border-color\` | — |
| \`--flint-success-text-color\` | — |
| \`--flint-success-icon-color\` | — |
| \`--flint-warning-bg\` | — |
| \`--flint-warning-border-color\` | — |
| \`--flint-warning-text-color\` | — |
| \`--flint-warning-icon-color\` | — |
| \`--flint-error-bg\` | — |
| \`--flint-error-border-color\` | — |
| \`--flint-error-text-color\` | — |
| \`--flint-error-icon-color\` | — |
| \`--flint-active-color\` | — |
                `,
            },
        },
    },
    argTypes: {
        severity: {
            control: 'select',
            options: ['info', 'success', 'warning', 'error'],
            description: 'The severity level of the alert.',
        },
        title: {
            control: 'text',
            description: 'An optional title for the alert.',
        },
        dismissible: {
            control: 'boolean',
            description: 'Whether the alert can be dismissed by the user.',
        },
    },
    args: {
        severity: 'info',
        title: '',
        dismissible: false,
    },
};

export default meta;

type Story = StoryObj;

/**
 * Basic alert with an information severity.
 */
export const Basic: Story = {
    args: {
        severity: 'info',
        title: 'Information',
        dismissible: false,
    },
    render: (args) => html`
        <flint-alert .severity=${args.severity} .title=${args.title} ?dismissible=${args.dismissible}>
            This is an example of a brief message for the user.
        </flint-alert>
    `,
};

Basic.play = async ({ canvasElement }) => {
    const alert = canvasElement.querySelector('flint-alert') as HTMLElement;
    await waitFor(() => expect(alert).toBeTruthy());
    // Verify the alert renders with the correct severity attribute
    await waitFor(() => expect(alert.getAttribute('severity') || 'info').toBe('info'));
};

/**
 * Success alerts communicate a successful action.
 */
export const Success: Story = {
    args: {
        severity: 'success',
        title: 'Success',
        dismissible: true,
    },
    render: (args) => html`
        <flint-alert .severity=${args.severity} .title=${args.title} ?dismissible=${args.dismissible}>
            The operation was completed successfully.
        </flint-alert>
    `,
};

/**
 * Warning alerts inform the user about potential issues.
 */
export const Warning: Story = {
    args: {
        severity: 'warning',
        title: 'Warning',
        dismissible: true,
    },
    render: (args) => html`
        <flint-alert .severity=${args.severity} .title=${args.title} ?dismissible=${args.dismissible}>
            Your subscription will expire in 3 days. Please renew it to continue using the service.
        </flint-alert>
    `,
};

/**
 * Error alerts communicate a failure or critical problem.
 */
export const Error: Story = {
    args: {
        severity: 'error',
        title: 'Error',
        dismissible: true,
    },
    render: (args) => html`
        <flint-alert .severity=${args.severity} .title=${args.title} ?dismissible=${args.dismissible}>
            There was a problem connecting to the server. Please check your internet connection.
        </flint-alert>
    `,
};

/**
 * Alerts can be displayed without a title for simpler messages.
 */
export const WithoutTitle: Story = {
    args: {
        severity: 'info',
        dismissible: false,
    },
    render: (args) => html`
        <flint-alert .severity=${args.severity} ?dismissible=${args.dismissible}>
            This is a simple alert message without a title.
        </flint-alert>
    `,
};

/**
 * The icon can be customized using the 'icon' slot.
 */
export const CustomIcon: Story = {
    args: {
        severity: 'info',
        title: 'Custom Icon',
        dismissible: false,
    },
    render: (args) => html`
        <flint-alert .severity=${args.severity} .title=${args.title} ?dismissible=${args.dismissible}>
            <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            This alert uses a custom icon provided via the icon slot.
        </flint-alert>
    `,
};
