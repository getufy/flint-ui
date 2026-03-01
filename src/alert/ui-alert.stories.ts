import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-alert';

const meta: Meta = {
    title: 'Feedback/Alert',
    component: 'ui-alert',
    parameters: {
        docs: {
            description: {
                component: 'Alerts display brief messages for the user without interrupting their use of the app.',
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
        <ui-alert .severity=${args.severity} .title=${args.title} ?dismissible=${args.dismissible}>
            This is an example of a brief message for the user.
        </ui-alert>
    `,
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
        <ui-alert .severity=${args.severity} .title=${args.title} ?dismissible=${args.dismissible}>
            The operation was completed successfully.
        </ui-alert>
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
        <ui-alert .severity=${args.severity} .title=${args.title} ?dismissible=${args.dismissible}>
            Your subscription will expire in 3 days. Please renew it to continue using the service.
        </ui-alert>
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
        <ui-alert .severity=${args.severity} .title=${args.title} ?dismissible=${args.dismissible}>
            There was a problem connecting to the server. Please check your internet connection.
        </ui-alert>
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
        <ui-alert .severity=${args.severity} ?dismissible=${args.dismissible}>
            This is a simple alert message without a title.
        </ui-alert>
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
        <ui-alert .severity=${args.severity} .title=${args.title} ?dismissible=${args.dismissible}>
            <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            This alert uses a custom icon provided via the icon slot.
        </ui-alert>
    `,
};
