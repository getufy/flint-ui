import { Meta, StoryObj } from '@storybook/web-components';
import '../button/flint-button';
import { html } from 'lit';
import { userEvent, expect, waitFor } from 'storybook/test';
import './flint-select';
import '../button/flint-button';

const meta: Meta = {
  title: 'Inputs/Select',
  component: 'flint-select',
  parameters: {
      a11y: {
          config: {
              rules: [
                  { id: 'color-contrast', enabled: false },
                  { id: 'aria-required-attr', enabled: false },
                  { id: 'aria-required-children', enabled: false },
                  { id: 'aria-input-field-name', enabled: false },
                  { id: 'select-name', enabled: false },
              ],
          },
      },
      docs: {
            description: {
                component: `
A select component for choosing one or multiple options from a list.

- **Tag**: \`<flint-select>\`
- **Class**: \`FlintSelect\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`shadowRootOptions\` | \`shadowRootOptions\` | \`object\` | \`&#123; ...LitElement.shadowRootOptions, delegatesFocus: true &#125;\` |  |
| \`dependencies\` | \`dependencies\` | \`Record&lt;string, typeof FlintElement&gt;\` | \`&#123; 'flint-popup': FlintPopup, 'flint-tooltip': FlintTooltip, &#125;\` |  |
| \`label\` | \`label\` | \`string\` | \`''\` | Label text displayed above the select. |
| \`options\` | \`options\` | \`SelectOption[]\` | \`[]\` | Array of selectable options. |
| \`value\` | \`value\` | \`string \\| string[]\` | \`[]\` | Current value (controlled). When set, the component reflects this value and does not manage its own state. Accepts a single string or an array of strings. |
| \`multiple\` | \`multiple\` | \`boolean\` | \`false\` | Allow multiple selections. |
| \`placeholder\` | \`placeholder\` | \`string\` | \`''\` | Placeholder text when no value is selected. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Disables the select and prevents interaction. |
| \`readonly\` | \`readonly\` | \`boolean\` | \`false\` | Makes the select read-only. |
| \`required\` | \`required\` | \`boolean\` | \`false\` | Marks the select as required for form validation. |
| \`error\` | \`error\` | \`boolean\` | \`false\` | Whether the select is in an error state. |
| \`errorMessage\` | \`error-message\` | \`string\` | \`''\` | Error message displayed below the select. |
| \`name\` | \`name\` | \`string\` | \`''\` | Form field name used when submitting form data. |
| \`size\` | \`size\` | \`SelectSize\` | \`'md'\` | Size variant of the select. |
| \`defaultValue\` | \`default-value\` | \`string\` | \`''\` | Initial value (uncontrolled). Only used on first render; ignored after mount. Single-select only. |
| \`hoist\` | \`hoist\` | \`boolean\` | \`true\` | When true, the dropdown uses \`position: fixed\` so it can escape |
| \`loadOptions\` | \`loadOptions\` | \`((searchTerm?: string) =&gt; Promise&lt;SelectOption[]&gt;) \\| null\` | \`null\` | Async options loader. When provided, called when the dropdown opens. |
| \`clearable\` | \`clearable\` | \`boolean\` | \`false\` | When true, shows a clear button in the trigger when a value is selected. |
| \`searchable\` | \`searchable\` | \`boolean\` | \`false\` | When true, adds a text input for filtering options by label. |
| \`maxTagsVisible\` | \`max-tags-visible\` | \`string\` | \`Infinity\` | Maximum number of chips visible in multi-select mode. |
| \`virtualize\` | \`virtualize\` | \`boolean\` | \`false\` | Enable virtual scrolling for large option lists. |
| \`itemHeight\` | \`item-height\` | \`number\` | \`36\` | Fixed item height in px used for virtual scroll calculations. |
| \`visibleItems\` | \`visible-items\` | \`number\` | \`8\` | Maximum visible items in the dropdown (determines dropdown height). |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-select-change\` | — | Dispatched when the selection changes. detail: \`&#123; value: string, multiple: false &#125; \\| &#123; value: string[], multiple: true &#125;\` |
| \`flint-clear\` | — | Dispatched when the clear button is clicked. |

#### Slots

| Name | Description |
|---|---|
| \`icon\` | Optional icon shown at the start of the trigger. |
| \`error-message\` | Optional slot for error message content (use error-message prop for simple text). |

#### CSS Parts

| Name | Description |
|---|---|
| \`label\` | The \`&lt;label&gt;\` element. |
| \`trigger\` | The combobox trigger container. |
| \`placeholder\` | The placeholder text \`&lt;span&gt;\`. |
| \`chip\` | A selected-value chip (multiple mode). |
| \`chip-overflow\` | The "+N more" overflow chip (multiple mode). |
| \`clear-button\` | The clear button (when clearable). |
| \`search-input\` | The search input (when searchable). |
| \`dropdown\` | The dropdown listbox container. |
| \`option\` | An individual option element. |
| \`error-message\` | The error message \`&lt;span&gt;\`. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-select-bg\` | — |
| \`--flint-select-border\` | — |
| \`--flint-select-radius\` | — |
| \`--flint-select-focus-color\` | — |
| \`--flint-select-error-color\` | — |
| \`--flint-select-chip-bg\` | — |
| \`--flint-select-chip-color\` | — |
| \`--flint-select-chip-radius\` | — |
| \`--flint-select-z-index\` | \`1000\` |
| \`--flint-select-option-hover-bg\` | — |
| \`--flint-select-option-selected-bg\` | — |
| \`--flint-select-option-selected-color\` | — |
| \`--flint-input-bg\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-input-border-radius\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-error-color\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-primary-color-light\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-font-family\` | — |
| \`--flint-label-color\` | — |
| \`--flint-input-border-hover-color\` | — |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-error-focus-ring\` | — |
| \`--flint-input-disabled-bg\` | — |
| \`--flint-input-readonly-bg\` | — |
| \`--flint-input-placeholder-color\` | — |
| \`--flint-text-color\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-shadow-lg\` | — |
| \`--flint-border-color\` | — |
                `,
            },
        },
  },
  argTypes: {
    label:        { control: 'text' },
    placeholder:  { control: 'text' },
    multiple:     { control: 'boolean' },
    disabled:     { control: 'boolean' },
    readonly:     { control: 'boolean' },
    required:     { control: 'boolean' },
    error:        { control: 'boolean' },
    errorMessage: { control: 'text' },
    size:         { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    label:        'Favorite Fruit',
    placeholder:  'Pick a fruit',
    multiple:     false,
    disabled:     false,
    readonly:     false,
    required:     false,
    error:        false,
    errorMessage: '',
    size:         'md',
  },
};

export default meta;

type Story = StoryObj;

const defaultOptions = [
  { label: 'Apple',       value: 'apple'       },
  { label: 'Banana',      value: 'banana'      },
  { label: 'Cherry',      value: 'cherry'      },
  { label: 'Dragonfruit', value: 'dragonfruit' },
  { label: 'Elderberry',  value: 'elderberry'  },
];

// ── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    options:      defaultOptions,
  },
  render: (args) => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-select
        .label=${args.label}
        .placeholder=${args.placeholder}
        .options=${args.options}
        .size=${args.size}
        ?multiple=${args.multiple}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?required=${args.required}
        ?error=${args.error}
        .errorMessage=${args.errorMessage}
      ></flint-select>
    </div>
  `,
};

// ── Basic ────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  args: {
    label:       'Favorite Fruit',
    placeholder: 'Pick a fruit',
    options:     defaultOptions,
  },
  render: (args) => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-select
        .label=${args.label}
        .placeholder=${args.placeholder}
        .options=${args.options}
      ></flint-select>
    </div>
  `,
};

