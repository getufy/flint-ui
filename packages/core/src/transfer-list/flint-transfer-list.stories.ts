import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-transfer-list';

const meta: Meta = {
    title: 'Inputs/Transfer List',
    component: 'flint-transfer-list',
    parameters: {
        docs: {
            description: {
                component: `
A premium Transfer List component for moving items between two lists.

- **Tag**: \`<flint-transfer-list>\`
- **Class**: \`FlintTransferList\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`options\` | \`options\` | \`TransferOption[]\` | \`[]\` | Available options to display in the transfer list. |
| \`value\` | \`value\` | \`string[]\` | \`[]\` | Currently selected values (items in the right list). |
| \`defaultValue\` | \`default-value\` | \`string[]\` | \`[]\` | Initial value for uncontrolled usage. Applied once on first render. |
| \`leftTitle\` | \`left-title\` | \`string\` | \`'Options'\` | Title displayed above the left (available) list. |
| \`rightTitle\` | \`right-title\` | \`string\` | \`'Selected'\` | Title displayed above the right (selected) list. |
| \`disabled\` | \`disabled\` | \`boolean\` | \`false\` | Whether the transfer list is disabled. |
| \`searchable\` | \`searchable\` | \`boolean\` | \`false\` | Whether to show search inputs for filtering each list. |

#### Events

| Event | Detail | Description |
|---|---|---|
| \`change\` | — | Dispatched when items are moved between lists. Detail: \`{ value: string[] }\` |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-transfer-list-width\` | — |
| \`--flint-transfer-list-height\` | — |
| \`--flint-font-family\` | — |
| \`--flint-text-color\` | — |
| \`--flint-text-color-muted\` | — |
| \`--flint-text-color-on-primary\` | — |
| \`--flint-primary-color\` | — |
| \`--flint-surface-2\` | — |
| \`--flint-border-color\` | — |
| \`--flint-border-radius-md\` | \`6px\` |
| \`--flint-primary-focus-ring\` | — |
| \`--flint-surface-1\` | — |
| \`--flint-border-radius-lg\` | — |
| \`--flint-shadow-sm\` | — |
| \`--flint-hover-color\` | — |
| \`--flint-primary-color-light\` | — |
| \`--flint-shadow-md\` | — |
                `,
            },
        },
    },
    argTypes: {
        leftTitle: { control: 'text' },
        rightTitle: { control: 'text' },
        disabled: { control: 'boolean' },
        searchable: { control: 'boolean' },
    },
    args: {
        leftTitle: 'Available',
        rightTitle: 'Chosen',
        disabled: false,
        searchable: false,
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
    },
    render: (args) => html`
    <div style="padding: 20px;">
      <flint-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        ?disabled=${args.disabled}
        ?searchable=${args.searchable}
        @change=${(e: CustomEvent) => console.log('Transfer List Value:', e.detail.value)}
      ></flint-transfer-list>
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
      <flint-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        @change=${(e: CustomEvent) => console.log('Transfer List Value:', e.detail.value)}
      ></flint-transfer-list>
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
      <flint-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        ?searchable=${args.searchable}
        @change=${(e: CustomEvent) => console.log('Transfer List Value:', e.detail.value)}
      ></flint-transfer-list>
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
      <flint-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        ?disabled=${args.disabled}
      ></flint-transfer-list>
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
      <flint-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
      ></flint-transfer-list>
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
      <flint-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
      ></flint-transfer-list>
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
      <flint-transfer-list .options=${args.options} .value=${args.value}></flint-transfer-list>
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
      <flint-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        ?searchable=${args.searchable}
      ></flint-transfer-list>
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
    <div class="flint-theme-dark" style="padding: 20px; background: #18181b; border-radius: 12px; display: inline-block;">
      <flint-transfer-list
        .options=${args.options}
        .value=${args.value}
        .leftTitle=${args.leftTitle}
        .rightTitle=${args.rightTitle}
        @change=${(e: CustomEvent) => console.log('Transfer List Value:', e.detail.value)}
      ></flint-transfer-list>
    </div>
  `,
};

export const Controlled: Story = {
    render: () => {
        const options = defaultOptions;
        return html`
      <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <flint-transfer-list
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
        ></flint-transfer-list>
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
      <flint-transfer-list
        .options=${defaultOptions}
        .value=${['2', '4']}
        leftTitle="Available items"
        rightTitle="Selected items"
      ></flint-transfer-list>
    </div>
  `,
};
