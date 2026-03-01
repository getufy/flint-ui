import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-input';

const meta: Meta = {
    title: 'Inputs/Input',
    component: 'ui-input',
    argTypes: {
        label: { control: 'text' },
        value: { control: 'text' },
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number'],
        },
        placeholder: { control: 'text' },
        helpText: { control: 'text' },
        error: { control: 'boolean' },
        errorMessage: { control: 'text' },
        disabled: { control: 'boolean' },
        onInput: { action: 'ui-input-input' },
        onChange: { action: 'ui-input-change' },
    },
    args: {
        label: 'Username',
        placeholder: 'Enter your username',
        type: 'text',
        value: '',
        helpText: '',
        error: false,
        errorMessage: '',
        disabled: false,
    },
    render: (args: Record<string, unknown>) => html`
    <div style="max-width: 300px; padding: 20px;">
      <ui-input
        .label=${args.label}
        .value=${args.value}
        .type=${args.type}
        .placeholder=${args.placeholder}
        .helpText=${args.helpText}
        .errorMessage=${args.errorMessage}
        ?error=${args.error}
        ?disabled=${args.disabled}
        @ui-input-input=${args.onInput}
        @ui-input-change=${args.onChange}
      ></ui-input>
    </div>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    args: {},
};

export const WithValue: Story = {
    args: {
        value: 'johndoe',
    },
};

export const WithHelpText: Story = {
    args: {
        helpText: 'We will never share your email with anyone else.',
    },
};

export const ErrorState: Story = {
    args: {
        label: 'Email address',
        value: 'invalidemail',
        error: true,
        errorMessage: 'Please enter a valid email address.',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        value: 'Cannot edit this',
    },
};
