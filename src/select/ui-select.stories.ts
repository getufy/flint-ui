import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-select';

const meta: Meta = {
    title: 'Inputs/Select',
    component: 'ui-select',
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        multiple: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
};

export default meta;

type Story = StoryObj;

const defaultOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Dragonfruit', value: 'dragonfruit' },
    { label: 'Elderberry', value: 'elderberry' },
];

export const Basic: Story = {
    args: {
        label: 'Favorite Fruit',
        placeholder: 'Pick a fruit',
        options: defaultOptions,
        multiple: false,
        disabled: false,
    },
    render: (args) => html`
    <div style="max-width: 400px; padding: 20px;">
      <ui-select 
        .label=${args.label} 
        .placeholder=${args.placeholder}
        .options=${args.options}
        ?multiple=${args.multiple}
        ?disabled=${args.disabled}
      ></ui-select>
    </div>
  `,
};

export const MultiSelect: Story = {
    args: {
        label: 'Select Multiple Fruits',
        placeholder: 'Select items...',
        options: defaultOptions,
        multiple: true,
        value: ['apple', 'cherry'],
    },
    render: (args) => html`
    <div style="max-width: 400px; padding: 20px;">
      <ui-select 
        .label=${args.label} 
        .placeholder=${args.placeholder}
        .options=${args.options}
        ?multiple=${args.multiple}
        .value=${args.value}
      ></ui-select>
    </div>
  `,
};

export const WithIcon: Story = {
    args: {
        label: 'Country',
        placeholder: 'Select country',
        options: [
            { label: 'United States', value: 'us' },
            { label: 'United Kingdom', value: 'uk' },
            { label: 'Germany', value: 'de' },
            { label: 'France', value: 'fr' },
        ],
    },
    render: (args) => html`
    <div style="max-width: 400px; padding: 20px;">
      <ui-select 
        .label=${args.label} 
        .placeholder=${args.placeholder}
        .options=${args.options}
      >
        <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </ui-select>
    </div>
  `,
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Select',
        placeholder: 'Cannot open this',
        options: defaultOptions,
        disabled: true,
    },
    render: (args) => html`
    <div style="max-width: 400px; padding: 20px;">
      <ui-select 
        .label=${args.label} 
        .placeholder=${args.placeholder}
        .options=${args.options}
        ?disabled=${args.disabled}
      ></ui-select>
    </div>
  `,
};
