import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-transfer-list';

const meta: Meta = {
    title: 'Inputs/Transfer List',
    component: 'ui-transfer-list',
    argTypes: {
        leftTitle: { control: 'text' },
        rightTitle: { control: 'text' },
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