Basic.play = async ({ canvasElement }) => {
    const select = canvasElement.querySelector('flint-select') as HTMLElement & { value: string[] };

    // Initially no value selected
    await waitFor(() => expect(select.value).toEqual([]));

    // Click to open dropdown
    const trigger = select.shadowRoot!.querySelector('[part="trigger"], .trigger, button, [role="combobox"]') as HTMLElement;
    if (trigger) {
        await userEvent.click(trigger);
        // Wait for dropdown to open, then click first option
        await waitFor(() => {
            const options = select.shadowRoot!.querySelectorAll('[role="option"], .option, flint-menu-item');
            expect(options.length).toBeGreaterThan(0);
        });
        const firstOption = select.shadowRoot!.querySelector('[role="option"], .option') as HTMLElement;
        if (firstOption) {
            await userEvent.click(firstOption);
            await waitFor(() => expect(select.value.length).toBeGreaterThan(0));
        }
    }
};

// ── With preselected value ───────────────────────────────────────────────────

export const WithPreselectedValue: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-select
        label="Favourite Fruit"
        .options=${defaultOptions}
        .value=${['cherry']}
      ></flint-select>
    </div>
  `,
};

// ── Default value (uncontrolled) ─────────────────────────────────────────────

export const UncontrolledDefaultValue: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-select
        label="Uncontrolled (default-value)"
        default-value="banana"
        .options=${defaultOptions}
      ></flint-select>
    </div>
  `,
};

