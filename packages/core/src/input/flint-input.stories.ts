import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-input';

const meta: Meta = {
    title: 'Inputs/Input',
    component: 'flint-input',
    parameters: {
        docs: {
            description: {
                component: `
Input: a styled text input with label, help text, and error states.

- **Tag**: \`<flint-input>\`
- **Class**: \`FlintInput\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`label\` | \`label\` | \`string\` | \`''\` | Label text displayed above the input. |
| \`value\` | \`value\` | \`string\` | \`''\` | Current input value. |
| \`type\` | \`type\` | \`string\` | \`'text'\` | HTML input type (text, email, password, etc.). |
| \`placeholder\` | \`placeholder\` | \`string\` | \`''\` | Placeholder text shown when the input is empty. |
| \`helperText\` | \`helper-text\` | \`string\` | \`''\` | Help text displayed below the input. |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Whether the input is in an error state. |
| \`errorMessage\` | \`error-message\` | \`string\` | \`''\` | Error message displayed below the input. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the input and prevents interaction. |
| \`required\` | \`required\` | \`boolean\` | \`false\` | Marks the input as required for form validation. |
| \`readonly\` | \`readonly\` | \`boolean\` | \`false\` | Makes the input read-only. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name used when submitting form data. |
| \`autocomplete\` | \`autocomplete\` | \`string\` | \`''\` | Browser autocomplete hint. |
| \`size\` | \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'default'\` | 'sm' \\| 'md' \\| 'lg' |
| \`defaultValue\` | \`default-value\` | \`string \\| undefined\` | — | Initial value for uncontrolled usage. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-input-input\` | — | Fired on each keystroke as the value changes. |
| \`flint-input-change\` | — | Fired when the input loses focus after the value has changed. |

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
        helperText: { control: 'text' },
        error: { control: 'boolean' },
        errorMessage: { control: 'text' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
        readonly: { control: 'boolean' },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
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
        helperText: '',
        error: false,
        errorMessage: '',
        disabled: false,
        required: false,
        readonly: false,
        size: 'md',
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
        .helperText=${args.helperText}
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

Default.play = async ({ canvasElement }) => {
    const input = canvasElement.querySelector('flint-input') as HTMLElement & { value: string };
    const nativeInput = input.shadowRoot!.querySelector('input') as HTMLInputElement;

    // Initially empty
    await waitFor(() => expect(input.value).toBe(''));

    // Type text
    await userEvent.click(nativeInput);
    await userEvent.type(nativeInput, 'hello world');
    await waitFor(() => expect(input.value).toBe('hello world'));

    // Clear and type new text
    await userEvent.clear(nativeInput);
    await userEvent.type(nativeInput, 'new text');
    await waitFor(() => expect(input.value).toBe('new text'));
};

export const WithValue: Story = {
    args: {
        value: 'johndoe',
    },
};

export const WithHelpText: Story = {
    args: {
        helperText: 'We will never share your email with anyone else.',
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
        helperText: 'This field must be filled out.',
    },
};

export const Readonly: Story = {
    args: {
        label: 'Read Only',
        value: 'Read-only value',
        readonly: true,
        helperText: 'This field cannot be edited.',
    },
};

export const Password: Story = {
    args: {
        label: 'Password',
        type: 'password',
        placeholder: '••••••••',
        helperText: 'Must be at least 8 characters.',
    },
};

export const PasswordWithToggle: Story = {
    name: 'Password Toggle',
    render: () => html`
    <div style="max-width: 300px; padding: 20px;">
      <flint-input
        label="Password"
        type="password"
        password-toggle
        placeholder="Enter your password"
        helper-text="Click the eye icon to toggle visibility."
      ></flint-input>
    </div>
  `,
};

export const Clearable: Story = {
    name: 'Clearable',
    render: () => html`
    <div style="max-width: 300px; padding: 20px;">
      <flint-input
        label="Search"
        clearable
        value="Some text to clear"
        helper-text="Click the X icon to clear."
      ></flint-input>
    </div>
  `,
};

export const PrefixSuffix: Story = {
    name: 'Prefix & Suffix',
    render: () => html`
    <div style="max-width: 300px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
      <flint-input label="Website">
        <span slot="prefix" style="font-size: 14px; color: #6b7280;">https://</span>
        <span slot="suffix" style="font-size: 14px; color: #6b7280;">.com</span>
      </flint-input>
      <flint-input label="Email">
        <span slot="prefix" style="font-size: 14px;">@</span>
      </flint-input>
      <flint-input label="Price">
        <span slot="prefix" style="font-size: 14px;">$</span>
        <span slot="suffix" style="font-size: 12px; color: #6b7280;">USD</span>
      </flint-input>
    </div>
  `,
};

export const AllFeatures: Story = {
    name: 'All UX Features',
    render: () => html`
    <div style="max-width: 300px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
      <flint-input label="Clearable" clearable value="Clear me" helper-text="Has a clear button."></flint-input>
      <flint-input label="Password Toggle" type="password" password-toggle value="secret" helper-text="Toggle visibility."></flint-input>
      <flint-input label="With Prefix" placeholder="Search...">
        <span slot="prefix" style="font-size: 14px;">🔍</span>
      </flint-input>
      <flint-input label="With Suffix" placeholder="0.00">
        <span slot="suffix" style="font-size: 12px; color: #6b7280;">kg</span>
      </flint-input>
      <flint-input label="Clearable + Password Toggle" type="password" clearable password-toggle value="combo" helper-text="Both features together."></flint-input>
    </div>
  `,
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
        helperText: 'Select a file to upload.',
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
      <flint-input label="Default" size="md" placeholder="Default"></flint-input>
      <flint-input label="Large" size="lg" placeholder="Large"></flint-input>
    </div>
  `,
};

export const DefaultRTL: Story = {
    name: 'RTL',
    render: () => html`
    <div dir="rtl" style="text-align: right; max-width: 300px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
      <flint-input label="اسم المستخدم" placeholder="أدخل اسم المستخدم" helper-text="سيتم عرض هذا الاسم للآخرين."></flint-input>
      <flint-input label="البريد الإلكتروني" type="email" placeholder="example@domain.com" error error-message="يرجى إدخال بريد إلكتروني صالح."></flint-input>
      <flint-input label="حقل مطلوب" placeholder="هذا الحقل مطلوب" required></flint-input>
    </div>
  `,
};
