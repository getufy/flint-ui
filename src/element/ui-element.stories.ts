import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-element';

const meta: Meta = {
    title: 'Components/UiElement',
    component: 'ui-element',
    argTypes: {
        name: { control: 'text' },
        count: { control: 'number' },
        onClick: { action: 'onClick' },
    },
    render: (args: Record<string, unknown>) => html`
    <ui-element .name=${args.name} .count=${args.count} @count-changed=${args.onClick}></ui-element>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    args: {
        name: 'World',
        count: 0,
    },
};

export const CustomName: Story = {
    args: {
        name: 'Developer',
        count: 5,
    },
};
