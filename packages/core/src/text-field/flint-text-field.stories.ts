import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-text-field';
import '../button/flint-button';

const meta: Meta = {
    title: 'Inputs/Text Field',
    component: 'flint-text-field',
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: false },
                    { id: 'label', enabled: false },
                ],
            },
        },
        docs: {
            description: {
                component: `
Text Field: a styled text input with outlined/filled variants.

- **Tag**: \`<flint-text-field>\`
- **Class**: \`FlintTextField\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`shadowRootOptions\` | \`shadowRootOptions\` | \`object\` | \`&#123; ...LitElement.shadowRootOptions, delegatesFocus: true &#125;\` |  |
| \`label\` | \`label\` | \`string\` | \`''\` | Label text displayed above the input. |
| \`value\` | \`value\` | \`string\` | \`''\` | Current value of the text field. |
| \`placeholder\` | \`placeholder\` | \`string\` | \`''\` | Placeholder text shown when the input is empty. |
| \`type\` | \`type\` | \`string\` | \`'text'\` | HTML input type (e.g. 'text', 'password', 'email'). |
| \`variant\` | \`variant\` | \`'outlined' \\| 'filled'\` | \`'outlined'\` | Visual style variant of the text field. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the text field is disabled. |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Whether the text field is in an error state. |
| \`helperText\` | \`helperText\` | \`string\` | \`''\` | Helper text displayed below the input. |
| \`errorMessage\` | \`errorMessage\` | \`string\` | \`''\` | Error message displayed below the input when in error state. |
| \`defaultValue\` | \`default-value\` | \`string\` | \`''\` | Initial value for uncontrolled usage. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name used when submitting form data. |
| \`required\` | \`required\` | \`boolean\` | \`false\` | Marks the input as required for form validation. |
| \`pattern\` | \`pattern\` | \`string\` | \`''\` | Regex pattern for validation. |
| \`min\` | \`min\` | \`string\` | \`''\` | Minimum value (for number/date inputs). |
| \`max\` | \`max\` | \`string\` | \`''\` | Maximum value (for number/date inputs). |
| \`minLength\` | \`minlength\` | \`number \\| undefined\` | — | Minimum length for text validation. |
| \`maxLength\` | \`maxlength\` | \`number \\| undefined\` | — | Maximum length for text validation. |
| \`readonly\` | \`readonly\` | \`boolean\` | \`false\` | Makes the input read-only. |
| \`clearable\` | \`clearable\` | \`boolean\` | \`false\` | Shows a clear button when the input has a value. |
| \`passwordToggle\` | \`password-toggle\` | \`boolean\` | \`false\` | Shows a toggle button on password inputs to reveal/hide the value. |
| \`passwordVisible\` | \`password-visible\` | \`boolean\` | \`false\` | Whether the password is currently visible. Only relevant when \`passwordToggle\` is true. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-text-field-input\` | \`&#123; value: string &#125;\` | Fired on each keystroke as the value changes. detail: \`&#123; value: string &#125;\` |
| \`flint-text-field-change\` | \`&#123; value: string &#125;\` | Fired when the input loses focus after the value has changed. detail: \`&#123; value: string &#125;\` |
| \`flint-text-field-clear\` | — | Fired when the clear button is clicked. detail: \`undefined\` |

#### Slots

| Name | Description |
|---|---|
| \`prefix\` | Content placed before the input (e.g. icon). |
| \`suffix\` | Content placed after the input (e.g. icon). |

#### CSS Parts

| Name | Description |
|---|---|
| \`prefix-icon\` | The prefix slot container. |
| \`suffix-icon\` | The suffix slot container. |
| \`clear-button\` | The clear button. |
| \`password-toggle-button\` | The password toggle button. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-text-field-margin-bottom\` | \`0\` |
| \`--flint-font-family\` | — |
| \`--flint-label-color\` | — |
| \`--flint-input-bg\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-input-border-radius\` | — |
| \`--flint-input-border-hover-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-error-color\` | — |
| \`--flint-error-focus-ring\` | — |
| \`--flint-input-disabled-bg\` | — |
| \`--flint-input-placeholder-color\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-text-color\` | — |
| \`--flint-help-text-color\` | — |
| \`--flint-surface-2\` | — |
| \`--flint-hover-color\` | — |
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        value: { control: 'text' },
        placeholder: { control: 'text' },
        type: { control: 'select', options: ['text', 'password', 'email', 'number', 'tel', 'url'] },
        variant: { control: 'select', options: ['outlined', 'filled'] },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
        helperText: { control: 'text' },
        errorMessage: { control: 'text' },
    },
    args: {
        label: 'Username',
        placeholder: 'Enter your username',
        variant: 'outlined',
        disabled: false,
        error: false,
    }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
        <flint-text-field
            .label=${args.label}
            .value=${args.value}
            .placeholder=${args.placeholder}
            .type=${args.type}
            .variant=${args.variant}
            ?disabled=${args.disabled}
            ?error=${args.error}
            .helperText=${args.helperText}
            .errorMessage=${args.errorMessage}
        ></flint-text-field>
    `
};

Default.play = async ({ canvasElement }) => {
    const textField = canvasElement.querySelector('flint-text-field') as HTMLElement & { value: string };
    const input = textField.shadowRoot!.querySelector('input') as HTMLInputElement;

    // Type text
    await userEvent.click(input);
    await userEvent.type(input, 'hello');
    await waitFor(() => expect(input.value).toBe('hello'));
};

export const Filled: Story = {
    args: {
        variant: 'filled',
        label: 'Email Address',
        placeholder: 'you@example.com',
        type: 'email',
        helperText: 'We will never share your email.'
    }
};

export const Password: Story = {
    args: {
        label: 'Password',
        placeholder: '••••••••',
        type: 'password',
        helperText: 'Must be at least 8 characters.'
    }
};

export const Error: Story = {
    args: {
        label: 'Phone Number',
        value: '123-abc',
        errorMessage: 'Invalid phone number format.'
    }
};

export const Icons: Story = {
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
            <flint-text-field label="Search">
                <span slot="prefix">🔍</span>
            </flint-text-field>
            
            <flint-text-field label="Price" type="number" value="19.99">
                <span slot="prefix">$</span>
                <span slot="suffix">USD</span>
            </flint-text-field>

            <flint-text-field label="Notifications" value="John Doe">
                <span slot="suffix">🔔</span>
            </flint-text-field>
        </div>
    `
};

export const FormMockup: Story = {
    render: () => html`
        <div style="max-width: 400px; padding: 2rem; background: var(--flint-surface-background); border-radius: 12px; box-shadow: var(--flint-shadow-lg); font-family: var(--flint-font-family);">
            <h2 style="margin-top: 0; margin-bottom: 1.5rem;">Create Account</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <flint-text-field label="First Name" placeholder="Jane"></flint-text-field>
                <flint-text-field label="Last Name" placeholder="Doe"></flint-text-field>
            </div>
            
            <flint-text-field label="Email" type="email" placeholder="jane@doe.com"></flint-text-field>
            
            <flint-text-field label="Password" type="password" placeholder="••••••••" helperText="Minimal 8 characters"></flint-text-field>
            
            <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
                <flint-button variant="primary" size="medium">Sign Up</flint-button>
            </div>
        </div>
    `
};

export const DefaultRTL: Story = {
    name: 'RTL',
    render: () => html`
        <div dir="rtl" style="text-align: right; max-width: 400px; padding: 2rem;">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <flint-text-field label="الاسم الكامل" placeholder="أدخل اسمك الكامل"></flint-text-field>
                <flint-text-field label="البريد الإلكتروني" type="email" placeholder="example@domain.com" variant="filled"></flint-text-field>
                <flint-text-field label="حقل خطأ" error errorMessage="هذا الحقل مطلوب"></flint-text-field>
            </div>
        </div>
    `,
};
