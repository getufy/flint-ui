import { Meta, StoryObj } from '@storybook/web-components';
import '../button/flint-button';
import { html } from 'lit';
import '../box/flint-box';
import './flint-textarea';
import '../button/flint-button';

const meta: Meta = {
    title: 'Inputs/Textarea',
    component: 'flint-textarea',
    parameters: {
        docs: {
            description: {
                component: `
A Textarea component for multi-line text input.

- **Tag**: \`<flint-textarea>\`
- **Class**: \`FlintTextarea\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`value\` | \`value\` | \`string\` | \`''\` | Current textarea value. |
| \`placeholder\` | \`placeholder\` | \`string\` | \`''\` | Placeholder text shown when empty. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the textarea and prevents interaction. |
| \`readonly\` | \`readonly\` | \`boolean\` | \`false\` | Makes the textarea read-only. |
| \`required\` | \`required\` | \`boolean\` | \`false\` | Marks the textarea as required for form validation. |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Whether the textarea is in an error state. |
| \`errorMessage\` | \`error-message\` | \`string\` | \`''\` | Error message displayed below the textarea. |
| \`helperText\` | \`helper-text\` | \`string\` | \`''\` | Help text displayed below the textarea. |
| \`label\` | \`label\` | \`string\` | \`''\` | Label text displayed above the textarea. |
| \`size\` | \`size\` | \`'sm' \\| 'md' \\| 'lg'\` | \`'default'\` | Size variant of the textarea. |
| \`rows\` | \`rows\` | \`number\` | \`3\` | Number of visible text rows. |
| \`maxlength\` | \`maxlength\` | \`number \\| undefined\` | \`undefined\` | Maximum number of characters allowed. |
| \`minlength\` | \`minlength\` | \`number \\| undefined\` | \`undefined\` | Minimum number of characters required. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name used when submitting form data. |
| \`autocomplete\` | \`autocomplete\` | \`string\` | \`''\` | Browser autocomplete hint. |
| \`resize\` | \`resize\` | \`'none' \\| 'both' \\| 'horizontal' \\| 'vertical' \\| 'auto'\` | \`'vertical'\` | Controls the resize handle. |
| \`defaultValue\` | \`default-value\` | \`string\` | \`''\` | Initial value for uncontrolled usage. |
| \`ariaLabel\` | \`aria-label\` | \`string \\| null\` | \`null\` | Accessible label for screen readers when no visible label is provided. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-textarea-input\` | \`&#123; value: string &#125;\` | Dispatched on every keystroke. Detail: \`&#123; value: string &#125;\` |
| \`flint-textarea-change\` | \`&#123; value: string &#125;\` | Dispatched on blur/change. Detail: \`&#123; value: string &#125;\` |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-textarea-min-height\` | \`80px\` |
| \`--flint-font-family\` | — |
| \`--flint-label-color\` | — |
| \`--flint-input-border-radius\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-input-bg\` | — |
| \`--flint-text-color\` | — |
| \`--flint-input-placeholder-color\` | — |
| \`--flint-input-border-hover-color\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-error-color\` | — |
| \`--flint-error-focus-ring\` | — |
| \`--flint-input-disabled-bg\` | — |
| \`--flint-input-disabled-color\` | — |
| \`--flint-input-readonly-bg\` | — |
| \`--flint-help-text-color\` | — |
                `,
            },
        },
    },
    argTypes: {
        value:        { control: 'text' },
        placeholder:  { control: 'text' },
        label:        { control: 'text' },
        helperText:     { control: 'text' },
        errorMessage: { control: 'text' },
        disabled:     { control: 'boolean' },
        readonly:     { control: 'boolean' },
        required:     { control: 'boolean' },
        error:        { control: 'boolean' },
        rows:         { control: 'number' },
        maxlength:    { control: 'number' },
        size:         { control: 'select', options: ['sm', 'md', 'lg'] },
        resize:       { control: 'select', options: ['none', 'both', 'horizontal', 'vertical', 'auto'] },
    },
    args: {
        placeholder: 'Type your message here.',
        label: 'Message',
        helperText: '',
        errorMessage: '',
        disabled: false,
        readonly: false,
        required: false,
        error: false,
        rows: 3,
        size: 'md',
        resize: 'vertical',
    },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
    render: (args) => html`
    <flint-textarea
      style="max-width: 400px;"
      placeholder=${args.placeholder}
      .label=${args.label}
      helper-text=${args.helperText}
      error-message=${args.errorMessage}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
      ?error=${args.error}
      rows=${args.rows}
      size=${args.size}
      resize=${args.resize}
      @flint-textarea-input=${(e: CustomEvent) => console.log('input:', e.detail)}
      @flint-textarea-change=${(e: CustomEvent) => console.log('change:', e.detail)}
    ></flint-textarea>
  `,
};

export const Default: Story = {
    render: () => html`
    <flint-textarea
      style="max-width: 400px;"
      placeholder="Type your message here."
    ></flint-textarea>
  `,
};

export const WithLabel: Story = {
    render: () => html`
    <flint-textarea
      style="max-width: 400px;"
      label="Message"
      placeholder="Type your message here."
    ></flint-textarea>
  `,
};

