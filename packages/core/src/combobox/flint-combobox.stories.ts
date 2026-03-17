import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-combobox';
import type { ComboboxOption } from './flint-combobox';

const meta: Meta = {
    title: 'Inputs/Combobox',
    component: 'flint-combobox',
    parameters: {
        docs: {
            description: {
                component: `
Combobox: a free-text input with dropdown suggestions.

- **Tag**: \`<flint-combobox>\`
- **Class**: \`FlintCombobox\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`shadowRootOptions\` | \`shadowRootOptions\` | \`object\` | \`&#123; ...LitElement.shadowRootOptions, delegatesFocus: true &#125;\` |  |
| \`options\` | \`options\` | \`ComboboxOption[]\` | \`[]\` | The list of suggestion options. |
| \`value\` | \`value\` | \`string\` | \`''\` | The current text value. |
| \`placeholder\` | \`placeholder\` | \`string\` | \`''\` | Placeholder text shown when the input is empty. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the combobox is disabled. |
| \`required\` | \`required\` | \`boolean\` | \`false\` | Marks the combobox as required for form validation. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name used when submitting form data. |
| \`defaultValue\` | \`default-value\` | \`string\` | \`''\` | Initial value for uncontrolled usage. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-combobox-change\` | \`&#123; value: string &#125;\` | Fired when the value changes. detail: \`&#123; value: string &#125;\` |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The wrapper element. |
| \`input\` | The text input element. |
| \`listbox\` | The dropdown suggestions container. |
| \`option\` | An individual suggestion element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-combobox-dropdown-max-height\` | \`250px\` |
| \`--flint-combobox-z-index\` | \`1000\` |
| \`--flint-font-family\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-input-border-radius\` | — |
| \`--flint-text-color\` | — |
| \`--flint-input-bg\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-input-disabled-bg\` | — |
| \`--flint-text-color-subtle\` | — |
| \`--flint-surface-background\` | \`white\` |
| \`--flint-border-color\` | — |
| \`--flint-shadow-lg\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-primary-color-light\` | — |
| \`--flint-text-color-muted\` | — |
                `,
            },
        },
    },
    argTypes: {
        disabled: { control: 'boolean', description: 'Disable the input' },
        required: { control: 'boolean', description: 'Mark as required' },
        placeholder: { control: 'text' },
        value: { control: 'text', description: 'Current text value' },
    },
    args: {
        disabled: false,
        required: false,
        placeholder: 'Type to search...',
        value: '',
    },
};

export default meta;

type Story = StoryObj;

const programmingLanguages: ComboboxOption[] = [
    { label: 'TypeScript', value: 'typescript' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Rust', value: 'rust' },
    { label: 'Go', value: 'go' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'C#', value: 'csharp' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'Swift', value: 'swift' },
    { label: 'Kotlin', value: 'kotlin' },
    { label: 'PHP', value: 'php' },
];

const cardStyle = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);';
const headingStyle = 'margin-top: 0; margin-bottom: 16px; font-family: system-ui, sans-serif;';
const captionStyle = 'margin-top: 200px; color: #4b5563; font-family: system-ui, sans-serif; font-size: 14px;';

export const Default: Story = {
    render: (args: Record<string, unknown>) => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Combobox</h3>
      <flint-combobox
        .options=${programmingLanguages}
        .disabled=${args['disabled']}
        .required=${args['required']}
        placeholder=${args['placeholder']}
        style="width: 300px;"
        @flint-combobox-change=${(e: CustomEvent) => console.log('Changed:', e.detail)}
      ></flint-combobox>
      <p style=${captionStyle}>
        A free-text input that also suggests values from a predefined list.
      </p>
    </div>
  `,
};

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Search programming languages...',
    },
    render: (args: Record<string, unknown>) => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>With Placeholder</h3>
      <flint-combobox
        .options=${programmingLanguages}
        placeholder=${args['placeholder']}
        style="width: 300px;"
      ></flint-combobox>
      <p style=${captionStyle}>Custom placeholder text guides the user.</p>
    </div>
  `,
};

