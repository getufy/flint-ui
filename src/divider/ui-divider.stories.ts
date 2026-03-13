import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-divider';

const meta: Meta = {
    title: 'Data Display/Divider',
    component: 'ui-divider',
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
        variant: {
            control: 'select',
            options: ['full', 'middle', 'inset'],
        },
        weight: {
            control: 'select',
            options: ['light', 'medium', 'heavy'],
        },
        textAlign: {
            control: 'select',
            options: ['left', 'center', 'right'],
        },
    },
    args: {
        orientation: 'horizontal',
        variant: 'full',
        weight: 'light',
        textAlign: 'center',
    },
};

export default meta;

type Story = StoryObj;

export const Horizontal: Story = {
    args: {
        orientation: 'horizontal',
        variant: 'full',
        weight: 'light',
    },
    render: (args) => html`
    <div style="width: 100%; max-width: 500px; padding: 20px; font-family: sans-serif;">
      <p>Content above the divider.</p>
      <ui-divider 
        .orientation=${args.orientation} 
        .variant=${args.variant}
        .weight=${args.weight}
      ></ui-divider>
      <p>Content below the divider.</p>
    </div>
  `,
};

export const WithContent: Story = {
    args: {
        textAlign: 'center',
    },
    render: (args) => html`
    <div style="width: 100%; max-width: 500px; padding: 20px; font-family: sans-serif;">
      <p>List Section A</p>
      <ui-divider .textAlign=${args.textAlign}>
        <span>OR</span>
      </ui-divider>
      <p>List Section B</p>
      
      <ui-divider textAlign="left">
        <span style="font-weight: bold; text-transform: uppercase; font-size: 12px;">New Items</span>
      </ui-divider>
      <p>List Section C</p>
    </div>
  `,
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
    },
    render: (args) => html`
    <div style="display: flex; align-items: center; height: 40px; padding: 20px; font-family: sans-serif; gap: 8px;">
      <span>Edit</span>
      <ui-divider .orientation=${args.orientation}></ui-divider>
      <span>Copy</span>
      <ui-divider .orientation=${args.orientation}></ui-divider>
      <span>Paste</span>
    </div>
  `,
};

export const WeightsAndVariants: Story = {
    render: (args) => html`
    <div style="width: 100%; max-width: 500px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
      <div style="font-size: 14px; color: #666;">Heavy weight</div>
      <ui-divider .weight=${args.weight}></ui-divider>

      <div style="font-size: 14px; color: #666;">Middle variant</div>
      <ui-divider .variant=${args.variant}></ui-divider>

      <div style="font-size: 14px; color: #666;">Inset variant</div>
      <ui-divider .variant=${args.variant}></ui-divider>
    </div>
  `,
};
