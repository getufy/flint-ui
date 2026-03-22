import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './flint-divider';

const meta: Meta = {
    title: 'Data Display/Divider',
    component: 'flint-divider',
    parameters: {
        docs: {
            description: {
                component: `
A divider component that provides a thin line for grouping elements.

- **Tag**: \`<flint-divider>\`
- **Class**: \`FlintDivider\`

#### Properties

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| \`orientation\` | \`orientation\` | \`Orientation\` | \`'horizontal'\` | Orientation of the divider line. |
| \`variant\` | \`variant\` | \`'full' \\| 'middle' \\| 'inset'\` | \`'full'\` | Inset variant controlling how far the divider extends. |
| \`weight\` | \`weight\` | \`'light' \\| 'medium' \\| 'heavy'\` | \`'light'\` | Thickness of the divider line. |
| \`textAlign\` | \`textAlign\` | \`'left' \\| 'center' \\| 'right'\` | \`'center'\` | Alignment of text content within the divider. |

#### Slots

| Name | Description |
|---|---|
| \`(default)\` | Optional text or content to display within the divider. |

#### CSS Parts

| Name | Description |
|---|---|
| \`base\` | The component's base wrapper element. |

#### CSS Custom Properties

| Property | Default |
|---|---|
| \`--flint-divider-margin\` | — |
| \`--flint-divider-thickness\` | — |
| \`--flint-divider-color\` | — |
| \`--flint-border-color\` | — |
| \`--flint-font-family\` | — |
| \`--flint-text-color-muted\` | — |
                `,
            },
        },
    },
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
      <flint-divider 
        .orientation=${args.orientation} 
        .variant=${args.variant}
        .weight=${args.weight}
      ></flint-divider>
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
      <flint-divider .textAlign=${args.textAlign}>
        <span>OR</span>
      </flint-divider>
      <p>List Section B</p>
      
      <flint-divider textAlign="left">
        <span style="font-weight: bold; text-transform: uppercase; font-size: 12px;">New Items</span>
      </flint-divider>
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
      <flint-divider .orientation=${args.orientation}></flint-divider>
      <span>Copy</span>
      <flint-divider .orientation=${args.orientation}></flint-divider>
      <span>Paste</span>
    </div>
  `,
};

export const WeightsAndVariants: Story = {
    render: (args) => html`
    <div style="width: 100%; max-width: 500px; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
      <div style="font-size: 14px; color: #666;">Heavy weight</div>
      <flint-divider .weight=${args.weight}></flint-divider>

      <div style="font-size: 14px; color: #666;">Middle variant</div>
      <flint-divider .variant=${args.variant}></flint-divider>

      <div style="font-size: 14px; color: #666;">Inset variant</div>
      <flint-divider .variant=${args.variant}></flint-divider>
    </div>
  `,
};