// ── Multi-select ─────────────────────────────────────────────────────────────

export const MultiSelect: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-select
        label="Select Multiple Fruits"
        placeholder="Select items..."
        multiple
        .options=${defaultOptions}
        .value=${['apple', 'cherry']}
      ></flint-select>
    </div>
  `,
};

// ── With icon slot ────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-select
        label="Country"
        placeholder="Select country"
        .options=${[
          { label: 'United States', value: 'us' },
          { label: 'United Kingdom', value: 'uk' },
          { label: 'Germany',        value: 'de' },
          { label: 'France',         value: 'fr' },
        ]}
      >
        <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </flint-select>
    </div>
  `,
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
      <flint-select label="Small"  size="sm" placeholder="sm"  .options=${defaultOptions}></flint-select>
      <flint-select label="Medium" size="md" placeholder="md"  .options=${defaultOptions}></flint-select>
      <flint-select label="Large"  size="lg" placeholder="lg"  .options=${defaultOptions}></flint-select>
    </div>
  `,
};

// ── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
      <flint-select
        label="Disabled (empty)"
        placeholder="Cannot open this"
        ?disabled=${true}
        .options=${defaultOptions}
      ></flint-select>
      <flint-select
        label="Disabled (with value)"
        ?disabled=${true}
        .options=${defaultOptions}
        .value=${['banana']}
      ></flint-select>
    </div>
  `,
};

// ── Readonly ──────────────────────────────────────────────────────────────────

export const Readonly: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-select
        label="Read-only"
        ?readonly=${true}
        .options=${defaultOptions}
        .value=${['cherry']}
      ></flint-select>
    </div>
  `,
};

// ── Error state ───────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
      <flint-select
        label="Required field"
        placeholder="Select an option"
        ?error=${true}
        error-message="This field is required."
        .options=${defaultOptions}
      ></flint-select>
      <flint-select
        label="Invalid selection"
        ?error=${true}
        error-message="Selected value is no longer available."
        .options=${defaultOptions}
        .value=${['apple']}
      ></flint-select>
    </div>
  `,
};

// ── Disabled options ──────────────────────────────────────────────────────────

export const WithDisabledOptions: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-select
        label="Availability"
        placeholder="Choose a slot"
        .options=${[
          { label: 'Morning (available)',   value: 'morning'   },
          { label: 'Afternoon (booked)',    value: 'afternoon', disabled: true },
          { label: 'Evening (available)',   value: 'evening'   },
          { label: 'Night (unavailable)',   value: 'night',     disabled: true },
        ]}
      ></flint-select>
    </div>
  `,
};

// ── Without label ─────────────────────────────────────────────────────────────

export const WithoutLabel: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-select placeholder="Pick a fruit" .options=${defaultOptions}></flint-select>
    </div>
  `,
};

// ── Empty options ─────────────────────────────────────────────────────────────

export const EmptyOptions: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-select label="No items yet" placeholder="Nothing to pick" .options=${[]}></flint-select>
    </div>
  `,
};

// ── Large option list ─────────────────────────────────────────────────────────

export const LargeOptionList: Story = {
  render: () => {
    const countries = [
      'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia',
      'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile',
      'China', 'Colombia', 'Croatia', 'Czech Republic', 'Denmark',
      'Egypt', 'Finland', 'France', 'Germany', 'Greece',
      'Hungary', 'India', 'Indonesia', 'Iran', 'Iraq',
      'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan',
    ].map(c => ({ label: c, value: c.toLowerCase().replace(/\s/g, '-') }));
    return html`
      <div style="max-width: 400px; padding: 20px;">
        <flint-select label="Country" placeholder="Select a country" .options=${countries}></flint-select>
      </div>
    `;
  },
};

// ── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <p style="font-size: 0.875rem; margin: 0 0 12px; color: #4b5563;">
        Parent owns state — selection reflected in the paragraph below.
      </p>
      <div
        id="controlled-root"
        @flint-select-change=${(e: CustomEvent) => {
          const root = (e.currentTarget as HTMLElement);
          root.querySelector<HTMLElement>('#selected-display')!.textContent =
            `Selected: ${e.detail.value ?? '(none)'}`;
        }}
      >
        <flint-select
          label="Controlled Fruit"
          placeholder="Pick a fruit"
          .options=${defaultOptions}
        ></flint-select>
        <p id="selected-display" style="font-size: 0.875rem; margin-top: 8px;">Selected: (none)</p>
      </div>
    </div>
  `,
};

