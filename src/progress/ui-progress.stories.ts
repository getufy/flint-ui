import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-circular-progress';
import './ui-linear-progress';

const meta: Meta = {
    title: 'Feedback/Progress',
    component: 'ui-circular-progress',
    argTypes: {
        variant: {
            control: 'select',
            options: ['determinate', 'indeterminate'],
        },
        value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
        size: { control: 'number' },
        thickness: { control: 'number' },
    },
};

export default meta;

type Story = StoryObj;

export const CircularIndeterminate: Story = {
    args: {
        variant: 'indeterminate',
        size: 40,
        thickness: 3.6,
    },
    render: (args) => html`
    <ui-circular-progress 
      .variant="${args.variant}" 
      .size="${args.size}" 
      .thickness="${args.thickness}"
    ></ui-circular-progress>
  `,
};

export const CircularDeterminate: Story = {
    args: {
        variant: 'determinate',
        value: 75,
        size: 40,
    },
    render: (args) => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <ui-circular-progress .variant="determinate" .value="25"></ui-circular-progress>
      <ui-circular-progress .variant="determinate" .value="50"></ui-circular-progress>
      <ui-circular-progress .variant="determinate" .value="75"></ui-circular-progress>
      <ui-circular-progress .variant="determinate" .value="100"></ui-circular-progress>
      <ui-circular-progress .variant="determinate" .value="${args.value}"></ui-circular-progress>
    </div>
  `,
};

export const LinearIndeterminate: Story = {
    render: () => html`
    <div style="width: 100%; max-width: 400px; padding: 20px;">
      <ui-linear-progress variant="indeterminate"></ui-linear-progress>
    </div>
  `,
};

export const LinearDeterminate: Story = {
    args: {
        value: 60,
    },
    render: (args) => html`
    <div style="width: 100%; max-width: 400px; padding: 20px; display: flex; flex-direction: column; gap: 20px;">
      <ui-linear-progress variant="determinate" .value="30"></ui-linear-progress>
      <ui-linear-progress variant="determinate" .value="60"></ui-linear-progress>
      <ui-linear-progress variant="determinate" .value="${args.value}"></ui-linear-progress>
    </div>
  `,
};

export const Integration: Story = {
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px; padding: 20px; max-width: 400px; font-family: sans-serif;">
      <div>
        <h4>Circular Small</h4>
        <ui-circular-progress size="24" thickness="4"></ui-circular-progress>
      </div>
      <div>
        <h4>Linear Background Processing</h4>
        <p style="font-size: 14px; color: #666; margin-bottom: 8px;">Uploading files...</p>
        <ui-linear-progress variant="determinate" value="45"></ui-linear-progress>
      </div>
    </div>
  `,
};
