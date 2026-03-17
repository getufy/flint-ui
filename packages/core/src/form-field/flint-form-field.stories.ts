import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-form-field';
import '../input/flint-input';
import '../select/flint-select';
import '../switch/flint-switch';
import '../checkbox/flint-checkbox';

const meta: Meta = {
    title: 'Inputs/FormField',
    component: 'flint-form-field',
    parameters: {
        docs: {
            description: {
                component: `
A form field wrapper that provides consistent layout (label + control +
helper text + error message) for any slotted form control.

- **Tag**: \`<flint-form-field>\`
- **Class**: \`FlintFormField\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`label\` | \`label\` | \`string\` | \`''\` | Field label text. |
| \`helperText\` | \`helper-text\` | \`string\` | \`''\` | Helper text displayed below the control. |
| \`errorMessage\` | \`error-message\` | \`string\` | \`''\` | Error message displayed when \`error\` is true. |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Whether the field is in an error state. |
| \`required\` | \`required\` | \`boolean\` | \`false\` | Shows a required indicator next to the label. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the field and its slotted control. |
| \`labelPosition\` | \`label-position\` | \`LabelPosition\` | \`'top'\` | Label placement relative to the control. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | The form control (e.g. FlintInput, FlintSelect, FlintCheckbox). |
| \`label\` | Custom label content (overrides the \`label\` prop). |
| \`helper-text\` | Custom helper text content (overrides the \`helper-text\` prop). |
| \`error-message\` | Custom error message content (overrides the \`error-message\` prop). |

#### CSS Parts

| Name | Description |
|---|---|
| \`label\` | The label element. |
| \`field\` | The control wrapper. |
| \`helper-text\` | The helper text element. |
| \`error-message\` | The error message element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-form-field-gap\` | \`6px\` |
| \`--flint-form-field-label-width\` | \`120px\` |
| \`--flint-form-field-label-font-size\` | \`0.875rem\` |
| \`--flint-form-field-label-font-weight\` | \`500\` |
| \`--flint-form-field-required-color\` | \`#dc2626\` |
| \`--flint-form-field-helper-font-size\` | \`0.75rem\` |
| \`--flint-form-field-error-font-size\` | \`0.75rem\` |
| \`--flint-form-field-error-color\` | \`#dc2626\` |
| \`--flint-font-family\` | \`system-ui, sans-serif\` |
| \`--flint-text-color\` | \`#111827\` |
| \`--flint-text-color-muted\` | \`#6b7280\` |
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        'helper-text': { control: 'text' },
        'error-message': { control: 'text' },
        error: { control: 'boolean' },
        required: { control: 'boolean' },
        disabled: { control: 'boolean' },
        'label-position': { control: 'select', options: ['top', 'start'] },
    },
    args: {
        label: 'Email Address',
        'helper-text': '',
        'error-message': '',
        error: false,
        required: false,
        disabled: false,
        'label-position': 'top',
    },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => html`
    <flint-form-field label="Email Address" helper-text="We will never share your email.">
      <flint-input placeholder="you@example.com"></flint-input>
    </flint-form-field>
  `,
};

export const WithSelect: Story = {
    render: () => html`
    <flint-form-field label="Country" helper-text="Select your country of residence.">
      <flint-select
        placeholder="Choose a country"
        .options=${[
            { label: 'United States', value: 'us' },
            { label: 'United Kingdom', value: 'uk' },
            { label: 'Canada', value: 'ca' },
            { label: 'Australia', value: 'au' },
        ]}
      ></flint-select>
    </flint-form-field>
  `,
};

export const ErrorState: Story = {
    render: () => html`
    <flint-form-field
      label="Email Address"
      error
      error-message="Please enter a valid email address."
    >
      <flint-input value="invalid-email" placeholder="you@example.com"></flint-input>
    </flint-form-field>
  `,
};

export const WithHelperText: Story = {
    render: () => html`
    <flint-form-field
      label="Password"
      helper-text="Must be at least 8 characters with one uppercase letter."
    >
      <flint-input type="password" placeholder="Enter your password"></flint-input>
    </flint-form-field>
  `,
};

export const Required: Story = {
    render: () => html`
    <flint-form-field label="Full Name" required helper-text="Enter your legal name.">
      <flint-input placeholder="John Doe"></flint-input>
    </flint-form-field>
  `,
};

export const HorizontalLabel: Story = {
    render: () => html`
    <div style="max-width: 500px; display: flex; flex-direction: column; gap: 16px;">
      <flint-form-field label="First Name" label-position="start" required>
        <flint-input placeholder="John"></flint-input>
      </flint-form-field>
      <flint-form-field label="Last Name" label-position="start" required>
        <flint-input placeholder="Doe"></flint-input>
      </flint-form-field>
      <flint-form-field label="Email" label-position="start" helper-text="We will never share your email.">
        <flint-input placeholder="john@example.com"></flint-input>
      </flint-form-field>
    </div>
  `,
};

export const Disabled: Story = {
    render: () => html`
    <flint-form-field label="Username" disabled helper-text="This field cannot be edited.">
      <flint-input value="admin" placeholder="Enter username"></flint-input>
    </flint-form-field>
  `,
    parameters: {
        a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
    },
};

export const FormLayout: Story = {
    render: () => html`
    <form style="max-width: 400px; display: flex; flex-direction: column; gap: 20px; font-family: system-ui;">
      <flint-form-field label="Full Name" required>
        <flint-input placeholder="John Doe"></flint-input>
      </flint-form-field>
      <flint-form-field label="Email" required helper-text="We will never share your email.">
        <flint-input type="email" placeholder="you@example.com"></flint-input>
      </flint-form-field>
      <flint-form-field label="Password" required helper-text="Must be at least 8 characters.">
        <flint-input type="password" placeholder="Enter password"></flint-input>
      </flint-form-field>
      <flint-form-field label="Country">
        <flint-select
          placeholder="Choose a country"
          .options=${[
              { label: 'United States', value: 'us' },
              { label: 'United Kingdom', value: 'uk' },
              { label: 'Canada', value: 'ca' },
          ]}
        ></flint-select>
      </flint-form-field>
      <flint-form-field label="Terms" error error-message="You must accept the terms.">
        <flint-checkbox>I agree to the Terms of Service</flint-checkbox>
      </flint-form-field>
    </form>
  `,
};
