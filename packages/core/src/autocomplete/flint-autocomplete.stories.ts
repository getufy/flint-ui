import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-autocomplete';
import type { AutocompleteOption } from './flint-autocomplete';

const meta: Meta = {
    title: 'Inputs/Autocomplete',
    component: 'flint-autocomplete',
    parameters: {
        docs: {
            description: {
                component: `
Autocomplete: a text input with a dropdown of selectable suggestions.

- **Tag**: \`<flint-autocomplete>\`
- **Class**: \`FlintAutocomplete\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`options\` | \`options\` | \`AutocompleteOption[]\` | \`[]\` | The list of selectable options. |
| \`freeSolo\` | \`free-solo\` | \`boolean\` | \`false\` | When true, allows arbitrary values that are not in the options list. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the autocomplete input is disabled. |
| \`value\` | \`value\` | \`string\` | \`''\` | The current selected value. |
| \`placeholder\` | \`placeholder\` | \`string\` | \`''\` | Placeholder text shown when the input is empty. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`flint-autocomplete-change\` | — | Fired when the selected value changes. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-autocomplete-dropdown-max-height\` | \`250px\` |
| \`--flint-autocomplete-z-index\` | \`10\` |
| \`--flint-autocomplete-option-padding\` | \`10px 12px\` |
| \`--flint-font-family\` | — |
| \`--flint-input-border-color\` | — |
| \`--flint-input-border-radius\` | — |
| \`--flint-text-color\` | — |
| \`--flint-input-bg\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-input-disabled-bg\` | — |
| \`--flint-text-color-subtle\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-text-color-muted\` | — |
                `,
            },
        },
    },
    argTypes: {
        freeSolo: { control: 'boolean', description: 'Allow any typed value, not just predefined options' },
        disabled: { control: 'boolean', description: 'Disable the input' },
        placeholder: { control: 'text' },
        value: { control: 'text', description: 'Currently selected value' },
    },
    args: {
        freeSolo: false,
        disabled: false,
        placeholder: 'Combo box',
        value: '',
    },
};

export default meta;

type Story = StoryObj;

const top100Films: AutocompleteOption[] = [
    { label: 'The Shawshank Redemption', value: '1' },
    { label: 'The Godfather', value: '2' },
    { label: 'The Godfather: Part II', value: '3' },
    { label: 'The Dark Knight', value: '4' },
    { label: '12 Angry Men', value: '5' },
    { label: "Schindler's List", value: '6' },
    { label: 'Pulp Fiction', value: '7' },
    { label: 'The Lord of the Rings: The Return of the King', value: '8' },
    { label: 'The Good, the Bad and the Ugly', value: '9' },
    { label: 'Fight Club', value: '10' },
    { label: 'Forrest Gump', value: '11' },
    { label: 'Inception', value: '12' },
    { label: 'The Matrix', value: '13' },
    { label: 'Goodfellas', value: '14' },
    { label: 'Interstellar', value: '15' },
];

const cardStyle = 'background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);';
const headingStyle = 'margin-top: 0; margin-bottom: 16px; font-family: system-ui, sans-serif;';
const captionStyle = 'margin-top: 200px; color: #4b5563; font-family: system-ui, sans-serif; font-size: 14px;';

export const ComboBox: Story = {
    args: {
        placeholder: 'Combo box',
    },
    render: (args: Record<string, unknown>) => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Favorite Movie</h3>
      <flint-autocomplete
        .options=${top100Films}
        .freeSolo=${args['freeSolo']}
        .disabled=${args['disabled']}
        placeholder=${args['placeholder']}
        style="width: 300px;"
        @flint-autocomplete-change=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      ></flint-autocomplete>
      <p style=${captionStyle}>Value must be chosen from the predefined set.</p>
    </div>
  `,
};

export const FreeSolo: Story = {
    args: {
        freeSolo: true,
        placeholder: 'Free solo',
    },
    render: (args: Record<string, unknown>) => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Search input</h3>
      <flint-autocomplete
        .options=${top100Films}
        .freeSolo=${args['freeSolo']}
        .disabled=${args['disabled']}
        placeholder=${args['placeholder']}
        style="width: 300px;"
        @flint-autocomplete-change=${(e: CustomEvent) => console.log('Typed/Selected:', e.detail)}
      ></flint-autocomplete>
      <p style=${captionStyle}>Textbox may contain any arbitrary value, but suggests possible values to the user.</p>
    </div>
  `,
};