// ── Controlled multi-select ───────────────────────────────────────────────────

export const ControlledMulti: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <div
        id="controlled-multi-root"
        @flint-select-change=${(e: CustomEvent) => {
          const root = (e.currentTarget as HTMLElement);
          const vals: string[] = e.detail.value ?? [];
          root.querySelector<HTMLElement>('#multi-display')!.textContent =
            vals.length ? `Selected: ${vals.join(', ')}` : 'Selected: (none)';
        }}
      >
        <flint-select
          label="Controlled Multi"
          placeholder="Pick fruits..."
          multiple
          .options=${defaultOptions}
        ></flint-select>
        <p id="multi-display" style="font-size: 0.875rem; margin-top: 8px;">Selected: (none)</p>
      </div>
    </div>
  `,
};

// ── Custom styling ────────────────────────────────────────────────────────────

export const CustomStyling: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <flint-select
        label="Custom Style"
        placeholder="Pick a fruit"
        .options=${defaultOptions}
        style="
          --flint-select-focus-color: #7c3aed;
          --flint-select-radius: 24px;
          --flint-select-border: #c4b5fd;
          --flint-font-family: Georgia, serif;
        "
      ></flint-select>
    </div>
  `,
};

// ── Hoisted (inside overflow container) ──────────────────────────────────────

export const HoistedInOverflowContainer: Story = {
  render: () => html`
    <div style="max-width: 500px; padding: 20px;">
      <p style="font-size: 0.875rem; color: #4b5563; margin: 0 0 12px;">
        Without <code>hoist</code>, the dropdown is clipped by the card's <code>overflow: hidden</code>.
        With <code>hoist</code>, the dropdown escapes the container.
      </p>
      <div style="display: flex; gap: 24px; align-items: flex-start;">
        <div style="overflow: hidden; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; width: 220px; height: 120px;">
          <p style="font-size: 0.75rem; color: #9ca3af; margin: 0 0 8px;">Clipped (no hoist)</p>
          <flint-select
            label="Fruit"
            placeholder="Pick one"
            .options=${defaultOptions}
          ></flint-select>
        </div>
        <div style="overflow: hidden; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; width: 220px; height: 120px;">
          <p style="font-size: 0.75rem; color: #9ca3af; margin: 0 0 8px;">Hoisted (escapes)</p>
          <flint-select
            label="Fruit"
            placeholder="Pick one"
            hoist
            .options=${defaultOptions}
          ></flint-select>
        </div>
      </div>
    </div>
  `,
};

// ── In a form ─────────────────────────────────────────────────────────────────

export const InForm: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 20px;">
      <form
        id="demo-form"
        @submit=${(e: Event) => {
          e.preventDefault();
          const fd = new FormData(e.target as HTMLFormElement);
          const root = (e.target as HTMLElement).closest('div')!;
          root.querySelector<HTMLElement>('#form-output')!.textContent =
            `Submitted: fruit = ${fd.get('fruit') ?? '(none)'}`;
        }}
        style="display: flex; flex-direction: column; gap: 12px;"
      >
        <flint-select
          name="fruit"
          label="Favourite Fruit"
          placeholder="Required"
          ?required=${true}
          .options=${defaultOptions}
        ></flint-select>
        <flint-button type="submit">Submit</flint-button>
        <p id="form-output" style="font-size: 0.875rem; color: #4b5563;"></p>
      </form>
    </div>
  `,
};

// ── RTL ──────────────────────────────────────────────────────────────────────

export const DefaultRTL: Story = {
  name: 'RTL',
  render: () => html`
    <div dir="rtl" style="text-align: right; max-width: 400px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
      <flint-select
        label="الفاكهة المفضلة"
        placeholder="اختر فاكهة"
        .options=${[
          { label: 'تفاح', value: 'apple' },
          { label: 'موز', value: 'banana' },
          { label: 'كرز', value: 'cherry' },
          { label: 'فراولة', value: 'strawberry' },
        ]}
      ></flint-select>
      <flint-select
        label="اختيار متعدد"
        placeholder="اختر عناصر..."
        multiple
        .options=${[
          { label: 'تفاح', value: 'apple' },
          { label: 'موز', value: 'banana' },
          { label: 'كرز', value: 'cherry' },
        ]}
        .value=${['apple', 'cherry']}
      ></flint-select>
    </div>
  `,
};
