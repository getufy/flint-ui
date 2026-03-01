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