export const WithHelpText: Story = {
    render: () => html`
    <flint-textarea
      style="max-width: 400px;"
      label="Message"
      placeholder="Type your message here."
      helper-text="Enter your message below."
    ></flint-textarea>
  `,
};

export const Disabled: Story = {
    render: () => html`
    <flint-textarea
      style="max-width: 400px;"
      label="Message"
      placeholder="Type your message here."
      disabled
    ></flint-textarea>
  `,
};

export const Readonly: Story = {
    render: () => html`
    <flint-textarea
      style="max-width: 400px;"
      label="Notes"
      value="This content is read-only and cannot be edited."
      readonly
    ></flint-textarea>
  `,
};

export const Invalid: Story = {
    render: () => html`
    <flint-textarea
      style="max-width: 400px;"
      label="Message"
      placeholder="Type your message here."
      aria-invalid="true"
      error
      error-message="Please enter a valid message."
    ></flint-textarea>
  `,
};

export const Sizes: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #4b5563; margin: 0 0 6px 0;">size="sm"</p>
        <flint-textarea size="sm" placeholder="Small textarea"></flint-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #4b5563; margin: 0 0 6px 0;">size="md"</p>
        <flint-textarea size="md" placeholder="Default textarea"></flint-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #4b5563; margin: 0 0 6px 0;">size="lg"</p>
        <flint-textarea size="lg" placeholder="Large textarea"></flint-textarea>
      </div>
    </div>
  `,
};

export const Resize: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #4b5563; margin: 0 0 6px 0;">resize="none"</p>
        <flint-textarea resize="none" placeholder="Cannot be resized"></flint-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #4b5563; margin: 0 0 6px 0;">resize="vertical" (default)</p>
        <flint-textarea resize="vertical" placeholder="Resize vertically"></flint-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #4b5563; margin: 0 0 6px 0;">resize="horizontal"</p>
        <flint-textarea resize="horizontal" placeholder="Resize horizontally"></flint-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #4b5563; margin: 0 0 6px 0;">resize="both"</p>
        <flint-textarea resize="both" placeholder="Resize both ways"></flint-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #4b5563; margin: 0 0 6px 0;">resize="auto" (grows with content)</p>
        <flint-textarea resize="auto" placeholder="Type to expand..."></flint-textarea>
      </div>
    </div>
  `,
};

export const WithButton: Story = {
    render: () => html`
    <div style="display: grid; gap: 8px; max-width: 400px; font-family: system-ui;">
      <flint-textarea placeholder="Type your message here."></flint-textarea>
      <flint-button>Send message</flint-button>
    </div>
  `,
};

export const Controlled: Story = {
    render: () => {
        let value = '';
        return html`
      <div style="max-width: 400px; font-family: system-ui; display: flex; flex-direction: column; gap: 12px;">
        <p style="font-size: 14px; color: #4b5563; margin: 0;">
          State is controlled externally.
        </p>
        <flint-textarea
          id="ctrl-ta"
          label="Controlled"
          placeholder="Type something..."
          .value=${value}
          @flint-textarea-input=${(e: CustomEvent) => {
            value = e.detail.value;
            const ta = document.getElementById('ctrl-ta') as HTMLElement & { value: string };
            ta.value = value;
            const out = document.getElementById('ctrl-out');
            if (out) out.textContent = value || '(empty)';
        }}
        ></flint-textarea>
        <p style="font-size: 13px; margin: 0;">
          Current value: <strong id="ctrl-out">(empty)</strong>
        </p>
      </div>
    `;
    },
};

export const Uncontrolled: Story = {
    render: () => html`
    <div style="max-width: 400px; font-family: system-ui;">
      <p style="font-size: 14px; color: #4b5563; margin: 0 0 12px 0;">
        Uses <code>default-value</code> — starts pre-filled without controlling the prop.
      </p>
      <flint-textarea
        label="Notes"
        default-value="Pre-filled content from defaultValue."
      ></flint-textarea>
    </div>
  `,
};

export const FormUsage: Story = {
    render: () => {
        const handleSubmit = (e: Event) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const data = Object.fromEntries(new FormData(form));
            const output = form.querySelector<HTMLElement>('.form-output');
            if (output) output.textContent = JSON.stringify(data, null, 2);
        };
        return html`
      <form @submit=${handleSubmit} style="font-family: system-ui; max-width: 400px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <flint-textarea
            name="message"
            label="Your message"
            placeholder="Type your message here."
            required
            rows="4"
          ></flint-textarea>
          <flint-button type="submit">Submit</flint-button>
        </div>
        <flint-box
          as="pre"
          class="form-output"
          bgcolor="var(--flint-muted-background, #f9fafb)" p="12px" borderRadius="6px" border="1px solid #e5e7eb" style="margin-top: 12px; font-size: 12px; min-height: 40px;"
        ></flint-box>
      </form>
    `;
    },
};

export const RTL: Story = {
    render: () => html`
    <div dir="rtl" style="max-width: 400px; font-family: system-ui;">
      <flint-textarea
        dir="rtl"
        label="التعليقات"
        placeholder="تعليقاتك تساعدنا على التحسين..."
        helper-text="شاركنا أفكارك حول خدمتنا."
        rows="4"
      ></flint-textarea>
    </div>
  `,
};
