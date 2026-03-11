import { Meta, StoryObj } from '@storybook/web-components';
import '../button/ui-button';
import { html } from 'lit';
import '../box/ui-box';
import './ui-textarea';
import '../button/ui-button';

const meta: Meta = {
    title: 'Inputs/Textarea',
    component: 'ui-textarea',
    argTypes: {
        value:        { control: 'text' },
        placeholder:  { control: 'text' },
        label:        { control: 'text' },
        helpText:     { control: 'text' },
        errorMessage: { control: 'text' },
        disabled:     { control: 'boolean' },
        readonly:     { control: 'boolean' },
        required:     { control: 'boolean' },
        error:        { control: 'boolean' },
        rows:         { control: 'number' },
        maxlength:    { control: 'number' },
        size:         { control: 'select', options: ['sm', 'default', 'lg'] },
        resize:       { control: 'select', options: ['none', 'both', 'horizontal', 'vertical', 'auto'] },
    },
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
    args: {
        placeholder: 'Type your message here.',
        label: 'Message',
        helpText: '',
        errorMessage: '',
        disabled: false,
        readonly: false,
        required: false,
        error: false,
        rows: 3,
        size: 'default',
        resize: 'vertical',
    },
    render: (args) => html`
    <ui-textarea
      style="max-width: 400px;"
      placeholder=${args.placeholder}
      .label=${args.label}
      help-text=${args.helpText}
      error-message=${args.errorMessage}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      ?required=${args.required}
      ?error=${args.error}
      rows=${args.rows}
      size=${args.size}
      resize=${args.resize}
      @ui-textarea-input=${(e: CustomEvent) => console.log('input:', e.detail)}
      @ui-textarea-change=${(e: CustomEvent) => console.log('change:', e.detail)}
    ></ui-textarea>
  `,
};

export const Default: Story = {
    render: () => html`
    <ui-textarea
      style="max-width: 400px;"
      placeholder="Type your message here."
    ></ui-textarea>
  `,
};

export const WithLabel: Story = {
    render: () => html`
    <ui-textarea
      style="max-width: 400px;"
      label="Message"
      placeholder="Type your message here."
    ></ui-textarea>
  `,
};

export const WithHelpText: Story = {
    render: () => html`
    <ui-textarea
      style="max-width: 400px;"
      label="Message"
      placeholder="Type your message here."
      help-text="Enter your message below."
    ></ui-textarea>
  `,
};

export const Disabled: Story = {
    render: () => html`
    <ui-textarea
      style="max-width: 400px;"
      label="Message"
      placeholder="Type your message here."
      disabled
    ></ui-textarea>
  `,
};

export const Readonly: Story = {
    render: () => html`
    <ui-textarea
      style="max-width: 400px;"
      label="Notes"
      value="This content is read-only and cannot be edited."
      readonly
    ></ui-textarea>
  `,
};

export const Invalid: Story = {
    render: () => html`
    <ui-textarea
      style="max-width: 400px;"
      label="Message"
      placeholder="Type your message here."
      aria-invalid="true"
      error
      error-message="Please enter a valid message."
    ></ui-textarea>
  `,
};

export const Sizes: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #6b7280; margin: 0 0 6px 0;">size="sm"</p>
        <ui-textarea size="sm" placeholder="Small textarea"></ui-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #6b7280; margin: 0 0 6px 0;">size="default"</p>
        <ui-textarea size="default" placeholder="Default textarea"></ui-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #6b7280; margin: 0 0 6px 0;">size="lg"</p>
        <ui-textarea size="lg" placeholder="Large textarea"></ui-textarea>
      </div>
    </div>
  `,
};

export const Resize: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #6b7280; margin: 0 0 6px 0;">resize="none"</p>
        <ui-textarea resize="none" placeholder="Cannot be resized"></ui-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #6b7280; margin: 0 0 6px 0;">resize="vertical" (default)</p>
        <ui-textarea resize="vertical" placeholder="Resize vertically"></ui-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #6b7280; margin: 0 0 6px 0;">resize="horizontal"</p>
        <ui-textarea resize="horizontal" placeholder="Resize horizontally"></ui-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #6b7280; margin: 0 0 6px 0;">resize="both"</p>
        <ui-textarea resize="both" placeholder="Resize both ways"></ui-textarea>
      </div>
      <div>
        <p style="font-family: system-ui; font-size: 12px; color: #6b7280; margin: 0 0 6px 0;">resize="auto" (grows with content)</p>
        <ui-textarea resize="auto" placeholder="Type to expand..."></ui-textarea>
      </div>
    </div>
  `,
};

export const WithButton: Story = {
    render: () => html`
    <div style="display: grid; gap: 8px; max-width: 400px; font-family: system-ui;">
      <ui-textarea placeholder="Type your message here."></ui-textarea>
      <ui-button>Send message</ui-button>
    </div>
  `,
};

export const Controlled: Story = {
    render: () => {
        let value = '';
        return html`
      <div style="max-width: 400px; font-family: system-ui; display: flex; flex-direction: column; gap: 12px;">
        <p style="font-size: 14px; color: #6b7280; margin: 0;">
          State is controlled externally.
        </p>
        <ui-textarea
          id="ctrl-ta"
          label="Controlled"
          placeholder="Type something..."
          .value=${value}
          @ui-textarea-input=${(e: CustomEvent) => {
            value = e.detail.value;
            const ta = document.getElementById('ctrl-ta') as HTMLElement & { value: string };
            ta.value = value;
            const out = document.getElementById('ctrl-out');
            if (out) out.textContent = value || '(empty)';
        }}
        ></ui-textarea>
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
      <p style="font-size: 14px; color: #6b7280; margin: 0 0 12px 0;">
        Uses <code>default-value</code> — starts pre-filled without controlling the prop.
      </p>
      <ui-textarea
        label="Notes"
        default-value="Pre-filled content from defaultValue."
      ></ui-textarea>
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
          <ui-textarea
            name="message"
            label="Your message"
            placeholder="Type your message here."
            required
            rows="4"
          ></ui-textarea>
          <ui-button type="submit">Submit</ui-button>
        </div>
        <ui-box
          as="pre"
          class="form-output"
          bgcolor="var(--ui-muted-background, #f9fafb)" p="12px" borderRadius="6px" border="1px solid #e5e7eb" style="margin-top: 12px; font-size: 12px; min-height: 40px;"
        ></ui-box>
      </form>
    `;
    },
};

export const RTL: Story = {
    render: () => html`
    <div dir="rtl" style="max-width: 400px; font-family: system-ui;">
      <ui-textarea
        dir="rtl"
        label="التعليقات"
        placeholder="تعليقاتك تساعدنا على التحسين..."
        help-text="شاركنا أفكارك حول خدمتنا."
        rows="4"
      ></ui-textarea>
    </div>
  `,
};
