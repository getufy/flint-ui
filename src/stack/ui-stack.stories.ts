import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-stack';
import '../divider/ui-divider';

const meta: Meta = {
    title: 'Layout/Stack',
    component: 'ui-stack',
    argTypes: {
        direction: {
            control: 'select',
            options: ['column', 'row', 'column-reverse', 'row-reverse'],
        },
        spacing: { control: 'number' },
        alignItems: {
            control: 'select',
            options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
        },
        justifyContent: {
            control: 'select',
            options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
        },
        useFlexGap: { control: 'boolean' },
    },
    args: {
        direction: 'column',
        spacing: 2,
        useFlexGap: true,
    }
};

export default meta;
type Story = StoryObj;

const itemStyle = 'background-color: #cfe8fc; border: 1px solid #1976d2; padding: 16px; text-align: center; color: #1976d2; font-family: Inter; border-radius: 4px;';

export const Basic: Story = {
    render: (args) => html`
    <ui-stack .direction=${args.direction} .spacing=${args.spacing} .alignItems=${args.alignItems} .justifyContent=${args.justifyContent} ?useFlexGap=${args.useFlexGap}>
      <div style="${itemStyle}">Item 1</div>
      <div style="${itemStyle}">Item 2</div>
      <div style="${itemStyle}">Item 3</div>
    </ui-stack>
  `,
};

export const Horizontal: Story = {
    args: {
        direction: 'row',
        spacing: 2,
    },
    render: (args) => html`
    <ui-stack .direction=${args.direction} .spacing=${args.spacing}>
      <div style="${itemStyle}">Item 1</div>
      <div style="${itemStyle}">Item 2</div>
      <div style="${itemStyle}">Item 3</div>
    </ui-stack>
  `,
};

export const Responsive: Story = {
    args: {
        direction: { xs: 'column', sm: 'row' },
        spacing: { xs: 1, sm: 2, md: 4 },
    },
    render: (args) => html`
    <ui-stack .direction=${args.direction} .spacing=${args.spacing}>
      <div style="${itemStyle}">Responsive Direction</div>
      <div style="${itemStyle}">Change viewport</div>
      <div style="${itemStyle}">To see effect</div>
    </ui-stack>
  `,
};

export const WithDividers: Story = {
    render: (args) => html`
    <ui-stack .direction=${args.direction} .spacing=${args.spacing} .alignItems=${args.alignItems} .justifyContent=${args.justifyContent}>
      <div style="${itemStyle}">Item 1</div>
      <ui-divider></ui-divider>
      <div style="${itemStyle}">Item 2</div>
      <ui-divider></ui-divider>
      <div style="${itemStyle}">Item 3</div>
    </ui-stack>
  `,
};
