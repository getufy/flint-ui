import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-input';

const meta: Meta = {
    title: 'Inputs/Input',
    component: 'flint-input',
    parameters: {
        docs: {
            description: {
                component: `
- **Tag**: \`<flint-input>\`
- **Class**: \`FlintInput\`
- **Form Associated**: Yes

#### Properties

| Property | Attribute | Type | Default |
|---|---|---|---|
| \`label\` | \`label\` | \`string\` | \`''\` |
| \`value\` | \`value\` | \`string\` | \`''\` |
| \`type\` | \`type\` | \`string\` | \`'text'\` |
| \`placeholder\` | \`placeholder\` | \`string\` | \`''\` |
| \`helpText\` | \`help-text\` | \`string\` | \`''\` |
| \`error\` | \`error\` | \`boolean\` | \`false\` |
| \`errorMessage\` | \`error-message\` | \`string\` | \`''\` |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` |
| \`required\` | \`required\` | \`boolean\` | \`false\` |
| \`readonly\` | \`readonly\` | \`boolean\` | \`false\` |
| \`name\` | \`name\` | \`string\` | \`''\` |
| \`autocomplete\` | \`autocomplete\` | \`string\` | \`''\` |
| \`size\` | \`size\` | \`'sm' \\| 'default' \\| 'lg'\` | \`'default'\` |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-input-input\` | \`{ value: this.value }\` |  |
| \`flint-input-change\` | \`{ value: this.value }\` |  |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-input-border-radius\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-input-bg\` | — |
| \`--flint-input-placeholder-color\` | — |
| \`--flint-input-border-hover-color\` | — |
| \`--flint-input-disabled-bg\` | — |
| \`--flint-input-disabled-color\` | — |
| \`--flint-input-readonly-bg\` | — |
| \`--flint-font-family\` | — |
| \`--flint-label-color\` | — |
| \`--flint-text-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-error-color\` | — |
| \`--flint-error-focus-ring\` | — |
| \`--flint-help-text-color\` | — |

#### Methods

| Method | Description |
|---|---|
| \`inputElement(): HTMLInputElement\` |  |
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        value: { control: 'text' },
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number', 'search', 'url', 'tel', 'file', 'date', 'time'],
        },
        placeholder: { control: 'text' },
        helpText: { control: 'text' },
        error: { control: 'boolean' },
        errorMessage: { control: 'text' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        readonly: { control: 'boolean' },
        size: { control: 'select', options: ['sm', 'default', 'lg'] },
        name: { control: 'text' },
        autocomplete: { control: 'text' },
        onInput: { action: 'flint-input-input' },
        onChange: { action: 'flint-input-change' },
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
        required: false,
        readonly: false,
        size: 'default',
        name: '',
        autocomplete: '',
    },
    render: (args: Record<string, unknown>) => html`
    <div style="max-width: 300px; padding: 20px;">
      <flint-input
        .label=${args.label}
        .value=${args.value}
        .type=${args.type}
        .placeholder=${args.placeholder}
        .helpText=${args.helpText}
        .errorMessage=${args.errorMessage}
        .name=${args.name}
        .autocomplete=${args.autocomplete}
        .size=${args.size}
        ?error=${args.error}
        ?disabled=${args.disabled}
        ?required=${args.required}
        ?readonly=${args.readonly}
        @flint-input-input=${args.onInput}
        @flint-input-change=${args.onChange}
      ></flint-input>
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

export const Required: Story = {
    args: {
        label: 'Required Field',
        placeholder: 'This field is required',
        required: true,
        helpText: 'This field must be filled out.',
    },
};

export const Readonly: Story = {
    args: {
        label: 'Read Only',
        value: 'Read-only value',
        readonly: true,
        helpText: 'This field cannot be edited.',
    },
};

export const Password: Story = {
    args: {
        label: 'Password',
        type: 'password',
        placeholder: '••••••••',
        helpText: 'Must be at least 8 characters.',
    },
};

export const Email: Story = {
    args: {
        label: 'Email address',
        type: 'email',
        placeholder: 'name@example.com',
        autocomplete: 'email',
    },
};

export const Search: Story = {
    args: {
        label: 'Search',
        type: 'search',
        placeholder: 'Search...',
    },
};

export const FileInput: Story = {
    args: {
        label: 'Upload file',
        type: 'file',
        helpText: 'Select a file to upload.',
    },
};

export const SizeSm: Story = {
    name: 'Size: Small',
    args: {
        label: 'Small Input',
        size: 'sm',
        placeholder: 'Small size',
    },
};

export const SizeLg: Story = {
    name: 'Size: Large',
    args: {
        label: 'Large Input',
        size: 'lg',
        placeholder: 'Large size',
    },
};

export const AllSizes: Story = {
    name: 'All Sizes',
    render: () => html`
    <div style="max-width: 300px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
      <flint-input label="Small" size="sm" placeholder="Small"></flint-input>
      <flint-input label="Default" size="default" placeholder="Default"></flint-input>
      <flint-input label="Large" size="lg" placeholder="Large"></flint-input>
    </div>
  `,
};
