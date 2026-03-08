import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-transfer-list';

const meta: Meta = {
    title: 'Inputs/Transfer List',
    component: 'ui-transfer-list',
    argTypes: {
        leftTitle: { control: 'text' },
        rightTitle: { control: 'text' },
        disabled: { control: 'boolean' },
        searchable: { control: 'boolean' },
    },
};

export default meta;

type Story = StoryObj;

const defaultOptions = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

export const Playground: Story = {
    args: {
        options: defaultOptions,
        value: ['1', '3'],
        leftTitle: 'Available',
        rightTitle: 'Chosen',
        disabled: false,
        searchable: false,
    },
    render: (args) => html`
    <div style="padding: 20px;">
      <ui-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        ?disabled=${args.disabled}
        ?searchable=${args.searchable}
        @change=${(e: CustomEvent) => console.log('Transfer List Value:', e.detail.value)}
      ></ui-transfer-list>
    </div>
  `,
};

export const Default: Story = {
    args: {
        options: defaultOptions,
        value: ['1', '3'],
        leftTitle: 'Available',
        rightTitle: 'Chosen',
    },
    render: (args) => html`
    <div style="padding: 20px;">
      <ui-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        @change=${(e: CustomEvent) => console.log('Transfer List Value:', e.detail.value)}
      ></ui-transfer-list>
    </div>
  `,
};

export const Searchable: Story = {
    args: {
        options: defaultOptions,
        value: ['2', '5'],
        leftTitle: 'Available',
        rightTitle: 'Chosen',
        searchable: true,
    },
    render: (args) => html`
    <div style="padding: 20px;">
      <ui-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        ?searchable=${args.searchable}
        @change=${(e: CustomEvent) => console.log('Transfer List Value:', e.detail.value)}
      ></ui-transfer-list>
    </div>
  `,
};

export const Disabled: Story = {
    args: {
        options: defaultOptions,
        value: ['1', '3'],
        leftTitle: 'Available',
        rightTitle: 'Chosen',
        disabled: true,
    },
    render: (args) => html`
    <div style="padding: 20px;">
      <ui-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        ?disabled=${args.disabled}
      ></ui-transfer-list>
    </div>
  `,
};

export const EmptyLists: Story = {
    name: 'Empty Right List',
    args: {
        options: defaultOptions,
        value: [],
        leftTitle: 'Available',
        rightTitle: 'Chosen',
    },
    render: (args) => html`
    <div style="padding: 20px;">
      <ui-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
      ></ui-transfer-list>
    </div>
  `,
};

export const AllSelected: Story = {
    name: 'All Items Selected',
    args: {
        options: defaultOptions,
        value: defaultOptions.map(o => o.value),
        leftTitle: 'Available',
        rightTitle: 'Chosen',
    },
    render: (args) => html`
    <div style="padding: 20px;">
      <ui-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
      ></ui-transfer-list>
    </div>
  `,
};

export const LargeLists: Story = {
    args: {
        options: Array.from({ length: 20 }, (_, i) => ({ label: `Advanced Feature ${i + 1}`, value: `${i + 1}` })),
        value: [],
    },
    render: (args) => html`
    <div style="padding: 20px;">
      <ui-transfer-list .options=${args.options} .value=${args.value}></ui-transfer-list>
    </div>
  `,
};

export const SearchableLarge: Story = {
    name: 'Searchable + Large Lists',
    args: {
        options: Array.from({ length: 20 }, (_, i) => ({ label: `Feature ${i + 1}`, value: `${i + 1}` })),
        value: ['1', '2', '3', '4', '5'],
        searchable: true,
        leftTitle: 'All Features',
        rightTitle: 'Enabled',
    },
    render: (args) => html`
    <div style="padding: 20px;">
      <ui-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        ?searchable=${args.searchable}
      ></ui-transfer-list>
    </div>
  `,
};

export const DarkMode: Story = {
    args: {
        options: defaultOptions,
        value: ['1', '3'],
        leftTitle: 'Available',
        rightTitle: 'Chosen',
    },
    render: (args) => html`
    <div class="ui-theme-dark" style="padding: 20px; background: #18181b; border-radius: 12px; display: inline-block;">
      <ui-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        @change=${(e: CustomEvent) => console.log('Transfer List Value:', e.detail.value)}
      ></ui-transfer-list>
    </div>
  `,
};

export const Controlled: Story = {
    render: () => {
        const options = defaultOptions;
        return html`
      <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <ui-transfer-list
          id="controlled-list"
          .options=${options}
          .value=${['1', '3']}
          leftTitle="Available"
          rightTitle="Chosen"
          @change=${(e: CustomEvent) => {
              const list = (e.currentTarget as HTMLElement).querySelector('#controlled-list') as HTMLElement & { value: string[] };
              if (list) list.value = e.detail.value;
              const output = document.querySelector('#controlled-output');
              if (output) output.textContent = JSON.stringify(e.detail.value);
          }}
        ></ui-transfer-list>
        <div style="font-family: monospace; font-size: 0.875rem; color: #71717a;">
          value: <span id="controlled-output">["1","3"]</span>
        </div>
      </div>
    `;
    },
};

export const Accessibility: Story = {
    render: () => html`
    <div style="padding: 20px;">
      <p style="font-family: system-ui; font-size: 0.875rem; color: #71717a; margin: 0 0 16px;">
        Lists use <code>role="listbox"</code>, items use <code>role="option"</code> with
        <code>aria-selected</code>. Action buttons have descriptive <code>aria-label</code> attributes.
      </p>
      <ui-transfer-list
        .options=${defaultOptions}
        .value=${['2', '4']}
        leftTitle="Available items"
        rightTitle="Selected items"
      ></ui-transfer-list>
    </div>
  `,
};