export const WithOptions: Story = {
    args: {
        value: 'typescript',
    },
    render: (args: Record<string, unknown>) => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Pre-populated Value</h3>
      <flint-combobox
        .options=${programmingLanguages}
        .value=${args['value'] as string}
        placeholder="Select a language"
        style="width: 300px;"
        @flint-combobox-change=${(e: CustomEvent) => console.log('Changed:', e.detail)}
      ></flint-combobox>
      <p style=${captionStyle}>
        The combobox is initialized with <code>value="typescript"</code>.
      </p>
    </div>
  `,
};

export const Disabled: Story = {
    args: {
        disabled: true,
        value: 'python',
    },
    render: (args: Record<string, unknown>) => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Disabled</h3>
      <flint-combobox
        .options=${programmingLanguages}
        .disabled=${args['disabled']}
        .value=${args['value'] as string}
        placeholder="Disabled input"
        style="width: 300px;"
      ></flint-combobox>
      <p style=${captionStyle}>
        The input is non-interactive when <code>disabled</code> is set.
      </p>
    </div>
  `,
};

export const Required: Story = {
    args: {
        required: true,
    },
    render: (args: Record<string, unknown>) => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Required</h3>
      <flint-combobox
        .options=${programmingLanguages}
        .required=${args['required']}
        placeholder="Required field"
        style="width: 300px;"
      ></flint-combobox>
      <p style=${captionStyle}>
        This combobox is marked as <code>required</code> for form validation.
      </p>
    </div>
  `,
};

export const KeyboardNavigation: Story = {
    render: () => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Keyboard Navigation</h3>
      <flint-combobox
        .options=${programmingLanguages}
        placeholder="Try keyboard nav..."
        style="width: 300px;"
        @flint-combobox-change=${(e: CustomEvent) => console.log('Changed:', e.detail)}
      ></flint-combobox>
      <p style="margin-top: 8px; font-family: system-ui; font-size: 12px; color: #4b5563;">
        Use <kbd>Arrow Down</kbd> / <kbd>Arrow Up</kbd> to navigate,
        <kbd>Enter</kbd> to select, <kbd>Escape</kbd> to close.
      </p>
    </div>
  `,
};

KeyboardNavigation.play = async ({ canvasElement }) => {
    const combobox = canvasElement.querySelector('flint-combobox') as HTMLElement & { value: string };
    const input = combobox.shadowRoot!.querySelector('input') as HTMLInputElement;

    // Focus to open dropdown
    await userEvent.click(input);

    // Verify dropdown is open
    await waitFor(() => {
        const options = combobox.shadowRoot!.querySelectorAll('[role="option"]');
        expect(options.length).toBeGreaterThan(0);
    });

    // Navigate down with ArrowDown
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');

    // Select with Enter
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(combobox.value).toBeTruthy());
};

export const FormIntegration: Story = {
    render: () => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Form Integration</h3>
      <form
        @submit=${(e: Event) => {
            e.preventDefault();
            const fd = new FormData(e.target as HTMLFormElement);
            const display = document.querySelector('#form-result');
            if (display) display.textContent = 'Submitted: ' + fd.get('language');
        }}
        @reset=${() => {
            const display = document.querySelector('#form-result');
            if (display) display.textContent = 'Form was reset.';
        }}
      >
        <label style="display: block; margin-bottom: 6px; font-family: system-ui; font-size: 14px; font-weight: 500;">
          Favorite Language
        </label>
        <flint-combobox
          .options=${programmingLanguages}
          name="language"
          default-value="typescript"
          placeholder="Pick a language"
          required
          style="width: 300px;"
        ></flint-combobox>
        <div style="margin-top: 12px; display: flex; gap: 8px;">
          <button type="submit" style="padding: 6px 16px; cursor: pointer;">Submit</button>
          <button type="reset" style="padding: 6px 16px; cursor: pointer;">Reset</button>
        </div>
      </form>
      <p id="form-result" style="margin-top: 8px; font-family: system-ui; font-size: 14px; color: #374151;">
        No submission yet.
      </p>
      <p style=${captionStyle}>
        Form-associated via <code>name</code> and <code>default-value</code> attributes.
        Reset restores the default value.
      </p>
    </div>
  `,
};
