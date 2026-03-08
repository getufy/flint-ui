import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-autocomplete';
import type { AutocompleteOption } from './ui-autocomplete';

const meta: Meta = {
    title: 'Inputs/Autocomplete',
    component: 'ui-autocomplete',
    argTypes: {
        freeSolo: { control: 'boolean', description: 'Allow any typed value, not just predefined options' },
        disabled: { control: 'boolean', description: 'Disable the input' },
        placeholder: { control: 'text' },
        value: { control: 'text', description: 'Currently selected value' },
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
const captionStyle = 'margin-top: 200px; color: #6b7280; font-family: system-ui, sans-serif; font-size: 14px;';

export const ComboBox: Story = {
    args: {
        freeSolo: false,
        disabled: false,
        placeholder: 'Combo box',
        options: top100Films,
    },
    render: (args: Record<string, unknown>) => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Favorite Movie</h3>
      <ui-autocomplete
        .options=${args['options']}
        .freeSolo=${args['freeSolo']}
        .disabled=${args['disabled']}
        placeholder=${args['placeholder']}
        style="width: 300px;"
        @change=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      ></ui-autocomplete>
      <p style=${captionStyle}>Value must be chosen from the predefined set.</p>
    </div>
  `,
};

export const FreeSolo: Story = {
    args: {
        freeSolo: true,
        disabled: false,
        placeholder: 'Free solo',
        options: top100Films,
    },
    render: (args: Record<string, unknown>) => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Search input</h3>
      <ui-autocomplete
        .options=${args['options']}
        .freeSolo=${args['freeSolo']}
        .disabled=${args['disabled']}
        placeholder=${args['placeholder']}
        style="width: 300px;"
        @change=${(e: CustomEvent) => console.log('Typed/Selected:', e.detail)}
      ></ui-autocomplete>
      <p style=${captionStyle}>Textbox may contain any arbitrary value, but suggests possible values to the user.</p>
    </div>
  `,
};

export const WithInitialValue: Story = {
    render: () => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Pre-selected Value</h3>
      <ui-autocomplete
        .options=${top100Films}
        value="4"
        placeholder="Select a movie"
        style="width: 300px;"
        @change=${(e: CustomEvent) => console.log('Changed:', e.detail)}
      ></ui-autocomplete>
      <p style=${captionStyle}>The Dark Knight is pre-selected via the <code>value</code> prop.</p>
    </div>
  `,
};

export const Disabled: Story = {
    render: () => html`
    <div style=${cardStyle}>
      <h3 style=${headingStyle}>Disabled</h3>
      <ui-autocomplete
        .options=${top100Films}
        value="1"
        .disabled=${true}
        placeholder="Disabled input"
        style="width: 300px;"
      ></ui-autocomplete>
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
        <ui-autocomplete
          id="controlled-autocomplete"
          .options=${top100Films}
          .value=${currentValue}
          placeholder="Select a movie"
          style="width: 300px;"
          @change=${(e: CustomEvent) => {
                currentValue = e.detail.value;
                const el = document.querySelector('#controlled-autocomplete') as HTMLElement & { value: string };
                if (el) el.value = currentValue;
                const display = document.querySelector('#controlled-display');
                if (display) display.textContent = `Selected: ${e.detail.label} (value: ${e.detail.value})`;
            }}
        ></ui-autocomplete>
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
      <ui-autocomplete
        .options=${top100Films}
        placeholder="Pick a film"
        style="
          width: 300px;
          --ui-autocomplete-dropdown-max-height: 150px;
          --ui-autocomplete-option-padding: 8px 16px;
          --ui-primary-color: #8b5cf6;
        "
        @change=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      ></ui-autocomplete>
      <p style=${captionStyle}>
        Customized via <code>--ui-autocomplete-dropdown-max-height</code>,
        <code>--ui-autocomplete-option-padding</code>, and <code>--ui-primary-color</code>.
      </p>
    </div>
  `,
};

export const DarkMode: Story = {
    render: () => html`
    <div class="ui-theme-dark" style="background: #18181b; padding: 20px; border-radius: 8px;">
      <h3 style="margin-top: 0; margin-bottom: 16px; font-family: system-ui; color: #fafafa;">Dark Mode</h3>
      <ui-autocomplete
        .options=${top100Films}
        placeholder="Search movies…"
        style="width: 300px;"
        @change=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      ></ui-autocomplete>
      <br />
      <ui-autocomplete
        .options=${top100Films}
        .freeSolo=${true}
        placeholder="Free solo (dark)"
        style="width: 300px; margin-top: 12px;"
        @change=${(e: CustomEvent) => console.log('Typed:', e.detail)}
      ></ui-autocomplete>
      <p style="margin-top: 200px; color: #9ca3af; font-family: system-ui; font-size: 14px;">
        Dark mode via <code>.ui-theme-dark</code> wrapper class — all tokens adapt automatically.
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
      <ui-autocomplete
        id="movie-input"
        .options=${top100Films}
        placeholder="Type to search…"
        style="width: 300px;"
        @change=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      ></ui-autocomplete>
      <p style="margin-top: 8px; font-family: system-ui; font-size: 12px; color: #6b7280;">
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