export const WithInitialValue: Story = {
    args: {
        value: '4',
        placeholder: 'Select a movie',
    },
    render: (args: Record<string, unknown>) => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Pre-selected Value</h3>
      <flint-autocomplete
        .options=${top100Films}
        .freeSolo=${args['freeSolo']}
        .disabled=${args['disabled']}
        .value=${args['value'] as string}
        placeholder=${args['placeholder']}
        style="width: 300px;"
        @flint-autocomplete-change=${(e: CustomEvent) => console.log('Changed:', e.detail)}
      ></flint-autocomplete>
      <p style=${captionStyle}>The Dark Knight is pre-selected via the <code>value</code> prop.</p>
    </div>
  `,
};

export const Disabled: Story = {
    args: {
        disabled: true,
        value: '1',
        placeholder: 'Disabled input',
    },
    render: (args: Record<string, unknown>) => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Disabled</h3>
      <flint-autocomplete
        .options=${top100Films}
        .freeSolo=${args['freeSolo']}
        .disabled=${args['disabled']}
        .value=${args['value'] as string}
        placeholder=${args['placeholder']}
        style="width: 300px;"
      ></flint-autocomplete>
      <p style=${captionStyle}>The input is non-interactive when <code>disabled</code> is set.</p>
    </div>
  `,
};

export const Controlled: Story = {
    render: () => {
        let currentValue = '';
        return html`
      <div style=${cardStyle}>
        <h3 style=${headingStyle}>Controlled</h3>
        <flint-autocomplete
          id="controlled-autocomplete"
          .options=${top100Films}
          .value=${currentValue}
          placeholder="Select a movie"
          style="width: 300px;"
          @flint-autocomplete-change=${(e: CustomEvent) => {
                currentValue = e.detail.value;
                const el = document.querySelector('#controlled-autocomplete') as HTMLElement & { value: string };
                if (el) el.value = currentValue;
                const display = document.querySelector('#controlled-display');
                if (display) display.textContent = `Selected: ${e.detail.label} (value: ${e.detail.value})`;
            }}
        ></flint-autocomplete>
        <p id="controlled-display" style="margin-top: 8px; font-family: system-ui; font-size: 14px; color: #374151;">
          No selection yet
        </p>
        <p style=${captionStyle}>External state tracks the selected value.</p>
      </div>
    `;
    },
};

export const CustomTokens: Story = {
    render: () => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Custom CSS Tokens</h3>
      <flint-autocomplete
        .options=${top100Films}
        placeholder="Pick a film"
        style="
          width: 300px;
          --flint-autocomplete-dropdown-max-height: 150px;
          --flint-autocomplete-option-padding: 8px 16px;
          --flint-primary-color: #7c3aed;
        "
        @flint-autocomplete-change=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      ></flint-autocomplete>
      <p style=${captionStyle}>
        Customized via <code>--flint-autocomplete-dropdown-max-height</code>,
        <code>--flint-autocomplete-option-padding</code>, and <code>--flint-primary-color</code>.
      </p>
    </div>
  `,
};

export const DarkMode: Story = {
    render: () => html`
    <div class="flint-theme-dark" style="background: #18181b; padding: 20px; border-radius: 8px;">
      <h3 style="margin-top: 0; margin-bottom: 16px; font-family: system-ui; color: #fafafa;">Dark Mode</h3>
      <flint-autocomplete
        .options=${top100Films}
        placeholder="Search movies…"
        style="width: 300px;"
        @flint-autocomplete-change=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      ></flint-autocomplete>
      <br />
      <flint-autocomplete
        .options=${top100Films}
        .freeSolo=${true}
        placeholder="Free solo (dark)"
        style="width: 300px; margin-top: 12px;"
        @flint-autocomplete-change=${(e: CustomEvent) => console.log('Typed:', e.detail)}
      ></flint-autocomplete>
      <p style="margin-top: 200px; color: #9ca3af; font-family: system-ui; font-size: 14px;">
        Dark mode via <code>.flint-theme-dark</code> wrapper class — all tokens adapt automatically.
      </p>
    </div>
  `,
};

export const Accessibility: Story = {
    render: () => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Accessibility</h3>
      <label
        id="movie-label"
        for="movie-input"
        style="display: block; margin-bottom: 6px; font-family: system-ui; font-size: 14px; font-weight: 500; color: #374151;"
      >
        Favorite Movie
      </label>
      <flint-autocomplete
        id="movie-input"
        .options=${top100Films}
        placeholder="Type to search…"
        style="width: 300px;"
        @flint-autocomplete-change=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      ></flint-autocomplete>
      <p style="margin-top: 8px; font-family: system-ui; font-size: 12px; color: #4b5563;">
        Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate, <kbd>Enter</kbd> to select,
        <kbd>Esc</kbd> to dismiss, <kbd>Tab</kbd> to close without selecting.
      </p>
      <p style=${captionStyle}>
        The input has <code>role="combobox"</code>, <code>aria-expanded</code>,
        <code>aria-autocomplete="list"</code>, and <code>aria-activedescendant</code>
        for full screen-reader support.
      </p>
    </div>
  `,
};
